import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import AiReviewResponderClient from '@/components/ai-review-responder/AiReviewResponderClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI Review Responder | QuickTools',
  description: 'Save time and maintain a great reputation by generating professional, empathetic replies to customer reviews.',
    keywords: ['Free AI Review Responder', 'Free Free AI Review Responder', 'AI Free AI Review Responder', 'QuickTools', 'Online Free AI Review Responder', 'AI Tool'],
    alternates: { canonical: 'https://quicktool.space/tools/ai-review-responder' },
    openGraph: {
            title: "Free AI Review Responder | QuickTools",
            description: "Save time and maintain a great reputation by generating professional, empathetic replies to customer reviews.",
            url: 'https://quicktool.space/tools/ai-review-responder',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: 'https://quicktool.space/icon.svg', width: 1200, height: 630, alt: 'Free AI Review Responder' }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Free AI Review Responder | QuickTools",
            description: "Save time and maintain a great reputation by generating professional, empathetic replies to customer reviews.",
            images: ['https://quicktool.space/icon.svg']
          }
};

export default function AiReviewResponderPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Review Responder',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Save time and maintain a great reputation by generating professional, empathetic replies to customer reviews.',
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
            <span className="text-[#6D5EF8] font-bold">AI Review Responder</span>
          </nav>
        </div>
        
        <AiReviewResponderClient />
      </div>
    </>
  );
}
