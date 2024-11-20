-- Create materialized view for prompt details
CREATE MATERIALIZED VIEW prompt_details_mv AS
SELECT 
    p.id,
    p.title,
    p.content,
    p.description,
    p.tags,
    p.is_public,
    p.created_at,
    p.updated_at,
    p.created_by,
    p.team_id,
    p.group_id,
    prof.full_name as author_name,
    prof.avatar_url as author_avatar,
    g.name as group_name,
    g.description as group_description,
    (SELECT COUNT(*) FROM prompt_versions WHERE prompt_id = p.id) as version_count,
    (SELECT MAX(version_number) FROM prompt_versions WHERE prompt_id = p.id) as latest_version
FROM prompts p
LEFT JOIN profiles prof ON p.created_by = prof.id
LEFT JOIN groups g ON p.group_id = g.id;

-- Create index for faster lookups
CREATE UNIQUE INDEX prompt_details_mv_id_idx ON prompt_details_mv (id);

-- Create materialized view for version summaries
CREATE MATERIALIZED VIEW prompt_versions_summary_mv AS
SELECT 
    pv.id,
    pv.prompt_id,
    pv.version_number,
    pv.title,
    pv.change_description,
    pv.created_at,
    prof.full_name as created_by_name,
    prof.avatar_url as created_by_avatar
FROM prompt_versions pv
LEFT JOIN profiles prof ON pv.created_by = prof.id;

-- Create index for faster lookups
CREATE UNIQUE INDEX prompt_versions_summary_mv_id_idx ON prompt_versions_summary_mv (id);
CREATE INDEX prompt_versions_summary_mv_prompt_id_idx ON prompt_versions_summary_mv (prompt_id);

-- Create materialized view for full version details
CREATE MATERIALIZED VIEW prompt_version_details_mv AS
SELECT 
    pv.*,
    prof.full_name as created_by_name,
    prof.avatar_url as created_by_avatar
FROM prompt_versions pv
LEFT JOIN profiles prof ON pv.created_by = prof.id;

-- Create index for faster lookups
CREATE UNIQUE INDEX prompt_version_details_mv_id_idx ON prompt_version_details_mv (id);

-- Create function to refresh materialized views
CREATE OR REPLACE FUNCTION refresh_prompt_materialized_views()
RETURNS trigger AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY prompt_details_mv;
    REFRESH MATERIALIZED VIEW CONCURRENTLY prompt_versions_summary_mv;
    REFRESH MATERIALIZED VIEW CONCURRENTLY prompt_version_details_mv;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to refresh materialized views
CREATE TRIGGER refresh_prompt_details_mv
AFTER INSERT OR UPDATE OR DELETE ON prompts
FOR EACH STATEMENT
EXECUTE FUNCTION refresh_prompt_materialized_views();

CREATE TRIGGER refresh_prompt_versions_mv
AFTER INSERT OR UPDATE OR DELETE ON prompt_versions
FOR EACH STATEMENT
EXECUTE FUNCTION refresh_prompt_materialized_views();
