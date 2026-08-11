import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const projectRoot = process.cwd();
const toolsRoot = join(projectRoot, 'app', 'tools');
const registry = JSON.parse(readFileSync(join(projectRoot, 'tools_data.json'), 'utf8'));
const registrySlugs = registry.map(tool => String(tool.slug || '').replace(/^\/tools\//, ''));
const routeSlugs = readdirSync(toolsRoot).filter(name => {
  const path = join(toolsRoot, name);
  return statSync(path).isDirectory() && !name.startsWith('[') && name !== 'category' && Boolean(name) && (() => { try { return statSync(join(path, 'page.tsx')).isFile(); } catch { return false; } })();
});
const duplicates = registrySlugs.filter((slug, index) => registrySlugs.indexOf(slug) !== index);
const missingFromRegistry = routeSlugs.filter(slug => !registrySlugs.includes(slug));
const missingRoutes = registrySlugs.filter(slug => !routeSlugs.includes(slug));
const incomplete = registry.filter(tool => !(tool.name || tool.title) || !tool.slug || !tool.category);

if (duplicates.length || missingFromRegistry.length || missingRoutes.length || incomplete.length) {
  console.error('[tools registry] validation failed', { duplicates, missingFromRegistry, missingRoutes, incomplete: incomplete.map(tool => tool.slug) });
  process.exit(1);
}

console.log(`[tools registry] ${registrySlugs.length} tools match ${routeSlugs.length} public routes.`);
