import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Home, ChevronRight, Zap, Users, LayoutGrid, Star,
  Globe, Shield, Check, ArrowRight, Mail,
  Sparkles, Lock, Lightbulb, Code2, MessageCircle
} from 'lucide-react';

export const metadata: Metadata = {
  title: {
    absolute: 'About QuickTool | AI Platform for Productivity & Innovation',
  },
  description: 'Learn about QuickTool, our mission, and how we\'re building an AI platform that helps creators, students, freelancers, and businesses work smarter.',
  keywords: [
    'About QuickTool', 'QuickTool AI', 'AI platform', 'AI company',
    'AI tools platform', 'AI productivity', 'AI innovation',
    'QuickTool mission', 'AI for creators', 'AI for students',
    'AI for businesses', 'About us'
  ],
  alternates: {
    canonical: 'https://quicktool.space/about',
  }
};

import { getEndpoint } from '../../lib/api';

export const revalidate = 3600; // Revalidate every hour

async function getStats() {
  try {
    const res = await fetch(getEndpoint('/api/stats'), { next: { revalidate: 3600 } });
    const json = await res.json();
    if (json.success) return json.data;
  } catch (err) {
    console.error("Failed to fetch stats", err);
  }
  return { users: 1000, tasks: 50000, tools: 100, countries: 150, uptime: 99.9 };
}

const values = [
  {
    icon: Sparkles,
    title: 'Simplicity First',
    desc: 'We design tools that are easy to use, even for beginners.',
    color: 'bg-[#EEF2FF]', iconColor: 'text-[#6D5EF8]',
  },
  {
    icon: Shield,
    title: 'Powerful & Reliable',
    desc: 'We ensure our tools deliver high-quality results you can rely on.',
    color: 'bg-emerald-50', iconColor: 'text-emerald-600',
  },
  {
    icon: Lock,
    title: 'Privacy & Security',
    desc: 'Your data and privacy are always safe with enterprise-grade security.',
    color: 'bg-sky-50', iconColor: 'text-sky-600',
  },
  {
    icon: Lightbulb,
    title: 'Innovation Everyday',
    desc: 'We constantly innovate to bring you the latest in AI technology.',
    color: 'bg-amber-50', iconColor: 'text-amber-600',
  },
];

