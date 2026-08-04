'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Home, TrendingUp, Clock as ClockIcon, HelpCircle, UserPlus, Bookmark, MessageSquare, Zap } from 'lucide-react';
import { getEndpoint } from '../../lib/api';

const ICONS: any = { 
  'AI Tools': '🚀', 
  'Prompt Engineering': '💡', 
  'Writing': '✍️',
  'Coding': '💻', 
  'Marketing': '📈', 
  'Business': '💼',
  'Business & Startup': '💼',
  'Development': '💻',
  'Design': '🎨',
  'Productivity': '⚡', 
  'No Code': '🛠️',
  'QuickTools Help': '🛠️'
};

export default function CommunitySidebarLeft({ user, activeTab, selectedCategory, onTabChange, onCategoryChange }: any) {
  const router = useRouter();
  const [unansweredBadge, setUnansweredBadge] = useState(0);
  const [metaCategories, setMetaCategories] = useState<{name: string, count: number}[]>([]);

  useEffect(() => {
    fetch(getEndpoint('/api/community/meta'))
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.categories) {
          setMetaCategories(data.data.categories);
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (user) {
      const checkUnanswered = async () => {
        try {
          const res = await fetch(getEndpoint('/api/community/questions?tab=unanswered'));
          if (res.ok) {
            const data = await res.json();
            if (data.success && data.data) {
              const lastSeen = localStorage.getItem('lastSeenUnanswered');
              const lastSeenDate = lastSeen ? new Date(lastSeen) : new Date(0);
              const newQuestions = data.data.filter((q: any) => new Date(q.createdAt) > lastSeenDate);
              setUnansweredBadge(newQuestions.length);
            }
          }
        } catch (e) { }
      };
      checkUnanswered();
    }
  }, [user]);

  const handleUnansweredClick = () => {
    setUnansweredBadge(0);
    localStorage.setItem('lastSeenUnanswered', new Date().toISOString());
    if (onTabChange) onTabChange('unanswered');
    else router.push('/community?tab=unanswered');
  };

  const handleTabClick = (tab: string) => {
    if (onTabChange) {
      if (tab === 'recent') onCategoryChange?.(null);
      onTabChange(tab);
    } else {
      router.push(`/community?tab=${tab}`);
    }
  };

  const handleCategoryClick = (cat: string) => {
    if (onCategoryChange) {
      onCategoryChange(cat);
    } else {
      router.push(`/community?category=${encodeURIComponent(cat)}`);
    }
  };

  return (
    <aside className="hidden lg:block w-[260px] shrink-0 space-y-8 sticky top-24 h-fit pb-4">
      <nav className="space-y-1">
        <button onClick={() => handleTabClick('recent')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold transition-colors ${!selectedCategory && activeTab === 'recent' ? 'bg-[#EEF2FF] text-[#4F46E5]' : 'text-gray-600 hover:bg-gray-50'}`}>
          <Home className="w-5 h-5" /> Home
        </button>
        <button onClick={() => handleTabClick('trending')} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-colors ${activeTab === 'trending' ? 'bg-[#EEF2FF] text-[#4F46E5]' : 'text-gray-600 hover:bg-gray-50'}`}>
          <div className="flex items-center gap-3"><TrendingUp className="w-5 h-5" /> Trending</div>
        </button>
        <button onClick={() => handleTabClick('recent')} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-colors ${activeTab === 'recent' && selectedCategory ? 'bg-[#EEF2FF] text-[#4F46E5]' : 'text-gray-600 hover:bg-gray-50'}`}>
          <div className="flex items-center gap-3"><ClockIcon className="w-5 h-5" /> Latest</div>
        </button>
        
        {user && (
          <>
            <button onClick={handleUnansweredClick} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-colors ${activeTab === 'unanswered' ? 'bg-[#EEF2FF] text-[#4F46E5]' : 'text-gray-600 hover:bg-gray-50'}`}>
              <div className="flex items-center gap-3"><HelpCircle className="w-5 h-5" /> Unanswered</div>
              {unansweredBadge > 0 && (
                <span className="bg-[#EEF2FF] text-[#4F46E5] text-[10px] font-bold px-2 py-0.5 rounded-full">{unansweredBadge}</span>
              )}
            </button>
            
            <div className="pt-4 mt-4 border-t border-gray-100 space-y-1">
              <button onClick={() => handleTabClick('mine')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors ${activeTab === 'mine' ? 'bg-[#EEF2FF] text-[#4F46E5]' : 'text-gray-600 hover:bg-gray-50'}`}>
                <MessageSquare className="w-5 h-5" /> My Questions
              </button>
              <button onClick={() => handleTabClick('my_answers')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors ${activeTab === 'my_answers' ? 'bg-[#EEF2FF] text-[#4F46E5]' : 'text-gray-600 hover:bg-gray-50'}`}>
                <MessageSquare className="w-5 h-5" /> My Answers
              </button>
            </div>
          </>
        )}
      </nav>

      <div>
        <h3 className="text-sm font-bold text-gray-900 mb-3 px-3">Categories</h3>
        <ul className="space-y-1">
          {(metaCategories.length > 0 ? metaCategories : [
            { name: 'AI Tools', count: 0 },
            { name: 'Prompt Engineering', count: 0 },
            { name: 'Coding', count: 0 },
            { name: 'Marketing', count: 0 },
            { name: 'Business', count: 0 },
            { name: 'Productivity', count: 0 },
          ]).map(cat => (
            <li key={cat.name}>
              <button onClick={() => handleCategoryClick(cat.name)} className={`w-full flex items-center justify-between px-3 py-2 hover:bg-gray-50 rounded-xl font-medium text-sm transition-colors ${selectedCategory === cat.name ? 'bg-gray-100 text-gray-900' : 'text-gray-600'}`}>
                <span className="flex items-center gap-2"><span className="text-base">{ICONS[cat.name] || '📁'}</span> {cat.name}</span>
                <span className="text-xs text-gray-400">{cat.count}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {!user && (
        <div className="bg-[#EEF2FF] rounded-2xl p-5 border border-[#4F46E5]/10">
          <div className="w-10 h-10 bg-[#4F46E5] text-white rounded-xl flex items-center justify-center mb-4">
            <Zap className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-gray-900 mb-1">Join the community</h4>
          <p className="text-sm text-gray-600 mb-4">Ask questions, share knowledge and grow together.</p>
          <Link href="/login" className="block text-center w-full bg-[#4F46E5] text-white py-2.5 rounded-xl font-bold hover:bg-[#4338CA] transition-colors text-sm">
            Sign in / Sign up
          </Link>
        </div>
      )}
    </aside>
  );
}
