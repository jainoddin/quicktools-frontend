import { Metadata } from 'next';
import AiPressReleaseClient from '@/components/ai-press-release/AiPressReleaseClient';
import { Sparkles, ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "AI Press Release Writer",
  description: "Use AI Press Release Writer to create a structured press release draft from guided inputs. Review, refine, and adapt the result before using it in your workflow.",
    keywords: ["AI Press Release","Press Release AI","Free AI Press Release","Best AI Press Release","Online Press Release","AI Press Release Tool","QuickTools AI"],
    alternates: { canonical: 'https://quicktool.space/tools/ai-press-release' },
    openGraph: {
            title: "AI Press Release Writer",
            description: "Use AI Press Release Writer to create a structured press release draft from guided inputs. Review, refine, and adapt the result before using it in your workflow.",
            url: 'https://quicktool.space/tools/ai-press-release',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("AI Press Release Writer")}&type=tool`, width: 1200, height: 630, alt: `AI Press Release Writer - QuickTools.ai` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "AI Press Release Writer",
            description: "Use AI Press Release Writer to create a structured press release draft from guided inputs. Review, refine, and adapt the result before using it in your workflow.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("AI Press Release Writer")}&type=tool`]
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
            "@type": "SoftwareApplication",
            "name": "AI Press Release Writer",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Any",
            "description": "Write compelling press releases for your announcements.",
            "featureList": "AI-assisted workflow, editable results, and browser-based access"},
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://quicktool.space" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://quicktool.space/tools" },
          { "@type": "ListItem", "position": 3, "name": "Productivity", "item": "https://quicktool.space/tools/category/marketing" },
          { "@type": "ListItem", "position": 4, "name": "AI Press Release Writer", "item": "https://quicktool.space/tools/ai-press-release" }
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
        <span className="text-[#111827] font-semibold flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-[#F59E0B]" /> Press Release Writer</span>
      </nav>

      <AiPressReleaseClient />
    </div>
  );
}
