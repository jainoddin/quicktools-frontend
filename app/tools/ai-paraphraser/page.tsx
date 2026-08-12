import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import AiParaphraserClient from '@/components/ai-paraphraser/AiParaphraserClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Free AI Paraphrasing Tool",
  description: "Rewrite and paraphrase text in different wording while retaining the original meaning with our advanced AI paraphraser.",
    keywords: ["AI Paraphraser","Paraphraser AI","Free AI Paraphraser","Best AI Paraphraser","Online Paraphraser","AI Paraphraser Tool","QuickTool AI"],
    alternates: { canonical: 'https://quicktool.space/tools/ai-paraphraser' },
    openGraph: {
            title: "Free AI Paraphrasing Tool | QuickTool",
            description: "Rewrite and paraphrase text in different wording while retaining the original meaning with our advanced AI paraphraser.",
            url: 'https://quicktool.space/tools/ai-paraphraser',
            siteName: 'QuickTool',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("AI Paraphrasing Tool")}&type=tool`, width: 1200, height: 630, alt: `AI Paraphrasing Tool - QuickTool` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Free AI Paraphrasing Tool | QuickTool",
            description: "Rewrite and paraphrase text in different wording while retaining the original meaning with our advanced AI paraphraser.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("AI Paraphrasing Tool")}&type=tool`]
          }
};

export default function AiParaphraserPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'AI Paraphrasing Tool',
    description: 'Rewrite and paraphrase text in different wording while retaining the original meaning.',
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
            <span className="text-[#6D5EF8] font-bold">AI Paraphrasing Tool</span>
          </nav>
        </div>
        
        <AiParaphraserClient />
      </div>
    </>
  );
}
