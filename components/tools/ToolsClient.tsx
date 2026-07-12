'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Search, Zap, Image as ImageIcon, PenTool, Code, Video,
  ArrowRight, LayoutGrid, Moon, MessageCircle, Palette,
  Briefcase, TrendingUp, Crown, Flame, Sparkles, Star,
  Clock, Filter, ChevronDown, Globe, Share2, Mail,
  Home, ChevronRight, LucideIcon, Menu, X
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getEndpoint } from '@/lib/api';
import LoginPopup from '@/components/auth/LoginPopup';

// ✅ Static icon map — RSC bundler idi safely handle cheyagaladu
export const IconMap: Record<string, LucideIcon> = {
  LayoutGrid,
  ImageIcon,
  PenTool,
  Video,
  Code,
  MessageCircle,
  Palette,
  Briefcase,
  Search,
  TrendingUp,
  Flame,
  Sparkles,
  Star,
  Clock,
};

function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const Icon = IconMap[name];
  if (!Icon) return null;
  return <Icon className={className} />;
}

const categoriesList = [
  { name: 'All Tools', iconName: 'LayoutGrid' },
  { name: 'AI Image', iconName: 'ImageIcon' },
  { name: 'AI Writer', iconName: 'PenTool' },
  { name: 'AI Video', iconName: 'Video' },
  { name: 'AI Code', iconName: 'Code' },
  { name: 'AI Chat', iconName: 'MessageCircle' },
  { name: 'Design', iconName: 'Palette' },
  { name: 'Productivity', iconName: 'Briefcase' },
  { name: 'SEO', iconName: 'Search' },
  { name: 'Business', iconName: 'TrendingUp' },
];

const filtersList = [
  { name: 'Popular', iconName: 'Flame' },
  { name: 'New', iconName: 'LayoutGrid' },
  { name: 'Trending', iconName: 'TrendingUp' },
  { name: 'Most Used', iconName: 'Star' },
  { name: 'Recent', iconName: 'Clock' },
];

export const allTools = [
  {
    name: 'AI Image Generator',
    description: 'Generate stunning images from text using advanced AI models.',
    iconName: 'ImageIcon',
    color: 'bg-[#6D5EF8] text-white',
    slug: '/tools/ai-image-generator',
    category: 'AI Image',
    tag: { label: 'Popular', type: 'popular', iconName: 'Flame' }
  },
  {
    name: 'Background Remover',
    description: 'Remove background from any image instantly with AI precision.',
    iconName: 'LayoutGrid',
    color: 'bg-[#10B981] text-white',
    slug: '/tools/background-remover',
    category: 'AI Image',
    tag: { label: 'Popular', type: 'popular', iconName: 'Flame' }
  },
  {
    name: 'AI Writer',
    description: 'Write blogs, emails, articles, and more in seconds.',
    iconName: 'PenTool',
    color: 'bg-[#F43F5E] text-white',
    slug: '/tools/ai-writer',
    category: 'AI Writer',
    tag: { label: 'Popular', type: 'popular', iconName: 'Flame' }
  },
  {
    name: 'AI Video Generator',
    description: 'Generate videos from text with realistic AI visuals.',
    iconName: 'Video',
    color: 'bg-[#8B5CF6] text-white',
    slug: '/tools/ai-video-generator',
    category: 'AI Video',
    tag: { label: 'New', type: 'new', iconName: 'Sparkles' }
  },
  {
    name: 'AI Code Generator',
    description: 'Generate clean code in any programming language.',
    iconName: 'Code',
    color: 'bg-[#0EA5E9] text-white',
    slug: '/tools/ai-code-generator',
    category: 'AI Code',
    tag: { label: 'New', type: 'new', iconName: 'Sparkles' }
  }
];

