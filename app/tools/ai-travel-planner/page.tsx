import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import AiTravelPlannerClient from '@/components/ai-travel-planner/AiTravelPlannerClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI Travel Itinerary Planner | QuickTools',
  description: 'Plan your perfect trip instantly. Generate day-by-day travel itineraries customized to your destination and duration.',
    keywords: ['Free AI Travel Itinerary Planner', 'Free Free AI Travel Itinerary Planner', 'AI Free AI Travel Itinerary Planner', 'QuickTools', 'Online Free AI Travel Itinerary Planner', 'AI Tool'],
    alternates: { canonical: 'https://quicktool.space/tools/ai-travel-planner' },
    openGraph: {
            title: "Free AI Travel Itinerary Planner | QuickTools",
            description: "Plan your perfect trip instantly. Generate day-by-day travel itineraries customized to your destination and duration.",
            url: 'https://quicktool.space/tools/ai-travel-planner',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: 'https://quicktool.space/icon.svg', width: 1200, height: 630, alt: 'Free AI Travel Itinerary Planner' }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Free AI Travel Itinerary Planner | QuickTools",
            description: "Plan your perfect trip instantly. Generate day-by-day travel itineraries customized to your destination and duration.",
            creator: '@quicktoolsai',
            images: ['https://quicktool.space/icon.svg']
          }
};

export default function AiTravelPlannerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Travel Itinerary Planner',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Plan your perfect trip instantly. Generate day-by-day travel itineraries customized to your destination and duration.',
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
            <span className="text-[#6D5EF8] font-bold">AI Travel Itinerary Planner</span>
          </nav>
        </div>
        
        <AiTravelPlannerClient />
      </div>
    </>
  );
}
