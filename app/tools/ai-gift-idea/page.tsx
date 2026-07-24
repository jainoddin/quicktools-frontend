import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import AiGiftIdeaClient from '@/components/ai-gift-idea-generator/AiGiftIdeaClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI Gift Idea Generator | QuickTools',
  description: 'Find the perfect, thoughtful gift for anyone instantly based on their age, interests, and your budget with our AI Gift Idea Generator.',
    keywords: ['Free AI Gift Idea Generator', 'Free Free AI Gift Idea Generator', 'AI Free AI Gift Idea Generator', 'QuickTools', 'Online Free AI Gift Idea Generator', 'AI Tool'],
    alternates: { canonical: 'https://quicktool.space/tools/ai-gift-idea' },
    openGraph: {
            title: "Free AI Gift Idea Generator | QuickTools",
            description: "Find the perfect, thoughtful gift for anyone instantly based on their age, interests, and your budget with our AI Gift Idea Generator.",
            url: 'https://quicktool.space/tools/ai-gift-idea',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: 'https://quicktool.space/icon.svg', width: 1200, height: 630, alt: 'Free AI Gift Idea Generator' }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Free AI Gift Idea Generator | QuickTools",
            description: "Find the perfect, thoughtful gift for anyone instantly based on their age, interests, and your budget with our AI Gift Idea Generator.",
            images: ['https://quicktool.space/icon.svg']
          }
};

export default function AiGiftIdeaPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Gift Idea Generator',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Find the perfect, thoughtful gift for anyone instantly based on their age, interests, and your budget.',
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
            <span className="text-[#6D5EF8] font-bold">AI Gift Idea Generator</span>
          </nav>
        </div>
        
        <AiGiftIdeaClient />
      </div>
    </>
  );
}
