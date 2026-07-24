import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import AiProductDescClient from '@/components/ai-product-description/AiProductDescClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI Product Description Generator | QuickTools',
  description: 'Write compelling, conversion-focused product descriptions for your e-commerce store instantly with AI.',
    keywords: ['Free AI Product Description Generator', 'Free Free AI Product Description Generator', 'AI Free AI Product Description Generator', 'QuickTools', 'Online Free AI Product Description Generator', 'AI Tool'],
    alternates: { canonical: 'https://quicktool.space/tools/ai-product-description' },
    openGraph: {
            title: "Free AI Product Description Generator | QuickTools",
            description: "Write compelling, conversion-focused product descriptions for your e-commerce store instantly with AI.",
            url: 'https://quicktool.space/tools/ai-product-description',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: 'https://quicktool.space/icon.svg', width: 1200, height: 630, alt: 'Free AI Product Description Generator' }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Free AI Product Description Generator | QuickTools",
            description: "Write compelling, conversion-focused product descriptions for your e-commerce store instantly with AI.",
            images: ['https://quicktool.space/icon.svg']
          }
};

export default function AiProductDescPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Product Description Generator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Write compelling, conversion-focused product descriptions instantly.',
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
            <span className="text-[#6D5EF8] font-bold">AI Product Description Generator</span>
          </nav>
        </div>
        
        <AiProductDescClient />
      </div>
    </>
  );
}
