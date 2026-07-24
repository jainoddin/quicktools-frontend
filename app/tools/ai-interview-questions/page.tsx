import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import AiInterviewQuestionsClient from '@/components/ai-interview-questions/AiInterviewQuestionsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI Interview Questions Generator | QuickTools',
  description: 'Prepare for any interview by generating targeted, role-specific questions for candidates or for your own practice.',
    keywords: ['Free AI Interview Questions Generator', 'Free Free AI Interview Questions Generator', 'AI Free AI Interview Questions Generator', 'QuickTools', 'Online Free AI Interview Questions Generator', 'AI Tool'],
    alternates: { canonical: 'https://quicktool.space/tools/ai-interview-questions' },
    openGraph: {
            title: "Free AI Interview Questions Generator | QuickTools",
            description: "Prepare for any interview by generating targeted, role-specific questions for candidates or for your own practice.",
            url: 'https://quicktool.space/tools/ai-interview-questions',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: 'https://quicktool.space/icon.svg', width: 1200, height: 630, alt: 'Free AI Interview Questions Generator' }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Free AI Interview Questions Generator | QuickTools",
            description: "Prepare for any interview by generating targeted, role-specific questions for candidates or for your own practice.",
            images: ['https://quicktool.space/icon.svg']
          }
};

export default function AiInterviewQuestionsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Interview Questions Generator',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Prepare for any interview by generating targeted, role-specific questions for candidates or for your own practice.',
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
            <span className="text-[#6D5EF8] font-bold">AI Interview Questions Generator</span>
          </nav>
        </div>
        
        <AiInterviewQuestionsClient />
      </div>
    </>
  );
}
