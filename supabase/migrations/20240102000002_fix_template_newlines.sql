-- Update templates to use actual newlines
UPDATE public.prompts
SET content = REPLACE(
    REPLACE(
        REPLACE(
            REPLACE(content, '\n', E'\n'),
            '\\n', E'\n'
        ),
        '\t', E'\t'
    ),
    '\\t', E'\t'
)
WHERE is_template = true;
