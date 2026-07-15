"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Flame, Bookmark, ArrowRight, Eye, ChevronDown, Clock, ChevronRight, Home } from 'lucide-react';
import NewsletterForm from '../shared/NewsletterForm';
import NewsletterSectionWrapper from '../shared/NewsletterSectionWrapper';
import { useAuth } from '../../contexts/AuthContext';
import { getEndpoint } from '../../lib/api';
import { useRouter } from 'next/navigation';

const CATEGORIES = ['All Articles', 'AI & Tools', 'Productivity', 'Marketing', 'Business', 'Development', 'Design'];
const TABS = ['All', 'Latest', 'Popular', 'Trending', 'Favorites'];

export default function ArticlesClient({ initialArticles = [] }: { initialArticles?: any[] }) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [articles, setArticles] = useState<any[]>(initialArticles);
  const [filtered, setFiltered] = useState<any[]>(initialArticles);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All Articles');
  const [activeTab, setActiveTab] = useState('All');
  const [sortOrder, setSortOrder] = useState('Newest First');
  const [search, setSearch] = useState('');
  const [showSort, setShowSort] = useState(false);
  const [savedArticles, setSavedArticles] = useState<string[]>([]);

  useEffect(() => {
    if (user?.savedArticles) {
      setSavedArticles(user.savedArticles);
    }
  }, [user?.savedArticles]);

  const handleToggleSave = async (e: React.MouseEvent, articleId: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      alert('Please log in to save articles.');
      router.push('/login');
      return;
    }

    const isSaved = savedArticles.includes(articleId);
    
    if (isSaved) {
      setSavedArticles(prev => prev.filter(id => id !== articleId));
    } else {
      setSavedArticles(prev => [...prev, articleId]);
    }

    try {
      const res = await fetch(getEndpoint(`/api/user/saved-articles/${articleId}`), { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      const data = await res.json();
      if (!data.success) setSavedArticles(user?.savedArticles || []);
    } catch (err) {
      setSavedArticles(user?.savedArticles || []);
    }
  };

  // Apply filters whenever state changes
  const applyFilters = useCallback(() => {
    let result = [...articles];

    // Category filter
    if (activeCategory !== 'All Articles') {
      result = result.filter(a => a.category === activeCategory);
    }

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(a =>
        a.title?.toLowerCase().includes(q) ||
        a.description?.toLowerCase().includes(q) ||
        a.tags?.some((t: string) => t.toLowerCase().includes(q))
      );
    }

    // Tab filter
    if (activeTab === 'Latest') {
      result = result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    } else if (activeTab === 'Popular') {
      result = result.sort((a, b) => {
        const va = parseInt((a.views || '0').replace(/[^0-9]/g, ''));
        const vb = parseInt((b.views || '0').replace(/[^0-9]/g, ''));
        return vb - va;
      });
    } else if (activeTab === 'Trending') {
      result = result.slice(0, 6); // top 6 by default as trending
    } else if (activeTab === 'Favorites') {
      result = result.filter(a => savedArticles.includes(a._id));
    }

    // Sort order
    if (sortOrder === 'Newest First') {
      result = result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    } else {
      result = result.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
    }

    setFiltered(result);
  }, [articles, activeCategory, search, activeTab, sortOrder, savedArticles]);

  useEffect(() => { applyFilters(); }, [applyFilters]);

  const featuredArticle = articles.length > 0 ? articles[0] : null;
  // Trending is always global top 4 by views
  const trendingArticles = [...articles].sort((a, b) => {
    const va = parseInt((a.views || '0').replace(/[^0-9]/g, ''));
    const vb = parseInt((b.views || '0').replace(/[^0-9]/g, ''));
    return vb - va;
  }).slice(0, 4);
  const gridArticles = filtered.filter(a => featuredArticle ? a._id !== featuredArticle._id : true);

  return (
    <div className="flex-grow bg-white text-[#111827] font-sans selection:bg-[#4F46E5] selection:text-white pb-20">

      {/* 1. Hero */}
      <section className="relative w-full bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden pt-[15px] pb-8 lg:pb-10 border-b border-[#E5E7EB]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-200/50 rounded-full blur-3xl opacity-50 -translate-y-1/4 translate-x-1/4 pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-[25px]">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Link href="/" className="flex items-center gap-1.5 text-[#6B7280] hover:text-[#111827] transition-colors">
              <Home className="w-4 h-4" /> Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF]" />
            <span className="text-[#4F46E5] font-semibold">Articles</span>
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Insights that empower <br className="hidden sm:block" />
              <span className="text-[#4F46E5]">Smarter work with AI</span>
            </h1>
            <p className="text-lg text-[#4B5563] mb-10 max-w-xl leading-relaxed">
              Expert insights, tutorials, and in-depth guides about AI tools, productivity, and the future of work.
            </p>
            <div className="relative flex items-center w-full max-w-lg bg-white rounded-full p-1.5 shadow-sm border border-[#E5E7EB] focus-within:ring-2 focus-within:ring-[#4F46E5] transition-all">
              <Search className="w-5 h-5 text-[#9CA3AF] absolute left-4" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search articles, topics, tools..."
                className="w-full bg-transparent border-none focus:ring-0 pl-12 pr-4 text-sm text-[#111827] outline-none"
              />
              <button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white font-medium px-6 py-2.5 rounded-full text-sm transition-colors shrink-0">
                Search
              </button>
            </div>
          </div>
          <div className="relative w-full max-w-lg lg:max-w-[550px] h-[300px] lg:h-[380px] flex-shrink-0">
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="https://pub-68a98c57e70a4a1fa317739dd20098b9.r2.dev/6f5cf36e-5954-44f9-b356-2be5e15356a1.png"
                alt="AI Robot Working" fill
                className="object-contain drop-shadow-2xl hover:scale-125 scale-110 transition-transform duration-500"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category Pills */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-[#4F46E5] text-white shadow-sm'
                  : 'bg-white border border-[#E5E7EB] text-[#4B5563] hover:border-[#4F46E5] hover:text-[#4F46E5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 3. Featured & Trending */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Featured */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-[#111827]">Featured Article</h2>
            {featuredArticle && (
              <Link href={`/articles/${featuredArticle.slug}`} className="group relative w-full h-auto md:h-[450px] rounded-3xl overflow-hidden shadow-sm border border-[#E5E7EB] bg-white flex flex-col md:flex-row">
                <div className="w-full md:w-[60%] h-full p-8 sm:p-10 flex flex-col justify-between relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-[#EEF2FF] text-[#4F46E5] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-md flex items-center gap-1.5">
                      <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      FEATURED
                    </span>
                    <span className="text-[#9CA3AF] text-xs font-bold uppercase tracking-wider">{featuredArticle.category}</span>
                  </div>
                  <div className="flex-grow flex flex-col justify-center py-6 md:py-0">
                    <h3 className="text-3xl md:text-[36px] font-bold leading-[1.2] mb-4 text-[#111827] group-hover:text-[#4F46E5] transition-colors line-clamp-3">{featuredArticle.title}</h3>
                    <p className="text-[#6B7280] text-sm md:text-base leading-relaxed max-w-sm line-clamp-2">{featuredArticle.description}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="w-9 h-9 bg-gray-100 rounded-full overflow-hidden border border-[#E5E7EB] flex items-center justify-center">
                      <Image src="/icon.svg" width={20} height={20} alt="QuickTools AI" />
                    </div>
                    <p className="font-bold text-sm text-[#111827] flex items-center gap-2">
                      {featuredArticle.author?.name || 'QuickTools AI'}
                      <span className="text-[10px] text-[#D1D5DB]">•</span>
                      <span className="font-normal text-[#6B7280]">{new Date(featuredArticle.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span className="text-[10px] text-[#D1D5DB]">•</span>
                      <span className="font-normal text-[#6B7280]">{featuredArticle.readTime}</span>
                    </p>
                  </div>
                </div>
                <div className="relative md:absolute top-0 right-0 w-full md:w-[50%] h-[250px] md:h-full pointer-events-none">
                  <div className="hidden md:block absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
                  <div className="block md:hidden absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-white/80 to-transparent z-10" />
                  <Image src={featuredArticle.coverImage} alt={featuredArticle.title} fill className="object-cover" unoptimized />
                  
                  {/* Bookmark Button over Image */}
                  <button 
                    onClick={(e) => handleToggleSave(e, featuredArticle._id)}
                    className={`absolute top-4 right-4 z-20 w-10 h-10 backdrop-blur-md rounded-full flex items-center justify-center transition-colors shadow-sm pointer-events-auto ${savedArticles.includes(featuredArticle._id) ? 'bg-white text-[#4F46E5]' : 'bg-black/30 text-white hover:bg-black/50'}`}
                  >
                    <Bookmark className={`w-5 h-5 ${savedArticles.includes(featuredArticle._id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </Link>
            )}
          </div>

          {/* Trending Now */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-[#111827] flex items-center gap-2">Trending Now <Flame className="w-5 h-5 text-orange-500 fill-orange-500"/></h2>
            <div className="flex flex-col gap-5 bg-white p-6 rounded-3xl border border-[#E5E7EB] shadow-sm h-[450px] justify-between">
              {trendingArticles.map((item, idx) => (
                <Link href={`/articles/${item.slug}`} key={idx} className="flex items-center gap-4 group">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                    <Image src={item.coverImage} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-300" unoptimized />
                    <div className="absolute -left-1 top-1 bg-white border border-[#E5E7EB] w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-[#111827] z-10 shadow-sm">{idx + 1}</div>
                  </div>
                  <div className="flex flex-col flex-grow">
                    <h4 className="text-sm font-bold text-[#111827] line-clamp-2 group-hover:text-[#4F46E5] transition-colors leading-tight mb-1">{item.title}</h4>
                    <p className="text-xs text-[#6B7280]">{item.readTime}</p>
                  </div>
                  <button 
                    onClick={(e) => handleToggleSave(e, item._id)}
                    className={`transition-colors p-1 ${savedArticles.includes(item._id) ? 'text-[#4F46E5]' : 'text-gray-400 hover:text-[#4F46E5]'}`}
                  >
                    <Bookmark className={`w-4 h-4 ${savedArticles.includes(item._id) ? 'fill-current' : ''}`} />
                  </button>
                </Link>
              ))}
              <button 
                onClick={() => {
                  setActiveTab('Trending');
                  document.getElementById('articles-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="w-full mt-2 text-[#4F46E5] font-semibold text-sm py-2.5 rounded-full border border-[#E5E7EB] hover:border-[#4F46E5] hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2"
              >
                View all trending <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Tabs + Sort */}
      <section id="articles-grid" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E5E7EB] gap-4 mb-6">
          <div className="flex items-center gap-6 overflow-x-auto w-full pt-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap text-sm font-bold pb-3 border-b-2 transition-colors ${
                  activeTab === tab ? 'text-[#4F46E5] border-[#4F46E5]' : 'border-transparent text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative shrink-0 mb-3 sm:mb-2 z-20">
            <button
              onClick={() => setShowSort(s => !s)}
              className="flex items-center justify-between w-[140px] bg-white border border-[#E5E7EB] rounded-xl pl-4 pr-3 py-2 text-sm font-bold text-[#111827] hover:border-[#6B7280] transition-colors"
            >
              {sortOrder} <ChevronDown className="w-4 h-4 text-[#6B7280]" />
            </button>
            {showSort && (
              <div className="absolute right-0 top-full mt-1 w-[140px] bg-white border border-gray-200 shadow-lg z-50 rounded-xl overflow-hidden">
                {['Newest First', 'Oldest First'].map(opt => (
                  <button
                    key={opt}
                    onClick={() => { setSortOrder(opt); setShowSort(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${sortOrder === opt ? 'bg-[#4F46E5] text-white' : 'text-[#111827] hover:bg-gray-50'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-[#6B7280] mb-6">
          {loading ? 'Loading...' : `${gridArticles.length} article${gridArticles.length !== 1 ? 's' : ''} found${activeCategory !== 'All Articles' ? ` in "${activeCategory}"` : ''}`}
        </p>
      </section>

      {/* 5. Articles Grid — Real API data */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="w-full aspect-[4/3] rounded-2xl bg-gray-200 mb-4" />
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : gridArticles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl font-bold text-[#111827] mb-2">No articles found</p>
            <p className="text-[#6B7280]">Try a different category or search term.</p>
            <button onClick={() => { setActiveCategory('All Articles'); setSearch(''); setActiveTab('All'); }} className="mt-6 bg-[#4F46E5] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#4338CA] transition-colors">
              Show All Articles
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {gridArticles.map((article, i) => (
              <Link href={`/articles/${article.slug}`} key={i} className="flex flex-col group h-full">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-sm border border-[#F3F4F6]">
                  <Image src={article.coverImage} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                  <div className="absolute top-3 left-3 bg-[#4F46E5] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                    {article.category}
                  </div>
                  <button 
                    onClick={(e) => handleToggleSave(e, article._id)}
                    className={`absolute top-3 right-3 w-8 h-8 backdrop-blur-md rounded-full flex items-center justify-center transition-colors ${savedArticles.includes(article._id) ? 'bg-white text-[#4F46E5]' : 'bg-black/30 text-white hover:bg-black/50'}`}
                  >
                    <Bookmark className={`w-4 h-4 ${savedArticles.includes(article._id) ? 'fill-current' : ''}`} />
                  </button>
                  <div className="absolute bottom-3 left-3 text-white text-xs font-medium flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-md">
                    <Clock className="w-3 h-3" /> {article.readTime}
                  </div>
                </div>
                <div className="flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-[#111827] mb-2 leading-snug group-hover:text-[#4F46E5] transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-[#6B7280] mb-4 line-clamp-2">{article.description}</p>
                  <div className="mt-auto pt-4 border-t border-[#F3F4F6] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-gray-100 rounded-full overflow-hidden border border-indigo-100 flex items-center justify-center">
                        <Image src="/icon.svg" width={16} height={16} alt="QuickTools AI" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[#111827]">{article.author?.name || 'QuickTools AI'}</p>
                        <p className="text-[10px] text-[#9CA3AF]">{new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#9CA3AF]">
                      <div className="flex items-center gap-1"><Eye className="w-3.5 h-3.5"/>{article.views || '0'}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* 6. Newsletter */}
      <NewsletterSectionWrapper>
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-200/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="flex items-start gap-6 z-10 w-full md:w-1/2">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-indigo-50">
                <Image src="https://cdn-icons-png.flaticon.com/512/732/732200.png" width={32} height={32} alt="Newsletter" className="opacity-80" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#111827] mb-2">Stay Ahead with AI</h3>
                <p className="text-[#4B5563] text-sm leading-relaxed">Get the latest AI insights, tools, and productivity tips delivered to your inbox every week.</p>
              </div>
            </div>
            <div className="z-10 w-full md:w-auto">
              <NewsletterForm 
                className="flex flex-col sm:flex-row items-center gap-3"
                inputClassName="w-full sm:w-[300px] px-5 py-3.5 rounded-xl border border-[#D1D5DB] focus:ring-2 focus:ring-[#4F46E5] outline-none text-sm shadow-sm bg-white"
                buttonClassName="w-full sm:w-auto bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-colors shadow-sm whitespace-nowrap"
              />
              <p className="text-[10px] text-[#6B7280] text-center sm:text-left mt-3 px-2">No spam. Unsubscribe anytime.</p>
            </div>
          </div>
        </section>
      </NewsletterSectionWrapper>

    </div>
  );
}
