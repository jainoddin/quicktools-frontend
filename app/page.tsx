import React from 'react';
import {
  Search, Zap, Image as ImageIcon, PenTool, Video, Code,
  Briefcase, Palette, Mic, LayoutGrid, Star, Check, ArrowRight,
  RefreshCcw, Shield, Sparkles, Copy, Download, Clock,
  LockKeyhole, PlayCircle, CheckCircle2, Crown, Gift, Building2
} from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import HomeSearch from '../components/home/HomeSearch';
import LatestBlogs from '../components/home/LatestBlogs';
import LatestArticles from '../components/home/LatestArticles';
import LatestNews from '../components/home/LatestNews';
import LatestCommunity from '../components/home/LatestCommunity';
import FaqSection from '../components/home/FaqSection';
import HomeLearn from '../components/home/HomeLearn';
import { Metadata } from 'next';
import { allTools, IconMap } from '../lib/toolsData';

export const revalidate = 0;

export const metadata: Metadata = {
  title: '100+ AI Tools for Writing, Coding & Productivity | QuickTools',
  description: 'Explore 100+ AI tools for writing, coding, image generation, business, and productivity. Find the best AI tools with QuickTools.',
  alternates: {
    canonical: 'https://quicktool.space',
  },
  keywords: [
    'AI tools', 'Best AI tools', 'Free AI tools', 'AI productivity', 'AI writing',
    'AI image generator', 'AI code generator', 'AI business tools', 'AI marketing tools',
    'AI automation', 'Prompt engineering', 'Developer tools', 'AI for students',
    'AI for freelancers', 'AI for creators', 'QuickTools', 'AI software', 'AI platform', '100+ AI tools'
  ],
};

