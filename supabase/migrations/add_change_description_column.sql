-- Add change_description column to prompt_versions table
ALTER TABLE public.prompt_versions
ADD COLUMN IF NOT EXISTS change_description text;
