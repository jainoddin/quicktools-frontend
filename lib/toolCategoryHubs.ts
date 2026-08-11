import { allTools } from '@/lib/toolsRegistry';

export type ToolCategoryHub = {
  slug: string;
  name: string;
  description: string;
  sourceCategories: string[];
};

export const toolCategoryHubs: ToolCategoryHub[] = [
  { slug: 'writing', name: 'Writing AI Tools', description: 'Plan, draft, rewrite, summarize, and polish practical content with focused AI writing tools.', sourceCategories: ['AI Writer', 'Writing'] },
  { slug: 'marketing', name: 'Marketing AI Tools', description: 'Create campaigns, social content, SEO assets, and audience-focused marketing workflows.', sourceCategories: ['Marketing', 'Social Media', 'SEO'] },
  { slug: 'code-tech', name: 'Code & Tech Tools', description: 'Generate, explain, format, and troubleshoot code and everyday technical tasks.', sourceCategories: ['AI Code', 'Developer Tools', 'Development', 'Utilities'] },
  { slug: 'business', name: 'Business AI Tools', description: 'Turn business requirements into plans, research, sales material, and decision-ready documents.', sourceCategories: ['Business', 'Sales'] },
  { slug: 'creative', name: 'Creative AI Tools', description: 'Build image, video, design, audio, and visual-content workflows from one creative toolkit.', sourceCategories: ['AI Image', 'AI Video', 'Design', 'Media'] },
  { slug: 'career-hr', name: 'Career & HR AI Tools', description: 'Prepare career documents, learning plans, hiring material, and people-operations workflows.', sourceCategories: ['HR', 'Education', 'Productivity', 'Lifestyle'] },
];

export function getToolCategoryHub(slug: string) {
  return toolCategoryHubs.find(category => category.slug === slug);
}

export function getToolsForHub(hub: ToolCategoryHub) {
  const categories = new Set(hub.sourceCategories);
  return allTools.filter(tool => categories.has(tool.category));
}
