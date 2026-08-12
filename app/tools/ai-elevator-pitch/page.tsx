import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import AiElevatorPitchClient from '@/components/ai-elevator-pitch/AiElevatorPitchClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Free AI Elevator Pitch Generator",
  description: "Craft a compelling and persuasive 30-second elevator pitch for yourself or your business with AI assistance.",
    keywords: ["AI Elevator Pitch","Elevator Pitch AI","Free AI Elevator Pitch","Best AI Elevator Pitch","Online Elevator Pitch","AI Elevator Pitch Tool","QuickTools AI"],
    alternates: { canonical: 'https://quicktool.space/tools/ai-elevator-pitch' },
    openGraph: {
            title: "Free AI Elevator Pitch Generator | QuickTools",
            description: "Craft a compelling and persuasive 30-second elevator pitch for yourself or your business with AI assistance.",
            url: 'https://quicktool.space/tools/ai-elevator-pitch',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("AI Elevator Pitch Generator")}&type=tool`, width: 1200, height: 630, alt: `AI Elevator Pitch Generator - QuickTools.ai` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Free AI Elevator Pitch Generator | QuickTools",
            description: "Craft a compelling and persuasive 30-second elevator pitch for yourself or your business with AI assistance.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("AI Elevator Pitch Generator")}&type=tool`]
          }
};

export default function AiElevatorPitchPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'AI Elevator Pitch Generator',
    description: 'Craft a compelling and persuasive 30-second elevator pitch for yourself or your business with AI assistance.',
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
            <span className="text-[#6D5EF8] font-bold">AI Elevator Pitch Generator</span>
          </nav>
        </div>
        
        <AiElevatorPitchClient />
      </div>
    </>
  );
}
