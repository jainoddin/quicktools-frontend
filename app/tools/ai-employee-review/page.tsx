import { Metadata } from 'next';
import AiEmployeeReviewClient from '@/components/ai-employee-review/AiEmployeeReviewClient';
import { Sparkles, ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Employee Performance Review | Premium Tools',
  description: 'Write constructive employee performance reviews.',
    keywords: ['AI Employee Performance Review', 'Free AI Employee Performance Review', 'AI AI Employee Performance Review', 'QuickTools', 'Online AI Employee Performance Review', 'AI Tool'],
    alternates: { canonical: 'https://quicktool.space/tools/ai-employee-review' },
    openGraph: {
            title: "AI Employee Performance Review | Premium Tools",
            description: "Write constructive employee performance reviews.",
            url: 'https://quicktool.space/tools/ai-employee-review',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: 'https://quicktool.space/icon.svg', width: 1200, height: 630, alt: 'AI Employee Performance Review' }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "AI Employee Performance Review | Premium Tools",
            description: "Write constructive employee performance reviews.",
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
            "name": "AI Employee Performance Review",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Any",
            "description": "Write constructive employee performance reviews.",
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
        <span className="text-[#111827] font-semibold flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-[#F59E0B]" /> Employee Performance Review</span>
      </nav>

      <AiEmployeeReviewClient />
    </div>
  );
}
