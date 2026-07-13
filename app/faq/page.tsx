import { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import FaqClient from '../../components/faq/FaqClient';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | QuickTools.ai',
  description: 'Find quick answers to the most common questions about QuickTools.ai, including billing, accounts, and API usage.',
  alternates: { canonical: '/faq' },
};

export default function FaqPage() {
  // Add FAQ JSON-LD Schema for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is QuickTools.ai?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'QuickTools.ai is an all-in-one platform providing access to the most powerful AI tools for image generation, content writing, video creation, coding assistance, and SEO optimization. It is designed to save you time and help you work smarter.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do credits work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Credits are the currency used on QuickTools.ai. Different AI tools consume different amounts of credits per use. Free accounts get 15 credits per month, while premium plans offer significantly more.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you offer refunds?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we offer a 7-day money-back guarantee for our premium plans if you are not satisfied with the service and have used less than 10% of your allocated credits.',
        },
      }
    ],
  };

  return (
    <div className="flex-grow bg-[#F8FAFC]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* ── BREADCRUMB ── */}
      <div className="bg-white pt-4 pb-2">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-sm text-[#6B7280]">
          <Link href="/" className="hover:text-[#111827] flex items-center gap-1 transition-colors">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          <span className="text-[#6D5EF8] font-semibold">FAQ</span>
        </div>
      </div>

      <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC]"></div>}>
        <FaqClient />
      </Suspense>
    </div>
  );
}
