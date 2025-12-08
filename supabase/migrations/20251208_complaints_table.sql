-- Create complaints table
CREATE TABLE IF NOT EXISTS public.complaints (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    attachment_url TEXT,
    admin_response TEXT,
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_complaints_user_id ON public.complaints(user_id);
CREATE INDEX IF NOT EXISTS idx_complaints_status ON public.complaints(status);
CREATE INDEX IF NOT EXISTS idx_complaints_created_at ON public.complaints(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_complaints_category ON public.complaints(category);

-- Enable Row Level Security
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can view their own complaints
CREATE POLICY "Users can view own complaints" ON public.complaints
    FOR SELECT
    USING (auth.uid() = user_id);

-- Users can insert their own complaints
CREATE POLICY "Users can insert own complaints" ON public.complaints
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can update their own complaints (only if not resolved)
CREATE POLICY "Users can update own open complaints" ON public.complaints
    FOR UPDATE
    USING (auth.uid() = user_id AND status != 'resolved' AND status != 'closed');

-- Admins can view all complaints
CREATE POLICY "Admins can view all complaints" ON public.complaints
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND (auth.users.raw_user_meta_data->>'role')::text = 'admin'
        )
    );

-- Admins can update any complaint
CREATE POLICY "Admins can update all complaints" ON public.complaints
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND (auth.users.raw_user_meta_data->>'role')::text = 'admin'
        )
    );

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_complaints_updated_at BEFORE UPDATE ON public.complaints
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to get complaint statistics
CREATE OR REPLACE FUNCTION get_complaint_stats()
RETURNS TABLE (
    total_complaints BIGINT,
    open_complaints BIGINT,
    in_progress_complaints BIGINT,
    resolved_complaints BIGINT,
    avg_resolution_time INTERVAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        COUNT(*)::BIGINT as total_complaints,
        COUNT(*) FILTER (WHERE status = 'open')::BIGINT as open_complaints,
        COUNT(*) FILTER (WHERE status = 'in_progress')::BIGINT as in_progress_complaints,
        COUNT(*) FILTER (WHERE status = 'resolved' OR status = 'closed')::BIGINT as resolved_complaints,
        AVG(resolved_at - created_at) FILTER (WHERE resolved_at IS NOT NULL) as avg_resolution_time
    FROM public.complaints;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
