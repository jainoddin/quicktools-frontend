import { Metadata } from 'next';
import AiValuePropositionClient from '@/components/ai-value-proposition/AiValuePropositionClient';
import { Sparkles, ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "AI Value Proposition Generator",
  description: "Create a structured value proposition draft with AI Value Proposition Generator. Use guided inputs, then review, refine, and adapt the result for your workflow.",
    keywords: ["AI Value Proposition","Value Proposition AI","Free AI Value Proposition","Best AI Value Proposition","Online Value Proposition","AI Value Proposition Tool","QuickTool AI"],
    alternates: { canonical: 'https://quicktool.space/tools/ai-value-proposition' },
    openGraph: {
            title: "AI Value Proposition Generator",
            description: "Create a structured value proposition draft with AI Value Proposition Generator. Use guided inputs, then review, refine, and adapt the result for your workflow.",
            url: 'https://quicktool.space/tools/ai-value-proposition',
            siteName: 'QuickTool',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("AI Value Proposition Generator")}&type=tool`, width: 1200, height: 630, alt: `AI Value Proposition Generator - QuickTool` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "AI Value Proposition Generator",
            description: "Create a structured value proposition draft with AI Value Proposition Generator. Use guided inputs, then review, refine, and adapt the result for your workflow.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("AI Value Proposition Generator")}&type=tool`]
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
            "name": "AI Value Proposition Generator",
            "description": "Generate unique value propositions for your products."},
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://quicktool.space" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://quicktool.space/tools" },
          { "@type": "ListItem", "position": 3, "name": "Productivity", "item": "https://quicktool.space/tools/category/business" },
          { "@type": "ListItem", "position": 4, "name": "AI Value Proposition Generator", "item": "https://quicktool.space/tools/ai-value-proposition" }
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
        <span className="text-[#111827] font-semibold flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-[#F59E0B]" /> Value Proposition Generator</span>
      </nav>

      <AiValuePropositionClient />
    </div>
  );
}
