import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import SubscriptionOptimizerClient from '@/components/ai-subscription-optimizer/SubscriptionOptimizerClient';

export const metadata: Metadata = {
  title: 'Subscription Optimizer - QuickTools.ai',
  description: 'Analyze your active subscriptions to find feature overlaps and save money instantly.',
  alternates: {
    canonical: 'https://quicktool.space/tools/ai-subscription-optimizer'
  }
};

export default function Page() {
  return (
    <div className="flex-grow bg-[#F8FAFC] flex flex-col font-sans relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Subscription Optimizer",
        "operatingSystem": "Web",
        "applicationCategory": "WebApplication",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "description": "Analyze your active subscriptions to find feature overlaps and save money instantly.",
        "url": "https://quicktool.space/tools/ai-subscription-optimizer"
      , "featureList": "AI-powered, fast generation, free to use, no signup required for basic use"},
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://quicktool.space" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://quicktool.space/tools" },
          { "@type": "ListItem", "position": 3, "name": "Writing", "item": "https://quicktool.space/tools?category=writing" },
          { "@type": "ListItem", "position": 4, "name": "QuickTools AI Tool", "item": "https://quicktool.space/tools/ai-subscription-optimizer" }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "What is QuickTools AI Tool?", "acceptedAnswer": { "@type": "Answer", "text": "The QuickTools AI Tool is an advanced AI-powered tool by QuickTools designed to help you analyze your active subscriptions to find feature overlaps and save money instantly." } },
          { "@type": "Question", "name": "Can the QuickTools AI Tool generate content in different tones?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, our AI algorithms are trained to adapt to various professional, casual, persuasive, and creative tones based on your input." } },
          { "@type": "Question", "name": "Is the content plagiarism-free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, the QuickTools AI Tool generates 100% unique, original text every time you use it, ensuring it passes plagiarism checkers." } },
          { "@type": "Question", "name": "Is it fast to generate results?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. It usually takes just 2-3 seconds to generate the desired output, making it one of the fastest tools available." } },
          { "@type": "Question", "name": "Do I need to download any software?", "acceptedAnswer": { "@type": "Answer", "text": "No, the QuickTools AI Tool is entirely web-based and runs in your browser. You can access it from any device with an internet connection." } },
          { "@type": "Question", "name": "Is the QuickTools AI Tool free to use?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, you can use the QuickTools AI Tool and many other tools on QuickTools.ai for free without needing a credit card." } }
        ]
      }
    ]) }} />
      
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
            <span className="text-[#10B981] font-bold">Subscription Optimizer</span>
          </nav>
        </div>
        <div className="flex-1 w-full max-w-[1600px] mx-auto py-2 h-[calc(100vh-80px)]">
          <SubscriptionOptimizerClient />
        </div>
      
        {/* Visible FAQ Section for SEO and Users */}
        <div id="faq" className="mt-16 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">What is QuickTools AI Tool?</h3>
              <p className="text-slate-600 mt-2">The QuickTools AI Tool is an advanced AI-powered tool by QuickTools designed to help you analyze your active subscriptions to find feature overlaps and save money instantly.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Can the QuickTools AI Tool generate content in different tones?</h3>
              <p className="text-slate-600 mt-2">Yes, our AI algorithms are trained to adapt to various professional, casual, persuasive, and creative tones based on your input.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Is the content plagiarism-free?</h3>
              <p className="text-slate-600 mt-2">Yes, the QuickTools AI Tool generates 100% unique, original text every time you use it, ensuring it passes plagiarism checkers.</p>
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
