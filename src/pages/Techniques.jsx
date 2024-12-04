import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const promptingTechniques = [
  {
    id: 1,
    title: "Zero-Shot Prompting",
    description: "Leverages AI's pre-trained knowledge without examples or context",
    example: `Write a comprehensive product description for a new smart water bottle that tracks hydration levels. Include features, benefits, and target audience. Format the response with clear sections and bullet points.`,
    why: "Zero-shot prompting involves asking the AI to perform a task without providing any examples or additional context. It leverages the AI's pre-trained knowledge to generate responses based solely on the instruction."
  },
  {
    id: 2,
    title: "Few-Shot Prompting",
    description: "Provides examples to help the AI understand the desired pattern",
    example: `Transform these technical explanations into simple analogies that a 10-year-old could understand:

1. "DNS servers are like the internet's phone book" - They help computers find the right website address, just like a phone book helps you find someone's phone number.
2. "RAM is like a desk workspace" - It's where your computer does its current work, just like you spread papers on a desk while working.
3. "Blockchain technology is like..." (complete this analogy)
4. "Machine learning algorithms are like..." (complete this analogy)`,
    why: "Few-shot prompting provides the AI with a few examples of the desired output. This helps the model understand the pattern or format you expect, improving the relevance and accuracy of the response."
  },
  {
    id: 3,
    title: "Chain-of-Thought Prompting",
    description: "Encourages step-by-step reasoning for complex problems",
    example: `Solve this business scenario and explain your reasoning at each step:

A software company offers three subscription tiers:
- Basic: $10/month with 100 API calls/day
- Pro: $50/month with 1000 API calls/day
- Enterprise: $200/month with 5000 API calls/day

A startup expects to make 2000 API calls per day and wants the most cost-effective plan for a year. They're also considering buying additional API calls at $0.05 per call if needed.

What's the most economical solution? Show your calculations and decision-making process.`,
    why: "This technique encourages the AI to display its reasoning process step by step. It can enhance the model's ability to solve complex problems by breaking them down into manageable parts."
  },
  {
    id: 4,
    title: "Role-Playing",
    description: "Assigns specific roles for tailored expertise",
    example: `You are an experienced UX researcher conducting a thorough analysis of a mobile banking app. Consider:

1. User Demographics: Focus on both tech-savvy millennials and older users who are less comfortable with digital banking
2. Key Features: Account management, transfers, bill payments, and mobile check deposits
3. Pain Points: Security concerns, transaction complexity, and accessibility issues

Provide a detailed UX analysis report that includes:
- Key usability findings
- Specific pain points for different user groups
- Prioritized recommendations for improvement
- Suggested A/B tests to validate solutions`,
    why: "Assigning a specific role or persona to the AI helps generate responses from a particular perspective or expertise, making the output more tailored and authentic."
  },
  {
    id: 5,
    title: "Setting Constraints and Guidelines",
    description: "Directs AI responses within specific parameters",
    example: `Create a one-week meal plan with the following constraints:

1. Dietary Requirements:
   - Vegetarian
   - Gluten-free
   - High-protein (minimum 60g per day)

2. Additional Parameters:
   - Budget: $100 maximum for the week
   - Prep time: Under 30 minutes per meal
   - No repeated main dishes
   - Include estimated costs and prep times
   - Must use seasonal ingredients for autumn

Format the response with daily breakfast, lunch, and dinner options, including key nutritional information and shopping list.`,
    why: "Providing specific constraints directs the AI to generate responses within certain parameters, improving the relevance and usefulness of the output."
  },
  {
    id: 6,
    title: "Explicit Formatting Instructions",
    description: "Ensures organized and well-structured responses",
    example: `Create a detailed comparison of three leading project management methodologies (Agile, Waterfall, and Kanban) using the following format:

1. For each methodology, create a section with:
   - Core Principles (bullet points)
   - Best Use Cases (numbered list)
   - Key Benefits (bullet points)
   - Potential Drawbacks (bullet points)
   - Team Size Recommendations

2. Then create a comparison table with the following columns:
   | Methodology | Learning Curve | Flexibility | Documentation | Client Involvement | Release Frequency |
   
3. Finally, add a "Quick Decision Guide" section with:
   - When to Choose Each Method
   - Industry-Specific Recommendations
   - Team Size Considerations

Use markdown formatting for headers and lists. Include emojis at the start of each main section for visual appeal.`,
    why: "Specifying the desired format ensures the AI's response is organized and presented in a way that meets your needs."
  },
  {
    id: 7,
    title: "Asking Open-Ended Questions",
    description: "Encourages detailed and comprehensive responses",
    example: `Explore the future of urban transportation in 2050, considering:

1. Technological Advancements:
   - How might autonomous vehicles reshape city planning?
   - What role will vertical transportation play in megacities?
   - How will AI integrate with traffic management systems?

2. Environmental Impacts:
   - How will cities adapt to zero-emission requirements?
   - What sustainable energy solutions will power transportation?

3. Social Implications:
   - How will changes in transportation affect social inequality?
   - What new jobs and industries might emerge?
   - How will these changes impact public health and lifestyle?

4. Infrastructure Evolution:
   - What will happen to existing parking spaces and gas stations?
   - How will buildings and roads adapt to new transportation methods?

Provide specific examples and potential scenarios for each aspect discussed.`,
    why: "Open-ended questions encourage the AI to provide detailed and informative responses rather than brief answers."
  },
  {
    id: 8,
    title: "Using Directives and Verbs",
    description: "Clearly communicates expected actions",
    example: `For a new employee onboarding guide about cybersecurity best practices:

1. EXPLAIN the importance of password security using real-world analogies
2. DESCRIBE step-by-step how to:
   - Set up two-factor authentication
   - Create and manage secure passwords
   - Identify potential phishing emails

3. ANALYZE common security threats in a remote work environment
4. DEMONSTRATE proper handling of sensitive data with specific examples
5. ILLUSTRATE the company's incident reporting procedure using a flowchart format
6. SUMMARIZE key takeaways in a memorable format
7. PROVIDE a quick-reference checklist for daily security practices

Use clear headings, bullet points, and highlight crucial information in bold. Include practical examples for each section.`,
    why: "Starting prompts with action verbs like 'explain,' 'describe,' or 'summarize' clearly communicates the expected action, leading to more precise responses."
  },
  {
    id: 9,
    title: "Providing Context",
    description: "Helps AI understand the broader situation",
    example: `Context: You're helping a small local bookstore (20 years in business, 3000 sq ft retail space) adapt to modern retail challenges. They're facing increasing competition from online retailers and declining foot traffic. Their current customer base is aging, but the store is located near a university campus. They have a limited budget of $15,000 for improvements.

Based on this context, provide a detailed strategic plan that addresses:

1. Digital Transformation Opportunities
   - E-commerce integration options
   - Social media strategy
   - Online community building

2. Physical Store Enhancement
   - Store layout optimization
   - Study space integration
   - Event space creation

3. Marketing Initiatives
   - Student-focused programs
   - Loyalty system modernization
   - Community engagement opportunities

4. Budget Allocation
   - Prioritized improvements
   - Expected ROI for each initiative
   - Implementation timeline

Include specific recommendations that consider their unique situation, constraints, and opportunities.`,
    why: "Offering background information helps the AI understand the situation better, resulting in a more accurate and relevant response."
  },
  {
    id: 10,
    title: "Incremental Prompting",
    description: "Breaks down complex tasks into manageable steps",
    example: `Let's develop a comprehensive content strategy for launching a new health and wellness app. We'll break this down into sequential steps:

Step 1: First, analyze our target audience by creating detailed user personas. Include:
- Demographics
- Pain points
- Goals and motivations
- Content consumption habits

Step 2: Based on these personas, outline content pillars and themes that would resonate with each group.

Step 3: For each content pillar identified, develop:
- Content types (articles, videos, infographics)
- Key messaging points
- Tone and style guidelines
- Distribution channels

Step 4: Create a content calendar template that includes:
- Publication schedule
- Content categories
- Assignment workflow
- Performance metrics

Step 5: Finally, establish success metrics and KPIs for:
- Engagement rates
- User acquisition
- Retention metrics
- Conversion goals

Please complete each step before moving to the next, as each builds upon the previous one.`,
    why: "Breaking down a complex task into smaller, sequential prompts can help the AI address each part thoroughly."
  },
  {
    id: 11,
    title: "Emphasizing Tone and Style",
    description: "Guides language and presentation style",
    example: `Draft three versions of an email announcing a company-wide restructuring, each with a different tone and purpose:

1. Formal Executive Announcement:
   - Professional and authoritative tone
   - Focus on strategic benefits
   - Include specific organizational changes
   - Address potential concerns professionally

2. Manager's Team Communication:
   - Empathetic and supportive tone
   - Emphasize team impact and opportunities
   - Include practical next steps
   - Encourage open dialogue

3. Internal Newsletter Style:
   - Balanced and informative tone
   - Focus on positive changes and growth
   - Include employee success stories
   - Highlight future opportunities

For each version:
- Include appropriate greetings and closings
- Maintain consistent voice throughout
- Use appropriate corporate language/jargon level
- Add specific examples and data points
- Include clear call-to-action

Note: Ensure each version conveys the same core message while adapting the style to suit its specific audience and purpose.`,
    why: "Specifying the desired tone or style guides the AI to tailor its language, making the response more suitable for the intended audience."
  },
  {
    id: 12,
    title: "Utilizing Analogies and Metaphors",
    description: "Makes complex concepts more accessible",
    example: `Explain the following advanced computing concepts using creative analogies that would be understood by non-technical business executives:

1. Cloud Computing Infrastructure
   Create an analogy using a modern city's infrastructure, including:
   - Data centers as districts
   - Servers as buildings
   - Network connections as transportation systems
   - Security measures as law enforcement
   - Scalability as city planning and growth

2. Machine Learning Process
   Develop an analogy comparing it to a child learning to cook:
   - Training data as recipes and cooking shows
   - Algorithms as cooking methods
   - Parameters as ingredients and measurements
   - Testing as taste testing
   - Refinement as recipe adjustments

3. Cybersecurity Layers
   Present an analogy using a medieval castle's defenses:
   - Explain how each security layer corresponds to castle defenses
   - Compare modern threats to historical siege tactics
   - Relate security protocols to castle guard procedures
   - Connect data backup to food storage and supply lines

For each analogy:
- Start with the familiar concept
- Build complexity gradually
- Include specific examples
- Address common misconceptions
- Provide real-world applications`,
    why: "Asking the AI to explain concepts using analogies can make complex ideas more understandable."
  },
  {
    id: 13,
    title: "Reframing Questions",
    description: "Improves clarity and response quality",
    example: `Help improve these vague questions by reframing them into specific, actionable queries that will generate more useful responses:

1. Original: "How can I make my website better?"
   Reframe as:
   "What specific improvements can I implement to:
   - Reduce page load time below 3 seconds
   - Increase mobile user engagement
   - Improve conversion rates on product pages
   - Enhance accessibility for users with disabilities
   Please provide measurable metrics and implementation steps for each aspect."

2. Original: "Why isn't my marketing working?"
   Reframe as:
   "Based on these metrics [list current KPIs], what are:
   - The top 3 bottlenecks in our current marketing funnel
   - Specific strategies to address each bottleneck
   - Industry benchmarks we should target
   - Required resources and timeline for implementation"

3. Original: "What's the best programming language to learn?"
   Reframe as:
   "Given my background in [specific field] and goal to [specific objective], which programming language would be most beneficial to learn if I can dedicate 10 hours per week for 6 months? Consider:
   - Job market demand
   - Learning curve
   - Available resources
   - Practical applications in my field"

Include methodology for reframing each type of question to make it more specific and actionable.`,
    why: "If initial responses aren't satisfactory, rephrasing the prompt can provide clarity and lead to better results."
  },
  {
    id: 14,
    title: "Encouraging Creativity",
    description: "Generates unique and imaginative responses",
    example: `Design an innovative educational system for the year 2050. Be creative and consider:

1. Learning Environment:
   - Imagine new physical and virtual spaces
   - Design innovative learning tools
   - Create unique student interaction methods
   - Develop novel assessment approaches

2. Curriculum Structure:
   - Invent new subject combinations
   - Design cross-disciplinary learning paths
   - Create future-focused skill development programs
   - Develop innovative project-based learning methods

3. Technology Integration:
   - Envision new forms of AI-assisted learning
   - Design immersive learning experiences
   - Create novel collaborative tools
   - Develop adaptive learning systems

4. Social and Emotional Components:
   - Design new approaches to social skill development
   - Create innovative emotional intelligence training
   - Develop unique community building methods
   - Imagine new ways of fostering creativity

5. Assessment and Progress:
   - Invent new evaluation methods
   - Design innovative feedback systems
   - Create unique achievement recognition approaches
   - Develop novel progress tracking tools

Be bold and imaginative - there are no constraints except that the ideas must be theoretically possible with advanced technology.`,
    why: "Prompting the AI to be creative can generate unique and imaginative responses."
  },
  {
    id: 15,
    title: "Requesting Summaries or Syntheses",
    description: "Distills information into key points",
    example: `Synthesize the following complex topics into clear, structured summaries with different levels of detail:

1. Create a multi-level summary of recent advancements in renewable energy:

   Executive Summary (50 words):
   - Key breakthroughs
   - Major impact points
   - Future implications

   Technical Overview (200 words):
   - Detailed technological advances
   - Implementation challenges
   - Market implications
   - Research directions

   Comprehensive Analysis (500 words):
   - In-depth technology explanation
   - Economic implications
   - Environmental impact
   - Policy recommendations
   - Future research needs

2. Include for each level:
   - Key statistics and data points
   - Critical developments
   - Major challenges
   - Future projections
   - Action items

3. Format each summary with:
   - Clear headings
   - Bullet points for key information
   - Bold text for crucial points
   - Tables for comparative data
   - Citations for key claims

Ensure each level maintains accuracy while adjusting detail and complexity for different audiences.`,
    why: "Asking for a summary or synthesis encourages the AI to distill information into its key points."
  },
  {
    id: 16,
    title: "Asking for Pros and Cons",
    description: "Promotes balanced perspective analysis",
    example: `Analyze the implications of implementing a four-day workweek in a global technology company. Consider multiple stakeholder perspectives and provide a comprehensive pros and cons analysis:

1. Employee Impact
   Pros:
   - Work-life balance specifics
   - Mental health benefits
   - Productivity improvements
   - Cost savings (commute, childcare)

   Cons:
   - Potential salary adjustments
   - Longer daily hours
   - Team coordination challenges
   - Career progression concerns

2. Business Operations
   Pros:
   - Reduced operational costs
   - Enhanced employee retention
   - Competitive hiring advantage
   - Environmental impact reduction

   Cons:
   - Customer service challenges
   - Project timeline impacts
   - Communication complexity
   - Training/onboarding adjustments

3. Financial Considerations
   Pros:
   - Utility cost reduction
   - Lower employee turnover costs
   - Potential productivity gains
   - Reduced sick leave usage

   Cons:
   - Implementation costs
   - Potential overtime increases
   - System restructuring expenses
   - Short-term productivity dips

4. For each aspect, include:
   - Quantitative metrics where possible
   - Industry-specific considerations
   - Implementation challenges
   - Mitigation strategies
   - Long-term implications

Conclude with specific recommendations based on the analysis.`,
    why: "This technique prompts the AI to consider multiple perspectives, providing a balanced view on a topic."
  },
  {
    id: 17,
    title: "Specifying Audience",
    description: "Tailors content for target readers",
    example: `Explain the concept of blockchain technology to four different audiences. Adjust the complexity, terminology, and examples for each:

1. Elementary School Students (Ages 8-11)
   Requirements:
   - Use playground analogies
   - Include simple drawings or diagrams
   - Interactive examples
   - Focus on basic concepts
   - Avoid technical terms

2. High School Students (Ages 14-18)
   Requirements:
   - Include mathematical concepts
   - Real-world applications
   - Current technology examples
   - Basic technical terminology
   - Career opportunities

3. Business Executives (Non-Technical)
   Requirements:
   - Focus on business value
   - ROI examples
   - Industry applications
   - Risk assessment
   - Market opportunities
   - Implementation considerations

4. Senior Citizens Learning Technology
   Requirements:
   - Relate to familiar concepts
   - Step-by-step explanations
   - Practical use cases
   - Security and safety focus
   - Clear, large text format
   - Repetition of key points

For each audience:
- Start with a hook relevant to their interests
- Use appropriate vocabulary level
- Include engagement questions
- Provide relevant examples
- End with practical applications`,
    why: "Indicating the target audience helps the AI tailor the language and content appropriately."
  },
  {
    id: 18,
    title: "Combining Multiple Techniques",
    description: "Enhances response depth and quality",
    example: `Create a comprehensive employee wellness program proposal combining multiple prompting techniques:

1. Role-Playing Technique:
   "As an experienced wellness consultant with 15 years in corporate health programs..."

2. Setting Constraints:
   Budget: $50,000 annually
   Timeline: 6-month implementation
   Company Size: 500 employees
   Demographics: Multi-generational workforce
   Locations: 3 office sites

3. Explicit Formatting:
   Structure the proposal with:
   - Executive Summary
   - Program Components
   - Implementation Timeline
   - Budget Breakdown
   - Success Metrics

4. Chain-of-Thought Analysis:
   Walk through the decision-making process for:
   - Program selection criteria
   - Resource allocation
   - Risk assessment
   - ROI calculations

5. Open-Ended Questions:
   Address:
   - How will this program adapt to remote workers?
   - What cultural changes might be needed?
   - How can we ensure long-term engagement?

6. Providing Context:
   Include industry trends, competitor analysis, and relevant case studies

7. Audience Consideration:
   Create sections for:
   - C-level executives (ROI focus)
   - HR team (implementation details)
   - Employees (program benefits)

Combine all these techniques to create a comprehensive, well-structured, and persuasive proposal.`,
    why: "Using several techniques together can enhance the depth and quality of the response."
  },
  {
    id: 19,
    title: "Guiding with Examples",
    description: "Sets clear expectations through examples",
    example: `Create product descriptions for an e-commerce website following these example patterns:

1. Technical Product Example:
   "The Sony WH-1000XM4 Headphones deliver industry-leading noise cancellation through dual noise sensor microphones and advanced AI algorithms. With 30-hour battery life and touch-sensitive controls, these premium headphones offer audiophile-quality sound in a comfortable, lightweight design."

2. Fashion Item Example:
   "This handcrafted leather tote combines timeless elegance with modern functionality. The full-grain Italian leather develops a beautiful patina over time, while the spacious interior easily accommodates a 15-inch laptop and daily essentials."

Now, create similar descriptions for:
- A smart home security system
- A premium coffee maker
- A fitness tracking watch
- An ergonomic office chair

For each description, include:
- Opening hook
- Key features (2-3)
- Unique selling points
- Target user benefits
- Technical specifications
- Emotional appeal
- Call to action

Guidelines:
- Maintain consistent tone and length
- Use industry-appropriate terminology
- Include searchable keywords
- Balance technical details with benefits
- Address common customer concerns
- Highlight competitive advantages`,
    why: "Providing examples within the prompt can clarify what you're asking for and set expectations."
  },
  {
    id: 20,
    title: "Encouraging Critical Thinking",
    description: "Stimulates thoughtful analysis",
    example: `Analyze the societal implications of widespread AI adoption in healthcare systems. Structure your analysis using these critical thinking frameworks:

1. Stakeholder Analysis
   Examine impacts on:
   - Patients
     * Access to care
     * Quality of treatment
     * Privacy concerns
   - Healthcare Providers
     * Job security
     * Skill requirements
     * Work-life balance
   - Healthcare Organizations
     * Cost implications
     * Legal considerations
     * Infrastructure needs
   - Society at Large
     * Healthcare equality
     * Ethical considerations
     * Economic impacts

2. SWOT Analysis
   - Strengths of AI in healthcare
   - Weaknesses in current implementation
   - Opportunities for improvement
   - Threats to consider

3. Ethical Framework
   Evaluate:
   - Patient autonomy
   - Data privacy
   - Algorithmic bias
   - Access equality
   - Human oversight
   - Error accountability

4. Future Scenarios
   Analyze potential outcomes:
   - Best case scenario
   - Worst case scenario
   - Most likely scenario
   - Unexpected consequences

5. Recommendations
   Develop:
   - Policy guidelines
   - Implementation strategies
   - Risk mitigation plans
   - Success metrics
   - Timeline considerations

Support all analyses with:
- Current research
- Real-world examples
- Expert opinions
- Statistical data
- Case studies`,
    why: "Prompting the AI to analyze or evaluate stimulates more thoughtful and in-depth responses."
  }
];

