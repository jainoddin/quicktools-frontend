'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Bookmark, SearchX, Sparkles } from 'lucide-react';
import PromptCard from './PromptCard';
import PromptLoginModal from './PromptLoginModal';
import { useAuth } from '../../contexts/AuthContext';

interface PromptTabsProps {
  trendingPrompts: any[];
  newestPrompts: any[];
  initialTab?: 'trending' | 'newest';
  query?: string;
}

type PromptTab = 'trending' | 'newest' | 'saved';

export default function PromptTabs({ trendingPrompts, newestPrompts, initialTab = 'trending', query = '' }: PromptTabsProps) {
  const { user, isLoading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<PromptTab>(initialTab);
  const [savedPrompts, setSavedPrompts] = useState<any[]>([]);
  const [savedLoading, setSavedLoading] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const loadSaved = useCallback(async () => {
    if (!user) return;
    setSavedLoading(true);
    try {
      const response = await fetch('/api/prompts/favorites/me', { credentials: 'include', cache: 'no-store' });
      const data = await response.json();
      setSavedPrompts(response.ok && data.success ? data.data : []);
    } catch {
      setSavedPrompts([]);
    } finally {
      setSavedLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (authLoading) return;
    const hash = window.location.hash.slice(1) as PromptTab;
    if (!['newest', 'trending', 'saved'].includes(hash)) return;
    if (hash === 'saved' && !user) {
      setShowLoginPopup(true);
      return;
    }
    setActiveTab(hash);
    requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }, [user, authLoading]);

  useEffect(() => {
    if (activeTab === 'saved' && user) loadSaved();
  }, [activeTab, user, loadSaved]);

  useEffect(() => {
    const refresh = () => { if (activeTab === 'saved') loadSaved(); };
    window.addEventListener('prompt-favorites-changed', refresh);
    return () => window.removeEventListener('prompt-favorites-changed', refresh);
  }, [activeTab, loadSaved]);

  const openTab = (tab: PromptTab) => {
    if (tab === 'saved' && authLoading) return;
    if (tab === 'saved' && !user) {
      setShowLoginPopup(true);
      return;
    }
    setActiveTab(tab);
    window.history.replaceState(null, '', `#${tab}`);
  };

  const promptsToShow = activeTab === 'trending' ? trendingPrompts : activeTab === 'newest' ? newestPrompts : savedPrompts;

  return (
    <section id={activeTab} className="w-full bg-[#F8FAFC] py-12 scroll-mt-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="sr-only">{activeTab === 'trending' ? 'Trending AI Prompts' : activeTab === 'newest' ? 'Newest AI Prompts' : 'Your Saved AI Prompts'}</h2>
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-200 mb-8 pb-4">
          <div className="flex flex-wrap items-center gap-x-5 sm:gap-x-8 gap-y-4 text-base sm:text-lg font-bold max-w-full">
            {(['trending', 'newest', 'saved'] as PromptTab[]).map(tab => (
              <button
                key={tab}
                onClick={() => openTab(tab)}
                className={`relative pb-4 -mb-5 whitespace-nowrap transition-colors flex items-center gap-2 ${activeTab === tab ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-900'}`}
              >
                {tab === 'saved' && <Bookmark className="w-4 h-4" />}
                {tab === 'trending' ? 'Trending Prompts' : tab === 'newest' ? 'Newest Prompts' : 'Saved'}
              </button>
            ))}
          </div>
          {activeTab !== 'saved' && (
            <Link href={`/prompts?sort=${activeTab}`} className="text-indigo-600 font-semibold flex items-center gap-1 hover:text-indigo-700 transition mt-4 sm:mt-0 text-sm">
              View all {activeTab} <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {savedLoading ? (
          <div className="text-center py-12 text-gray-500">Loading your saved prompts...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {promptsToShow.map((prompt: any) => <PromptCard key={prompt.id || prompt._id} prompt={prompt} />)}
          </div>
        )}

        {!savedLoading && promptsToShow.length === 0 && (
          <div className="max-w-2xl mx-auto text-center bg-white border border-gray-200 rounded-3xl px-6 py-10 shadow-sm">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4"><SearchX className="w-7 h-7" /></div>
            <h3 className="text-xl font-black text-gray-900 mb-2">{activeTab === 'saved' ? 'No saved prompts yet' : query ? `No prompts found for “${query}”` : `No ${activeTab} prompts found`}</h3>
            <p className="text-sm text-gray-500 mb-6">{activeTab === 'saved' ? 'Use the bookmark button on any prompt to keep it here.' : query ? 'Try a shorter keyword or browse one of the popular topics below.' : 'New prompts are being prepared. Browse the complete prompt library for now.'}</p>
            {activeTab !== 'saved' && <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
              {['Business Plan', 'Resume', 'SEO', 'Coding', 'Social Media'].map(item => <Link key={item} href={`/prompts?q=${encodeURIComponent(item)}`} className="px-3 py-1.5 rounded-full border border-gray-200 text-sm text-gray-600 hover:border-indigo-300 hover:text-indigo-600">{item}</Link>)}
            </div>}
            <Link href="/prompts" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-xl"><Sparkles className="w-4 h-4" /> Browse all prompts</Link>
          </div>
        )}
      </div>
      <PromptLoginModal open={showLoginPopup} onClose={() => setShowLoginPopup(false)} />
    </section>
  );
}
