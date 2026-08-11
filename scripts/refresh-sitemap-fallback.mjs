import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const source = process.env.SITEMAP_SNAPSHOT_SOURCE || 'https://quicktool.space/sitemap.xml';
const response = await fetch(source);
if (!response.ok) throw new Error(`Unable to refresh sitemap fallback: HTTP ${response.status}`);
const xml = await response.text();
const entries = [...xml.matchAll(/<url>\s*<loc>(.*?)<\/loc>(?:\s*<lastmod>(.*?)<\/lastmod>)?(?:\s*<changefreq>(.*?)<\/changefreq>)?(?:\s*<priority>(.*?)<\/priority>)?\s*<\/url>/gs)]
  .map(match => ({ url: match[1], lastModified: match[2] || '2026-08-11T00:00:00.000Z', changeFrequency: match[3] || 'weekly', priority: Number(match[4] || 0.7) }))
  .filter(entry => /^https:\/\/quicktool\.space\/(blog|articles|news|learn|prompts)\/.+/.test(entry.url))
  .filter(entry => !['/prompts/chatgpt', '/prompts/claude', '/prompts/gemini', '/prompts/categories', '/prompts/generator'].some(path => entry.url === `https://quicktool.space${path}`));
const unique = [...new Map(entries.map(entry => [entry.url, entry])).values()].sort((a, b) => a.url.localeCompare(b.url));
if (!unique.some(item => item.url.includes('/blog/')) || !unique.some(item => item.url.includes('/articles/')) || !unique.some(item => item.url.includes('/news/')) || !unique.some(item => item.url.includes('/learn/')) || !unique.some(item => item.url.includes('/prompts/'))) throw new Error('Snapshot is missing a required dynamic content type');
await mkdir(join(process.cwd(), 'data'), { recursive: true });
await writeFile(join(process.cwd(), 'data', 'sitemapFallback.json'), `${JSON.stringify(unique, null, 2)}\n`);
console.log(`[sitemap fallback] saved ${unique.length} dynamic URLs from ${source}`);
