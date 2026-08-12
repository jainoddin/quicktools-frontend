import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import AiBlogIdeaClient from '@/components/ai-blog-idea-generator/AiBlogIdeaClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Free AI Blog Idea Generator",
  description: "Generate highly engaging, audience-focused blog post ideas and titles with AI assistance. Move past a blank page.",
    keywords: ["AI Blog Idea Generator","Blog Idea Generator AI","Free AI Blog Idea Generator","Best AI Blog Idea Generator","Online Blog Idea Generator","AI Blog Idea Generator Tool","Blog Idea Creator","AI Blog Idea Creator","QuickTool AI"],
    alternates: { canonical: 'https://quicktool.space/tools/ai-blog-idea-generator' },
    openGraph: {
            title: "Free AI Blog Idea Generator | QuickTool",
            description: "Generate highly engaging, audience-focused blog post ideas and titles with AI assistance. Move past a blank page.",
            url: 'https://quicktool.space/tools/ai-blog-idea-generator',
            siteName: 'QuickTool',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("AI Blog Idea Generator")}&type=tool`, width: 1200, height: 630, alt: `AI Blog Idea Generator - QuickTool` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Free AI Blog Idea Generator | QuickTool",
            description: "Generate highly engaging, audience-focused blog post ideas and titles with AI assistance. Move past a blank page.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("AI Blog Idea Generator")}&type=tool`]
          }
};

export default function AiBlogIdeaGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'AI Blog Idea Generator',
    description: 'Generate highly engaging, audience-focused blog post ideas and titles with AI assistance.',
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
            <span className="text-[#6D5EF8] font-bold">AI Blog Idea Generator</span>
          </nav>
        </div>
        
        <AiBlogIdeaClient />
      </div>
    </>
  );
}
