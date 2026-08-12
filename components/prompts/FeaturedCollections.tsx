import React from 'react';
import Link from 'next/link';
import { ArrowRight, BriefcaseBusiness, Megaphone, PenLine, SearchCheck, Code2 } from 'lucide-react';
import { PROMPT_COLLECTIONS } from '@/lib/promptCollections';

const icons = { business: BriefcaseBusiness, marketing: Megaphone, writing: PenLine, seo: SearchCheck, coding: Code2 };

export default function FeaturedCollections({ counts = [] }: { counts?: Array<{ name: string; count: number }> }) {
  const countMap = new Map(counts.map(item => [item.name.toLowerCase(), item.count]));
  return (
    <section id="collections" className="w-full bg-[#F8FAFC] py-8 sm:py-10 scroll-mt-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 mb-5 sm:mb-7">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 mb-1.5">Browse by workflow</p>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#111827]">Featured Collections</h2>
          </div>
          <Link href="/prompts/categories" className="shrink-0 text-indigo-600 font-semibold flex items-center gap-1 hover:text-indigo-700 transition text-sm">
            View all collections <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 min-[460px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
          {PROMPT_COLLECTIONS.map((collection) => {
            const Icon = icons[collection.slug];
            const href = `/prompts/category/${collection.slug}`;
            return (
            <Link 
              key={collection.slug}
              href={href}
              className="min-w-0 bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-indigo-200 transition-all flex items-center gap-3.5 group"
            >
              <div className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform ${collection.iconStyle}`}>
                <Icon className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-sm text-gray-900 leading-snug mb-0.5">{collection.title}</h3>
                <p className="text-xs text-gray-500">{countMap.get(collection.slug) ?? collection.count} Prompts</p>
              </div>
            </Link>
          )})}
        </div>
      </div>
    </section>
  );
}
