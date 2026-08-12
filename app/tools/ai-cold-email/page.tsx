import { Metadata } from 'next';
import AiColdEmailClient from '@/components/ai-cold-email/AiColdEmailClient';
import { Sparkles, ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "AI B2B Cold Email Sequence",
  description: "Create a structured b2b cold email sequence draft with AI B2B Cold Email Sequence. Use guided inputs, then review, refine, and adapt the result for your workflow.",
    keywords: ["AI Cold Email","Cold Email AI","Free AI Cold Email","Best AI Cold Email","Online Cold Email","AI Cold Email Tool","Cold Email Assistant","AI Cold Email Assistant","QuickTool AI"],
    alternates: { canonical: 'https://quicktool.space/tools/ai-cold-email' },
    openGraph: {
            title: "AI B2B Cold Email Sequence",
            description: "Create a structured b2b cold email sequence draft with AI B2B Cold Email Sequence. Use guided inputs, then review, refine, and adapt the result for your workflow.",
            url: 'https://quicktool.space/tools/ai-cold-email',
            siteName: 'QuickTool',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("AI B2B Cold Email Sequence")}&type=tool`, width: 1200, height: 630, alt: `AI B2B Cold Email Sequence - QuickTool` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "AI B2B Cold Email Sequence",
            description: "Create a structured b2b cold email sequence draft with AI B2B Cold Email Sequence. Use guided inputs, then review, refine, and adapt the result for your workflow.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("AI B2B Cold Email Sequence")}&type=tool`]
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
            "name": "AI B2B Cold Email Sequence",
            "description": "Generate conversion-focused B2B cold email sequences."},
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://quicktool.space" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://quicktool.space/tools" },
          { "@type": "ListItem", "position": 3, "name": "Writing", "item": "https://quicktool.space/tools/category/business" },
          { "@type": "ListItem", "position": 4, "name": "AI B2B Cold Email Sequence", "item": "https://quicktool.space/tools/ai-cold-email" }
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
        <span className="text-[#111827] font-semibold flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-[#F59E0B]" /> B2B Cold Email Sequence</span>
      </nav>

      <AiColdEmailClient />
    </div>
  );
}
