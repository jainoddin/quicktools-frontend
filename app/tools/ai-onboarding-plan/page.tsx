import { Metadata } from 'next';
import AiOnboardingPlanClient from '@/components/ai-onboarding-plan/AiOnboardingPlanClient';
import { Sparkles, ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "AI Employee Onboarding Plan",
  description: "Create a structured employee onboarding plan draft with AI Employee Onboarding Plan. Use guided inputs, then review, refine, and adapt the result for your workflow.",
    keywords: ["AI Onboarding Plan","Onboarding Plan AI","Free AI Onboarding Plan","Best AI Onboarding Plan","Online Onboarding Plan","AI Onboarding Plan Tool","QuickTool AI"],
    alternates: { canonical: 'https://quicktool.space/tools/ai-onboarding-plan' },
    openGraph: {
            title: "AI Employee Onboarding Plan",
            description: "Create a structured employee onboarding plan draft with AI Employee Onboarding Plan. Use guided inputs, then review, refine, and adapt the result for your workflow.",
            url: 'https://quicktool.space/tools/ai-onboarding-plan',
            siteName: 'QuickTool',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("AI Employee Onboarding Plan")}&type=tool`, width: 1200, height: 630, alt: `AI Employee Onboarding Plan - QuickTool` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "AI Employee Onboarding Plan",
            description: "Create a structured employee onboarding plan draft with AI Employee Onboarding Plan. Use guided inputs, then review, refine, and adapt the result for your workflow.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("AI Employee Onboarding Plan")}&type=tool`]
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
            "name": "AI Employee Onboarding Plan",
            "description": "Generate structured 30-60-90 day onboarding plans."},
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://quicktool.space" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://quicktool.space/tools" },
          { "@type": "ListItem", "position": 3, "name": "Business", "item": "https://quicktool.space/tools/category/career-hr" },
          { "@type": "ListItem", "position": 4, "name": "AI Employee Onboarding Plan", "item": "https://quicktool.space/tools/ai-onboarding-plan" }
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
        <span className="text-[#111827] font-semibold flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-[#F59E0B]" /> Employee Onboarding Plan</span>
      </nav>

      <AiOnboardingPlanClient />
    </div>
  );
}
