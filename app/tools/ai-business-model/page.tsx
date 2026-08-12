import { Metadata } from 'next';
import AiBusinessModelClient from '@/components/ai-business-model/AiBusinessModelClient';
import { Sparkles, ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import PriorityToolSeoSection from '@/components/tools/PriorityToolSeoSection';

export const metadata: Metadata = {
  title: "AI Business Model Canvas for Strategy Mapping",
  description: "Map customers, value propositions, channels, revenue, resources, activities, partners, and costs in a structured canvas draft.",
    keywords: ["AI Business Model","Business Model AI","Business Model Canvas","Online Business Model","AI Business Model Tool","QuickTools AI"],
    alternates: { canonical: 'https://quicktool.space/tools/ai-business-model' },
    openGraph: {
            title: "AI Business Model Canvas for Strategy Mapping",
            description: "Map customers, value propositions, channels, revenue, resources, activities, partners, and costs in a structured canvas draft.",
            url: 'https://quicktool.space/tools/ai-business-model',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("AI Business Model Canvas")}&type=tool`, width: 1200, height: 630, alt: `AI Business Model Canvas - QuickTools.ai` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "AI Business Model Canvas for Strategy Mapping",
            description: "Map customers, value propositions, channels, revenue, resources, activities, partners, and costs in a structured canvas draft.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("AI Business Model Canvas")}&type=tool`]
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
            "name": "AI Business Model Canvas",
            "description": "Generate a complete Business Model Canvas."},
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://quicktool.space" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://quicktool.space/tools" },
          { "@type": "ListItem", "position": 3, "name": "Business", "item": "https://quicktool.space/tools/category/business" },
          { "@type": "ListItem", "position": 4, "name": "AI Business Model Canvas", "item": "https://quicktool.space/tools/ai-business-model" }
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
        <span className="text-[#111827] font-semibold flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-[#F59E0B]" /> Business Model Canvas</span>
      </nav>

      <AiBusinessModelClient />
    </div>
    <PriorityToolSeoSection slug="ai-business-model" />
    </>
  );
}
