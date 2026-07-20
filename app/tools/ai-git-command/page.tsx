import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import AiGitCommandClient from '@/components/ai-git-command/AiGitCommandClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI Git Command Generator | QuickTools',
  description: 'Forget complex git syntax. Describe what you want to do in plain English, and get the exact git commands instantly.',
    keywords: ['Free AI Git Command Generator', 'Free Free AI Git Command Generator', 'AI Free AI Git Command Generator', 'QuickTools', 'Online Free AI Git Command Generator', 'AI Tool'],
    alternates: { canonical: 'https://quicktool.space/tools/ai-git-command' },
    openGraph: {
            title: "Free AI Git Command Generator | QuickTools",
            description: "Forget complex git syntax. Describe what you want to do in plain English, and get the exact git commands instantly.",
            url: 'https://quicktool.space/tools/ai-git-command',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: 'https://quicktool.space/icon.svg', width: 1200, height: 630, alt: 'Free AI Git Command Generator' }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Free AI Git Command Generator | QuickTools",
            description: "Forget complex git syntax. Describe what you want to do in plain English, and get the exact git commands instantly.",
            creator: '@quicktoolsai',
            images: ['https://quicktool.space/icon.svg']
          }
};

export default function AiGitCommandPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Git Command Generator',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Forget complex git syntax. Describe what you want to do in plain English, and get the exact git commands instantly.',
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
            <span className="text-[#6D5EF8] font-bold">AI Git Command Generator</span>
          </nav>
        </div>
        
        <AiGitCommandClient />
      </div>
    </>
  );
}
