
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import DreamInterpreterClient from '@/components/ai-dream-interpreter/DreamInterpreterClient';

export const metadata: Metadata = {
  title: 'AI Dream Interpreter - QuickTools.ai',
  description: 'Analyze your dreams for psychological meaning and hidden messages.',
  alternates: {
    canonical: 'https://quicktool.space/tools/ai-dream-interpreter'
  }
};

export default function Page() {
  return (
    <div className="flex-grow bg-[#F8FAFC] flex flex-col font-sans relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "AI Dream Interpreter",
        "operatingSystem": "Web",
        "applicationCategory": "WebApplication",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "description": "Analyze your dreams for psychological meaning and hidden messages.",
        "url": "https://quicktool.space/tools/ai-dream-interpreter"
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
            <span className="text-[#8B5CF6] font-bold">AI Dream Interpreter</span>
          </nav>
        </div>
        <div className="flex-1 w-full max-w-[1600px] mx-auto py-2 h-[calc(100vh-80px)]">
          <DreamInterpreterClient />
        </div>
      </div>
    </div>
  );
}
