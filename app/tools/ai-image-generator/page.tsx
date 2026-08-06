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
    keywords: ["AI Image Generator","Image Generator AI","Free AI Image Generator","Best AI Image Generator","Online Image Generator","AI Image Generator Tool","Image Creator","AI Image Creator","QuickTools AI"],
    openGraph: {
            title: "Powerful AI Image Generator - Create Stunning AI Art",
            description: "Create stunning, high-resolution images from text descriptions. Unleash your creativity with our powerful AI Image Generator and models.",
            url: 'https://quicktool.space/tools/ai-image-generator',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("QuickTools AI Tool")}&type=tool`, width: 1200, height: 630, alt: `QuickTools AI Tool - QuickTools.ai` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Powerful AI Image Generator - Create Stunning AI Art",
            description: "Create stunning, high-resolution images from text descriptions. Unleash your creativity with our powerful AI Image Generator and models.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("QuickTools AI Tool")}&type=tool`]
          }
};

export default function AIImageGeneratorPage() {
  return (
    <div className="flex-grow bg-[#F8FAFC] flex flex-col font-sans selection:bg-[#6D5EF8] selection:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
      {
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
    , "featureList": "AI-powered, fast generation, free to use, no signup required for basic use"},
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://quicktool.space" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://quicktool.space/tools" },
          { "@type": "ListItem", "position": 3, "name": "Design", "item": "https://quicktool.space/tools?category=design" },
          { "@type": "ListItem", "position": 4, "name": "QuickTools AI Tool", "item": "https://quicktool.space/tools/ai-image-generator" }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "What is QuickTools AI Tool?", "acceptedAnswer": { "@type": "Answer", "text": "The QuickTools AI Tool is an advanced AI-powered tool by QuickTools designed to help you create stunning, high-resolution images from text descriptions. unleash your creativity with our powerful ai image generator and models." } },
          { "@type": "Question", "name": "What image formats are supported by QuickTools AI Tool?", "acceptedAnswer": { "@type": "Answer", "text": "The tool supports major high-resolution image formats like PNG, JPG, and JPEG for optimal quality processing and downloading." } },
          { "@type": "Question", "name": "Can I use the generated images commercially?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, all generated images and designs come with full commercial usage rights, allowing you to use them in ads, websites, and print." } },
          { "@type": "Question", "name": "Is it fast to generate results?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. It usually takes just 2-3 seconds to generate the desired output, making it one of the fastest tools available." } },
          { "@type": "Question", "name": "Do I need to download any software?", "acceptedAnswer": { "@type": "Answer", "text": "No, the QuickTools AI Tool is entirely web-based and runs in your browser. You can access it from any device with an internet connection." } },
          { "@type": "Question", "name": "Is the QuickTools AI Tool free to use?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, you can use the QuickTools AI Tool and many other tools on QuickTools.ai for free without needing a credit card." } }
        ]
      }
    ]) }} />
      
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
      
        {/* Visible FAQ Section for SEO and Users */}
        <div id="faq" className="mt-16 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">What is QuickTools AI Tool?</h3>
              <p className="text-slate-600 mt-2">The QuickTools AI Tool is an advanced AI-powered tool by QuickTools designed to help you create stunning, high-resolution images from text descriptions. unleash your creativity with our powerful ai image generator and models.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">What image formats are supported by QuickTools AI Tool?</h3>
              <p className="text-slate-600 mt-2">The tool supports major high-resolution image formats like PNG, JPG, and JPEG for optimal quality processing and downloading.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Can I use the generated images commercially?</h3>
              <p className="text-slate-600 mt-2">Yes, all generated images and designs come with full commercial usage rights, allowing you to use them in ads, websites, and print.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Is it fast to generate results?</h3>
              <p className="text-slate-600 mt-2">Absolutely. It usually takes just 2-3 seconds to generate the desired output, making it one of the fastest tools available.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Do I need to download any software?</h3>
              <p className="text-slate-600 mt-2">No, the QuickTools AI Tool is entirely web-based and runs in your browser. You can access it from any device with an internet connection.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Is the QuickTools AI Tool free to use?</h3>
              <p className="text-slate-600 mt-2">Yes, you can use the QuickTools AI Tool and many other tools on QuickTools.ai for free without needing a credit card.</p>
            </div>
          </div>
        </div>

</div>
    </div>
  );
}
