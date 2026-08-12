import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import AiSocialCalendarClient from '@/components/ai-social-calendar/AiSocialCalendarClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Premium AI Social Media Calendar",
  description: "Generate a 30-day multi-channel marketing calendar with specific daily posts.",
    keywords: ["AI Social Calendar","Social Calendar AI","Free AI Social Calendar","Best AI Social Calendar","Online Social Calendar","AI Social Calendar Tool","AI Social Calendar AI","Social Media Calendar AI","QuickTools AI"],
    alternates: { canonical: 'https://quicktool.space/tools/ai-social-calendar' },
    openGraph: {
            title: "Premium AI Social Media Calendar | QuickTools",
            description: "Generate a 30-day multi-channel marketing calendar with specific daily posts.",
            url: 'https://quicktool.space/tools/ai-social-calendar',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("AI Social Media Calendar")}&type=tool`, width: 1200, height: 630, alt: `AI Social Media Calendar - QuickTools.ai` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Premium AI Social Media Calendar | QuickTools",
            description: "Generate a 30-day multi-channel marketing calendar with specific daily posts.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("AI Social Media Calendar")}&type=tool`]
          }
};

export default function AiSocialCalendarPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'AI Social Media Calendar',
    description: 'Generate a 30-day multi-channel marketing calendar with specific daily posts.',
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
            <span className="text-[#6D5EF8] font-bold">AI Social Media Calendar</span>
          </nav>
        </div>
        <AiSocialCalendarClient />
      </div>
    </>
  );
}
