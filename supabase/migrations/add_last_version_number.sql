-- Add last_version_number column to prompts table
ALTER TABLE prompts ADD COLUMN IF NOT EXISTS last_version_number INTEGER DEFAULT 1;

-- Update existing prompts to have their correct last version number
UPDATE prompts p
SET last_version_number = (
  SELECT MAX(version_number)
  FROM prompt_versions pv
  WHERE pv.prompt_id = p.id
);
