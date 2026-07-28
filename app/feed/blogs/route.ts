import { NextResponse } from 'next/server';
import { getEndpoint } from '../../../lib/api';

export const revalidate = 0;

export async function GET() {
  try {
    const res = await fetch(getEndpoint('/api/blogs?limit=50'), { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch blogs');
    const json = await res.json();
    const blogs = json.data || [];

    const siteUrl = 'https://quicktool.space';

    const validBlogs = blogs.filter((blog: any) => !blog.redirectUrl && !blog.canonicalOverride);

    const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>QuickTools.ai Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Latest AI blogs, tutorials, and productivity guides from QuickTools.ai</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed/blogs" rel="self" type="application/rss+xml" />
    ${validBlogs.map((blog: any) => `
    <item>
      <title><![CDATA[${blog.title}]]></title>
      <link>${siteUrl}/blog/${blog.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${blog.slug}</guid>
      <description><![CDATA[${blog.description || ''}]]></description>
      <pubDate>${new Date(blog.publishedAt).toUTCString()}</pubDate>
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
