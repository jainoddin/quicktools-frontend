import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://quicktool.space';

  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/community/', '/community/questions/', '/blog/', '/news/', '/articles/', '/tools/', '/learn/', '/prompts/'],
      disallow: ['/private/', '/api/', '/dashboard/', '/checkout/', '/admin/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
