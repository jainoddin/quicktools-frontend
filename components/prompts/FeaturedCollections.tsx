import React from 'react';
import Link from 'next/link';
import { ArrowRight, BriefcaseBusiness, Megaphone, PenLine, SearchCheck, Code2 } from 'lucide-react';

const collections = [
  {
    title: 'Business Prompts Collection',
    count: 25,
    icon: BriefcaseBusiness,
    iconStyle: 'bg-blue-50 text-blue-600',
    href: '/prompts/category/business'
  },
  {
    title: 'Marketing Prompts Collection',
    count: 18,
    icon: Megaphone,
    iconStyle: 'bg-orange-50 text-orange-600',
    href: '/prompts/category/marketing'
  },
  {
    title: 'Content Creation Collection',
    count: 22,
    icon: PenLine,
    iconStyle: 'bg-violet-50 text-violet-600',
    href: '/prompts/category/writing'
  },
  {
    title: 'SEO Prompts Collection',
    count: 15,
    icon: SearchCheck,
    iconStyle: 'bg-emerald-50 text-emerald-600',
    href: '/prompts/category/seo'
  },
  {
    title: 'Coding Prompts Collection',
    count: 20,
    icon: Code2,
    iconStyle: 'bg-cyan-50 text-cyan-700',
    href: '/prompts/category/coding'
  }
];

export default function FeaturedCollections({ counts = [] }: { counts?: Array<{ name: string; count: number }> }) {
  const countMap = new Map(counts.map(item => [item.name.toLowerCase(), item.count]));
  return (
    <section id="collections" className="w-full bg-[#F8FAFC] py-12 scroll-mt-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-[#111827]">Featured Collections</h2>
          <Link href="/prompts/categories" className="text-indigo-600 font-semibold flex items-center gap-1 hover:text-indigo-700 transition mt-2 sm:mt-0 text-sm">
            View all collections <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="flex overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 gap-6 snap-x scrollbar-hide">
          {collections.map((collection, index) => {
            const Icon = collection.icon;
            return (
            <Link 
              key={index} 
              href={collection.href}
              className="snap-start shrink-0 w-[280px] bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4 group"
            >
              <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${collection.iconStyle}`}>
                <Icon className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-gray-900 leading-tight mb-1">{collection.title}</h3>
                <p className="text-xs text-gray-500">{countMap.get(collection.href.split('/').pop() || '') ?? collection.count} Prompts</p>
              </div>
            </Link>
          )})}
        </div>
      </div>
    </section>
  );
}
