export const groupPrompts = {
  1: [ // Blog Writing
    {
      id: 1,
      title: 'SEO-Optimized Blog Post',
      description: 'Creates comprehensive blog posts with proper keyword optimization',
      content: 'Write a 1500-word blog post about [topic] that targets the keyword [main keyword]. Include H2 and H3 headings, meta description, and incorporate relevant LSI keywords. The tone should be informative yet conversational, and include practical examples.',
      lastUsed: '2 days ago',
      tags: ['blog', 'seo', 'content']
    },
    {
      id: 2,
      title: 'How-To Guide Generator',
      description: 'Creates detailed step-by-step tutorials',
      content: 'Create a comprehensive how-to guide about [topic]. Include: 1) An engaging introduction explaining why this skill is valuable, 2) A list of required materials/prerequisites, 3) Step-by-step instructions with clear explanations, 4) Common mistakes to avoid, 5) Tips for success, 6) A conclusion with next steps.',
      lastUsed: '5 days ago',
      tags: ['tutorial', 'guide', 'blog']
    },
    {
      id: 3,
      title: 'List Post Creator',
      description: 'Generates engaging listicle content',
      content: 'Create a list-style blog post about [topic] with [number] items. Each item should have: 1) A clear subheading, 2) A detailed explanation, 3) Real-world examples or applications, 4) Action steps or takeaways. Include an introduction explaining why these items are important and a conclusion summarizing key points.',
      lastUsed: '1 week ago',
      tags: ['listicle', 'blog']
    }
  ],
  2: [ // Social Media
    {
      id: 4,
      title: 'Instagram Caption Generator',
      description: 'Creates engaging Instagram captions with hashtags',
      content: 'Write an engaging Instagram caption for [type of post] that includes: 1) An attention-grabbing first line, 2) A story or value-adding content, 3) A clear call-to-action, 4) 3-5 line breaks for readability, 5) A curated set of 15-20 relevant hashtags. Tone should be [desired tone].',
      lastUsed: '1 day ago',
      tags: ['instagram', 'social']
    },
    {
      id: 5,
      title: 'Twitter Thread Creator',
      description: 'Generates viral-worthy Twitter threads',
      content: 'Create a compelling Twitter thread about [topic] with [number] tweets. First tweet should hook readers with a bold statement or surprising fact. Each subsequent tweet should: 1) Build on previous points, 2) Include data or examples, 3) Use simple language, 4) End with engagement hooks. Final tweet should include a clear call-to-action.',
      lastUsed: '3 days ago',
      tags: ['twitter', 'thread']
    },
    {
      id: 6,
      title: 'LinkedIn Post Optimizer',
      description: 'Creates professional LinkedIn content',
      content: 'Write a LinkedIn post about [topic/achievement/insight] that includes: 1) A powerful hook that draws readers in, 2) Personal experience or professional insight, 3) Key learnings or takeaways, 4) Industry-relevant hashtags, 5) A question or call-to-action to encourage engagement. Format with appropriate line breaks for readability.',
      lastUsed: '4 days ago',
      tags: ['linkedin', 'professional']
    }
  ],
  3: [ // Email Marketing
    {
      id: 7,
      title: 'Welcome Email Sequence',
      description: 'Creates engaging onboarding emails',
      content: 'Create a welcome email for new subscribers that: 1) Warmly greets them by name, 2) Thanks them for subscribing, 3) Sets clear expectations about email frequency and content, 4) Delivers the promised lead magnet or welcome gift, 5) Introduces your best content or products, 6) Includes a small action step or quick win. Tone should be friendly yet professional.',
      lastUsed: '2 days ago',
      tags: ['email', 'onboarding']
    },
    {
      id: 8,
      title: 'Promotional Email Template',
      description: 'Generates compelling promotional emails',
      content: 'Write a promotional email for [product/service] that includes: 1) An attention-grabbing subject line, 2) A personalized greeting, 3) Problem statement that resonates with the reader, 4) Solution presentation with clear benefits, 5) Social proof or testimonials, 6) Clear pricing and offer details, 7) Urgent call-to-action with deadline, 8) P.S. section with bonus or scarcity element.',
      lastUsed: '1 week ago',
      tags: ['promotion', 'sales']
    },
    {
      id: 9,
      title: 'Newsletter Content Generator',
      description: 'Creates engaging newsletter content',
      content: 'Create a newsletter about [topic/industry] that includes: 1) A personal introduction or industry update, 2) Main article or feature story, 3) Curated content section with 3-5 relevant industry articles, 4) Tips or quick wins section, 5) Upcoming events or announcements, 6) Interactive element (poll, question, or feedback request). Maintain a consistent voice that matches [brand tone].',
      lastUsed: '5 days ago',
      tags: ['newsletter', 'content']
    }
  ],
  4: [ // SEO Content
    {
      id: 10,
      title: 'Meta Description Generator',
      description: 'Creates optimized meta descriptions',
      content: 'Write a compelling meta description for [page type] that: 1) Includes the primary keyword [keyword] naturally, 2) Summarizes the page content in 150-160 characters, 3) Includes a clear value proposition, 4) Contains a call-to-action, 5) Uses active voice and action words. The description should entice clicks while accurately representing the page content.',
      lastUsed: '3 days ago',
      tags: ['seo', 'meta']
    },
    {
      id: 11,
      title: 'Product Description SEO',
      description: 'Generates SEO-friendly product descriptions',
      content: 'Create an SEO-optimized product description for [product name] that includes: 1) A compelling headline with primary keyword, 2) Unique selling propositions, 3) Technical specifications and features, 4) Benefits and use cases, 5) Natural keyword placement for [list of keywords], 6) Trust signals and social proof. Length should be 300-500 words.',
      lastUsed: '1 week ago',
      tags: ['product', 'seo']
    },
    {
      id: 12,
      title: 'Local SEO Content',
      description: 'Creates location-specific content',
      content: 'Write a locally optimized page for [business type] in [location] that includes: 1) Location-specific keywords naturally integrated, 2) Local landmarks and area references, 3) Specific services for the area, 4) Local customer testimonials, 5) Area-specific promotions or offerings, 6) Local business schema markup suggestions. Content should be 800-1000 words.',
      lastUsed: '4 days ago',
      tags: ['local-seo', 'content']
    }
  ],
  5: [ // Technical Writing
    {
      id: 13,
      title: 'API Documentation Generator',
      description: 'Creates clear API documentation',
      content: 'Create API documentation for [endpoint/feature] that includes: 1) Endpoint description and purpose, 2) Request method and URL structure, 3) Authentication requirements, 4) Request parameters with types and constraints, 5) Response format and examples, 6) Error codes and handling, 7) Rate limiting information, 8) Code examples in [programming languages]. Use clear, concise technical language.',
      lastUsed: '2 days ago',
      tags: ['api', 'documentation']
    },
    {
      id: 14,
      title: 'Technical Guide Creator',
      description: 'Generates step-by-step technical guides',
      content: 'Write a technical guide for [process/feature] that includes: 1) Prerequisites and system requirements, 2) Step-by-step installation/configuration instructions, 3) Command line examples with explanations, 4) Configuration file examples, 5) Troubleshooting section with common issues, 6) Best practices and optimization tips, 7) Security considerations. Include relevant code snippets and command examples.',
      lastUsed: '5 days ago',
      tags: ['guide', 'technical']
    },
    {
      id: 15,
      title: 'Release Notes Template',
      description: 'Creates structured release notes',
      content: 'Generate release notes for version [version number] that include: 1) Version number and release date, 2) Summary of major changes, 3) New features with detailed descriptions, 4) Bug fixes with issue references, 5) Performance improvements, 6) Breaking changes and migration steps, 7) Dependencies updates, 8) Contributors acknowledgment. Organize by category and impact level.',
      lastUsed: '1 week ago',
      tags: ['release', 'documentation']
    }
  ],
  6: [ // Creative Stories
    {
      id: 16,
      title: 'Story Premise Generator',
      description: 'Creates unique story premises',
      content: 'Create a story premise that includes: 1) A unique protagonist with [defining characteristic], 2) Their main goal or desire, 3) The central conflict or obstacle, 4) The stakes (what they stand to lose), 5) The setting and time period, 6) A unique twist or complication, 7) Potential themes to explore. The premise should be specific enough to guide the story but leave room for creative development.',
      lastUsed: '3 days ago',
      tags: ['creative', 'story']
    },
    {
      id: 17,
      title: 'Character Profile Builder',
      description: 'Generates detailed character profiles',
      content: 'Create a detailed character profile that includes: 1) Basic information (name, age, occupation), 2) Physical description and distinctive features, 3) Personality traits and quirks, 4) Background and personal history, 5) Goals and motivations, 6) Fears and weaknesses, 7) Relationships and connections, 8) Character arc potential. Focus on making the character unique and three-dimensional.',
      lastUsed: '6 days ago',
      tags: ['character', 'creative']
    },
    {
      id: 18,
      title: 'Scene Setting Creator',
      description: 'Creates vivid scene descriptions',
      content: 'Write a scene setting description that includes: 1) Time of day and weather, 2) Physical environment details, 3) Sensory details (sights, sounds, smells, etc.), 4) Mood and atmosphere, 5) Important objects or elements in the scene, 6) How the setting affects the characters, 7) Potential for conflict or story development. Use vivid language and specific details.',
      lastUsed: '4 days ago',
      tags: ['scene', 'description']
    }
  ]
};