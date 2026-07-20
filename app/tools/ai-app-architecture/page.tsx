import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import AiAppArchitectureClient from '@/components/ai-app-architecture/AiAppArchitectureClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Premium AI App Architecture Planner | QuickTools',
  description: 'Generate the full tech stack, database schema, and API endpoints documentation for a new app.',
    keywords: ['Premium AI App Architecture Planner', 'Free Premium AI App Architecture Planner', 'AI Premium AI App Architecture Planner', 'QuickTools', 'Online Premium AI App Architecture Planner', 'AI Tool'],
    alternates: { canonical: 'https://quicktool.space/tools/ai-app-architecture' },
    openGraph: {
            title: "Premium AI App Architecture Planner | QuickTools",
            description: "Generate the full tech stack, database schema, and API endpoints documentation for a new app.",
            url: 'https://quicktool.space/tools/ai-app-architecture',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: 'https://quicktool.space/icon.svg', width: 1200, height: 630, alt: 'Premium AI App Architecture Planner' }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Premium AI App Architecture Planner | QuickTools",
            description: "Generate the full tech stack, database schema, and API endpoints documentation for a new app.",
            creator: '@quicktoolsai',
            images: ['https://quicktool.space/icon.svg']
          }
};

export default function AiAppArchitecturePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI App Architecture Planner',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '5',
      priceCurrency: 'USD',
    },
    description: 'Generate the full tech stack, database schema, and API endpoints documentation for a new app.',
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
            <span className="text-[#6D5EF8] font-bold">AI App Architecture Planner</span>
          </nav>
        </div>
        <AiAppArchitectureClient />
      </div>
    </>
  );
}
