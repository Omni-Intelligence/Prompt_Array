-- First, create a system user for templates if it doesn't exist
DO $$
DECLARE
    template_user_id uuid;
BEGIN
    -- Insert a system user into auth.users if it doesn't exist
    INSERT INTO auth.users (
        instance_id,
        id,
        email,
        encrypted_password,
        email_confirmed_at,
        raw_app_meta_data,
        raw_user_meta_data,
        created_at,
        updated_at,
        role,
        confirmation_token
    )
    VALUES (
        '00000000-0000-0000-0000-000000000000',
        '00000000-0000-0000-0000-000000000000'::uuid,
        'system@templates.internal',
        '',
        NOW(),
        '{"provider": "system", "providers": ["system"]}',
        '{"full_name": "System Templates"}',
        NOW(),
        NOW(),
        'authenticated',
        ''
    )
    ON CONFLICT (id) DO NOTHING
    RETURNING id INTO template_user_id;

    -- If we didn't insert (because it already existed), get the ID
    IF template_user_id IS NULL THEN
        SELECT id INTO template_user_id
        FROM auth.users
        WHERE email = 'system@templates.internal';
    END IF;

    -- Add initial templates
    INSERT INTO public.prompts (
        title,
        content,
        description,
        tags,
        is_public,
        is_template,
        template_category,
        version,
        user_id
    ) VALUES
    -- Writing Templates
    (
        'Blog Post Structure',
        'Create a comprehensive blog post about [topic] following this structure:\n\n1. Attention-Grabbing Introduction\n- Hook the reader with a compelling fact or story about [topic]\n- State the main problem or question\n- Preview the key points\n\n2. Main Content (3-5 sections)\n- Key Point 1: [outline]\n- Key Point 2: [outline]\n- Key Point 3: [outline]\n- Include relevant examples and data\n\n3. Practical Applications\n- How readers can implement these insights\n- Common challenges and solutions\n\n4. Conclusion\n- Summarize key takeaways\n- Call-to-action\n- Question to engage readers\n\nTone: [professional/casual/technical]\nTarget Audience: [specify]',
        'A structured template for creating engaging and well-organized blog posts',
        ARRAY['writing', 'blog', 'content'],
        true,
        true,
        'Writing',
        1,
        template_user_id
    ),
    (
        'Email Newsletter Template',
        'Subject Line: [Engaging headline that promises value]\n\nDear [Subscriber Name],\n\n[Opening - 1-2 sentences connecting with the reader''s current situation]\n\n🔑 Key Highlight:\n[Main announcement or value proposition]\n\n📌 What This Means For You:\n• [Benefit 1]\n• [Benefit 2]\n• [Benefit 3]\n\n🎯 Next Steps:\n[Clear call-to-action with specific instructions]\n\n💡 Quick Tip:\n[Share a relevant, actionable tip]\n\n[Closing - 1-2 sentences maintaining relationship]\n\nBest regards,\n[Your name/brand]\n\nP.S. [Optional compelling reminder or urgent call-to-action]',
        'A template for creating engaging email newsletters that drive action',
        ARRAY['email', 'marketing', 'newsletter'],
        true,
        true,
        'Writing',
        1,
        template_user_id
    ),

    -- Marketing Templates
    (
        'Product Launch Announcement',
        '🚀 Exciting Announcement: Introducing [Product Name]!\n\n[Hook: One sentence that captures the product''s unique value]\n\n🎯 Perfect For:\n[Describe your ideal customer and their pain points]\n\n✨ Key Features:\n• [Feature 1] → [Benefit 1]\n• [Feature 2] → [Benefit 2]\n• [Feature 3] → [Benefit 3]\n\n💫 What Makes It Special:\n[Unique selling proposition in 2-3 sentences]\n\n🎁 Launch Offer:\n[Special promotion or early-bird offer]\n\n⏰ Available:\n[Launch date and availability details]\n\n🔗 Get Started:\n[Call-to-action and link]\n\n#[Industry] #[ProductType] #[BrandName]',
        'Template for creating compelling product launch announcements',
        ARRAY['marketing', 'product launch', 'announcement'],
        true,
        true,
        'Marketing',
        1,
        template_user_id
    ),
    (
        'Social Media Campaign Plan',
        'Campaign Name: [Name]\nDuration: [Start Date] to [End Date]\n\n🎯 Campaign Objectives:\n1. [Primary goal]\n2. [Secondary goal]\n3. [Tertiary goal]\n\n👥 Target Audience:\n• Primary: [Description]\n• Secondary: [Description]\n\n📢 Key Messages:\n1. [Main message]\n2. [Supporting message]\n3. [Call-to-action]\n\n📱 Platform Strategy:\n\nInstagram:\n• Content Type: [Types of posts]\n• Frequency: [Posts per week]\n• Best Times: [Posting schedule]\n\nLinkedIn:\n• Content Type: [Types of posts]\n• Frequency: [Posts per week]\n• Best Times: [Posting schedule]\n\nTwitter:\n• Content Type: [Types of posts]\n• Frequency: [Posts per week]\n• Best Times: [Posting schedule]\n\n#️⃣ Campaign Hashtags:\n• Primary: #[MainHashtag]\n• Secondary: #[SecondaryHashtags]\n\n📊 Success Metrics:\n• [Metric 1]: [Target]\n• [Metric 2]: [Target]\n• [Metric 3]: [Target]',
        'Comprehensive template for planning and executing social media campaigns',
        ARRAY['marketing', 'social media', 'campaign'],
        true,
        true,
        'Marketing',
        1,
        template_user_id
    ),

    -- Technical Templates
    (
        'API Documentation Template',
        '# [API Name] Documentation\n\n## Overview\n[Brief description of what the API does and its main purpose]\n\n## Base URL\n```\n[Your API base URL]\n```\n\n## Authentication\n[Explain authentication method]\n\n## Endpoints\n\n### [Endpoint Name]\n```http\n[HTTP Method] /[endpoint-path]\n```\n\n#### Parameters\n| Name | Type | Required | Description |\n|------|------|----------|-------------|\n| [param1] | [type] | [Yes/No] | [description] |\n\n#### Request Example\n```json\n{\n  "field1": "value1",\n  "field2": "value2"\n}\n```\n\n#### Response Example\n```json\n{\n  "status": "success",
  "data": {\n    "field1": "value1"\n  }\n}\n```\n\n#### Error Codes\n| Code | Description |\n|------|-------------|\n| [code] | [description] |\n\n## Rate Limiting\n[Describe rate limiting policies]\n\n## Best Practices\n- [Best practice 1]\n- [Best practice 2]',
        'Structured template for creating clear and comprehensive API documentation',
        ARRAY['technical', 'API', 'documentation'],
        true,
        true,
        'Technical',
        1,
        template_user_id
    ),
    (
        'Bug Report Template',
        '## Bug Report\n\n### Issue Description\n[Provide a clear and concise description of the bug]\n\n### Steps to Reproduce\n1. [First Step]\n2. [Second Step]\n3. [Additional Steps...]\n\n### Expected Behavior\n[Describe what should happen]\n\n### Actual Behavior\n[Describe what actually happens]\n\n### Environment\n- OS: [e.g., Windows 11]\n- Browser/App Version: [e.g., Chrome 120.0]\n- Device: [e.g., Desktop/Mobile]\n\n### Screenshots/Videos\n[If applicable, add screenshots or video links]\n\n### Additional Context\n- Frequency: [How often does this occur?]\n- Related Issues: [Link to related issues]\n- Impact Level: [Low/Medium/High]\n\n### Possible Solution\n[If you have any ideas about what might be causing this or how to fix it]',
        'Detailed template for creating clear and actionable bug reports',
        ARRAY['technical', 'bug report', 'QA'],
        true,
        true,
        'Technical',
        1,
        template_user_id
    ),

    -- Business Templates
    (
        'Project Proposal Template',
        '# Project Proposal: [Project Name]\n\n## Executive Summary\n[2-3 sentences summarizing the project and its value]\n\n## Business Case\n### Problem Statement\n[Describe the current challenge or opportunity]\n\n### Proposed Solution\n[Outline your proposed solution]\n\n### Expected Benefits\n- [Benefit 1]\n- [Benefit 2]\n- [Benefit 3]\n\n## Project Scope\n### Objectives\n1. [Primary objective]\n2. [Secondary objective]\n3. [Additional objectives]\n\n### Deliverables\n1. [Deliverable 1]\n2. [Deliverable 2]\n3. [Deliverable 3]\n\n## Timeline\n- Phase 1: [Description and duration]\n- Phase 2: [Description and duration]\n- Phase 3: [Description and duration]\n\n## Budget\n### Estimated Costs\n- [Cost Category 1]: $[Amount]\n- [Cost Category 2]: $[Amount]\n- [Cost Category 3]: $[Amount]\n\nTotal: $[Total Amount]\n\n## Risk Assessment\n| Risk | Impact | Mitigation Strategy |\n|------|---------|--------------------|\n| [Risk 1] | [High/Medium/Low] | [Strategy] |\n\n## Success Metrics\n- [Metric 1]: [Target]\n- [Metric 2]: [Target]\n\n## Next Steps\n1. [Action item 1]\n2. [Action item 2]\n3. [Action item 3]',
        'Comprehensive template for creating professional project proposals',
        ARRAY['business', 'project management', 'proposal'],
        true,
        true,
        'Business',
        1,
        template_user_id
    ),
    (
        'Meeting Agenda Template',
        '# [Meeting Type] Agenda\nDate: [Date]\nTime: [Start Time] - [End Time]\nLocation: [Physical Location/Virtual Link]\n\n## Meeting Objective\n[1-2 sentences stating the main purpose of the meeting]\n\n## Attendees\nRequired: [Names]\nOptional: [Names]\n\n## Agenda Items\n\n### 1. Welcome and Updates (5 mins)\n- Review previous action items\n- Quick team updates\n\n### 2. [Main Topic 1] (XX mins)\n- Key points for discussion\n- Expected outcome\n- Owner: [Name]\n\n### 3. [Main Topic 2] (XX mins)\n- Key points for discussion\n- Expected outcome\n- Owner: [Name]\n\n### 4. Action Items Review (5 mins)\n- Recap decisions made\n- Assign new action items\n- Set deadlines\n\n## Pre-Meeting Preparation\n- [Required reading/preparation]\n- [Documents to review]\n\n## Next Meeting\n- Date: [Next meeting date]\n- Focus: [Brief preview of next meeting''s agenda]',
        'Structured template for creating effective meeting agendas',
        ARRAY['business', 'meetings', 'organization'],
        true,
        true,
        'Business',
        1,
        template_user_id
    );
END $$;
