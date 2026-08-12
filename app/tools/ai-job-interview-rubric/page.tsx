import { Metadata } from 'next';
import AiJobInterviewRubricClient from '@/components/ai-job-interview-rubric/AiJobInterviewRubricClient';
import { Sparkles, ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "AI Interview Scoring Rubric",
  description: "Create a structured interview scoring rubric draft with AI Interview Scoring Rubric. Use guided inputs, then review, refine, and adapt the result for your workflow.",
    keywords: ["AI Job Interview Rubric","Job Interview Rubric AI","Free AI Job Interview Rubric","Best AI Job Interview Rubric","Online Job Interview Rubric","AI Job Interview Rubric Tool","QuickTools AI"],
    alternates: { canonical: 'https://quicktool.space/tools/ai-job-interview-rubric' },
    openGraph: {
            title: "AI Interview Scoring Rubric",
            description: "Create a structured interview scoring rubric draft with AI Interview Scoring Rubric. Use guided inputs, then review, refine, and adapt the result for your workflow.",
            url: 'https://quicktool.space/tools/ai-job-interview-rubric',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("AI Interview Scoring Rubric")}&type=tool`, width: 1200, height: 630, alt: `AI Interview Scoring Rubric - QuickTools.ai` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "AI Interview Scoring Rubric",
            description: "Create a structured interview scoring rubric draft with AI Interview Scoring Rubric. Use guided inputs, then review, refine, and adapt the result for your workflow.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("AI Interview Scoring Rubric")}&type=tool`]
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
            "name": "AI Interview Scoring Rubric",
            "description": "Generate standardized interview scoring rubrics."},
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://quicktool.space" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://quicktool.space/tools" },
          { "@type": "ListItem", "position": 3, "name": "Productivity", "item": "https://quicktool.space/tools/category/career-hr" },
          { "@type": "ListItem", "position": 4, "name": "AI Interview Scoring Rubric", "item": "https://quicktool.space/tools/ai-job-interview-rubric" }
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
        <span className="text-[#111827] font-semibold flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-[#F59E0B]" /> Interview Scoring Rubric</span>
      </nav>

      <AiJobInterviewRubricClient />
    </div>
  );
}
