'use client';

import { useEffect, useState } from 'react';
import { Bookmark, Loader2 } from 'lucide-react';
import Link from 'next/link';
import PromptCard from '@/components/prompts/PromptCard';
import { getEndpoint } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

export default function SavedPromptsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [prompts, setPrompts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (authLoading) return;
    if (!user) { setLoading(false); return; }
    const load = () => fetch(getEndpoint('/api/prompts/favorites/me'), { credentials: 'include', cache: 'no-store' }).then(res => res.json()).then(data => setPrompts(data.success ? data.data : [])).finally(() => setLoading(false));
    load();
    window.addEventListener('prompt-favorites-changed', load);
    return () => window.removeEventListener('prompt-favorites-changed', load);
  }, [user, authLoading]);

  return <div className="p-5 sm:p-8">
    <div className="flex items-center gap-3 mb-8"><div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center"><Bookmark className="w-5 h-5" /></div><h1 className="text-2xl font-bold text-gray-900">Saved Prompts</h1></div>
    {loading || authLoading ? <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-indigo-600" /></div> : !user ? <div className="bg-white rounded-3xl border p-12 text-center"><h2 className="text-xl font-bold mb-2">Login to view saved prompts</h2><Link href="/login" className="text-indigo-600 font-semibold">Login</Link></div> : prompts.length ? <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">{prompts.map(prompt => <PromptCard key={prompt._id} prompt={prompt} />)}</div> : <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center shadow-sm"><Bookmark className="w-12 h-12 text-gray-300 mx-auto mb-4" /><h2 className="text-xl font-bold text-gray-700 mb-2">No saved prompts yet</h2><p className="text-gray-500 mb-5">Save prompts from the hub and they will appear here.</p><Link href="/prompts" className="text-indigo-600 font-semibold">Browse prompts</Link></div>}
  </div>;
}