export default async function AboutPage() {
  const backendStats = await getStats();

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M+';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K+';
    return num + '+';
  };

  const stats = [
    { icon: Users, label: 'Built For', value: 'Creators', color: 'text-[#6D5EF8]', bg: 'bg-[#EEF2FF]' },
    { icon: LayoutGrid, label: 'AI Tools', value: '100+', color: 'text-[#F43F5E]', bg: 'bg-pink-50' },
    { icon: Star, label: 'Tasks Completed', value: formatNumber(backendStats.tasks), color: 'text-[#F59E0B]', bg: 'bg-amber-50' },
    { icon: Globe, label: 'Countries', value: backendStats.countries + '+', color: 'text-[#10B981]', bg: 'bg-emerald-50' },
    { icon: Shield, label: 'Uptime', value: backendStats.uptime + '%', color: 'text-[#0EA5E9]', bg: 'bg-sky-50' },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About QuickTool",
    "description": "Learn about QuickTool — our mission to make AI simple, powerful and accessible for everyone.",
    "url": "https://quicktool.space/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "QuickTool",
      "foundingDate": "2026",
      "founders": [
        {
          "@type": "Person",
          "name": "Shaik Jainoddin"
        }
      ]
    }
  };

  return (
    <div className="flex-grow bg-[#F8FAFC] font-sans selection:bg-[#6D5EF8] selection:text-white overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="bg-transparent pt-[15px] pb-[25px]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-sm text-[#6B7280]">
          <Link href="/" className="hover:text-[#111827] flex items-center gap-1 transition-colors">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          <span className="text-[#6D5EF8] font-semibold">About Us</span>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">

        {/* ── HERO SECTION ── */}
        <section className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EEF2FF] border border-[#DDD6FE] text-[#6D5EF8] text-xs font-bold mb-6">
              <Zap className="w-3.5 h-3.5 fill-[#6D5EF8]" /> About QuickTool
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-[#111827] leading-tight mb-6 tracking-tight">
              Making AI Simple, Powerful<br className="hidden sm:block" />
              <span className="text-[#6D5EF8]"> and Accessible</span> for Everyone
            </h1>
            <p className="text-[#6B7280] text-lg leading-relaxed mb-8">
              At QuickTool, we believe AI should be simple, accessible, and affordable for everyone.
              Our mission is to bring the power of artificial intelligence to your fingertips with 100+
              easy-to-use tools that help you work smarter and achieve more.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/tools"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white font-semibold rounded-xl transition-colors shadow-md shadow-[#6D5EF8]/20">
                <Zap className="w-4 h-4 fill-white" /> Explore All Tools
              </Link>
            </div>
          </div>

          {/* Right — Product Screenshot Mockup */}
          <div className="relative w-full flex items-center lg:justify-end justify-center pt-8 sm:pt-0">
            <style dangerouslySetInnerHTML={{
              __html: `
              @keyframes float-icon {
                0%, 100% { transform: translateY(0px) rotate(-12deg); }
                50% { transform: translateY(-20px) rotate(-8deg); }
              }
              .animate-float-icon {
                animation: float-icon 4s ease-in-out infinite;
              }
            `}} />

            {/* Main Mockup Image */}
            <div className="relative w-[95%] lg:w-[95%] xl:w-[100%] z-10 flex items-center justify-end ml-auto">
              <Image
                src="https://pub-68a98c57e70a4a1fa317739dd20098b9.r2.dev/9ece2905-2609-40cc-be51-4621b64fc3d7.png"
                alt="Product Mockup"
                width={800}
                height={600}
                className="w-full h-auto object-contain drop-shadow-2xl rounded-2xl"
              />
            </div>

            {/* Robot Image */}
            <div className="absolute -bottom-24 -right-24 w-[380px] h-[380px] z-20 hidden md:block pointer-events-none">
              <Image
                src="https://pub-68a98c57e70a4a1fa317739dd20098b9.r2.dev/e3f4b268-d502-44fc-a58d-6af941e6639b.png"
                alt="AI Assistant Robot"
                fill
                className="object-contain drop-shadow-xl"
              />
            </div>

            {/* Floating Lightning Icon */}
            <div className="absolute top-[50%] lg:-left-6 left-0 w-16 h-16 bg-[#6D5EF8] rounded-2xl flex items-center justify-center shadow-xl z-20 hidden md:flex animate-float-icon">
              <Zap className="w-8 h-8 text-white fill-white" />
            </div>

          </div>
        </section>

        {/* ── STATS ── */}
        <section className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm p-6 mb-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#F3F4F6]">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex flex-col items-center text-center pt-4 sm:pt-0">
                  <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-black text-[#111827] mb-0.5">{stat.value}</div>
                  <div className="text-xs text-[#6B7280] font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── TEAM + VALUES + CTA ── */}
        <section className="grid lg:grid-cols-3 gap-8 mb-16">

          {/* Team (left — spans 1 col) */}
          <div className="lg:col-span-1">
            <p className="text-xs font-bold text-[#6D5EF8] uppercase tracking-widest mb-2">Our Team</p>
            <h2 className="text-2xl font-black text-[#111827] mb-3">The Person Behind QuickTool</h2>
            <p className="text-[#6B7280] text-sm leading-relaxed mb-8">
              Building QuickTool to make AI accessible for everyone.
            </p>

            {/* Single Founder Card */}
            <div className="flex flex-col items-center bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm max-w-[280px]">
              <div className="relative mb-5">
                {/* ⬇️ Replace src with your own image URL */}
                <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-[#EEF2FF] shadow-md bg-[#EEF2FF] flex items-center justify-center">
                  <Image
                    src="https://pub-68a98c57e70a4a1fa317739dd20098b9.r2.dev/a5359b80-0e75-4262-8bb7-0f74c171fd8e.png"
                    width={160}
                    height={160}
                    alt="Founder"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-1 right-1 w-10 h-10 bg-[#6D5EF8] rounded-full flex items-center justify-center shadow-sm border-4 border-white">
                  <Zap className="w-5 h-5 text-white fill-white" />
                </div>
              </div>
              <h3 className="font-bold text-[#111827] text-base mb-0.5">Shaik Jainoddin</h3>
              <p className="text-xs text-[#6D5EF8] font-semibold mb-3">Founder</p>
              <div className="flex items-center gap-2">
                <a href="https://www.linkedin.com/in/sk-jainoddin-699060250/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#EEF2FF] text-[#6D5EF8] flex items-center justify-center hover:bg-[#6D5EF8] hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                </a>
                <a href="https://wa.me/917989015462" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#EEF2FF] text-[#6D5EF8] flex items-center justify-center hover:bg-[#6D5EF8] hover:text-white transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
                </a>
                <a href="mailto:shaikjainoddin16@gmail.com" className="w-8 h-8 rounded-full bg-[#EEF2FF] text-[#6D5EF8] flex items-center justify-center hover:bg-[#6D5EF8] hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            <button className="mt-6 inline-flex items-center gap-2 px-4 py-2 border border-[#E5E7EB] bg-white text-[#374151] text-sm font-semibold rounded-xl hover:bg-[#F9FAFB] transition-colors">
              <Users className="w-4 h-4 text-[#6D5EF8]" /> Meet the Full Team
            </button>
          </div>

          {/* Values (middle) */}
          <div className="lg:col-span-1">
            <p className="text-xs font-bold text-[#6D5EF8] uppercase tracking-widest mb-2">Our Values</p>
            <div className="space-y-4 mt-8">
              {values.map((val) => {
                const Icon = val.icon;
                return (
                  <div key={val.title} className="flex gap-4 bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-sm">
                    <div className={`w-10 h-10 rounded-xl ${val.color} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 ${val.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#111827] mb-0.5">{val.title}</h3>
                      <p className="text-xs text-[#6B7280] leading-relaxed">{val.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Card (right) */}
          <div className="lg:col-span-1">
            <div className="bg-[#6D5EF8] rounded-2xl p-6 text-white flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              <h2 className="text-2xl font-black mb-2 relative z-10">Start Creating with QuickTool</h2>
              <p className="text-white/80 text-sm leading-relaxed mb-6 relative z-10">
                Start using our AI tools today and experience the future of productivity.
              </p>
              <button className="w-full bg-white text-[#6D5EF8] font-bold py-3 rounded-xl hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-center gap-2 mb-6 relative z-10">
                <Zap className="w-4 h-4 fill-[#6D5EF8]" /> Sign Up for Free
              </button>
              <ul className="space-y-2 mb-6 relative z-10">
                {['Free to get started', 'No credit card required', 'Access to 100+ AI tools'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-white/90">
                    <Check className="w-4 h-4 text-white shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── CONTACT BAR ── */}
        <section className="bg-white border border-[#E5E7EB] rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#EEF2FF] rounded-xl flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-[#6D5EF8]" />
            </div>
            <div>
              <p className="font-bold text-[#111827] text-sm">Have questions or want to work with us?</p>
              <p className="text-xs text-[#6B7280]">We'd love to hear from you.</p>
            </div>
          </div>
          <Link href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-[#E5E7EB] text-[#374151] font-semibold text-sm rounded-xl hover:bg-[#F9FAFB] transition-colors whitespace-nowrap">
            Contact Us <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

      </div>
    </div>
  );
}
