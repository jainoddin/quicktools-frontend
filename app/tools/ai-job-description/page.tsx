import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import AiJobDescriptionClient from '@/components/ai-job-description/AiJobDescriptionClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Free AI Job Description Generator",
  description: "Generate professional, comprehensive, and attractive job descriptions to attract top talent.",
    keywords: ["AI Job Description","Job Description AI","Free AI Job Description","Best AI Job Description","Online Job Description","AI Job Description Tool","QuickTools AI"],
    alternates: { canonical: 'https://quicktool.space/tools/ai-job-description' },
    openGraph: {
            title: "Free AI Job Description Generator | QuickTools",
            description: "Generate professional, comprehensive, and attractive job descriptions to attract top talent.",
            url: 'https://quicktool.space/tools/ai-job-description',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("AI Job Description Generator")}&type=tool`, width: 1200, height: 630, alt: `AI Job Description Generator - QuickTools.ai` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Free AI Job Description Generator | QuickTools",
            description: "Generate professional, comprehensive, and attractive job descriptions to attract top talent.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("AI Job Description Generator")}&type=tool`]
          }
};

export default function AiJobDescriptionPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'AI Job Description Generator',
    description: 'Generate professional, comprehensive, and attractive job descriptions to attract top talent.',
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
            <span className="text-[#6D5EF8] font-bold">AI Job Description Generator</span>
          </nav>
        </div>
        
        <AiJobDescriptionClient />
      </div>
    </>
  );
}
