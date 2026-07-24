import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import AiGrantProposalClient from '@/components/ai-grant-proposal/AiGrantProposalClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Premium AI Grant Proposal Writer | QuickTools',
  description: 'Write professional grant proposals for non-profits and startups.',
    keywords: ['Premium AI Grant Proposal Writer', 'Free Premium AI Grant Proposal Writer', 'AI Premium AI Grant Proposal Writer', 'QuickTools', 'Online Premium AI Grant Proposal Writer', 'AI Tool'],
    alternates: { canonical: 'https://quicktool.space/tools/ai-grant-proposal' },
    openGraph: {
            title: "Premium AI Grant Proposal Writer | QuickTools",
            description: "Write professional grant proposals for non-profits and startups.",
            url: 'https://quicktool.space/tools/ai-grant-proposal',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: 'https://quicktool.space/icon.svg', width: 1200, height: 630, alt: 'Premium AI Grant Proposal Writer' }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Premium AI Grant Proposal Writer | QuickTools",
            description: "Write professional grant proposals for non-profits and startups.",
            images: ['https://quicktool.space/icon.svg']
          }
};

export default function AiGrantProposalPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Grant Proposal Writer',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '5',
      priceCurrency: 'USD',
    },
    description: 'Write professional grant proposals for non-profits and startups.',
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
            <span className="text-[#6D5EF8] font-bold">AI Grant Proposal Writer</span>
          </nav>
        </div>
        <AiGrantProposalClient />
      </div>
    </>
  );
}
