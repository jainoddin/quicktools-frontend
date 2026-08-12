import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import AiOutlineClient from '@/components/ai-article-outline-generator/AiOutlineClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Free AI Article Outline Generator",
  description: "Generate comprehensive, SEO-optimized article and blog outlines with AI assistance. Reduce manual planning and structure your content clearly.",
    keywords: ["AI Article Outline Generator","Article Outline Generator AI","Free AI Article Outline Generator","Best AI Article Outline Generator","Online Article Outline Generator","AI Article Outline Generator Tool","Article Outline Creator","AI Article Outline Creator","QuickTool AI"],
    alternates: { canonical: 'https://quicktool.space/tools/ai-article-outline-generator' },
    openGraph: {
            title: "Free AI Article Outline Generator | QuickTool",
            description: "Generate comprehensive, SEO-optimized article and blog outlines with AI assistance. Reduce manual planning and structure your content clearly.",
            url: 'https://quicktool.space/tools/ai-article-outline-generator',
            siteName: 'QuickTool',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("AI Article Outline Generator")}&type=tool`, width: 1200, height: 630, alt: `AI Article Outline Generator - QuickTool` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Free AI Article Outline Generator | QuickTool",
            description: "Generate comprehensive, SEO-optimized article and blog outlines with AI assistance. Reduce manual planning and structure your content clearly.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("AI Article Outline Generator")}&type=tool`]
          }
};

export default function AiOutlineGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'AI Article Outline Generator',
    description: 'Generate comprehensive, SEO-optimized article and blog outlines with AI assistance.',
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
            <span className="text-[#6D5EF8] font-bold">AI Article Outline Generator</span>
          </nav>
        </div>
        
        <AiOutlineClient />
      </div>
    </>
  );
}
