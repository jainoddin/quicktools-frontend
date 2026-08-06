import React from 'react';
import type { Metadata } from 'next';
import ArticlesClient from '../../components/articles/ArticlesClient';
import { getEndpoint } from '../../lib/api';



export const metadata: Metadata = {
  title: {
    absolute: 'AI Articles, Guides & Insights | QuickTools',
  },
  description: 'Explore expert AI articles, in-depth guides, tutorials, and insights on ChatGPT, Claude, Gemini, automation, productivity, and AI tools.',
  keywords: [
    'AI articles', 'AI guides', 'AI insights', 'AI tutorials',
    'ChatGPT guides', 'Claude AI', 'Gemini AI', 'AI productivity',
    'AI automation', 'AI trends', 'QuickTools Articles', 'AI resources'
  ],
  alternates: {
    canonical: 'https://quicktool.space/articles',
  }
};

async function getArticles() {
  try {
    const res = await fetch(getEndpoint('/api/articles?limit=12'), {
      next: { revalidate: 60 } // Cache for 60 seconds for instant loads
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
      <ArticlesClient initialArticles={allArticles} initialPagination={articlesResponse.pagination} initialCategoryCounts={articlesResponse.categoryCounts} />
    </>
  );
}
