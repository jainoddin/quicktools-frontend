import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import AiWorkoutClient from '@/components/ai-workout-generator/AiWorkoutClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Free AI Workout Plan Generator",
  description: "Generate custom, highly effective workout plans with AI assistance based on your fitness goals and available time with our AI Workout Plan Generator.",
    keywords: ["AI Workout Plan","Workout Plan AI","Free AI Workout Plan","Best AI Workout Plan","Online Workout Plan","AI Workout Plan Tool","QuickTool AI"],
    alternates: { canonical: 'https://quicktool.space/tools/ai-workout-plan' },
    openGraph: {
            title: "Free AI Workout Plan Generator | QuickTool",
            description: "Generate custom, highly effective workout plans with AI assistance based on your fitness goals and available time with our AI Workout Plan Generator.",
            url: 'https://quicktool.space/tools/ai-workout-plan',
            siteName: 'QuickTool',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("AI Workout Plan Generator")}&type=tool`, width: 1200, height: 630, alt: `AI Workout Plan Generator - QuickTool` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Free AI Workout Plan Generator | QuickTool",
            description: "Generate custom, highly effective workout plans with AI assistance based on your fitness goals and available time with our AI Workout Plan Generator.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("AI Workout Plan Generator")}&type=tool`]
          }
};

export default function AiWorkoutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'AI Workout Plan Generator',
    description: 'Generate custom, highly effective workout plans with AI assistance based on your fitness goals and available time.',
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
            <span className="text-[#6D5EF8] font-bold">AI Workout Plan Generator</span>
          </nav>
        </div>
        
        <AiWorkoutClient />
      </div>
    </>
  );
}
