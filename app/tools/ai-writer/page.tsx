import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Home, History, LayoutGrid } from 'lucide-react';
import AiWriterClient from '@/components/ai-writer/AiWriterClient';

export const metadata: Metadata = {
  title: "AI Writer - Create Blogs, Emails & Marketing Copy",
  description: "Generate blogs, articles, emails, social media posts, marketing copy, and SEO content using the QuickTool AI Writer.",
  alternates: {
    canonical: 'https://quicktool.space/tools/ai-writer'
  },
    keywords: ["AI Writer","Writer AI","Free AI Writer","Best AI Writer","Online Writer","AI Writer Tool","Writing Tool","AI Writing Tool","Content Writer AI","Blog Writer","AI Copywriting","QuickTool AI"],
    openGraph: {
            title: { absolute: "AI Writer - Create Blogs, Emails & Marketing Copy" },
            description: "Generate structured content using our AI Writer. Effortlessly draft engaging blogs, professional emails, and creative social media copy.",
            url: 'https://quicktool.space/tools/ai-writer',
            siteName: 'QuickTool',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("AI Writer  Create Blogs, Emails & Marketing Copy")}&type=tool`, width: 1200, height: 630, alt: `AI Writer  Create Blogs, Emails & Marketing Copy - QuickTool` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: { absolute: "AI Writer - Create Blogs, Emails & Marketing Copy" },
            description: "Generate structured content using our AI Writer. Effortlessly draft engaging blogs, professional emails, and creative social media copy.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("AI Writer  Create Blogs, Emails & Marketing Copy")}&type=tool`]
          }
};

export default function AiWriterPage() {
  return (
    <div className="flex-grow bg-[#F8FAFC] flex flex-col font-sans selection:bg-[#6D5EF8] selection:text-white relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
      {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Advanced AI Writer & Content Generator for Creators",
      "description": "Generate structured content using our AI Writer. Effortlessly draft engaging blogs, professional emails, and creative social media copy.",
      "url": "https://quicktool.space/tools/ai-writer"
    },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://quicktool.space" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://quicktool.space/tools" },
          { "@type": "ListItem", "position": 3, "name": "Writing", "item": "https://quicktool.space/tools/category/writing" },
          { "@type": "ListItem", "position": 4, "name": "AI Writer  Create Blogs, Emails & Marketing Copy", "item": "https://quicktool.space/tools/ai-writer" }
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
            <span className="text-[#6D5EF8] font-bold">AI Writer</span>
          </nav>
          
        </div>

        {/* Client Component */}
        <AiWriterClient />

      
        {/* Visible FAQ Section for SEO and Users */}
        <div id="faq" className="mt-16 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">What is AI Writer  Create Blogs, Emails & Marketing Copy?</h3>
              <p className="text-slate-600 mt-2">The AI Writer  Create Blogs, Emails & Marketing Copy is an AI-assisted tool by QuickTool designed to help you generate blogs, articles, emails, social media posts, marketing copy, and seo content using the QuickTool ai writer.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Can the AI Writer  Create Blogs, Emails & Marketing Copy generate content in different tones?</h3>
              <p className="text-slate-600 mt-2">Yes, our AI algorithms are trained to adapt to various professional, casual, persuasive, and creative tones based on your input.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Is the content plagiarism-free?</h3>
              <p className="text-slate-600 mt-2">Yes, the AI Writer generates original text based on its training data and your prompts. While highly unique, we always recommend reviewing and lightly editing the output before publishing.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Is it fast to generate results?</h3>
              <p className="text-slate-600 mt-2">Generation time depends on the request and current service availability. Review the result before using it.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Do I need to download any software?</h3>
              <p className="text-slate-600 mt-2">No, the AI Writer  Create Blogs, Emails & Marketing Copy is entirely web-based and runs in your browser. You can access it from any device with an internet connection.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Is the AI Writer  Create Blogs, Emails & Marketing Copy free to use?</h3>
              <p className="text-slate-600 mt-2">Current availability and usage limits are shown in the tool interface and pricing page.</p>
            </div>
          </div>
        </div>

</div>
    </div>
  );
}
