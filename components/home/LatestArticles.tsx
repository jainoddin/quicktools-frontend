import React from 'react';
import Link from 'next/link';
import { FileText, ChevronRight } from 'lucide-react';
import { getEndpoint } from '../../lib/api';
import Image from 'next/image';

interface Article {
  _id: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  publishedAt: string;
}

export default async function LatestArticles() {
  let articles: Article[] = [];
  try {
    const res = await fetch(getEndpoint('/api/articles?limit=2'), { next: { revalidate: 300 } });
    if (res.ok) {
      const data = await res.json();
      articles = data.data || [];
    }
  } catch (err) {
    console.error('Failed to fetch latest articles:', err);
  }

  articles = articles.slice(0, 2);

  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
      <div className="bg-[#111827] rounded-[2.5rem] p-8 sm:p-12 lg:p-16 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Header Area */}
          <div className="lg:w-1/3 lg:sticky lg:top-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#1F2937] text-indigo-400 mb-6 border border-gray-700">
              <FileText className="w-6 h-6" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">Helpful Articles & Guides</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Dive deep into our comprehensive guides, step-by-step tutorials, and detailed articles to master AI tools.
            </p>
            <Link 
              href="/articles" 
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold rounded-xl transition-colors shadow-lg shadow-indigo-500/20"
            >
              Browse All Articles
            </Link>
          </div>

          {/* Articles List */}
          <div className="lg:w-2/3 flex flex-col gap-4 w-full">
            {articles.map((article) => (
              <Link 
                href={`/articles/${article.slug}`} 
                key={article._id}
                className="group flex flex-col sm:flex-row items-center gap-6 p-4 sm:p-6 rounded-3xl bg-[#1F2937]/50 hover:bg-[#374151]/80 border border-gray-800 hover:border-gray-700 transition-all duration-300 w-full"
              >
                <div className="w-full sm:w-40 h-48 sm:h-28 shrink-0 rounded-2xl overflow-hidden bg-gray-800 relative">
                  {article.coverImage ? (
                    <img fetchPriority="high" loading="eager" src={article.coverImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-gray-500">
                      <FileText className="w-8 h-8 opacity-20" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 flex flex-col justify-center">
                  <div className="text-sm font-semibold text-indigo-400 mb-2">
                    {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors line-clamp-1 sm:line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {article.description}
                  </p>
                </div>

                <div className="hidden sm:flex w-12 h-12 rounded-full bg-gray-800 group-hover:bg-indigo-500 items-center justify-center text-gray-400 group-hover:text-white shrink-0 transition-colors">
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
