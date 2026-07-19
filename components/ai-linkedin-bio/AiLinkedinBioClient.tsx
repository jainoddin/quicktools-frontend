'use client';

import { useToast } from '@/contexts/ToastContext';
import { Download } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { 
  Briefcase, History, Loader2, Copy, CheckCircle2,
  Sparkles } from 'lucide-react';
import { getEndpoint } from '@/lib/api';
import { downloadAsPDF } from '@/lib/pdfUtils';
import ToolHistorySidebar from '../tools/ToolHistorySidebar';
import { useAuth } from '@/contexts/AuthContext';
import LoginPopup from '@/components/auth/LoginPopup';
import ReactMarkdown from 'react-markdown';

export default function AiLinkedinBioClient() {
  const { error, success } = useToast();
  const { isAuthenticated } = useAuth();
  const [profession, setProfession] = useState('');
  const [skills, setSkills] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  
  const [showHistory, setShowHistory] = useState(false);
  const [toolHistory, setToolHistory] = useState<any[]>([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      const saved = localStorage.getItem('guestBriefcaseBioHistory');
      if (saved) setToolHistory(JSON.parse(saved));
    } else {
      fetch(getEndpoint('/api/user/usage'), { credentials: 'include' })
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data?.history) {
            const items = data.data.history
              .filter((item: any) => item.toolSlug === '/tools/ai-linkedin-bio')
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
    if (!profession.trim() || !skills.trim()) return;
    setIsProcessing(true);
    setResult('');
    
    try {
      const res = await fetch(getEndpoint('/api/tools/linkedin-bio'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ profession, skills }),
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.text);
        
        if (!isAuthenticated) {
          const historyItem = {
            id: data.usageId || Date.now().toString(),
            prompt: profession.substring(0, 100),
            contentType: 'LinkedIn Bio',
            date: new Date().toLocaleDateString(),
            createdAt: new Date().toISOString(),
            result: data.text,
          };
          const newHistory = [historyItem, ...toolHistory].slice(0, 20);
          setToolHistory(newHistory);
          localStorage.setItem('guestBriefcaseBioHistory', JSON.stringify(newHistory));
        } else {
          setToolHistory(prev => [{
            id: data.usageId || Date.now().toString(),
            prompt: profession.substring(0, 100),
            contentType: 'LinkedIn Bio',
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
      localStorage.setItem('guestBriefcaseBioHistory', JSON.stringify(newHistory));
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
      localStorage.setItem('guestBriefcaseBioHistory', JSON.stringify(newHistory));
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
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-bold text-[#111827]">Current Role / Profession</label>
            </div>
            <input
              type="text"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              placeholder="e.g., Growth Marketing Manager"
              className="w-full p-3 bg-white rounded-xl border border-[#E5E7EB] text-sm text-[#4B5563] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0077B5]/20 focus:border-[#0077B5] transition-all shadow-sm"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-bold text-[#111827]">Skills & Achievements</label>
              <span className="text-xs text-[#6B7280]">{skills.length}/500</span>
            </div>
            <textarea
              value={skills}
              onChange={(e) => setSkills(e.target.value.substring(0, 500))}
              placeholder="e.g., Scaled user base from 10k to 500k, expert in SEO and Paid Ads..."
              className="w-full h-32 p-3 bg-white rounded-xl border border-[#E5E7EB] text-sm text-[#4B5563] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0077B5]/20 focus:border-[#0077B5] transition-all resize-none shadow-sm"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={handleGenerate}
            disabled={isProcessing || !profession.trim() || !skills.trim()}
            className={`w-full text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${isProcessing || !profession.trim() || !skills.trim() ? 'bg-[#9CA3AF] cursor-not-allowed' : 'bg-[#0077B5] hover:bg-[#005E93]'}`}
          >
            {isProcessing ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Optimizing...</>
            ) : (
              <><Briefcase className="w-5 h-5" /> Generate Bio</>
            )}
          </button>
        </div>

        {/* Interlinks */}
        <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
          <h3 className="text-xs font-bold text-[#111827] mb-3">Explore Other Free Tools</h3>
          <div className="flex flex-col gap-2">
            <a href="/tools/ai-cover-letter" className="flex items-center gap-3 p-2.5 bg-[#F9FAFB] hover:bg-[#F0F8FF] rounded-xl transition-colors group">
              <div className="w-8 h-8 shrink-0 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center group-hover:border-[#0077B5]/30 group-hover:shadow-sm transition-all">
                <Briefcase className="w-4 h-4 text-[#0077B5]" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#111827] group-hover:text-[#0077B5] transition-colors">Cover Letter</p>
                <p className="text-[9px] text-[#6B7280]">Write a custom letter</p>
              </div>
            </a>
          </div>
        </div>
      </aside>

      {/* Right Main Area */}
      {showHistory ? (
        <div className="flex-grow bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-sm overflow-y-auto h-[600px] animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
          <ToolHistorySidebar
            toolName="LinkedIn Bio"
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
                <div className="w-12 h-12 bg-[#0077B5] rounded-xl flex items-center justify-center shadow-sm shrink-0">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[#111827] flex items-center gap-2">
                    AI LinkedIn Bio <Sparkles className="w-5 h-5 text-[#0077B5]" />
                  </h1>
                  <p className="text-sm text-[#6B7280]">Create a professional, highly optimized LinkedIn summary.</p>
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
              <Loader2 className="w-12 h-12 text-[#0077B5] animate-spin mb-4" />
              <h2 className="text-xl font-bold text-[#111827]">Optimizing Profile...</h2>
              <p className="text-[#6B7280] mt-2">Structuring your achievements for maximum impact.</p>
            </div>
          ) : result ? (
            <div className="flex-grow flex flex-col bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-sm animate-in zoom-in-95 duration-500 h-[600px]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-[#111827]">Generated Bio</h2>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-4 py-2 bg-[#F0F8FF] text-[#005E93] rounded-xl text-sm font-bold hover:bg-[#E1F0FF] transition-colors"
                  >
                    {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                  <button 
                    onClick={() => downloadAsPDF('result-content', 'Document.pdf')}
                    className="flex items-center gap-2 px-4 py-2 bg-[#F0FDF4] text-[#16A34A] rounded-xl text-sm font-bold hover:bg-[#DCFCE7] transition-colors"
                  >
                    <Download className="w-4 h-4" /> PDF
                  </button>
                  <button 
                    onClick={() => setShowHistory(true)}
                    className="flex items-center gap-2 px-4 py-2 border border-[#E5E7EB] text-[#4B5563] rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
                  >
                    <History className="w-4 h-4 text-[#6B7280]" /> History
                  </button>
                </div>
              </div>
              
              <div className="flex-1 bg-[#FAFAFA] p-8 rounded-2xl border border-[#E5E7EB] overflow-y-auto max-h-[600px] custom-scrollbar">
                <div className="prose prose-blue max-w-none text-sm text-[#374151]">
                  <ReactMarkdown>{result}</ReactMarkdown>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-grow bg-white rounded-3xl border border-[#E5E7EB] p-8 lg:p-12 shadow-sm flex flex-col items-center justify-center text-center relative animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both delay-200 h-[600px]">
              
              {/* Animated Graphic */}
              <div className="relative w-72 h-64 mb-10 flex items-center justify-center mt-4">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-blue-50 rounded-full blur-2xl opacity-80"></div>
                
                <div className="relative z-10 w-44 h-52 bg-white rounded-xl shadow-[0_10px_30px_-10px_rgba(0,119,181,0.3)] border-4 border-blue-200 overflow-hidden flex flex-col p-4 transform hover:scale-110 transition-transform duration-500">
                  <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 border-4 border-white shadow-sm -mt-2"></div>
                  
                  <div className="w-full h-2 bg-gray-200 rounded-full mb-3"></div>
                  <div className="w-4/5 h-2 bg-gray-200 rounded-full mx-auto mb-6"></div>

                  <div className="w-full h-2 bg-gray-100 rounded-full mb-2"></div>
                  <div className="w-full h-2 bg-gray-100 rounded-full mb-2"></div>
                  <div className="w-3/4 h-2 bg-gray-100 rounded-full"></div>
                </div>
                
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full shadow-lg border border-[#E5E7EB] flex items-center justify-center animate-[bounce_3s_infinite]">
                  <Briefcase className="w-6 h-6 text-[#0077B5]" />
                </div>
              </div>

              <h2 className="text-2xl lg:text-3xl font-bold text-[#111827] mb-3">
                Need a <span className="text-[#0077B5]">better profile?</span>
              </h2>
              <p className="text-[#6B7280] max-w-sm mx-auto mb-8">
                Enter your role and skills on the left and click <span className="text-[#0077B5] font-semibold">"Generate Bio"</span>.
              </p>
            </div>
          )}
        </main>
      )}
    </div>
  );
}
