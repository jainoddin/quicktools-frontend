import { Metadata } from 'next';
import AiCustomerJourneyClient from '@/components/ai-customer-journey/AiCustomerJourneyClient';
import { Sparkles, ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Customer Journey Mapper | QuickTools.ai',
  description: 'Map out the end-to-end customer journey.',
    keywords: ["AI Customer Journey","Customer Journey AI","Free AI Customer Journey","Best AI Customer Journey","Online Customer Journey","AI Customer Journey Tool","QuickTools AI"],
    alternates: { canonical: 'https://quicktool.space/tools/ai-customer-journey' },
    openGraph: {
            title: "AI Customer Journey Mapper | QuickTools.ai",
            description: "Map out the end-to-end customer journey.",
            url: 'https://quicktool.space/tools/ai-customer-journey',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("AI Customer Journey Mapper")}&type=tool`, width: 1200, height: 630, alt: `AI Customer Journey Mapper - QuickTools.ai` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "AI Customer Journey Mapper | QuickTools.ai",
            description: "Map out the end-to-end customer journey.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("AI Customer Journey Mapper")}&type=tool`]
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
            "name": "AI Customer Journey Mapper",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Any",
            "description": "Map out the end-to-end customer journey.",
            "featureList": "AI-assisted workflow, editable results, and browser-based access"},
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://quicktool.space" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://quicktool.space/tools" },
          { "@type": "ListItem", "position": 3, "name": "Productivity", "item": "https://quicktool.space/tools/category/marketing" },
          { "@type": "ListItem", "position": 4, "name": "AI Customer Journey Mapper", "item": "https://quicktool.space/tools/ai-customer-journey" }
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
        <span className="text-[#111827] font-semibold flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-[#F59E0B]" /> Customer Journey Mapper</span>
      </nav>

      <AiCustomerJourneyClient />
    </div>
  );
}
