import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import LoremIpsumClient from '@/components/lorem-ipsum/LoremIpsumClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Free Lorem Ipsum Generator",
  description: "Generate placeholder text (Lorem Ipsum) with AI assistance for your designs, websites, and mockups with our free Lorem Ipsum Generator.",
    keywords: ["Lorem Ipsum","AI Lorem Ipsum","Lorem Ipsum AI","Free Lorem Ipsum","Best Lorem Ipsum","Online Lorem Ipsum","Lorem Ipsum Tool","QuickTool AI"],
    alternates: { canonical: 'https://quicktool.space/tools/lorem-ipsum' },
    openGraph: {
            title: "Free Lorem Ipsum Generator | QuickTool",
            description: "Generate placeholder text (Lorem Ipsum) with AI assistance for your designs, websites, and mockups with our free Lorem Ipsum Generator.",
            url: 'https://quicktool.space/tools/lorem-ipsum',
            siteName: 'QuickTool',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("Lorem Ipsum Generator")}&type=tool`, width: 1200, height: 630, alt: `Lorem Ipsum Generator - QuickTool` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Free Lorem Ipsum Generator | QuickTool",
            description: "Generate placeholder text (Lorem Ipsum) with AI assistance for your designs, websites, and mockups with our free Lorem Ipsum Generator.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("Lorem Ipsum Generator")}&type=tool`]
          }
};

export default function LoremIpsumPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text (Lorem Ipsum) with AI assistance for your designs.',
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
            <span className="text-[#6D5EF8] font-bold">Lorem Ipsum Generator</span>
          </nav>
        </div>
        
        <LoremIpsumClient />
      </div>
    </>
  );
}
