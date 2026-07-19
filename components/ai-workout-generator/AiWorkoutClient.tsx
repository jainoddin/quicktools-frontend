'use client';

import { useToast } from '@/contexts/ToastContext';
import { Download } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { 
  Dumbbell, History, Loader2, Copy, CheckCircle2,
  Sparkles, Heart } from 'lucide-react';
import { getEndpoint } from '@/lib/api';
import { downloadAsPDF } from '@/lib/pdfUtils';
import ToolHistorySidebar from '../tools/ToolHistorySidebar';
import { useAuth } from '@/contexts/AuthContext';
import LoginPopup from '@/components/auth/LoginPopup';
import ReactMarkdown from 'react-markdown';

export default function AiWorkoutClient() {
  const { error, success } = useToast();
  const { isAuthenticated } = useAuth();
  const [goal, setGoal] = useState('Build Muscle');
  const [level, setLevel] = useState('Beginner');
  const [duration, setDuration] = useState('45');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  
  const [showHistory, setShowHistory] = useState(false);
  const [toolHistory, setToolHistory] = useState<any[]>([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      const saved = localStorage.getItem('guestWorkoutHistory');
      if (saved) setToolHistory(JSON.parse(saved));
    } else {
      fetch(getEndpoint('/api/user/usage'), { credentials: 'include' })
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data?.history) {
            const items = data.data.history
              .filter((item: any) => item.toolSlug === '/tools/ai-workout-generator')
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
    setIsProcessing(true);
    setResult('');
    
    try {
      const res = await fetch(getEndpoint('/api/tools/workout-generator'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ goal, level, duration }),
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.text);
        
        const promptString = `${goal}, ${level}, ${duration} min`;
        if (!isAuthenticated) {
          const historyItem = {
            id: data.usageId || Date.now().toString(),
            prompt: promptString,
            contentType: 'Workout Plan',
            date: new Date().toLocaleDateString(),
            createdAt: new Date().toISOString(),
            result: data.text,
          };
          const newHistory = [historyItem, ...toolHistory].slice(0, 20);
          setToolHistory(newHistory);
          localStorage.setItem('guestWorkoutHistory', JSON.stringify(newHistory));
        } else {
          setToolHistory(prev => [{
            id: data.usageId || Date.now().toString(),
            prompt: promptString,
            contentType: 'Workout Plan',
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
      localStorage.setItem('guestWorkoutHistory', JSON.stringify(newHistory));
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
      localStorage.setItem('guestWorkoutHistory', JSON.stringify(newHistory));
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
            <label className="text-sm font-bold text-[#111827] mb-2 block">Primary Goal</label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full p-3 bg-white rounded-xl border border-[#E5E7EB] text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 focus:border-[#8B5CF6] transition-all cursor-pointer shadow-sm"
            >
              <option value="Build Muscle">Build Muscle</option>
              <option value="Lose Weight">Lose Weight & Fat</option>
              <option value="Improve Endurance">Improve Endurance</option>
              <option value="General Fitness">General Fitness</option>
              <option value="Flexibility & Mobility">Flexibility & Mobility</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-bold text-[#111827] mb-2 block">Fitness Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full p-3 bg-white rounded-xl border border-[#E5E7EB] text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 focus:border-[#8B5CF6] transition-all cursor-pointer shadow-sm"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-bold text-[#111827] mb-2 block">Duration (Minutes)</label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-3 bg-white rounded-xl border border-[#E5E7EB] text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 focus:border-[#8B5CF6] transition-all cursor-pointer shadow-sm"
            >
              <option value="15">15 Minutes (Quick)</option>
              <option value="30">30 Minutes</option>
              <option value="45">45 Minutes (Standard)</option>
              <option value="60">60 Minutes</option>
              <option value="90">90 Minutes (Long)</option>
            </select>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={handleGenerate}
            disabled={isProcessing}
            className={`w-full text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${isProcessing ? 'bg-[#9CA3AF] cursor-not-allowed' : 'bg-[#8B5CF6] hover:bg-[#7C3AED]'}`}
          >
            {isProcessing ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Planning...</>
            ) : (
              <><Dumbbell className="w-5 h-5" /> Generate Workout Plan</>
            )}
          </button>
        </div>

        {/* Interlinks */}
        <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
          <h3 className="text-xs font-bold text-[#111827] mb-3">Explore Other Free Tools</h3>
          <div className="flex flex-col gap-2">
            <a href="/tools/ai-recipe-generator" className="flex items-center gap-3 p-2.5 bg-[#F9FAFB] hover:bg-[#F5F3FF] rounded-xl transition-colors group">
              <div className="w-8 h-8 shrink-0 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center group-hover:border-[#8B5CF6]/30 group-hover:shadow-sm transition-all">
                <Heart className="w-4 h-4 text-[#8B5CF6]" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#111827] group-hover:text-[#8B5CF6] transition-colors">Recipe Generator</p>
                <p className="text-[9px] text-[#6B7280]">Healthy meals from ingredients</p>
              </div>
            </a>
          </div>
        </div>
      </aside>

      {/* Right Main Area */}
      {showHistory ? (
        <div className="flex-grow bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-sm overflow-y-auto h-[600px] animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
          <ToolHistorySidebar
            toolName="Workout Plan"
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
                <div className="w-12 h-12 bg-[#8B5CF6] rounded-xl flex items-center justify-center shadow-sm shrink-0">
                  <Dumbbell className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[#111827] flex items-center gap-2">
                    AI Workout Plan <Sparkles className="w-5 h-5 text-[#8B5CF6]" />
                  </h1>
                  <p className="text-sm text-[#6B7280]">Generate custom, highly effective workout plans instantly.</p>
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
              <Loader2 className="w-12 h-12 text-[#8B5CF6] animate-spin mb-4" />
              <h2 className="text-xl font-bold text-[#111827]">Designing Routine...</h2>
              <p className="text-[#6B7280] mt-2">Selecting exercises, sets, and reps for your goals.</p>
            </div>
          ) : result ? (
            <div className="flex-grow flex flex-col bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-sm animate-in zoom-in-95 duration-500 h-[600px]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-[#111827]">Your Workout Plan</h2>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-4 py-2 bg-[#F5F3FF] text-[#7C3AED] rounded-xl text-sm font-bold hover:bg-[#EDE9FE] transition-colors"
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
                <div id="result-content" className="prose prose-purple bg-white p-4 rounded-xl max-w-none text-sm text-[#374151]">
                  <ReactMarkdown>{result}</ReactMarkdown>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-grow bg-white rounded-3xl border border-[#E5E7EB] p-8 lg:p-12 shadow-sm flex flex-col items-center justify-center text-center relative animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both delay-200 h-[600px]">
              
              {/* Animated Graphic */}
              <div className="relative w-72 h-64 mb-10 flex items-center justify-center mt-4">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-purple-50 rounded-full blur-2xl opacity-80"></div>
                
                <div className="relative z-10 w-44 h-32 bg-white rounded-xl shadow-[0_10px_30px_-10px_rgba(139,92,246,0.3)] border-4 border-purple-200 overflow-hidden flex flex-col items-center justify-center transform hover:scale-110 transition-transform duration-500">
                  <Dumbbell className="w-16 h-16 text-[#8B5CF6] drop-shadow-md animate-[pulse_2s_infinite]" />
                </div>
                
                <div className="absolute top-8 -right-4 w-12 h-12 bg-white rounded-full shadow-lg border border-[#E5E7EB] flex items-center justify-center animate-[bounce_3s_infinite]">
                  <span className="font-bold text-xl">💪</span>
                </div>
              </div>

              <h2 className="text-2xl lg:text-3xl font-bold text-[#111827] mb-3">
                Ready to <span className="text-[#8B5CF6]">sweat?</span>
              </h2>
              <p className="text-[#6B7280] max-w-sm mx-auto mb-8">
                Select your goals and time on the left, then click <span className="text-[#8B5CF6] font-semibold">"Generate Workout Plan"</span>.
              </p>
            </div>
          )}
        </main>
      )}
    </div>
  );
}
