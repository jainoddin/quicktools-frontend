import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import AiPitchDeckClient from '@/components/ai-pitch-deck/AiPitchDeckClient';
import { Metadata } from 'next';
import PriorityToolSeoSection from '@/components/tools/PriorityToolSeoSection';

export const metadata: Metadata = {
  title: "AI Pitch Deck Generator for Startup Narratives",
  description: "Build a slide-by-slide pitch-deck draft covering the problem, solution, market, traction, model, team, milestones, and funding ask.",
    keywords: ["AI Pitch Deck","Pitch Deck AI","Pitch Deck Generator","Online Pitch Deck","AI Pitch Deck Tool","QuickTool AI"],
    alternates: { canonical: 'https://quicktool.space/tools/ai-pitch-deck' },
    openGraph: {
            title: "AI Pitch Deck Generator for Startup Narratives | QuickTool",
            description: "Build a slide-by-slide pitch-deck draft covering the problem, solution, market, traction, model, team, milestones, and funding ask.",
            url: 'https://quicktool.space/tools/ai-pitch-deck',
            siteName: 'QuickTool',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("AI Pitch Deck Generator")}&type=tool`, width: 1200, height: 630, alt: `AI Pitch Deck Generator - QuickTool` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "AI Pitch Deck Generator for Startup Narratives | QuickTool",
            description: "Build a slide-by-slide pitch-deck draft covering the problem, solution, market, traction, model, team, milestones, and funding ask.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("AI Pitch Deck Generator")}&type=tool`]
          }
};

export default function AiPitchDeckPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'AI Pitch Deck Generator',
    description: 'Generate slide-by-slide text, data points, and script for a startup pitch deck.',
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
            <span className="text-[#6D5EF8] font-bold">AI Pitch Deck Generator</span>
          </nav>
        </div>
        <AiPitchDeckClient />
      </div>
      <PriorityToolSeoSection slug="ai-pitch-deck" />
    </>
  );
}
