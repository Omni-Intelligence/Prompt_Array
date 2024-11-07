import { emailPrompts } from './groups/emailPrompts';
import { technicalPrompts } from './groups/technicalPrompts';
import { seoPrompts } from './groups/seoPrompts';
import { creativeStoryPrompts } from './groups/creativeStoryPrompts';

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
    },
    {
      id: 4,
      title: 'Product Review Template',
      description: 'Creates detailed product review posts',
      content: 'Write a comprehensive product review for [product name]. Include: 1) First impressions and unboxing experience, 2) Key features and specifications, 3) Real-world testing results, 4) Pros and cons, 5) Comparison with alternatives, 6) Value for money assessment, 7) Final verdict and rating. Use a balanced and objective tone.',
      lastUsed: '3 days ago',
      tags: ['review', 'product', 'blog']
    },
    {
      id: 5,
      title: 'Case Study Framework',
      description: 'Generates detailed case study blog posts',
      content: 'Create a case study about [subject/company]. Structure: 1) Background and challenge, 2) Goals and objectives, 3) Methodology and approach, 4) Implementation details, 5) Results and metrics, 6) Key learnings and takeaways, 7) Future recommendations. Include relevant data and quotes.',
      lastUsed: '6 days ago',
      tags: ['case-study', 'business', 'blog']
    },
    {
      id: 6,
      title: 'Industry News Analysis',
      description: 'Creates analytical posts about industry trends',
      content: 'Write an analysis of [recent industry development/news]. Include: 1) Overview of the news/development, 2) Historical context and background, 3) Potential impact on the industry, 4) Expert opinions and quotes, 5) Implications for different stakeholders, 6) Future predictions and recommendations.',
      lastUsed: '4 days ago',
      tags: ['news', 'analysis', 'blog']
    },
    {
      id: 7,
      title: 'Expert Interview Post',
      description: 'Structures expert interview content',
      content: 'Create an interview-style blog post with [expert name/role]. Include: 1) Expert introduction and credentials, 2) Key questions about [topic], 3) Expert insights and opinions, 4) Practical advice and recommendations, 5) Future trends and predictions, 6) Key takeaways for readers.',
      lastUsed: '1 week ago',
      tags: ['interview', 'expert', 'blog']
    },
    {
      id: 8,
      title: 'Ultimate Guide Creator',
      description: 'Generates comprehensive guide posts',
      content: 'Create an ultimate guide about [topic]. Include: 1) Comprehensive introduction and importance, 2) Historical background, 3) Current state and trends, 4) Best practices and strategies, 5) Tools and resources, 6) Expert tips and advice, 7) Common challenges and solutions, 8) Future outlook.',
      lastUsed: '5 days ago',
      tags: ['guide', 'comprehensive', 'blog']
    },
    {
      id: 9,
      title: 'Comparison Post Generator',
      description: 'Creates detailed comparison articles',
      content: 'Write a comparison post between [option 1] and [option 2]. Include: 1) Brief overview of both options, 2) Feature-by-feature comparison, 3) Pricing comparison, 4) Use case scenarios, 5) Pros and cons of each, 6) Ideal user profiles, 7) Final recommendations based on different needs.',
      lastUsed: '2 days ago',
      tags: ['comparison', 'review', 'blog']
    },
    {
      id: 10,
      title: 'Research Summary Post',
      description: 'Summarizes research findings for blog format',
      content: 'Create a blog post summarizing research about [topic]. Include: 1) Research background and objectives, 2) Methodology overview, 3) Key findings and statistics, 4) Practical implications, 5) Expert commentary, 6) Limitations and future research needs, 7) Action steps for readers.',
      lastUsed: '1 week ago',
      tags: ['research', 'academic', 'blog']
    },
    {
      id: 11,
      title: 'Trend Analysis Post',
      description: 'Analyzes and predicts industry trends',
      content: 'Write a trend analysis post about [industry/topic]. Include: 1) Current state of the industry, 2) Emerging trends and patterns, 3) Data and statistics supporting trends, 4) Expert predictions, 5) Impact on businesses and consumers, 6) How to prepare for these trends, 7) Action steps for readers.',
      lastUsed: '3 days ago',
      tags: ['trends', 'analysis', 'blog']
    },
    {
      id: 12,
      title: 'Problem-Solution Post',
      description: 'Creates solution-focused content',
      content: 'Write a problem-solution blog post about [common challenge]. Include: 1) Problem definition and impact, 2) Root causes and contributing factors, 3) Common misconceptions, 4) Step-by-step solution process, 5) Alternative approaches, 6) Prevention strategies, 7) Success stories and examples.',
      lastUsed: '4 days ago',
      tags: ['solution', 'how-to', 'blog']
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
    },
    {
      id: 7,
      title: 'TikTok Script Generator',
      description: 'Creates engaging scripts for TikTok videos',
      content: 'Create a TikTok script for a [duration] video about [topic]. Include: 1) A hook within first 3 seconds, 2) Key points or steps, 3) Trending sound/music suggestions, 4) On-screen text recommendations, 5) Transition ideas, 6) Call-to-action for engagement. Keep language conversational and energetic.',
      lastUsed: '2 days ago',
      tags: ['tiktok', 'video']
    },
    {
      id: 8,
      title: 'Social Media Poll Creator',
      description: 'Generates engaging poll questions for social platforms',
      content: 'Design an engaging poll for [platform] about [topic]. Include: 1) An attention-grabbing question, 2) 2-4 compelling answer options, 3) Follow-up discussion prompts, 4) Relevant hashtags, 5) Best time to post recommendations. Make it relevant to [target audience] and their interests.',
      lastUsed: '5 days ago',
      tags: ['poll', 'engagement']
    },
    {
      id: 9,
      title: 'Social Media Contest Announcement',
      description: 'Creates contest/giveaway announcements',
      content: 'Create a social media contest announcement for [platform]. Include: 1) Exciting prize description, 2) Clear entry rules and steps, 3) Contest duration, 4) Eligibility requirements, 5) Winner selection process, 6) Required disclaimers, 7) Branded hashtags. Make it compelling and easy to understand.',
      lastUsed: '1 week ago',
      tags: ['contest', 'giveaway']
    },
    {
      id: 10,
      title: 'Social Media Story Sequence',
      description: 'Plans engaging story sequences for Instagram/Facebook',
      content: 'Design a story sequence for [platform] about [topic]. Plan: 1) Opening hook story, 2) 3-5 content pieces that build narrative, 3) Interactive elements (polls, questions, sliders), 4) Behind-the-scenes content, 5) Call-to-action story. Include suggestions for stickers, music, and timing.',
      lastUsed: '6 days ago',
      tags: ['stories', 'sequence']
    },
    {
      id: 11,
      title: 'Social Media Carousel Creator',
      description: 'Structures carousel posts for maximum engagement',
      content: 'Create a carousel post about [topic] for [platform]. Include: 1) Attention-grabbing first slide, 2) 5-10 slides of valuable content, 3) Design suggestions for each slide, 4) Connecting narrative between slides, 5) Effective caption structure, 6) Call-to-action on final slide. Focus on educational or inspirational content.',
      lastUsed: '2 days ago',
      tags: ['carousel', 'slides']
    }
  ],
  3: emailPrompts,
  4: seoPrompts,
  5: technicalPrompts,
  6: creativeStoryPrompts
};
