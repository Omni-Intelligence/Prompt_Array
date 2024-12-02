-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create templates table
CREATE TABLE IF NOT EXISTS templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    created_by UUID REFERENCES auth.users(id),
    is_public BOOLEAN DEFAULT true
);

-- Create template_favorites table for tracking favorite templates
CREATE TABLE IF NOT EXISTS template_favorites (
    template_id UUID REFERENCES templates(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    PRIMARY KEY (template_id, user_id)
);

-- Create template_saves table for tracking saved templates
CREATE TABLE IF NOT EXISTS template_saves (
    template_id UUID REFERENCES templates(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    PRIMARY KEY (template_id, user_id)
);

-- Insert sample templates
INSERT INTO templates (title, description, content, category, is_public) VALUES
    ('Creative Story Generator', 
     'Generate engaging stories with detailed character development and plot twists',
     'Create a story about [protagonist] who discovers [magical item] and must [quest/challenge]. Include detailed descriptions of the setting, character emotions, and at least one unexpected plot twist.',
     'Creative Writing',
     true),
    ('Product Description Writer',
     'Create compelling product descriptions that highlight key features and benefits',
     'Write a persuasive product description for [product name] that highlights its [key features]. Include sensory details, practical benefits, and a clear call-to-action.',
     'Marketing',
     true),
    ('Blog Post Outline',
     'Structure your blog posts with clear sections and engaging hooks',
     'Create a detailed blog post outline about [topic] with an attention-grabbing introduction, [number] main sections, relevant examples, and a compelling conclusion.',
     'Content Creation',
     true),
    ('Social Media Caption Generator',
     'Generate engaging social media captions with relevant hashtags',
     'Write an engaging social media caption for [platform] about [topic/product]. Include emotional hooks, relevant emojis, and [number] trending hashtags.',
     'Social Media',
     true),
    ('Email Newsletter Template',
     'Create professional email newsletters that drive engagement',
     'Design an email newsletter about [topic/update] with a captivating subject line, [number] main sections, and a clear call-to-action.',
     'Email Marketing',
     true),
    ('SEO Meta Description',
     'Write optimized meta descriptions for better search visibility',
     'Create an SEO-optimized meta description for [page/content] that includes [primary keyword] and compelling reasons to click, within 155-160 characters.',
     'SEO',
     true);
