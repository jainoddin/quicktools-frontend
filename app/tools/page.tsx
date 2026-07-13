import React, { Suspense } from 'react';
import { Metadata } from 'next';
import ToolsClient from '@/components/tools/ToolsClient';

export const metadata: Metadata = {
  title: 'All Premium AI Tools',
  description: 'Explore our curated collection of 5 premium AI tools including Image Generator, Writer, Code Generator, Background Remover, and Video Generator.',
  alternates: {
    canonical: '/tools',
  },
};

export default function AllToolsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "All AI Tools | QuickTools.ai",
    "description": "Explore our curated collection of 5 premium AI tools including Image Generator, Writer, Code Generator, Background Remover, and Video Generator.",
    "url": "https://quicktool.space/tools",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "AI Image Generator", "url": "https://quicktool.space/tools/ai-image-generator" },
        { "@type": "ListItem", "position": 2, "name": "AI Writer", "url": "https://quicktool.space/tools/ai-writer" },
        { "@type": "ListItem", "position": 3, "name": "AI Code Generator", "url": "https://quicktool.space/tools/ai-code-generator" },
        { "@type": "ListItem", "position": 4, "name": "AI Background Remover", "url": "https://quicktool.space/tools/background-remover" },
        { "@type": "ListItem", "position": 5, "name": "AI Video Generator", "url": "https://quicktool.space/tools/ai-video-generator" }
      ]
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
