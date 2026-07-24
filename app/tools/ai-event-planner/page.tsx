import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import AiEventPlannerClient from '@/components/ai-event-planner/AiEventPlannerClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI Event Planner | QuickTools',
  description: 'Plan your events effortlessly. Get a comprehensive checklist, timeline, and ideas for your next party or corporate event.',
    keywords: ['Free AI Event Planner', 'Free Free AI Event Planner', 'AI Free AI Event Planner', 'QuickTools', 'Online Free AI Event Planner', 'AI Tool'],
    alternates: { canonical: 'https://quicktool.space/tools/ai-event-planner' },
    openGraph: {
            title: "Free AI Event Planner | QuickTools",
            description: "Plan your events effortlessly. Get a comprehensive checklist, timeline, and ideas for your next party or corporate event.",
            url: 'https://quicktool.space/tools/ai-event-planner',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: 'https://quicktool.space/icon.svg', width: 1200, height: 630, alt: 'Free AI Event Planner' }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Free AI Event Planner | QuickTools",
            description: "Plan your events effortlessly. Get a comprehensive checklist, timeline, and ideas for your next party or corporate event.",
            images: ['https://quicktool.space/icon.svg']
          }
};

export default function AiEventPlannerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Event Planner',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Plan your events effortlessly. Get a comprehensive checklist, timeline, and ideas for your next party or corporate event.',
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
            <span className="text-[#6D5EF8] font-bold">AI Event Planner</span>
          </nav>
        </div>
        
        <AiEventPlannerClient />
      </div>
    </>
  );
}
