'use client';

import { useToast } from '@/contexts/ToastContext';
import React, { useState, useEffect } from 'react';
import { 
  Mail, History, Loader2, Copy, CheckCircle2,
  Sparkles, Send, FileText, Briefcase
} from 'lucide-react';
import { getEndpoint } from '@/lib/api';
import ToolHistorySidebar from '../tools/ToolHistorySidebar';
import { useAuth } from '@/contexts/AuthContext';
import LoginPopup from '@/components/auth/LoginPopup';

const TONE_OPTIONS = ['Professional', 'Friendly', 'Polite', 'Firm', 'Declining'];

export default function AiEmailClient() {
  const { error, success } = useToast();
  const { isAuthenticated } = useAuth();
  const [emailText, setEmailText] = useState('');
  const [tone, setTone] = useState('Professional');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  
  const [showHistory, setShowHistory] = useState(false);
  const [toolHistory, setToolHistory] = useState<any[]>([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      const saved = localStorage.getItem('guestEmailHistory');
      if (saved) setToolHistory(JSON.parse(saved));
    } else {
      fetch(getEndpoint('/api/user/usage'), { credentials: 'include' })
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data?.history) {
            const items = data.data.history
              .filter((item: any) => item.toolSlug === '/tools/ai-email-generator')
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
    if (!emailText.trim()) return;
    setIsProcessing(true);
    setResult('');
    
    try {
      const res = await fetch(getEndpoint('/api/tools/email'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ emailText, tone }),
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.text);
        
        if (!isAuthenticated) {
          const historyItem = {
            id: data.usageId || Date.now().toString(),
            prompt: `Tone: ${tone}\nEmail: ${emailText.substring(0, 80)}...`,
            contentType: 'Email Generator',
            date: new Date().toLocaleDateString(),
            createdAt: new Date().toISOString(),
            result: data.text,
          };
          const newHistory = [historyItem, ...toolHistory].slice(0, 20);
          setToolHistory(newHistory);
          localStorage.setItem('guestEmailHistory', JSON.stringify(newHistory));
        } else {
          setToolHistory(prev => [{
            id: data.usageId || Date.now().toString(),
            prompt: `Tone: ${tone}\nEmail: ${emailText.substring(0, 80)}...`,
            contentType: 'Email Generator',
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
      localStorage.setItem('guestEmailHistory', JSON.stringify(newHistory));
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
      localStorage.setItem('guestEmailHistory', JSON.stringify(newHistory));
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
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-[#111827] mb-2">Reply Tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full h-12 px-4 bg-white rounded-xl border border-[#E5E7EB] text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#10B981]/20 focus:border-[#10B981] shadow-sm appearance-none cursor-pointer"
            >
              {TONE_OPTIONS.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="flex items-center gap-2 text-sm font-bold text-[#111827]">
                Original Email
              </label>
              <span className="text-xs text-[#6B7280]">{emailText.length}/2000</span>
            </div>
            <textarea
              value={emailText}
              onChange={(e) => setEmailText(e.target.value.substring(0, 2000))}
              placeholder="Paste the email you received here..."
              className="w-full h-40 p-4 bg-white rounded-2xl border border-[#E5E7EB] text-sm text-[#4B5563] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#10B981]/20 focus:border-[#10B981] transition-all resize-none shadow-sm"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={handleGenerate}
            disabled={isProcessing || !emailText.trim()}
            className={`w-full text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${isProcessing || !emailText.trim() ? 'bg-[#9CA3AF] cursor-not-allowed' : 'bg-[#10B981] hover:bg-[#059669]'}`}
          >
            {isProcessing ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Drafting...</>
            ) : (
              <><Send className="w-5 h-5" /> Generate Reply</>
            )}
          </button>
        </div>

        {/* Interlinks */}
        <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
          <h3 className="text-xs font-bold text-[#111827] mb-3">Explore Other AI Tools</h3>
          <div className="flex flex-col gap-2">
            <a href="/tools/ai-grammar-checker" className="flex items-center gap-3 p-2.5 bg-[#F9FAFB] hover:bg-[#ECFDF5] rounded-xl transition-colors group">
              <div className="w-8 h-8 shrink-0 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center group-hover:border-[#10B981]/30 group-hover:shadow-sm transition-all">
                <FileText className="w-4 h-4 text-[#10B981]" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#111827] group-hover:text-[#10B981] transition-colors">Grammar Checker</p>
                <p className="text-[9px] text-[#6B7280]">Fix typos & phrasing</p>
              </div>
            </a>
            <a href="/tools/ai-business-name-generator" className="flex items-center gap-3 p-2.5 bg-[#F9FAFB] hover:bg-[#ECFDF5] rounded-xl transition-colors group">
              <div className="w-8 h-8 shrink-0 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center group-hover:border-[#10B981]/30 group-hover:shadow-sm transition-all">
                <Briefcase className="w-4 h-4 text-[#10B981]" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#111827] group-hover:text-[#10B981] transition-colors">Business Name Generator</p>
                <p className="text-[9px] text-[#6B7280]">Get startup names</p>
              </div>
            </a>
          </div>
        </div>
      </aside>

      {/* Right Main Area */}
      {showHistory ? (
        <div className="flex-grow bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-sm overflow-y-auto h-[600px] animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
          <ToolHistorySidebar
            toolName="Email Generator"
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
                <div className="w-12 h-12 bg-[#10B981] rounded-xl flex items-center justify-center shadow-sm shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[#111827] flex items-center gap-2">
                    AI Email Reply <Sparkles className="w-5 h-5 text-[#10B981]" />
                  </h1>
                  <p className="text-sm text-[#6B7280]">Draft professional and polite email replies in seconds.</p>
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
              <Loader2 className="w-12 h-12 text-[#10B981] animate-spin mb-4" />
              <h2 className="text-xl font-bold text-[#111827]">Drafting Reply...</h2>
              <p className="text-[#6B7280] mt-2">Writing with a {tone.toLowerCase()} tone.</p>
            </div>
          ) : result ? (
            <div className="flex-grow flex flex-col bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-sm animate-in zoom-in-95 duration-500 h-[600px]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-[#111827]">Drafted Reply</h2>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-4 py-2 bg-[#ECFDF5] text-[#059669] rounded-xl text-sm font-bold hover:bg-[#D1FAE5] transition-colors"
                  >
                    {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                  <button 
                    onClick={() => setShowHistory(true)}
                    className="flex items-center gap-2 px-4 py-2 border border-[#E5E7EB] text-[#4B5563] rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
                  >
                    <History className="w-4 h-4 text-[#6B7280]" /> History
                  </button>
                </div>
              </div>
              
              <div className="flex-1 bg-[#FAFAFA] p-6 rounded-2xl border border-[#E5E7EB] overflow-y-auto whitespace-pre-wrap text-[#374151] leading-relaxed">
                {result}
              </div>
            </div>
          ) : (
            <div className="flex-grow bg-white rounded-3xl border border-[#E5E7EB] p-8 lg:p-12 shadow-sm flex flex-col items-center justify-center text-center relative animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both delay-200 h-[600px]">
              
              {/* Animated Graphic */}
              <div className="relative w-72 h-64 mb-10 flex items-center justify-center mt-4">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-emerald-50 rounded-full blur-2xl opacity-80"></div>
                
                <div className="relative z-10 w-40 h-32 bg-white rounded-xl shadow-[0_10px_30px_-10px_rgba(16,185,129,0.3)] border-4 border-emerald-200 overflow-hidden flex flex-col items-center justify-center transform hover:scale-105 transition-transform duration-500 animate-[bounce_4s_infinite]">
                  <Mail className="w-12 h-12 text-[#10B981] mb-2" />
                  <div className="w-24 h-2 bg-emerald-100 rounded-full"></div>
                </div>

                {/* Flying Paper Airplane icon representation */}
                <div className="absolute top-10 right-6 w-12 h-12 bg-white rounded-full shadow-lg border border-[#E5E7EB] flex items-center justify-center animate-[bounce_3s_infinite_0.5s] z-20">
                  <Send className="w-6 h-6 text-[#10B981]" />
                </div>
                
                {/* Curved dashed line path */}
                <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 z-0 pointer-events-none animate-pulse" viewBox="0 0 100 100" fill="none">
                  <path d="M 20 80 Q 50 20 80 20" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4" className="opacity-50" />
                </svg>

                <Sparkles className="absolute top-8 left-12 w-6 h-6 text-emerald-300 animate-pulse" />
                <Sparkles className="absolute bottom-12 right-16 w-5 h-5 text-emerald-300 animate-pulse" style={{ animationDelay: '500ms' }} />
              </div>

              <h2 className="text-2xl lg:text-3xl font-bold text-[#111827] mb-3">
                Ready to <span className="text-[#10B981]">reply?</span>
              </h2>
              <p className="text-[#6B7280] max-w-sm mx-auto mb-8">
                Paste the original email on the left, choose your tone, and click <span className="text-[#10B981] font-semibold">"Generate Reply"</span>.
              </p>
            </div>
          )}
        </main>
      )}
    </div>
  );
}
