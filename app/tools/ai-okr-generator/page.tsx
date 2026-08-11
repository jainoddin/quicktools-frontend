import { Metadata } from 'next';
import AiOkrGeneratorClient from '@/components/ai-okr-generator/AiOkrGeneratorClient';
import { Sparkles, ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "AI OKR Generator",
  description: "Use AI OKR Generator to create a structured okr draft from guided inputs. Review, refine, and adapt the result before using it in your workflow.",
    keywords: ["AI Okr Generator","Okr Generator AI","Free AI Okr Generator","Best AI Okr Generator","Online Okr Generator","AI Okr Generator Tool","Okr Creator","AI Okr Creator","QuickTools AI"],
    alternates: { canonical: 'https://quicktool.space/tools/ai-okr-generator' },
    openGraph: {
            title: "AI OKR Generator",
            description: "Use AI OKR Generator to create a structured okr draft from guided inputs. Review, refine, and adapt the result before using it in your workflow.",
            url: 'https://quicktool.space/tools/ai-okr-generator',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("AI OKR Generator")}&type=tool`, width: 1200, height: 630, alt: `AI OKR Generator - QuickTools.ai` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "AI OKR Generator",
            description: "Use AI OKR Generator to create a structured okr draft from guided inputs. Review, refine, and adapt the result before using it in your workflow.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("AI OKR Generator")}&type=tool`]
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
            "name": "AI OKR Generator",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Any",
            "description": "Generate Objectives and Key Results for your teams.",
            "featureList": "AI-assisted workflow, editable results, and browser-based access"},
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://quicktool.space" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://quicktool.space/tools" },
          { "@type": "ListItem", "position": 3, "name": "Productivity", "item": "https://quicktool.space/tools/category/business" },
          { "@type": "ListItem", "position": 4, "name": "AI OKR Generator", "item": "https://quicktool.space/tools/ai-okr-generator" }
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
        <span className="text-[#111827] font-semibold flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-[#F59E0B]" /> OKR Generator</span>
      </nav>

      <AiOkrGeneratorClient />
    </div>
  );
}
