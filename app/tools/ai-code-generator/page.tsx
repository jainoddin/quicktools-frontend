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
    keywords: ["AI Code Generator","Code Generator AI","Free AI Code Generator","Best AI Code Generator","Online Code Generator","AI Code Generator Tool","Code Creator","AI Code Creator","QuickTools AI"],
    openGraph: {
            title: "Intelligent AI Code Generator & Programming Assistant",
            description: "Generate production-ready code in seconds with our AI Code Generator. Boost development speed and debug effortlessly with intelligent assistance.",
            url: 'https://quicktool.space/tools/ai-code-generator',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("QuickTools AI Tool")}&type=tool`, width: 1200, height: 630, alt: `QuickTools AI Tool - QuickTools.ai` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Intelligent AI Code Generator & Programming Assistant",
            description: "Generate production-ready code in seconds with our AI Code Generator. Boost development speed and debug effortlessly with intelligent assistance.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("QuickTools AI Tool")}&type=tool`]
          }
};

export default function AiCodeGeneratorPage() {
  return (
    <div className="flex-grow bg-[#F8FAFC] flex flex-col font-sans selection:bg-[#6D5EF8] selection:text-white relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
      {
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
    , "featureList": "AI-powered, fast generation, free to use, no signup required for basic use"},
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://quicktool.space" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://quicktool.space/tools" },
          { "@type": "ListItem", "position": 3, "name": "Development", "item": "https://quicktool.space/tools?category=development" },
          { "@type": "ListItem", "position": 4, "name": "QuickTools AI Tool", "item": "https://quicktool.space/tools/ai-code-generator" }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "What is QuickTools AI Tool?", "acceptedAnswer": { "@type": "Answer", "text": "The QuickTools AI Tool is an advanced AI-powered tool by QuickTools designed to help you generate production-ready code in seconds with our ai code generator. boost development speed and debug effortlessly with intelligent assistance." } },
          { "@type": "Question", "name": "Is the generated code from QuickTools AI Tool secure?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, the AI follows best practices for secure coding, but we always recommend reviewing any AI-generated code before deploying it to a production environment." } },
          { "@type": "Question", "name": "Which programming languages are supported?", "acceptedAnswer": { "@type": "Answer", "text": "We support a wide range of modern languages including JavaScript, Python, TypeScript, HTML, CSS, SQL, and more." } },
          { "@type": "Question", "name": "Is it fast to generate results?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. It usually takes just 2-3 seconds to generate the desired output, making it one of the fastest tools available." } },
          { "@type": "Question", "name": "Do I need to download any software?", "acceptedAnswer": { "@type": "Answer", "text": "No, the QuickTools AI Tool is entirely web-based and runs in your browser. You can access it from any device with an internet connection." } },
          { "@type": "Question", "name": "Is the QuickTools AI Tool free to use?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, you can use the QuickTools AI Tool and many other tools on QuickTools.ai for free without needing a credit card." } }
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
            <span className="text-[#6D5EF8] font-bold">AI Code Generator</span>
          </nav>
          
        </div>

        {/* Client Component */}
        <AiCodeClient />

      
        {/* Visible FAQ Section for SEO and Users */}
        <div id="faq" className="mt-16 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">What is QuickTools AI Tool?</h3>
              <p className="text-slate-600 mt-2">The QuickTools AI Tool is an advanced AI-powered tool by QuickTools designed to help you generate production-ready code in seconds with our ai code generator. boost development speed and debug effortlessly with intelligent assistance.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Is the generated code from QuickTools AI Tool secure?</h3>
              <p className="text-slate-600 mt-2">Yes, the AI follows best practices for secure coding, but we always recommend reviewing any AI-generated code before deploying it to a production environment.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Which programming languages are supported?</h3>
              <p className="text-slate-600 mt-2">We support a wide range of modern languages including JavaScript, Python, TypeScript, HTML, CSS, SQL, and more.</p>
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
