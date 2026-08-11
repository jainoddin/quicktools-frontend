import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import AiVideoClient from '@/components/ai-video-generator/AiVideoClient';

export const metadata: Metadata = {
  title: 'Professional AI Video Generator - Text to Video Creator',
  description: 'Turn your ideas into high-quality videos instantly. Use our AI Video Generator to convert text prompts into engaging visual stories effortlessly.',
  alternates: {
    canonical: 'https://quicktool.space/tools/ai-video-generator'
  },
    keywords: ["AI Video Generator","Video Generator AI","Free AI Video Generator","Best AI Video Generator","Online Video Generator","AI Video Generator Tool","Video Creator","AI Video Creator","QuickTools AI"],
    openGraph: {
            title: "Professional AI Video Generator - Text to Video Creator",
            description: "Turn your ideas into high-quality videos instantly. Use our AI Video Generator to convert text prompts into engaging visual stories effortlessly.",
            url: 'https://quicktool.space/tools/ai-video-generator',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("AI Video Generator")}&type=tool`, width: 1200, height: 630, alt: `AI Video Generator - QuickTools.ai` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Professional AI Video Generator - Text to Video Creator",
            description: "Turn your ideas into high-quality videos instantly. Use our AI Video Generator to convert text prompts into engaging visual stories effortlessly.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("AI Video Generator")}&type=tool`]
          }
};

export default function AiVideoGeneratorPage() {
  return (
    <div className="flex-grow bg-[#F8FAFC] flex flex-col font-sans selection:bg-[#6D5EF8] selection:text-white relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
      {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Professional AI Video Generator - Text to Video Creator",
      "operatingSystem": "Web",
      "applicationCategory": "WebApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "Turn your ideas into high-quality videos instantly. Use our AI Video Generator to convert text prompts into engaging visual stories effortlessly.",
      "url": "https://quicktool.space/tools/ai-video-generator"
    , "featureList": "AI-assisted workflow, editable results, and browser-based access"},
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://quicktool.space" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://quicktool.space/tools" },
          { "@type": "ListItem", "position": 3, "name": "Productivity", "item": "https://quicktool.space/tools/category/creative" },
          { "@type": "ListItem", "position": 4, "name": "AI Video Generator", "item": "https://quicktool.space/tools/ai-video-generator" }
        ]
      }
    ]) }} />
      
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
            <span className="text-[#6D5EF8] font-bold">AI Video Generator</span>
          </nav>
          
        </div>

        {/* Client Component */}
        <AiVideoClient />

      
        {/* Visible FAQ Section for SEO and Users */}
        <div id="faq" className="mt-16 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">What is AI Video Generator?</h3>
              <p className="text-slate-600 mt-2">The AI Video Generator is an advanced AI-powered tool by QuickTools designed to help you turn your ideas into high-quality videos instantly. use our ai video generator to convert text prompts into engaging visual stories effortlessly.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">How does the AI Video Generator work?</h3>
              <p className="text-slate-600 mt-2">It uses cutting-edge artificial intelligence to analyze your input and automatically generate high-quality results in seconds. Just provide a prompt, and the AI handles the rest.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Can I use AI Video Generator for professional purposes?</h3>
              <p className="text-slate-600 mt-2">Yes, the output generated by our AI is designed to be highly professional and can be directly used for business applications, marketing, and client work.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Is it fast to generate results?</h3>
              <p className="text-slate-600 mt-2">Generation time depends on the request and current service availability. Review the result before using it.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Do I need to download any software?</h3>
              <p className="text-slate-600 mt-2">No, the AI Video Generator is entirely web-based and runs in your browser. You can access it from any device with an internet connection.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Is the AI Video Generator free to use?</h3>
              <p className="text-slate-600 mt-2">Yes, you can use the AI Video Generator and many other tools on QuickTools.ai for free without needing a credit card.</p>
            </div>
          </div>
        </div>

</div>
    </div>
  );
}
