import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import AiEmailClient from '@/components/ai-email-generator/AiEmailClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Free AI Email Reply Generator",
  description: "With AI assistance generate professional, polite, or casual email replies with AI. Save time and communicate better.",
    keywords: ["AI Email Generator","Email Generator AI","Free AI Email Generator","Best AI Email Generator","Online Email Generator","AI Email Generator Tool","Email Creator","AI Email Creator","Email Assistant Generator","AI Email Assistant Generator","QuickTool AI"],
    alternates: { canonical: 'https://quicktool.space/tools/ai-email-generator' },
    openGraph: {
            title: "Free AI Email Reply Generator | QuickTool",
            description: "With AI assistance generate professional, polite, or casual email replies with AI. Save time and communicate better.",
            url: 'https://quicktool.space/tools/ai-email-generator',
            siteName: 'QuickTool',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("AI Email Generator")}&type=tool`, width: 1200, height: 630, alt: `AI Email Generator - QuickTool` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Free AI Email Reply Generator | QuickTool",
            description: "With AI assistance generate professional, polite, or casual email replies with AI. Save time and communicate better.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("AI Email Generator")}&type=tool`]
          }
};

export default function AiEmailGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'AI Email Reply Generator',
    description: 'With AI assistance generate professional, polite, or casual email replies with AI.',
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
            <span className="text-[#6D5EF8] font-bold">AI Email Reply Generator</span>
          </nav>
        </div>
        
        <AiEmailClient />
      </div>
    </>
  );
}
