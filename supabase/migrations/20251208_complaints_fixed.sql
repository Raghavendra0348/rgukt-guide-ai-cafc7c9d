-- Create enums for complaints
CREATE TYPE public.complaint_status AS ENUM ('open', 'in_progress', 'resolved', 'closed');
CREATE TYPE public.complaint_priority AS ENUM ('low', 'medium', 'high', 'urgent');

-- Create complaints table
CREATE TABLE IF NOT EXISTS public.complaints (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    status complaint_status DEFAULT 'open',
    priority complaint_priority DEFAULT 'medium',
    attachment_url TEXT,
    admin_response TEXT,
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_complaints_user_id ON public.complaints(user_id);
CREATE INDEX IF NOT EXISTS idx_complaints_status ON public.complaints(status);
CREATE INDEX IF NOT EXISTS idx_complaints_created_at ON public.complaints(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_complaints_category ON public.complaints(category);

-- Enable Row Level Security
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;

-- Create policies using the user_roles table
-- Users can view their own complaints
CREATE POLICY "Users can view own complaints" ON public.complaints
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

-- Users can insert their own complaints
CREATE POLICY "Users can insert own complaints" ON public.complaints
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Users can update their own complaints (only if not resolved)
CREATE POLICY "Users can update own open complaints" ON public.complaints
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id AND status != 'resolved' AND status != 'closed');

-- Admins can view all complaints
CREATE POLICY "Admins can view all complaints" ON public.complaints
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_roles.user_id = auth.uid()
            AND user_roles.role = 'admin'
        )
    );

-- Admins can update any complaint
CREATE POLICY "Admins can update all complaints" ON public.complaints
    FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_roles.user_id = auth.uid()
            AND user_roles.role = 'admin'
        )
    );

-- Admins can delete complaints
CREATE POLICY "Admins can delete complaints" ON public.complaints
    FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_roles.user_id = auth.uid()
            AND user_roles.role = 'admin'
        )
    );

-- Create updated_at trigger function if not exists
CREATE OR REPLACE FUNCTION public.update_complaints_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS update_complaints_updated_at ON public.complaints;
CREATE TRIGGER update_complaints_updated_at 
    BEFORE UPDATE ON public.complaints
    FOR EACH ROW 
    EXECUTE FUNCTION public.update_complaints_updated_at();

-- Create function to get complaint statistics
CREATE OR REPLACE FUNCTION public.get_complaint_stats()
RETURNS TABLE (
    total BIGINT,
    open BIGINT,
    in_progress BIGINT,
    resolved BIGINT,
    closed BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        COUNT(*)::BIGINT as total,
        COUNT(*) FILTER (WHERE status = 'open')::BIGINT as open,
        COUNT(*) FILTER (WHERE status = 'in_progress')::BIGINT as in_progress,
        COUNT(*) FILTER (WHERE status = 'resolved')::BIGINT as resolved,
        COUNT(*) FILTER (WHERE status = 'closed')::BIGINT as closed
    FROM public.complaints;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION public.get_complaint_stats() TO authenticated;
