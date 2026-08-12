import React from 'react';
import Link from 'next/link';
import { ArrowRight, LibraryBig } from 'lucide-react';

export default function PromptModelSelector({ counts = [], totalPrompts = 0 }: { counts?: Array<{ name: string; count: number }>; totalPrompts?: number }) {
  const courseIcons: Record<string, string> = {
    ChatGPT: 'https://pub-0a928134dcdc420da2af02e6238ef06b.r2.dev/ChatGPT%20Image%20Aug%206%2C%202026%2C%2001_14_25%20PM.png',
    Claude: 'https://pub-0a928134dcdc420da2af02e6238ef06b.r2.dev/ChatGPT%20Image%20Aug%206%2C%202026%2C%2001_24_40%20PM.png',
    Gemini: 'https://pub-0a928134dcdc420da2af02e6238ef06b.r2.dev/ChatGPT%20Image%20Aug%206%2C%202026%2C%2001_34_48%20PM.png',
  };
  const iconFor = (name: string) => courseIcons[name] || `/learn-logos/${name.toLowerCase()}.svg`;
  const models = counts.length ? counts.map(item => ({ name: item.name, slug: item.name.toLowerCase(), icon: iconFor(item.name), count: item.count })) : [];

  return (
    <section className="w-full bg-[#EEF2FF] py-10 sm:py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 mb-7">
          <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 mb-1.5">Choose your AI</p><h2 className="text-2xl sm:text-3xl font-black text-[#111827]">Browse by AI Model</h2></div>
          <Link href="/prompts/models" className="text-indigo-600 font-semibold flex items-center gap-1 hover:text-indigo-700 transition mt-2 sm:mt-0 text-sm">
            View all models <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {!models.length && <p className="text-sm text-gray-500">No published model prompts yet.</p>}
          {models.map((model) => (
            <Link 
              key={model.slug} 
              href={`/prompts/${model.slug}`}
              className="min-w-0 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 bg-white px-4 sm:px-5 py-5 rounded-2xl shadow-sm border border-white hover:shadow-md hover:border-indigo-200 hover:-translate-y-0.5 transition-all group"
            >
              <div className="w-12 h-12 flex items-center justify-center shrink-0 rounded-xl overflow-hidden shadow-md bg-white">
                <img 
                  src={model.icon} 
                  alt={model.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform" 
                />
              </div>
              <div>
                <div className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-0.5">{model.name}</div>
                <div className="text-xs text-gray-500">{model.count} compatible prompts</div>
              </div>
            </Link>
          ))}
          <Link href="/prompts/all" className="min-w-0 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 bg-[#111827] px-4 sm:px-5 py-5 rounded-2xl shadow-sm border border-slate-700 hover:-translate-y-0.5 hover:shadow-lg transition-all group">
            <div className="w-12 h-12 flex items-center justify-center shrink-0 rounded-xl bg-indigo-500 text-white"><LibraryBig className="w-6 h-6" /></div>
            <div><div className="font-bold text-white mb-0.5">Browse All Prompts</div><div className="text-xs text-slate-300">{totalPrompts || '300+'} published prompts</div></div>
          </Link>
        </div>
      </div>
    </section>
  );
}
