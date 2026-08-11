import rawTools from '@/tools_data.json';

export type ToolTag = {
  label: string;
  type: 'popular' | 'free' | 'premium';
  iconName: string;
};

export type ToolRegistryItem = {
  name: string;
  description: string;
  iconName: string;
  color: string;
  slug: `/tools/${string}`;
  routeSlug: string;
  category: string;
  isPremium: boolean;
  createdAt: string;
  tag?: ToolTag;
};

type RawTool = {
  name?: string;
  title?: string;
  description?: string;
  iconName?: string;
  color?: string;
  slug: string;
  category?: string;
  isPremium?: boolean;
  createdAt?: string;
  tag?: ToolTag;
};

const categoryPresentation: Record<string, { icon: string; color: string }> = {
  'AI Image': { icon: 'ImageIcon', color: 'bg-[#6D5EF8] text-white' },
  'AI Video': { icon: 'Video', color: 'bg-[#8B5CF6] text-white' },
  'AI Code': { icon: 'Code', color: 'bg-[#0EA5E9] text-white' },
  'Developer Tools': { icon: 'Code2', color: 'bg-[#0EA5E9] text-white' },
  Development: { icon: 'Code', color: 'bg-[#0EA5E9] text-white' },
  Writing: { icon: 'PenTool', color: 'bg-[#F43F5E] text-white' },
  'AI Writer': { icon: 'PenTool', color: 'bg-[#F43F5E] text-white' },
  Marketing: { icon: 'Megaphone', color: 'bg-[#F97316] text-white' },
  'Social Media': { icon: 'Share2', color: 'bg-[#EC4899] text-white' },
  Business: { icon: 'Briefcase', color: 'bg-[#4F46E5] text-white' },
  Sales: { icon: 'TrendingUp', color: 'bg-[#10B981] text-white' },
  SEO: { icon: 'Search', color: 'bg-[#F59E0B] text-white' },
  HR: { icon: 'Users', color: 'bg-[#6366F1] text-white' },
  Education: { icon: 'GraduationCap', color: 'bg-[#14B8A6] text-white' },
  Design: { icon: 'Palette', color: 'bg-[#EC4899] text-white' },
  Media: { icon: 'Mic', color: 'bg-[#8B5CF6] text-white' },
  Productivity: { icon: 'CheckSquare', color: 'bg-[#3B82F6] text-white' },
  Utilities: { icon: 'Settings', color: 'bg-[#64748B] text-white' },
  Lifestyle: { icon: 'Heart', color: 'bg-[#F43F5E] text-white' },
};

const popularSlugs = new Set([
  'ai-image-generator', 'background-remover', 'ai-writer', 'ai-code-generator',
  'ai-resume-builder', 'ai-business-plan', 'ai-summarizer', 'ai-paraphraser',
]);

export const allTools: ToolRegistryItem[] = (rawTools as RawTool[]).map((tool) => {
  const routeSlug = tool.slug.replace(/^\/tools\//, '');
  const category = tool.category || 'Utilities';
  const presentation = categoryPresentation[category] || categoryPresentation.Utilities;
  const name = tool.name || tool.title || routeSlug.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');

  return {
    name,
    description: tool.description || `Create a structured ${name.replace(/^AI\s+/i, '')} result from your requirements with guided AI assistance.`,
    iconName: tool.iconName || presentation.icon,
    color: tool.color || presentation.color,
    slug: `/tools/${routeSlug}`,
    routeSlug,
    category,
    isPremium: Boolean(tool.isPremium),
    createdAt: tool.createdAt || '2026-07-01',
    tag: tool.tag || (popularSlugs.has(routeSlug) ? { label: 'Popular', type: 'popular', iconName: 'Flame' } : undefined),
  };
});

export const toolByRouteSlug = new Map(allTools.map(tool => [tool.routeSlug, tool]));

export function getToolsByCategory(category: string) {
  return allTools.filter(tool => tool.category.toLowerCase() === category.toLowerCase());
}
