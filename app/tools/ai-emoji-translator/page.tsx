import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import AiEmojiTranslatorClient from '@/components/ai-emoji-translator/AiEmojiTranslatorClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Free AI Emoji Translator",
  description: "Turn any text, quote, or sentence into a fun sequence of emojis with AI assistance.",
    keywords: ["AI Emoji Translator","Emoji Translator AI","Free AI Emoji Translator","Best AI Emoji Translator","Online Emoji Translator","AI Emoji Translator Tool","QuickTools AI"],
    alternates: { canonical: 'https://quicktool.space/tools/ai-emoji-translator' },
    openGraph: {
            title: "Free AI Emoji Translator | QuickTools",
            description: "Turn any text, quote, or sentence into a fun sequence of emojis with AI assistance.",
            url: 'https://quicktool.space/tools/ai-emoji-translator',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("AI Emoji Translator")}&type=tool`, width: 1200, height: 630, alt: `AI Emoji Translator - QuickTools.ai` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Free AI Emoji Translator | QuickTools",
            description: "Turn any text, quote, or sentence into a fun sequence of emojis with AI assistance.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("AI Emoji Translator")}&type=tool`]
          }
};

export default function AiEmojiTranslatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Emoji Translator',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Turn any text, quote, or sentence into a fun sequence of emojis with AI assistance.',
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
            <span className="text-[#6D5EF8] font-bold">AI Emoji Translator</span>
          </nav>
        </div>
        
        <AiEmojiTranslatorClient />
      </div>
    </>
  );
}
