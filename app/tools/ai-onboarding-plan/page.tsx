import { Metadata } from 'next';
import AiOnboardingPlanClient from '@/components/ai-onboarding-plan/AiOnboardingPlanClient';
import { Sparkles, ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Employee Onboarding Plan | Premium Tools',
  description: 'Generate structured 30-60-90 day onboarding plans.',
    keywords: ['AI Employee Onboarding Plan', 'Free AI Employee Onboarding Plan', 'AI AI Employee Onboarding Plan', 'QuickTools', 'Online AI Employee Onboarding Plan', 'AI Tool'],
    alternates: { canonical: 'https://quicktool.space/tools/ai-onboarding-plan' },
    openGraph: {
            title: "AI Employee Onboarding Plan | Premium Tools",
            description: "Generate structured 30-60-90 day onboarding plans.",
            url: 'https://quicktool.space/tools/ai-onboarding-plan',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: 'https://quicktool.space/icon.svg', width: 1200, height: 630, alt: 'AI Employee Onboarding Plan' }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "AI Employee Onboarding Plan | Premium Tools",
            description: "Generate structured 30-60-90 day onboarding plans.",
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
            "name": "AI Employee Onboarding Plan",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Any",
            "description": "Generate structured 30-60-90 day onboarding plans.",
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
        <span className="text-[#111827] font-semibold flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-[#F59E0B]" /> Employee Onboarding Plan</span>
      </nav>

      <AiOnboardingPlanClient />
    </div>
  );
}
