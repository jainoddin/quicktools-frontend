'use client';
import React, { useState, useEffect, useMemo, Suspense } from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { 
  Star, ArrowRight, ChevronDown, Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { allTools, IconMap, isNewTool } from '../../../components/tools/ToolsClient';
import { useAuth } from '../../../contexts/AuthContext';
import { getEndpoint } from '../../../lib/api';
import { useSearchParams } from 'next/navigation';

function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const Icon = IconMap[name];
  if (!Icon) return null;
  return <Icon className={className} />;
}

function AllToolsContent() {
  const { user, updateUser } = useAuth();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [activeFilter, setActiveFilter] = useState('All');
  const [starredTools, setStarredTools] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  
  const filters = ['All', 'Popular', 'New'];

  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
  }, [searchParams]);

  useEffect(() => {
    if (user?.savedTools) {
      setStarredTools(user.savedTools);
    }
  }, [user]);

  const categoryQuery = searchParams.get('category');

  const filteredTools = useMemo(() => {
    let result = allTools;

    if (categoryQuery) {
      result = result.filter(t => t.category === categoryQuery);
    }

    if (activeFilter === 'Popular') {
      result = result.filter(t => t.tag?.type === 'popular');
    } else if (activeFilter === 'New') {
      result = result.filter(t => isNewTool(t.createdAt));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t => 
        t.name.toLowerCase().includes(q) || 
        t.description.toLowerCase().includes(q)
      );
    }

    return result;
  }, [activeFilter, searchQuery, categoryQuery]);

  const toggleStar = async (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    e.stopPropagation();

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
        setStarredTools(starredTools); // Revert on failure
      }
    } catch (err) {
      console.error('Failed to toggle star:', err);
      setStarredTools(starredTools); // Revert on failure
    }
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#111827] mb-2 tracking-tight">
          {searchQuery ? `Search Results for "${searchQuery}"` : categoryQuery ? `${categoryQuery} Tools` : 'All AI Tools'}
        </h1>
        <p className="text-[#6B7280] text-lg">
          {searchQuery 
            ? `Found ${filteredTools.length} tools` 
            : categoryQuery 
              ? `${filteredTools.length} tools in ${categoryQuery}`
              : `${allTools.length} AI-powered tools to boost your productivity ✨`}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
          {filters.map((filter, i) => {
            const isActive = activeFilter === filter;
            return (
              <button 
                key={filter} 
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors shadow-sm ${isActive ? 'bg-[#6D5EF8] text-white shadow-md shadow-[#6D5EF8]/20' : 'bg-white border border-[#E5E7EB] text-[#4B5563] hover:bg-[#F9FAFB]'}`}
              >
                {filter}
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredTools.length > 0 ? (
          filteredTools.map((tool, index) => {
            const isStarred = starredTools.includes(tool.slug);
            const toolIsNew = isNewTool(tool.createdAt);
            
            return (
              <Link href={tool.slug} key={index} className="group">
              <div className="bg-white p-5 rounded-2xl border border-[#E5E7EB] hover:border-[#6D5EF8] hover:shadow-xl hover:shadow-[#6D5EF8]/10 transition-all duration-300 relative h-full flex flex-col">

                {/* Top Row: Icon and Tag */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner ${tool.color}`}>
                    <DynamicIcon name={tool.iconName} className="w-7 h-7" />
                  </div>

                  <div className="flex gap-2 items-center">
                    {tool.tag && !toolIsNew && (
                      <div className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-red-50 text-red-500`}>
                        <DynamicIcon name={tool.tag.iconName} className="w-3 h-3" />
                        {tool.tag.label}
                      </div>
                    )}
                    {toolIsNew && (
                      <div className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-green-50 text-green-600`}>
                        <Sparkles className="w-3 h-3" />
                        New
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

                {/* Content */}
                <h3 className="text-lg font-bold text-[#111827] mb-2 group-hover:text-[#6D5EF8] transition-colors">
                  {tool.name}
                </h3>
                <p className="text-[#6B7280] text-sm leading-relaxed mb-6 flex-grow">
                  {tool.description}
                </p>

                {/* Try Now Button */}
                <div className="w-full py-2.5 bg-[#F8FAFC] group-hover:bg-[#EEF2FF] text-[#6D5EF8] rounded-xl font-semibold text-[14px] flex items-center justify-center transition-colors">
                  Try Now <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>

              </div>
            </Link>
          );
        })
      ) : (
        <div className="col-span-full bg-white border border-dashed border-[#E5E7EB] rounded-2xl p-12 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-[#111827] mb-2">No tools found</h3>
          <p className="text-[#6B7280] text-sm">We couldn't find any tools matching your search.</p>
        </div>
      )}
      </div>
    </>
  );
}

export default function AllToolsPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={
        <div className="py-12 flex justify-center">
          <div className="w-8 h-8 border-4 border-[#6D5EF8]/30 border-t-[#6D5EF8] rounded-full animate-spin"></div>
        </div>
      }>
        <AllToolsContent />
      </Suspense>
    </DashboardLayout>
  );
}
