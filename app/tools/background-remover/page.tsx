import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import BackgroundRemoverClient from '@/components/background-remover/BackgroundRemoverClient';

export const metadata: Metadata = {
  title: "Background Remover",
  description: "Remove image backgrounds using our AI Background Remover. Create clear subject cutouts from the details you provide for design projects.",
  keywords: ["Background Remover","AI Background Remover","Background Remover AI","Free Background Remover","Best Background Remover","Online Background Remover","Background Remover Tool","Background Eraser","AI Background Eraser","Remove Background","Image Background Remover","QuickTools AI"],
  alternates: {
    canonical: 'https://quicktool.space/tools/background-remover'
  },
    openGraph: {
            title: "Free AI Background Remover - Erase Backgrounds Fast",
            description: "Remove image backgrounds using our AI Background Remover. Create clear subject cutouts from the details you provide for design projects.",
            url: 'https://quicktool.space/tools/background-remover',
            siteName: 'QuickTools.ai',
            type: 'website',
            images: [{ url: `https://quicktool.space/api/og?title=${encodeURIComponent("Background Remover")}&type=tool`, width: 1200, height: 630, alt: `Background Remover - QuickTools.ai` }]
          },
    twitter: {
            card: 'summary_large_image',
            title: "Free AI Background Remover - Erase Backgrounds Fast",
            description: "Remove image backgrounds using our AI Background Remover. Create clear subject cutouts from the details you provide for design projects.",
            images: [`https://quicktool.space/api/og?title=${encodeURIComponent("Background Remover")}&type=tool`]
          }
};

export default function BackgroundRemoverPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans selection:bg-[#6D5EF8] selection:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
      {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Free AI Background Remover - Erase Backgrounds Fast",
      "operatingSystem": "Web",
      "applicationCategory": "WebApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "Remove image backgrounds using our AI Background Remover. Create clear subject cutouts from the details you provide for design projects.",
      "url": "https://quicktool.space/tools/background-remover"
    , "featureList": "AI-assisted workflow, editable results, and browser-based access"},
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://quicktool.space" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://quicktool.space/tools" },
          { "@type": "ListItem", "position": 3, "name": "Design", "item": "https://quicktool.space/tools/category/creative" },
          { "@type": "ListItem", "position": 4, "name": "Background Remover", "item": "https://quicktool.space/tools/background-remover" }
        ]
      }
    ]) }} />
      {/* Breadcrumb Navigation */}
      <div className="bg-transparent pt-[15px] pb-[25px]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center text-sm">
          <Link href="/" className="flex items-center text-[#6B7280] hover:text-[#111827] transition-colors">
            <Home className="w-4 h-4 mr-1.5" />
            Home
          </Link>
          <ChevronRight className="w-4 h-4 mx-2 text-[#D1D5DB]" />
          <Link href="/tools" className="text-[#6B7280] hover:text-[#111827] transition-colors">
            All Tools
          </Link>
          <ChevronRight className="w-4 h-4 mx-2 text-[#D1D5DB]" />
          <span className="font-semibold text-[#6D5EF8]">Background Remover</span>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-[120px] -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-[120px] -translate-x-1/4 translate-y-1/4"></div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full flex-grow flex flex-col relative z-10">
        <BackgroundRemoverClient />
      
        {/* Visible FAQ Section for SEO and Users */}
        <div id="faq" className="mt-16 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">What is Background Remover?</h3>
              <p className="text-slate-600 mt-2">The Background Remover is an AI-assisted tool by QuickTools designed to help you remove image backgrounds using our ai background remover. fast, accurate, and clearly cut out subjects from the details you provide for design projects.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">What image formats are supported by Background Remover?</h3>
              <p className="text-slate-600 mt-2">The tool supports major high-resolution image formats like PNG, JPG, and JPEG for optimal quality processing and downloading.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Can I use the generated images commercially?</h3>
              <p className="text-slate-600 mt-2">Yes, all generated images and designs come with full commercial usage rights, allowing you to use them in ads, websites, and print.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Is it fast to generate results?</h3>
              <p className="text-slate-600 mt-2">Generation time depends on the request and current service availability. Review the result before using it.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Do I need to download any software?</h3>
              <p className="text-slate-600 mt-2">No, the Background Remover is entirely web-based and runs in your browser. You can access it from any device with an internet connection.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Is the Background Remover free to use?</h3>
              <p className="text-slate-600 mt-2">Current availability and usage limits are shown in the tool interface and pricing page.</p>
            </div>
          </div>
        </div>

</div>
    </div>
  );
}
