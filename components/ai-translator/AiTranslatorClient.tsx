'use client';

import React, { useState } from 'react';
import { Languages, ArrowRight, Loader2, Copy, CheckCircle2, ChevronDown } from 'lucide-react';
import { getEndpoint } from '@/lib/api';

const LANGUAGES = [
  'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese',
  'Russian', 'Chinese (Simplified)', 'Japanese', 'Korean', 'Arabic',
  'Hindi', 'Telugu', 'Tamil', 'Bengali', 'Marathi', 'Gujarati', 'Urdu'
];

export default function AiTranslatorClient() {
  const [text, setText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('Spanish');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!text.trim()) return;
    setIsProcessing(true);
    setResult('');
    
    try {
      const res = await fetch(getEndpoint('/api/tools/translate'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ text, targetLanguage }),
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.text);
      } else {
        alert('Failed: ' + data.message);
      }
    } catch (error) {
      alert('Error connecting to server');
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-stretch">
      {/* Input Panel */}
      <div className="w-full lg:w-1/2 flex flex-col gap-5">
        <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center text-[#06B6D4]">
              <Languages className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-[#111827]">Text to Translate</h2>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-semibold text-[#4B5563] mb-2">Target Language</label>
            <select 
              value={targetLanguage} 
              onChange={e => setTargetLanguage(e.target.value)}
              className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4 py-3 outline-none focus:border-[#06B6D4]"
            >
              {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
            </select>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste text here..."
            className="w-full h-48 p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl focus:border-[#06B6D4] focus:ring-4 focus:ring-[#06B6D4]/10 transition-all outline-none resize-none text-[15px]"
          />
          <button
            onClick={handleGenerate}
            disabled={isProcessing || !text.trim()}
            className="w-full mt-4 bg-[#06B6D4] hover:bg-cyan-600 text-white font-bold py-4 rounded-2xl shadow-md shadow-[#06B6D4]/20 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Translating...</>
            ) : (
              <><Languages className="w-5 h-5 mr-2" /> Translate Now <ArrowRight className="w-5 h-5 ml-2" /></>
            )}
          </button>
        </div>
      </div>

      {/* Result Panel */}
      <div className="w-full lg:w-1/2">
        <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-sm h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#111827]">Translation</h2>
            {result && (
              <button 
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            )}
          </div>
          
          <div className="flex-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-5 overflow-y-auto">
            {result ? (
              <div className="prose prose-cyan max-w-none text-lg">
                {result.split('\n').map((line, i) => (
                  <p key={i} className="mb-2 text-[#4B5563]">{line}</p>
                ))}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-[#9CA3AF]">
                <Languages className="w-12 h-12 mb-3 text-gray-300" />
                <p>Translation will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
