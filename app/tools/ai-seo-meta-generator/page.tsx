import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import AiSeoMetaClient from '@/components/ai-seo-meta-generator/AiSeoMetaClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Free AI SEO Title & Meta Generator",
  description: "Generate search-focused, SEO-optimized Page Titles and Meta Descriptions with AI assistance.",
    keywords: ["AI Seo Meta Generator","Seo Meta Generator AI","Free AI Seo Meta Generator","Best AI Seo Meta Generator","Online Seo Meta Generator","AI Seo Meta Generator Tool","Seo Meta Creator","AI Seo Meta Creator","QuickTools AI"],
    alternates: { canonical: 'https://quicktool.space/tools/ai-seo-meta-generator' },
    openGraph: {
            title: "Free AI SEO Title & Meta Generator | QuickTools",
            description: "Generate search-focused, SEO-optimized Page Titles and Meta Descriptions with AI assistance.",
            url: 'https://quicktool.space/tools/ai-seo-meta-generator',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("AI SEO Title & Meta Generator")}&type=tool`, width: 1200, height: 630, alt: `AI SEO Title & Meta Generator - QuickTools.ai` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Free AI SEO Title & Meta Generator | QuickTools",
            description: "Generate search-focused, SEO-optimized Page Titles and Meta Descriptions with AI assistance.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("AI SEO Title & Meta Generator")}&type=tool`]
          }
};

export default function AiSeoMetaPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'AI SEO Title & Meta Generator',
    description: 'Generate search-focused, SEO-optimized Page Titles and Meta Descriptions with AI assistance.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-6 h-[calc(100vh-80px)]">

        <div className="flex items-center mb-[25px]">
          <nav className="flex items-center space-x-2 text-sm font-medium text-[#6B7280]">
            <Link href="/" className="hover:text-[#111827] transition-colors flex items-center gap-1.5">
              <Home className="w-4 h-4" /> Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/tools" className="hover:text-[#111827] transition-colors">
              All Tools
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-[#6D5EF8] font-bold">AI SEO Title & Meta Generator</span>
          </nav>
        </div>
        
        <AiSeoMetaClient />
      </div>
    </>
  );
}
