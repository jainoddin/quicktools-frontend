import { MetadataRoute } from 'next';
import { getEndpoint } from '../lib/api';
import { allTools } from '../lib/toolsData';



export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://quicktool.space';

  // Fetch blogs
  let blogs: any[] = [];
  try {
    const res = await fetch(getEndpoint('/api/blogs'), { next: { revalidate: 3600 } });
    const data = await res.json();
    if (data.success) blogs = data.data;
  } catch (e) {
    console.error('Error fetching blogs for sitemap', e);
  }

  // Fetch articles
  let articles: any[] = [];
  try {
    const res = await fetch(getEndpoint('/api/articles?limit=500'), { next: { revalidate: 3600 } });
    const data = await res.json();
    if (data.success) articles = data.data;
  } catch (e) {
    console.error('Error fetching articles for sitemap', e);
  }

  // Fetch news
  let news: any[] = [];
  try {
    const res = await fetch(getEndpoint('/api/news?limit=500'), { next: { revalidate: 3600 } });
    const data = await res.json();
    if (data.success) news = data.data;
  } catch (e) {
    console.error('Error fetching news for sitemap', e);
  }

  const blogUrls = blogs.map((blog: any) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const articleUrls = articles.map((article: any) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const newsUrls = news.map((item: any) => ({
    url: `${baseUrl}/news/${item.slug}`,
    lastModified: new Date(item.publishedAt),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  // Static routes
  const toolRoutes = allTools.map((tool) => ({
    url: `${baseUrl}${tool.slug}`,
    lastModified: new Date(tool.createdAt || new Date()),
    changeFrequency: 'weekly' as const,
    priority: tool.tag?.type === 'premium' ? 0.9 : 0.8,
  }));

  const routes = [
    '', '/tools', '/blog', '/articles', '/news', '/about', '/contact', '/pricing', '/login', '/signup'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly' as any,
    priority: route === '' ? 1 : route.startsWith('/articles') || route.startsWith('/blog') || route.startsWith('/news') ? 0.9 : 0.7,
  }));

  return [...routes, ...toolRoutes, ...blogUrls, ...articleUrls, ...newsUrls];
}

