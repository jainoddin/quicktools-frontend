import { Metadata } from 'next';
import AiJobInterviewRubricClient from '@/components/ai-job-interview-rubric/AiJobInterviewRubricClient';
import { Sparkles, ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Interview Scoring Rubric | Premium Tools',
  description: 'Generate standardized interview scoring rubrics.',
    keywords: ['AI Interview Scoring Rubric', 'Free AI Interview Scoring Rubric', 'AI AI Interview Scoring Rubric', 'QuickTools', 'Online AI Interview Scoring Rubric', 'AI Tool'],
    alternates: { canonical: 'https://quicktool.space/tools/ai-job-interview-rubric' },
    openGraph: {
            title: "AI Interview Scoring Rubric | Premium Tools",
            description: "Generate standardized interview scoring rubrics.",
            url: 'https://quicktool.space/tools/ai-job-interview-rubric',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: 'https://quicktool.space/icon.svg', width: 1200, height: 630, alt: 'AI Interview Scoring Rubric' }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "AI Interview Scoring Rubric | Premium Tools",
            description: "Generate standardized interview scoring rubrics.",
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
            "name": "AI Interview Scoring Rubric",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Any",
            "description": "Generate standardized interview scoring rubrics.",
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
        <span className="text-[#111827] font-semibold flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-[#F59E0B]" /> Interview Scoring Rubric</span>
      </nav>

      <AiJobInterviewRubricClient />
    </div>
  );
}
