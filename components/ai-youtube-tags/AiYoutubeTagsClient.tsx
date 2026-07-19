'use client';

import { useToast } from '@/contexts/ToastContext';

import React, { useState, useEffect } from 'react';
import { Download, PlaySquare, History, Loader2, Copy, CheckCircle2, Sparkles, Target, RefreshCw, Share2, Video, Clapperboard } from 'lucide-react';
import TextDownloadModal from '@/components/shared/TextDownloadModal';


import { getEndpoint } from '@/lib/api';
import { downloadAsPDF } from '@/lib/pdfUtils';
import ToolHistorySidebar from '../tools/ToolHistorySidebar';
import { useAuth } from '@/contexts/AuthContext';
import LoginPopup from '@/components/auth/LoginPopup';
import ReactMarkdown from 'react-markdown';
import TextGenerationProgress from '../shared/TextGenerationProgress';

export default function AiYoutubeTagsClient() {
  const { error, success } = useToast();
  const { isAuthenticated } = useAuth();
  const [inputVal, setInputVal] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  
  const [showHistory, setShowHistory] = useState(false);
  const [toolHistory, setToolHistory] = useState<any[]>([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const localStorageKey = 'guestAiYoutubeTagsHistory';
  const toolSlug = '/tools/ai-youtube-tags';

  useEffect(() => {
    if (!isAuthenticated) {
      const saved = localStorage.getItem(localStorageKey);
      if (saved) setToolHistory(JSON.parse(saved));
    } else {
      fetch(getEndpoint('/api/user/usage'), { credentials: 'include' })
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data?.history) {
            const items = data.data.history
              .filter((item: any) => item.toolSlug === toolSlug)
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
    if (!inputVal.trim()) return;
    setIsProcessing(true);
    setResult('');
    
    try {
      const res = await fetch(getEndpoint('/api/tools/youtube-tags'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ input: inputVal }),
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.text);
        
        if (!isAuthenticated) {
          const historyItem = {
            id: data.usageId || Date.now().toString(),
            prompt: inputVal.substring(0, 100),
            contentType: 'YouTube Tags Generator',
            date: new Date().toLocaleDateString(),
            createdAt: new Date().toISOString(),
            result: data.text,
          };
          const newHistory = [historyItem, ...toolHistory].slice(0, 20);
          setToolHistory(newHistory);
          localStorage.setItem(localStorageKey, JSON.stringify(newHistory));
        } else {
          setToolHistory(prev => [{
            id: data.usageId || Date.now().toString(),
            prompt: inputVal.substring(0, 100),
            contentType: 'YouTube Tags Generator',
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
      localStorage.setItem(localStorageKey, JSON.stringify(newHistory));
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
      localStorage.setItem(localStorageKey, JSON.stringify(newHistory));
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
              Video Topic / Title
            </label>
            <span className="text-xs text-[#6B7280]">{inputVal.length}/500</span>
          </div>
          <textarea
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value.substring(0, 500))}
            placeholder="e.g., How to bake the perfect chocolate chip cookies"
            className="w-full h-40 p-4 bg-white rounded-2xl border border-[#E5E7EB] text-sm text-[#4B5563] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EF4444]/20 focus:border-[#EF4444] transition-all resize-none shadow-sm"
          />
        </div>

        <div className="pt-2">
          <button
            onClick={handleGenerate}
            disabled={isProcessing || !inputVal.trim()}
            className={`w-full text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${isProcessing || !inputVal.trim() ? 'bg-[#9CA3AF] cursor-not-allowed' : 'bg-[#EF4444] hover:opacity-90'}`}
          >
            {isProcessing ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Generating...</>
            ) : (
              <><PlaySquare className="w-5 h-5" /> Generate Tags</>
            )}
          </button>
        </div>
      
        {/* Interlinks */}
        <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
          <h3 className="text-xs font-bold text-[#111827] mb-3">Explore Other Free Tools</h3>
          <div className="flex flex-col gap-2">
            <a href="/tools/ai-youtube-title" className="flex items-center gap-3 p-2.5 bg-[#F9FAFB] hover:bg-[#EF4444]/5 rounded-xl transition-colors group">
              <div className="w-8 h-8 shrink-0 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center group-hover:border-[#EF4444]/30 group-hover:shadow-sm transition-all">
                <Video className="w-4 h-4" style={{color:'#EF4444'}} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#111827] group-hover:text-[#EF4444] transition-colors">AI YouTube Title</p>
                <p className="text-[9px] text-[#6B7280]">Write click-worthy video titles</p>
              </div>
            </a>
            <a href="/tools/ai-video-script" className="flex items-center gap-3 p-2.5 bg-[#F9FAFB] hover:bg-[#8B5CF6]/5 rounded-xl transition-colors group">
              <div className="w-8 h-8 shrink-0 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center group-hover:border-[#8B5CF6]/30 group-hover:shadow-sm transition-all">
                <Clapperboard className="w-4 h-4" style={{color:'#8B5CF6'}} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#111827] group-hover:text-[#8B5CF6] transition-colors">AI Video Script</p>
                <p className="text-[9px] text-[#6B7280]">Write engaging video scripts</p>
              </div>
            </a>
          </div>
        </div>
      </aside>

      {/* Right Main Area */}
      {showHistory ? (
        <div className="flex-grow bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-sm overflow-y-auto h-[600px] animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
          <ToolHistorySidebar
            toolName="YouTube Tags Generator"
            toolType="text"
            history={toolHistory}
            onBack={() => setShowHistory(false)}
            onToggleFavorite={handleToggleFavorite}
            onDelete={handleDeleteHistory}
          />
        </div>
      ) : (
        <main className="flex-grow flex flex-col min-w-0">
          {/* Header when no result */}
                      
          {/* Header Area */}
          <div className="flex flex-col md:flex-row md:items-start lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-[#111827] flex items-center gap-2">AI YouTube Tags Generator <Sparkles className="w-6 h-6" style={{ color: '#EF4444' }} /></h1>
              <p className="text-[#6B7280] text-sm lg:text-base mt-2">
                Generate optimized SEO tags and keywords for a YouTube video.
              </p>
            </div>
            
              <div className="flex items-center gap-3 shrink-0">
                <button 
                  onClick={() => {
                    if (!isAuthenticated && toolHistory.length >= 3) {
                      setShowLoginPopup(true);
                    } else {
                      setShowHistory(true);
                    }
                  }}
                  className="flex items-center gap-2 bg-white border border-[#E5E7EB] px-4 py-2.5 rounded-xl text-sm font-semibold text-[#111827] hover:bg-gray-50 transition-all shadow-sm"
                >
                  <History className="w-4 h-4 text-[#6B7280]" /> History
                </button>
              </div>
    
          </div>


          {/* Generated Result Header */}
          {result && !isProcessing && (
            <div className="flex items-center justify-between mb-4 mt-2">
              <h2 className="text-xl font-extrabold text-[#111827] flex items-center gap-2">
                <Sparkles className="w-6 h-6" style={{ color: '#EF4444' }} />
                Generated Result
              </h2>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#EEF2FF] text-[#6366F1] rounded-lg text-sm font-medium border border-[#6366F1]/20">
                <History className="w-4 h-4" /> Your creations are saved in history
              </div>
            </div>
          )}

          <div className="flex-grow bg-white border border-[#E5E7EB] rounded-3xl p-6 lg:p-8 shadow-sm flex flex-col h-[600px] animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both delay-150">
            {isProcessing ? (
              <TextGenerationProgress title="Finding Tags..." description="Generating the most effective YouTube tags." />
            ) : result ? (
              <>
                <div className="flex-grow overflow-y-auto custom-scrollbar pr-2 min-h-0 mb-6">
                  <div id="result-content" className="prose prose-sm md:prose-base max-w-none prose-p:text-[#4B5563] prose-headings:text-[#111827] prose-strong:text-[#111827] prose-li:text-[#4B5563]">
                    <ReactMarkdown>{result}</ReactMarkdown>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-[#E5E7EB] shrink-0">
                  <button
                    onClick={() => setShowDownloadModal(true)}
                    className="flex items-center gap-2 px-5 py-2.5 text-white font-semibold rounded-xl transition-all shadow-sm text-sm hover:opacity-90"
                    style={{ backgroundColor: '#EF4444' }}
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                  <button
                    onClick={async () => {
                      if (navigator.share) {
                        try {
                          await navigator.share({ title: 'A I  Youtube Tags', text: result });
                        } catch (err) {
                          console.error('Share failed:', err);
                        }
                      } else {
                        copyToClipboard();
                      }
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#E5E7EB] text-[#4B5563] font-semibold rounded-xl hover:bg-[#F3F4F6] transition-all shadow-sm text-sm"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                  <button
                    onClick={() => { setResult(''); }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#E5E7EB] text-[#4B5563] font-semibold rounded-xl hover:bg-[#F3F4F6] transition-all shadow-sm text-sm"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Regenerate</span>
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#E5E7EB] text-[#4B5563] font-semibold rounded-xl hover:bg-[#F3F4F6] transition-all shadow-sm text-sm"
                  >
                    {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center px-4">
                <div className="w-16 h-16 bg-[#F9FAFB] rounded-2xl flex items-center justify-center mb-4 border border-[#E5E7EB]">
                  <Sparkles className="w-8 h-8 text-[#9CA3AF]" />
                </div>
                <h3 className="text-lg font-bold text-[#111827] mb-2">Ready to generate</h3>
                <p className="text-[#6B7280] max-w-sm">
                  Fill in the details on the left and click generate to see the magic happen.
                </p>
              </div>
            )}
          </div>

          
        </main>
      )}
    
      <TextDownloadModal 
        isOpen={showDownloadModal} 
        onClose={() => setShowDownloadModal(false)} 
        content={result} 
        filename="A I  Youtube Tags" 
        toolSlug="ai-youtube-tags" 
        elementId="result-content" 
      />
    </div>
  );
}