-- Add deleted_at column to prompts table
ALTER TABLE prompts
ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ DEFAULT NULL;

-- Create index for faster queries on deleted_at
CREATE INDEX IF NOT EXISTS idx_prompts_deleted_at ON prompts(deleted_at);

-- Update RLS policies to consider deleted_at
CREATE POLICY "Users can view their own non-deleted prompts"
    ON prompts FOR SELECT
    USING (auth.uid() = user_id AND deleted_at IS NULL);

CREATE POLICY "Users can update their own non-deleted prompts"
    ON prompts FOR UPDATE
    USING (auth.uid() = user_id AND deleted_at IS NULL);

-- Instead of actually deleting, we'll update deleted_at
CREATE OR REPLACE FUNCTION soft_delete_prompt()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE prompts
    SET deleted_at = NOW()
    WHERE id = OLD.id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;
