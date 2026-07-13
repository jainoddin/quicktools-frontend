import React from 'react';
import type { Metadata } from 'next';
import ArticlesClient from '../../components/articles/ArticlesClient';
import { getEndpoint } from '../../lib/api';

export const metadata: Metadata = {
  title: 'AI Articles & Tutorials | QuickTools.ai',
  description: 'Expert insights, tutorials, and in-depth guides about AI tools, productivity, and the future of work.',
  alternates: {
    canonical: 'https://quicktools.ai/articles',
  }
};

async function getArticles() {
  try {
    const res = await fetch(getEndpoint('/api/articles?limit=50'), {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    if (!res.ok) return { data: [], pagination: {} };
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    return { data: [], pagination: {} };
  }
}

export default async function ArticlesDirectoryPage() {
  const articlesResponse = await getArticles();
  const allArticles = articlesResponse.data || [];
  
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
              { "@type": "ListItem", "position": 2, "name": "Articles", "item": "https://quicktool.space/articles" }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": allArticles.slice(0, 10).map((article: any, index: number) => ({
              "@type": "ListItem",
              "position": index + 1,
              "url": `https://quicktool.space/articles/${article.slug}`
            }))
          }
        ])}}
      />
      <ArticlesClient initialArticles={allArticles} />
    </>
  );
}
