import React from 'react';
import Link from 'next/link';
import { PenTool, Code, Megaphone, Briefcase, TrendingUp, Video, Camera, GraduationCap, ArrowRight } from 'lucide-react';
import { promptCategoryToSlug } from '../../lib/promptSlugs';

export default function PromptCategories({ counts = [] }: { counts?: Array<{ name: string; count: number }> }) {
  const iconMap: Record<string, any> = { Writing: PenTool, Coding: Code, Marketing: Megaphone, Business: Briefcase, SEO: TrendingUp, YouTube: Video, Instagram: Camera };
  const colors = ['text-indigo-600','text-emerald-500','text-orange-500','text-blue-500','text-amber-500','text-red-500','text-pink-500'];
  const categories = counts.map((item, index) => ({ name: item.name, slug: promptCategoryToSlug(item.name), icon: iconMap[item.name] || GraduationCap, color: colors[index % colors.length], count: item.count }));

  return (
    <section className="w-full bg-white py-10 sm:py-12" id="categories">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 mb-7">
          <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 mb-1.5">Find your workflow</p><h2 className="text-2xl sm:text-3xl font-black text-[#111827]">Browse by Category</h2></div>
          <Link href="/prompts/categories" className="text-indigo-600 font-semibold flex items-center gap-1 hover:text-indigo-700 transition mt-2 sm:mt-0 text-sm">
            View all categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <Link 
              key={cat.slug} 
              href={`/prompts/category/${cat.slug}`}
              className="min-w-0 flex items-center gap-3 bg-slate-50 px-4 py-3.5 rounded-2xl border border-slate-200 hover:bg-white hover:shadow-md hover:border-indigo-200 hover:-translate-y-0.5 transition-all group"
            >
              <cat.icon className={`w-5 h-5 ${cat.color} group-hover:scale-110 transition-transform`} />
              <div>
                <span className="block font-bold text-gray-900 group-hover:text-indigo-600 transition-colors leading-none text-sm mb-0.5">{cat.name}</span>
                <span className="block text-[10px] font-medium text-gray-400">{cat.count} Prompts</span>
              </div>
            </Link>
          ))}

          {categories.length > 7 && <Link 
            href={`/prompts/categories`}
            className="min-w-0 flex items-center gap-3 bg-indigo-50 px-4 py-3.5 rounded-2xl border border-indigo-100 hover:bg-indigo-100 hover:-translate-y-0.5 transition-all group"
          >
            <GraduationCap className="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform" />
            <div>
              <span className="block font-bold text-indigo-900 leading-none text-sm mb-0.5">More</span>
              <span className="block text-[10px] font-medium text-indigo-500">10+ Categories +</span>
            </div>
          </Link>}
        </div>
      </div>
    </section>
  );
}
