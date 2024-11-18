-- Create teams table if it doesn't exist
CREATE TABLE IF NOT EXISTS teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create groups table if it doesn't exist
CREATE TABLE IF NOT EXISTS groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  parent_id UUID REFERENCES groups(id)
);

-- Modify prompts table to handle nullable foreign keys
ALTER TABLE prompts
DROP CONSTRAINT IF EXISTS prompts_team_id_fkey,
DROP CONSTRAINT IF EXISTS prompts_group_id_fkey;

ALTER TABLE prompts
ADD CONSTRAINT prompts_team_id_fkey 
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE SET NULL,
ADD CONSTRAINT prompts_group_id_fkey 
  FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE SET NULL;