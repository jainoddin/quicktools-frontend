import { Metadata } from 'next';
import AiCompetitorAnalysisClient from '@/components/ai-competitor-analysis/AiCompetitorAnalysisClient';
import { Sparkles, ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import PriorityToolSeoSection from '@/components/tools/PriorityToolSeoSection';

export const metadata: Metadata = {
  title: "AI Competitor Analysis",
  description: "Build a structured competitor matrix for positioning, customers, offers, pricing, channels, evidence gaps, risks, and strategic actions.",
    keywords: ["AI Competitor Analysis","Competitor Analysis AI","Competitor Analysis Generator","Online Competitor Analysis","AI Competitor Analysis Tool","QuickTool AI"],
    alternates: { canonical: 'https://quicktool.space/tools/ai-competitor-analysis' },
    openGraph: {
            title: "AI Competitor Analysis",
            description: "Build a structured competitor matrix for positioning, customers, offers, pricing, channels, evidence gaps, risks, and strategic actions.",
            url: 'https://quicktool.space/tools/ai-competitor-analysis',
            siteName: 'QuickTool',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("AI Competitor Analysis")}&type=tool`, width: 1200, height: 630, alt: `AI Competitor Analysis - QuickTool` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "AI Competitor Analysis",
            description: "Build a structured competitor matrix for positioning, customers, offers, pricing, channels, evidence gaps, risks, and strategic actions.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("AI Competitor Analysis")}&type=tool`]
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
            "name": "AI Competitor Analysis",
            "description": "Generate detailed competitor analysis reports."},
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://quicktool.space" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://quicktool.space/tools" },
          { "@type": "ListItem", "position": 3, "name": "Productivity", "item": "https://quicktool.space/tools/category/business" },
          { "@type": "ListItem", "position": 4, "name": "AI Competitor Analysis", "item": "https://quicktool.space/tools/ai-competitor-analysis" }
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
        <span className="text-[#111827] font-semibold flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-[#F59E0B]" /> Competitor Analysis</span>
      </nav>

      <AiCompetitorAnalysisClient />
    </div>
    <PriorityToolSeoSection slug="ai-competitor-analysis" />
    </>
  );
}
