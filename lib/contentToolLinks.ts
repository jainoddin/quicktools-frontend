import { allTools, type ToolRegistryItem } from './toolsRegistry';

const STOP = new Set(['with', 'from', 'that', 'this', 'your', 'tool', 'tools', 'using', 'into', 'about', 'QuickTool', 'guide', 'best']);
const words = (value: string) => new Set(value.toLowerCase().match(/[a-z0-9]+/g)?.filter(word => word.length > 2 && !STOP.has(word)) || []);

export function getRelevantToolsForContent(content: string, limit = 4): ToolRegistryItem[] {
  const query = words(content);
  return allTools
    .map(tool => {
      const identity = words(`${tool.name} ${tool.category} ${tool.description}`);
      let score = 0;
      for (const word of query) if (identity.has(word)) score += tool.name.toLowerCase().includes(word) ? 4 : 1;
      return { tool, score };
    })
    .sort((a, b) => b.score - a.score || a.tool.name.localeCompare(b.tool.name))
    .slice(0, limit)
    .map(item => item.tool);
}
