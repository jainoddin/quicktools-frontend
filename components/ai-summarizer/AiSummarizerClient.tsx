'use client';

import { useToast } from '@/contexts/ToastContext';
import React, { useState, useEffect } from 'react';
import { 
  FileText, ArrowRight, Loader2, Copy, CheckCircle2, History,
  Sparkles, Info, Type, LayoutGrid, Wand2, Image as ImageIcon, Sparkle
} from 'lucide-react';
import { getEndpoint } from '@/lib/api';
import ToolHistorySidebar from '../tools/ToolHistorySidebar';
import { useAuth } from '@/contexts/AuthContext';
import LoginPopup from '@/components/auth/LoginPopup';

export default function AiSummarizerClient() {
  const { error, success } = useToast();
  const { isAuthenticated } = useAuth();
  const [text, setText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  
  const [showHistory, setShowHistory] = useState(false);
  const [toolHistory, setToolHistory] = useState<any[]>([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      const saved = localStorage.getItem('guestSummarizerHistory');
      if (saved) setToolHistory(JSON.parse(saved));
    } else {
      fetch(getEndpoint('/api/user/usage'), { credentials: 'include' })
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data?.history) {
            const items = data.data.history
              .filter((item: any) => item.toolSlug === '/tools/ai-summarizer')
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
    if (!text.trim()) return;
    setIsProcessing(true);
    setResult('');
    
    try {
      const res = await fetch(getEndpoint('/api/tools/summarize'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.text);
        
        if (!isAuthenticated) {
          const historyItem = {
            id: data.usageId || Date.now().toString(),
            prompt: text.substring(0, 80),
            contentType: 'AI Summarizer',
            date: new Date().toLocaleDateString(),
            createdAt: new Date().toISOString(),
            result: data.text,
          };
          const newHistory = [historyItem, ...toolHistory].slice(0, 20);
          setToolHistory(newHistory);
          localStorage.setItem('guestSummarizerHistory', JSON.stringify(newHistory));
        } else {
          setToolHistory(prev => [{
            id: data.usageId || Date.now().toString(),
            prompt: text.substring(0, 80),
            contentType: 'AI Summarizer',
            date: new Date().toLocaleDateString(),
            createdAt: new Date().toISOString(),
            result: data.text,
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
    setToolHistory(prev => prev.map(item => item.id === id || item._id === id ? { ...item, isStarred: !item.isStarred } : item));
    if (!isAuthenticated) {
      const newHistory = toolHistory.map(item => item.id === id || item._id === id ? { ...item, isStarred: !item.isStarred } : item);
      localStorage.setItem('guestSummarizerHistory', JSON.stringify(newHistory));
    } else {
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
      localStorage.setItem('guestSummarizerHistory', JSON.stringify(newHistory));
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
    navigator.clipboard.writeText(result);
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
              Text to Summarize <Info className="w-3.5 h-3.5 text-gray-400" />
            </label>
          </div>
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-sm">
            <div className="relative border border-[#E5E7EB] rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-[#6D5EF8] focus-within:border-[#6D5EF8] transition-all bg-[#FAFAFA]">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your long article or text here..."
                className="w-full h-48 p-3 bg-transparent resize-none text-sm text-[#4B5563] placeholder-gray-400 focus:outline-none"
              />
              <div className="flex items-center justify-end px-3 py-2 bg-white border-t border-[#E5E7EB]">
                <span className="text-[10px] text-gray-400 font-medium">{text.length} / 5000</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={handleGenerate}
            disabled={isProcessing || !text.trim()}
            className={`w-full text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${isProcessing || !text.trim() ? 'bg-[#9CA3AF] cursor-not-allowed' : 'bg-[#6D5EF8] hover:bg-[#5B4DF5]'}`}
          >
            {isProcessing ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
            ) : (
              <><Sparkles className="w-5 h-5" /> Summarize Text</>
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
            toolName="AI Summarizer"
            toolType="text"
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
          {!result && !isProcessing && (
            <div className="flex flex-col md:flex-row md:items-start lg:items-center justify-between gap-4 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both delay-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#6D5EF8] rounded-xl flex items-center justify-center shadow-sm shrink-0">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[#111827] flex items-center gap-2">
                    AI Text Summarizer <Sparkle className="w-5 h-5 text-[#6D5EF8]" />
                  </h1>
                  <p className="text-sm text-[#6B7280]">Summarize long articles into clear points instantly.</p>
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
              <h2 className="text-xl font-bold text-[#111827]">Summarizing text...</h2>
              <p className="text-[#6B7280] mt-2">Extracting the key information for you.</p>
            </div>
          ) : result ? (
            <div className="flex-grow flex flex-col bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-sm animate-in zoom-in-95 duration-500 h-[600px]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-[#111827]">Summary Result</h2>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setShowHistory(true)}
                    className="flex items-center gap-2 px-4 py-2 border border-[#E5E7EB] text-[#4B5563] rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
                  >
                    <History className="w-4 h-4 text-[#6B7280]" /> History
                  </button>
                  <button 
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
                  >
                    {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto pr-2">
                <div className="prose prose-purple max-w-none text-gray-800">
                  {result.split('\n').map((line, i) => (
                    <p key={i} className="mb-2 text-[#4B5563]">{line}</p>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-grow bg-white rounded-3xl border border-[#E5E7EB] p-8 lg:p-12 shadow-sm flex flex-col items-center justify-center text-center relative animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both delay-200 h-[600px]">
              
              {/* Animated Graphic */}
              <div className="relative w-72 h-64 mb-10 flex items-center justify-center mt-4">
                {/* Background glowing blob */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-[#F5F3FF] rounded-full blur-2xl opacity-80"></div>
                
                {/* Central Document Graphic */}
                <div className="relative z-10 w-40 h-48 transform hover:scale-105 transition-transform duration-500">
                  <div className="absolute inset-0 bg-[#E0E7FF] rounded-xl shadow-[0_10px_30px_-10px_rgba(109,94,248,0.3)] border-4 border-[#B4C6FC] overflow-hidden flex flex-col items-center pt-6">
                    <div className="w-24 h-2 bg-[#B4C6FC] rounded-full mb-3"></div>
                    <div className="w-20 h-2 bg-[#B4C6FC] rounded-full mb-3 opacity-70"></div>
                    <div className="w-24 h-2 bg-[#B4C6FC] rounded-full mb-3 opacity-50"></div>
                    <div className="w-16 h-2 bg-[#B4C6FC] rounded-full opacity-30"></div>
                  </div>
                  
                  {/* Smaller Summary Card (Pulsing) */}
                  <div className="absolute -bottom-6 -right-6 z-20 w-24 h-24 bg-white rounded-xl border-4 border-[#6D5EF8] shadow-xl flex items-center justify-center animate-pulse">
                    <FileText className="w-10 h-10 text-[#6D5EF8]" />
                  </div>
                </div>

                {/* Floating Sparkles */}
                <Sparkles className="absolute top-8 left-12 w-6 h-6 text-[#A5B4FC] animate-pulse" />
                <Sparkles className="absolute top-12 right-12 w-4 h-4 text-[#A5B4FC] animate-pulse" style={{ animationDelay: '200ms' }} />
                <Sparkles className="absolute bottom-16 left-6 w-5 h-5 text-[#C7D2FE] animate-pulse" style={{ animationDelay: '400ms' }} />
              </div>

              <h2 className="text-2xl lg:text-3xl font-bold text-[#111827] mb-3">
                Ready to <span className="text-[#6D5EF8]">summarize?</span>
              </h2>
              <p className="text-[#6B7280] max-w-sm mx-auto mb-8">
                Paste your long article or text on the left and click <span className="text-[#6D5EF8] font-semibold">"Summarize Text"</span> to get the key points.
              </p>
              
              <div className="w-full bg-[#F5F3FF] border border-[#EDE9FE] rounded-xl p-4 flex items-center justify-center gap-2 text-sm text-[#4B5563] shadow-sm mt-auto max-w-md">
                <Info className="w-4 h-4 text-[#6D5EF8]" />
                <span className="font-bold text-[#111827]">Tip:</span> Perfect for quickly understanding long academic papers or news articles!
              </div>
            </div>
          )}
        </main>
      )}
    </div>
  );
}
