'use client';
import React, { useState, useEffect, useMemo } from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { 
  Star, ArrowRight, Sparkles, Heart
} from 'lucide-react';
import Link from 'next/link';
import { allTools, IconMap, isNewTool } from '../../../components/tools/ToolsClient';
import { useAuth } from '../../../contexts/AuthContext';
import { getEndpoint } from '../../../lib/api';

function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const Icon = IconMap[name];
  if (!Icon) return null;
  return <Icon className={className} />;
}

export default function FavoritesPage() {
  const { user, updateUser } = useAuth();
  const [starredTools, setStarredTools] = useState<string[]>([]);

  useEffect(() => {
    if (user?.savedTools) {
      setStarredTools(user.savedTools);
    }
  }, [user]);

  const favoriteTools = useMemo(() => {
    return allTools.filter(t => starredTools.includes(t.slug));
  }, [starredTools]);

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
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#111827] mb-1">Favorites</h1>
        <p className="text-sm text-[#6B7280]">Your favorite tools</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favoriteTools.length > 0 ? (
          favoriteTools.map((tool, index) => {
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
              <Heart className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-[#111827] mb-2">No favorites yet</h3>
            <p className="text-[#6B7280] text-sm max-w-sm">
              You haven't added any tools to your favorites yet. Go to All Tools and click the star icon to save your favorite tools here.
            </p>
            <Link href="/dashboard/all" className="mt-6 inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-xl text-white bg-[#6D5EF8] hover:bg-[#5B4DF5] transition-colors">
              Browse Tools
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
