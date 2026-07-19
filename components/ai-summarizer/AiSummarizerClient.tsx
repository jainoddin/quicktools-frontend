'use client';

import React, { useState } from 'react';
import { FileText, ArrowRight, Loader2, Copy, CheckCircle2 } from 'lucide-react';
import { getEndpoint } from '@/lib/api';

export default function AiSummarizerClient() {
  const [text, setText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

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
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-[#F97316]">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-[#111827]">Enter Text to Summarize</h2>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your long article or text here..."
            className="w-full h-64 p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl focus:border-[#F97316] focus:ring-4 focus:ring-[#F97316]/10 transition-all outline-none resize-none text-[15px]"
          />
          <button
            onClick={handleGenerate}
            disabled={isProcessing || !text.trim()}
            className="w-full mt-4 bg-[#F97316] hover:bg-orange-600 text-white font-bold py-4 rounded-2xl shadow-md shadow-[#F97316]/20 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...</>
            ) : (
              <><SparklesIcon /> Summarize Text <ArrowRight className="w-5 h-5 ml-2" /></>
            )}
          </button>
        </div>
      </div>

      {/* Result Panel */}
      <div className="w-full lg:w-1/2">
        <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-sm h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#111827]">Summary Result</h2>
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
              <div className="prose prose-orange max-w-none">
                {result.split('\n').map((line, i) => (
                  <p key={i} className="mb-2 text-[#4B5563]">{line}</p>
                ))}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-[#9CA3AF]">
                <FileText className="w-12 h-12 mb-3 text-gray-300" />
                <p>Your summary will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SparklesIcon() {
  return (
    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}
