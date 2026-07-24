import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import PasswordGeneratorClient from '@/components/password-generator/PasswordGeneratorClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Strong Password Generator | QuickTools',
  description: 'Generate secure, highly randomized, and unbreakable passwords instantly with our free Strong Password Generator.',
    keywords: ['Free Strong Password Generator', 'Free Free Strong Password Generator', 'AI Free Strong Password Generator', 'QuickTools', 'Online Free Strong Password Generator', 'AI Tool'],
    alternates: { canonical: 'https://quicktool.space/tools/password-generator' },
    openGraph: {
            title: "Free Strong Password Generator | QuickTools",
            description: "Generate secure, highly randomized, and unbreakable passwords instantly with our free Strong Password Generator.",
            url: 'https://quicktool.space/tools/password-generator',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: 'https://quicktool.space/icon.svg', width: 1200, height: 630, alt: 'Free Strong Password Generator' }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Free Strong Password Generator | QuickTools",
            description: "Generate secure, highly randomized, and unbreakable passwords instantly with our free Strong Password Generator.",
            images: ['https://quicktool.space/icon.svg']
          }
};

export default function PasswordGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Strong Password Generator',
    applicationCategory: 'SecurityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Generate secure, highly randomized, and unbreakable passwords instantly.',
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
            <span className="text-[#6D5EF8] font-bold">Strong Password Generator</span>
          </nav>
        </div>
        
        <PasswordGeneratorClient />
      </div>
    </>
  );
}
