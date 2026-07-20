import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import AiRealEstateListingClient from '@/components/ai-real-estate-listing/AiRealEstateListingClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI Real Estate Listing Generator | QuickTools',
  description: 'Write captivating, conversion-optimized property descriptions that sell homes faster.',
    keywords: ['Free AI Real Estate Listing Generator', 'Free Free AI Real Estate Listing Generator', 'AI Free AI Real Estate Listing Generator', 'QuickTools', 'Online Free AI Real Estate Listing Generator', 'AI Tool'],
    alternates: { canonical: 'https://quicktool.space/tools/ai-real-estate-listing' },
    openGraph: {
            title: "Free AI Real Estate Listing Generator | QuickTools",
            description: "Write captivating, conversion-optimized property descriptions that sell homes faster.",
            url: 'https://quicktool.space/tools/ai-real-estate-listing',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: 'https://quicktool.space/icon.svg', width: 1200, height: 630, alt: 'Free AI Real Estate Listing Generator' }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Free AI Real Estate Listing Generator | QuickTools",
            description: "Write captivating, conversion-optimized property descriptions that sell homes faster.",
            creator: '@quicktoolsai',
            images: ['https://quicktool.space/icon.svg']
          }
};

export default function AiRealEstateListingPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Real Estate Listing Generator',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
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
