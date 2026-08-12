import { Metadata } from 'next';
import AiWhitepaperOutlineClient from '@/components/ai-whitepaper-outline/AiWhitepaperOutlineClient';
import { Sparkles, ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "AI Whitepaper Outline",
  description: "Use AI Whitepaper Outline to create a structured whitepaper outline draft from guided inputs. Review, refine, and adapt the result before using it in your workflow.",
    keywords: ["AI Whitepaper Outline","Whitepaper Outline AI","Free AI Whitepaper Outline","Best AI Whitepaper Outline","Online Whitepaper Outline","AI Whitepaper Outline Tool","QuickTool AI"],
    alternates: { canonical: 'https://quicktool.space/tools/ai-whitepaper-outline' },
    openGraph: {
            title: "AI Whitepaper Outline",
            description: "Use AI Whitepaper Outline to create a structured whitepaper outline draft from guided inputs. Review, refine, and adapt the result before using it in your workflow.",
            url: 'https://quicktool.space/tools/ai-whitepaper-outline',
            siteName: 'QuickTool',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("AI Whitepaper Outline")}&type=tool`, width: 1200, height: 630, alt: `AI Whitepaper Outline - QuickTool` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "AI Whitepaper Outline",
            description: "Use AI Whitepaper Outline to create a structured whitepaper outline draft from guided inputs. Review, refine, and adapt the result before using it in your workflow.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("AI Whitepaper Outline")}&type=tool`]
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
            "name": "AI Whitepaper Outline",
            "description": "Generate structured outlines for B2B whitepapers."},
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://quicktool.space" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://quicktool.space/tools" },
          { "@type": "ListItem", "position": 3, "name": "Productivity", "item": "https://quicktool.space/tools/category/business" },
          { "@type": "ListItem", "position": 4, "name": "AI Whitepaper Outline", "item": "https://quicktool.space/tools/ai-whitepaper-outline" }
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
        <span className="text-[#111827] font-semibold flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-[#F59E0B]" /> Whitepaper Outline</span>
      </nav>

      <AiWhitepaperOutlineClient />
    </div>
  );
}
