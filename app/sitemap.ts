/**
 * Single sitemap.ts - No generateSitemaps() split approach.
 * Generates one /sitemap.xml with ALL URLs.
 * Reliable on all Next.js versions, no type/ID confusion.
 */
import { MetadataRoute } from 'next';
import { getEndpoint } from '../lib/api';
import { allTools } from '../lib/toolsData';

const BASE_URL = 'https://quicktool.space';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // ─── 1. Core Static Routes (always included, no API needed) ───────────────
  const coreRoutes: string[] = [
    '', '/tools', '/blog', '/articles', '/news', '/community',
    '/about', '/contact', '/pricing', '/login', '/signup', '/learn',
  ];
  entries.push(...coreRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
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
      entries.push(...courses.map((c) => ({
        url: `${BASE_URL}/learn/${c.slug}/${c.firstLessonSlug || '1-introduction'}`,
        lastModified: new Date(c.updatedAt || c.createdAt),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      })));
    }
  } catch (e) {
    console.error('[sitemap] courses fetch failed:', e);
  }

  return entries;
}
