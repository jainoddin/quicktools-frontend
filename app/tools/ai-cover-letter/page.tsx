import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import AiCoverLetterClient from '@/components/ai-cover-letter/AiCoverLetterClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI Cover Letter Generator | QuickTools',
  description: 'Write a professional, standout cover letter for any job application in seconds based on your skills and the job title.',
    keywords: ['Free AI Cover Letter Generator', 'Free Free AI Cover Letter Generator', 'AI Free AI Cover Letter Generator', 'QuickTools', 'Online Free AI Cover Letter Generator', 'AI Tool'],
    alternates: { canonical: 'https://quicktool.space/tools/ai-cover-letter' },
    openGraph: {
            title: "Free AI Cover Letter Generator | QuickTools",
            description: "Write a professional, standout cover letter for any job application in seconds based on your skills and the job title.",
            url: 'https://quicktool.space/tools/ai-cover-letter',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: 'https://quicktool.space/icon.svg', width: 1200, height: 630, alt: 'Free AI Cover Letter Generator' }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Free AI Cover Letter Generator | QuickTools",
            description: "Write a professional, standout cover letter for any job application in seconds based on your skills and the job title.",
            images: ['https://quicktool.space/icon.svg']
          }
};

export default function AiCoverLetterPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Cover Letter Generator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Write a professional, standout cover letter for any job application in seconds.',
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
            <span className="text-[#6D5EF8] font-bold">AI Cover Letter Generator</span>
          </nav>
        </div>
        
        <AiCoverLetterClient />
      </div>
    </>
  );
}
