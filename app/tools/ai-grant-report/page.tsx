import { Metadata } from 'next';
import AiGrantReportClient from '@/components/ai-grant-report/AiGrantReportClient';
import { Sparkles, ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "AI Grant Progress Report",
  description: "Create a structured grant progress report draft with AI Grant Progress Report. Use guided inputs, then review, refine, and adapt the result for your workflow.",
    keywords: ["AI Grant Report","Grant Report AI","Free AI Grant Report","Best AI Grant Report","Online Grant Report","AI Grant Report Tool","QuickTool AI"],
    alternates: { canonical: 'https://quicktool.space/tools/ai-grant-report' },
    openGraph: {
            title: "AI Grant Progress Report",
            description: "Create a structured grant progress report draft with AI Grant Progress Report. Use guided inputs, then review, refine, and adapt the result for your workflow.",
            url: 'https://quicktool.space/tools/ai-grant-report',
            siteName: 'QuickTool',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("AI Grant Progress Report")}&type=tool`, width: 1200, height: 630, alt: `AI Grant Progress Report - QuickTool` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "AI Grant Progress Report",
            description: "Create a structured grant progress report draft with AI Grant Progress Report. Use guided inputs, then review, refine, and adapt the result for your workflow.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("AI Grant Progress Report")}&type=tool`]
          }
};

export default function Page() {
  return (
    <div className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-6 h-[calc(100vh-80px)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([
      {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "AI Grant Progress Report",
            "description": "Write professional progress reports for grants."},
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://quicktool.space" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://quicktool.space/tools" },
          { "@type": "ListItem", "position": 3, "name": "Productivity", "item": "https://quicktool.space/tools/category/business" },
          { "@type": "ListItem", "position": 4, "name": "AI Grant Progress Report", "item": "https://quicktool.space/tools/ai-grant-report" }
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
        <span className="text-[#111827] font-semibold flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-[#F59E0B]" /> Grant Progress Report</span>
      </nav>

      <AiGrantReportClient />
    </div>
  );
}
