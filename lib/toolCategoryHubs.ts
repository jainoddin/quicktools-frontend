import { allTools } from '@/lib/toolsRegistry';

export type ToolCategoryHub = {
  slug: string;
  name: string;
  description: string;
  sourceCategories: string[];
  audience: string;
  choosingGuide: string;
  workflow: string[];
  faqs: { question: string; answer: string }[];
};

export const toolCategoryHubs: ToolCategoryHub[] = [
  { slug: 'writing', name: 'Writing AI Tools', description: 'Plan, draft, rewrite, summarize, and polish practical content with focused AI writing tools.', sourceCategories: ['AI Writer', 'Writing'], audience: 'Writers, students, marketers, founders, and teams who need a structured first draft while retaining control of facts and final wording.', choosingGuide: 'Start with the exact writing stage: use an idea or outline tool before drafting, a writer for the first version, and a paraphrasing or grammar tool only during revision.', workflow: ['Choose a topic and audience', 'Create an outline', 'Draft from verified notes', 'Revise tone and structure', 'Proofread and fact-check'], faqs: [{ question: 'Can AI writing tools publish content automatically?', answer: 'Treat generated text as a draft. Review facts, originality, tone, rights, and disclosure requirements before publishing.' }, { question: 'Which writing tool should I start with?', answer: 'Choose the narrowest tool for your current stage, such as ideas, outline, drafting, rewriting, or grammar review.' }] },
  { slug: 'marketing', name: 'Marketing AI Tools', description: 'Create campaigns, social content, SEO assets, and audience-focused marketing workflows.', sourceCategories: ['Marketing', 'Social Media', 'SEO'], audience: 'Small businesses, creators, marketing teams, and agencies preparing channel-specific campaign drafts from real customer and offer information.', choosingGuide: 'Choose by channel and decision: SEO tools support search pages, social tools support platform posts, and campaign tools connect positioning, offer, proof, and calls to action.', workflow: ['Define customer and objective', 'Clarify the offer and proof', 'Select the channel', 'Create campaign assets', 'Measure and improve'], faqs: [{ question: 'Do AI marketing tools guarantee conversions or rankings?', answer: 'No. Results depend on the offer, audience, evidence, competition, execution, and measurement.' }, { question: 'How do I avoid generic marketing copy?', answer: 'Supply specific customer language, product evidence, brand voice, objections, channel constraints, and one clear action.' }] },
  { slug: 'code-tech', name: 'Code & Tech Tools', description: 'Generate, explain, format, and troubleshoot code and everyday technical tasks.', sourceCategories: ['AI Code', 'Developer Tools', 'Development', 'Utilities'], audience: 'Developers, technical learners, analysts, and teams that want assistance creating or checking a specific technical output.', choosingGuide: 'Use local deterministic utilities for formatting or generation when possible. Use AI tools for explanation and first drafts, then test every command, query, pattern, and code path.', workflow: ['Define environment and expected behavior', 'Provide a minimal reproducible input', 'Generate or transform', 'Test normal and edge cases', 'Review security and compatibility'], faqs: [{ question: 'Is AI-generated code production-ready?', answer: 'Not automatically. Test behavior, security, performance, dependencies, licensing, and compatibility before deployment.' }, { question: 'Should I paste secrets into a technical tool?', answer: 'No. Remove credentials, tokens, private data, and proprietary information unless the tool explicitly provides an approved secure workflow.' }] },
  { slug: 'business', name: 'Business AI Tools', description: 'Turn business requirements into plans, research, sales material, and decision-ready documents.', sourceCategories: ['Business', 'Sales'], audience: 'Founders, owners, consultants, sales teams, and students structuring business assumptions before research, review, and execution.', choosingGuide: 'Begin with the decision you need to make. Map the business model and evidence first, compare competitors and risks next, then create plans, sales material, or presentations.', workflow: ['Define customer and problem', 'Map the business model', 'Validate competitors and risks', 'Build the operating plan', 'Prepare the pitch or sales action'], faqs: [{ question: 'Can these tools replace legal or financial advice?', answer: 'No. Use them to organize a draft and questions, then verify material decisions with qualified professionals.' }, { question: 'What makes a business output useful?', answer: 'Specific customers, dated evidence, known costs, constraints, measurable goals, and clearly marked assumptions.' }] },
  { slug: 'creative', name: 'Creative AI Tools', description: 'Build image, video, design, audio, and visual-content workflows from one creative toolkit.', sourceCategories: ['AI Image', 'AI Video', 'Design', 'Media'], audience: 'Creators, designers, marketers, and product teams producing visual or media drafts for a defined brand and destination.', choosingGuide: 'Choose based on the final medium and required control. Define dimensions, composition, style, rights, accessibility, and exclusions before generating an asset.', workflow: ['Write the creative brief', 'Select medium and dimensions', 'Generate alternatives', 'Inspect quality and rights', 'Edit for the final placement'], faqs: [{ question: 'Can generated creative assets contain mistakes?', answer: 'Yes. Inspect text, faces, hands, logos, continuity, visual artifacts, and source rights before use.' }, { question: 'How do I keep brand consistency?', answer: 'Provide a stable palette, composition rules, audience, reference direction, exclusions, and destination dimensions.' }] },
  { slug: 'career-hr', name: 'Career & HR AI Tools', description: 'Prepare career documents, learning plans, hiring material, and people-operations workflows.', sourceCategories: ['HR', 'Education', 'Productivity', 'Lifestyle'], audience: 'Job seekers, learners, managers, recruiters, and people teams preparing reviewed personal or workplace material.', choosingGuide: 'Choose the tool that matches the real stage: career documents, interview structure, onboarding, learning, communication, or personal planning. Never invent credentials or observations.', workflow: ['Define the person and objective', 'Provide accurate experience or policy', 'Create a structured draft', 'Check bias and privacy', 'Get the appropriate human review'], faqs: [{ question: 'Can a career tool invent experience to improve a resume?', answer: 'No. Use only truthful experience, skills, dates, education, and achievements that the person can verify.' }, { question: 'Can HR output be used without review?', answer: 'Review it for employment law, policy, fairness, bias, accessibility, privacy, and the specific workplace context.' }] },
];

