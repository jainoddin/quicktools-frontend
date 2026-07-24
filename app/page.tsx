import React from 'react';
import Image from 'next/image';
import {
  Search, Moon, Zap, Image as ImageIcon, PenTool, Video, Code,
  Briefcase, Palette, Mic, LayoutGrid, Star, Check, ArrowRight,
  RefreshCcw, ChevronDown, Globe, Mail, MessageCircle, Share2
} from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import HomeSearch from '../components/home/HomeSearch';
import LatestBlogs from '../components/home/LatestBlogs';
import LatestArticles from '../components/home/LatestArticles';
import LatestNews from '../components/home/LatestNews';
import FaqSection from '../components/home/FaqSection';
import { Metadata } from 'next';
import { allTools, IconMap } from '../lib/toolsData';

export const revalidate = 0;

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://quicktool.space',
  },
};

export default function HomePage() {
  const freeToolsCount = allTools.filter(t => t.tag?.type === 'free').length;
  const premiumToolsCount = allTools.length - freeToolsCount;

  return (
    <div className="flex-grow bg-[#F8FAFC] text-[#111827] font-sans selection:bg-[#4F46E5] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "QuickTools.ai",
            "url": "https://quicktool.space",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://quicktool.space/tools?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />

      {/* 2. Hero Section (WOW FACTOR - DARK/NEON) */}
      <header className="relative w-full bg-[#0B0F19] pt-16 pb-20 lg:pt-24 lg:pb-32 overflow-hidden border-b border-indigo-500/20 shadow-[0_20px_50px_rgba(79,70,229,0.15)]">
        {/* Background Glows */}
        <div className="absolute top-0 right-1/4 -z-10 w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] bg-[#6D5EF8]/30 rounded-full blur-[100px] opacity-60"></div>
        <div className="absolute bottom-0 left-0 -z-10 w-[500px] lg:w-[800px] h-[500px] lg:h-[800px] bg-[#3B82F6]/20 rounded-full blur-[120px] opacity-40 translate-y-1/2"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="max-w-2xl relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-sm font-semibold mb-8 backdrop-blur-sm shadow-[0_0_15px_rgba(79,70,229,0.3)]">
                <Zap className="w-4 h-4 fill-indigo-400 text-indigo-400" /> 🏆 The #1 AI Business Planner for India
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-black leading-[1.1] mb-6 tracking-tight text-white drop-shadow-lg">
                AI Business Plan Generator <br className="hidden lg:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6D5EF8] to-[#3B82F6] animate-pulse">
                  For Indian Startups.
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 mb-10 leading-relaxed font-medium">
                Generate investor-ready business plans, financial projections, and Udyam-compliant documents in seconds. Stop paying consultants ₹5000+ for what AI can do instantly.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 relative z-50">
                <Link href="/tools/ai-business-plan" className="bg-gradient-to-r from-[#6D5EF8] to-[#3B82F6] hover:from-[#5B4DF5] hover:to-[#2563EB] text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-indigo-500/25 transition-all text-center">
                  Create Free Business Plan
                </Link>
                <Link href="/tools" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-4 rounded-xl backdrop-blur-md transition-all text-center">
                  Explore 100+ Free Tools
                </Link>
              </div>

              {/* Popular Searches */}
              <div className="flex flex-wrap items-center gap-3 mt-8 text-xs sm:text-sm">
                <span className="text-gray-400 font-medium mr-1">Trending:</span>
                {['Pitch Deck', 'Financial Projections', 'SWOT Analysis', 'Competitor Analysis'].map(tag => (
                  <span key={tag} className="px-4 py-1.5 bg-white/5 border border-white/10 text-gray-300 rounded-full cursor-pointer hover:bg-white/10 hover:border-indigo-500/50 hover:text-white transition-all backdrop-blur-md">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:items-center gap-6 sm:gap-10 border-t border-white/10 pt-10 mt-12">
                <div>
                  <div className="flex items-center gap-2 font-black text-2xl text-white"><LayoutGrid className="w-5 h-5 text-indigo-400"/> {allTools.length}+</div>
                  <div className="text-sm font-medium text-gray-400 mt-1">Total Tools</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 font-black text-2xl text-white"><Check className="w-5 h-5 text-indigo-400" /> 3 Days</div>
                  <div className="text-sm font-medium text-gray-400 mt-1">Free Trial</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 font-black text-2xl text-white"><Star className="w-5 h-5 text-[#F59E0B] fill-[#F59E0B]" /> 5.0/5</div>
                  <div className="text-sm font-medium text-gray-400 mt-1">User Rating</div>
                </div>
              </div>
            </div>

            {/* Right Robot Image & Floating Cards (Dark Theme) */}
            <div className="relative h-[400px] lg:h-[600px] hidden md:block">
              {/* Glowing Rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] lg:w-[500px] lg:h-[500px] rounded-full border border-indigo-500/20 z-0"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] lg:w-[350px] lg:h-[350px] rounded-full border border-blue-500/30 z-0"></div>

              {/* Robot */}
              <Image src="https://pub-68a98c57e70a4a1fa317739dd20098b9.r2.dev/1b9be0e4-c385-49a5-b0b5-ef158e8ef402.png" width={450} height={450} alt="AI Robot" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] lg:w-[450px] z-10 drop-shadow-[0_0_30px_rgba(79,70,229,0.5)] hover:scale-105 transition-transform duration-500" priority />

              {/* Floating Card 1 */}
              <div className="absolute top-[12%] left-[5%] z-20 bg-[#0B0F19]/80 backdrop-blur-xl p-3 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white"><Briefcase className="w-5 h-5" /></div>
                <div>
                  <div className="text-sm font-bold text-white">AI Pitch</div>
                  <div className="text-xs text-gray-400">Deck</div>
                </div>
              </div>

              {/* Floating Card 2 */}
              <div className="absolute bottom-[20%] right-[5%] z-20 bg-[#0B0F19]/80 backdrop-blur-xl p-3 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-3 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white"><Globe className="w-5 h-5" /></div>
                <div>
                  <div className="text-sm font-bold text-white">Financial</div>
                  <div className="text-xs text-gray-400">Projections</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2.5 Top 5 Flagship Tools */}
      <section className="relative w-full bg-[#0B0F19] py-16 border-b border-[#1F2937]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Your Startup Ecosystem</h2>
            <p className="text-gray-400">The most powerful AI utilities to build, pitch, and grow your business.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { id: 'ai-pitch-deck', name: 'AI Pitch Deck', icon: Briefcase, desc: 'Win investors over', color: 'from-blue-500 to-indigo-500' },
              { id: 'ai-swot-analysis', name: 'SWOT Analysis', icon: Check, desc: 'Know your strengths', color: 'from-purple-500 to-pink-500' },
              { id: 'ai-competitor-analysis', name: 'Competitor Intel', icon: Search, desc: 'Beat the market', color: 'from-orange-400 to-red-500' },
              { id: 'ai-business-model', name: 'Business Model', icon: LayoutGrid, desc: 'Map your strategy', color: 'from-green-400 to-emerald-600' },
              { id: 'ai-sales-funnel', name: 'Sales Funnel', icon: Zap, desc: 'Convert more leads', color: 'from-cyan-400 to-blue-500' },
            ].map((tool, i) => (
              <Link href={`/tools/${tool.id}`} key={i} className="group relative bg-[#111827] rounded-2xl p-6 border border-white/5 hover:border-white/20 transition-all hover:-translate-y-2 overflow-hidden shadow-xl">
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                  <tool.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{tool.name}</h3>
                <p className="text-sm text-gray-400">{tool.desc}</p>
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

      {/* 5. Why Choose QuickTools.ai? */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h2 className="text-xl sm:text-2xl font-bold text-[#111827] mb-8 sm:mb-10">Why Choose QuickTools.ai?</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {[
            { icon: LayoutGrid, title: `${allTools.length}+ Total Tools`, desc: 'The most powerful AI tools in one platform', color: 'text-indigo-600', bg: 'bg-indigo-100' },
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
      </section>

      {/* 5. Latest Blogs, Articles & News */}
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
              <p className="text-indigo-100 text-sm sm:text-base">Join thousands of creators who are already getting amazing results with QuickTools.ai</p>
            </div>
          </div>
          <Link href="/tools" className="bg-white text-[#4F46E5] font-bold px-6 py-3.5 rounded-xl hover:bg-gray-50 transition-colors z-10 flex items-center justify-center gap-2 whitespace-nowrap shadow-md w-full md:w-auto">
            Get Started - It's Free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 8. FAQ Section */}
      <FaqSection />


    </div>
  );
}
