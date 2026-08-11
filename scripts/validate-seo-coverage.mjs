import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const toolsRoot = join(root, 'app', 'tools');
const registry = JSON.parse(readFileSync(join(root, 'tools_data.json'), 'utf8'));
const normalizeName = tool => tool.name || tool.title || tool.slug.replace(/^\/tools\//, '').split('-').map(part => part[0].toUpperCase() + part.slice(1)).join(' ');
const normalizeDescription = tool => tool.description || `Create a structured ${normalizeName(tool).replace(/^AI\s+/i, '')} result from your requirements with guided AI assistance.`;
const routes = readdirSync(toolsRoot).filter(slug => {
  const route = join(toolsRoot, slug);
  try { return statSync(route).isDirectory() && slug !== 'category' && statSync(join(route, 'page.tsx')).isFile(); } catch { return false; }
});
const slugs = registry.map(tool => String(tool.slug).replace(/^\/tools\//, ''));
const names = registry.map(normalizeName);
const descriptions = registry.map(normalizeDescription);
const duplicates = values => [...new Set(values.filter((value, index) => values.indexOf(value) !== index))];
const sourceFiles = directory => readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
  const path = join(directory, entry.name);
  return entry.isDirectory() ? sourceFiles(path) : /\.(?:tsx|ts)$/.test(entry.name) ? [path] : [];
});
const missingRoutes = slugs.filter(slug => !routes.includes(slug));
const missingProfiles = routes.filter(slug => !slugs.includes(slug));
const invalid = registry.filter(tool => !tool.slug || !tool.category || !normalizeName(tool) || !normalizeDescription(tool));
const duplicateSlugs = duplicates(slugs);
const duplicateNames = duplicates(names);
const duplicateDescriptions = duplicates(descriptions);

const prioritySource = readFileSync(join(root, 'lib', 'priorityToolSeoContent.ts'), 'utf8');
const prioritySlugs = [...prioritySource.matchAll(/^\s{2}'([^']+)':\s*\{/gm)].map(match => match[1]);
const unknownPrioritySlugs = prioritySlugs.filter(slug => !slugs.includes(slug));
const deepSpecSource = readFileSync(join(root, 'lib', 'toolDeepSpecs.ts'), 'utf8');
const deepSpecSlugs = [...deepSpecSource.matchAll(/^\s{2}'([^']+)':\s*\{/gm)].map(match => match[1]);
const missingDeepSpecs = slugs.filter(slug => !deepSpecSlugs.includes(slug));
const extraDeepSpecs = deepSpecSlugs.filter(slug => !slugs.includes(slug));
const duplicateDeepSpecs = duplicates(deepSpecSlugs);
const deepSpecBodies = [...deepSpecSource.matchAll(/^\s{2}'([^']+)':\s*\{([\s\S]*?)^\s{2}\},?$/gm)].map(match => ({ slug: match[1], body: match[2].replace(/\s+/g, ' ').trim() }));
const duplicateDeepSpecBodies = duplicates(deepSpecBodies.map(item => item.body));
const metadata = routes.map(slug => {
  const source = readFileSync(join(toolsRoot, slug, 'page.tsx'), 'utf8');
  return {
    slug,
    title: source.match(/title:\s*(?:\{\s*absolute:\s*)?["']([^"']+)/)?.[1],
    description: source.match(/description:\s*["']([^"']+)/)?.[1],
    canonical: source.includes(`https://quicktool.space/tools/${slug}`),
    openGraph: /openGraph\s*:/.test(source),
    twitter: /twitter\s*:/.test(source),
  };
});
const missingTitles = metadata.filter(item => !item.title).map(item => item.slug);
const missingDescriptions = metadata.filter(item => !item.description).map(item => item.slug);
const duplicateMetadataTitles = duplicates(metadata.map(item => item.title).filter(Boolean));
const duplicateMetadataDescriptions = duplicates(metadata.map(item => item.description).filter(Boolean));
const missingCanonicals = metadata.filter(item => !item.canonical).map(item => item.slug);
const missingOpenGraph = metadata.filter(item => !item.openGraph).map(item => item.slug);
const missingTwitter = metadata.filter(item => !item.twitter).map(item => item.slug);
const brandedMetadataTitles = metadata.filter(item => /\|\s*QuickTools(?:\.ai)?\s*$/i.test(item.title || '')).map(item => item.slug);
const longRenderedTitles = metadata.filter(item => ((item.title || '').length + ' | QuickTools.ai'.length) > 65).map(item => ({ slug: item.slug, length: (item.title || '').length + ' | QuickTools.ai'.length }));
const shortMetadataDescriptions = metadata.filter(item => (item.description || '').length < 70).map(item => ({ slug: item.slug, length: (item.description || '').length }));
const longMetadataDescriptions = metadata.filter(item => (item.description || '').length > 165).map(item => ({ slug: item.slug, length: (item.description || '').length }));
const brokenOgTargets = routes.filter(slug => {
  const source = readFileSync(join(toolsRoot, slug, 'page.tsx'), 'utf8');
  return source.includes('/api/og') ? false : /og-image\.png/.test(source);
});
const priorityHrefs = [...prioritySource.matchAll(/href:\s*'([^']+)'/g)].map(match => match[1]);
const knownStaticHubs = new Set(['/tools/category/business', '/tools/category/marketing', '/prompts/category/business', '/prompts/category/marketing', '/blog', '/articles', '/prompts', '/learn']);
const brokenPriorityToolLinks = priorityHrefs.filter(href => href.startsWith('/tools/') && !knownStaticHubs.has(href) && !routes.includes(href.replace(/^\/tools\//, '')));

const categorySource = readFileSync(join(root, 'lib', 'toolCategoryHubs.ts'), 'utf8');
const categoryPageSource = readFileSync(join(root, 'app', 'tools', 'category', '[slug]', 'page.tsx'), 'utf8');
const categorySlugs = ['writing', 'marketing', 'code-tech', 'business', 'creative', 'career-hr'];
const missingCategoryGuides = categorySlugs.filter(slug => !new RegExp(`(?:^|\\n)\\s*(?:'${slug}'|${slug}): \\[`, 'm').test(categorySource));
const shortCategoryGuides = categorySlugs.filter(slug => {
  const match = categorySource.match(new RegExp(`(?:^|\\n)\\s*(?:'${slug}'|${slug}): \\[([\\s\\S]*?)\\n\\s*\\],`, 'm'));
  return !match || (match[1].match(/\b[\w’-]+\b/g) || []).length < 60;
});
const categoryPresentationMissing = !categoryPageSource.includes('toolCategoryGuides[category.slug]') || !categoryPageSource.includes("'FAQPage'") || !categoryPageSource.includes("'CollectionPage'");
const categoryMetadataMissing = !categoryPageSource.includes('title: category.name') || !categoryPageSource.includes('twitter:') || !categoryPageSource.includes('/api/og?title=');

const contentPages = [
  ['blog', join(root, 'app', 'blog', '[slug]', 'page.tsx')],
  ['articles', join(root, 'app', 'articles', '[slug]', 'page.tsx')],
  ['news', join(root, 'app', 'news', '[slug]', 'page.tsx')],
  ['prompts', join(root, 'app', 'prompts', '[model]', '[slug]', 'page.tsx')],
  ['lessons', join(root, 'app', 'learn', '[courseSlug]', '[lessonSlug]', 'page.tsx')],
];
const missingContextualLinks = contentPages.filter(([, file]) => !readFileSync(file, 'utf8').includes('RelevantToolsLinks')).map(([name]) => name);
const relevantLinksSource = readFileSync(join(root, 'lib', 'contentToolLinks.ts'), 'utf8');
const invalidContextualLinkEngine = !relevantLinksSource.includes('allTools') || !relevantLinksSource.includes('score');

const supportSource = readFileSync(join(root, 'components', 'tools', 'ToolSeoSupport.tsx'), 'utf8');
const priorityComponentSource = readFileSync(join(root, 'components', 'tools', 'PriorityToolSeoSection.tsx'), 'utf8');
const schemaVisibilityMismatch = !supportSource.includes("'FAQPage'") || !supportSource.includes('content.faqs.map') || !priorityComponentSource.includes("'FAQPage'") || !priorityComponentSource.includes('content.faqs.map');
const splashSource = readFileSync(join(root, 'components', 'SplashScreen.tsx'), 'utf8');
const splashUsesPageHeading = /<h1\b/.test(splashSource);

const sitemapSource = readFileSync(join(root, 'app', 'sitemap.ts'), 'utf8');
const ogRoutePath = join(root, 'app', 'api', 'og', 'route.tsx');
const fallback = JSON.parse(readFileSync(join(root, 'data', 'sitemapFallback.json'), 'utf8'));
const fallbackTypes = ['/blog/', '/articles/', '/news/', '/learn/', '/prompts/'];
const missingFallbackTypes = fallbackTypes.filter(prefix => !fallback.some(entry => new URL(entry.url).pathname.startsWith(prefix)));
const invalidFallbackEntries = fallback.filter(entry => { try { return new URL(entry.url).hostname !== 'quicktool.space' || Number.isNaN(Date.parse(entry.lastModified)); } catch { return true; } });
const duplicateFallbackUrls = duplicates(fallback.map(entry => entry.url));
const sitemapFallbackMissing = !sitemapSource.includes('sitemapFallback') || !sitemapSource.includes('new Map(entries.map');
const ogRouteMissing = !existsSync(ogRoutePath) || !readFileSync(ogRoutePath, 'utf8').includes('ImageResponse');

const routeToolHrefs = routes.flatMap(slug => [...readFileSync(join(toolsRoot, slug, 'page.tsx'), 'utf8').matchAll(/href=[{]?["'](\/tools\/[^"'}?]+)/g)].map(match => ({ source: slug, href: match[1] })));
const brokenRouteToolLinks = routeToolHrefs.filter(item => !item.href.startsWith('/tools/category/') && !routes.includes(item.href.replace(/^\/tools\//, '')));
const componentToolHrefs = sourceFiles(join(root, 'components')).flatMap(file => [...readFileSync(file, 'utf8').matchAll(/href=[{]?["'](\/tools\/[^"'}?#]+)/g)].map(match => ({ source: file.replace(root, ''), href: match[1] })));
const brokenComponentToolLinks = componentToolHrefs.filter(item => !item.href.startsWith('/tools/category/') && item.href !== '/tools/' && !routes.includes(item.href.replace(/^\/tools\//, '')));
const unsupportedClaimHits = routes.filter(slug => /2-3 seconds|no signup required|without needing a credit card/i.test(readFileSync(join(toolsRoot, slug, 'page.tsx'), 'utf8')));
const pricingSchemaMismatches = registry.flatMap(tool => {
  const slug = String(tool.slug).replace(/^\/tools\//, '');
  const source = readFileSync(join(toolsRoot, slug, 'page.tsx'), 'utf8');
  const prices = [...source.matchAll(/(?:"price"|price)\s*:\s*['"](\d+(?:\.\d+)?)['"]/g)].map(match => Number(match[1]));
  const premium = Boolean(tool.isPremium ?? tool.tag?.type === 'premium');
  const reasons = [];
  if (premium && prices.includes(0)) reasons.push('premium route declares a zero-price offer');
  if (!premium && prices.some(price => price > 0)) reasons.push('free registry route declares a paid offer');
  if (!premium && /title:\s*["']Premium\b/i.test(source)) reasons.push('free registry route has a Premium metadata title');
  return reasons.map(reason => ({ slug, reason }));
});

if (missingRoutes.length || missingProfiles.length || invalid.length || duplicateSlugs.length || duplicateNames.length || duplicateDescriptions.length || unknownPrioritySlugs.length || missingDeepSpecs.length || extraDeepSpecs.length || duplicateDeepSpecs.length || duplicateDeepSpecBodies.length || missingTitles.length || missingDescriptions.length || duplicateMetadataTitles.length || duplicateMetadataDescriptions.length || missingCanonicals.length || missingOpenGraph.length || missingTwitter.length || brandedMetadataTitles.length || longRenderedTitles.length || shortMetadataDescriptions.length || longMetadataDescriptions.length || brokenOgTargets.length || brokenPriorityToolLinks.length || missingCategoryGuides.length || shortCategoryGuides.length || categoryPresentationMissing || categoryMetadataMissing || missingContextualLinks.length || invalidContextualLinkEngine || schemaVisibilityMismatch || splashUsesPageHeading || missingFallbackTypes.length || invalidFallbackEntries.length || duplicateFallbackUrls.length || sitemapFallbackMissing || ogRouteMissing || brokenRouteToolLinks.length || brokenComponentToolLinks.length || unsupportedClaimHits.length || pricingSchemaMismatches.length) {
  console.error('[seo coverage] validation failed', {
    missingRoutes, missingProfiles, invalid: invalid.map(tool => tool.slug), duplicateSlugs,
    duplicateNames, duplicateDescriptions, unknownPrioritySlugs, missingDeepSpecs, extraDeepSpecs, duplicateDeepSpecs, duplicateDeepSpecBodies,
    missingTitles, missingDescriptions, duplicateMetadataTitles, duplicateMetadataDescriptions,
    missingCanonicals, missingOpenGraph, missingTwitter, brandedMetadataTitles, longRenderedTitles, shortMetadataDescriptions, longMetadataDescriptions,
    brokenOgTargets, brokenPriorityToolLinks, missingCategoryGuides, shortCategoryGuides,
    categoryPresentationMissing, categoryMetadataMissing, missingContextualLinks, invalidContextualLinkEngine, schemaVisibilityMismatch, splashUsesPageHeading,
    missingFallbackTypes, invalidFallbackEntries: invalidFallbackEntries.map(item => item.url), duplicateFallbackUrls,
    sitemapFallbackMissing, ogRouteMissing, brokenRouteToolLinks, brokenComponentToolLinks, unsupportedClaimHits, pricingSchemaMismatches,
  });
  process.exit(1);
}

console.log(`[seo coverage] ${slugs.length}/${routes.length} routes have explicit deep specs, unique metadata, canonical/OG/Twitter coverage, visible matching FAQ schema, validated links, category guides, contextual editorial links, and a ${fallback.length}-URL sitemap fallback.`);