export default function ToolsClient() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const { user, isAuthenticated, updateUser } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState('All Tools');
  const [activeFilter, setActiveFilter] = useState('Popular');
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
  const [starredTools, setStarredTools] = useState<string[]>([]);

  useEffect(() => {
    if (user?.savedTools) {
      setStarredTools(user.savedTools);
    }
  }, [user]);

  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
  }, [searchParams]);

  useEffect(() => {
    if (!isAuthenticated && (activeFilter === 'Most Used' || activeFilter === 'Recent')) {
      setActiveFilter('Popular');
    }
  }, [isAuthenticated, activeFilter]);

  // Compute category counts dynamically
  const categories = useMemo(() => {
    return categoriesList.map(cat => {
      if (cat.name === 'All Tools') return { ...cat, count: allTools.length };
      const count = allTools.filter(t => t.category === cat.name).length;
      return { ...cat, count };
    }).filter(cat => cat.count > 0 || cat.name === 'All Tools');
  }, []);

  const filteredTools = useMemo(() => {
    let result = allTools;

    if (activeCategory !== 'All Tools') {
      result = result.filter(t => t.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t => 
        t.name.toLowerCase().includes(q) || 
        t.description.toLowerCase().includes(q)
      );
    }

    if (activeFilter === 'New') {
       result = result.filter(t => t.tag?.type === 'new');
    } else if (activeFilter === 'Most Used' || activeFilter === 'Recent') {
       result = result.filter(t => starredTools.includes(t.slug));
    }

    return result;
  }, [searchQuery, activeCategory, activeFilter]);

  const toggleStar = async (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      setShowLoginPopup(true);
      return;
    }

    const isStarred = starredTools.includes(slug);
    const updatedStarred = isStarred 
      ? starredTools.filter(s => s !== slug) 
      : [...starredTools, slug];
    
    setStarredTools(updatedStarred);

    try {
      const res = await fetch(getEndpoint(`/api/auth/tools/${encodeURIComponent(slug)}/star`), {
        method: 'PUT',
        credentials: 'include'
      });
      const data = await res.json();
      
      if (data.success && user) {
        updateUser({ ...user, savedTools: data.savedTools });
      } else {
        setStarredTools(starredTools);
      }
    } catch (err) {
      console.error('Failed to toggle star:', err);
      setStarredTools(starredTools);
    }
  };

  return (
    <>
      <LoginPopup isOpen={showLoginPopup} onClose={() => setShowLoginPopup(false)} />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-[15px] relative w-full overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-[100px] -z-10 pointer-events-none -translate-y-1/4"></div>

        {/* Top Navigation Row */}
        <div className="mb-[25px] flex flex-col gap-4">
          <nav className="flex items-center space-x-2 text-sm font-medium text-[#6B7280]">
            <Link href="/" className="hover:text-[#111827] transition-colors flex items-center gap-1.5">
              <Home className="w-4 h-4" /> Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-[#6D5EF8] font-bold">All Tools</span>
          </nav>
          
          {/* Mobile Categories Toggle (Below Breadcrumb) */}
          <button 
            onClick={() => setIsMobileCategoriesOpen(true)}
            className="lg:hidden flex items-center gap-2 w-fit px-4 py-2.5 bg-white border border-[#E5E7EB] rounded-xl hover:bg-[#F9FAFB] transition-colors shadow-sm text-[#111827] font-semibold"
          >
            <Menu className="w-5 h-5 text-[#6D5EF8]" />
            Categories
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar (Desktop) */}
          <aside className="hidden lg:block w-[260px] shrink-0 space-y-6 sticky top-24 self-start">
            <div>
              <h3 className="font-bold text-[#111827] mb-4 px-3">Categories</h3>
              <div className="space-y-1">
                {categories.map((category, index) => {
                  const isActive = activeCategory === category.name;
                  return (
                    <button
                      key={index}
                      onClick={() => setActiveCategory(category.name)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${isActive
                        ? 'bg-[#EEF2FF] text-[#6D5EF8] font-semibold'
                        : 'text-[#4B5563] hover:bg-white hover:text-[#111827] font-medium'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <DynamicIcon name={category.iconName} className={`w-5 h-5 ${isActive ? 'text-[#6D5EF8]' : 'text-[#6B7280]'}`} />
                        <span className="text-[15px]">{category.name}</span>
                      </div>
                      <span className={`text-xs ${isActive
                        ? 'text-[#6D5EF8] bg-white px-1.5 py-0.5 rounded-md shadow-sm'
                        : 'text-[#9CA3AF]'
                        }`}>
                        {category.count}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Premium Card */}
            <div className="bg-gradient-to-br from-white to-[#EEF2FF] border border-[#E5E7EB] rounded-2xl p-5 shadow-sm relative overflow-hidden">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#6D5EF8]/5 rounded-full blur-xl"></div>
              <div className="w-10 h-10 bg-[#EEF2FF] rounded-xl flex items-center justify-center mb-4 text-[#6D5EF8]">
                <Crown className="w-5 h-5 fill-[#6D5EF8]" />
              </div>
              <h4 className="font-bold text-[#111827] mb-1">Unlock Premium</h4>
              <p className="text-sm text-[#6B7280] mb-5 leading-relaxed">
                Get unlimited access to all tools and premium features.
              </p>
              <Link href="/pricing" className="w-full flex justify-center items-center bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white font-semibold text-sm py-2.5 rounded-xl transition-colors shadow-md shadow-[#6D5EF8]/20">
                Upgrade Now
              </Link>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-[#111827] mb-2 tracking-tight">All Premium Tools</h1>
                <p className="text-[#6B7280] text-lg">Explore {allTools.length} AI-powered tools to boost your productivity ✨</p>
              </div>
            </div>

            {/* Search and Filters Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 relative z-10">
              <div className="relative flex-1 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF] group-focus-within:text-[#6D5EF8] transition-colors" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tools..."
                  className="w-full h-12 pl-11 pr-4 bg-white border border-[#E5E7EB] rounded-xl outline-none focus:border-[#6D5EF8] focus:ring-4 focus:ring-[#6D5EF8]/10 transition-all text-[15px] shadow-sm"
                />
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button className="h-12 px-4 bg-white border border-[#E5E7EB] rounded-xl flex items-center gap-2 hover:bg-[#F9FAFB] transition-colors text-[15px] font-medium text-[#4B5563] shadow-sm">
                  <Filter className="w-4 h-4 text-[#6B7280]" /> Filters
                </button>
              </div>
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap items-center gap-2.5 mb-8">
              {filtersList.map((filter, idx) => {
                if (!isAuthenticated && (filter.name === 'Most Used' || filter.name === 'Recent')) {
                  return null;
                }
                const isActive = activeFilter === filter.name;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveFilter(filter.name)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[14px] font-semibold transition-all shadow-sm ${isActive
                      ? 'bg-[#6D5EF8] text-white shadow-md shadow-[#6D5EF8]/20'
                      : 'bg-white text-[#4B5563] border border-[#E5E7EB] hover:bg-[#F9FAFB]'
                      }`}
                  >
                    <DynamicIcon name={filter.iconName} className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#9CA3AF]'}`} />
                    {filter.name}
                  </button>
                )
              })}
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredTools.length > 0 ? (
                filteredTools.map((tool, index) => {
                  const isStarred = starredTools.includes(tool.slug);
                  return (
                    <Link href={tool.slug} key={index} className="group">
                      <div className="bg-white p-5 rounded-2xl border border-[#E5E7EB] hover:border-[#6D5EF8] hover:shadow-xl hover:shadow-[#6D5EF8]/10 transition-all duration-300 relative h-full flex flex-col">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner ${tool.color}`}>
                            <DynamicIcon name={tool.iconName} className="w-7 h-7" />
                          </div>

                          <div className="flex gap-2">
                            {tool.tag && (
                              <div className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold ${tool.tag.type === 'popular'
                                ? 'bg-red-50 text-red-500'
                                : 'bg-green-50 text-green-600'
                                }`}>
                                <DynamicIcon name={tool.tag.iconName} className="w-3 h-3" />
                                {tool.tag.label}
                              </div>
                            )}
                            <button 
                              onClick={(e) => toggleStar(e, tool.slug)}
                              className={`transition-colors p-1 rounded-full ${isStarred ? 'text-[#F59E0B] bg-amber-50' : 'text-[#9CA3AF] hover:text-[#6D5EF8] hover:bg-indigo-50'}`}
                            >
                              <Star className={`w-5 h-5 ${isStarred ? 'fill-[#F59E0B]' : ''}`} />
                            </button>
                          </div>
                        </div>

                        <h3 className="text-lg font-bold text-[#111827] mb-2 group-hover:text-[#6D5EF8] transition-colors">
                          {tool.name}
                        </h3>
                        <p className="text-[#6B7280] text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                          {tool.description}
                        </p>

                        <div className="w-full py-2.5 bg-[#F8FAFC] group-hover:bg-[#EEF2FF] text-[#6D5EF8] rounded-xl font-semibold text-[14px] flex items-center justify-center transition-colors">
                          Try Now <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  )
                })
              ) : (
                <div className="col-span-full bg-white border border-dashed border-[#E5E7EB] rounded-2xl p-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-bold text-[#111827] mb-2">No tools found</h3>
                  <p className="text-[#6B7280] text-sm">We couldn't find any tools matching your search or filter.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Categories Drawer */}
      {isMobileCategoriesOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden flex">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#111827]/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsMobileCategoriesOpen(false)}
          ></div>
          
          {/* Drawer */}
          <div className="relative w-[280px] max-w-[80%] h-full bg-[#F8FAFC] shadow-2xl flex flex-col overflow-y-auto animate-[textSlideIn_0.3s_ease_forwards]">
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white border-b border-[#E5E7EB]">
              <h3 className="font-bold text-[#111827] text-lg">Categories</h3>
              <button 
                onClick={() => setIsMobileCategoriesOpen(false)}
                className="p-2 bg-gray-100 text-gray-500 hover:text-gray-900 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 flex flex-col flex-1 h-full overflow-y-auto space-y-6">
              <div className="space-y-1">
                {categories.map((category, index) => {
                  const isActive = activeCategory === category.name;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setActiveCategory(category.name);
                        setIsMobileCategoriesOpen(false); // Close on select
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${isActive
                        ? 'bg-[#EEF2FF] text-[#6D5EF8] font-semibold'
                        : 'text-[#4B5563] hover:bg-white hover:text-[#111827] font-medium'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <DynamicIcon name={category.iconName} className={`w-5 h-5 ${isActive ? 'text-[#6D5EF8]' : 'text-[#6B7280]'}`} />
                        <span className="text-[15px]">{category.name}</span>
                      </div>
                      <span className={`text-xs ${isActive
                        ? 'text-[#6D5EF8] bg-white px-1.5 py-0.5 rounded-md shadow-sm'
                        : 'text-[#9CA3AF]'
                        }`}>
                        {category.count}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Premium Card Mobile - Pushed to bottom */}
              <div className="mt-auto pt-6">
                <div className="bg-gradient-to-br from-white to-[#EEF2FF] border border-[#E5E7EB] rounded-2xl p-5 shadow-sm relative overflow-hidden">
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#6D5EF8]/5 rounded-full blur-xl"></div>
                  <div className="w-10 h-10 bg-[#EEF2FF] rounded-xl flex items-center justify-center mb-4 text-[#6D5EF8]">
                    <Crown className="w-5 h-5 fill-[#6D5EF8]" />
                  </div>
                  <h4 className="font-bold text-[#111827] mb-1">Unlock Premium</h4>
                  <p className="text-sm text-[#6B7280] mb-5 leading-relaxed">
                    Get unlimited access to all tools and premium features.
                  </p>
                  <Link href="/pricing" className="w-full flex justify-center items-center bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white font-semibold text-sm py-2.5 rounded-xl transition-colors shadow-md shadow-[#6D5EF8]/20">
                    Upgrade Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
