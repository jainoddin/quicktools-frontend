'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Copy, Share2, Check, ExternalLink, Eye, Bookmark } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';
import { invalidateFavoritePromptIds, loadFavoritePromptIds } from '../../lib/promptFavorites';
import PromptLoginModal from './PromptLoginModal';
import { trackPromptAction } from '../../lib/promptTracking';

export default function PromptDetailClient({ prompt, selectedModel }: { prompt: any; selectedModel?: string }) {
  const { user, isLoading: authLoading } = useAuth();
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [counts, setCounts] = useState({ views: prompt.views || 0, copies: prompt.copies || 0 });
  const trackedView = useRef(false);

  useEffect(() => {
    if (!user || !prompt?._id) {
      Promise.resolve().then(() => setIsFavorite(false));
      return;
    }
    loadFavoritePromptIds(user.id).then(ids => setIsFavorite(ids.has(String(prompt._id))));
  }, [user, prompt?._id]);

  // Track View on Mount
  useEffect(() => {
    if (!prompt?._id || trackedView.current) return;
    trackedView.current = true;
    
    // Fire and forget view tracking
    trackPromptAction(String(prompt._id), 'view', { oncePerBrowser: !user })
      .then(data => { if (data) setCounts({ views: data.views || 0, copies: data.copies || 0 }); })
      .catch(console.error);
    
  }, [prompt?._id, user]);

  if (!prompt) return null;

  const modelKey = String(selectedModel || prompt.models?.[0] || 'chatgpt').toLowerCase();
  const modelName = modelKey === 'chatgpt' ? 'ChatGPT' : modelKey === 'claude' ? 'Claude' : modelKey === 'gemini' ? 'Gemini' : (prompt.models?.[0] || 'ChatGPT');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.prompt);
      setCopied(true);
      toast.success('Prompt copied to clipboard!');
      
      // Track copy action
      const data = await trackPromptAction(String(prompt._id), 'copy', { oncePerBrowser: !user });
      if (data) setCounts({ views: data.views || 0, copies: data.copies || 0 });

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  const handleUse = () => {
    const url = modelKey === 'claude' 
      ? 'https://claude.ai/new' 
      : modelKey === 'gemini' 
        ? 'https://gemini.google.com/app' 
        : 'https://chat.openai.com/';
        
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const toggleFavorite = async () => {
    if (authLoading) {
      toast('Checking your account...');
      return;
    }
    if (!user) {
      setShowLoginPopup(true);
      return;
    }
    
    const wasFavorite = isFavorite;
    setIsFavorite(!isFavorite);
    
    try {
      const res = await fetch(`/api/prompts/${prompt.slug}/favorite`, {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error('Failed');
      setIsFavorite(Boolean(data.data?.isFavorite));
      invalidateFavoritePromptIds();
      toast.success(data.message || 'Updated favorites');
    } catch (error) {
      setIsFavorite(wasFavorite);
      toast.error('Error updating favorites');
    }
  };

  const handleShare = async () => {
    const shareData = { title: prompt.title, text: prompt.description, url: window.location.href };
    try {
      if (navigator.share) await navigator.share(shareData);
      else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied!');
      }
    } catch (error: any) {
      if (error?.name !== 'AbortError') toast.error('Unable to share this prompt');
    }
  };

  return (
    <div className="bg-white rounded-[32px] border border-gray-200 shadow-xl overflow-hidden relative">
      
      <div className="p-8 sm:p-10 lg:p-12">
         <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
               <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg">
                 {prompt.category}
               </span>
               <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg">
                 {modelName}
               </span>
            </div>
            
            <div className="flex items-center gap-2">
               <button onClick={toggleFavorite} aria-label={isFavorite ? 'Remove saved prompt' : 'Save prompt'} aria-pressed={isFavorite} title={isFavorite ? 'Remove saved prompt' : 'Save prompt'} className={`p-3 rounded-xl border transition-colors ${isFavorite ? 'border-indigo-200 bg-indigo-50 text-indigo-600' : 'border-gray-200 bg-white text-gray-500 hover:border-indigo-200 hover:text-indigo-600'}`}>
                 <Bookmark className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
               </button>
               <button onClick={handleShare} aria-label="Share prompt" title="Share prompt" className="p-3 rounded-xl border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 transition-colors">
                 <Share2 className="w-5 h-5" />
               </button>
            </div>
         </div>

         <h1 className="text-3xl sm:text-4xl font-black text-[#111827] mb-4 leading-tight">
           {prompt.title}
         </h1>
         
         <p className="text-gray-500 text-lg mb-8 leading-relaxed max-w-3xl">
           {prompt.description}
         </p>

         <div className="relative group">
            <div className="absolute -top-3 left-6 bg-[#111827] px-3 py-1 text-xs text-indigo-300 font-bold uppercase tracking-widest rounded-md shadow-lg z-10 border border-indigo-500/30">
               The Prompt
            </div>
            <div className="bg-[#0B0F19] rounded-2xl p-6 sm:p-8 pt-10 border border-[#1F2937] relative">
               <pre className="text-gray-300 text-sm sm:text-base whitespace-pre-wrap font-mono leading-loose">
                 {prompt.prompt}
               </pre>
               
               <div className="absolute top-4 right-4 flex opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={handleCopy} className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg backdrop-blur-md transition-colors flex items-center gap-2 text-sm font-semibold">
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
               </div>
            </div>
         </div>
         
         <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <button onClick={handleCopy} className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-[#111827] font-bold py-4 px-8 rounded-xl transition-colors flex items-center justify-center gap-2">
              {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
              {copied ? 'Copied to Clipboard' : 'Copy Prompt'}
            </button>
            <button onClick={handleUse} className="w-full sm:w-auto bg-gradient-to-r from-[#6D5EF8] to-[#3B82F6] hover:from-[#5B4DF5] hover:to-[#2563EB] text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2">
              <ExternalLink className="w-5 h-5" />
              Use in {modelName}
            </button>
         </div>
      </div>
      
      {/* Footer / Metadata area */}
      <div className="bg-gray-50 border-t border-gray-200 p-8 sm:px-12 flex flex-wrap gap-x-12 gap-y-6 text-sm text-gray-500 font-medium">
         <div>
           <span className="block text-gray-400 text-xs uppercase tracking-wider font-bold mb-1">Difficulty</span>
           <span className="capitalize">{prompt.difficulty || 'Intermediate'}</span>
         </div>
         <div>
           <span className="block text-gray-400 text-xs uppercase tracking-wider font-bold mb-1">Created By</span>
           <span>QuickTool AI</span>
         </div>
         <div><span className="flex items-center gap-1.5 text-gray-400 text-xs uppercase tracking-wider font-bold mb-1"><Eye className="w-4 h-4" /> Views</span><span className="text-[#111827] font-bold">{counts.views}</span></div>
         <div><span className="flex items-center gap-1.5 text-gray-400 text-xs uppercase tracking-wider font-bold mb-1"><Copy className="w-4 h-4" /> Copies</span><span className="text-[#111827] font-bold">{counts.copies}</span></div>
      </div>
      <PromptLoginModal open={showLoginPopup} onClose={() => setShowLoginPopup(false)} />
      
    </div>
  );
}
