import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import AiAdCopyClient from '@/components/ai-ad-copy/AiAdCopyClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI Ad Copy Generator | QuickTools',
  description: 'Write highly converting ad copy variations for Facebook or Google Ads instantly with our AI Ad Copy Generator.',
    keywords: ['Free AI Ad Copy Generator', 'Free Free AI Ad Copy Generator', 'AI Free AI Ad Copy Generator', 'QuickTools', 'Online Free AI Ad Copy Generator', 'AI Tool'],
    alternates: { canonical: 'https://quicktool.space/tools/ai-ad-copy' },
    openGraph: {
            title: "Free AI Ad Copy Generator | QuickTools",
            description: "Write highly converting ad copy variations for Facebook or Google Ads instantly with our AI Ad Copy Generator.",
            url: 'https://quicktool.space/tools/ai-ad-copy',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: 'https://quicktool.space/icon.svg', width: 1200, height: 630, alt: 'Free AI Ad Copy Generator' }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Free AI Ad Copy Generator | QuickTools",
            description: "Write highly converting ad copy variations for Facebook or Google Ads instantly with our AI Ad Copy Generator.",
            images: ['https://quicktool.space/icon.svg']
          }
};

export default function AiAdCopyPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Ad Copy Generator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Write highly converting ad copy variations for Facebook or Google Ads instantly.',
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
            <span className="text-[#6D5EF8] font-bold">AI Ad Copy Generator</span>
          </nav>
        </div>
        
        <AiAdCopyClient />
      </div>
    </>
  );
}
