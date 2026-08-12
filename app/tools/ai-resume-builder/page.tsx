import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import AiResumeBuilderClient from '@/components/ai-resume-builder/AiResumeBuilderClient';

export const metadata: Metadata = {
  title: "Free AI Resume Builder - ATS Friendly Resumes",
  description: "Generate a professional, ATS-friendly resume from the details you provide using our AI Resume Builder.",
  alternates: {
    canonical: 'https://quicktool.space/tools/ai-resume-builder'
  },
    keywords: ["AI Resume Builder","Resume Builder AI","Free AI Resume Builder","Best AI Resume Builder","Online Resume Builder","AI Resume Builder Tool","CV Builder Builder","AI CV Builder Builder","QuickTool AI"],
    openGraph: {
            title: "Free AI Resume Builder - ATS Friendly Resumes",
            description: "Generate a professional, ATS-friendly resume from the details you provide using our AI Resume Builder.",
            url: 'https://quicktool.space/tools/ai-resume-builder',
            siteName: 'QuickTool',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("AI Resume Builder")}&type=tool`, width: 1200, height: 630, alt: `AI Resume Builder - QuickTool` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Free AI Resume Builder - ATS Friendly Resumes",
            description: "Generate a professional, ATS-friendly resume from the details you provide using our AI Resume Builder.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("AI Resume Builder")}&type=tool`]
          }
};

export default function AiResumeBuilderPage() {
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
            <span className="text-[#6D5EF8] font-bold">AI Resume Builder</span>
          </nav>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([
      {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "AI Resume Builder",
              "description": "Generate a professional, ATS-friendly resume from the details you provide using our AI Resume Builder."
            },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://quicktool.space" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://quicktool.space/tools" },
          { "@type": "ListItem", "position": 3, "name": "Productivity", "item": "https://quicktool.space/tools/category/career-hr" },
          { "@type": "ListItem", "position": 4, "name": "AI Resume Builder", "item": "https://quicktool.space/tools/ai-resume-builder" }
        ]
      }
    ]) }}
        />
        <AiResumeBuilderClient />
      
        {/* Visible FAQ Section for SEO and Users */}
        <div id="faq" className="mt-16 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">What is AI Resume Builder?</h3>
              <p className="text-slate-600 mt-2">The AI Resume Builder is an AI-assisted tool by QuickTool designed to help you generate a professional, ats-friendly resume from the details you provide using our ai resume builder.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">How does the AI Resume Builder work?</h3>
              <p className="text-slate-600 mt-2">It uses AI-assisted processing to analyze your input and automatically generate structured results from the details you provide. Just provide a prompt, and the AI handles the rest.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Can I use AI Resume Builder for professional purposes?</h3>
              <p className="text-slate-600 mt-2">Yes, the output generated by our AI is designed to be highly professional and can be directly used for business applications, marketing, and client work.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Is it fast to generate results?</h3>
              <p className="text-slate-600 mt-2">Generation time depends on the request and current service availability. Review the result before using it.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Do I need to download any software?</h3>
              <p className="text-slate-600 mt-2">No, the AI Resume Builder is entirely web-based and runs in your browser. You can access it from any device with an internet connection.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Is the AI Resume Builder free to use?</h3>
              <p className="text-slate-600 mt-2">Current availability and usage limits are shown in the tool interface and pricing page.</p>
            </div>
          </div>
        </div>

</div>
    </div>
  );
}
