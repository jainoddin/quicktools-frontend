import { MetadataRoute } from 'next';
import { getEndpoint } from '../lib/api';
import { allTools } from '../lib/toolsData';



export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://quicktool.space';

  // Fetch blogs
  let blogs: any[] = [];
  try {
    const res = await fetch(getEndpoint('/api/blogs?limit=500'), {
      cache: 'no-store',
      signal: AbortSignal.timeout(10000),
    });
    const data = await res.json();
    if (data.success) blogs = data.data;
  } catch (e) {
    console.error('Error fetching blogs for sitemap', e);
  }

  // Fetch articles
  let articles: any[] = [];
  try {
    const res = await fetch(getEndpoint('/api/articles?limit=500'), {
      cache: 'no-store',
      signal: AbortSignal.timeout(10000),
    });
    const data = await res.json();
    if (data.success) articles = data.data;
  } catch (e) {
    console.error('Error fetching articles for sitemap', e);
  }

  // Fetch news
  let news: any[] = [];
  try {
    const res = await fetch(getEndpoint('/api/news?limit=500'), {
      cache: 'no-store',
      signal: AbortSignal.timeout(10000),
    });
    const data = await res.json();
    if (data.success) news = data.data;
  } catch (e) {
    console.error('Error fetching news for sitemap', e);
  }

  // Fetch Community Questions
  let questions: any[] = [];
  try {
    const res = await fetch(getEndpoint('/api/community/questions?limit=500'), {
      cache: 'no-store',
      signal: AbortSignal.timeout(10000),
    });
    const data = await res.json();
    if (data.success) questions = data.data;
  } catch (e) {
    console.error('Error fetching community questions for sitemap', e);
  }

  const blogUrls = blogs
    .filter((blog: any) => !blog.redirectUrl && !blog.canonicalOverride)
    .map((blog: any) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: new Date(blog.updatedAt || blog.publishedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

  const articleUrls = articles
    .filter((article: any) => !article.redirectUrl && !article.canonicalOverride)
    .map((article: any) => ({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: new Date(article.updatedAt || article.publishedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));

  const newsUrls = news
    .filter((item: any) => !item.redirectUrl && !item.canonicalOverride)
    .map((item: any) => ({
      url: `${baseUrl}/news/${item.slug}`,
      lastModified: new Date(item.updatedAt || item.publishedAt),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    }));

  const questionUrls = questions
    .map((item: any) => ({
      url: `${baseUrl}/community/questions/${item.slug}`,
      lastModified: new Date(item.updatedAt || item.createdAt),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    }));

  // Static routes
  const toolRoutes = allTools.map((tool) => ({
    url: `${baseUrl}${tool.slug}`,
    lastModified: new Date(tool.createdAt || new Date()),
    changeFrequency: 'weekly' as const,
    priority: tool.tag?.type === 'premium' ? 0.9 : 0.8,
  }));

  const routes = [
    '', '/tools', '/blog', '/articles', '/news', '/community', '/about', '/contact', '/pricing', '/login', '/signup'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly' as any,
    priority: route === '' ? 1 : route.startsWith('/articles') || route.startsWith('/blog') || route.startsWith('/news') ? 0.9 : 0.7,
  }));

  return [...routes, ...toolRoutes, ...blogUrls, ...articleUrls, ...newsUrls, ...questionUrls];
}

