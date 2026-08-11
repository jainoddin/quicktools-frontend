import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import AiSummarizerClient from '@/components/ai-summarizer/AiSummarizerClient';

export const metadata: Metadata = {
  title: 'Free AI Text Summarizer - Summarize Articles Instantly',
  description: 'Summarize long articles, PDFs, or any text into clear bullet points instantly with our free AI Summarizer.',
  alternates: {
    canonical: 'https://quicktool.space/tools/ai-summarizer'
  },
    keywords: ["AI Summarizer","Summarizer AI","Free AI Summarizer","Best AI Summarizer","Online Summarizer","AI Summarizer Tool","QuickTools AI"],
    openGraph: {
            title: "Free AI Text Summarizer - Summarize Articles Instantly",
            description: "Summarize long articles, PDFs, or any text into clear bullet points instantly with our free AI Summarizer.",
            url: 'https://quicktool.space/tools/ai-summarizer',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("AI Text Summarizer")}&type=tool`, width: 1200, height: 630, alt: `AI Text Summarizer - QuickTools.ai` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Free AI Text Summarizer - Summarize Articles Instantly",
            description: "Summarize long articles, PDFs, or any text into clear bullet points instantly with our free AI Summarizer.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("AI Text Summarizer")}&type=tool`]
          }
};

export default function AiSummarizerPage() {
  return (
    <div className="flex-grow bg-[#F8FAFC] flex flex-col font-sans selection:bg-[#6D5EF8] selection:text-white relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-[120px] -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-[120px] -translate-x-1/4 translate-y-1/4"></div>
      </div>
      
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
            <span className="text-[#6D5EF8] font-bold">AI Text Summarizer</span>
          </nav>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([
      {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "AI Text Summarizer",
              "description": "Summarize long articles, PDFs, or any text into clear bullet points instantly with our free AI Summarizer.",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "All",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            , "featureList": "AI-assisted workflow, editable results, and browser-based access"},
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://quicktool.space" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://quicktool.space/tools" },
          { "@type": "ListItem", "position": 3, "name": "Productivity", "item": "https://quicktool.space/tools/category/career-hr" },
          { "@type": "ListItem", "position": 4, "name": "AI Text Summarizer", "item": "https://quicktool.space/tools/ai-summarizer" }
        ]
      }
    ]) }}
        />
        <AiSummarizerClient />
      
        {/* Visible FAQ Section for SEO and Users */}
        <div id="faq" className="mt-16 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">What is AI Text Summarizer?</h3>
              <p className="text-slate-600 mt-2">The AI Text Summarizer is an advanced AI-powered tool by QuickTools designed to help you summarize long articles, pdfs, or any text into clear bullet points instantly with our free ai summarizer.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">How does the AI Text Summarizer work?</h3>
              <p className="text-slate-600 mt-2">It uses cutting-edge artificial intelligence to analyze your input and automatically generate high-quality results in seconds. Just provide a prompt, and the AI handles the rest.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Can I use AI Text Summarizer for professional purposes?</h3>
              <p className="text-slate-600 mt-2">Yes, the output generated by our AI is designed to be highly professional and can be directly used for business applications, marketing, and client work.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Is it fast to generate results?</h3>
              <p className="text-slate-600 mt-2">Generation time depends on the request and current service availability. Review the result before using it.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Do I need to download any software?</h3>
              <p className="text-slate-600 mt-2">No, the AI Text Summarizer is entirely web-based and runs in your browser. You can access it from any device with an internet connection.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Is the AI Text Summarizer free to use?</h3>
              <p className="text-slate-600 mt-2">Yes, you can use the AI Text Summarizer and many other tools on QuickTools.ai for free without needing a credit card.</p>
            </div>
          </div>
        </div>

</div>
    </div>
  );
}
