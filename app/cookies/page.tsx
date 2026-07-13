import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Cookie, Settings, EyeOff, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cookies Policy | QuickTools.ai',
  description: 'Learn how QuickTools.ai uses cookies and tracking technologies.',
  alternates: { canonical: '/cookies' },
};

export default function CookiesPolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Cookies Policy | QuickTools.ai",
    "description": "Learn how QuickTools.ai uses cookies and tracking technologies.",
    "url": "https://quicktool.space/cookies",
    "mainEntity": {
      "@type": "Article",
      "headline": "Cookies Policy",
      "author": {
        "@type": "Organization",
        "name": "QuickTools.ai"
      },
      "publisher": {
        "@type": "Organization",
        "name": "QuickTools.ai",
        "logo": {
          "@type": "ImageObject",
          "url": "https://quicktool.space/icon.svg"
        }
      },
      "datePublished": "2026-07-13",
      "dateModified": "2026-07-13"
    }
  };

  return (
    <div className="flex-grow bg-[#F8FAFC] font-sans selection:bg-[#6D5EF8] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* ── HERO SECTION ── */}
      <div className="relative pt-20 pb-12 px-4 overflow-hidden bg-white border-b border-[#E5E7EB]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-br from-[#EEF2FF] to-[#FAF5FF] blur-3xl opacity-70 rounded-full pointer-events-none -z-10"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#EEF2FF] border border-[#C7D2FE] mb-6 shadow-sm">
            <Cookie className="w-6 h-6 text-[#6D5EF8]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#111827] mb-4 tracking-tight">
            Cookies Policy
          </h1>
          <p className="text-[#6B7280] text-sm md:text-base max-w-lg mx-auto">
            Last updated: July 13, 2026
          </p>
        </div>
      </div>

      {/* ── CONTENT SECTION ── */}
      <div className="max-w-[1200px] mx-auto px-4 py-16 flex flex-col lg:flex-row gap-10">
        
        {/* Left Sidebar Navigation */}
        <div className="w-full lg:w-64 shrink-0 hidden lg:block">
          <div className="sticky top-24 bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-sm">
            <nav className="space-y-1">
              <a href="#what-are-cookies" className="block px-4 py-2 rounded-xl text-sm font-bold text-[#6D5EF8] bg-[#EEF2FF] transition-colors">What are Cookies?</a>
              <a href="#how-we-use" className="block px-4 py-2 rounded-xl text-sm font-medium text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors">How We Use Them</a>
              <a href="#types-of-cookies" className="block px-4 py-2 rounded-xl text-sm font-medium text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors">Types of Cookies</a>
              <a href="#your-choices" className="block px-4 py-2 rounded-xl text-sm font-medium text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors">Your Choices</a>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow max-w-3xl bg-white border border-[#E5E7EB] rounded-3xl p-8 lg:p-12 shadow-sm">
          
          <div className="prose prose-indigo max-w-none prose-headings:font-bold prose-headings:text-[#111827] prose-p:text-[#4B5563] prose-p:leading-relaxed prose-a:text-[#6D5EF8]">
            <section id="what-are-cookies" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl mb-4">1. What are Cookies?</h2>
              <p>
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site.
              </p>
            </section>

            <section id="how-we-use" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl mb-4">2. How We Use Cookies</h2>
              <p>We use cookies and similar tracking technologies to track the activity on our service and hold certain information. Specifically, we use them for:</p>
              
              <ul className="list-none space-y-3 pl-0 my-6">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#6D5EF8] shrink-0 mt-0.5" />
                  <span>Keeping you signed in to your account.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#6D5EF8] shrink-0 mt-0.5" />
                  <span>Understanding how you use our AI tools to improve performance.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#6D5EF8] shrink-0 mt-0.5" />
                  <span>Remembering your preferences, such as theme or default settings.</span>
                </li>
              </ul>
            </section>

            <section id="types-of-cookies" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl mb-4">3. Types of Cookies We Use</h2>
              
              <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-5 my-6">
                <h4 className="font-bold text-[#15803D] mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Essential Cookies
                </h4>
                <p className="text-[#4B5563] text-sm m-0">These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as accessing secure areas.</p>
              </div>

              <div className="bg-[#EEF2FF] border border-[#C7D2FE] rounded-xl p-5 my-6">
                <h4 className="font-bold text-[#4338CA] mb-2 flex items-center gap-2">
                  <Settings className="w-4 h-4" /> Functional Cookies
                </h4>
                <p className="text-[#4B5563] text-sm m-0">These allow us to remember choices you make when you use our platform, like remembering your login details or language preference.</p>
              </div>

              <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-xl p-5 my-6">
                <h4 className="font-bold text-[#B91C1C] mb-2 flex items-center gap-2">
                  <EyeOff className="w-4 h-4" /> Analytics & Performance
                </h4>
                <p className="text-[#4B5563] text-sm m-0">These cookies are used to collect information about traffic to our website and how users use our service. The information gathered does not identify any individual visitor.</p>
              </div>
            </section>

            <section id="your-choices" className="mb-8 scroll-mt-24">
              <h2 className="text-2xl mb-4">4. Your Choices Regarding Cookies</h2>
              <p>
                If you prefer to avoid the use of cookies on the website, you must first disable the use of cookies in your browser and then delete the cookies saved in your browser associated with this website. You may use this option for preventing the use of cookies at any time.
              </p>
              <p>
                Please note that if you do not accept our cookies, you may experience some inconvenience in your use of the website and some features may not function properly.
              </p>
            </section>
          </div>

        </div>

        {/* Right Sidebar Widget */}
        <div className="w-full lg:w-72 shrink-0">
          <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-6 sticky top-24 shadow-sm">
            <h3 className="font-bold text-[#111827] mb-5 text-base">Cookie basics</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#EEF2FF] flex items-center justify-center shrink-0 border border-[#C7D2FE]">
                  <ShieldCheck className="w-4 h-4 text-[#6D5EF8]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#374151]">Safe & Secure</p>
                  <p className="text-[11px] text-[#6B7280]">We don't use malicious trackers.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#EEF2FF] flex items-center justify-center shrink-0 border border-[#C7D2FE]">
                  <Settings className="w-4 h-4 text-[#6D5EF8]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#374151]">Better Experience</p>
                  <p className="text-[11px] text-[#6B7280]">Cookies help remember preferences.</p>
                </div>
              </div>
            </div>

            <hr className="border-[#E5E7EB] my-5" />
            
            <div className="bg-white rounded-xl p-4 border border-[#E5E7EB]">
              <h4 className="font-bold text-[#111827] text-sm mb-2">Want to opt out?</h4>
              <p className="text-xs text-[#6B7280] leading-relaxed mb-4">
                You can manage or disable cookies directly from your browser settings.
              </p>
              <Link href="/contact" className="block w-full text-center bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#6D5EF8] font-bold py-2 rounded-lg text-xs transition-colors">
                Contact Support →
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
