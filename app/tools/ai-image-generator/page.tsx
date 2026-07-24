import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Home, ChevronRight, Wand2, Shuffle, Image as ImageIcon, 
  History, LayoutGrid, Crown, Info, Sparkles, ChevronDown, Star 
} from 'lucide-react';

import ImageGeneratorClient from '@/components/ai-image-generator/ImageGeneratorClient';

export const metadata: Metadata = {
  title: 'Powerful AI Image Generator - Create Stunning AI Art',
  description: 'Create stunning, high-resolution images from text descriptions. Unleash your creativity with our powerful AI Image Generator and models.',
  alternates: {
    canonical: 'https://quicktool.space/tools/ai-image-generator'
  },
    keywords: ['Powerful AI Image Generator - Create Stunning AI Art', 'Free Powerful AI Image Generator - Create Stunning AI Art', 'AI Powerful AI Image Generator - Create Stunning AI Art', 'QuickTools', 'Online Powerful AI Image Generator - Create Stunning AI Art', 'AI Tool'],
    openGraph: {
            title: "Powerful AI Image Generator - Create Stunning AI Art",
            description: "Create stunning, high-resolution images from text descriptions. Unleash your creativity with our powerful AI Image Generator and models.",
            url: 'https://quicktool.space/tools/ai-image-generator',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: 'https://quicktool.space/icon.svg', width: 1200, height: 630, alt: 'Powerful AI Image Generator - Create Stunning AI Art' }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Powerful AI Image Generator - Create Stunning AI Art",
            description: "Create stunning, high-resolution images from text descriptions. Unleash your creativity with our powerful AI Image Generator and models.",
            images: ['https://quicktool.space/icon.svg']
          }
};

export default function AIImageGeneratorPage() {
  return (
    <div className="flex-grow bg-[#F8FAFC] flex flex-col font-sans selection:bg-[#6D5EF8] selection:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Powerful AI Image Generator - Create Stunning AI Art",
      "operatingSystem": "Web",
      "applicationCategory": "WebApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "Create stunning, high-resolution images from text descriptions. Unleash your creativity with our powerful AI Image Generator and models.",
      "url": "https://quicktool.space/tools/ai-image-generator"
    }) }} />
      
      {/* Breadcrumb Navigation */}
      <div className="bg-transparent pt-[15px] pb-[25px]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center text-sm">
          <Link href="/" className="flex items-center text-[#6B7280] hover:text-[#111827] transition-colors">
            <Home className="w-4 h-4 mr-1.5" />
            Home
          </Link>
          <ChevronRight className="w-4 h-4 mx-2 text-[#D1D5DB]" />
          <Link href="/tools" className="text-[#6B7280] hover:text-[#111827] transition-colors">
            All Tools
          </Link>
          <ChevronRight className="w-4 h-4 mx-2 text-[#D1D5DB]" />
          <span className="font-semibold text-[#6D5EF8]">AI Image Generator</span>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-8 flex-grow w-full">
        <ImageGeneratorClient />
      </div>
    </div>
  );
}
