import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import AiYoutubeTitleClient from '@/components/ai-youtube-title/AiYoutubeTitleClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Free AI YouTube Title Generator",
  description: "Generate highly clickable, audience-focused, and engaging YouTube video titles using our AI YouTube Title Generator.",
    keywords: ["AI Youtube Title","Youtube Title AI","Free AI Youtube Title","Best AI Youtube Title","Online Youtube Title","AI Youtube Title Tool","QuickTool AI"],
    alternates: { canonical: 'https://quicktool.space/tools/ai-youtube-title' },
    openGraph: {
            title: "Free AI YouTube Title Generator | QuickTool",
            description: "Generate highly clickable, audience-focused, and engaging YouTube video titles using our AI YouTube Title Generator.",
            url: 'https://quicktool.space/tools/ai-youtube-title',
            siteName: 'QuickTool',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("AI YouTube Title Generator")}&type=tool`, width: 1200, height: 630, alt: `AI YouTube Title Generator - QuickTool` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Free AI YouTube Title Generator | QuickTool",
            description: "Generate highly clickable, audience-focused, and engaging YouTube video titles using our AI YouTube Title Generator.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("AI YouTube Title Generator")}&type=tool`]
          }
};

export default function AiYoutubeTitlePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'AI YouTube Title Generator',
    description: 'Generate highly clickable, audience-focused, and engaging YouTube video titles with AI assistance.',
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
            <span className="text-[#6D5EF8] font-bold">AI YouTube Title Generator</span>
          </nav>
        </div>
        
        <AiYoutubeTitleClient />
      </div>
    </>
  );
}
