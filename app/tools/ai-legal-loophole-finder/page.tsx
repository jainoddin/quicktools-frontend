
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import LegalLoopholeFinderClient from '@/components/ai-legal-loophole-finder/LegalLoopholeFinderClient';

export const metadata: Metadata = {
  title: 'Legal Loophole Finder - QuickTools.ai',
  description: 'Find hidden clauses, red flags, and loopholes in legal contracts and rental agreements.',
  alternates: {
    canonical: 'https://quicktool.space/tools/ai-legal-loophole-finder'
  }
};

export default function Page() {
  return (
    <div className="flex-grow bg-[#F8FAFC] flex flex-col font-sans relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Legal Loophole Finder",
        "operatingSystem": "Web",
        "applicationCategory": "WebApplication",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "description": "Find hidden clauses, red flags, and loopholes in legal contracts and rental agreements.",
        "url": "https://quicktool.space/tools/ai-legal-loophole-finder"
      }) }} />
      
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-[15px] flex-grow flex flex-col relative z-10">
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
            <span className="text-[#EF4444] font-bold">Legal Loophole Finder</span>
          </nav>
        </div>
        <div className="flex-1 w-full max-w-[1600px] mx-auto py-2 h-[calc(100vh-80px)]">
          <LegalLoopholeFinderClient />
        </div>
      </div>
    </div>
  );
}
