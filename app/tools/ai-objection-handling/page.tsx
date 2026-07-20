import { Metadata } from 'next';
import AiObjectionHandlingClient from '@/components/ai-objection-handling/AiObjectionHandlingClient';
import { Sparkles, ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Sales Objection Handler | Premium Tools',
  description: 'Generate responses to common sales objections.',
    keywords: ['AI Sales Objection Handler', 'Free AI Sales Objection Handler', 'AI AI Sales Objection Handler', 'QuickTools', 'Online AI Sales Objection Handler', 'AI Tool'],
    alternates: { canonical: 'https://quicktool.space/tools/ai-objection-handling' },
    openGraph: {
            title: "AI Sales Objection Handler | Premium Tools",
            description: "Generate responses to common sales objections.",
            url: 'https://quicktool.space/tools/ai-objection-handling',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: 'https://quicktool.space/icon.svg', width: 1200, height: 630, alt: 'AI Sales Objection Handler' }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "AI Sales Objection Handler | Premium Tools",
            description: "Generate responses to common sales objections.",
            creator: '@quicktoolsai',
            images: ['https://quicktool.space/icon.svg']
          }
};

export default function Page() {
  return (
    <div className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-6 h-[calc(100vh-80px)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "AI Sales Objection Handler",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Any",
            "description": "Generate responses to common sales objections.",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })
        }}
      />
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-[#6B7280] mb-6 animate-in fade-in slide-in-from-left-4 duration-500">
        <Link href="/" className="hover:text-[#111827] transition-colors flex items-center gap-1.5"><Home className="w-4 h-4" /> Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/tools" className="hover:text-[#111827] transition-colors">All Tools</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[#111827] font-semibold flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-[#F59E0B]" /> Sales Objection Handler</span>
      </nav>

      <AiObjectionHandlingClient />
    </div>
  );
}
