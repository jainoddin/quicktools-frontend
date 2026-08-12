import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import AiTravelPlannerClient from '@/components/ai-travel-planner/AiTravelPlannerClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Free AI Travel Itinerary Planner",
  description: "Plan your perfect trip with AI assistance. Generate day-by-day travel itineraries customized to your destination and duration.",
    keywords: ["AI Travel Planner","Travel Planner AI","Free AI Travel Planner","Best AI Travel Planner","Online Travel Planner","AI Travel Planner Tool","QuickTool AI"],
    alternates: { canonical: 'https://quicktool.space/tools/ai-travel-planner' },
    openGraph: {
            title: "Free AI Travel Itinerary Planner | QuickTool",
            description: "Plan your perfect trip with AI assistance. Generate day-by-day travel itineraries customized to your destination and duration.",
            url: 'https://quicktool.space/tools/ai-travel-planner',
            siteName: 'QuickTool',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("AI Travel Itinerary Planner")}&type=tool`, width: 1200, height: 630, alt: `AI Travel Itinerary Planner - QuickTool` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Free AI Travel Itinerary Planner | QuickTool",
            description: "Plan your perfect trip with AI assistance. Generate day-by-day travel itineraries customized to your destination and duration.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("AI Travel Itinerary Planner")}&type=tool`]
          }
};

export default function AiTravelPlannerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'AI Travel Itinerary Planner',
    description: 'Plan your perfect trip with AI assistance. Generate day-by-day travel itineraries customized to your destination and duration.',
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
