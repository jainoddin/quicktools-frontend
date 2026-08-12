import { Metadata } from 'next';
import AiPodcastScriptClient from '@/components/ai-podcast-script/AiPodcastScriptClient';
import { Sparkles, ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "AI Podcast Episode Script",
  description: "Create a structured podcast episode script draft with AI Podcast Episode Script. Use guided inputs, then review, refine, and adapt the result for your workflow.",
    keywords: ["AI Podcast Script","Podcast Script AI","Free AI Podcast Script","Best AI Podcast Script","Online Podcast Script","AI Podcast Script Tool","QuickTool AI"],
    alternates: { canonical: 'https://quicktool.space/tools/ai-podcast-script' },
    openGraph: {
            title: "AI Podcast Episode Script",
            description: "Create a structured podcast episode script draft with AI Podcast Episode Script. Use guided inputs, then review, refine, and adapt the result for your workflow.",
            url: 'https://quicktool.space/tools/ai-podcast-script',
            siteName: 'QuickTool',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("AI Podcast Episode Script")}&type=tool`, width: 1200, height: 630, alt: `AI Podcast Episode Script - QuickTool` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "AI Podcast Episode Script",
            description: "Create a structured podcast episode script draft with AI Podcast Episode Script. Use guided inputs, then review, refine, and adapt the result for your workflow.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("AI Podcast Episode Script")}&type=tool`]
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
            "name": "AI Podcast Episode Script",
            "description": "Generate structured scripts for podcast episodes."},
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://quicktool.space" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://quicktool.space/tools" },
          { "@type": "ListItem", "position": 3, "name": "Writing", "item": "https://quicktool.space/tools/category/creative" },
          { "@type": "ListItem", "position": 4, "name": "AI Podcast Episode Script", "item": "https://quicktool.space/tools/ai-podcast-script" }
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
        <span className="text-[#111827] font-semibold flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-[#F59E0B]" /> Podcast Episode Script</span>
      </nav>

      <AiPodcastScriptClient />
    </div>
  );
}
