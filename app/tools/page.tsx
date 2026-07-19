import React, { Suspense } from 'react';
import { Metadata } from 'next';
import ToolsClient from '@/components/tools/ToolsClient';

import toolsData from '../../tools_data.json';

export const metadata: Metadata = {
  title: 'All 100+ Premium & Free AI Tools - Image, Text, Code & More',
  description: 'Explore our curated collection of 100+ premium and free AI tools including Image Generator, Resume Builder, Translator, Summarizer, and more.',
  alternates: {
    canonical: 'https://quicktool.space/tools',
  },
};

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
      <Suspense fallback={<div className="p-8 text-center">Loading tools...</div>}>
        <ToolsClient />
      </Suspense>
    </div>
  );
}
