import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import AiRealEstateListingClient from '@/components/ai-real-estate-listing/AiRealEstateListingClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Free AI Real Estate Listing Generator",
  description: "Write captivating, conversion-optimized property descriptions that sell homes faster.",
    keywords: ["AI Real Estate Listing","Real Estate Listing AI","Free AI Real Estate Listing","Best AI Real Estate Listing","Online Real Estate Listing","AI Real Estate Listing Tool","QuickTool AI"],
    alternates: { canonical: 'https://quicktool.space/tools/ai-real-estate-listing' },
    openGraph: {
            title: "Free AI Real Estate Listing Generator | QuickTool",
            description: "Write captivating, conversion-optimized property descriptions that sell homes faster.",
            url: 'https://quicktool.space/tools/ai-real-estate-listing',
            siteName: 'QuickTool',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("AI Real Estate Listing Generator")}&type=tool`, width: 1200, height: 630, alt: `AI Real Estate Listing Generator - QuickTool` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Free AI Real Estate Listing Generator | QuickTool",
            description: "Write captivating, conversion-optimized property descriptions that sell homes faster.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("AI Real Estate Listing Generator")}&type=tool`]
          }
};

export default function AiRealEstateListingPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'AI Real Estate Listing Generator',
    description: 'Write captivating, conversion-optimized property descriptions that sell homes faster.',
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
            <span className="text-[#6D5EF8] font-bold">AI Real Estate Listing Generator</span>
          </nav>
        </div>
        
        <AiRealEstateListingClient />
      </div>
    </>
  );
}
