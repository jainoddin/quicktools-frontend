'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Copy, Bookmark, Check, Eye, ArrowUpRight } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';
import { invalidateFavoritePromptIds, loadFavoritePromptIds } from '../../lib/promptFavorites';
import PromptLoginModal from './PromptLoginModal';
import { trackPromptAction } from '../../lib/promptTracking';

const PROMPT_CARD_RENDER_TIME = Date.now();

interface PromptCardProps {
  prompt: any; // Type properly when integrating API
  displayModel?: string;
}

export default function PromptCard({ prompt, displayModel }: PromptCardProps) {
  const { user, isLoading: authLoading } = useAuth();
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [counts, setCounts] = useState({ views: prompt.views || 0, copies: prompt.copies || 0 });
  
  const modelName = displayModel || prompt.models?.[0] || 'ChatGPT';
  const modelSlug = modelName.toLowerCase();

  useEffect(() => {
    if (!user || !prompt?._id) {
      Promise.resolve().then(() => setIsFavorite(false));
      return;
    }
    loadFavoritePromptIds(user.id).then(ids => setIsFavorite(ids.has(String(prompt._id))));
  }, [user, prompt?._id]);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating if wrapped in a link area
    try {
      await navigator.clipboard.writeText(prompt.prompt);
      setCopied(true);
      toast.success('Prompt copied!');
      
      const data = await trackPromptAction(String(prompt._id), 'copy', { oncePerBrowser: !user });
      if (data) setCounts({ views: data.views || 0, copies: data.copies || 0 });

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  const handleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (authLoading) {
      toast('Checking your account...');
      return;
    }
    if (!user) {
      setShowLoginPopup(true);
      return;
    }
    
    const wasFav = isFavorite;
    setIsFavorite(!isFavorite);
    try {
      const res = await fetch(`/api/prompts/${prompt.slug}/favorite`, { method: 'POST', credentials: 'include' });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error();
      setIsFavorite(Boolean(data.data?.isFavorite));
      invalidateFavoritePromptIds();
      toast.success(data.message || 'Saved to favorites');
    } catch (err) {
      setIsFavorite(wasFav);
      toast.error('Failed to update favorites');
    }
  };

  // Use ogImage (mapped from imageUrl during seed) with fallback
  const publishedDate = new Date(prompt.publishedAt || prompt.createdAt || PROMPT_CARD_RENDER_TIME);
  const isNew = PROMPT_CARD_RENDER_TIME - publishedDate.getTime() <= 7 * 24 * 60 * 60 * 1000;

  return (
    <article className="relative bg-white rounded-[26px] border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-indigo-200 transition-all flex flex-col group min-h-[330px] overflow-hidden">
      <div className="absolute -right-20 -top-24 w-48 h-48 rounded-full bg-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative p-6 sm:p-7 flex flex-col flex-grow">
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-indigo-600">{publishedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span className="text-indigo-300">•</span>
            {isNew && <span className="text-[10px] font-black tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">NEW</span>}
          </div>
          <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full capitalize">{modelName}</span>
        </div>

        <div className="flex-1 min-w-0">
          <span className="inline-flex text-[10px] font-bold uppercase tracking-wider text-indigo-600 mb-3">{prompt.category || 'General'}</span>
          <Link href={`/prompts/${modelSlug}/${prompt.slug}`}>
            <h3 className="text-gray-950 font-black text-[21px] leading-snug mb-3 line-clamp-3 group-hover:text-indigo-600 transition-colors">
              {prompt.title}
            </h3>
          </Link>
          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
            {prompt.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-5 border-t border-gray-100 mt-6 shrink-0">
          <div className="flex items-center gap-2.5 text-xs font-semibold text-gray-500">
            <span className="flex items-center gap-1" title="Views"><Eye className="w-4 h-4" />{counts.views}</span>
            <span className="flex items-center gap-1" title="Copies"><Copy className="w-4 h-4" />{counts.copies}</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleFavorite} aria-label={isFavorite ? 'Remove saved prompt' : 'Save prompt'} aria-pressed={isFavorite} title={isFavorite ? 'Remove saved prompt' : 'Save prompt'} className={`p-2.5 rounded-xl transition-colors ${isFavorite ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-indigo-600'}`}><Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} /></button>
            <button onClick={handleCopy} aria-label="Copy prompt" title="Copy prompt" className="p-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-600 transition-colors">{copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}</button>
            <Link href={`/prompts/${modelSlug}/${prompt.slug}`} aria-label="View prompt" title="View prompt" className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"><ArrowUpRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </div>
      <PromptLoginModal open={showLoginPopup} onClose={() => setShowLoginPopup(false)} />
    </article>
  );
}
