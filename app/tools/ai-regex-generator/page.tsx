import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import RegexGeneratorClient from '@/components/regex-generator/RegexGeneratorClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI Regex Generator | QuickTools',
  description: 'Generate complex Regular Expressions easily from plain English descriptions instantly with our free AI Regex Generator.',
    keywords: ['Free AI Regex Generator', 'Free Free AI Regex Generator', 'AI Free AI Regex Generator', 'QuickTools', 'Online Free AI Regex Generator', 'AI Tool'],
    alternates: { canonical: 'https://quicktool.space/tools/ai-regex-generator' },
    openGraph: {
            title: "Free AI Regex Generator | QuickTools",
            description: "Generate complex Regular Expressions easily from plain English descriptions instantly with our free AI Regex Generator.",
            url: 'https://quicktool.space/tools/ai-regex-generator',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: 'https://quicktool.space/icon.svg', width: 1200, height: 630, alt: 'Free AI Regex Generator' }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Free AI Regex Generator | QuickTools",
            description: "Generate complex Regular Expressions easily from plain English descriptions instantly with our free AI Regex Generator.",
            creator: '@quicktoolsai',
            images: ['https://quicktool.space/icon.svg']
          }
};

export default function RegexGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Regex Generator',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Generate complex Regular Expressions easily from plain English descriptions.',
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
            <span className="text-[#6D5EF8] font-bold">AI Regex Generator</span>
          </nav>
        </div>
        
        <RegexGeneratorClient />
      </div>
    </>
  );
}
