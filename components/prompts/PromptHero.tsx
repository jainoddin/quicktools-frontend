import React from 'react';
import Link from 'next/link';
import { Sparkles, LayoutGrid, Zap, Users, Bookmark, ArrowRight } from 'lucide-react';
import PromptSearch from './PromptSearch';

interface PromptHeroProps {
  stats?: {
    prompts: number | null;
    categories: number | null;
    models: number | null;
  };
  featuredPrompt: any | null; 
}

export default function PromptHero({ stats = { prompts: null, categories: null, models: null }, featuredPrompt }: PromptHeroProps) {
  const modelIcons: Record<string, string> = {
    chatgpt: 'https://pub-0a928134dcdc420da2af02e6238ef06b.r2.dev/ChatGPT%20Image%20Aug%206%2C%202026%2C%2001_14_25%20PM.png',
    claude: 'https://pub-0a928134dcdc420da2af02e6238ef06b.r2.dev/ChatGPT%20Image%20Aug%206%2C%202026%2C%2001_24_40%20PM.png',
    gemini: 'https://pub-0a928134dcdc420da2af02e6238ef06b.r2.dev/ChatGPT%20Image%20Aug%206%2C%202026%2C%2001_34_48%20PM.png',
  };
  const featuredModel = String(featuredPrompt?.models?.[0] || 'ChatGPT');
  const featuredHref = featuredPrompt?.slug
    ? `/prompts/${featuredPrompt.models?.[0]?.toLowerCase() || 'chatgpt'}/${featuredPrompt.slug}`
    : '/prompts/generator';
  return (
    <section className="relative w-full bg-[#F8FAFC] pt-12 pb-16 lg:pt-16 lg:pb-20 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-400/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-400/10 rounded-full blur-[100px] translate-y-1/2"></div>
      
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Left Content */}
          <div className="max-w-2xl relative z-10">
            <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-black leading-[1.1] mb-6 tracking-tight text-[#111827]">
              Find the Perfect <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                AI Prompt
              </span> for Any Task
            </h1>
            
            <p className="text-[17px] text-gray-600 mb-8 leading-relaxed max-w-lg">
              Explore 300+ practical prompts for ChatGPT, Claude, and Gemini. Save time, boost productivity, and get better results.
            </p>

            {/* Search Component Wrapper */}
            <div className="max-w-xl mb-6 relative z-50">
               <PromptSearch />
            </div>

            {/* Popular Tags */}
            <div className="flex flex-wrap items-center gap-2 text-xs mb-10">
              <span className="text-gray-900 font-bold mr-1">Popular:</span>
              {['Business Plan', 'Instagram Caption', 'YouTube Script', 'Resume Builder', 'SEO Article'].map(tag => (
                <Link key={tag} href={`/prompts?q=${encodeURIComponent(tag)}`} className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-full hover:border-indigo-200 hover:text-indigo-600 transition-colors shadow-sm font-medium">
                  {tag}
                </Link>
              ))}
            </div>

            {/* Real Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-gray-200">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                    <LayoutGrid className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-xl text-gray-900">{stats.prompts ?? 0}</span>
                </div>
                <span className="text-xs text-gray-500 font-medium ml-10">Published Prompts</span>
              </div>
              
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-xl text-gray-900">{stats.categories ?? 0}</span>
                </div>
                <span className="text-xs text-gray-500 font-medium ml-10">Categories</span>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-xl text-gray-900">{stats.models ?? 0}</span>
                </div>
                <span className="text-xs text-gray-500 font-medium ml-10">AI Models</span>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-xl text-gray-900">Free</span>
                </div>
                <span className="text-xs text-gray-500 font-medium ml-10">Copy & Use</span>
              </div>
            </div>
            
          </div>

          {/* Right Content - Visual Graphic */}
          <div className="relative hidden lg:block w-full h-[500px]">
            {/* Center Card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[320px] bg-white rounded-3xl p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-100">
               <div className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full w-fit mb-4">Featured Prompt</div>
               <h3 className="font-bold text-gray-900 text-lg mb-3 leading-tight">{featuredPrompt?.title || 'Generate a Custom Prompt'}</h3>
               
               <div className="flex gap-2 mb-4">
                 <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-50 border border-gray-100 px-2 py-1 rounded-md">
                   <img src={modelIcons[featuredModel.toLowerCase()] || modelIcons.chatgpt} className="w-4 h-4 rounded object-cover" alt="" /> {featuredModel}
                 </span>
                 <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-50 border border-gray-100 px-2 py-1 rounded-md">
                   Business
                 </span>
               </div>
               
               <p className="text-[13px] text-gray-500 line-clamp-4 leading-relaxed mb-6">
                 {featuredPrompt?.description || 'Act as a business consultant. Create a detailed business plan including executive summary, market analysis, marketing strategy and financial plan.'}
               </p>
               
               <div className="flex items-center gap-3">
                 <Link href={featuredHref} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold py-2.5 rounded-xl transition-colors text-center flex items-center justify-center gap-2">
                   {featuredPrompt ? 'View Prompt' : 'Create Prompt'} <ArrowRight className="w-4 h-4" />
                 </Link>
                 <Link href={featuredHref} aria-label={featuredPrompt ? 'Open prompt to save' : 'Open prompt generator'} title={featuredPrompt ? 'Open prompt to save' : 'Open prompt generator'} className="w-10 h-10 flex items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors">
                   <Bookmark className="w-4 h-4" />
                 </Link>
               </div>
            </div>

            {/* Orbiting Icons */}
            <div className="absolute top-10 left-[10%] z-10 w-14 h-14 bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center animate-bounce" style={{ animationDuration: '3.5s' }}>
              <img src={modelIcons.chatgpt} alt="ChatGPT" className="w-10 h-10 rounded-xl object-cover" />
            </div>
            
            <div className="absolute bottom-16 left-[5%] z-10 w-12 h-12 bg-white rounded-xl shadow-lg border border-gray-100 flex items-center justify-center animate-bounce" style={{ animationDuration: '4.2s', animationDelay: '1s' }}>
              <img src={modelIcons.claude} alt="Claude" className="w-9 h-9 rounded-lg object-cover" />
            </div>

            <div className="absolute top-16 right-[5%] z-10 w-16 h-16 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center animate-bounce" style={{ animationDuration: '3.8s', animationDelay: '0.5s' }}>
              <img src={modelIcons.gemini} alt="Gemini" className="w-12 h-12 rounded-full object-cover" />
            </div>

            {/* Glowing connecting lines placeholder */}
            <svg className="absolute inset-0 w-full h-full -z-0 opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M20,20 Q50,50 80,80" stroke="#4F46E5" strokeWidth="0.5" fill="none" strokeDasharray="2 2" />
              <path d="M80,20 Q50,50 20,80" stroke="#4F46E5" strokeWidth="0.5" fill="none" strokeDasharray="2 2" />
            </svg>
          </div>
          
        </div>
      </div>
    </section>
  );
}
