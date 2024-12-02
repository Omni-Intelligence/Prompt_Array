-- Add missing columns to prompt_versions table
ALTER TABLE public.prompt_versions
ADD COLUMN IF NOT EXISTS change_description text,
ADD COLUMN IF NOT EXISTS created_by uuid references auth.users(id) on delete set null,
ADD COLUMN IF NOT EXISTS created_at timestamp with time zone default timezone('utc'::text, now());
