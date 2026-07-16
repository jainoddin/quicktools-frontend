'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Lightbulb, Clipboard, FileText, Smile, Globe, Sparkles, Info,
  ShoppingBag, MessageSquare, Mail, ChevronDown, Type,
  PenTool, History, LayoutGrid, Loader2, Crown
} from 'lucide-react';
import AiWriterResult from './AiWriterResult';
import AiWriterHistory from './AiWriterHistory';
import AiWriterProgress from './AiWriterProgress';
import { useAuth } from '@/contexts/AuthContext';
import LoginPopup from '@/components/auth/LoginPopup';
import { getEndpoint } from '@/lib/api';

const CustomSelect = ({ options, value, onChange, icon: Icon }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center bg-white border ${isOpen ? 'border-[#6D5EF8] ring-2 ring-[#6D5EF8]/20' : 'border-[#E5E7EB] hover:border-[#D1D5DB]'} text-sm font-semibold text-[#111827] rounded-xl pl-11 pr-10 py-3.5 shadow-sm transition-all cursor-pointer`}
      >
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <Icon className="w-4 h-4 text-[#6D5EF8]" />
        </div>
        <span className="truncate">{value}</span>
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
          <ChevronDown className={`w-4 h-4 text-[#6B7280] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-[#E5E7EB] rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="max-h-60 overflow-y-auto p-2 space-y-1">
            {options.map((option: string) => (
              <div
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm font-semibold rounded-xl cursor-pointer transition-colors ${
                  value === option 
                    ? 'bg-[#6D5EF8] text-white' 
                    : 'text-[#4B5563] hover:bg-gray-50 hover:text-[#111827]'
                }`}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function AiWriterClient() {
  const { isAuthenticated, user } = useAuth();
  const isPro = ['pro', 'premium'].includes((user?.plan || '').toLowerCase());

  const [prompt, setPrompt] = useState('');
  const [contentType, setContentType] = useState('Blog Post');
  const [tone, setTone] = useState('Friendly');
  const [language, setLanguage] = useState('English');
  const [creativity, setCreativity] = useState(6);

  const [isProcessing, setIsProcessing] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [progress, setProgress] = useState(0);

  const [generatedText, setGeneratedText] = useState('');
  const [writerHistory, setWriterHistory] = useState<any[]>([]);

  const [freeGenCount, setFreeGenCount] = useState(0);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);

  // Load history from backend (authenticated) or localStorage (guest)
  useEffect(() => {
    if (!isAuthenticated) {
      const count = parseInt(localStorage.getItem('freeWriterCount') || '0', 10);
      setFreeGenCount(count);

      const saved = localStorage.getItem('guestWriterHistory');
      if (saved) {
        try { setWriterHistory(JSON.parse(saved)); } catch { }
      }
    } else {
      fetch(getEndpoint('/api/user/usage'), {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data?.history) {
            const writerItems = data.data.history
              .filter((item: any) => item.toolSlug === '/tools/ai-writer')
              .map((item: any) => ({
                id: item._id || Date.now() + Math.random(),
                prompt: item.prompt,
                contentType: item.contentType || 'Blog Post',
                date: new Date(item.createdAt).toLocaleDateString(),
                createdAt: item.createdAt,
              }));
            setWriterHistory(writerItems);
          }
        })
        .catch(console.error);
    }
  }, [isAuthenticated]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    // Auth check — guests get 1 free generation
    if (!isAuthenticated && freeGenCount >= 1) {
      setShowLoginPopup(true);
      return;
    }

    // Credit check for logged-in free users
    const creditsNeeded = 10;
    if (isAuthenticated && !isPro && ((user as any)?.credits || 0) < creditsNeeded) {
      setShowPremiumPopup(true);
      return;
    }

    setIsProcessing(true);
    setHasResult(false);
    setProgress(0);
    setGeneratedText('');

    const interval = setInterval(() => {
      setProgress((prev) => Math.min(90, prev + Math.floor(Math.random() * 10) + 5));
    }, 500);

    try {
      const res = await fetch(getEndpoint('/api/tools/generate-text'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ prompt, contentType, tone, language, creativity }),
      });

      const data = await res.json();
      clearInterval(interval);
      setProgress(100);

      if (res.status === 401) {
        setShowLoginPopup(true);
        setIsProcessing(false);
        return;
      }

      if (data.success) {
        setGeneratedText(data.data);
        setHasResult(true);

        // Save guest usage to localStorage
        if (!isAuthenticated) {
          const newCount = freeGenCount + 1;
          setFreeGenCount(newCount);
          localStorage.setItem('freeWriterCount', newCount.toString());

          // Save to guest history
          const historyItem = {
            id: Date.now(),
            prompt: prompt.substring(0, 80),
            contentType,
            date: new Date().toLocaleDateString(),
            createdAt: new Date().toISOString(),
            result: data.data,
          };
          const prevHistory = writerHistory;
          const newHistory = [historyItem, ...prevHistory].slice(0, 20);
          setWriterHistory(newHistory);
          localStorage.setItem('guestWriterHistory', JSON.stringify(newHistory));
        } else {
          // Refresh history from backend
          setWriterHistory(prev => [{
            id: Date.now(),
            prompt: prompt.substring(0, 80),
            contentType,
            date: new Date().toLocaleDateString(),
            createdAt: new Date().toISOString(),
            result: data.data,
          }, ...prev].slice(0, 50));
        }
      } else {
        alert('Generation failed: ' + data.message);
      }
    } catch (error) {
      clearInterval(interval);
      alert('Error connecting to backend');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancel = () => {
    setIsProcessing(false);
    setProgress(0);
  };

  const handleToggleFavorite = async (id: string) => {
    setWriterHistory(prev => prev.map(item => item.id === id || item._id === id ? { ...item, isStarred: !item.isStarred } : item));

    if (!isAuthenticated) {
      const newHistory = writerHistory.map(item => item.id === id || item._id === id ? { ...item, isStarred: !item.isStarred } : item);
      localStorage.setItem('guestWriterHistory', JSON.stringify(newHistory));
    } else {
      try {
        await fetch(getEndpoint(`/api/user/usage/${id}/favorite`), { method: 'PATCH' });
      } catch (err) {
        console.error('Failed to toggle favorite', err);
      }
    }
  };

  const handleDeleteHistory = async (ids: string[]) => {
    setWriterHistory(prev => prev.filter(item => !ids.includes(item.id as string) && !ids.includes(item._id as string)));

    if (!isAuthenticated) {
      const newHistory = writerHistory.filter(item => !ids.includes(item.id as string) && !ids.includes(item._id as string));
      localStorage.setItem('guestWriterHistory', JSON.stringify(newHistory));
    } else {
      try {
        await fetch(getEndpoint('/api/user/usage'), {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids })
        });
      } catch (err) {
        console.error('Failed to delete history', err);
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-full min-h-0">
      <LoginPopup isOpen={showLoginPopup} onClose={() => setShowLoginPopup(false)} />

      {/* Premium Popup */}
      {showPremiumPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-gray-100 shadow-2xl relative">
            <button onClick={() => setShowPremiumPopup(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
            <div className="w-16 h-16 bg-[#F5F3FF] rounded-2xl flex items-center justify-center mb-6">
              <Crown className="w-8 h-8 text-[#6D5EF8]" />
            </div>
            <h3 className="text-2xl font-bold text-[#111827] mb-2">Out of Credits</h3>
            <p className="text-[#6B7280] mb-6">You need <strong>10 credits</strong> to generate content. Upgrade to Premium for unlimited generations!</p>
            <div className="bg-[#F5F3FF] rounded-2xl p-4 mb-6 text-sm text-[#6D5EF8] font-semibold">
              💡 Current credits: <span className="text-[#111827]">{(user as any)?.credits || 0}</span>
            </div>
            <a href="/pricing" className="w-full flex items-center justify-center gap-2 bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white font-bold py-3 rounded-xl transition-all shadow-lg">
              <Crown className="w-4 h-4" /> Upgrade to Premium
            </a>
          </div>
        </div>
      )}

      {/* Left Sidebar Controls */}
      <aside className="w-full lg:w-[340px] shrink-0 flex flex-col">

        <div className={`space-y-6 transition-opacity ${hasResult || isProcessing ? 'opacity-50 pointer-events-none select-none' : ''}`}>
          {/* 1. Prompt */}
          <div>
            <label className="block text-sm font-bold text-[#111827] mb-2">1. What do you want to write?</label>
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-sm relative z-10">
              <div className="relative mb-4">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the topic or paste your content..."
                  className="w-full h-36 resize-none outline-none text-sm text-[#111827] placeholder:text-[#9CA3AF] bg-transparent"
                  maxLength={3000}
                />
                <div className="absolute bottom-0 right-0 text-[10px] font-semibold text-[#9CA3AF]">
                  {prompt.length} / 3000
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-[#E5E7EB] text-xs font-semibold text-[#4B5563] hover:bg-gray-50 transition-colors shadow-sm">
                  <Lightbulb className="w-3.5 h-3.5 text-[#6B7280]" /> Example Ideas
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-[#E5E7EB] text-xs font-semibold text-[#4B5563] hover:bg-gray-50 transition-colors shadow-sm">
                  <Clipboard className="w-3.5 h-3.5 text-[#6B7280]" /> Paste Text
                </button>
              </div>
            </div>
          </div>

          {/* 2. Content Type */}
          <div>
            <h3 className="text-sm font-bold text-[#111827] mb-2">2. Choose Content Type</h3>
            <div className="relative">
              <CustomSelect
                options={['Blog Post', 'Email', 'Social Media Post', 'Product Description']}
                value={contentType}
                onChange={setContentType}
                icon={FileText}
              />
            </div>
          </div>

          {/* 3. Tone of Voice */}
          <div>
            <h3 className="text-sm font-bold text-[#111827] mb-2">3. Tone of Voice</h3>
            <div className="relative">
              <CustomSelect
                options={['Friendly', 'Professional', 'Persuasive', 'Casual']}
                value={tone}
                onChange={setTone}
                icon={Smile}
              />
            </div>
          </div>

          {/* 4. Language */}
          <div>
            <h3 className="text-sm font-bold text-[#111827] mb-2">4. Language</h3>
            <div className="relative">
              <CustomSelect
                options={['English', 'Spanish', 'French', 'German']}
                value={language}
                onChange={setLanguage}
                icon={Globe}
              />
            </div>
          </div>

          {/* 5. Creativity Level */}
          <div>
            <h3 className="text-sm font-bold text-[#111827] mb-2">5. Creativity Level</h3>
            <div className="flex items-center gap-4">
              <div className="relative w-full flex items-center">
                {/* Fake a styled range input for better aesthetics */}
                <div className="absolute inset-0 h-2 bg-gray-100 rounded-full top-1/2 -translate-y-1/2 pointer-events-none"></div>
                <div
                  className="absolute h-2 bg-[#6D5EF8] rounded-l-full top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ width: `${(creativity / 10) * 100}%` }}
                ></div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={creativity}
                  onChange={(e) => setCreativity(Number(e.target.value))}
                  className="w-full h-6 opacity-0 cursor-pointer z-10"
                />
                <div
                  className="absolute w-4 h-4 bg-white border-2 border-[#6D5EF8] rounded-full top-1/2 -translate-y-1/2 pointer-events-none shadow-sm"
                  style={{ left: `calc(${(creativity / 10) * 100}% - 8px)` }}
                ></div>
              </div>
              <div className="bg-white border border-[#E5E7EB] px-3 py-1.5 rounded-lg text-xs font-bold text-[#111827] shadow-sm shrink-0 min-w-[50px] text-center">
                {creativity}/10
              </div>
            </div>
          </div>

        </div>

        {/* Generate Button */}
        <div className="pt-6 mt-auto">
          <button
            disabled={isProcessing}
            onClick={hasResult ? () => setHasResult(false) : handleGenerate}
            className={`w-full text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg ${isProcessing ? 'bg-[#9CA3AF] cursor-not-allowed' : 'bg-[#6D5EF8] hover:bg-[#5B4DF5] shadow-[#6D5EF8]/20 hover:shadow-[#6D5EF8]/40 hover:-translate-y-0.5'}`}
          >
            {isProcessing ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Generating...</>
            ) : (
              <><Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" /> {hasResult ? 'Write Another' : 'Generate Content'}</>
            )}
          </button>
          <div className="flex items-center justify-center mt-3 text-xs text-[#9CA3AF]">
            This will cost 10 credits <Info className="w-3.5 h-3.5 ml-1 cursor-pointer hover:text-[#6B7280]" />
          </div>
        </div>
      </aside>

      {/* Right Main Area */}
      <main className="flex-grow flex flex-col min-w-0 min-h-0">

        {showHistory ? (
          <AiWriterHistory
            history={writerHistory}
            onBack={() => setShowHistory(false)}
            onToggleFavorite={handleToggleFavorite}
            onDelete={handleDeleteHistory}
          />
        ) : (
          <>
            {/* Right Header (Icon, Title, Actions) */}
            <div className="flex flex-col md:flex-row md:items-start lg:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center shadow-sm shrink-0">
                  <PenTool className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[#111827]">AI Writer</h1>
                  <p className="text-sm text-[#6B7280]">Write blogs, emails, articles, and more in seconds.</p>
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

            {isProcessing ? (
              <AiWriterProgress progress={progress} onCancel={handleCancel} />
            ) : hasResult ? (
              <AiWriterResult
                content={generatedText}
                isAuthenticated={isAuthenticated}
                isPro={isPro}
                onRequireLogin={() => setShowLoginPopup(true)}
                onReset={() => setHasResult(false)}
              />
            ) : (
              <div className="bg-white rounded-3xl border border-[#E5E7EB] p-8 lg:p-12 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden h-full min-h-[600px]">

                {/* Animated Graphic */}
                <div className="relative w-64 h-64 mb-12 flex items-center justify-center">
                  {/* Soft background blob */}
                  <div className="absolute inset-0 bg-[#F5F3FF] rounded-full blur-3xl opacity-60"></div>

                  {/* The Document Graphic */}
                  <div className="relative z-10 w-44 h-56 bg-white rounded-2xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.08)] border border-[#EDE9FE] p-5 flex flex-col gap-4 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                    <div className="w-16 h-9 bg-[#6D5EF8] rounded-full flex items-center justify-center shadow-sm mb-1">
                      <span className="text-white font-serif text-xl font-bold">T</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full"></div>
                    <div className="w-3/4 h-2 bg-gray-100 rounded-full"></div>
                    <div className="w-full h-2 bg-gray-100 rounded-full mt-3"></div>
                    <div className="w-5/6 h-2 bg-gray-100 rounded-full"></div>
                    <div className="w-2/3 h-2 bg-gray-100 rounded-full mt-3"></div>
                  </div>

                  {/* AI Badge - Moved slightly higher */}
                  <div className="absolute -right-6 bottom-14 z-20">
                    {/* Green dot peeking from behind the AI badge */}
                    <div className="absolute top-1 -right-1 w-5 h-5 bg-[#6EE7B7] rounded-full -z-10"></div>

                    <div className="relative w-20 h-20 bg-[#6D5EF8] rounded-2xl flex items-center justify-center shadow-[0_10px_30px_-5px_rgba(109,94,248,0.5)] transform rotate-12 hover:rotate-0 transition-transform">
                      <span className="text-white font-black text-3xl tracking-tighter">AI</span>

                      {/* Shine lines */}
                      <div className="absolute -top-5 right-2 w-1 h-4 bg-[#A78BFA] rounded-full transform rotate-[25deg]"></div>
                      <div className="absolute -top-6 left-1/2 w-1 h-5 bg-[#A78BFA] rounded-full transform -translate-x-1/2 -rotate-[15deg]"></div>
                      <div className="absolute top-4 -right-5 w-4 h-1 bg-[#A78BFA] rounded-full transform -rotate-[15deg]"></div>
                    </div>
                  </div>

                  {/* Decorative sparkles */}
                  <div className="absolute -top-2 left-[40%] text-[#6D5EF8] animate-bounce">
                    <Sparkles className="w-6 h-6" />
                  </div>

                  {/* Connecting dashed looping line (SVGs) */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible" viewBox="0 0 256 256">
                    {/* Loop Path starting from bottom-middle of AI badge */}
                    <path
                      d="M 200 190 C 180 270, 110 270, 130 210 C 145 160, 120 220, 75 220"
                      fill="none"
                      stroke="#A78BFA"
                      strokeWidth="3"
                      strokeDasharray="8 8"
                      strokeLinecap="round"
                      style={{ animation: 'dashMarch 2s linear infinite' }}
                    />
                    {/* Arrowhead */}
                    <path
                      d="M 75 220 L 87 212 M 75 220 L 85 228"
                      fill="none"
                      stroke="#A78BFA"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <style>{`
              @keyframes dashMarch {
                from { stroke-dashoffset: 0; }
                to { stroke-dashoffset: -64; }
              }
            `}</style>
                </div>

                <h2 className="text-2xl lg:text-3xl font-bold text-[#111827] mb-4">
                  Ready to Create Amazing Content <span className="text-[#6D5EF8]">✨</span>
                </h2>

                <p className="text-[#6B7280] max-w-md mx-auto mb-12">
                  Enter a prompt on the left and click Generate Content to create blogs, emails, social posts, and more.
                </p>

                {/* Popular Prompts */}
                <div className="w-full max-w-3xl mb-12">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="h-px bg-gray-200 flex-grow max-w-[60px]"></div>
                    <span className="text-sm font-bold text-[#111827]">Try these popular prompts</span>
                    <div className="h-px bg-gray-200 flex-grow max-w-[60px]"></div>
                  </div>

                  <div className="flex flex-wrap justify-center gap-3">
                    <button onClick={() => { setPrompt("Write a comprehensive blog post about the future of AI."); setContentType("Blog Post"); }} className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#E5E7EB] bg-white text-sm font-semibold text-[#4B5563] hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                      <FileText className="w-4 h-4 text-[#6D5EF8]" /> Write a blog about AI
                    </button>
                    <button onClick={() => { setPrompt("Write a catchy product description for a smart water bottle."); setContentType("Product Description"); }} className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#E5E7EB] bg-white text-sm font-semibold text-[#4B5563] hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                      <ShoppingBag className="w-4 h-4 text-[#10B981]" /> Product Description
                    </button>
                    <button onClick={() => { setPrompt("Write a LinkedIn post announcing a new feature launch."); setContentType("Social Media Post"); }} className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#E5E7EB] bg-white text-sm font-semibold text-[#4B5563] hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                      <MessageSquare className="w-4 h-4 text-[#0A66C2]" /> LinkedIn Post
                    </button>
                    <button onClick={() => { setPrompt("Write a polite email reply declining an invitation."); setContentType("Email"); }} className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#E5E7EB] bg-white text-sm font-semibold text-[#4B5563] hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                      <Mail className="w-4 h-4 text-[#EF4444]" /> Email Reply
                    </button>
                  </div>
                </div>

                {/* Tip Banner */}
                <div className="w-full bg-[#F5F3FF] border border-[#EDE9FE] rounded-xl p-4 flex items-center justify-center gap-2 text-sm text-[#4B5563] shadow-sm mt-auto">
                  <Lightbulb className="w-4 h-4 text-[#6D5EF8]" />
                  <span className="font-bold text-[#111827]">Tip:</span> The more specific your prompt, the better the result!
                </div>

              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
