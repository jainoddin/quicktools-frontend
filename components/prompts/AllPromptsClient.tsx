'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Bookmark, SearchX } from 'lucide-react';
import PromptCard from './PromptCard';
import PromptLoginModal from './PromptLoginModal';
import { useAuth } from '../../contexts/AuthContext';

const PAGE_SIZE = 20;
type LibraryTab = 'trending' | 'newest' | 'saved';

function PromptCardShimmer() {
  return (
    <div className="min-h-[330px] animate-pulse rounded-[26px] border border-slate-200 bg-white p-6">
      <div className="mb-8 flex justify-between"><div className="h-5 w-28 rounded bg-slate-200" /><div className="h-5 w-16 rounded-full bg-slate-100" /></div>
      <div className="mb-4 h-3 w-20 rounded bg-indigo-100" />
      <div className="space-y-3"><div className="h-6 w-full rounded bg-slate-200" /><div className="h-6 w-4/5 rounded bg-slate-200" /><div className="h-4 w-full rounded bg-slate-100" /><div className="h-4 w-2/3 rounded bg-slate-100" /></div>
      <div className="mt-10 h-px bg-slate-100" /><div className="mt-5 flex justify-between"><div className="h-5 w-20 rounded bg-slate-100" /><div className="h-10 w-32 rounded-xl bg-indigo-100" /></div>
    </div>
  );
}

export default function AllPromptsClient({ initialPrompts, initialTotal, initialTab }: { initialPrompts: any[]; initialTotal: number; initialTab: LibraryTab }) {
  const { user, isLoading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<LibraryTab>(initialTab);
  const [prompts, setPrompts] = useState(initialPrompts);
  const [total, setTotal] = useState(initialTotal);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const initialSavedHandledRef = useRef(false);
  const hasMore = activeTab !== 'saved' && prompts.length < total;

  const fetchPage = useCallback(async (tab: Exclude<LibraryTab, 'saved'>, requestedPage: number) => {
    const sort = tab === 'trending' ? 'trending' : 'recent';
    const response = await fetch(`/api/prompts?sort=${sort}&limit=${PAGE_SIZE}&page=${requestedPage}`, { cache: 'no-store' });
    const payload = await response.json();
    if (!response.ok || !payload.success) throw new Error('Unable to load prompts');
    return payload;
  }, []);

  const loadSaved = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setFailed(false);
    try {
      const response = await fetch('/api/prompts/favorites/me', { credentials: 'include', cache: 'no-store' });
      const payload = await response.json();
      if (!response.ok || !payload.success) throw new Error('Unable to load saved prompts');
      setPrompts(payload.data || []);
      setTotal(payload.data?.length || 0);
      setPage(1);
    } catch {
      setPrompts([]);
      setTotal(0);
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const openTab = useCallback(async (tab: LibraryTab) => {
    if (tab === 'saved' && authLoading) return;
    if (tab === 'saved' && !user) {
      setShowLogin(true);
      return;
    }
    setActiveTab(tab);
    window.history.replaceState(null, '', `/prompts/all?tab=${tab}`);
    setFailed(false);
    if (tab === 'saved') {
      await loadSaved();
      return;
    }
    setLoading(true);
    try {
      const payload = await fetchPage(tab, 1);
      setPrompts(payload.data || []);
      setTotal(payload.total || payload.data?.length || 0);
      setPage(1);
    } catch {
      setPrompts([]);
      setTotal(0);
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }, [authLoading, fetchPage, loadSaved, user]);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setFailed(false);
    try {
      const nextPage = page + 1;
      const payload = await fetchPage(activeTab, nextPage);
      setPrompts(current => {
        const known = new Set(current.map(item => String(item._id || item.id)));
        return [...current, ...payload.data.filter((item: any) => !known.has(String(item._id || item.id)))];
      });
      setTotal(payload.total || total);
      setPage(nextPage);
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }, [activeTab, fetchPage, hasMore, loading, page, total]);

  useEffect(() => {
    const legacyTabs = window.location.hash.split('#').filter(Boolean) as LibraryTab[];
    const legacyTab = [...legacyTabs].reverse().find(tab => ['trending', 'newest', 'saved'].includes(tab));
    if (legacyTab) {
      void openTab(legacyTab);
    }
  // Legacy hash URLs are normalized once on mount.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (initialTab !== 'saved' || authLoading || initialSavedHandledRef.current) return;
    initialSavedHandledRef.current = true;
    void openTab('saved');
  }, [activeTab, authLoading, initialTab, openTab]);

  useEffect(() => {
    const refresh = () => { if (activeTab === 'saved') void loadSaved(); };
    window.addEventListener('prompt-favorites-changed', refresh);
    return () => window.removeEventListener('prompt-favorites-changed', refresh);
  }, [activeTab, loadSaved]);

  useEffect(() => {
    const target = sentinelRef.current;
    if (!target || activeTab === 'saved') return;
    const observer = new IntersectionObserver(entries => {
      if (entries[0]?.isIntersecting) void loadMore();
    }, { rootMargin: '500px 0px' });
    observer.observe(target);
    return () => observer.disconnect();
  }, [activeTab, loadMore]);

  return (
    <>
      <div id="all-prompt-tabs" className="mb-7 scroll-mt-24 border-b border-slate-200">
        <div className="grid grid-cols-3 gap-1 sm:flex sm:gap-8">
          {(['trending', 'newest', 'saved'] as LibraryTab[]).map(tab => (
            <button key={tab} onClick={() => void openTab(tab)} className={`flex items-center justify-center gap-1.5 whitespace-nowrap border-b-2 px-1 pb-3 text-sm font-bold transition sm:text-lg ${activeTab === tab ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-900'}`}>
              {tab === 'saved' && <Bookmark className="h-4 w-4" />}
              {tab === 'trending' ? 'Trending Prompts' : tab === 'newest' ? 'Newest Prompts' : 'Saved'}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between gap-4 text-sm text-slate-500"><span>Showing <strong className="text-slate-900">{prompts.length}</strong> of {total} prompts</span><span>{activeTab === 'trending' ? 'Most popular' : activeTab === 'newest' ? 'Newest first' : 'Your library'}</span></div>
      {!loading && prompts.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm"><SearchX className="mx-auto h-9 w-9 text-indigo-500" /><h2 className="mt-4 text-xl font-black">{activeTab === 'saved' ? 'No saved prompts yet' : `No ${activeTab} prompts found`}</h2><p className="mt-2 text-slate-500">{activeTab === 'saved' ? 'Use the bookmark icon on any prompt to keep it here.' : 'Please try again in a moment.'}</p></div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
          {prompts.map(prompt => <PromptCard key={prompt._id || prompt.id} prompt={prompt} />)}
          {loading && Array.from({ length: 4 }, (_, index) => <PromptCardShimmer key={`shimmer-${index}`} />)}
        </div>
      )}
      <div ref={sentinelRef} className="h-8" aria-hidden="true" />
      {failed && <div className="mt-5 text-center"><button onClick={() => activeTab === 'saved' ? void loadSaved() : void loadMore()} className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-indigo-700">Try loading again</button></div>}
      {!hasMore && prompts.length > 0 && activeTab !== 'saved' && <p className="mt-8 text-center text-sm font-medium text-slate-500">You have reached the end of the prompt library.</p>}
      <PromptLoginModal open={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}
