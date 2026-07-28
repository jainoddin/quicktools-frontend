import { NextResponse } from 'next/server';
import { getEndpoint } from '../../../lib/api';

export const revalidate = 0;

export async function GET() {
  try {
    const res = await fetch(getEndpoint('/api/articles?limit=50'), { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch articles');
    const json = await res.json();
    const articles = json.data || [];

    const siteUrl = 'https://quicktool.space';

    const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>QuickTools.ai Articles</title>
    <link>${siteUrl}/articles</link>
    <description>In-depth AI articles, reviews, and guides from QuickTools.ai</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed/articles" rel="self" type="application/rss+xml" />
    ${articles.map((article: any) => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${siteUrl}/articles/${article.slug}</link>
      <guid isPermaLink="true">${siteUrl}/articles/${article.slug}</guid>
      <description><![CDATA[${article.description || ''}]]></description>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
    </item>`).join('')}
  </channel>
</rss>`;

    return new NextResponse(rssFeed, {
      headers: {
        'Content-Type': 'text/xml',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
