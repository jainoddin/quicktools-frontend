import React, { Suspense } from 'react';
import { Metadata } from 'next';
import ToolsClient from '@/components/tools/ToolsClient';

export const metadata: Metadata = {
  title: 'All Premium & Free AI Tools - Image, Text, Code & More',
  description: 'Explore our curated collection of 10 premium and free AI tools including Image Generator, Resume Builder, Translator, Summarizer, and more.',
  alternates: {
    canonical: '/tools',
  },
};

export default function AllToolsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "All AI Tools | QuickTools.ai",
    "description": "Explore our curated collection of 10 premium and free AI tools including Image Generator, Resume Builder, Translator, Summarizer, and more.",
    "url": "https://quicktool.space/tools",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "AI Image Generator", "url": "https://quicktool.space/tools/ai-image-generator" },
        { "@type": "ListItem", "position": 2, "name": "AI Writer", "url": "https://quicktool.space/tools/ai-writer" },
        { "@type": "ListItem", "position": 3, "name": "AI Code Generator", "url": "https://quicktool.space/tools/ai-code-generator" },
        { "@type": "ListItem", "position": 4, "name": "AI Background Remover", "url": "https://quicktool.space/tools/background-remover" },
        { "@type": "ListItem", "position": 5, "name": "AI Video Generator", "url": "https://quicktool.space/tools/ai-video-generator" },
        { "@type": "ListItem", "position": 6, "name": "AI Resume Builder", "url": "https://quicktool.space/tools/ai-resume-builder" },
        { "@type": "ListItem", "position": 7, "name": "AI Language Translator", "url": "https://quicktool.space/tools/ai-translator" },
        { "@type": "ListItem", "position": 8, "name": "AI Text Summarizer", "url": "https://quicktool.space/tools/ai-summarizer" },
        { "@type": "ListItem", "position": 9, "name": "AI Color Palette Generator", "url": "https://quicktool.space/tools/ai-color-palette" },
        { "@type": "ListItem", "position": 10, "name": "URL Shortener", "url": "https://quicktool.space/tools/url-shortener" }
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
