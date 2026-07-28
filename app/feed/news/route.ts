import { NextResponse } from 'next/server';
import { getEndpoint } from '../../../lib/api';

export const revalidate = 0;

export async function GET() {
  try {
    const res = await fetch(getEndpoint('/api/news?limit=50'), { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch news');
    const json = await res.json();
    const news = json.data || [];

    const siteUrl = 'https://quicktool.space';

    const validNews = news.filter((item: any) => !item.redirectUrl && !item.canonicalOverride);

    const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>QuickTools.ai News</title>
    <link>${siteUrl}/news</link>
    <description>Latest breaking AI news and industry updates from QuickTools.ai</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed/news" rel="self" type="application/rss+xml" />
    ${validNews.map((item: any) => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${siteUrl}/news/${item.slug}</link>
      <guid isPermaLink="true">${siteUrl}/news/${item.slug}</guid>
      <description><![CDATA[${item.summary || ''}]]></description>
      <pubDate>${new Date(item.publishedAt).toUTCString()}</pubDate>
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
