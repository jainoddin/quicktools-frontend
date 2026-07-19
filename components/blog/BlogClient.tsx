"use client";

import { useToast } from '@/contexts/ToastContext';
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, Grid, List, Bookmark, ChevronDown, LayoutGrid, 
  Sparkles, CheckCircle2, Play, Code2, PenTool, TrendingUp,
  Briefcase, GraduationCap, Newspaper, ArrowRight, Zap, Send, SearchX, Loader2,
  Menu, X
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import NewsletterForm from '../shared/NewsletterForm';
import NewsletterSectionWrapper from '../shared/NewsletterSectionWrapper';
import { useRouter } from 'next/navigation';
import { getEndpoint } from '../../lib/api';
import { useAuth } from '../../contexts/AuthContext';
import { trackFavorite, trackContentFilter } from '@/lib/analytics';

interface Blog {
  _id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  coverImage: string;
  readTime: string;
  author: { name: string; avatar: string };
  publishedAt: string;
  tags?: string[];
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'All Blogs': <LayoutGrid className="w-4 h-4" />,
  'AI & Tools': <Sparkles className="w-4 h-4" />,
  'Productivity': <CheckCircle2 className="w-4 h-4" />,
  'Development': <Code2 className="w-4 h-4" />,
  'Design': <PenTool className="w-4 h-4" />,
  'Marketing': <TrendingUp className="w-4 h-4" />,
  'Business': <Briefcase className="w-4 h-4" />,
  'Tutorials': <GraduationCap className="w-4 h-4" />,
  'News & Updates': <Newspaper className="w-4 h-4" />
};

