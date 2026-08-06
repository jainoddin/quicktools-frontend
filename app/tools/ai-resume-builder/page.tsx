import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import AiResumeBuilderClient from '@/components/ai-resume-builder/AiResumeBuilderClient';

export const metadata: Metadata = {
  title: 'Free AI Resume Builder - ATS Friendly Resumes',
  description: 'Generate a professional, ATS-friendly resume from your details in seconds using our free AI Resume Builder.',
  alternates: {
    canonical: 'https://quicktool.space/tools/ai-resume-builder'
  },
    keywords: ["AI Resume Builder","Resume Builder AI","Free AI Resume Builder","Best AI Resume Builder","Online Resume Builder","AI Resume Builder Tool","CV Builder Builder","AI CV Builder Builder","QuickTools AI"],
    openGraph: {
            title: "Free AI Resume Builder - ATS Friendly Resumes",
            description: "Generate a professional, ATS-friendly resume from your details in seconds using our free AI Resume Builder.",
            url: 'https://quicktool.space/tools/ai-resume-builder',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("QuickTools AI Tool")}&type=tool`, width: 1200, height: 630, alt: `QuickTools AI Tool - QuickTools.ai` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Free AI Resume Builder - ATS Friendly Resumes",
            description: "Generate a professional, ATS-friendly resume from your details in seconds using our free AI Resume Builder.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("QuickTools AI Tool")}&type=tool`]
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
              "@type": "SoftwareApplication",
              "name": "AI Resume Builder",
              "description": "Generate a professional, ATS-friendly resume from your details in seconds using our free AI Resume Builder.",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "All",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            , "featureList": "AI-powered, fast generation, free to use, no signup required for basic use"},
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://quicktool.space" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://quicktool.space/tools" },
          { "@type": "ListItem", "position": 3, "name": "Productivity", "item": "https://quicktool.space/tools?category=productivity" },
          { "@type": "ListItem", "position": 4, "name": "QuickTools AI Tool", "item": "https://quicktool.space/tools/ai-resume-builder" }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "What is QuickTools AI Tool?", "acceptedAnswer": { "@type": "Answer", "text": "The QuickTools AI Tool is an advanced AI-powered tool by QuickTools designed to help you generate a professional, ats-friendly resume from your details in seconds using our free ai resume builder." } },
          { "@type": "Question", "name": "How does the QuickTools AI Tool work?", "acceptedAnswer": { "@type": "Answer", "text": "It uses cutting-edge artificial intelligence to analyze your input and automatically generate high-quality results in seconds. Just provide a prompt, and the AI handles the rest." } },
          { "@type": "Question", "name": "Can I use QuickTools AI Tool for professional purposes?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, the output generated by our AI is designed to be highly professional and can be directly used for business applications, marketing, and client work." } },
          { "@type": "Question", "name": "Is it fast to generate results?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. It usually takes just 2-3 seconds to generate the desired output, making it one of the fastest tools available." } },
          { "@type": "Question", "name": "Do I need to download any software?", "acceptedAnswer": { "@type": "Answer", "text": "No, the QuickTools AI Tool is entirely web-based and runs in your browser. You can access it from any device with an internet connection." } },
          { "@type": "Question", "name": "Is the QuickTools AI Tool free to use?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, you can use the QuickTools AI Tool and many other tools on QuickTools.ai for free without needing a credit card." } }
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
              <h3 className="text-lg font-semibold text-slate-800">What is QuickTools AI Tool?</h3>
              <p className="text-slate-600 mt-2">The QuickTools AI Tool is an advanced AI-powered tool by QuickTools designed to help you generate a professional, ats-friendly resume from your details in seconds using our free ai resume builder.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">How does the QuickTools AI Tool work?</h3>
              <p className="text-slate-600 mt-2">It uses cutting-edge artificial intelligence to analyze your input and automatically generate high-quality results in seconds. Just provide a prompt, and the AI handles the rest.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Can I use QuickTools AI Tool for professional purposes?</h3>
              <p className="text-slate-600 mt-2">Yes, the output generated by our AI is designed to be highly professional and can be directly used for business applications, marketing, and client work.</p>
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
