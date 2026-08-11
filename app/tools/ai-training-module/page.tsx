import { Metadata } from 'next';
import AiTrainingModuleClient from '@/components/ai-training-module/AiTrainingModuleClient';
import { Sparkles, ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Training Module Generator | QuickTools.ai',
  description: 'Generate corporate training modules and quizzes.',
    keywords: ["AI Training Module","Training Module AI","Free AI Training Module","Best AI Training Module","Online Training Module","AI Training Module Tool","QuickTools AI"],
    alternates: { canonical: 'https://quicktool.space/tools/ai-training-module' },
    openGraph: {
            title: "AI Training Module Generator | QuickTools.ai",
            description: "Generate corporate training modules and quizzes.",
            url: 'https://quicktool.space/tools/ai-training-module',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("AI Training Module Generator")}&type=tool`, width: 1200, height: 630, alt: `AI Training Module Generator - QuickTools.ai` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "AI Training Module Generator | QuickTools.ai",
            description: "Generate corporate training modules and quizzes.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("AI Training Module Generator")}&type=tool`]
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
            "name": "AI Training Module Generator",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Any",
            "description": "Generate corporate training modules and quizzes.",
            "featureList": "AI-assisted workflow, editable results, and browser-based access"},
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://quicktool.space" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://quicktool.space/tools" },
          { "@type": "ListItem", "position": 3, "name": "Productivity", "item": "https://quicktool.space/tools/category/career-hr" },
          { "@type": "ListItem", "position": 4, "name": "AI Training Module Generator", "item": "https://quicktool.space/tools/ai-training-module" }
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
        <span className="text-[#111827] font-semibold flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-[#F59E0B]" /> Training Module Generator</span>
      </nav>

      <AiTrainingModuleClient />
    </div>
  );
}
