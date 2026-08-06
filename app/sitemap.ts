import { MetadataRoute } from 'next';
import { getEndpoint } from '../lib/api';
import { allTools } from '../lib/toolsData';

const baseUrl = 'https://quicktool.space';

export async function generateSitemaps() {
  return [
    { id: 0 }, // core
    { id: 1 }, // tools
    { id: 2 }, // blog
    { id: 3 }, // articles
    { id: 4 }, // news
    { id: 5 }, // community
    { id: 6 }, // learn
  ];
}

export default async function sitemap({ id }: { id: number | string }): Promise<MetadataRoute.Sitemap> {
  // Normalize id: Next.js may pass string or number depending on version/runtime
  const numId = Number(id);

  if (numId === 0) {
    const routes = [
      '', '/tools', '/blog', '/articles', '/news', '/community', '/about', '/contact', '/pricing', '/login', '/signup', '/learn'
    ].map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'daily' : 'weekly' as any,
      priority: route === '' ? 1 : 0.7,
    }));
    return routes;
  }

  if (numId === 1) {
    return allTools.map((tool) => ({
      url: `${baseUrl}${tool.slug}`,
      lastModified: new Date(tool.createdAt || new Date()),
      changeFrequency: 'weekly' as const,
      priority: tool.tag?.type === 'premium' ? 0.9 : 0.8,
    }));
  }

  if (numId === 2) {
    let blogs: any[] = [];
    try {
      const res = await fetch(getEndpoint('/api/blogs?limit=500'), { cache: 'no-store', signal: AbortSignal.timeout(10000) });
      const data = await res.json();
      if (data.success) blogs = data.data;
    } catch (e) {
      console.error('Error fetching blogs for sitemap', e);
    }
    return blogs
      .filter((blog: any) => !blog.redirectUrl && !blog.canonicalOverride)
      .map((blog: any) => ({
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: new Date(blog.updatedAt || blog.publishedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));
  }

  if (numId === 3) {
    let articles: any[] = [];
    try {
      const res = await fetch(getEndpoint('/api/articles?limit=500'), { cache: 'no-store', signal: AbortSignal.timeout(10000) });
      const data = await res.json();
      if (data.success) articles = data.data;
    } catch (e) {
      console.error('Error fetching articles for sitemap', e);
    }
    return articles
      .filter((article: any) => !article.redirectUrl && !article.canonicalOverride)
      .map((article: any) => ({
        url: `${baseUrl}/articles/${article.slug}`,
        lastModified: new Date(article.updatedAt || article.publishedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      }));
  }

  if (numId === 4) {
    let news: any[] = [];
    try {
      const res = await fetch(getEndpoint('/api/news?limit=500'), { cache: 'no-store', signal: AbortSignal.timeout(10000) });
      const data = await res.json();
      if (data.success) news = data.data;
    } catch (e) {
      console.error('Error fetching news for sitemap', e);
    }
    return news
      .filter((item: any) => !item.redirectUrl && !item.canonicalOverride)
      .map((item: any) => ({
        url: `${baseUrl}/news/${item.slug}`,
        lastModified: new Date(item.updatedAt || item.publishedAt),
        changeFrequency: 'daily' as const,
        priority: 0.9,
      }));
  }

  if (numId === 5) {
    let questions: any[] = [];
    try {
      const res = await fetch(getEndpoint('/api/community/questions?limit=500'), { cache: 'no-store', signal: AbortSignal.timeout(10000) });
      const data = await res.json();
      if (data.success) questions = data.data;
    } catch (e) {
      console.error('Error fetching community questions for sitemap', e);
    }
    return questions
      .map((item: any) => ({
        url: `${baseUrl}/community/questions/${item.slug}`,
        lastModified: new Date(item.updatedAt || item.createdAt),
        changeFrequency: 'daily' as const,
        priority: 0.8,
      }));
  }

  if (numId === 6) {
    let courses: any[] = [];
    try {
      const res = await fetch(getEndpoint('/api/learn/courses?limit=500'), { cache: 'no-store', signal: AbortSignal.timeout(10000) });
      const data = await res.json();
      if (data.success) courses = data.data;
    } catch (e) {
      console.error('Error fetching courses for sitemap', e);
    }
    return courses
      .map((item: any) => ({
        url: `${baseUrl}/learn/${item.slug}/${item.firstLessonSlug || '1-introduction'}`,
        lastModified: new Date(item.updatedAt || item.createdAt),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      }));
  }

  return [];
}
