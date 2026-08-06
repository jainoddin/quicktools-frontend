import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://quicktool.space';

  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/community/', '/community/questions/', '/blog/', '/news/', '/articles/', '/tools/', '/learn/'],
      disallow: ['/private/', '/api/', '/dashboard/', '/checkout/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
