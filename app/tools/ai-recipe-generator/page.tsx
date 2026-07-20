import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import AiRecipeClient from '@/components/ai-recipe-generator/AiRecipeClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI Recipe Generator | QuickTools',
  description: 'Generate delicious recipes based on the ingredients you have in your fridge instantly with our AI Recipe Generator.',
    keywords: ['Free AI Recipe Generator', 'Free Free AI Recipe Generator', 'AI Free AI Recipe Generator', 'QuickTools', 'Online Free AI Recipe Generator', 'AI Tool'],
    alternates: { canonical: 'https://quicktool.space/tools/ai-recipe-generator' },
    openGraph: {
            title: "Free AI Recipe Generator | QuickTools",
            description: "Generate delicious recipes based on the ingredients you have in your fridge instantly with our AI Recipe Generator.",
            url: 'https://quicktool.space/tools/ai-recipe-generator',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: 'https://quicktool.space/icon.svg', width: 1200, height: 630, alt: 'Free AI Recipe Generator' }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Free AI Recipe Generator | QuickTools",
            description: "Generate delicious recipes based on the ingredients you have in your fridge instantly with our AI Recipe Generator.",
            creator: '@quicktoolsai',
            images: ['https://quicktool.space/icon.svg']
          }
};

export default function AiRecipePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Recipe Generator',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Generate delicious recipes based on the ingredients you have in your fridge instantly.',
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
            <span className="text-[#6D5EF8] font-bold">AI Recipe Generator</span>
          </nav>
        </div>
        
        <AiRecipeClient />
      </div>
    </>
  );
}