export const toolCategoryGuides: Record<string, string[]> = {
  writing: [
    'A reliable writing workflow begins with source notes, audience needs, and the decision the reader should be able to make. Use the tools in this collection for one stage at a time instead of asking a single prompt to research, draft, verify, and publish at once.',
    'Compare outputs against the original brief, preserve citations and quotations, and revise generic wording with real examples. Sensitive, regulated, academic, or public-facing material still needs the appropriate human review before it is shared.',
  ],
  marketing: [
    'Useful marketing work connects a real audience problem to a supported offer and a measurable channel objective. Select a focused tool for research, positioning, SEO, social content, or conversion copy, then supply customer language and product evidence instead of broad promotional claims.',
    'Review every asset for brand voice, accessibility, platform rules, factual support, and a clear next action. Track the result after publication and improve the message from observed performance rather than treating generated copy as a guaranteed growth strategy.',
  ],
  'code-tech': [
    'Technical assistance works best when the environment, versions, expected behavior, sample input, and failure case are explicit. Choose a narrow utility for deterministic transformations and use generative tools for explanations or drafts that can be tested in an isolated environment.',
    'Never paste production secrets into an unapproved workflow. Review dependencies, licensing, security boundaries, error handling, accessibility, performance, and rollback steps, then run the relevant formatter, type checker, tests, and deployment checks before release.',
  ],
  business: [
    'Business documents become useful when assumptions are separated from verified evidence. Start with the customer, problem, constraints, dated market information, costs, and the decision being prepared; then choose the tool that produces the next concrete artifact in that workflow.',
    'Use generated plans, analyses, and presentations as editable working documents. Confirm legal, financial, tax, employment, and industry-specific statements with qualified reviewers, and attach measurable owners, deadlines, risks, and validation steps before execution.',
  ],
  creative: [
    'A strong creative result starts with a destination-specific brief: audience, dimensions, composition, palette, mood, required elements, exclusions, and accessibility needs. Pick the tool that matches the final medium rather than converting one generic asset across every channel.',
    'Inspect generated media at full resolution for artifacts, inaccurate text, unintended logos, likeness concerns, continuity errors, and usage rights. Keep editable source files and document approvals so the final asset can be corrected without regenerating the entire campaign.',
  ],
  'career-hr': [
    'Career and people workflows require accurate personal or workplace context. Provide only verifiable experience, achievements, policies, role requirements, and learning goals, then use the selected tool to organize material without inventing credentials, observations, or employee facts.',
    'Review outputs for privacy, bias, accessibility, employment rules, and the individual situation. Hiring, performance, compensation, health, and disciplinary decisions require authorized human judgment; the tools here are best used for preparation, structure, and clearer communication.',
  ],
};

export function getToolCategoryHub(slug: string) {
  return toolCategoryHubs.find(category => category.slug === slug);
}

export function getToolsForHub(hub: ToolCategoryHub) {
  const categories = new Set(hub.sourceCategories);
  return allTools.filter(tool => categories.has(tool.category));
}
