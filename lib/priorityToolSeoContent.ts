export type PriorityToolSeoContent = {
  name: string;
  intro: string;
  audience: string[];
  inputs: string[];
  outputs: string[];
  steps: { title: string; description: string }[];
  useCases: { title: string; description: string }[];
  exampleInput: string;
  exampleOutput: string;
  limitations: string[];
  faqs: { question: string; answer: string }[];
  relatedTools: { label: string; href: string }[];
  relatedContent: { label: string; href: string; type: string }[];
};

export const priorityToolSeoContent: Record<string, PriorityToolSeoContent> = {
  'ai-business-plan': {
    name: 'AI Business Plan Generator',
    intro: 'Turn a specific business idea into a structured planning draft covering the problem, customer, offer, market, operations, risks, milestones, and financial assumptions. It is designed for planning and discussion—not as a substitute for verified market research, accounting, legal advice, or lender-ready financial statements.',
    audience: ['Founders validating a new venture', 'Students preparing an entrepreneurship project', 'Small-business owners documenting a growth plan', 'Consultants creating a first client-planning draft'],
    inputs: ['Business idea and location', 'Target customer and customer problem', 'Product, service, and pricing approach', 'Sales channels, resources, costs, and goals'],
    outputs: ['Executive-summary draft', 'Market and customer assumptions', 'Marketing and operations plan', 'Risks, milestones, and financial-assumption checklist'],
    steps: [
      { title: 'Describe the business', description: 'Give a concrete offer, customer, geography, current stage, and objective.' },
      { title: 'Add evidence and constraints', description: 'Include known prices, costs, competitors, capacity, budget, and assumptions.' },
      { title: 'Review section by section', description: 'Replace assumptions with research and validate legal, tax, and financial details.' },
    ],
    useCases: [
      { title: 'Idea validation', description: 'Expose missing customer, revenue, cost, and execution assumptions before investing heavily.' },
      { title: 'Internal planning', description: 'Create a shared operating draft for priorities, owners, milestones, and risks.' },
      { title: 'Advisor preparation', description: 'Organize questions and evidence before meeting an accountant, mentor, lender, or investor.' },
    ],
    exampleInput: 'A subscription-based healthy lunch service for 100 office workers in Hyderabad, priced at ₹2,499 per month, delivered on weekdays through one central kitchen.',
    exampleOutput: 'A sectioned draft outlining the office-worker problem, subscription offer, buyer profile, kitchen and delivery workflow, acquisition channels, capacity assumptions, unit-economics questions, launch milestones, and risks requiring validation.',
    limitations: ['Market size and competitor facts must be researched independently.', 'Generated revenue or cost figures are assumptions unless you supplied verified data.', 'Have qualified professionals review tax, legal, funding, and financial decisions.'],
    faqs: [
      { question: 'Can this create an investor-ready business plan?', answer: 'It creates a strong planning draft. Investor, lender, and grant submissions still need verified research, evidence, financial models, and professional review.' },
      { question: 'What information produces a better plan?', answer: 'Specific customer, location, pricing, costs, competitors, current traction, resources, constraints, and measurable goals produce a more useful draft.' },
      { question: 'Does it calculate accurate financial projections?', answer: 'It can organize assumptions, but projections are only as reliable as the data supplied. Validate them in a financial model with an accountant or finance professional.' },
      { question: 'Can I use it for an existing business?', answer: 'Yes. Provide current revenue, customer segments, operating constraints, growth objective, and known risks so the plan focuses on the next stage.' },
    ],
    relatedTools: [
      { label: 'AI Business Model Canvas', href: '/tools/ai-business-model' }, { label: 'AI SWOT Analysis', href: '/tools/ai-swot-analysis' },
      { label: 'AI Competitor Analysis', href: '/tools/ai-competitor-analysis' }, { label: 'AI Pitch Deck Generator', href: '/tools/ai-pitch-deck' },
    ],
    relatedContent: [
      { label: 'Explore business AI tools', href: '/tools/category/business', type: 'Tool collection' },
      { label: 'Browse business prompts', href: '/prompts/category/business', type: 'Prompt collection' },
      { label: 'Read practical AI articles', href: '/articles', type: 'Articles' },
    ],
  },
  'ai-business-model': {
    name: 'AI Business Model Canvas',
    intro: 'Map how a business creates, delivers, and captures value across the nine Business Model Canvas areas. The tool helps teams connect customer segments and value propositions with channels, relationships, revenue, resources, activities, partners, and costs so contradictions become easier to spot.',
    audience: ['Early-stage founders', 'Product and innovation teams', 'Business students and workshop facilitators', 'Owners testing a new offer or market'],
    inputs: ['Offer and customer problem', 'Customer segments and buying behavior', 'Channels, relationships, and revenue model', 'Key resources, activities, partners, and costs'],
    outputs: ['Nine-block canvas draft', 'Key assumptions by canvas block', 'Alignment and dependency observations', 'Questions for customer and market validation'],
    steps: [
      { title: 'Define value and customer', description: 'State the customer segment, job-to-be-done, pain point, and proposed outcome.' },
      { title: 'Describe delivery and economics', description: 'Add channels, relationships, revenue logic, costs, resources, activities, and partners.' },
      { title: 'Test the assumptions', description: 'Mark uncertain claims and turn them into interviews, experiments, or measurable checks.' },
    ],
    useCases: [
      { title: 'New venture workshop', description: 'Create a common visual model before writing a detailed business plan.' },
      { title: 'Offer redesign', description: 'Compare how a new segment, channel, or pricing model changes the rest of the business.' },
      { title: 'Model comparison', description: 'Draft separate canvases for subscription, marketplace, licensing, or service approaches.' },
    ],
    exampleInput: 'A marketplace connecting independent tutors with parents seeking live online math lessons; platform earns a 15% fee per completed lesson.',
    exampleOutput: 'A nine-block canvas connecting parents and tutors to the matching value proposition, trust and scheduling features, acquisition channels, transaction revenue, platform activities, payment partners, support costs, and assumptions to validate.',
    limitations: ['A canvas describes hypotheses; it does not prove demand or profitability.', 'Do not treat suggested partners, costs, or channels as researched facts.', 'Validate the model through interviews, experiments, and real operating data.'],
    faqs: [
      { question: 'How is a business model canvas different from a business plan?', answer: 'A canvas is a concise map of how the business works. A business plan expands the strategy with research, operations, milestones, risks, and financial detail.' },
      { question: 'Can I compare multiple business models?', answer: 'Yes. Create one canvas per model or customer segment, then compare assumptions, dependencies, economics, and validation effort.' },
      { question: 'What should I validate first?', answer: 'Start with the customer problem, willingness to pay, value proposition, acquisition channel, and the assumptions that could make the model fail.' },
      { question: 'Is the generated canvas final?', answer: 'No. Treat it as a living hypothesis map and update it when interviews, experiments, sales, or operating data change your understanding.' },
    ],
    relatedTools: [
      { label: 'AI Business Plan Generator', href: '/tools/ai-business-plan' }, { label: 'AI Value Proposition', href: '/tools/ai-value-proposition' },
      { label: 'AI SWOT Analysis', href: '/tools/ai-swot-analysis' }, { label: 'AI Competitor Analysis', href: '/tools/ai-competitor-analysis' },
    ],
    relatedContent: [
      { label: 'Explore business AI tools', href: '/tools/category/business', type: 'Tool collection' },
      { label: 'Browse business prompts', href: '/prompts/category/business', type: 'Prompt collection' },
      { label: 'Learn practical AI workflows', href: '/learn', type: 'Courses' },
    ],
  },
  'ai-pitch-deck': {
    name: 'AI Pitch Deck Generator',
    intro: 'Organize a startup story into a slide-by-slide pitch-deck draft. The output helps connect the problem, solution, market, product, business model, traction, go-to-market plan, competition, team, financial assumptions, and funding request without inventing evidence you have not supplied.',
    audience: ['Founders preparing investor conversations', 'Accelerator and incubator applicants', 'Internal teams presenting a new venture', 'Students building a startup presentation'],
    inputs: ['Audience and presentation goal', 'Problem, solution, product, and customer', 'Market evidence, traction, and competitors', 'Business model, team, funding ask, and planned use of funds'],
    outputs: ['Recommended slide order', 'Headline and key points per slide', 'Evidence and visual suggestions', 'Speaker-note and verification prompts'],
    steps: [
      { title: 'Set the audience and ask', description: 'Identify who will see the deck, the meeting stage, and the decision you want.' },
      { title: 'Supply evidence', description: 'Add verified customer insights, traction, market sources, economics, team facts, and funding needs.' },
      { title: 'Edit for clarity', description: 'Keep one message per slide, cite sources, simplify text, and rehearse the narrative.' },
    ],
    useCases: [
      { title: 'Pre-seed narrative', description: 'Structure a concise problem, insight, solution, market, team, and fundraising story.' },
      { title: 'Demo-day deck', description: 'Build a short presentation optimized for clear spoken delivery and visual evidence.' },
      { title: 'Internal proposal', description: 'Present a new initiative with opportunity, resources, risks, milestones, and decision request.' },
    ],
    exampleInput: 'Seed-stage logistics SaaS reducing failed last-mile deliveries for regional retailers; 18 pilot stores, 22% fewer failed deliveries, seeking ₹1.5 crore for product and sales hiring.',
    exampleOutput: 'A 12-slide outline with a quantified delivery problem, retailer workflow, product demonstration, pilot evidence, target market assumptions, pricing model, competition, go-to-market plan, team, milestones, funding ask, and use-of-funds breakdown.',
    limitations: ['Never invent traction, customer quotes, market size, partnerships, or team credentials.', 'Verify every number and cite the original source in the final deck.', 'Visual design, financial modeling, and investor positioning still require human judgment.'],
    faqs: [
      { question: 'Does the tool create a finished presentation file?', answer: 'It creates structured slide content and guidance. Final layout, branding, charts, source citations, and presentation-file production may require a slide editor.' },
      { question: 'How many slides should my deck contain?', answer: 'There is no universal number. Many first-meeting decks are concise, but the correct length depends on audience, stage, evidence, and presentation format.' },
      { question: 'Can it generate market-size or traction numbers?', answer: 'It can organize numbers you provide, but it should not be trusted to invent them. Use verified internal data and cited external research.' },
      { question: 'What makes the result more persuasive?', answer: 'A specific customer problem, credible evidence, a clear product advantage, realistic economics, an appropriate ask, and a coherent story are more persuasive than extra slides.' },
    ],
    relatedTools: [
      { label: 'AI Business Plan Generator', href: '/tools/ai-business-plan' }, { label: 'AI Elevator Pitch', href: '/tools/ai-elevator-pitch' },
      { label: 'AI Competitor Analysis', href: '/tools/ai-competitor-analysis' }, { label: 'AI Investor Update', href: '/tools/ai-investor-update' },
    ],
    relatedContent: [
      { label: 'Explore business AI tools', href: '/tools/category/business', type: 'Tool collection' },
      { label: 'Browse presentation prompts', href: '/prompts', type: 'Prompt hub' },
      { label: 'Read AI business guides', href: '/blog', type: 'Blog' },
    ],
  },
  'ai-swot-analysis': {
    name: 'AI SWOT Analysis Generator',
    intro: 'Separate internal strengths and weaknesses from external opportunities and threats, then convert the observations into testable strategic actions. The tool is most useful when you provide evidence, scope, timeframe, competitors, and a clear decision instead of only a business name.',
    audience: ['Founders choosing a strategy', 'Product and marketing teams', 'Consultants preparing a workshop', 'Students evaluating a company or project'],
    inputs: ['Business, product, project, or decision scope', 'Customer, market, geography, and timeframe', 'Internal capabilities and constraints', 'Competitors, trends, evidence, and known risks'],
    outputs: ['Four-quadrant SWOT draft', 'Evidence and assumption labels', 'Strategic combinations and priorities', 'Validation questions and next actions'],
    steps: [
      { title: 'Set a narrow scope', description: 'Name the decision, product, market, geography, and timeframe being analyzed.' },
      { title: 'Provide evidence', description: 'Add performance data, customer feedback, resources, competitors, trends, and constraints.' },
      { title: 'Turn findings into action', description: 'Prioritize items and create SO, ST, WO, and WT actions with owners and tests.' },
    ],
    useCases: [
      { title: 'Market-entry decision', description: 'Compare internal readiness with external demand, competition, regulation, and timing.' },
      { title: 'Product strategy review', description: 'Connect product capabilities and gaps to market openings and competitive risks.' },
      { title: 'Quarterly planning', description: 'Reassess priorities as performance, resources, customer needs, and external conditions change.' },
    ],
    exampleInput: 'Independent Hyderabad fitness studio considering an online coaching subscription for existing members over the next six months; small coaching team, strong retention, limited video-production experience.',
    exampleOutput: 'A SWOT draft distinguishing retention and coaching expertise as internal strengths, limited production capacity as a weakness, hybrid-fitness demand as an opportunity, and low-cost national apps as a threat—followed by small-pilot and retention-test actions.',
    limitations: ['SWOT quality depends on evidence and clear classification of internal versus external factors.', 'Long unprioritized lists are less useful than a few material, evidenced factors.', 'Review the analysis with people who understand customers, operations, finance, and the market.'],
    faqs: [
      { question: 'What is the difference between a weakness and a threat?', answer: 'A weakness is an internal limitation you may influence, such as capability or capacity. A threat is an external condition, such as competition, regulation, or demand change.' },
      { question: 'Can a factor appear in more than one quadrant?', answer: 'Context can change classification, but avoid duplicating the same statement. Explain the specific internal or external effect and why it matters.' },
      { question: 'How do I make the SWOT actionable?', answer: 'Prioritize material factors, combine quadrants into strategic options, assign owners, define evidence, and set measurable next steps.' },
      { question: 'Should I rely on AI-generated threats and opportunities?', answer: 'No. Treat suggestions as hypotheses and verify them with current market research, customer evidence, competitor analysis, and subject-matter experts.' },
    ],
    relatedTools: [
      { label: 'AI Competitor Analysis', href: '/tools/ai-competitor-analysis' }, { label: 'AI Business Model Canvas', href: '/tools/ai-business-model' },
      { label: 'AI Risk Assessment', href: '/tools/ai-risk-assessment' }, { label: 'AI Marketing Plan', href: '/tools/ai-marketing-plan' },
    ],
    relatedContent: [
      { label: 'Explore business AI tools', href: '/tools/category/business', type: 'Tool collection' },
      { label: 'Browse strategy prompts', href: '/prompts/category/business', type: 'Prompt collection' },
      { label: 'Read detailed AI articles', href: '/articles', type: 'Articles' },
    ],
  },
  'ai-competitor-analysis': {
    name: 'AI Competitor Analysis',
    intro: 'Build a structured comparison framework for named competitors across positioning, target customer, offer, pricing, channels, strengths, weaknesses, and strategic implications. The tool organizes supplied evidence; it does not perform guaranteed live research or know confidential competitor information.',
    audience: ['Founders validating market positioning', 'Product managers comparing alternatives', 'Marketing teams refining messages', 'Sales teams preparing competitive context'],
    inputs: ['Your product and target customer', 'Named direct and indirect competitors', 'Comparison criteria and business objective', 'Verified URLs, pricing, reviews, notes, and research'],
    outputs: ['Competitor comparison matrix', 'Positioning and differentiation observations', 'Evidence gaps and research questions', 'Strategic opportunities, risks, and next actions'],
    steps: [
      { title: 'Define the decision', description: 'State whether you are comparing positioning, pricing, features, channels, or another decision.' },
      { title: 'Supply current evidence', description: 'Provide competitor names, sources, dates, customer feedback, and comparable facts.' },
      { title: 'Verify and act', description: 'Check claims against original sources and convert findings into prioritized product or market tests.' },
    ],
    useCases: [
      { title: 'Positioning review', description: 'Find overused claims, underserved needs, and credible ways to differentiate your offer.' },
      { title: 'Product planning', description: 'Compare workflows and capabilities without turning every competitor feature into a requirement.' },
      { title: 'Sales preparation', description: 'Create evidence-based comparison questions and objection guidance for specific customer segments.' },
    ],
    exampleInput: 'Compare three appointment-booking tools for independent salons in India on mobile usability, WhatsApp reminders, staff scheduling, pricing transparency, onboarding, and support. Use only the notes and URLs provided.',
    exampleOutput: 'A criteria-based matrix separating verified facts from unknowns, followed by positioning patterns, evidence gaps, customer interview questions, and prioritized differentiation experiments.',
    limitations: ['Competitor features, prices, and policies change; verify them on dated primary sources.', 'Absence of public information is not proof that a capability does not exist.', 'Avoid copying protected content or presenting inference as a verified competitor fact.'],
    faqs: [
      { question: 'Does this tool browse competitor websites live?', answer: 'Do not assume live browsing. Provide current source material and verify every important claim against the original competitor page or document.' },
      { question: 'What competitors should I include?', answer: 'Include direct alternatives, indirect ways customers solve the problem, and the option of doing nothing. Keep the set relevant to one customer and decision.' },
      { question: 'How do I compare competitors fairly?', answer: 'Use consistent criteria, comparable plans and segments, dated sources, and separate verified facts from interpretation or unknown information.' },
      { question: 'Can I publish the generated comparison?', answer: 'Review it carefully, cite sources, avoid misleading claims, respect trademarks and copyright, and seek legal review when comparative advertising creates material risk.' },
    ],
    relatedTools: [
      { label: 'AI SWOT Analysis', href: '/tools/ai-swot-analysis' }, { label: 'AI Value Proposition', href: '/tools/ai-value-proposition' },
      { label: 'AI Marketing Plan', href: '/tools/ai-marketing-plan' }, { label: 'AI Business Plan Generator', href: '/tools/ai-business-plan' },
    ],
    relatedContent: [
      { label: 'Explore marketing AI tools', href: '/tools/category/marketing', type: 'Tool collection' },
      { label: 'Browse marketing prompts', href: '/prompts/category/marketing', type: 'Prompt collection' },
      { label: 'Read current AI guides', href: '/blog', type: 'Blog' },
    ],
  },
};

export const priorityToolSlugs = new Set(Object.keys(priorityToolSeoContent));
