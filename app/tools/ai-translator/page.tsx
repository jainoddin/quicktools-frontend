import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import AiTranslatorClient from '@/components/ai-translator/AiTranslatorClient';

export const metadata: Metadata = {
  title: "AI Language Translator",
  description: "Translate text into 50+ languages with AI-assisted translation using our AI Translator.",
  alternates: {
    canonical: 'https://quicktool.space/tools/ai-translator'
  },
    keywords: ["AI Translator","Translator AI","Free AI Translator","Best AI Translator","Online Translator","AI Translator Tool","QuickTools AI"],
    openGraph: {
            title: "Free AI Language Translator - Translate 50+ Languages",
            description: "Translate text into 50+ languages with AI-assisted translation using our AI Translator.",
            url: 'https://quicktool.space/tools/ai-translator',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("AI Language Translator")}&type=tool`, width: 1200, height: 630, alt: `AI Language Translator - QuickTools.ai` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Free AI Language Translator - Translate 50+ Languages",
            description: "Translate text into 50+ languages with AI-assisted translation using our AI Translator.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("AI Language Translator")}&type=tool`]
          }
};

export default function AiTranslatorPage() {
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
            <span className="text-[#6D5EF8] font-bold">AI Language Translator</span>
          </nav>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([
      {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "AI Language Translator",
              "description": "Translate text into 50+ languages with AI-assisted translation using our AI Translator."
            },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://quicktool.space" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://quicktool.space/tools" },
          { "@type": "ListItem", "position": 3, "name": "Productivity", "item": "https://quicktool.space/tools/category/career-hr" },
          { "@type": "ListItem", "position": 4, "name": "AI Language Translator", "item": "https://quicktool.space/tools/ai-translator" }
        ]
      }
    ]) }}
        />
        <AiTranslatorClient />
      
        {/* Visible FAQ Section for SEO and Users */}
        <div id="faq" className="mt-16 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">What is AI Language Translator?</h3>
              <p className="text-slate-600 mt-2">The AI Language Translator is an AI-assisted tool by QuickTools designed to help you translate text into 50+ languages with AI-assisted translation using our ai translator.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">How does the AI Language Translator work?</h3>
              <p className="text-slate-600 mt-2">It uses AI-assisted processing to analyze your input and automatically generate structured results from the details you provide. Just provide a prompt, and the AI handles the rest.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Can I use AI Language Translator for professional purposes?</h3>
              <p className="text-slate-600 mt-2">Yes, the output generated by our AI is designed to be highly professional and can be directly used for business applications, marketing, and client work.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Is it fast to generate results?</h3>
              <p className="text-slate-600 mt-2">Generation time depends on the request and current service availability. Review the result before using it.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Do I need to download any software?</h3>
              <p className="text-slate-600 mt-2">No, the AI Language Translator is entirely web-based and runs in your browser. You can access it from any device with an internet connection.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Is the AI Language Translator free to use?</h3>
              <p className="text-slate-600 mt-2">Current availability and usage limits are shown in the tool interface and pricing page.</p>
            </div>
          </div>
        </div>

</div>
    </div>
  );
}
