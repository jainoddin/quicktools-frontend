import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import AiSeoTopicalMapClient from '@/components/ai-seo-topical-map/AiSeoTopicalMapClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Premium AI SEO Topical Map Builder | QuickTools',
  description: 'Generate a full SEO content cluster map for an entire month for a niche.',
};

export default function AiSeoTopicalMapPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI SEO Topical Map Builder',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '5',
      priceCurrency: 'USD',
    },
    description: 'Generate a full SEO content cluster map for an entire month for a niche.',
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
            <span className="text-[#6D5EF8] font-bold">AI SEO Topical Map Builder</span>
          </nav>
        </div>
        <AiSeoTopicalMapClient />
      </div>
    </>
  );
}
