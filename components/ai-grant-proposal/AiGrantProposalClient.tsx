'use client';

import React, { useState, useEffect } from 'react';
import { FileText, Sparkles, Copy, CheckCircle2, Download, History, Loader2, Crown, Share2, RefreshCw } from 'lucide-react';
import TextDownloadModal from '@/components/shared/TextDownloadModal';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import LoginPopup from '@/components/auth/LoginPopup';
import PremiumPopup from '@/components/auth/PremiumPopup';
import { getEndpoint } from '@/lib/api';
import ReactMarkdown from 'react-markdown';
import ToolHistorySidebar from '@/components/tools/ToolHistorySidebar';
import { downloadAsPDF } from '@/lib/pdfUtils';
import TextGenerationProgress from '@/components/shared/TextGenerationProgress';

export default function AiGrantProposalClient() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [toolHistory, setToolHistory] = useState<any[]>([]);
  
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);
  const [freeGenCount, setFreeGenCount] = useState(0);

  const { user, isAuthenticated, updateUser } = useAuth();
  const { error, success } = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      const count = parseInt(localStorage.getItem('premium_ai-grant-proposal_count') || '0', 10);
      setFreeGenCount(count);
      const saved = localStorage.getItem('ai-grant-proposal_history');
      if (saved) {
        try { setToolHistory(JSON.parse(saved)); } catch {}
      }
    } else {
      // Load history from backend
      fetch(getEndpoint('/api/user/usage'), {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data?.history) {
          const items = data.data.history
            .filter((item: any) => item.toolSlug === '/tools/ai-grant-proposal')
            .map((item: any) => ({
              id: item._id,
              prompt: item.prompt,
              result: item.result,
              date: new Date(item.createdAt).toLocaleDateString(),
            }));
          setToolHistory(items);
        }
      })
      .catch(console.error);
    }
  }, [isAuthenticated]);

  const handleGenerate = async () => {
    if (!input.trim()) return;

    // Guest users get 1 free trial for premium tools
    if (!isAuthenticated && freeGenCount >= 1) {
      setShowLoginPopup(true);
      return;
    }

    setIsProcessing(true);
    setResult('');

    try {
      const res = await fetch(getEndpoint('/api/tools/ai-grant-proposal'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ input }),
      });

      const data = await res.json();
      
      if (res.status === 401) {
        setShowLoginPopup(true);
        setIsProcessing(false);
        return;
      }
      
      if (res.status === 403 && data.errorType === 'INSUFFICIENT_CREDITS') {
        setShowPremiumPopup(true);
        setIsProcessing(false);
        return;
      }

      if (data.success) {
        setResult(data.text);
        
        // Update user credits in context if returned
        if (data.creditsRemaining !== undefined && updateUser && user) {
           updateUser({ ...user, credits: data.creditsRemaining });
        }

        if (!isAuthenticated) {
          const newCount = freeGenCount + 1;
          setFreeGenCount(newCount);
          localStorage.setItem('premium_ai-grant-proposal_count', newCount.toString());
          
          const newItem = { id: Date.now().toString(), prompt: input, result: data.text, date: new Date().toLocaleDateString(), createdAt: new Date().toISOString(), isStarred: false };
          const newHistory = [newItem, ...toolHistory];
          setToolHistory(newHistory);
          localStorage.setItem('ai-grant-proposal_history', JSON.stringify(newHistory));
        } else {
          // Add to local state for immediate feedback
          setToolHistory([{ id: data.usageId || Date.now().toString(), prompt: input, result: data.text, date: new Date().toLocaleDateString(), createdAt: new Date().toISOString(), isStarred: false }, ...toolHistory]);
        }
      } else {
        error(data.message || 'Failed to generate content');
      }
    } catch (err) {
      error('An error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };


    const handleToggleFavorite = async (id: string) => {
    setToolHistory(prev => {
      const updated = prev.map(item => 
        (String(item.id) === String(id) || String(item._id) === String(id)) ? { ...item, isStarred: !item.isStarred } : item
      );
      if (!isAuthenticated) {
        localStorage.setItem('ai-grant-proposal_history', JSON.stringify(updated));
      }
      return updated;
    });
    if (isAuthenticated) {
      try {
        await fetch(getEndpoint(`/api/user/usage/${id}/favorite`), { method: 'PATCH', credentials: 'include' });
      } catch (err) { console.error('Failed to toggle favorite', err); }
    }
  };

const handleDeleteHistory = async (ids: string[]) => {
    setToolHistory(prev => prev.filter(item => !ids.includes(item.id as string) && !ids.includes(item._id as string)));
    if (!isAuthenticated) {
      const updated = toolHistory.filter(item => !ids.includes(item.id as string) && !ids.includes(item._id as string));
      localStorage.setItem('ai-grant-proposal_history', JSON.stringify(updated));
    } else {
      try {
        await fetch(getEndpoint('/api/user/usage'), {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ ids })
        });
      } catch (err) { console.error('Failed to delete history', err); }
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:h-full">
      <LoginPopup isOpen={showLoginPopup} onClose={() => setShowLoginPopup(false)} />
      <PremiumPopup isOpen={showPremiumPopup} onClose={() => setShowPremiumPopup(false)} />

      <div className="w-full lg:w-[400px] xl:w-[450px] shrink-0 flex flex-col gap-6">
        <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#111827] mb-2 flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-500" /> Premium Tool
            </h2>
            <p className="text-sm text-[#4B5563]">
              Write professional grant proposals for non-profits and startups.
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-[#111827] mb-2">
                Describe your requirement
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="E.g., I need a business plan for a vegan coffee shop..."
                className="w-full h-32 px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl focus:ring-2 focus:ring-[#6D5EF8]/20 focus:border-[#6D5EF8] transition-all resize-none text-sm text-[#111827] placeholder:text-[#9CA3AF]"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={isProcessing || !input.trim()}
              className="w-full h-14 bg-[#111827] hover:bg-[#1F2937] text-white font-bold rounded-2xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
              {isProcessing ? 'Generating...' : 'Generate Now (5 Credits)'}
            </button>
          </div>
        </div>
      </div>

      {showHistory ? (
        <div className="flex-grow bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-sm overflow-y-auto h-[600px] animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
          <ToolHistorySidebar
            toolName="AI Grant Proposal Writer"
            toolType="text"
            history={toolHistory}
            onBack={() => setShowHistory(false)}
            onToggleFavorite={handleToggleFavorite}
            onDelete={handleDeleteHistory}
            onSelect={(item) => { setResult(item.result); setInput(item.prompt); setShowHistory(false); }}
          />
        </div>
      ) : (
        <main className="flex-grow flex flex-col min-w-0">
        
          {/* Header Area */}
          <div className="flex flex-col md:flex-row md:items-start lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-[#111827] flex items-center gap-2">AI Grant Proposal Writer <Sparkles className="w-6 h-6" style={{ color: '#14B8A6' }} /></h1>
              <p className="text-[#6B7280] text-sm lg:text-base mt-2">
                Write professional grant proposals for non-profits and startups.
              </p>
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


          {/* Generated Result Header */}
          {result && !isProcessing && (
            <div className="flex items-center justify-between mb-4 mt-2">
              <h2 className="text-xl font-extrabold text-[#111827] flex items-center gap-2">
                <Sparkles className="w-6 h-6" style={{ color: '#14B8A6' }} />
                Generated Result
              </h2>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#EEF2FF] text-[#6366F1] rounded-lg text-sm font-medium border border-[#6366F1]/20">
                <History className="w-4 h-4" /> Your creations are saved in history
              </div>
            </div>
          )}

          <div className="flex-grow bg-white border border-[#E5E7EB] rounded-3xl p-6 lg:p-8 shadow-sm flex flex-col h-[600px] animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both delay-150">
            {isProcessing ? (
              <TextGenerationProgress title="Generating Content..." description="Crafting your premium response." />
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
                    style={{ backgroundColor: '#14B8A6' }}
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                  <button
                    onClick={async () => {
                      if (navigator.share) {
                        try {
                          await navigator.share({ title: 'AI Grant Proposal Writer', text: result });
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
        filename="AI Grant Proposal Writer" 
        toolSlug="ai-grant-proposal" 
        elementId="result-content" 
      />
    </div>
  );
}