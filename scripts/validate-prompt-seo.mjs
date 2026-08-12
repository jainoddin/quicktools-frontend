import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const read = (...parts) => readFileSync(join(root, ...parts), 'utf8');
const errors = [];

const metadata = read('lib', 'promptMetadata.ts');
for (const token of ['alternates: { canonical }', 'robots: { index: true, follow: true }', 'openGraph:', 'twitter:', '1200', '630']) {
  if (!metadata.includes(token)) errors.push(`promptMetadata is missing ${token}`);
}

const sitemap = read('app', 'sitemap.ts');
for (const route of ['/prompts', '/prompts/chatgpt', '/prompts/claude', '/prompts/gemini', '/prompts/categories', '/prompts/generator', '/prompts/all', '/prompts/models']) {
  if (!sitemap.includes(`'${route}'`)) errors.push(`sitemap is missing ${route}`);
}
for (const token of ['promptCategoryToSlug', '/api/prompts?limit=100&page=', '/prompts/category/', 'new Map(entries.map']) {
  if (!sitemap.includes(token)) errors.push(`prompt sitemap inventory is missing ${token}`);
}

const robots = read('app', 'robots.ts');
if (!robots.includes("'/prompts/'")) errors.push('robots.ts does not explicitly allow prompt pages');
if (robots.includes("disallow: ['/prompts")) errors.push('robots.ts blocks prompt pages');

const checks = [
  [['app', 'prompts', 'page.tsx'], ['promptMetadata(', "'CollectionPage'", 'PromptFaq']],
  [['app', 'prompts', 'all', 'page.tsx'], ['promptMetadata(', "'CollectionPage'", "'ItemList'", 'AllPromptsClient']],
  [['app', 'prompts', 'models', 'page.tsx'], ['promptMetadata(', "'CollectionPage'", "'ItemList'"]],
  [['app', 'prompts', 'categories', 'page.tsx'], ['promptMetadata(', "'CollectionPage'", "'ItemList'"]],
  [['app', 'prompts', 'generator', 'page.tsx'], ['promptMetadata(', "'WebPage'", "'BreadcrumbList'"]],
  [['app', 'prompts', '[model]', 'page.tsx'], ['promptMetadata(', "'CollectionPage'", "'ItemList'", "'BreadcrumbList'"]],
  [['app', 'prompts', 'category', '[category]', 'page.tsx'], ['promptMetadata(', "'CollectionPage'", "'ItemList'", "'BreadcrumbList'"]],
  [['app', 'prompts', '[model]', '[slug]', 'page.tsx'], ['promptMetadata(', "'CreativeWork'", "'BreadcrumbList'", 'RelevantToolsLinks']],
];

for (const [path, tokens] of checks) {
  const source = read(...path);
  for (const token of tokens) if (!source.includes(token)) errors.push(`${path.join('/')} is missing ${token}`);
}

const faq = read('components', 'prompts', 'PromptFaq.tsx');
if (!faq.includes("'FAQPage'") && !faq.includes('"FAQPage"')) errors.push('Prompt FAQ schema is missing');
if (!faq.includes('faqs.map')) errors.push('Prompt FAQ schema is not generated from visible FAQ data');
if (!faq.includes("replace(/</g, '\\\\u003c')")) errors.push('Prompt FAQ JSON-LD is not safely serialized');

for (const component of ['PromptQuickLinks.tsx', 'NewestPrompts.tsx', 'TrendingPrompts.tsx']) {
  const source = read('components', 'prompts', component);
  if (/\/prompts\?sort=|href=['"]#(?:newest|trending|saved)['"]/.test(source)) {
    errors.push(`${component} contains a legacy prompt-tab URL`);
  }
}

if (errors.length) {
  console.error('[prompt seo] validation failed');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('[prompt seo] metadata, canonicals, OG/Twitter, robots, sitemap, FAQ, schemas, breadcrumbs, and relevant-tool links passed.');
