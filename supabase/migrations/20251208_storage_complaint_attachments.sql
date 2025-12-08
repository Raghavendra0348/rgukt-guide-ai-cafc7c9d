-- Create storage bucket for complaint attachments
insert into storage.buckets (id, name, public)
values ('complaint-attachments', 'complaint-attachments', true);

-- Set up RLS policies for storage
create policy "Users can upload their own complaint attachments"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'complaint-attachments' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Users can view their own complaint attachments"
on storage.objects for select
to authenticated
using (
  bucket_id = 'complaint-attachments' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Public can view complaint attachments"
on storage.objects for select
to public
using (bucket_id = 'complaint-attachments');

create policy "Admins can view all complaint attachments"
on storage.objects for select
to authenticated
using (
  bucket_id = 'complaint-attachments' AND
  exists (
    select 1 from user_roles
    where user_id = auth.uid()
    and role = 'admin'
  )
);
