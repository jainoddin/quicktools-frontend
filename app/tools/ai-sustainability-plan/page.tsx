import { Metadata } from 'next';
import AiSustainabilityPlanClient from '@/components/ai-sustainability-plan/AiSustainabilityPlanClient';
import { Sparkles, ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "AI ESG / Sustainability Plan",
  description: "AI ESG / Sustainability Plan creates a structured draft from guided inputs. Review key details, refine the output, and adapt it to your needs before use.",
    keywords: ["AI Sustainability Plan","Sustainability Plan AI","Free AI Sustainability Plan","Best AI Sustainability Plan","Online Sustainability Plan","AI Sustainability Plan Tool","QuickTools AI"],
    alternates: { canonical: 'https://quicktool.space/tools/ai-sustainability-plan' },
    openGraph: {
            title: "AI ESG / Sustainability Plan",
            description: "AI ESG / Sustainability Plan creates a structured draft from guided inputs. Review key details, refine the output, and adapt it to your needs before use.",
            url: 'https://quicktool.space/tools/ai-sustainability-plan',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("AI ESG / Sustainability Plan")}&type=tool`, width: 1200, height: 630, alt: `AI ESG / Sustainability Plan - QuickTools.ai` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "AI ESG / Sustainability Plan",
            description: "AI ESG / Sustainability Plan creates a structured draft from guided inputs. Review key details, refine the output, and adapt it to your needs before use.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("AI ESG / Sustainability Plan")}&type=tool`]
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
            "name": "AI ESG / Sustainability Plan",
            "description": "Generate corporate sustainability and ESG plans."},
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://quicktool.space" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://quicktool.space/tools" },
          { "@type": "ListItem", "position": 3, "name": "Business", "item": "https://quicktool.space/tools/category/business" },
          { "@type": "ListItem", "position": 4, "name": "AI ESG / Sustainability Plan", "item": "https://quicktool.space/tools/ai-sustainability-plan" }
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
        <span className="text-[#111827] font-semibold flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-[#F59E0B]" /> ESG / Sustainability Plan</span>
      </nav>

      <AiSustainabilityPlanClient />
    </div>
  );
}
