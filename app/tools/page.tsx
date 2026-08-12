import React, { Suspense } from 'react';
import { Metadata } from 'next';
import ToolsClient from '@/components/tools/ToolsClient';
import { allTools } from '@/lib/toolsRegistry';
import { toolCategoryHubs } from '@/lib/toolCategoryHubs';

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ c?: string, category?: string }> }): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const category = resolvedParams.c || resolvedParams.category;
  
  if (category) {
    const cleanCat = category.replace('AI ', '');
    const matchingHub = toolCategoryHubs.find(hub =>
      hub.sourceCategories.some(source => source.toLowerCase() === category.toLowerCase())
    );
    return {
      title: `Best ${category} Tools | QuickTool`,
      description: `Explore the best ${category} generation and editing tools available on QuickTool.`,
      keywords: [`${category} tools`, `${category} generator`, `${cleanCat} AI`, `AI ${cleanCat}`, `AI ${cleanCat} tools`, `AI art`, `AI content generator`],
      alternates: {
        canonical: matchingHub
          ? `https://quicktool.space/tools/category/${matchingHub.slug}`
          : 'https://quicktool.space/tools',
      },
      robots: { index: false, follow: true },
    };
  }

  return {
    title: {
      absolute: `${allTools.length} AI Tools Directory | Compare AI Tools | QuickTool`,
    },
    description: `Explore ${allTools.length} AI tools for writing, coding, image generation, business, and productivity. Compare tools and choose the right workflow with QuickTool.`,
    keywords: [
      'AI tools', 'Best AI tools', 'Free AI tools', 'AI tool directory', 'AI software',
      'AI productivity tools', 'AI writing tools', 'AI image generator', 'AI code generator',
      'AI video tools', 'AI business tools', 'AI marketing tools', 'AI design tools',
      'AI developer tools', 'AI automation tools', 'AI utilities', 'QuickTool'
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
    "name": `All ${allTools.length} AI Tools | QuickTool`,
    "description": `Explore ${allTools.length} AI tools including Image Generator, Resume Builder, Translator, Summarizer, and more.`,
    "url": "https://quicktool.space/tools",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": allTools.length,
      "itemListElement": allTools.map((tool, index) => ({
        "@type": "ListItem", 
        "position": index + 1, 
        "name": tool.name,
        "url": `https://quicktool.space${tool.slug}`
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
