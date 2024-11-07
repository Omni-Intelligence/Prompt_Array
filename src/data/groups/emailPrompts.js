export const emailPrompts = [
  {
    id: 'email-1',
    title: 'Welcome Email Sequence',
    description: 'Creates a warm welcome email series for new subscribers',
    content: 'Create a 5-part welcome email sequence that includes: 1) Day 1: Warm welcome and immediate value delivery, 2) Day 3: Story and brand introduction, 3) Day 5: Key resources and popular content, 4) Day 7: Social proof and success stories, 5) Day 10: Special offer or exclusive content. Each email should maintain [brand voice] and include clear CTAs.',
    lastUsed: '2 days ago',
    tags: ['welcome-series', 'automation', 'onboarding']
  },
  {
    id: 'email-2',
    title: 'Abandoned Cart Recovery',
    description: 'Email sequence to recover abandoned shopping carts',
    content: 'Write a 3-part abandoned cart recovery sequence: 1) 1 hour after: Friendly reminder with cart contents and "Complete your purchase" CTA, 2) 24 hours: Social proof, reviews, and limited-time discount, 3) 48 hours: Final reminder with urgency and scarcity elements. Include personalization tokens for [product names], [prices], and [customer name].',
    lastUsed: '1 day ago',
    tags: ['ecommerce', 'recovery', 'sales']
  },
  {
    id: 'email-3',
    title: 'Monthly Newsletter Template',
    description: 'Structured template for monthly newsletters',
    content: 'Create a monthly newsletter template with sections for: 1) Editor\'s Note, 2) Industry News Roundup, 3) Featured Article, 4) Customer Success Story, 5) Product Updates, 6) Upcoming Events, 7) Resource of the Month, 8) Social Media Highlights. Include dynamic content blocks for [personalization tokens] and maintain consistent branding throughout.',
    lastUsed: '3 days ago',
    tags: ['newsletter', 'monthly', 'content']
  },
  {
    id: 'email-4',
    title: 'Product Launch Campaign',
    description: 'Multi-email sequence for new product launches',
    content: 'Design a 6-part product launch email sequence: 1) Teaser email with curiosity hook, 2) Problem-focused email highlighting pain points, 3) Solution reveal with product benefits, 4) Social proof and early adopter testimonials, 5) Launch day announcement with special offer, 6) Last chance reminder with scarcity elements. Include [product images], [feature lists], and [pricing details].',
    lastUsed: '5 days ago',
    tags: ['launch', 'product', 'sales']
  },
  {
    id: 'email-5',
    title: 'Customer Re-engagement',
    description: 'Win-back campaign for inactive subscribers',
    content: 'Create a re-engagement campaign with 4 emails: 1) "We miss you" message with personalized content recommendations, 2) Exclusive comeback offer, 3) Account summary and missed updates, 4) Final attempt with survey and preference update option. Use engagement tracking tokens [last_purchase_date], [previous_interactions], and [customer_segment].',
    lastUsed: '1 week ago',
    tags: ['re-engagement', 'retention', 'win-back']
  },
  {
    id: 'email-6',
    title: 'Event Promotion Series',
    description: 'Email sequence for promoting events',
    content: 'Develop a 5-part event promotion sequence: 1) Save the date announcement, 2) Early bird registration with special pricing, 3) Speaker/content highlights and agenda preview, 4) Last chance for regular registration, 5) Final reminder with FOMO elements. Include [event details], [speaker bios], and [registration links].',
    lastUsed: '4 days ago',
    tags: ['events', 'promotion', 'registration']
  },
  {
    id: 'email-7',
    title: 'Customer Feedback Request',
    description: 'Email template for gathering customer feedback',
    content: 'Write a feedback request email series: 1) Initial request with clear value proposition, 2) First reminder with social proof of feedback impact, 3) Final reminder with incentive offer. Include [survey link], [estimated completion time], and [reward details]. Focus on making the feedback process easy and valuable for customers.',
    lastUsed: '2 days ago',
    tags: ['feedback', 'survey', 'customer-insight']
  },
  {
    id: 'email-8',
    title: 'Seasonal Campaign Template',
    description: 'Templates for holiday and seasonal promotions',
    content: 'Create a seasonal campaign template adaptable for major holidays: 1) Early announcement with theme introduction, 2) Main promotion with special offers, 3) Mid-season update with bestsellers, 4) Last chance reminder. Include placeholders for [seasonal imagery], [promotion details], and [countdown timers].',
    lastUsed: '6 days ago',
    tags: ['seasonal', 'holiday', 'promotion']
  },
  {
    id: 'email-9',
    title: 'Educational Course Sequence',
    description: 'Email series for educational content delivery',
    content: 'Design a 7-part educational email course: 1) Welcome and course overview, 2-6) Core lessons with actionable content, 7) Course completion and next steps. Include [lesson materials], [action items], [resource links], and [progress tracking]. Maintain consistent formatting and clear learning objectives.',
    lastUsed: '3 days ago',
    tags: ['education', 'course', 'nurture']
  },
  {
    id: 'email-10',
    title: 'VIP Customer Appreciation',
    description: 'Special emails for high-value customers',
    content: 'Create a VIP customer appreciation series: 1) Exclusive preview of new products/features, 2) Special VIP-only offers, 3) Personal thank you message, 4) Early access invitation. Include [personalized recommendations], [loyalty program status], and [exclusive perks].',
    lastUsed: '1 week ago',
    tags: ['vip', 'loyalty', 'appreciation']
  },
  {
    id: 'email-11',
    title: 'Post-Purchase Sequence',
    description: 'Follow-up emails after customer purchase',
    content: 'Develop a post-purchase email sequence: 1) Order confirmation with tracking, 2) Delivery update, 3) Product usage tips and resources, 4) Review request, 5) Cross-sell recommendations. Include [order details], [tracking information], and [product-specific content].',
    lastUsed: '2 days ago',
    tags: ['post-purchase', 'follow-up', 'customer-service']
  },
  {
    id: 'email-12',
    title: 'Free Trial Conversion',
    description: 'Emails to convert free trial users',
    content: 'Write a free trial conversion sequence: 1) Welcome and setup guide, 2) Feature highlight and use cases, 3) Success stories and ROI examples, 4) Trial expiration reminder with special offer, 5) Last chance conversion email. Include [trial status], [usage statistics], and [upgrade links].',
    lastUsed: '4 days ago',
    tags: ['conversion', 'trial', 'saas']
  },
  {
    id: 'email-13',
    title: 'Referral Program Emails',
    description: 'Templates for promoting referral programs',
    content: 'Create a referral program email series: 1) Program introduction and benefits, 2) How-to guide with examples, 3) Success stories from referrers, 4) Reminder with program stats, 5) Special bonus promotion. Include [referral links], [reward details], and [program statistics].',
    lastUsed: '5 days ago',
    tags: ['referral', 'growth', 'rewards']
  },
  {
    id: 'email-14',
    title: 'Product Update Announcement',
    description: 'Emails announcing new features or updates',
    content: 'Design a product update announcement sequence: 1) Teaser email with coming soon message, 2) Main announcement with feature details, 3) User guide and tips, 4) Success stories with new features. Include [feature screenshots], [tutorial videos], and [help documentation].',
    lastUsed: '3 days ago',
    tags: ['product-updates', 'features', 'announcement']
  },
  {
    id: 'email-15',
    title: 'Customer Milestone Celebration',
    description: 'Emails celebrating customer achievements',
    content: 'Create milestone celebration emails for: 1) Account anniversary, 2) Usage achievements, 3) Loyalty program levels, 4) Community contributions. Include [achievement details], [personalized stats], and [celebration rewards]. Focus on making customers feel valued and recognized.',
    lastUsed: '1 week ago',
    tags: ['milestone', 'celebration', 'loyalty']
  }
];