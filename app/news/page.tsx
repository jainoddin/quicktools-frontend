import React from 'react';
import type { Metadata } from 'next';
import NewsClient from '../../components/news/NewsClient';
import { getEndpoint } from '../../lib/api';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Latest AI News, Updates & Breakthroughs',
  description: 'Stay updated with the latest AI breakthroughs, product launches, research, and industry updates.',
  alternates: {
    canonical: '/news',
  }
};

async function getNews() {
  try {
    const res = await fetch(getEndpoint('/api/news?limit=12'), {
      next: { revalidate: 300 } // Revalidate every 5 minutes for news
    });
    if (!res.ok) return { data: [], pagination: {} };
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch news:', error);
    return { data: [], pagination: {} };
  }
}

export default async function NewsDirectoryPage() {
  const newsResponse = await getNews();
  const allNews = newsResponse.data || [];
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://quicktool.space/" },
              { "@type": "ListItem", "position": 2, "name": "News", "item": "https://quicktool.space/news" }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": allNews.slice(0, 10).map((newsItem: any, index: number) => ({
              "@type": "ListItem",
              "position": index + 1,
              "url": `https://quicktool.space/news/${newsItem.slug}`
            }))
          }
        ])}}
      />
      <NewsClient initialNews={allNews} />
    </>
  );
}
