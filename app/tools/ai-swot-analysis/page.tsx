import { Metadata } from 'next';
import AiSwotAnalysisClient from '@/components/ai-swot-analysis/AiSwotAnalysisClient';
import { Sparkles, ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import PriorityToolSeoSection from '@/components/tools/PriorityToolSeoSection';

export const metadata: Metadata = {
  title: "AI SWOT Analysis",
  description: "Separate internal strengths and weaknesses from external opportunities and threats, then turn evidence into strategic actions.",
    keywords: ["AI SWOT Analysis","SWOT Analysis AI","SWOT Analysis Generator","Online SWOT Analysis","AI SWOT Analysis Tool","QuickTools AI"],
    alternates: { canonical: 'https://quicktool.space/tools/ai-swot-analysis' },
    openGraph: {
            title: "AI SWOT Analysis",
            description: "Separate internal strengths and weaknesses from external opportunities and threats, then turn evidence into strategic actions.",
            url: 'https://quicktool.space/tools/ai-swot-analysis',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("AI SWOT Analysis Generator")}&type=tool`, width: 1200, height: 630, alt: `AI SWOT Analysis Generator - QuickTools.ai` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "AI SWOT Analysis",
            description: "Separate internal strengths and weaknesses from external opportunities and threats, then turn evidence into strategic actions.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("AI SWOT Analysis Generator")}&type=tool`]
          }
};

export default function Page() {
  return (
    <>
    <div className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-6 h-[calc(100vh-80px)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([
      {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "AI SWOT Analysis Generator",
            "description": "Generate a detailed SWOT analysis for your business."},
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://quicktool.space" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://quicktool.space/tools" },
          { "@type": "ListItem", "position": 3, "name": "Productivity", "item": "https://quicktool.space/tools/category/business" },
          { "@type": "ListItem", "position": 4, "name": "AI SWOT Analysis Generator", "item": "https://quicktool.space/tools/ai-swot-analysis" }
        ]
      }
    ]) }}
      />
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-[#6B7280] mb-6 animate-in fade-in slide-in-from-left-4 duration-500">
        <Link href="/" className="hover:text-[#111827] transition-colors flex items-center gap-1.5"><Home className="w-4 h-4" /> Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/tools" className="hover:text-[#111827] transition-colors">All Tools</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[#111827] font-semibold flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-[#F59E0B]" /> SWOT Analysis Generator</span>
      </nav>

      <AiSwotAnalysisClient />
    </div>
    <PriorityToolSeoSection slug="ai-swot-analysis" />
    </>
  );
}
