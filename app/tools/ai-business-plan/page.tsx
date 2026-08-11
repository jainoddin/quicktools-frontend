import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import AiBusinessPlanClient from '@/components/ai-business-plan/AiBusinessPlanClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Premium AI Business Plan Generator | QuickTools',
  description: 'Generate a complete 10-page business plan with executive summary, market analysis, and financial projections.',
    keywords: ["AI Business Plan","Business Plan AI","Free AI Business Plan","Best AI Business Plan","Online Business Plan","AI Business Plan Tool","QuickTools AI"],
    alternates: { canonical: 'https://quicktool.space/tools/ai-business-plan' },
    openGraph: {
            title: "Premium AI Business Plan Generator | QuickTools",
            description: "Generate a complete 10-page business plan with executive summary, market analysis, and financial projections.",
            url: 'https://quicktool.space/tools/ai-business-plan',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("AI Business Plan Generator")}&type=tool`, width: 1200, height: 630, alt: `AI Business Plan Generator - QuickTools.ai` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Premium AI Business Plan Generator | QuickTools",
            description: "Generate a complete 10-page business plan with executive summary, market analysis, and financial projections.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("AI Business Plan Generator")}&type=tool`]
          }
};

export default function AiBusinessPlanPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Business Plan Generator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '5',
      priceCurrency: 'USD',
    },
    description: 'Generate a complete 10-page business plan with executive summary, market analysis, and financial projections.',
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
            <span className="text-[#6D5EF8] font-bold">AI Business Plan Generator</span>
          </nav>
        </div>
        <AiBusinessPlanClient />
      </div>
    </>
  );
}
