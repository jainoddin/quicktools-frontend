import { Metadata } from 'next';
import AiCustomerJourneyClient from '@/components/ai-customer-journey/AiCustomerJourneyClient';
import { Sparkles, ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Customer Journey Mapper | Premium Tools',
  description: 'Map out the end-to-end customer journey.',
    keywords: ['AI Customer Journey Mapper', 'Free AI Customer Journey Mapper', 'AI AI Customer Journey Mapper', 'QuickTools', 'Online AI Customer Journey Mapper', 'AI Tool'],
    alternates: { canonical: 'https://quicktool.space/tools/ai-customer-journey' },
    openGraph: {
            title: "AI Customer Journey Mapper | Premium Tools",
            description: "Map out the end-to-end customer journey.",
            url: 'https://quicktool.space/tools/ai-customer-journey',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: 'https://quicktool.space/icon.svg', width: 1200, height: 630, alt: 'AI Customer Journey Mapper' }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "AI Customer Journey Mapper | Premium Tools",
            description: "Map out the end-to-end customer journey.",
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
            "name": "AI Customer Journey Mapper",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Any",
            "description": "Map out the end-to-end customer journey.",
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
        <span className="text-[#111827] font-semibold flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-[#F59E0B]" /> Customer Journey Mapper</span>
      </nav>

      <AiCustomerJourneyClient />
    </div>
  );
}
