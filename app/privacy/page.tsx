import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Lock, FileKey, CheckCircle2, User, Home, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy - How We Protect Your Data',
  description: 'Read our Privacy Policy to learn how QuickTools.ai collects, uses, and protects your personal information and ensures data security on our platform.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy | QuickTools.ai",
    "description": "Learn how QuickTools.ai collects, uses, and protects your information.",
    "url": "https://quicktool.space/privacy",
    "mainEntity": {
      "@type": "Article",
      "headline": "Privacy Policy",
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
          <span className="text-[#6D5EF8] font-semibold">Privacy Policy</span>
        </div>
      </div>

      {/* ── HERO SECTION ── */}
      <div className="relative pt-20 pb-12 px-4 overflow-hidden bg-white border-b border-[#E5E7EB]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-br from-[#EEF2FF] to-[#FAF5FF] blur-3xl opacity-70 rounded-full pointer-events-none -z-10"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#EEF2FF] border border-[#C7D2FE] mb-6 shadow-sm">
            <Shield className="w-6 h-6 text-[#6D5EF8]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#111827] mb-4 tracking-tight">
            Privacy Policy
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
              <a href="#overview" className="block px-4 py-2 rounded-xl text-sm font-bold text-[#6D5EF8] bg-[#EEF2FF] transition-colors">Overview</a>
              <a href="#information" className="block px-4 py-2 rounded-xl text-sm font-medium text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors">Information We Collect</a>
              <a href="#how-we-use" className="block px-4 py-2 rounded-xl text-sm font-medium text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors">How We Use Information</a>
              <a href="#cookies" className="block px-4 py-2 rounded-xl text-sm font-medium text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors">Cookies & Tracking</a>
              <a href="#ai-content" className="block px-4 py-2 rounded-xl text-sm font-medium text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors">AI Generated Content</a>
              <a href="#security" className="block px-4 py-2 rounded-xl text-sm font-medium text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors">Data Security</a>
              <a href="#contact" className="block px-4 py-2 rounded-xl text-sm font-medium text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors">Contact Us</a>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow max-w-3xl bg-white border border-[#E5E7EB] rounded-3xl p-8 lg:p-12 shadow-sm">
          
          <div className="prose prose-indigo max-w-none prose-headings:font-bold prose-headings:text-[#111827] prose-p:text-[#4B5563] prose-p:leading-relaxed prose-a:text-[#6D5EF8]">
            <section id="overview" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl mb-4">1. Overview</h2>
              <p>
                At QuickTools.ai, your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our website, tools, and services.
              </p>
            </section>

            <section id="information" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl mb-4">2. Information We Collect</h2>
              <p>We collect information to provide and improve our services.</p>
              
              <div className="bg-[#EEF2FF] border border-[#C7D2FE] rounded-xl p-5 my-6">
                <h4 className="font-bold text-[#4338CA] mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" /> Personal Information
                </h4>
                <p className="text-[#4B5563] text-sm m-0">Name, email address, billing information and other details you provide when creating an account.</p>
              </div>

              <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-5 my-6">
                <h4 className="font-bold text-[#15803D] mb-2 flex items-center gap-2">
                  <FileKey className="w-4 h-4" /> Usage Data
                </h4>
                <p className="text-[#4B5563] text-sm m-0">Information about how you use our website, tools, prompts submitted to AI, and generated outputs.</p>
              </div>
            </section>

            <section id="how-we-use" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl mb-4">3. How We Use Information</h2>
              <p>We use the collected information to:</p>
              <ul className="list-none space-y-3 pl-0">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#6D5EF8] shrink-0 mt-0.5" />
                  <span>Provide, operate and maintain our services.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#6D5EF8] shrink-0 mt-0.5" />
                  <span>Improve, personalize, and expand our features.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#6D5EF8] shrink-0 mt-0.5" />
                  <span>Process transactions and send related information.</span>
                </li>
              </ul>
            </section>

            <section id="ai-content" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl mb-4">4. AI Generated Content</h2>
              <p>
                When you use our AI tools, the prompts, text, images, or other inputs you provide may be sent to third-party AI providers (e.g., OpenAI) for processing. We do not use your personal data to train our own base models, and we configure our third-party APIs to opt out of data training where available.
              </p>
            </section>

            <section id="contact" className="mb-8 scroll-mt-24">
              <h2 className="text-2xl mb-4">5. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-6 mt-4">
                <strong>Email:</strong> <a href="mailto:helloquicktool@gmail.com">helloquicktool@gmail.com</a><br />
                <strong>Address:</strong> QuickTools AI Inc., 123 Innovation Way, Tech City
              </div>
            </section>
          </div>

        </div>

        {/* Right Sidebar Widget */}
        <div className="w-full lg:w-72 shrink-0">
          <div className="bg-[#FAF5FF] border border-[#E9D5FF] rounded-2xl p-6 sticky top-24 shadow-sm">
            <h3 className="font-bold text-[#111827] mb-5 text-base">Privacy at a glance</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-[#E9D5FF]">
                  <Shield className="w-4 h-4 text-[#8B5CF6]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#374151]">We never sell your data</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-[#E9D5FF]">
                  <Lock className="w-4 h-4 text-[#8B5CF6]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#374151]">256-bit encryption</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-[#E9D5FF]">
                  <FileKey className="w-4 h-4 text-[#8B5CF6]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#374151]">GDPR Compliant</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-[#E9D5FF]">
                  <CheckCircle2 className="w-4 h-4 text-[#8B5CF6]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#374151]">Secure payments</p>
                </div>
              </div>
            </div>

            <hr className="border-[#E9D5FF] my-5" />
            
            <p className="text-xs text-[#6B7280] leading-relaxed">
              Your data is safe with us. We are committed to protecting your privacy and transparency.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
