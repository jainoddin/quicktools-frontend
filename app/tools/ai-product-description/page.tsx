import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import AiProductDescClient from '@/components/ai-product-description/AiProductDescClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Free AI Product Description Generator",
  description: "Write compelling, conversion-focused product descriptions for your e-commerce store with AI assistance.",
    keywords: ["AI Product Description","Product Description AI","Free AI Product Description","Best AI Product Description","Online Product Description","AI Product Description Tool","QuickTools AI"],
    alternates: { canonical: 'https://quicktool.space/tools/ai-product-description' },
    openGraph: {
            title: "Free AI Product Description Generator | QuickTools",
            description: "Write compelling, conversion-focused product descriptions for your e-commerce store with AI assistance.",
            url: 'https://quicktool.space/tools/ai-product-description',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("AI Product Description Generator")}&type=tool`, width: 1200, height: 630, alt: `AI Product Description Generator - QuickTools.ai` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Free AI Product Description Generator | QuickTools",
            description: "Write compelling, conversion-focused product descriptions for your e-commerce store with AI assistance.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("AI Product Description Generator")}&type=tool`]
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
    description: 'Write compelling, conversion-focused product descriptions with AI assistance.',
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
