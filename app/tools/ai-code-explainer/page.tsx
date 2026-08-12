import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import AiCodeExplainerClient from '@/components/ai-code-explainer/AiCodeExplainerClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Free AI Code Explainer",
  description: "Understand any snippet of code easily. Our AI Code Explainer translates complex code into simple, plain English explanations with AI assistance.",
    keywords: ["AI Code Explainer","Code Explainer AI","Free AI Code Explainer","Best AI Code Explainer","Online Code Explainer","AI Code Explainer Tool","Code Generator Explainer","AI Code Generator Explainer","QuickTool AI"],
    alternates: { canonical: 'https://quicktool.space/tools/ai-code-explainer' },
    openGraph: {
            title: "Free AI Code Explainer | QuickTool",
            description: "Understand any snippet of code easily. Our AI Code Explainer translates complex code into simple, plain English explanations with AI assistance.",
            url: 'https://quicktool.space/tools/ai-code-explainer',
            siteName: 'QuickTool',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("AI Code Explainer")}&type=tool`, width: 1200, height: 630, alt: `AI Code Explainer - QuickTool` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Free AI Code Explainer | QuickTool",
            description: "Understand any snippet of code easily. Our AI Code Explainer translates complex code into simple, plain English explanations with AI assistance.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("AI Code Explainer")}&type=tool`]
          }
};

export default function AiCodeExplainerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'AI Code Explainer',
    description: 'Understand any snippet of code easily by translating it into plain English.',
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
            <span className="text-[#6D5EF8] font-bold">AI Code Explainer</span>
          </nav>
        </div>
        
        <AiCodeExplainerClient />
      </div>
    </>
  );
}