export default function BlogClient({ initialBlogs = [] }: { initialBlogs?: Blog[] }) {
  const { error, success } = useToast();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [activeCategory, setActiveCategory] = useState('All Blogs');
  const [activeTab, setActiveTab] = useState('All');
  const [sortBy, setSortBy] = useState('Newest First');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllTags, setShowAllTags] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [loading, setLoading] = useState(initialBlogs.length === 0);
  const [savedBlogs, setSavedBlogs] = useState<string[]>([]);

  useEffect(() => {
    if (user?.savedBlogs) {
      setSavedBlogs(user.savedBlogs);
    }
  }, [user?.savedBlogs]);

  const handleToggleSave = async (e: React.MouseEvent, blogId: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      error('Please log in to save blogs.');
      router.push('/login');
      return;
    }

    const isSaved = savedBlogs.includes(blogId);
    
    if (isSaved) {
      setSavedBlogs(prev => prev.filter(id => id !== blogId));
    } else {
      setSavedBlogs(prev => [...prev, blogId]);
    }
    trackFavorite('blog', isSaved ? 'remove' : 'add', blogId);

    try {
      const res = await fetch(getEndpoint(`/api/user/saved-blogs/${blogId}`), { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      const data = await res.json();
      if (!data.success) setSavedBlogs(user?.savedBlogs || []);
    } catch (err) {
      setSavedBlogs(user?.savedBlogs || []);
    }
  };

  useEffect(() => {
    fetch(getEndpoint('/api/blogs'))
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setBlogs(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch blogs:', err);
        setLoading(false);
      });
  }, []);

  // 1. Dynamic Categories
  const categories = useMemo(() => {
    const counts: Record<string, number> = { 'All Blogs': blogs.length };
    blogs.forEach(b => {
      counts[b.category] = (counts[b.category] || 0) + 1;
    });

    const catNames = ['All Blogs', 'AI & Tools', 'Productivity', 'Development', 'Design', 'Marketing', 'Business', 'Tutorials', 'News & Updates'];
    return catNames.map(name => ({
      name,
      icon: CATEGORY_ICONS[name] || <Sparkles className="w-4 h-4" />,
      count: counts[name] || 0
    })).filter(cat => cat.count > 0 || cat.name === 'All Blogs');
  }, [blogs]);

  // 2. Dynamic Tags
  const popularTags = useMemo(() => {
    const tagCounts: Record<string, number> = {};
    blogs.forEach(b => {
      if (b.tags) {
        b.tags.forEach(t => {
          tagCounts[t] = (tagCounts[t] || 0) + 1;
        });
      }
    });
    // Fallback if no tags
    if (Object.keys(tagCounts).length === 0) {
      return ['AI', 'ChatGPT', 'Web Development', 'No Code', 'Automation', 'Productivity', 'SaaS', 'Design'];
    }
    // Sort by count
    return Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(entry => entry[0]);
  }, [blogs]);

  // 3. Filtering & Sorting
  const filteredBlogs = useMemo(() => {
    let result = [...blogs];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(b => 
        b.title.toLowerCase().includes(q) || 
        b.description.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
      );
    }

    // Category
    if (activeCategory !== 'All Blogs') {
      result = result.filter(b => b.category === activeCategory);
    }

    // Sort
    if (sortBy === 'Newest First' || activeTab === 'Latest') {
      result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    } else if (sortBy === 'Oldest First') {
      result.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
    }

    // Tabs logic (mock popular/trending)
    if (activeTab === 'Popular') {
       // just reverse for variation
       result.reverse();
    } else if (activeTab === 'Trending') {
       // sort by shortest title as a mock for trending
       result.sort((a, b) => a.title.length - b.title.length);
    } else if (activeTab === 'Favorites') {
       result = result.filter(b => savedBlogs.includes(b._id));
    }

    return result;
  }, [blogs, searchQuery, activeCategory, activeTab, sortBy, savedBlogs]);

  // 4. Featured Post (always the first post from the total blogs)
  const featuredPost = blogs.length > 0 ? blogs[0] : undefined;
  
  // Exclude featured from the list shown below it if possible
  const listBlogs = filteredBlogs.filter(b => featuredPost ? b._id !== featuredPost._id : true);

  // 5. Popular Posts (Side bar)
  const popularPostsSide = useMemo(() => {
    // pick some posts, for variation pick from the end or just sort randomly
    return [...blogs].reverse().slice(0, 4);
  }, [blogs]);

  const iconBgs = ['bg-[#10A37F]', 'bg-[#6D5EF8]', 'bg-[#F59E0B]', 'bg-[#FCA5A5]'];

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full">
      
      {/* Left Sidebar */}
      <aside className="hidden lg:block w-[250px] shrink-0 space-y-8 sticky top-24 self-start pb-4">
        
        {/* Categories */}
        <div>
          <h3 className="font-bold text-[#111827] mb-4">Explore Blogs</h3>
          <ul className="space-y-1">
            {categories.map((cat) => (
              <li key={cat.name}>
                <button 
                  onClick={() => {
                    setActiveCategory(cat.name);
                    trackContentFilter('blog', cat.name);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    activeCategory === cat.name 
                      ? 'bg-[#F5F3FF] text-[#6D5EF8]' 
                      : 'text-[#4B5563] hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`${activeCategory === cat.name ? 'text-[#6D5EF8]' : 'text-gray-400'}`}>
                      {cat.icon}
                    </span>
                    {cat.name}
                  </div>
                  <span className={`text-[11px] ${activeCategory === cat.name ? 'text-[#6D5EF8] font-bold' : 'text-gray-400'}`}>
                    {cat.count}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <NewsletterSectionWrapper>
          <div className="bg-[#F5F3FF] rounded-2xl p-5 border border-[#EDE9FE]">
            <h3 className="font-bold text-[#6D5EF8] mb-2 text-sm">Stay Updated</h3>
            <p className="text-xs text-[#4B5563] leading-relaxed mb-4">
              Subscribe to get the latest updates and amazing tips delivered to your inbox.
            </p>
            <NewsletterForm 
              className="space-y-2"
              inputClassName="w-full px-3 py-2 bg-white border border-[#E5E7EB] rounded-lg text-xs focus:outline-none focus:border-[#6D5EF8]"
              buttonClassName="w-full py-2 bg-[#6D5EF8] text-white rounded-lg text-xs font-bold hover:bg-[#5B4DF5] transition-colors flex items-center justify-center gap-2"
              buttonText={<><Send className="w-3 h-3" /> Subscribe</>}
            />
          </div>
        </NewsletterSectionWrapper>

        {/* Popular Tags */}
        <div>
          <h3 className="font-bold text-[#111827] mb-4 text-sm">Popular Tags</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {popularTags.slice(0, showAllTags ? popularTags.length : 8).map(tag => (
              <button 
                key={tag} 
                onClick={() => setSearchQuery(tag)}
                className="px-3 py-1.5 bg-white border border-[#E5E7EB] rounded-lg text-[11px] font-semibold text-[#4B5563] hover:border-[#6D5EF8] hover:text-[#6D5EF8] transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
          {popularTags.length > 8 && (
            <button 
              onClick={() => setShowAllTags(!showAllTags)}
              className="text-[11px] font-bold text-[#6D5EF8] hover:text-[#5B4DF5] transition-colors flex items-center gap-1"
            >
              {showAllTags ? 'Show less tags' : 'View all tags'} 
              <ArrowRight className={`w-3 h-3 transition-transform ${showAllTags ? '-scale-x-100' : ''}`} />
            </button>
          )}
        </div>

      </aside>

      {/* Main Content */}
      <main className="flex-grow min-w-0">
        
        {/* Mobile Categories Toggle */}
        <div className="mb-4 lg:hidden">
          <button 
            onClick={() => setIsMobileCategoriesOpen(true)}
            className="flex items-center gap-2 w-fit px-4 py-2.5 bg-white border border-[#E5E7EB] rounded-xl hover:bg-[#F9FAFB] transition-colors shadow-sm text-[#111827] font-semibold"
          >
            <Menu className="w-5 h-5 text-[#6D5EF8]" />
            Categories
          </button>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-[#111827] mb-2 tracking-tight">
              Latest from <span className="text-[#6D5EF8]">QuickTools.ai</span> Blog
            </h1>
            <p className="text-[#6B7280] text-sm">Insights, tutorials and updates to help you work smarter with AI.</p>
          </div>
          
          <div className="flex items-center gap-2 shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search blogs..." 
                className="pl-9 pr-4 py-2 bg-white border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6D5EF8] shadow-sm w-full md:w-56"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-md bg-[#6D5EF8]/30 animate-pulse"></div>
              <Loader2 className="w-10 h-10 text-[#6D5EF8] animate-spin relative z-10" />
            </div>
            <p className="text-[#6B7280] font-medium animate-pulse">Generating fresh AI news...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 text-gray-500">No blogs generated yet. Check the backend.</div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <Link href={`/blog/${featuredPost.slug}`} className="block relative bg-white border border-[#E5E7EB] rounded-3xl shadow-sm overflow-hidden mb-8 group cursor-pointer flex flex-col md:flex-row min-h-[320px]">
                {/* Content Side */}
                <div className="p-8 md:w-1/2 flex flex-col justify-center relative z-10 bg-white">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 bg-[#F5F3FF] text-[#6D5EF8] text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                      <StarIcon className="w-3 h-3 fill-current" /> Featured
                    </span>
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{featuredPost.category}</span>
                    <button 
                      onClick={(e) => handleToggleSave(e, featuredPost._id)}
                      className={`transition-colors p-1.5 rounded-full ${savedBlogs.includes(featuredPost._id) ? 'bg-[#F5F3FF] text-[#6D5EF8]' : 'bg-gray-100 text-gray-400 hover:text-[#6D5EF8]'}`}
                    >
                      <Bookmark className={`w-4 h-4 ${savedBlogs.includes(featuredPost._id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-[#111827] mb-4 leading-tight group-hover:text-[#6D5EF8] transition-colors line-clamp-3">
                    {featuredPost.title}
                  </h2>
                  <p className="text-[#4B5563] mb-6 text-sm leading-relaxed line-clamp-2">
                    {featuredPost.description}
                  </p>
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden shrink-0 border border-gray-100">
                      <Image src={featuredPost.author.avatar} width={32} height={32} alt={featuredPost.author.name} className="object-cover" />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                      <span className="font-bold text-[#111827]">{featuredPost.author.name}</span>
                      <span>•</span>
                      <span>{new Date(featuredPost.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span>•</span>
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                </div>
                
                {/* Image Side */}
                <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden flex items-center justify-center">
                  <Image src={featuredPost.coverImage} fill alt={featuredPost.title} className="object-cover" />
                  <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 hidden md:block"></div>
                </div>
              </Link>
            )}

            {/* Filters Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E5E7EB] gap-4 mb-6">
              <div className="flex items-center gap-6 overflow-x-auto w-full sm:w-auto pt-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {['All', 'Latest', 'Popular', 'Trending', 'Favorites'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`whitespace-nowrap px-1 text-sm font-bold pb-3 border-b-2 transition-colors ${activeTab === tab ? 'border-[#6D5EF8] text-[#6D5EF8]' : 'border-transparent text-[#6B7280] hover:text-[#111827]'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="relative shrink-0 mb-3 sm:mb-2 group z-20">
                <button className="flex items-center justify-between w-[140px] appearance-none bg-white border border-[#E5E7EB] rounded-xl pl-4 pr-3 py-2 text-sm font-bold text-[#111827] cursor-pointer hover:border-[#6B7280] transition-colors">
                  {sortBy}
                  <ChevronDown className="w-4 h-4 text-[#6B7280]" />
                </button>
                <div className="absolute right-0 top-full mt-1 w-[140px] bg-white border border-gray-400 shadow-lg hidden group-hover:block z-50 rounded-sm overflow-hidden">
                  <div className="flex flex-col">
                    {['Newest First', 'Oldest First'].map(option => (
                       <button 
                         key={option}
                         onClick={() => setSortBy(option)}
                         className={`text-left px-4 py-2 text-sm font-medium ${sortBy === option ? 'bg-[#1877F2] text-white' : 'text-[#111827] hover:bg-gray-100'}`}
                       >
                         {option}
                       </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* List of Posts */}
            <div className="space-y-4">
              {listBlogs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-[#F9FAFB] border border-dashed border-[#E5E7EB] rounded-3xl group">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-5 relative">
                    <div className="absolute inset-0 bg-[#6D5EF8]/5 rounded-full scale-150 animate-pulse"></div>
                    <SearchX className="w-8 h-8 text-[#6B7280] group-hover:text-[#6D5EF8] transition-colors relative z-10" />
                  </div>
                  <h3 className="text-xl font-bold text-[#111827] mb-2">No more posts here</h3>
                  <p className="text-[#6B7280] text-sm max-w-sm mb-6">
                    It looks like you've reached the end of this category or search criteria.
                  </p>
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('All Blogs');
                      setActiveTab('All');
                    }}
                    className="px-6 py-2.5 bg-white border border-[#E5E7EB] rounded-xl text-sm font-bold text-[#6D5EF8] hover:border-[#6D5EF8] hover:shadow-sm transition-all"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                listBlogs.map((post) => (
                  <Link href={`/blog/${post.slug}`} key={post._id} className="block bg-white border border-[#E5E7EB] rounded-2xl p-4 flex flex-col sm:flex-row gap-5 hover:border-[#6D5EF8] hover:shadow-md transition-all group cursor-pointer">
                    
                    {/* Thumbnail */}
                    <div className={`w-full sm:w-48 h-48 sm:h-auto rounded-xl shrink-0 overflow-hidden relative`}>
                      <Image src={post.coverImage} fill alt={post.title} className="object-cover transition-transform group-hover:scale-105 duration-500" />
                    </div>

                    {/* Content */}
                    <div className="flex-grow flex flex-col py-1">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[11px] font-bold text-[#6D5EF8] uppercase tracking-wider">{post.category}</span>
                        <button 
                          onClick={(e) => handleToggleSave(e, post._id)}
                          className={`transition-colors p-1 ${savedBlogs.includes(post._id) ? 'text-[#6D5EF8]' : 'text-gray-400 hover:text-[#6D5EF8]'}`}
                        >
                          <Bookmark className={`w-4 h-4 ${savedBlogs.includes(post._id) ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                      
                      <h3 className="text-lg font-bold text-[#111827] mb-2 leading-tight group-hover:text-[#6D5EF8] transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-[#6B7280] text-sm mb-4 line-clamp-2">
                        {post.description}
                      </p>
                      
                      <div className="flex items-center gap-3 mt-auto">
                        <div className="w-6 h-6 bg-gray-200 rounded-full overflow-hidden shrink-0 border border-gray-100 flex items-center justify-center">
                          <Image src={post.author.avatar} width={24} height={24} alt={post.author.name} className="object-cover" />
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                          <span className="font-bold text-[#111827]">{post.author.name}</span>
                          <span>•</span>
                          <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </>
        )}

      </main>

      {/* Right Sidebar */}
      <aside className="w-full lg:w-[280px] xl:w-[300px] shrink-0 space-y-8 hidden lg:block lg:sticky lg:top-24 lg:self-start pb-4">
        
        {/* Popular Posts */}
        {popularPostsSide.length > 0 && (
          <div>
            <h3 className="font-bold text-[#111827] mb-4">Popular Posts</h3>
            <div className="space-y-4">
              {popularPostsSide.map((post) => (
                <Link href={`/blog/${post.slug}`} key={post._id} className="flex gap-3 group cursor-pointer items-center">
                  <div className="w-14 h-14 rounded-xl shrink-0 relative overflow-hidden shadow-sm border border-gray-100">
                    <Image src={post.coverImage} fill alt={post.title} className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-[#111827] leading-tight mb-1 group-hover:text-[#6D5EF8] transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-[11px] text-[#6B7280]">{post.readTime}</p>
                  </div>
                  <button 
                    onClick={(e) => handleToggleSave(e, post._id)}
                    className={`transition-colors p-1 ${savedBlogs.includes(post._id) ? 'text-[#6D5EF8]' : 'text-gray-400 hover:text-[#6D5EF8]'}`}
                  >
                    <Bookmark className={`w-4 h-4 ${savedBlogs.includes(post._id) ? 'fill-current' : ''}`} />
                  </button>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Tags CloudSun */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-[#111827] mb-4 text-sm">Tags CloudSun</h3>
          <div className="flex flex-wrap gap-2">
            {popularTags.map(tag => (
              <button 
                key={`cloud-${tag}`} 
                onClick={() => setSearchQuery(tag)}
                className="px-3 py-1.5 bg-gray-50 border border-[#E5E7EB] rounded-lg text-[11px] font-semibold text-[#4B5563] hover:bg-white hover:border-[#6D5EF8] hover:text-[#6D5EF8] transition-all shadow-sm"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Promo Box */}
        <div className="bg-[#F5F3FF] border border-[#EDE9FE] rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#6D5EF8]/10 rounded-full blur-2xl"></div>
          <div className="w-10 h-10 bg-[#6D5EF8] rounded-xl flex items-center justify-center mb-4 shadow-sm relative z-10">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <h3 className="font-bold text-[#111827] mb-2 relative z-10">Try Our AI Tools</h3>
          <p className="text-xs text-[#4B5563] leading-relaxed mb-4 relative z-10">
            Explore 100+ AI-powered tools to boost your productivity.
          </p>
          <Link href="/tools" className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#6D5EF8] text-white rounded-xl text-xs font-bold hover:bg-[#5B4DF5] transition-all shadow-md active:scale-95 relative z-10">
            Explore Tools <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </aside>

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
              <ul className="space-y-1">
                {categories.map((cat) => (
                  <li key={cat.name}>
                    <button 
                      onClick={() => {
                        setActiveCategory(cat.name);
                        trackContentFilter('blog', cat.name);
                        setIsMobileCategoriesOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                        activeCategory === cat.name 
                          ? 'bg-[#F5F3FF] text-[#6D5EF8]' 
                          : 'text-[#4B5563] hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`${activeCategory === cat.name ? 'text-[#6D5EF8]' : 'text-gray-400'}`}>
                          {cat.icon}
                        </span>
                        {cat.name}
                      </div>
                      <span className={`text-[11px] ${activeCategory === cat.name ? 'text-[#6D5EF8] font-bold' : 'text-gray-400'}`}>
                        {cat.count}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
