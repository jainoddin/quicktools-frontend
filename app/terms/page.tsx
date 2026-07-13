import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { FileText, ShieldAlert, Ban, CheckCircle2, Home, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service - User Rules & Guidelines',
  description: 'Read the Terms of Service for using QuickTools.ai. Understand your rights, responsibilities, and the rules governing our platform and AI tools.',
  alternates: { canonical: '/terms' },
};

export default function TermsOfServicePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms of Service | QuickTools.ai",
    "description": "Read the terms and conditions for using QuickTools.ai services and tools.",
    "url": "https://quicktool.space/terms",
    "mainEntity": {
      "@type": "Article",
      "headline": "Terms of Service",
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
      
      {/* ── BREADCRUMB ── */}
      <div className="bg-white pt-4 pb-2">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-sm text-[#6B7280]">
          <Link href="/" className="hover:text-[#111827] flex items-center gap-1 transition-colors">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          <span className="text-[#6D5EF8] font-semibold">Terms of Service</span>
        </div>
      </div>

      {/* ── HERO SECTION ── */}
      <div className="relative pt-20 pb-12 px-4 overflow-hidden bg-white border-b border-[#E5E7EB]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-br from-[#EEF2FF] to-[#FAF5FF] blur-3xl opacity-70 rounded-full pointer-events-none -z-10"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#EEF2FF] border border-[#C7D2FE] mb-6 shadow-sm">
            <FileText className="w-6 h-6 text-[#6D5EF8]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#111827] mb-4 tracking-tight">
            Terms of Service
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
              <a href="#introduction" className="block px-4 py-2 rounded-xl text-sm font-bold text-[#6D5EF8] bg-[#EEF2FF] transition-colors">Introduction</a>
              <a href="#accounts" className="block px-4 py-2 rounded-xl text-sm font-medium text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors">Accounts</a>
              <a href="#responsibilities" className="block px-4 py-2 rounded-xl text-sm font-medium text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors">User Responsibilities</a>
              <a href="#content" className="block px-4 py-2 rounded-xl text-sm font-medium text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors">AI Content Disclaimer</a>
              <a href="#billing" className="block px-4 py-2 rounded-xl text-sm font-medium text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors">Payments & Billing</a>
              <a href="#termination" className="block px-4 py-2 rounded-xl text-sm font-medium text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors">Termination</a>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow max-w-3xl bg-white border border-[#E5E7EB] rounded-3xl p-8 lg:p-12 shadow-sm">
          
          <div className="prose prose-indigo max-w-none prose-headings:font-bold prose-headings:text-[#111827] prose-p:text-[#4B5563] prose-p:leading-relaxed prose-a:text-[#6D5EF8]">
            <section id="introduction" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl mb-4">1. Introduction</h2>
              <p>
                Welcome to QuickTools.ai. By accessing or using our website, APIs, tools, and services, you agree to be bound by these Terms of Service and all applicable laws and regulations.
              </p>
            </section>

            <section id="accounts" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl mb-4">2. Accounts</h2>
              <p>
                You are responsible for maintaining the confidentiality of your account and password and for all activities that occur under your account. You must notify us immediately of any security breach or unauthorized use of your account.
              </p>
            </section>

            <section id="responsibilities" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl mb-4">3. User Responsibilities</h2>
              <p>You agree not to:</p>
              
              <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-xl p-5 my-6">
                <h4 className="font-bold text-[#B91C1C] mb-3 flex items-center gap-2">
                  <Ban className="w-4 h-4" /> Prohibited Conduct
                </h4>
                <ul className="list-none space-y-3 pl-0 m-0">
                  <li className="flex items-start gap-3 text-sm text-[#7F1D1D]">
                    <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>Use our services for any illegal or unauthorized purpose.</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-[#7F1D1D]">
                    <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>Upload or generate harmful, abusive, or highly offensive content.</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-[#7F1D1D]">
                    <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>Try to gain unauthorized access to our systems or bypass credit limits.</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-[#7F1D1D]">
                    <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>Reverse engineer, decompile, or copy our platform source code.</span>
                  </li>
                </ul>
              </div>
            </section>

            <section id="content" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl mb-4">4. AI Content Disclaimer</h2>
              <p>
                Content generated by our AI tools is provided "as is". While we strive for high quality, we do not guarantee the accuracy, completeness, or usefulness of AI-generated content. You are solely responsible for reviewing and verifying the outputs before relying on them.
              </p>
            </section>

            <section id="billing" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl mb-4">5. Payments & Billing</h2>
              <p>
                Certain features require purchasing credits or subscribing to a premium plan. All fees are exclusive of taxes unless otherwise stated. Refunds are governed by our Refund Policy, which allows for refunds within 7 days if less than 10% of credits have been used.
              </p>
            </section>

            <section id="termination" className="mb-8 scroll-mt-24">
              <h2 className="text-2xl mb-4">6. Termination</h2>
              <p>
                We reserve the right to suspend or terminate your account at any time, with or without notice, for any violation of these Terms of Service.
              </p>
            </section>
          </div>

        </div>

        {/* Right Sidebar Widget */}
        <div className="w-full lg:w-72 shrink-0">
          <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-6 sticky top-24 shadow-sm">
            <h3 className="font-bold text-[#111827] mb-5 text-base">Quick summary</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#EEF2FF] flex items-center justify-center shrink-0 border border-[#C7D2FE]">
                  <CheckCircle2 className="w-4 h-4 text-[#6D5EF8]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#374151]">Be respectful</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#EEF2FF] flex items-center justify-center shrink-0 border border-[#C7D2FE]">
                  <Ban className="w-4 h-4 text-[#6D5EF8]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#374151]">No illegal activities</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#EEF2FF] flex items-center justify-center shrink-0 border border-[#C7D2FE]">
                  <ShieldAlert className="w-4 h-4 text-[#6D5EF8]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#374151]">Protect your account</p>
                </div>
              </div>
            </div>

            <hr className="border-[#E5E7EB] my-5" />
            
            <div className="bg-white rounded-xl p-4 border border-[#E5E7EB]">
              <h4 className="font-bold text-[#111827] text-sm mb-2">Questions?</h4>
              <p className="text-xs text-[#6B7280] leading-relaxed mb-4">
                If you have any questions about these terms, feel free to contact our support team.
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
