-- Create chains table
CREATE TABLE IF NOT EXISTS chains (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Drop existing chain_prompts table if it exists
DROP TABLE IF EXISTS chain_prompts;

-- Create chain_prompts table for storing prompt sequences
CREATE TABLE chain_prompts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    chain_id UUID REFERENCES chains(id) ON DELETE CASCADE NOT NULL,
    prompt_id UUID REFERENCES prompts(id) ON DELETE CASCADE NOT NULL,
    sequence_order INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    UNIQUE(chain_id, sequence_order) -- Ensure no duplicate positions in a chain
);

-- Add RLS policies
ALTER TABLE chains ENABLE ROW LEVEL SECURITY;
ALTER TABLE chain_prompts ENABLE ROW LEVEL SECURITY;

-- Users can view their own chains
CREATE POLICY "Users can view own chains"
    ON chains FOR SELECT
    USING (auth.uid() = user_id);

-- Users can insert their own chains
CREATE POLICY "Users can insert own chains"
    ON chains FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can update their own chains
CREATE POLICY "Users can update own chains"
    ON chains FOR UPDATE
    USING (auth.uid() = user_id);

-- Users can delete their own chains
CREATE POLICY "Users can delete own chains"
    ON chains FOR DELETE
    USING (auth.uid() = user_id);

-- Chain prompts policies
CREATE POLICY "Users can view chain prompts for owned chains"
    ON chain_prompts FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM chains
        WHERE chains.id = chain_prompts.chain_id
        AND chains.user_id = auth.uid()
    ));

CREATE POLICY "Users can insert chain prompts for owned chains"
    ON chain_prompts FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM chains
        WHERE chains.id = chain_prompts.chain_id
        AND chains.user_id = auth.uid()
    ));

CREATE POLICY "Users can update chain prompts for owned chains"
    ON chain_prompts FOR UPDATE
    USING (EXISTS (
        SELECT 1 FROM chains
        WHERE chains.id = chain_prompts.chain_id
        AND chains.user_id = auth.uid()
    ));

CREATE POLICY "Users can delete chain prompts for owned chains"
    ON chain_prompts FOR DELETE
    USING (EXISTS (
        SELECT 1 FROM chains
        WHERE chains.id = chain_prompts.chain_id
        AND chains.user_id = auth.uid()
    ));
