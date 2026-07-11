import { MetadataRoute } from 'next';
import { getEndpoint } from '../lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // TODO: Update with your production URL before deployment
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://quicktools.ai'; 

  // Fetch blogs from backend to generate dynamic URLs
  let blogs = [];
  try {
    const res = await fetch(getEndpoint('/api/blogs'), { next: { revalidate: 3600 } });
    const data = await res.json();
    if (data.success) {
      blogs = data.data;
    }
  } catch (e) {
    console.error('Error fetching blogs for sitemap', e);
  }

  const blogUrls = blogs.map((blog: any) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.publishedAt),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  // Static routes
  const routes = ['', '/blog', '/tools', '/about', '/contact', '/pricing'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/blog' ? 'daily' : 'weekly' as any,
    priority: route === '' ? 1 : 0.9,
  }));

  return [...routes, ...blogUrls];
}
