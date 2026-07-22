'use client';

import { useToast } from '@/contexts/ToastContext';
import React, { useState, useEffect } from 'react';
import { Link2, ArrowRight, Loader2, Copy, CheckCircle2, History, Sparkles, Info, Type, LayoutGrid, Wand2, Image as ImageIcon, Sparkle } from 'lucide-react';
import { getEndpoint } from '@/lib/api';
import ToolHistorySidebar from '../tools/ToolHistorySidebar';
import { useAuth } from '@/contexts/AuthContext';
import LoginPopup from '@/components/auth/LoginPopup';

export default function UrlShortenerClient() {
  const { error, success } = useToast();
  const { isAuthenticated } = useAuth();
  const [url, setUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [shortUrl, setShortUrl] = useState('');
  const [copied, setCopied] = useState(false);
  
  const [showHistory, setShowHistory] = useState(false);
  const [toolHistory, setToolHistory] = useState<any[]>([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      const saved = localStorage.getItem('guestUrlShortenerHistory');
      if (saved) setToolHistory(JSON.parse(saved));
    } else {
      fetch(getEndpoint('/api/user/usage'), { credentials: 'include' })
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data?.history) {
            const items = data.data.history
              .filter((item: any) => item.toolSlug === '/tools/url-shortener')
              .map((item: any) => ({
                id: item._id || Date.now() + Math.random(),
                prompt: item.prompt,
                contentType: item.toolName,
                date: new Date(item.createdAt).toLocaleDateString(),
                createdAt: item.createdAt,
                result: item.result,
              isStarred: item.isStarred
              }));
            setToolHistory(items);
          }
        })
        .catch(console.error);
    }
  }, [isAuthenticated]);

  const handleGenerate = async () => {
    if (!url.trim()) return;
    setIsProcessing(true);
    setShortUrl('');
    
    try {
      const res = await fetch(getEndpoint('/api/tools/shorten'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (data.success) {
        const domain = process.env.NEXT_PUBLIC_API_URL?.includes('localhost') ? 'http://localhost:5000' : 'https://api.quicktool.space';
        const finalShortUrl = `${domain}/s/${data.shortCode}`;
        setShortUrl(finalShortUrl);
        
        if (!isAuthenticated) {
          const historyItem = {
            id: data.usageId || Date.now().toString(),
            prompt: url.substring(0, 80),
            contentType: 'URL Shortener',
            date: new Date().toLocaleDateString(),
            createdAt: new Date().toISOString(),
            result: finalShortUrl,
          };
          const newHistory = [historyItem, ...toolHistory].slice(0, 20);
          setToolHistory(newHistory);
          localStorage.setItem('guestUrlShortenerHistory', JSON.stringify(newHistory));
        } else {
          setToolHistory(prev => [{
            id: data.usageId || Date.now().toString(),
            prompt: url.substring(0, 80),
            contentType: 'URL Shortener',
            date: new Date().toLocaleDateString(),
            createdAt: new Date().toISOString(),
            result: finalShortUrl,
          }, ...prev].slice(0, 50));
        }
      } else {
        error('Failed: ' + data.message);
      }
    } catch (err) {
      error('Error connecting to server');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleToggleFavorite = async (id: string) => {
    setToolHistory(prev => {
      const updated = prev.map(item => String(item.id) === String(id) || String(item._id) === String(id) ? { ...item, isStarred: !item.isStarred } : item);
      if (!isAuthenticated) {
        localStorage.setItem('guestUrlShortenerHistory', JSON.stringify(updated));
      }
      return updated;
    });
    if (isAuthenticated) {
      try {
        await fetch(getEndpoint(`/api/user/usage/${id}/favorite`), { method: 'PATCH', credentials: 'include' });
      } catch (err) {
        console.error('Failed to toggle favorite', err);
      }
    }
  };

  const handleDeleteHistory = async (ids: string[]) => {
    setToolHistory(prev => prev.filter(item => !ids.includes(item.id as string) && !ids.includes(item._id as string)));
    if (!isAuthenticated) {
      const newHistory = toolHistory.filter(item => !ids.includes(item.id as string) && !ids.includes(item._id as string));
      localStorage.setItem('guestUrlShortenerHistory', JSON.stringify(newHistory));
    } else {
      try {
        await fetch(getEndpoint('/api/user/usage'), {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ ids })
        });
      } catch (err) {
        console.error('Failed to delete history', err);
      }
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-full">
      <LoginPopup isOpen={showLoginPopup} onClose={() => setShowLoginPopup(false)} />
      
      {/* Left Sidebar */}
      <aside className="w-full lg:w-[340px] shrink-0 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
        
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="flex items-center gap-2 text-sm font-bold text-[#111827]">
              Enter Long URL <Info className="w-3.5 h-3.5 text-gray-400" />
            </label>
          </div>
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-sm">
            <div className="relative border border-[#E5E7EB] rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-[#6D5EF8] focus-within:border-[#6D5EF8] transition-all bg-[#FAFAFA]">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/very/long/url..."
                className="w-full h-16 p-3 bg-transparent text-sm text-[#4B5563] placeholder-gray-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={handleGenerate}
            disabled={isProcessing || !url.trim()}
            className={`w-full text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${isProcessing || !url.trim() ? 'bg-[#9CA3AF] cursor-not-allowed' : 'bg-[#6D5EF8] hover:bg-[#5B4DF5]'}`}
          >
            {isProcessing ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Shortening...</>
            ) : (
              <><Link2 className="w-5 h-5" /> Shorten URL</>
            )}
          </button>
        </div>

        {/* Interlinks */}
        <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
          <h3 className="text-xs font-bold text-[#111827] mb-3">Explore Other AI Tools</h3>
          <div className="flex flex-col gap-2">
            <a href="/tools/ai-writer" className="flex items-center gap-3 p-2.5 bg-[#F9FAFB] hover:bg-[#EEF2FF] rounded-xl transition-colors group">
              <div className="w-8 h-8 shrink-0 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center group-hover:border-[#6D5EF8]/30 group-hover:shadow-sm transition-all">
                <Type className="w-4 h-4 text-[#6D5EF8]" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#111827] group-hover:text-[#6D5EF8] transition-colors">AI Writer</p>
                <p className="text-[9px] text-[#6B7280]">Write blogs & articles</p>
              </div>
            </a>
            <a href="/tools/ai-code-generator" className="flex items-center gap-3 p-2.5 bg-[#F9FAFB] hover:bg-[#EEF2FF] rounded-xl transition-colors group">
              <div className="w-8 h-8 shrink-0 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center group-hover:border-[#6D5EF8]/30 group-hover:shadow-sm transition-all">
                <LayoutGrid className="w-4 h-4 text-[#6D5EF8]" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#111827] group-hover:text-[#6D5EF8] transition-colors">AI Code Generator</p>
                <p className="text-[9px] text-[#6B7280]">Generate React components</p>
              </div>
            </a>
            <a href="/tools/ai-image-generator" className="flex items-center gap-3 p-2.5 bg-[#F9FAFB] hover:bg-[#EEF2FF] rounded-xl transition-colors group">
              <div className="w-8 h-8 shrink-0 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center group-hover:border-[#6D5EF8]/30 group-hover:shadow-sm transition-all">
                <Wand2 className="w-4 h-4 text-[#6D5EF8]" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#111827] group-hover:text-[#6D5EF8] transition-colors">AI Image Generator</p>
                <p className="text-[9px] text-[#6B7280]">Generate stunning images</p>
              </div>
            </a>
            <a href="/tools/background-remover" className="flex items-center gap-3 p-2.5 bg-[#F9FAFB] hover:bg-[#EEF2FF] rounded-xl transition-colors group">
              <div className="w-8 h-8 shrink-0 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center group-hover:border-[#6D5EF8]/30 group-hover:shadow-sm transition-all">
                <ImageIcon className="w-4 h-4 text-[#6D5EF8]" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#111827] group-hover:text-[#6D5EF8] transition-colors">Background Remover</p>
                <p className="text-[9px] text-[#6B7280]">Remove image backgrounds</p>
              </div>
            </a>
          </div>
        </div>
      </aside>

      {/* Right Main Area */}
      {showHistory ? (
        <div className="flex-grow bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-sm overflow-y-auto h-[600px] animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
          <ToolHistorySidebar
            toolName="URL Shortener"
            toolType="url"
            history={toolHistory}
            onBack={() => setShowHistory(false)}
            onToggleFavorite={handleToggleFavorite}
            onDelete={handleDeleteHistory}
            isAuthenticated={isAuthenticated}
            onRequireLogin={() => setShowLoginPopup(true)}
          />
        </div>
      ) : (
        <main className="flex-grow flex flex-col min-w-0">
          
          {/* Header */}
          {!shortUrl && !isProcessing && (
            <div className="flex flex-col md:flex-row md:items-start lg:items-center justify-between gap-4 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both delay-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#6D5EF8] rounded-xl flex items-center justify-center shadow-sm shrink-0">
                  <Link2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[#111827] flex items-center gap-2">
                    URL Shortener <Sparkle className="w-5 h-5 text-[#6D5EF8]" />
                  </h1>
                  <p className="text-sm text-[#6B7280]">Create clean, shareable links in one click.</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 shrink-0">
                <button 
                  onClick={() => setShowHistory(true)}
                  className="flex items-center gap-2 bg-white border border-[#E5E7EB] px-4 py-2.5 rounded-xl text-sm font-semibold text-[#111827] hover:bg-gray-50 transition-all shadow-sm"
                >
                  <History className="w-4 h-4 text-[#6B7280]" /> History
                </button>
              </div>
            </div>
          )}

          {isProcessing ? (
            <div className="flex-grow bg-white rounded-3xl border border-[#E5E7EB] p-8 flex flex-col items-center justify-center shadow-sm animate-in fade-in duration-500 h-[600px]">
              <Loader2 className="w-12 h-12 text-[#6D5EF8] animate-spin mb-4" />
              <h2 className="text-xl font-bold text-[#111827]">Shortening URL...</h2>
              <p className="text-[#6B7280] mt-2">Making it neat and tidy.</p>
            </div>
          ) : shortUrl ? (
            <div className="flex-grow flex flex-col bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-sm animate-in zoom-in-95 duration-500 h-[600px]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-[#111827]">Your Short Link</h2>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setShowHistory(true)}
                    className="flex items-center gap-2 px-4 py-2 border border-[#E5E7EB] text-[#4B5563] rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
                  >
                    <History className="w-4 h-4 text-[#6B7280]" /> History
                  </button>
                </div>
              </div>
              
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="w-full max-w-lg bg-[#FAFAFA] p-8 rounded-2xl border border-[#E5E7EB] shadow-inner text-center animate-in fade-in slide-in-from-bottom-4 duration-300 fill-mode-both">
                  <p className="text-gray-500 mb-2">Here is your shortened URL:</p>
                  <a href={shortUrl} target="_blank" rel="noreferrer" className="text-2xl font-bold text-[#6D5EF8] hover:underline break-all mb-8 block">
                    {shortUrl}
                  </a>
                  <button 
                    onClick={copyToClipboard}
                    className="w-full flex justify-center items-center gap-2 py-4 bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white font-bold rounded-xl transition-all shadow-md shadow-[#6D5EF8]/20"
                  >
                    {copied ? <CheckCircle2 className="w-5 h-5 text-green-300" /> : <Copy className="w-5 h-5" />}
                    {copied ? 'Copied to Clipboard!' : 'Copy Link'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-grow bg-white rounded-3xl border border-[#E5E7EB] p-8 lg:p-12 shadow-sm flex flex-col items-center justify-center text-center relative animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both delay-200 h-[600px]">
              
              {/* Animated Graphic */}
              <div className="relative w-72 h-64 mb-10 flex items-center justify-center mt-4">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-[#F5F3FF] rounded-full blur-2xl opacity-80"></div>
                
                {/* Central Link Graphic */}
                <div className="relative z-10 flex items-center justify-center transform hover:scale-105 transition-transform duration-500">
                  <div className="w-32 h-32 bg-white rounded-2xl shadow-[0_10px_30px_-10px_rgba(109,94,248,0.3)] border-4 border-[#B4C6FC] flex items-center justify-center animate-pulse">
                    <Link2 className="w-14 h-14 text-[#6D5EF8]" />
                  </div>
                  
                  {/* Scissors / Cut line */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-1 border-t-2 border-dashed border-[#6D5EF8] animate-pulse" style={{ animationDuration: '2s' }}></div>
                  
                  {/* Small link chunks falling */}
                  <div className="absolute top-1/4 -right-12 w-8 h-8 bg-[#E0E7FF] border-2 border-[#B4C6FC] rounded-lg animate-bounce" style={{ animationDuration: '2s' }}></div>
                  <div className="absolute bottom-1/4 -left-12 w-6 h-6 bg-[#E0E7FF] border-2 border-[#B4C6FC] rounded-lg animate-bounce" style={{ animationDuration: '2.5s' }}></div>
                </div>

                {/* Floating Sparkles */}
                <Sparkles className="absolute top-6 left-12 w-6 h-6 text-[#A5B4FC] animate-pulse" />
                <Sparkles className="absolute bottom-6 right-12 w-5 h-5 text-[#A5B4FC] animate-pulse" style={{ animationDelay: '500ms' }} />
              </div>

              <h2 className="text-2xl lg:text-3xl font-bold text-[#111827] mb-3">
                Ready to <span className="text-[#6D5EF8]">shorten?</span>
              </h2>
              <p className="text-[#6B7280] max-w-sm mx-auto mb-8">
                Paste your long URL on the left and click <span className="text-[#6D5EF8] font-semibold">"Shorten URL"</span>.
              </p>
              
              <div className="w-full bg-[#F5F3FF] border border-[#EDE9FE] rounded-xl p-4 flex items-center justify-center gap-2 text-sm text-[#4B5563] shadow-sm mt-auto max-w-md">
                <Info className="w-4 h-4 text-[#6D5EF8]" />
                <span className="font-bold text-[#111827]">Tip:</span> Short URLs are much easier to share on social media or in emails!
              </div>
            </div>
          )}
        </main>
      )}
    </div>
  );
}
