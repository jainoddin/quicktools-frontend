import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import AiSloganGeneratorClient from '@/components/ai-slogan-generator/AiSloganGeneratorClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Free AI Slogan Generator",
  description: "With AI assistance brainstorm catchy, memorable, and conversion-focused slogans for your business, brand, or marketing campaign.",
    keywords: ["AI Slogan Generator","Slogan Generator AI","Free AI Slogan Generator","Best AI Slogan Generator","Online Slogan Generator","AI Slogan Generator Tool","Slogan Creator","AI Slogan Creator","QuickTools AI"],
    alternates: { canonical: 'https://quicktool.space/tools/ai-slogan-generator' },
    openGraph: {
            title: "Free AI Slogan Generator | QuickTools",
            description: "With AI assistance brainstorm catchy, memorable, and conversion-focused slogans for your business, brand, or marketing campaign.",
            url: 'https://quicktool.space/tools/ai-slogan-generator',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("AI Slogan Generator")}&type=tool`, width: 1200, height: 630, alt: `AI Slogan Generator - QuickTools.ai` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Free AI Slogan Generator | QuickTools",
            description: "With AI assistance brainstorm catchy, memorable, and conversion-focused slogans for your business, brand, or marketing campaign.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("AI Slogan Generator")}&type=tool`]
          }
};

export default function AiSloganGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Slogan Generator',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'With AI assistance brainstorm catchy, memorable, and conversion-focused slogans for your business, brand, or marketing campaign.',
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
            <span className="text-[#6D5EF8] font-bold">AI Slogan Generator</span>
          </nav>
        </div>
        
        <AiSloganGeneratorClient />
      </div>
    </>
  );
}