const TechniqueCard = ({ technique, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const gradients = [
    "from-blue-500/5 to-indigo-500/5 hover:from-blue-500/10 hover:to-indigo-500/10",
    "from-purple-500/5 to-pink-500/5 hover:from-purple-500/10 hover:to-pink-500/10",
    "from-green-500/5 to-emerald-500/5 hover:from-green-500/10 hover:to-emerald-500/10",
    "from-orange-500/5 to-red-500/5 hover:from-orange-500/10 hover:to-red-500/10",
    "from-pink-500/5 to-rose-500/5 hover:from-pink-500/10 hover:to-rose-500/10",
  ];

  const gradient = gradients[index % gradients.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Card className={cn(
        "h-full transition-all duration-300 relative overflow-hidden",
        "hover:shadow-lg hover:shadow-primary/20",
        "border-2 border-transparent",
        isExpanded ? "!border-primary" : "hover:border-primary/50",
        "bg-gradient-to-br",
        gradient
      )}>
        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">
                {technique.title}
              </CardTitle>
              <CardDescription className="mt-2">
                {technique.description}
              </CardDescription>
            </div>
            <div className={cn(
              "w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center",
              "text-lg font-bold text-primary/70 group-hover:text-primary transition-colors duration-300",
              "border-2 border-primary/20 group-hover:border-primary/40"
            )}>
              {index + 1}
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative space-y-4">
          <div>
            <h3 className="font-semibold mb-2 text-primary">Why it works:</h3>
            <p className="text-sm text-muted-foreground">{technique.why}</p>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-primary">Example:</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs"
              >
                {isExpanded ? "Show Less" : "Show More"}
              </Button>
            </div>
            <div className={cn(
              "transition-all duration-300 overflow-hidden",
              isExpanded ? "max-h-[500px]" : "max-h-[80px]"
            )}>
              <div className="rounded-md bg-background/80 p-4 border border-muted">
                <pre className="text-sm whitespace-pre-wrap font-mono">{technique.example}</pre>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Techniques = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
            Prompting Techniques
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Master the art of crafting effective prompts for AI interactions with these powerful techniques
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promptingTechniques.map((technique, index) => (
            <TechniqueCard 
              key={technique.id} 
              technique={technique} 
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Techniques;
