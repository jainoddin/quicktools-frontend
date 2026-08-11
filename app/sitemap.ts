/**
 * Single sitemap.ts - No generateSitemaps() split approach.
 * Generates one /sitemap.xml with ALL URLs.
 * Reliable on all Next.js versions, no type/ID confusion.
 */
import { MetadataRoute } from 'next';
import { getEndpoint } from '../lib/api';
import { allTools } from '../lib/toolsData';
import { promptCategoryToSlug } from '../lib/promptSlugs';
import { toolCategoryHubs } from '../lib/toolCategoryHubs';

const BASE_URL = 'https://quicktool.space';
const SITE_CONTENT_UPDATED_AT = new Date('2026-08-11T00:00:00.000Z');

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // ─── 1. Core Static Routes (always included, no API needed) ───────────────
  const coreRoutes: string[] = [
    '', '/tools', '/blog', '/articles', '/news', '/community',
    '/about', '/contact', '/pricing', '/learn', '/faq', '/help', '/privacy', '/terms',
    '/author/quicktools-ai-team',
    '/prompts', '/prompts/chatgpt', '/prompts/claude', '/prompts/gemini',
    '/prompts/categories', '/prompts/generator',
  ];
  entries.push(...coreRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: SITE_CONTENT_UPDATED_AT,
    changeFrequency: (route === '' ? 'daily' : 'weekly') as MetadataRoute.Sitemap[0]['changeFrequency'],
    priority: route === '' ? 1 : 0.7,
  })));

  // ─── 2. Tool Pages (from local data - no API needed) ──────────────────────
  entries.push(...allTools.map((tool) => ({
    url: `${BASE_URL}${tool.slug}`,
    lastModified: new Date(tool.createdAt || new Date()),
    changeFrequency: 'weekly' as const,
    priority: tool.tag?.type === 'premium' ? 0.9 : 0.8,
  })));
  entries.push(...toolCategoryHubs.map(category => ({
    url: `${BASE_URL}/tools/category/${category.slug}`,
    lastModified: SITE_CONTENT_UPDATED_AT,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  })));

  // Prompt Hub canonical pages. Each prompt has one canonical detail URL even
  // when it can also be opened for another supported model.
  try {
    const prompts: any[] = [];
    for (let page = 1; page <= 10; page += 1) {
      const res = await fetch(getEndpoint(`/api/prompts?limit=100&page=${page}`), { signal: AbortSignal.timeout(10000), next: { revalidate: 3600 } });
      if (!res.ok) break;
      const data = await res.json();
      const batch: any[] = data.success ? data.data : [];
      prompts.push(...batch);
      if (batch.length < 100) break;
    }
    const categories = new Set<string>();
    for (const prompt of prompts) {
      if (prompt.category) categories.add(promptCategoryToSlug(prompt.category));
      const model = String(prompt.models?.[0] || 'chatgpt').toLowerCase();
      entries.push({ url: `${BASE_URL}/prompts/${model}/${prompt.slug}`, lastModified: new Date(prompt.updatedAt || prompt.publishedAt || prompt.createdAt), changeFrequency: 'weekly', priority: 0.8 });
    }
    entries.push(...Array.from(categories).map(category => ({ url: `${BASE_URL}/prompts/category/${category}`, lastModified: SITE_CONTENT_UPDATED_AT, changeFrequency: 'weekly' as const, priority: 0.7 })));
  } catch (e) {
    console.error('[sitemap] prompts fetch failed:', e);
  }

  // ─── 3. Blog Posts ────────────────────────────────────────────────────────
  try {
    const res = await fetch(getEndpoint('/api/blogs?limit=500'), {
      signal: AbortSignal.timeout(10000),
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      const blogs: any[] = data.success ? data.data : (Array.isArray(data) ? data : []);
      entries.push(...blogs
        .filter((b) => !b.redirectUrl && !b.canonicalOverride)
        .map((b) => ({
          url: `${BASE_URL}/blog/${b.slug}`,
          lastModified: new Date(b.updatedAt || b.publishedAt),
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        })));
    }
  } catch (e) {
    console.error('[sitemap] blogs fetch failed:', e);
  }

  // ─── 4. Articles ──────────────────────────────────────────────────────────
  try {
    const res = await fetch(getEndpoint('/api/articles?limit=500'), {
      signal: AbortSignal.timeout(10000),
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      const articles: any[] = data.success ? data.data : (Array.isArray(data) ? data : []);
      entries.push(...articles
        .filter((a) => !a.redirectUrl && !a.canonicalOverride)
        .map((a) => ({
          url: `${BASE_URL}/articles/${a.slug}`,
          lastModified: new Date(a.updatedAt || a.publishedAt),
          changeFrequency: 'weekly' as const,
          priority: 0.9,
        })));
    }
  } catch (e) {
    console.error('[sitemap] articles fetch failed:', e);
  }

  // ─── 5. News ──────────────────────────────────────────────────────────────
  try {
    const res = await fetch(getEndpoint('/api/news?limit=500'), {
      signal: AbortSignal.timeout(10000),
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      const news: any[] = data.success ? data.data : (Array.isArray(data) ? data : []);
      entries.push(...news
        .filter((n) => !n.redirectUrl && !n.canonicalOverride)
        .map((n) => ({
          url: `${BASE_URL}/news/${n.slug}`,
          lastModified: new Date(n.updatedAt || n.publishedAt),
          changeFrequency: 'daily' as const,
          priority: 0.9,
        })));
    }
  } catch (e) {
    console.error('[sitemap] news fetch failed:', e);
  }

  // ─── 6. Learn Courses ────────────────────────────────────────────────────
  try {
    const res = await fetch(getEndpoint('/api/learn/courses?limit=500'), {
      signal: AbortSignal.timeout(10000),
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      // Learn courses API returns plain array (not {success, data} envelope)
      const courses: any[] = Array.isArray(data) ? data : (data.success ? data.data : []);
      const courseDetails = await Promise.all(courses.map(async course => {
        try {
          const courseRes = await fetch(getEndpoint(`/api/learn/courses/${course.slug}`), { signal: AbortSignal.timeout(10000), next: { revalidate: 3600 } });
          if (!courseRes.ok) return [];
          const courseData = await courseRes.json();
          const lessons: any[] = Array.isArray(courseData?.lessons) ? courseData.lessons : [];
          return lessons.map(lesson => ({
          url: `${BASE_URL}/learn/${course.slug}/${lesson.slug}`,
          lastModified: new Date(lesson.lastUpdatedAt || lesson.updatedAt || lesson.publishedAt || lesson.createdAt || course.updatedAt || course.createdAt),
          changeFrequency: 'weekly' as const,
          priority: lesson.order === 1 ? 0.9 : 0.8,
          }));
        } catch (error) {
          console.error(`[sitemap] course fetch failed for ${course.slug}:`, error);
          return [];
        }
      }));
      entries.push(...courseDetails.flat());
    }
  } catch (e) {
    console.error('[sitemap] courses fetch failed:', e);
  }

  // A URL must appear only once even when multiple content sources overlap.
  return Array.from(new Map(entries.map(entry => [entry.url, entry])).values());
}
