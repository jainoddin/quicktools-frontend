import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import AiOutlineClient from '@/components/ai-article-outline-generator/AiOutlineClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI Article Outline Generator | QuickTools',
  description: 'Generate comprehensive, SEO-optimized article and blog outlines instantly. Save hours of planning and structure your content perfectly.',
    keywords: ['Free AI Article Outline Generator', 'Free Free AI Article Outline Generator', 'AI Free AI Article Outline Generator', 'QuickTools', 'Online Free AI Article Outline Generator', 'AI Tool'],
    alternates: { canonical: 'https://quicktool.space/tools/ai-article-outline-generator' },
    openGraph: {
            title: "Free AI Article Outline Generator | QuickTools",
            description: "Generate comprehensive, SEO-optimized article and blog outlines instantly. Save hours of planning and structure your content perfectly.",
            url: 'https://quicktool.space/tools/ai-article-outline-generator',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: 'https://quicktool.space/icon.svg', width: 1200, height: 630, alt: 'Free AI Article Outline Generator' }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Free AI Article Outline Generator | QuickTools",
            description: "Generate comprehensive, SEO-optimized article and blog outlines instantly. Save hours of planning and structure your content perfectly.",
            images: ['https://quicktool.space/icon.svg']
          }
};

export default function AiOutlineGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Article Outline Generator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Generate comprehensive, SEO-optimized article and blog outlines instantly.',
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
            <span className="text-[#6D5EF8] font-bold">AI Article Outline Generator</span>
          </nav>
        </div>
        
        <AiOutlineClient />
      </div>
    </>
  );
}
