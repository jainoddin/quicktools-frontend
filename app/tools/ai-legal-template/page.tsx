import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import AiLegalTemplateClient from '@/components/ai-legal-template/AiLegalTemplateClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Premium AI Legal Template Drafter",
  description: "Generate standard boilerplate templates for NDAs, Freelance agreements, etc.",
    keywords: ["AI Legal Template","Legal Template AI","Free AI Legal Template","Best AI Legal Template","Online Legal Template","AI Legal Template Tool","QuickTool AI"],
    alternates: { canonical: 'https://quicktool.space/tools/ai-legal-template' },
    openGraph: {
            title: "Premium AI Legal Template Drafter | QuickTool",
            description: "Generate standard boilerplate templates for NDAs, Freelance agreements, etc.",
            url: 'https://quicktool.space/tools/ai-legal-template',
            siteName: 'QuickTool',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("AI Legal Template Drafter")}&type=tool`, width: 1200, height: 630, alt: `AI Legal Template Drafter - QuickTool` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Premium AI Legal Template Drafter | QuickTool",
            description: "Generate standard boilerplate templates for NDAs, Freelance agreements, etc.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("AI Legal Template Drafter")}&type=tool`]
          }
};

export default function AiLegalTemplatePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'AI Legal Template Drafter',
    description: 'Generate standard boilerplate templates for NDAs, Freelance agreements, etc.',
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
            <span className="text-[#6D5EF8] font-bold">AI Legal Template Drafter</span>
          </nav>
        </div>
        <AiLegalTemplateClient />
      </div>
    </>
  );
}
