import { Metadata } from 'next';
import AiLandingPageCopyClient from '@/components/ai-landing-page-copy/AiLandingPageCopyClient';
import { Sparkles, ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Landing Page Copywriter | QuickTools.ai',
  description: 'Generate high-converting copy for landing pages.',
    keywords: ["AI Landing Page Copy","Landing Page Copy AI","Free AI Landing Page Copy","Best AI Landing Page Copy","Online Landing Page Copy","AI Landing Page Copy Tool","QuickTools AI"],
    alternates: { canonical: 'https://quicktool.space/tools/ai-landing-page-copy' },
    openGraph: {
            title: "AI Landing Page Copywriter | QuickTools.ai",
            description: "Generate high-converting copy for landing pages.",
            url: 'https://quicktool.space/tools/ai-landing-page-copy',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("AI Landing Page Copywriter")}&type=tool`, width: 1200, height: 630, alt: `AI Landing Page Copywriter - QuickTools.ai` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "AI Landing Page Copywriter | QuickTools.ai",
            description: "Generate high-converting copy for landing pages.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("AI Landing Page Copywriter")}&type=tool`]
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
            "name": "AI Landing Page Copywriter",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Any",
            "description": "Generate high-converting copy for landing pages.",
            "featureList": "AI-assisted workflow, editable results, and browser-based access"},
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://quicktool.space" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://quicktool.space/tools" },
          { "@type": "ListItem", "position": 3, "name": "Writing", "item": "https://quicktool.space/tools/category/marketing" },
          { "@type": "ListItem", "position": 4, "name": "AI Landing Page Copywriter", "item": "https://quicktool.space/tools/ai-landing-page-copy" }
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
        <span className="text-[#111827] font-semibold flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-[#F59E0B]" /> Landing Page Copywriter</span>
      </nav>

      <AiLandingPageCopyClient />
    </div>
  );
}
