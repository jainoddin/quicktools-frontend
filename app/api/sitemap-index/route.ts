import { NextResponse } from 'next/server';

const BASE_URL = 'https://quicktool.space';

/**
 * Custom sitemap index route.
 * Next.js 15 with generateSitemaps() sometimes doesn't generate /sitemap.xml root index.
 * This route is rewritten to /sitemap.xml via next.config.ts rewrites.
 */
export async function GET() {
  const sitemapIds = [0, 1, 2, 3, 4, 5, 6];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapIds
  .map(
    (id) => `  <sitemap>
    <loc>${BASE_URL}/sitemap/${id}.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>`
  )
  .join('\n')}
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
