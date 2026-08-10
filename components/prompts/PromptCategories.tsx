import React from 'react';
import Link from 'next/link';
import { PenTool, Code, Megaphone, Briefcase, TrendingUp, Video, Camera, GraduationCap, ArrowRight } from 'lucide-react';
import { promptCategoryToSlug } from '../../lib/promptSlugs';

export default function PromptCategories({ counts = [] }: { counts?: Array<{ name: string; count: number }> }) {
  const iconMap: Record<string, any> = { Writing: PenTool, Coding: Code, Marketing: Megaphone, Business: Briefcase, SEO: TrendingUp, YouTube: Video, Instagram: Camera };
  const colors = ['text-indigo-600','text-emerald-500','text-orange-500','text-blue-500','text-amber-500','text-red-500','text-pink-500'];
  const categories = counts.map((item, index) => ({ name: item.name, slug: promptCategoryToSlug(item.name), icon: iconMap[item.name] || GraduationCap, color: colors[index % colors.length], count: item.count }));

  return (
    <section className="w-full bg-white py-12" id="categories">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-[#111827]">Browse by Category</h2>
          <Link href="/prompts/categories" className="text-indigo-600 font-semibold flex items-center gap-1 hover:text-indigo-700 transition mt-2 sm:mt-0 text-sm">
            View all categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="flex flex-wrap gap-4">
          {categories.map((cat) => (
            <Link 
              key={cat.slug} 
              href={`/prompts/category/${cat.slug}`}
              className="flex items-center gap-3 bg-white px-5 py-3 rounded-full shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-100 hover:-translate-y-0.5 transition-all group"
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
            className="flex items-center gap-3 bg-indigo-50 px-5 py-3 rounded-full border border-indigo-100 hover:bg-indigo-100 transition-all group"
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
