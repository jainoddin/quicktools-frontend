import { Metadata } from 'next';
import AiAbandonedCartClient from '@/components/ai-abandoned-cart/AiAbandonedCartClient';
import { Sparkles, ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "AI Abandoned Cart Email Series",
  description: "AI Abandoned Cart Email Series creates a structured draft from guided inputs. Review key details, refine the output, and adapt it to your needs before use.",
    keywords: ["AI Abandoned Cart","Abandoned Cart AI","Free AI Abandoned Cart","Best AI Abandoned Cart","Online Abandoned Cart","AI Abandoned Cart Tool","QuickTools AI"],
    alternates: { canonical: 'https://quicktool.space/tools/ai-abandoned-cart' },
    openGraph: {
            title: "AI Abandoned Cart Email Series",
            description: "AI Abandoned Cart Email Series creates a structured draft from guided inputs. Review key details, refine the output, and adapt it to your needs before use.",
            url: 'https://quicktool.space/tools/ai-abandoned-cart',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("AI Abandoned Cart Email Series")}&type=tool`, width: 1200, height: 630, alt: `AI Abandoned Cart Email Series - QuickTools.ai` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "AI Abandoned Cart Email Series",
            description: "AI Abandoned Cart Email Series creates a structured draft from guided inputs. Review key details, refine the output, and adapt it to your needs before use.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("AI Abandoned Cart Email Series")}&type=tool`]
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
            "name": "AI Abandoned Cart Email Series",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Any",
            "description": "Generate email sequences to recover lost sales.",
            "featureList": "AI-assisted workflow, editable results, and browser-based access"},
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://quicktool.space" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://quicktool.space/tools" },
          { "@type": "ListItem", "position": 3, "name": "Productivity", "item": "https://quicktool.space/tools/category/marketing" },
          { "@type": "ListItem", "position": 4, "name": "AI Abandoned Cart Email Series", "item": "https://quicktool.space/tools/ai-abandoned-cart" }
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
        <span className="text-[#111827] font-semibold flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-[#F59E0B]" /> Abandoned Cart Email Series</span>
      </nav>

      <AiAbandonedCartClient />
    </div>
  );
}
