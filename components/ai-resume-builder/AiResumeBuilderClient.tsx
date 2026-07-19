'use client';

import React, { useState } from 'react';
import { FileUser, ArrowRight, Loader2, Copy, CheckCircle2 } from 'lucide-react';
import { getEndpoint } from '@/lib/api';

export default function AiResumeBuilderClient() {
  const [details, setDetails] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!details.trim()) return;
    setIsProcessing(true);
    setResult('');
    
    try {
      const res = await fetch(getEndpoint('/api/tools/resume'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ details }),
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
      <div className="w-full lg:w-1/2 flex flex-col gap-5">
        <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#F5F3FF] flex items-center justify-center text-[#6D5EF8]">
              <FileUser className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-[#111827]">Your Details</h2>
          </div>
          <p className="text-sm text-gray-500 mb-3">Include your name, contact, skills, and work experience.</p>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="E.g. John Doe, Software Engineer. 5 years experience in React and Node.js..."
            className="w-full h-64 p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl focus:border-[#6D5EF8] outline-none resize-none text-[15px]"
          />
          <button
            onClick={handleGenerate}
            disabled={isProcessing || !details.trim()}
            className="w-full mt-4 bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white font-bold py-4 rounded-2xl shadow-md transition-all flex items-center justify-center disabled:opacity-50"
          >
            {isProcessing ? (
              <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Building...</>
            ) : (
              <><FileUser className="w-5 h-5 mr-2" /> Generate Resume <ArrowRight className="w-5 h-5 ml-2" /></>
            )}
          </button>
        </div>
      </div>

      <div className="w-full lg:w-1/2">
        <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-sm h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#111827]">Generated Resume</h2>
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
          
          <div className="flex-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-5 overflow-y-auto h-[500px] max-h-[500px] whitespace-pre-wrap font-mono text-sm text-gray-800">
            {result || (
              <div className="h-full flex flex-col items-center justify-center text-[#9CA3AF] font-sans">
                <FileUser className="w-12 h-12 mb-3 text-gray-300" />
                <p>Your resume will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
