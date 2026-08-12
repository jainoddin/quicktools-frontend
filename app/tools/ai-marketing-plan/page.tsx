import { Metadata } from 'next';
import AiMarketingPlanClient from '@/components/ai-marketing-plan/AiMarketingPlanClient';
import { Sparkles, ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "AI Marketing Plan Generator",
  description: "Create a structured marketing plan draft with AI Marketing Plan Generator. Use guided inputs, then review, refine, and adapt the result for your workflow.",
    keywords: ["AI Marketing Plan","Marketing Plan AI","Free AI Marketing Plan","Best AI Marketing Plan","Online Marketing Plan","AI Marketing Plan Tool","QuickTool AI"],
    alternates: { canonical: 'https://quicktool.space/tools/ai-marketing-plan' },
    openGraph: {
            title: "AI Marketing Plan Generator",
            description: "Create a structured marketing plan draft with AI Marketing Plan Generator. Use guided inputs, then review, refine, and adapt the result for your workflow.",
            url: 'https://quicktool.space/tools/ai-marketing-plan',
            siteName: 'QuickTool',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("AI Marketing Plan Generator")}&type=tool`, width: 1200, height: 630, alt: `AI Marketing Plan Generator - QuickTool` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "AI Marketing Plan Generator",
            description: "Create a structured marketing plan draft with AI Marketing Plan Generator. Use guided inputs, then review, refine, and adapt the result for your workflow.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("AI Marketing Plan Generator")}&type=tool`]
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
            "name": "AI Marketing Plan Generator",
            "description": "Generate a comprehensive marketing plan and strategy."},
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://quicktool.space" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://quicktool.space/tools" },
          { "@type": "ListItem", "position": 3, "name": "Marketing", "item": "https://quicktool.space/tools/category/marketing" },
          { "@type": "ListItem", "position": 4, "name": "AI Marketing Plan Generator", "item": "https://quicktool.space/tools/ai-marketing-plan" }
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
        <span className="text-[#111827] font-semibold flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-[#F59E0B]" /> Marketing Plan Generator</span>
      </nav>

      <AiMarketingPlanClient />
    </div>
  );
}
