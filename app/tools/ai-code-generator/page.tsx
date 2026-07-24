import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import AiCodeClient from '@/components/ai-code-generator/AiCodeClient';

export const metadata: Metadata = {
  title: 'Intelligent AI Code Generator & Programming Assistant',
  description: 'Generate production-ready code in seconds with our AI Code Generator. Boost development speed and debug effortlessly with intelligent assistance.',
  alternates: {
    canonical: 'https://quicktool.space/tools/ai-code-generator'
  },
    keywords: ['Intelligent AI Code Generator & Programming Assistant', 'Free Intelligent AI Code Generator & Programming Assistant', 'AI Intelligent AI Code Generator & Programming Assistant', 'QuickTools', 'Online Intelligent AI Code Generator & Programming Assistant', 'AI Tool'],
    openGraph: {
            title: "Intelligent AI Code Generator & Programming Assistant",
            description: "Generate production-ready code in seconds with our AI Code Generator. Boost development speed and debug effortlessly with intelligent assistance.",
            url: 'https://quicktool.space/tools/ai-code-generator',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: 'https://quicktool.space/icon.svg', width: 1200, height: 630, alt: 'Intelligent AI Code Generator & Programming Assistant' }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Intelligent AI Code Generator & Programming Assistant",
            description: "Generate production-ready code in seconds with our AI Code Generator. Boost development speed and debug effortlessly with intelligent assistance.",
            images: ['https://quicktool.space/icon.svg']
          }
};

export default function AiCodeGeneratorPage() {
  return (
    <div className="flex-grow bg-[#F8FAFC] flex flex-col font-sans selection:bg-[#6D5EF8] selection:text-white relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Intelligent AI Code Generator & Programming Assistant",
      "operatingSystem": "Web",
      "applicationCategory": "WebApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "Generate production-ready code in seconds with our AI Code Generator. Boost development speed and debug effortlessly with intelligent assistance.",
      "url": "https://quicktool.space/tools/ai-code-generator"
    }) }} />
      
      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-[120px] -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-[120px] -translate-x-1/4 translate-y-1/4"></div>
      </div>
      
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-[15px] flex-grow flex flex-col relative z-10">
        
        {/* Top Navigation Row */}
        <div className="flex items-center mb-[25px]">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-sm font-medium text-[#6B7280]">
            <Link href="/" className="hover:text-[#111827] transition-colors flex items-center gap-1.5">
              <Home className="w-4 h-4" /> Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/tools" className="hover:text-[#111827] transition-colors">
              All Tools
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-[#6D5EF8] font-bold">AI Code Generator</span>
          </nav>
          
        </div>

        {/* Client Component */}
        <AiCodeClient />

      </div>
    </div>
  );
}
