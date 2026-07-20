import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import JsonFormatterClient from '@/components/json-formatter/JsonFormatterClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free JSON Formatter & Validator | QuickTools',
  description: 'Format, validate, and beautify your JSON data instantly with our free online JSON Formatter tool.',
    keywords: ['Free JSON Formatter & Validator', 'Free Free JSON Formatter & Validator', 'AI Free JSON Formatter & Validator', 'QuickTools', 'Online Free JSON Formatter & Validator', 'AI Tool'],
    alternates: { canonical: 'https://quicktool.space/tools/json-formatter' },
    openGraph: {
            title: "Free JSON Formatter & Validator | QuickTools",
            description: "Format, validate, and beautify your JSON data instantly with our free online JSON Formatter tool.",
            url: 'https://quicktool.space/tools/json-formatter',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: 'https://quicktool.space/icon.svg', width: 1200, height: 630, alt: 'Free JSON Formatter & Validator' }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Free JSON Formatter & Validator | QuickTools",
            description: "Format, validate, and beautify your JSON data instantly with our free online JSON Formatter tool.",
            creator: '@quicktoolsai',
            images: ['https://quicktool.space/icon.svg']
          }
};

export default function JsonFormatterPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'JSON Formatter',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Format, validate, and beautify your JSON data instantly.',
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
            <span className="text-[#6D5EF8] font-bold">JSON Formatter & Validator</span>
          </nav>
        </div>
        
        <JsonFormatterClient />
      </div>
    </>
  );
}
