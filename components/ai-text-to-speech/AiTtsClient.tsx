'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, Sparkles, Play, Square, Pause, Settings2, History, CheckCircle2, Copy, RefreshCw } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import LoginPopup from '@/components/auth/LoginPopup';
import ToolHistorySidebar from '@/components/tools/ToolHistorySidebar';
import { getEndpoint } from '@/lib/api';

export default function AiTtsClient() {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const [showHistory, setShowHistory] = useState(false);
  const [toolHistory, setToolHistory] = useState<any[]>([]);
  
  const { user, isAuthenticated, updateUser } = useAuth();
  const { error, success } = useToast();

  useEffect(() => {
    const synth = window.speechSynthesis;
    const updateVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0 && !selectedVoice) {
        const defaultVoice = availableVoices.find(v => v.name.includes('Google US English')) || availableVoices[0];
        setSelectedVoice(defaultVoice.name);
      }
    };

    updateVoices();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = updateVoices;
    }
    return () => synth.cancel();
  }, [selectedVoice]);

  useEffect(() => {
    if (!isAuthenticated) {
      const saved = localStorage.getItem('ai-text-to-speech_history');
      if (saved) {
        try { setToolHistory(JSON.parse(saved)); } catch {}
      }
    } else {
      fetch(getEndpoint('/api/user/usage'), {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data?.history) {
          const items = data.data.history
            .filter((item: any) => item.toolSlug === '/tools/ai-text-to-speech')
            .map((item: any) => ({
              id: item._id,
              prompt: item.prompt,
              result: item.result,
              date: new Date(item.createdAt).toLocaleDateString(),
              isStarred: item.isStarred || false
            }));
          setToolHistory(items);
        }
      })
      .catch(console.error);
    }
  }, [isAuthenticated]);

  const saveHistory = async (usedText: string, voiceName: string) => {
    const resultText = `Voice: ${voiceName} | Pitch: ${pitch} | Speed: ${rate}`;
    
    if (!isAuthenticated) {
      const newItem = { id: Date.now().toString(), prompt: usedText, result: resultText, date: new Date().toLocaleDateString(), createdAt: new Date().toISOString(), isStarred: false };
      const newHistory = [newItem, ...toolHistory];
      setToolHistory(newHistory);
      localStorage.setItem('ai-text-to-speech_history', JSON.stringify(newHistory));
    } else {
      try {
        const res = await fetch(getEndpoint('/api/user/usage'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            toolSlug: '/tools/ai-text-to-speech',
            toolName: 'AI Text to Speech',
            prompt: usedText,
            result: resultText,
            creditsUsed: 0
          })
        });
        const data = await res.json();
        if (data.success && data.data) {
          const item = data.data;
          const newItem = { 
            id: item._id, 
            prompt: item.prompt, 
            result: item.result, 
            date: new Date(item.createdAt).toLocaleDateString(), 
            createdAt: item.createdAt, 
            isStarred: item.isStarred || false 
          };
          setToolHistory([newItem, ...toolHistory]);
        }
      } catch (err) {
        console.error('Failed to save history on server', err);
      }
    }
  };

  const handlePlay = () => {
    if (!text.trim()) return;
    
    const synth = window.speechSynthesis;
    
    if (isPaused) {
      synth.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    synth.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find(v => v.name === selectedVoice);
    if (voice) utterance.voice = voice;
    utterance.pitch = pitch;
    utterance.rate = rate;

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };
    
    utterance.onerror = (e) => {
      console.error('Speech synthesis error:', e);
      setIsPlaying(false);
      setIsPaused(false);
    };

    synth.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
    setHasGenerated(true);
    saveHistory(text, selectedVoice);
  };

  const handlePause = () => {
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsPlaying(false);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const handleToggleFavorite = async (id: string) => {
    setToolHistory(prev => {
      const updated = prev.map(item => 
        (String(item.id) === String(id) || String(item._id) === String(id)) ? { ...item, isStarred: !item.isStarred } : item
      );
      if (!isAuthenticated) {
        localStorage.setItem('ai-text-to-speech_history', JSON.stringify(updated));
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
      localStorage.setItem('ai-text-to-speech_history', JSON.stringify(updated));
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

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:h-full">
      {/* Left Column (Inputs) */}
      <div className="w-full lg:w-[400px] xl:w-[450px] shrink-0 flex flex-col gap-6">
        <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#111827] mb-2 flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-[#0EA5E9]" /> AI Text to Speech
            </h2>
            <p className="text-sm text-[#4B5563]">
              Convert text into natural-sounding speech instantly.
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-[#111827] mb-2">
                Text to Speak
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your text here..."
                className="w-full h-32 px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl focus:ring-2 focus:ring-[#0EA5E9]/20 focus:border-[#0EA5E9] transition-all resize-none text-sm text-[#111827] placeholder:text-[#9CA3AF]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#111827] mb-2">
                Select Voice
              </label>
              <select
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
                className="w-full h-12 px-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl focus:ring-2 focus:ring-[#0EA5E9]/20 focus:border-[#0EA5E9] transition-all text-sm text-[#111827]"
              >
                {voices.map((voice) => (
                  <option key={voice.name} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </option>
                ))}
              </select>
            </div>

            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-2 text-sm font-medium text-[#6B7280] hover:text-[#0EA5E9] transition-colors w-full justify-end"
            >
              <Settings2 className="w-4 h-4" /> 
              {showSettings ? 'Hide Settings' : 'Advanced Settings'}
            </button>

            {showSettings && (
              <div className="grid grid-cols-2 gap-4 p-4 bg-[#F9FAFB] rounded-2xl border border-[#E5E7EB]">
                <div>
                  <label className="block text-xs font-semibold text-[#4B5563] mb-2 flex justify-between">
                    <span>Pitch</span>
                    <span className="text-[#0EA5E9]">{pitch.toFixed(1)}</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.1"
                    value={pitch}
                    onChange={(e) => setPitch(parseFloat(e.target.value))}
                    className="w-full accent-[#0EA5E9]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4B5563] mb-2 flex justify-between">
                    <span>Speed</span>
                    <span className="text-[#0EA5E9]">{rate.toFixed(1)}x</span>
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(parseFloat(e.target.value))}
                    className="w-full accent-[#0EA5E9]"
                  />
                </div>
              </div>
            )}

            <button
              onClick={handlePlay}
              disabled={!text.trim() || isPlaying}
              className="w-full h-14 bg-[#111827] hover:bg-[#1F2937] text-white font-bold rounded-2xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5 fill-current" />
              {isPlaying ? 'Playing...' : isPaused ? 'Resume' : 'Play Audio'}
            </button>
          </div>
        </div>
      </div>

      {/* Right Column (History / Result) */}
      {showHistory ? (
        <div className="flex-grow bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-sm overflow-y-auto h-[600px] animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
          <ToolHistorySidebar
            toolName="AI Text to Speech"
            toolType="text"
            history={toolHistory}
            onBack={() => setShowHistory(false)}
            onToggleFavorite={handleToggleFavorite}
            onDelete={handleDeleteHistory}
            onSelect={(item) => { setText(item.prompt); setShowHistory(false); }}
          />
        </div>
      ) : (
        <main className="flex-grow flex flex-col min-w-0">
          {/* Header Area */}
          <div className="flex flex-col md:flex-row md:items-start lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-[#111827] flex items-center gap-2">
                AI Text to Speech <Sparkles className="w-6 h-6 text-[#0EA5E9]" />
              </h1>
              <p className="text-[#6B7280] text-sm lg:text-base mt-2">
                Convert any text into natural-sounding speech instantly.
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

          <div className="flex-grow bg-white border border-[#E5E7EB] rounded-3xl p-6 lg:p-8 shadow-sm flex flex-col h-[600px] animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both delay-150">
            {hasGenerated || isPlaying || isPaused ? (
              <div className="h-full flex flex-col">
                <div className="flex-grow overflow-y-auto custom-scrollbar pr-2 min-h-0 mb-6 flex flex-col items-center justify-center space-y-6">
                  {/* Visualizer Mockup */}
                  <div className="w-32 h-32 bg-[#F0F9FF] rounded-full flex items-center justify-center shadow-inner relative overflow-hidden border-4 border-[#0EA5E9]/20">
                     {isPlaying && (
                       <div className="absolute inset-0 bg-[#0EA5E9]/10 animate-ping rounded-full" />
                     )}
                     <Volume2 className={`w-12 h-12 text-[#0EA5E9] ${isPlaying ? 'animate-pulse' : ''}`} />
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-[#111827]">{isPlaying ? 'Playing Audio' : isPaused ? 'Paused' : 'Playback Finished'}</h3>
                    <p className="text-[#6B7280] mt-1">Voice: {selectedVoice}</p>
                  </div>
                </div>

                {/* Playback Controls */}
                <div className="flex flex-wrap justify-center items-center gap-3 pt-6 border-t border-[#E5E7EB] shrink-0">
                  {isPlaying ? (
                    <button
                      onClick={handlePause}
                      className="flex items-center gap-2 px-6 py-2.5 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold rounded-xl transition-all shadow-sm text-sm"
                    >
                      <Pause className="w-5 h-5 fill-current" /> Pause
                    </button>
                  ) : (
                    <button
                      onClick={handlePlay}
                      disabled={!text.trim()}
                      className="flex items-center gap-2 px-6 py-2.5 bg-[#0EA5E9] hover:bg-[#0284C7] disabled:bg-[#93C5FD] text-white font-bold rounded-xl transition-all shadow-sm text-sm disabled:cursor-not-allowed"
                    >
                      <Play className="w-5 h-5 fill-current" /> {isPaused ? 'Resume' : 'Replay'}
                    </button>
                  )}
                  <button
                    onClick={handleStop}
                    disabled={!isPlaying && !isPaused}
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#EF4444] hover:bg-[#DC2626] disabled:bg-[#FCA5A5] text-white font-bold rounded-xl transition-all shadow-sm text-sm disabled:cursor-not-allowed"
                  >
                    <Square className="w-5 h-5 fill-current" /> Stop
                  </button>
                </div>
              </div>
            ) : (
               <div className="h-full flex flex-col items-center justify-center text-center px-4">
                 <div className="w-16 h-16 bg-[#F9FAFB] rounded-2xl flex items-center justify-center mb-4 border border-[#E5E7EB]">
                   <Sparkles className="w-8 h-8 text-[#9CA3AF]" />
                 </div>
                 <h3 className="text-lg font-bold text-[#111827] mb-2">Ready to Speak</h3>
                 <p className="text-[#6B7280] max-w-sm">
                   Enter your text on the left, choose a voice, and hit play to start the magic.
                 </p>
               </div>
            )}
          </div>
        </main>
      )}
    </div>
  );
}
