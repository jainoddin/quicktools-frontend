import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function PromptModelSelector({ counts = [] }: { counts?: Array<{ name: string; count: number }> }) {
  const courseIcons: Record<string, string> = {
    ChatGPT: 'https://pub-0a928134dcdc420da2af02e6238ef06b.r2.dev/ChatGPT%20Image%20Aug%206%2C%202026%2C%2001_14_25%20PM.png',
    Claude: 'https://pub-0a928134dcdc420da2af02e6238ef06b.r2.dev/ChatGPT%20Image%20Aug%206%2C%202026%2C%2001_24_40%20PM.png',
    Gemini: 'https://pub-0a928134dcdc420da2af02e6238ef06b.r2.dev/ChatGPT%20Image%20Aug%206%2C%202026%2C%2001_34_48%20PM.png',
  };
  const iconFor = (name: string) => courseIcons[name] || `/learn-logos/${name.toLowerCase()}.svg`;
  const models = counts.length ? counts.map(item => ({ name: item.name, slug: item.name.toLowerCase(), icon: iconFor(item.name), count: item.count })) : [];

  return (
    <section className="w-full bg-[#F8FAFC] py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-[#111827]">Browse by AI Model</h2>
          <Link href="/prompts" className="text-indigo-600 font-semibold flex items-center gap-1 hover:text-indigo-700 transition mt-2 sm:mt-0 text-sm">
            View all models <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="flex overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 gap-6 snap-x scrollbar-hide">
          {!models.length && <p className="text-sm text-gray-500">No published model prompts yet.</p>}
          {models.map((model) => (
            <Link 
              key={model.slug} 
              href={`/prompts/${model.slug}`}
              className="snap-start shrink-0 w-[240px] flex items-center gap-4 bg-white px-6 py-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-100 transition-all group"
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
                <div className="text-xs text-gray-500">{model.count} Prompts</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
