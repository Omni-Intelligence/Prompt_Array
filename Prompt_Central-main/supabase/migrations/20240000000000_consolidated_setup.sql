-- Setup file for Prompt Central database
-- This file contains all structural elements including tables, functions, policies, and views

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create necessary tables
create table if not exists public.groups (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    description text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    created_by uuid references auth.users(id) on delete cascade not null
);

create table if not exists public.group_members (
    id uuid primary key default uuid_generate_v4(),
    group_id uuid references public.groups(id) on delete cascade not null,
    user_id uuid references auth.users(id) on delete cascade not null,
    role text not null default 'member',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(group_id, user_id)
);

create table if not exists public.prompts (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    content text not null,
    description text,
    tags text[],
    is_public boolean default false,
    version integer default 1,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    user_id uuid references auth.users(id) on delete cascade,
    team_id uuid,
    group_id uuid references public.groups(id) on delete set null,
    is_template boolean default false,
    template_category text,
    deleted_at timestamp with time zone
);

create table if not exists public.prompt_versions (
    id uuid primary key default uuid_generate_v4(),
    prompt_id uuid references public.prompts(id) on delete cascade not null,
    version_number integer not null,
    title text not null,
    content text not null,
    description text,
    tags text[],
    change_description text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    created_by uuid references auth.users(id) on delete cascade not null,
    unique(prompt_id, version_number)
);

create table if not exists public.subscriptions (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references auth.users(id) on delete cascade not null,
    stripe_customer_id text,
    stripe_subscription_id text,
    plan_id text not null,
    status text not null,
    current_period_start timestamp with time zone,
    current_period_end timestamp with time zone,
    cancel_at timestamp with time zone,
    canceled_at timestamp with time zone,
    trial_start timestamp with time zone,
    trial_end timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create views
CREATE OR REPLACE VIEW prompt_details_v AS
SELECT 
    p.id,
    p.title,
    p.content,
    p.description,
    p.tags,
    p.is_public,
    p.version,
    p.created_at,
    p.updated_at,
    p.user_id,
    p.team_id,
    p.group_id,
    u.raw_user_meta_data->>'full_name' as author_name,
    u.raw_user_meta_data->>'avatar_url' as author_avatar,
    g.name as group_name,
    g.description as group_description,
    (SELECT COUNT(*) FROM prompt_versions WHERE prompt_id = p.id) as version_count
FROM prompts p
LEFT JOIN auth.users u ON p.user_id = u.id
LEFT JOIN groups g ON p.group_id = g.id;

CREATE OR REPLACE VIEW prompt_versions_v AS
SELECT 
    pv.id,
    pv.prompt_id,
    pv.version_number,
    pv.title,
    pv.content,
    pv.description,
    pv.tags,
    pv.change_description,
    pv.created_at,
    pv.created_by,
    u.raw_user_meta_data->>'full_name' as created_by_name,
    u.raw_user_meta_data->>'avatar_url' as created_by_avatar
FROM prompt_versions pv
LEFT JOIN auth.users u ON pv.created_by = u.id;

-- Create functions
CREATE OR REPLACE FUNCTION check_subscription_constraints()
RETURNS TRIGGER AS $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM subscriptions 
    WHERE user_id = NEW.user_id 
    AND status = 'active'
    AND id != NEW.id
  ) THEN
    RAISE EXCEPTION 'User can only have one active subscription';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER check_subscription_constraints_trigger
  BEFORE INSERT OR UPDATE ON subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION check_subscription_constraints();

-- Enable RLS
alter table public.prompts enable row level security;
alter table public.groups enable row level security;
alter table public.group_members enable row level security;
alter table public.prompt_versions enable row level security;
alter table public.subscriptions enable row level security;

-- Grant permissions
grant usage on schema public to authenticated;
grant all on all tables in schema public to authenticated;
grant all on all sequences in schema public to authenticated;

-- Create policies
CREATE POLICY "Allow users to create prompts" ON public.prompts
    FOR INSERT TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow users to update their own prompts" ON public.prompts
    FOR UPDATE TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Allow users to delete their own prompts" ON public.prompts
    FOR DELETE TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "Allow users to read public prompts" ON public.prompts
    FOR SELECT TO authenticated
    USING (
        is_public = true OR
        user_id = auth.uid() OR
        group_id IN (
            SELECT group_id 
            FROM group_members 
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Allow users to create groups" ON public.groups
    FOR INSERT TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow group creators to update their groups" ON public.groups
    FOR UPDATE TO authenticated
    USING (created_by = auth.uid())
    WITH CHECK (created_by = auth.uid());

CREATE POLICY "Allow group creators to delete their groups" ON public.groups
    FOR DELETE TO authenticated
    USING (created_by = auth.uid());

CREATE POLICY "Allow members to read their groups" ON public.groups
    FOR SELECT TO authenticated
    USING (
        id IN (
            SELECT group_id 
            FROM group_members 
            WHERE user_id = auth.uid()
        ) OR
        created_by = auth.uid()
    );

CREATE POLICY "Allow users to manage group memberships" ON public.group_members
    FOR ALL TO authenticated
    USING (
        group_id IN (
            SELECT id 
            FROM groups 
            WHERE created_by = auth.uid()
        ) OR
        user_id = auth.uid()
    )
    WITH CHECK (
        group_id IN (
            SELECT id 
            FROM groups 
            WHERE created_by = auth.uid()
        ) OR
        user_id = auth.uid()
    );

CREATE POLICY "Allow users to read their own subscriptions" ON public.subscriptions
    FOR SELECT TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "Allow users to manage their own subscriptions" ON public.subscriptions
    FOR ALL TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());
