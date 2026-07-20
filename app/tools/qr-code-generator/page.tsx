import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import QrCodeClient from '@/components/qr-code-generator/QrCodeClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free QR Code Generator | QuickTools',
  description: 'Generate high-quality QR codes for URLs, text, or emails instantly. 100% free with no limits.',
    keywords: ['Free QR Code Generator', 'Free Free QR Code Generator', 'AI Free QR Code Generator', 'QuickTools', 'Online Free QR Code Generator', 'AI Tool'],
    alternates: { canonical: 'https://quicktool.space/tools/qr-code-generator' },
    openGraph: {
            title: "Free QR Code Generator | QuickTools",
            description: "Generate high-quality QR codes for URLs, text, or emails instantly. 100% free with no limits.",
            url: 'https://quicktool.space/tools/qr-code-generator',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: 'https://quicktool.space/icon.svg', width: 1200, height: 630, alt: 'Free QR Code Generator' }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Free QR Code Generator | QuickTools",
            description: "Generate high-quality QR codes for URLs, text, or emails instantly. 100% free with no limits.",
            creator: '@quicktoolsai',
            images: ['https://quicktool.space/icon.svg']
          }
};

export default function QrCodeGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'QR Code Generator',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Generate high-quality QR codes for URLs, text, or emails instantly.',
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
            <span className="text-[#6D5EF8] font-bold">QR Code Generator</span>
          </nav>
        </div>
        
        <QrCodeClient />
      </div>
    </>
  );
}
