import React from 'react';
import Link from 'next/link';
import { Radio, ArrowUpRight } from 'lucide-react';
import { getEndpoint } from '../../lib/api';

interface NewsItem {
  _id: string;
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
}

export default async function LatestNews() {
  let news: NewsItem[] = [];
  try {
    const res = await fetch(getEndpoint('/api/news?limit=4'), { next: { revalidate: 300 } });
    if (res.ok) {
      const data = await res.json();
      news = data.data || [];
    }
  } catch (err) {
    console.error('Failed to fetch latest news:', err);
  }

  news = news.slice(0, 4);

  if (news.length === 0) {
    return null;
  }

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-bold uppercase tracking-wider mb-4">
            <Radio className="w-4 h-4 animate-pulse" /> Live Updates
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] mb-3 tracking-tight">AI Industry News</h2>
          <p className="text-base text-[#6B7280] max-w-2xl">Stay updated with the latest breakthroughs, model releases, and AI industry trends.</p>
        </div>
        <Link href="/news" className="shrink-0 px-5 py-2.5 bg-white border border-[#E5E7EB] text-[#111827] text-sm font-semibold rounded-xl hover:bg-[#F3F4F6] transition-colors flex items-center gap-2 shadow-sm">
          View All News <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {news.map((item, i) => (
          <Link 
            href={`/news/${item.slug}`} 
            key={item._id}
            className="group flex flex-col bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-red-500/30 transition-all duration-300 relative overflow-hidden"
          >
            {/* Subtle Gradient Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-red-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-bl-full"></div>
            
            <div className="text-xs font-bold text-red-500 mb-4 tracking-wider flex items-center gap-2">
              {new Date(item.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              <span className="w-1 h-1 rounded-full bg-red-300"></span>
              {i === 0 && <span className="text-red-500 bg-red-50 px-2 py-0.5 rounded-md">NEW</span>}
            </div>
            
            <h3 className="font-bold text-[#111827] text-xl mb-3 group-hover:text-red-600 transition-colors leading-snug line-clamp-3">
              {item.title}
            </h3>
            
            <p className="text-sm text-[#6B7280] line-clamp-3 mb-6 flex-1 relative z-10">
              {item.description}
            </p>
            
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors mt-auto shrink-0 shadow-sm">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
