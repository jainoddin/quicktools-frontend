import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import AiCourseCreatorClient from '@/components/ai-course-creator/AiCourseCreatorClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Premium AI Course Curriculum Creator",
  description: "Premium AI Course Curriculum Creator creates a structured draft from guided inputs. Review key details, refine the output, and adapt it to your needs before use.",
    keywords: ["AI Course Creator","Course Creator AI","Free AI Course Creator","Best AI Course Creator","Online Course Creator","AI Course Creator Tool","QuickTools AI"],
    alternates: { canonical: 'https://quicktool.space/tools/ai-course-creator' },
    openGraph: {
            title: "Premium AI Course Curriculum Creator | QuickTools",
            description: "Premium AI Course Curriculum Creator creates a structured draft from guided inputs. Review key details, refine the output, and adapt it to your needs before use.",
            url: 'https://quicktool.space/tools/ai-course-creator',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("AI Course Curriculum Creator")}&type=tool`, width: 1200, height: 630, alt: `AI Course Curriculum Creator - QuickTools.ai` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Premium AI Course Curriculum Creator | QuickTools",
            description: "Premium AI Course Curriculum Creator creates a structured draft from guided inputs. Review key details, refine the output, and adapt it to your needs before use.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("AI Course Curriculum Creator")}&type=tool`]
          }
};

export default function AiCourseCreatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Course Curriculum Creator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '5',
      priceCurrency: 'USD',
    },
    description: 'Generate a full 4-week course syllabus, lesson plans, and quizzes. Create an editable Course Curriculum Creator draft with guided inputs, then review and refine it for your workflow.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-6 h-[calc(100vh-80px)]">
        <div className="flex items-center mb-[25px]">
          <nav className="flex items-center space-x-2 text-sm font-medium text-[#6B7280]">
            <Link href="/" className="hover:text-[#111827] transition-colors flex items-center gap-1.5">
              <Home className="w-4 h-4" /> Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/tools" className="hover:text-[#111827] transition-colors">
              All Tools
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-[#6D5EF8] font-bold">AI Course Curriculum Creator</span>
          </nav>
        </div>
        <AiCourseCreatorClient />
      </div>
    </>
  );
}
