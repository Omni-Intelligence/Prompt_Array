-- Drop existing materialized views if they exist
DROP MATERIALIZED VIEW IF EXISTS prompt_details_mv;
DROP MATERIALIZED VIEW IF EXISTS prompt_versions_summary_mv;
DROP MATERIALIZED VIEW IF EXISTS prompt_version_details_mv;

-- Drop related triggers if they exist
DROP TRIGGER IF EXISTS refresh_prompt_details_mv ON prompts;
DROP TRIGGER IF EXISTS refresh_prompt_versions_mv ON prompt_versions;

-- Drop the refresh function
DROP FUNCTION IF EXISTS refresh_prompt_materialized_views();

-- Create view for prompt details
CREATE VIEW prompt_details_v AS
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

-- Create view for version details
CREATE VIEW prompt_versions_v AS
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
