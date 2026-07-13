import React from 'react';
import type { Metadata } from 'next';
import NewsClient from '../../components/news/NewsClient';

export const metadata: Metadata = {
  title: 'AI News & Updates | QuickTools.ai',
  description: 'Stay updated with the latest AI breakthroughs, product launches, research, and industry updates.',
};

async function getNews() {
  try {
    const res = await fetch('http://localhost:5000/api/news?limit=12', {
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
  
  return <NewsClient initialNews={allNews} />;
}
