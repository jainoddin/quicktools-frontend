import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import AiTtsClient from '@/components/ai-text-to-speech/AiTtsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Text to Speech Generator | QuickTools',
  description: 'Convert any text into natural-sounding speech instantly using advanced browser AI. Free online text to speech generator with multiple voices and languages.',
  keywords: ['AI Text to Speech', 'Free Text to Speech', 'Online Voice Generator', 'TTS Tool', 'QuickTools'],
  alternates: { canonical: 'https://quicktool.space/tools/ai-text-to-speech' },
  openGraph: {
    title: 'AI Text to Speech Generator | QuickTools',
    description: 'Convert any text into natural-sounding speech instantly using advanced browser AI.',
    url: 'https://quicktool.space/tools/ai-text-to-speech',
    siteName: 'QuickTools.ai',
    type: 'website',
    images: [{ url: 'https://quicktool.space/icon.svg', width: 1200, height: 630, alt: 'AI Text to Speech' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Text to Speech Generator | QuickTools',
    description: 'Convert any text into natural-sounding speech instantly using advanced browser AI.',
    images: ['https://quicktool.space/icon.svg']
  }
};

export default function AiTextToSpeechPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Text to Speech Generator',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Convert any text into natural-sounding speech instantly using browser AI.',
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
            <span className="text-[#6D5EF8] font-bold">AI Text to Speech</span>
          </nav>
        </div>
        
        <AiTtsClient />
      </div>
    </>
  );
}
