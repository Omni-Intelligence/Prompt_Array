-- Seed file for Prompt Central database
-- This file contains all essential data including system templates and initial setup

-- Create system user
INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    'system',
    'authenticated',
    'authenticated',
    'system@promptcentral.pro',
    '$2a$10$Q7RNHL6H6yLp.yR/F7Yi5.aKwDH3JXhK2iS1J2e2EuLQHX5m2mOJi',
    '2024-01-01 00:00:00+00',
    NULL,
    NULL,
    '{"provider": "email", "providers": ["email"]}',
    '{"avatar_url": "https://api.dicebear.com/7.x/bottts/svg?seed=system", "full_name": "System"}',
    '2024-01-01 00:00:00+00',
    '2024-01-01 00:00:00+00',
    '',
    '',
    '',
    ''
) ON CONFLICT (id) DO NOTHING;

-- Add core templates
INSERT INTO public.prompts (
    title,
    description,
    content,
    template_category,
    is_template,
    is_public,
    version,
    user_id
) VALUES 
-- Analytics & BI Templates
('Data Analysis Report', 'Comprehensive template for creating professional data analysis reports', 
'Data Analysis Report Template

1. Executive Summary
[Brief overview of key findings and recommendations]

2. Project Overview
- Business Context:
- Objectives:
- Key Questions:
- Stakeholders:

3. Methodology
- Data Sources:
- Time Period:
- Tools Used:
- Analysis Methods:

4. Data Quality Assessment
- Data Completeness:
- Data Accuracy:
- Data Consistency:
- Limitations:

5. Key Findings
[Detailed analysis with supporting visualizations]
- Finding 1:
- Finding 2:
- Finding 3:

6. Recommendations
- Recommendation 1:
- Recommendation 2:
- Recommendation 3:

7. Next Steps
- Action Items:
- Timeline:
- Resources Required:

8. Appendix
- Additional Data:
- Technical Details:
- References:', 
'Analytics & BI', true, true, 1, 'system'),

-- Add more templates here...

('Meeting Minutes', 'Template for recording meeting minutes effectively', 
'Meeting Minutes Template

Date: [Date]
Time: [Start Time] - [End Time]
Location: [Physical Location/Virtual Platform]

1. Attendees
- Present:
- Absent:
- Guest Attendees:

2. Agenda Items
[List all agenda items discussed]

3. Discussion Points
[For each agenda item]:
- Key Points Discussed:
- Decisions Made:
- Action Items:

4. Action Items Summary
[List all action items with]:
- Task Description:
- Assigned To:
- Due Date:
- Priority:

5. Next Meeting
- Date:
- Time:
- Location:
- Preliminary Agenda:

6. Additional Notes
[Any other relevant information]

7. Approval
- Minutes Prepared By:
- Date:
- Approved By:
- Date:', 
'Business', true, true, 1, 'system');

-- Add more templates as needed...
