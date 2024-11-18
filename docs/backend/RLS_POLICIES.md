# Row Level Security Policies

Run these SQL commands in your Supabase SQL editor to set up all necessary RLS policies:

```sql
-- Enable RLS on all tables
ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE chains ENABLE ROW LEVEL SECURITY;
ALTER TABLE chain_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Prompts table policies
CREATE POLICY "Users can view their own prompts"
  ON prompts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own prompts"
  ON prompts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own prompts"
  ON prompts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own prompts"
  ON prompts FOR DELETE
  USING (auth.uid() = user_id);

-- Chains table policies
CREATE POLICY "Users can view their own chains"
  ON chains FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own chains"
  ON chains FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own chains"
  ON chains FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own chains"
  ON chains FOR DELETE
  USING (auth.uid() = user_id);

-- Chain_prompts table policies
CREATE POLICY "Users can view chain_prompts for their chains"
  ON chain_prompts FOR SELECT
  USING (
    auth.uid() IN (
      SELECT user_id FROM chains WHERE id = chain_prompts.chain_id
    )
  );

CREATE POLICY "Users can create chain_prompts for their chains"
  ON chain_prompts FOR INSERT
  WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM chains WHERE id = chain_id
    )
  );

CREATE POLICY "Users can update chain_prompts for their chains"
  ON chain_prompts FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT user_id FROM chains WHERE id = chain_id
    )
  );

CREATE POLICY "Users can delete chain_prompts for their chains"
  ON chain_prompts FOR DELETE
  USING (
    auth.uid() IN (
      SELECT user_id FROM chains WHERE id = chain_id
    )
  );

-- Groups table policies
CREATE POLICY "Users can view their own groups"
  ON groups FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own groups"
  ON groups FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own groups"
  ON groups FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own groups"
  ON groups FOR DELETE
  USING (auth.uid() = user_id);

-- Group_prompts table policies
CREATE POLICY "Users can view group_prompts for their groups"
  ON group_prompts FOR SELECT
  USING (
    auth.uid() IN (
      SELECT user_id FROM groups WHERE id = group_id
    )
  );

CREATE POLICY "Users can create group_prompts for their groups"
  ON group_prompts FOR INSERT
  WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM groups WHERE id = group_id
    )
  );

CREATE POLICY "Users can delete group_prompts for their groups"
  ON group_prompts FOR DELETE
  USING (
    auth.uid() IN (
      SELECT user_id FROM groups WHERE id = group_id
    )
  );

-- Favorites table policies
CREATE POLICY "Users can view their own favorites"
  ON favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own favorites"
  ON favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites"
  ON favorites FOR DELETE
  USING (auth.uid() = user_id);
```