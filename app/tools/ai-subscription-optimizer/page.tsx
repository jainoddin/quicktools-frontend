import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import SubscriptionOptimizerClient from '@/components/ai-subscription-optimizer/SubscriptionOptimizerClient';

export const metadata: Metadata = {
  title: "Subscription Optimizer",
  description: "Analyze your active subscriptions to find feature overlaps and save money with AI assistance.",
  alternates: {
    canonical: 'https://quicktool.space/tools/ai-subscription-optimizer'
  },
  openGraph: { title: 'Subscription Optimizer - QuickTools.ai', description: 'Compare subscriptions, overlaps, and cancellation decisions.', url: 'https://quicktool.space/tools/ai-subscription-optimizer', type: 'website', images: [{ url: 'https://quicktool.space/api/og?title=Subscription%20Optimizer&type=tool', width: 1200, height: 630, alt: 'Subscription Optimizer' }] },
  twitter: { card: 'summary_large_image', title: 'Subscription Optimizer - QuickTools.ai', description: 'Compare subscriptions, overlaps, and cancellation decisions.', images: ['https://quicktool.space/api/og?title=Subscription%20Optimizer&type=tool'] }
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
        "description": "Analyze your active subscriptions to find feature overlaps and save money with AI assistance.",
        "url": "https://quicktool.space/tools/ai-subscription-optimizer"
      , "featureList": "AI-assisted workflow, editable results, and browser-based access"},
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://quicktool.space" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://quicktool.space/tools" },
          { "@type": "ListItem", "position": 3, "name": "Writing", "item": "https://quicktool.space/tools/category/career-hr" },
          { "@type": "ListItem", "position": 4, "name": "Subscription Optimizer", "item": "https://quicktool.space/tools/ai-subscription-optimizer" }
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
              <h3 className="text-lg font-semibold text-slate-800">What is Subscription Optimizer?</h3>
              <p className="text-slate-600 mt-2">The Subscription Optimizer is an AI-assisted tool by QuickTools designed to help you analyze your active subscriptions to find feature overlaps and save money with AI assistance.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Can the Subscription Optimizer generate content in different tones?</h3>
              <p className="text-slate-600 mt-2">Yes, our AI algorithms are trained to adapt to various professional, casual, persuasive, and creative tones based on your input.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Is the content plagiarism-free?</h3>
              <p className="text-slate-600 mt-2">Yes, the Subscription Optimizer generates 100% unique, original text every time you use it, ensuring it passes plagiarism checkers.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Is it fast to generate results?</h3>
              <p className="text-slate-600 mt-2">Generation time depends on the request and current service availability. Review the result before using it.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Do I need to download any software?</h3>
              <p className="text-slate-600 mt-2">No, the Subscription Optimizer is entirely web-based and runs in your browser. You can access it from any device with an internet connection.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Is the Subscription Optimizer free to use?</h3>
              <p className="text-slate-600 mt-2">Current availability and usage limits are shown in the tool interface and pricing page.</p>
            </div>
          </div>
        </div>

</div>
    </div>
  );
}
