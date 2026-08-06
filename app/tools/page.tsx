import React, { Suspense } from 'react';
import { Metadata } from 'next';
import ToolsClient from '@/components/tools/ToolsClient';

import toolsData from '../../tools_data.json';

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ c?: string, category?: string }> }): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const category = resolvedParams.c || resolvedParams.category;
  
  if (category) {
    const cleanCat = category.replace('AI ', '');
    return {
      title: `Best ${category} Tools | QuickTools`,
      description: `Explore the best ${category} generation and editing tools available on QuickTools.`,
      keywords: [`${category} tools`, `${category} generator`, `${cleanCat} AI`, `AI ${cleanCat}`, `AI ${cleanCat} tools`, `AI art`, `AI content generator`],
      alternates: {
        canonical: `https://quicktool.space/tools?c=${category}`,
      },
    };
  }

  return {
    title: {
      absolute: '110+ AI Tools Directory | Compare the Best AI Tools | QuickTools',
    },
    description: 'Explore 110+ AI tools for writing, coding, image generation, business, and productivity. Compare the best AI tools with QuickTools.',
    keywords: [
      'AI tools', 'Best AI tools', 'Free AI tools', 'AI tool directory', 'AI software',
      'AI productivity tools', 'AI writing tools', 'AI image generator', 'AI code generator',
      'AI video tools', 'AI business tools', 'AI marketing tools', 'AI design tools',
      'AI developer tools', 'AI automation tools', 'AI utilities', 'QuickTools', '110 AI tools'
    ],
    alternates: {
      canonical: 'https://quicktool.space/tools',
    },
  };
}

export const dynamic = 'force-dynamic';

export default function AllToolsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "All 100+ AI Tools | QuickTools.ai",
    "description": "Explore our curated collection of 100+ premium and free AI tools including Image Generator, Resume Builder, Translator, Summarizer, and more.",
    "url": "https://quicktool.space/tools",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": toolsData.map((t: any, index: number) => ({
        "@type": "ListItem", 
        "position": index + 1, 
        "name": t.name, 
        "url": `https://quicktool.space/tools/${t.slug}`
      }))
    }
  };

  return (
    <div className="bg-[#F8FAFC] text-[#111827] font-sans selection:bg-[#6D5EF8] selection:text-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolsClient />
    </div>
  );
}
