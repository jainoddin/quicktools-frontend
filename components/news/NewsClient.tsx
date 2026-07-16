"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ChevronLeft, ChevronRight, ArrowRight, Home, ChevronDown } from 'lucide-react';
import NewsletterForm from '../shared/NewsletterForm';
import NewsletterSectionWrapper from '../shared/NewsletterSectionWrapper';
import { useAuth } from '../../contexts/AuthContext';
import { getEndpoint } from '../../lib/api';
import { useRouter } from 'next/navigation';
import { Bookmark } from 'lucide-react';

const CATEGORIES = ['All News', 'Product Launches', 'Research', 'Funding', 'Partnerships', 'Industry', 'Favorites'];
const SORT_OPTIONS = ['Latest', 'Popular'];

export default function NewsClient({ initialNews }: { initialNews: any[] }) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [activeCategory, setActiveCategory] = useState('All News');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('Latest');
  const [showSort, setShowSort] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4); // Start with 4 items
  const [savedNews, setSavedNews] = useState<string[]>([]);

  useEffect(() => {
    if (user?.savedNews) {
      setSavedNews(user.savedNews);
    }
  }, [user?.savedNews]);

  const handleToggleSave = async (e: React.MouseEvent, newsId: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      alert('Please log in to save news.');
      router.push('/login');
      return;
    }

    const isSaved = savedNews.includes(newsId);
    
    if (isSaved) {
      setSavedNews(prev => prev.filter(id => id !== newsId));
    } else {
      setSavedNews(prev => [...prev, newsId]);
    }

    try {
      const res = await fetch(getEndpoint(`/api/user/saved-news/${newsId}`), { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      const data = await res.json();
      if (!data.success) setSavedNews(user?.savedNews || []);
    } catch (err) {
      setSavedNews(user?.savedNews || []);
    }
  };

  // Filter and sort logic
  const filteredNews = useMemo(() => {
    let result = [...initialNews];

    // Category filter
    if (activeCategory === 'Favorites') {
      result = result.filter(n => savedNews.includes(n._id));
    } else if (activeCategory !== 'All News') {
      result = result.filter(n => n.category === activeCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(n => 
        n.title?.toLowerCase().includes(q) || 
        n.summary?.toLowerCase().includes(q)
      );
    }

    // Sort order
    if (sortOrder === 'Latest') {
      result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    } else if (sortOrder === 'Popular') {
      // Temporary popular sort (older first for variety)
      result.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
    }

    return result;
  }, [initialNews, activeCategory, searchQuery, sortOrder, savedNews]);

  const breakingNews = initialNews.find(n => n.isBreaking) || initialNews[0];
  const regularNews = filteredNews.filter(n => n._id !== breakingNews?._id);
  
  // Get counts for sidebar
  const getCategoryCount = (cat: string) => {
    if (cat === 'All News') return initialNews.length;
    return initialNews.filter(n => n.category === cat).length;
  };

  const popularNewsWidget = [...initialNews].sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        .animate-float-slow {
          animation: float 6s ease-in-out infinite;
        }
      `}} />

      {/* Hero Section */}
      <section className="bg-white border-b border-[#E5E7EB] pt-[15px] pb-16 relative overflow-hidden">
        {/* Abstract background blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#EEF2FF] rounded-full blur-[100px] opacity-50 -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F5F3FF] rounded-full blur-[80px] opacity-50 translate-y-1/2 -translate-x-1/3"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-[25px]">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 font-medium">
            <Link href="/" className="flex items-center gap-1 hover:text-[#4F46E5] transition-colors">
              <Home className="w-4 h-4" /> Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#4F46E5] font-bold">News</span>
          </nav>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111827] tracking-tight mb-6">
              AI News & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#7C3AED]">Updates</span>
            </h1>
            <p className="text-lg sm:text-xl text-[#4B5563] leading-relaxed mb-8 max-w-xl">
              Stay updated with the latest AI breakthroughs, product launches, research, and industry updates.
            </p>
            
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search news..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all bg-white shadow-sm font-medium"
              />
            </div>
          </div>
          
          <div className="hidden md:block relative w-[450px] h-[250px] lg:w-[550px] lg:h-[300px] animate-float-slow">
            <Image 
              src="https://pub-68a98c57e70a4a1fa317739dd20098b9.r2.dev/91999519-de24-44de-8f76-cbbb8d0d5727.png" 
              alt="AI News Bot" 
              fill 
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Breaking News Featured */}
        {breakingNews && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-[#FEF2F2] text-[#DC2626] text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-[#FCA5A5]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] animate-pulse"></span>
                Breaking News
              </span>
              <div className="hidden md:flex gap-2 items-center">
                <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#4F46E5] hover:border-[#4F46E5] transition-colors"><ChevronLeft className="w-4 h-4" /></button>
                <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#4F46E5] hover:border-[#4F46E5] transition-colors"><ChevronRight className="w-4 h-4" /></button>
              </div>
            </div>
            
            <div className="bg-white rounded-3xl p-6 border border-[#E5E7EB] shadow-sm flex flex-col md:flex-row gap-8 items-center hover:border-[#4F46E5]/20 transition-colors group">
              <div className="w-full md:w-1/3 aspect-[4/3] relative rounded-2xl overflow-hidden shrink-0 bg-gray-100">
                <Image src={breakingNews.heroImage} fill alt={breakingNews.title} className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                <button 
                  onClick={(e) => handleToggleSave(e, breakingNews._id)}
                  className={`absolute top-3 right-3 z-20 w-8 h-8 backdrop-blur-md rounded-full flex items-center justify-center transition-colors shadow-sm pointer-events-auto ${savedNews.includes(breakingNews._id) ? 'bg-white text-[#4F46E5]' : 'bg-black/30 text-white hover:bg-black/50'}`}
                >
                  <Bookmark className={`w-4 h-4 ${savedNews.includes(breakingNews._id) ? 'fill-current' : ''}`} />
                </button>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-4 leading-tight group-hover:text-[#4F46E5] transition-colors">
                  {breakingNews.title}
                </h2>
                <p className="text-[#4B5563] text-lg mb-6 line-clamp-2">
                  {breakingNews.summary}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-500">
                    {new Date(breakingNews.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <Link href={`/news/${breakingNews.slug}`} className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Grid */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <h2 className="text-2xl font-bold text-[#111827]">Latest AI News</h2>
              <div className="flex items-center gap-2 text-sm relative">
                <span className="text-gray-500 font-medium">Sort by:</span>
                
                {/* Custom Styled Dropdown matching Blog */}
                <div className="relative shrink-0 z-20">
                  <button
                    onClick={() => setShowSort(!showSort)}
                    className="flex items-center justify-between w-[120px] bg-white border border-[#E5E7EB] rounded-xl pl-3 pr-2 py-1.5 text-sm font-bold text-[#111827] hover:border-[#6B7280] transition-colors"
                  >
                    {sortOrder} <ChevronDown className="w-4 h-4 text-[#6B7280]" />
                  </button>
                  {showSort && (
                    <div className="absolute right-0 top-full mt-1 w-[120px] bg-white border border-gray-200 shadow-lg z-50 rounded-xl overflow-hidden">
                      {SORT_OPTIONS.map(opt => (
                        <button
                          key={opt}
                          onClick={() => { setSortOrder(opt); setShowSort(false); }}
                          className={`w-full text-left px-3 py-2.5 text-sm font-medium transition-colors ${sortOrder === opt ? 'bg-[#4F46E5] text-white' : 'text-[#111827] hover:bg-gray-50'}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {CATEGORIES.map((cat, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${activeCategory === cat ? 'bg-[#4F46E5] text-white border-transparent shadow-sm' : 'bg-white text-[#4B5563] border-gray-200 hover:border-[#4F46E5] hover:text-[#4F46E5]'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid */}
            {regularNews.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-[#E5E7EB]">
                <p className="text-xl font-bold text-[#111827] mb-2">No news found</p>
                <p className="text-[#6B7280] text-sm">Try a different category or search term.</p>
                <button onClick={() => { setActiveCategory('All News'); setSearchQuery(''); }} className="mt-4 text-[#4F46E5] font-bold text-sm hover:underline">
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {regularNews.slice(0, visibleCount).map((news: any, idx: number) => (
                  <Link href={`/news/${news.slug}`} key={idx} className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden group hover:border-[#4F46E5]/30 hover:shadow-md transition-all flex flex-col">
                    <div className="aspect-[16/9] relative bg-gray-100 overflow-hidden">
                      <Image src={news.heroImage} fill alt={news.title} className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-bold text-[#4F46E5] uppercase tracking-wide">
                        {news.category}
                      </div>
                      <button 
                        onClick={(e) => handleToggleSave(e, news._id)}
                        className={`absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors shadow-sm ${savedNews.includes(news._id) ? 'text-[#4F46E5]' : 'text-gray-400 hover:text-[#4F46E5]'}`}
                      >
                        <Bookmark className={`w-4 h-4 ${savedNews.includes(news._id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-3 text-xs font-bold text-gray-400">
                        <span>{new Date(news.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        <span>{news.readTime}</span>
                      </div>
                      <h3 className="text-[17px] font-bold text-[#111827] mb-3 leading-snug group-hover:text-[#4F46E5] transition-colors line-clamp-2">
                        {news.title}
                      </h3>
                      <p className="text-sm text-[#4B5563] mb-6 line-clamp-2 flex-1">
                        {news.summary}
                      </p>
                      <div className="text-[#4F46E5] font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read More <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            
            {visibleCount < regularNews.length && (
              <div className="mt-12 flex justify-center">
                <button 
                  onClick={() => setVisibleCount(prev => prev + 10)}
                  className="border border-gray-300 text-[#4B5563] font-bold text-sm px-6 py-3 rounded-full hover:border-[#4F46E5] hover:text-[#4F46E5] transition-colors"
                >
                  Load More News ↓
                </button>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <aside className="w-full lg:w-[320px] shrink-0 space-y-8">
            
            {/* Newsletter */}
            <NewsletterSectionWrapper>
              <div className="bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="flex items-center gap-2 mb-2 relative z-10">
                  <span className="text-xl">📫</span>
                  <h3 className="font-bold text-lg">Stay Ahead with AI</h3>
                </div>
                <p className="text-sm text-indigo-100 mb-5 relative z-10">
                  Get the latest AI news straight to your inbox.
                </p>
                <NewsletterForm 
                  className="relative z-10 flex flex-col gap-3"
                  inputClassName="w-full px-4 py-3 rounded-xl text-sm text-gray-900 border-0 focus:ring-2 focus:ring-white/50 bg-white/95"
                  buttonClassName="w-full bg-white text-[#4F46E5] font-bold text-sm px-4 py-3 rounded-xl hover:bg-indigo-50 transition-colors shadow-sm"
                />
                <p className="text-[10px] text-indigo-200 mt-4 text-center relative z-10">
                  No spam. Unsubscribe anytime.
                </p>
              </div>
            </NewsletterSectionWrapper>

            {/* Categories Widget */}
            <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-sm">
              <h3 className="font-bold text-[#111827] mb-5 text-sm">News Categories</h3>
              <ul className="space-y-3">
                {CATEGORIES.map((cat, idx) => (
                  <li key={idx}>
                    <button 
                      onClick={() => setActiveCategory(cat)}
                      className="w-full flex items-center justify-between text-sm text-[#4B5563] hover:text-[#4F46E5] group"
                    >
                      <span className={`font-medium ${activeCategory === cat ? 'text-[#4F46E5]' : ''}`}>{cat}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full transition-colors ${activeCategory === cat ? 'bg-[#EEF2FF] text-[#4F46E5]' : 'bg-gray-100 text-gray-500 group-hover:bg-[#EEF2FF] group-hover:text-[#4F46E5]'}`}>
                        {getCategoryCount(cat)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular News Widget */}
            <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-sm">
              <h3 className="font-bold text-[#111827] mb-5 text-sm">Popular News</h3>
              <div className="space-y-5">
                {popularNewsWidget.map((news: any, idx: number) => (
                  <Link href={`/news/${news.slug}`} key={idx} className="flex gap-4 group items-center">
                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-gray-100 relative">
                      <Image src={news.heroImage} fill alt={news.title} className="object-cover group-hover:scale-110 transition-transform duration-500" unoptimized />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-[13px] font-bold text-[#111827] leading-tight group-hover:text-[#4F46E5] transition-colors line-clamp-2 mb-1">
                        {news.title}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                        {news.readTime}
                      </p>
                    </div>
                    <button 
                      onClick={(e) => handleToggleSave(e, news._id)}
                      className={`transition-colors p-1 ${savedNews.includes(news._id) ? 'text-[#4F46E5]' : 'text-gray-400 hover:text-[#4F46E5]'}`}
                    >
                      <Bookmark className={`w-4 h-4 ${savedNews.includes(news._id) ? 'fill-current' : ''}`} />
                    </button>
                  </Link>
                ))}
              </div>
            </div>
            
          </aside>
        </div>
      </section>
    </div>
  );
}
