-- Drop the existing prompt_versions table if it exists
DROP TABLE IF EXISTS public.prompt_versions;

-- Create the prompt_versions table with all required columns
CREATE TABLE public.prompt_versions (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    prompt_id uuid REFERENCES public.prompts(id) ON DELETE CASCADE,
    version_number integer NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    prompt_description text,
    tags text[],
    is_public boolean DEFAULT false,
    team_id uuid REFERENCES public.teams(id) ON DELETE SET NULL,
    group_id uuid REFERENCES public.groups(id) ON DELETE SET NULL,
    version_description text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Enable RLS
ALTER TABLE public.prompt_versions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own prompt versions"
    ON public.prompt_versions FOR SELECT
    USING (
        auth.uid() = created_by
        OR EXISTS (
            SELECT 1 FROM public.prompts p
            WHERE p.id = prompt_versions.prompt_id
            AND (
                p.user_id = auth.uid()
                OR p.is_public = true
                OR EXISTS (
                    SELECT 1 FROM public.team_members tm
                    WHERE tm.team_id = p.team_id
                    AND tm.user_id = auth.uid()
                )
            )
        )
    );

CREATE POLICY "Users can insert their own prompt versions"
    ON public.prompt_versions FOR INSERT
    WITH CHECK (auth.uid() = created_by);

-- Create function to get next version number
CREATE OR REPLACE FUNCTION get_next_version_number(p_prompt_id uuid)
RETURNS integer AS $$
DECLARE
    next_version integer;
BEGIN
    SELECT COALESCE(MAX(version_number), 0) + 1
    INTO next_version
    FROM public.prompt_versions
    WHERE prompt_id = p_prompt_id;
    RETURN next_version;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically set version number
CREATE OR REPLACE FUNCTION set_version_number()
RETURNS trigger AS $$
BEGIN
    NEW.version_number := get_next_version_number(NEW.prompt_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER set_version_number_trigger
    BEFORE INSERT ON public.prompt_versions
    FOR EACH ROW
    EXECUTE FUNCTION set_version_number();
