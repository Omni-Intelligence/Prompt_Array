-- Add missing columns to prompts table
ALTER TABLE prompts
ADD COLUMN IF NOT EXISTS description text,
ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS is_public boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS version integer DEFAULT 1,
ADD COLUMN IF NOT EXISTS change_description text;

-- Add missing columns to groups table
ALTER TABLE groups 
ADD COLUMN IF NOT EXISTS parent_id uuid REFERENCES groups(id);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_prompts_user_id ON prompts(user_id);
CREATE INDEX IF NOT EXISTS idx_groups_user_id ON groups(user_id);
CREATE INDEX IF NOT EXISTS idx_chains_user_id ON chains(user_id);