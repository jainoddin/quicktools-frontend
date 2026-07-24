import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import AiGrammarClient from '@/components/ai-grammar-checker/AiGrammarClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI Grammar & Spell Checker | QuickTools',
  description: 'Instantly check your text for grammar, spelling, and punctuation errors. Rewrites sentences for better flow and professional tone.',
    keywords: ['Free AI Grammar & Spell Checker', 'Free Free AI Grammar & Spell Checker', 'AI Free AI Grammar & Spell Checker', 'QuickTools', 'Online Free AI Grammar & Spell Checker', 'AI Tool'],
    alternates: { canonical: 'https://quicktool.space/tools/ai-grammar-checker' },
    openGraph: {
            title: "Free AI Grammar & Spell Checker | QuickTools",
            description: "Instantly check your text for grammar, spelling, and punctuation errors. Rewrites sentences for better flow and professional tone.",
            url: 'https://quicktool.space/tools/ai-grammar-checker',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: 'https://quicktool.space/icon.svg', width: 1200, height: 630, alt: 'Free AI Grammar & Spell Checker' }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Free AI Grammar & Spell Checker | QuickTools",
            description: "Instantly check your text for grammar, spelling, and punctuation errors. Rewrites sentences for better flow and professional tone.",
            images: ['https://quicktool.space/icon.svg']
          }
};

export default function AiGrammarCheckerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Grammar Checker',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Instantly check your text for grammar, spelling, and punctuation errors.',
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
            <span className="text-[#6D5EF8] font-bold">AI Grammar & Spell Checker</span>
          </nav>
        </div>
        
        <AiGrammarClient />
      </div>
    </>
  );
}