export default function HomePage() {
  return (
    <div className="flex-grow bg-[#F8FAFC] text-[#111827] font-sans selection:bg-[#4F46E5] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "name": "QuickTools.ai",
                "url": "https://quicktool.space",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://quicktool.space/tools?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              },
              {
                "@type": "Organization",
                "name": "QuickTools",
                "url": "https://quicktool.space",
                "logo": "https://quicktool.space/logo.png"
              },
              {
                "@type": "SoftwareApplication",
                "name": "QuickTools",
                "applicationCategory": "BusinessApplication",
                "operatingSystem": "WebBrowser",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD"
                }
              }
            ]
          })
        }}
      />

      {/* Hero */}
      <header className="relative w-full bg-[#0B0F19] pt-8 pb-10 lg:pt-10 lg:pb-12 overflow-hidden border-b border-indigo-500/20 shadow-[0_20px_50px_rgba(79,70,229,0.15)]">
        {/* Background Glows */}
        <div className="absolute top-0 right-1/4 -z-10 w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-[#6D5EF8]/30 rounded-full blur-[100px] opacity-60"></div>
        <div className="absolute bottom-0 left-0 -z-10 w-[400px] lg:w-[700px] h-[400px] lg:h-[700px] bg-[#3B82F6]/20 rounded-full blur-[120px] opacity-40 translate-y-1/2"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 items-center">
            {/* Left Content */}
            <div className="max-w-2xl relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-[13px] font-semibold mb-3 backdrop-blur-sm shadow-[0_0_15px_rgba(79,70,229,0.3)]">
                <Sparkles className="w-3.5 h-3.5 text-indigo-300" /> 100+ AI tools. One workspace.
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-black leading-[1.1] mb-3 tracking-tight text-white drop-shadow-lg">
                100+ AI Tools. <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6D5EF8] to-[#3B82F6] animate-pulse">
                  One Workspace.
                </span>
              </h1>
              <p className="text-[15px] sm:text-base text-gray-300 mb-4 leading-relaxed font-medium">
                Write content, plan a business, generate images, understand code, and finish everyday work from one affordable AI platform built for creators, students, freelancers, and teams.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 relative z-50">
                <Link href="/tools" className="bg-gradient-to-r from-[#6D5EF8] to-[#3B82F6] hover:from-[#5B4DF5] hover:to-[#2563EB] text-white font-bold px-6 py-2.5 rounded-xl shadow-lg hover:shadow-indigo-500/25 transition-all text-center flex items-center justify-center gap-2 text-sm">
                  Explore 100+ Tools <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/pricing" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-2.5 rounded-xl backdrop-blur-md transition-all text-center text-sm">
                  View Plans
                </Link>
              </div>

              <div className="mt-3 max-w-xl">
                <Suspense fallback={<div className="h-12 rounded-xl bg-white/10 animate-pulse" />}>
                  <HomeSearch />
                </Suspense>
              </div>

              {/* Popular Searches */}
              <div className="flex flex-wrap items-center gap-2 mt-3 text-[11px] sm:text-xs">
                <span className="text-gray-400 font-medium mr-1">Trending:</span>
                {['AI Writer', 'Image Generator', 'Business Plan', 'Code Generator'].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 text-gray-300 rounded-full hover:bg-white/10 hover:border-indigo-500/50 hover:text-white transition-all backdrop-blur-md">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:items-center gap-4 sm:gap-8 border-t border-white/10 pt-4 mt-4">
                <div>
                  <div className="flex items-center gap-1.5 font-black text-lg text-white"><LayoutGrid className="w-4 h-4 text-indigo-400" /> 100+</div>
                  <div className="text-[12px] font-medium text-gray-400 mt-0.5">AI & Utility Tools</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-black text-lg text-white"><Shield className="w-4 h-4 text-indigo-400" /> Secure</div>
                  <div className="text-[12px] font-medium text-gray-400 mt-0.5">No Card Required</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-black text-lg text-white"><RefreshCcw className="w-4 h-4 text-indigo-400" /> Growing</div>
                  <div className="text-[12px] font-medium text-gray-400 mt-0.5">New Tools & Updates</div>
                </div>
              </div>
            </div>

            {/* Product demo preview */}
            <div className="relative hidden md:block max-w-md mx-auto w-full">
              <div className="absolute -inset-6 bg-indigo-500/20 blur-3xl rounded-full" />
              <div className="relative rounded-[20px] border border-white/15 bg-[#111827]/90 p-2 shadow-2xl shadow-indigo-950/50 backdrop-blur-xl rotate-[1deg] hover:rotate-0 transition-transform duration-500">
                <div className="rounded-xl border border-white/10 bg-[#0D1320] overflow-hidden">
                  <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-white"><Sparkles className="w-3.5 h-3.5 text-indigo-400" /> AI Business Plan</div>
                    <div className="flex gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-400" /><span className="w-1.5 h-1.5 rounded-full bg-amber-400" /><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /></div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1.5">Your prompt</p>
                      <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-xs leading-5 text-gray-300">Create a launch plan for an affordable productivity app for freelance designers.</div>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-indigo-300">
                      <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500" /></span>
                      Generating a structured result...
                    </div>
                    <div className="rounded-xl bg-white p-3.5 shadow-xl">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1.5 font-bold text-gray-900 text-xs"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Launch strategy ready</div>
                        <div className="flex gap-1.5 text-gray-400"><Copy className="w-3.5 h-3.5" /><Download className="w-3.5 h-3.5" /></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 w-full rounded-full bg-indigo-100" /><div className="h-2 w-5/6 rounded-full bg-gray-100" /><div className="h-2 w-4/6 rounded-full bg-gray-100" />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-semibold text-gray-400">
                      <div className="rounded-lg bg-white/5 p-2"><Clock className="w-3.5 h-3.5 mx-auto mb-1 text-blue-400" />Fast</div>
                      <div className="rounded-lg bg-white/5 p-2"><LockKeyhole className="w-3.5 h-3.5 mx-auto mb-1 text-emerald-400" />Private</div>
                      <div className="rounded-lg bg-white/5 p-2"><Download className="w-3.5 h-3.5 mx-auto mb-1 text-violet-400" />Export</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2.5 Top 5 Flagship Tools */}
      <section className="relative w-full bg-white py-16 border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Popular AI Tools</h2>
            <p className="text-gray-500">Start with focused tools for writing, planning, research, and everyday work.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { id: 'ai-pitch-deck', name: 'AI Pitch Deck', icon: Briefcase, desc: 'Win investors over', color: 'from-blue-500 to-indigo-500' },
              { id: 'ai-swot-analysis', name: 'SWOT Analysis', icon: Check, desc: 'Know your strengths', color: 'from-purple-500 to-pink-500' },
              { id: 'ai-competitor-analysis', name: 'Competitor Intel', icon: Search, desc: 'Beat the market', color: 'from-orange-400 to-red-500' },
              { id: 'ai-business-model', name: 'Business Model', icon: LayoutGrid, desc: 'Map your strategy', color: 'from-green-400 to-emerald-600' },
              { id: 'ai-sales-funnel', name: 'Sales Funnel', icon: Zap, desc: 'Convert more leads', color: 'from-cyan-400 to-blue-500' },
            ].map((tool, i) => (
              <Link href={`/tools/${tool.id}`} key={i} className="group relative bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 transition-all hover:-translate-y-2 overflow-hidden shadow-sm hover:shadow-lg">
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-white mb-4 shadow-sm`}>
                  <tool.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{tool.name}</h3>
                <p className="text-sm text-gray-500">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Secondary Nav / Category Icons */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-12">
          {[
            { icon: ImageIcon, label: 'Image Tools', slug: '/tools?c=AI Image', color: 'text-blue-500' },
            { icon: PenTool, label: 'Writing Tools', slug: '/tools?c=AI Writer', color: 'text-green-500' },
            { icon: Video, label: 'Video Tools', slug: '/tools?c=AI Video', color: 'text-pink-500' },
            { icon: Code, label: 'Code Tools', slug: '/tools?c=AI Code', color: 'text-purple-500' },
            { icon: Search, label: 'SEO Tools', slug: '/tools?c=SEO', color: 'text-orange-500' },
            { icon: Briefcase, label: 'Business', slug: '/tools?c=Business', color: 'text-teal-500' },
            { icon: Palette, label: 'Design', slug: '/tools?c=Design', color: 'text-rose-500' },
            { icon: Mic, label: 'AI Chat', slug: '/tools?c=AI Chat', color: 'text-emerald-500' },
            { icon: LayoutGrid, label: 'View All', slug: '/tools', color: 'text-gray-500' },
          ].map((item, i) => (
            <Link href={item.slug} key={i} className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center group-hover:-translate-y-1 group-hover:shadow-md transition-all duration-200">
                <item.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${item.color}`} />
              </div>
              <span className="text-[10px] sm:text-xs font-medium text-[#6B7280] group-hover:text-[#111827]">{item.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Latest AI Tools Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex justify-between items-end mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-[#111827]">Latest AI Tools</h2>
          <Link href="/tools" className="text-sm font-semibold text-[#4F46E5] hover:text-[#4338CA] flex items-center gap-1">View All Tools <ArrowRight className="w-4 h-4" /></Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {[...allTools]
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 5)
            .map((tool, i) => {
              const Icon = IconMap[tool.iconName] || LayoutGrid;
              return (
                <Link href={tool.slug} key={i} className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col items-center text-center group cursor-pointer">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${tool.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="font-bold text-[#111827] text-sm sm:text-base mb-2">{tool.name}</h3>
                  <p className="text-xs text-[#6B7280] mb-6 flex-grow">{tool.description}</p>
                  <div className="text-sm font-semibold text-[#4F46E5] border border-transparent group-hover:border-[#4F46E5] group-hover:bg-indigo-50 w-full py-2 rounded-lg transition-all flex justify-center items-center gap-1">
                    Try Now <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
        </div>
      </section>

      {/* 4.5 Learn Section */}
      <Suspense fallback={<div>Loading Courses...</div>}>
        <HomeLearn />
      </Suspense>

      {/* 5. Why Choose QuickTools.ai? */}
      <section className="w-full bg-white border-y border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h2 className="text-xl sm:text-2xl font-bold text-[#111827] mb-8 sm:mb-10">Why Choose QuickTools.ai?</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {[
              { icon: LayoutGrid, title: '100+ Total Tools', desc: 'AI and everyday utilities in one platform', color: 'text-indigo-600', bg: 'bg-indigo-100' },
              { icon: Zap, title: 'Easy to Use', desc: 'Simple interface, powerful results', color: 'text-emerald-600', bg: 'bg-emerald-100' },
              { icon: Check, title: 'Save Time', desc: 'Complete tasks in seconds, not hours', color: 'text-blue-600', bg: 'bg-blue-100' },
              { icon: Briefcase, title: 'Secure & Private', desc: 'Your data is safe and encrypted', color: 'text-orange-600', bg: 'bg-orange-100' },
              { icon: Star, title: 'Affordable Pricing', desc: 'Premium tools at the best prices', color: 'text-pink-600', bg: 'bg-pink-100' },
              { icon: RefreshCcw, title: 'Regular Updates', desc: 'New models added regularly', color: 'text-purple-600', bg: 'bg-purple-100' },
            ].map((feature, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${feature.color}`} />
                </div>
                <h3 className="font-bold text-sm text-[#111827] mb-2">{feature.title}</h3>
                <p className="text-xs text-[#6B7280]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="rounded-[32px] bg-[#0B0F19] px-6 py-10 sm:p-12 lg:p-16 overflow-hidden relative">
          <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-indigo-600/25 blur-3xl" />
          <div className="relative text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-[0.22em] text-indigo-400">From idea to result</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-3 mb-4">Useful AI without the learning curve</h2>
            <p className="text-gray-400">Choose a tool, describe what you need, and turn the result into something you can use immediately.</p>
          </div>
          <div className="relative grid md:grid-cols-3 gap-5">
            {[
              { step: '01', icon: LayoutGrid, title: 'Choose your tool', desc: 'Browse writing, image, code, business, marketing, and productivity tools.' },
              { step: '02', icon: PlayCircle, title: 'Add your details', desc: 'Use a focused form instead of learning complicated prompts or workflows.' },
              { step: '03', icon: Download, title: 'Use your result', desc: 'Copy, download, save, or refine your output from the same workspace.' },
            ].map((item) => (
              <div key={item.step} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6"><div className="w-11 h-11 rounded-xl bg-indigo-500/15 text-indigo-300 flex items-center justify-center"><item.icon className="w-5 h-5" /></div><span className="text-3xl font-black text-white/10">{item.step}</span></div>
                <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
                <p className="text-sm leading-6 text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="w-full bg-white border-t border-gray-100" id="pricing-preview">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-[0.22em] text-[#6D5EF8]">Simple pricing</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#111827] mt-3 mb-4">Start free. Upgrade when you need more.</h2>
            <p className="text-[#6B7280]">See the cost before you sign up. No card is required to explore the free experience.</p>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 items-stretch">
            {[
              { name: 'Free Starter', icon: Gift, description: 'Try QuickTools completely free', originalPrice: '', price: '₹0', period: 'forever', features: ['3 Free Generations / day', 'Standard Tools Access', 'Basic AI Background Remover'], button: 'Start for Free', featured: false },
              { name: 'Pro Monthly', icon: Zap, description: 'Perfect for regular users', originalPrice: '₹599/month', price: '₹299', period: 'month', features: ['500 Credits / month', 'HD Image Generation', 'All Premium Tools Access', 'Faster Processing'], button: 'Get Pro Monthly', featured: false },
              { name: 'Pro', icon: Crown, description: 'For professionals and creators', originalPrice: '₹4,788/year', price: '₹3,588', period: 'year', features: ['14,400 Credits / year', 'HD Image Generation', 'Fast Processing', 'Priority Support'], button: 'Get Pro', featured: true },
              { name: 'Business', icon: Building2, description: 'For teams and power users', originalPrice: '₹9,588/year', price: '₹6,000', period: 'year', features: ['18,000 Credits / year', 'Team Members (Up to 5)', 'API Access', 'Admin Dashboard'], button: 'Contact Sales', featured: false },
            ].map((plan) => (
              <div key={plan.name} className={`relative rounded-3xl bg-white p-7 flex flex-col text-[#111827] shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl ${plan.featured ? 'border-2 border-amber-400 shadow-amber-100' : 'border border-gray-200'}`}>
                {plan.featured && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-500 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">Most Popular</span>}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${plan.featured ? 'bg-amber-50 text-amber-500' : 'bg-indigo-50 text-[#6D5EF8]'}`}><plan.icon className="w-6 h-6" /></div>
                <h3 className="text-xl font-black mb-1">{plan.name}</h3>
                <p className="text-sm text-gray-500 min-h-10 mb-5">{plan.description}</p>
                <div className="mb-6 min-h-16">
                  {plan.originalPrice && <span className="block text-xs font-semibold text-gray-400 line-through mb-1">{plan.originalPrice}</span>}
                  <span className="text-4xl font-black">{plan.price}</span><span className="text-sm text-gray-500">/{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-7 flex-grow">
                  {plan.features.map(feature => <li key={feature} className="flex items-start gap-2 text-sm text-gray-600"><CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${plan.featured ? 'text-amber-500' : 'text-[#6D5EF8]'}`} />{feature}</li>)}
                </ul>
                <Link href="/pricing" className={`rounded-xl px-5 py-3 text-center text-sm font-bold transition-colors ${plan.featured ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-md' : 'border border-indigo-100 hover:bg-indigo-50 text-[#5B4DF5]'}`}>{plan.button}</Link>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-500 mt-6">Pricing and included credits are shown before checkout. Cancel paid plans from your account.</p>
        </div>
      </section>
      {/* 5. Latest Content & Community */}
      <LatestCommunity />
      <LatestBlogs />
      <LatestArticles />
      <LatestNews />

      {/* 7. CTA Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="bg-gradient-to-r from-[#6366F1] to-[#4F46E5] rounded-3xl p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between text-white relative overflow-hidden shadow-xl shadow-indigo-500/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 z-10 mb-8 md:mb-0">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 shrink-0">
              <Zap className="w-8 h-8 text-white fill-white" />
            </div>
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-2">Ready to Supercharge Your Productivity?</h2>
              <p className="text-indigo-100 text-sm sm:text-base">Explore writing, design, business, code, and productivity tools in one workspace.</p>
            </div>
          </div>
          <Link href="/tools" className="bg-white text-[#4F46E5] font-bold px-6 py-3.5 rounded-xl hover:bg-gray-50 transition-colors z-10 flex items-center justify-center gap-2 whitespace-nowrap shadow-md w-full md:w-auto">
            Get Started — It&apos;s Free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 8. FAQ Section */}
      <FaqSection />


    </div>
  );
}
