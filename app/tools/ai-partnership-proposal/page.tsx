import { Metadata } from 'next';
import AiPartnershipProposalClient from '@/components/ai-partnership-proposal/AiPartnershipProposalClient';
import { Sparkles, ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Partnership Proposal | QuickTools.ai',
  description: 'Generate B2B strategic partnership proposals.',
    keywords: ["AI Partnership Proposal","Partnership Proposal AI","Free AI Partnership Proposal","Best AI Partnership Proposal","Online Partnership Proposal","AI Partnership Proposal Tool","QuickTools AI"],
    alternates: { canonical: 'https://quicktool.space/tools/ai-partnership-proposal' },
    openGraph: {
            title: "AI Partnership Proposal | QuickTools.ai",
            description: "Generate B2B strategic partnership proposals.",
            url: 'https://quicktool.space/tools/ai-partnership-proposal',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("AI Partnership Proposal")}&type=tool`, width: 1200, height: 630, alt: `AI Partnership Proposal - QuickTools.ai` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "AI Partnership Proposal | QuickTools.ai",
            description: "Generate B2B strategic partnership proposals.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("AI Partnership Proposal")}&type=tool`]
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
            "name": "AI Partnership Proposal",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Any",
            "description": "Generate B2B strategic partnership proposals.",
            "featureList": "AI-assisted workflow, editable results, and browser-based access"},
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://quicktool.space" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://quicktool.space/tools" },
          { "@type": "ListItem", "position": 3, "name": "Productivity", "item": "https://quicktool.space/tools/category/business" },
          { "@type": "ListItem", "position": 4, "name": "AI Partnership Proposal", "item": "https://quicktool.space/tools/ai-partnership-proposal" }
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
        <span className="text-[#111827] font-semibold flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-[#F59E0B]" /> Partnership Proposal</span>
      </nav>

      <AiPartnershipProposalClient />
    </div>
  );
}
