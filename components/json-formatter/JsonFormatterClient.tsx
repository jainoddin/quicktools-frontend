'use client';

import React, { useState } from 'react';
import { Download, Code2, Copy, CheckCircle2, Trash2, FileJson, Sparkles } from 'lucide-react';
import { downloadAsPDF } from '@/lib/pdfUtils';
import ReactMarkdown from 'react-markdown';

export default function JsonFormatterClient() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    if (!input.trim()) {
      setOutput('');
      setError('');
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Invalid JSON');
      setOutput('');
    }
  };

  const handleMinify = () => {
    if (!input.trim()) {
      setOutput('');
      setError('');
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Invalid JSON');
      setOutput('');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadExample = () => {
    const example = {
      "user": {
        "id": 1,
        "name": "Alex Doe",
        "isActive": true,
        "roles": ["admin", "editor"],
        "profile": {
          "avatar": "https://example.com/avatar.jpg",
          "theme": "dark"
        }
      }
    };
    setInput(JSON.stringify(example));
    setTimeout(() => {
      setOutput(JSON.stringify(example, null, 2));
      setError('');
    }, 100);
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start lg:items-center justify-between gap-4 mb-6 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#334155] rounded-xl flex items-center justify-center shadow-sm shrink-0">
            <FileJson className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#111827] flex items-center gap-2">
              JSON Formatter & Validator <Sparkles className="w-5 h-5 text-[#334155]" />
            </h1>
            <p className="text-sm text-[#6B7280]">Format, validate, and beautify your JSON data instantly.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 shrink-0">
          <button 
            onClick={loadExample}
            className="px-4 py-2 bg-white border border-[#E5E7EB] text-[#4B5563] rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm"
          >
            Load Example
          </button>
          <button 
            onClick={handleClear}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E7EB] text-[#EF4444] rounded-xl text-sm font-semibold hover:bg-red-50 transition-colors shadow-sm"
          >
            <Trash2 className="w-4 h-4" /> Clear
          </button>
        </div>
      </div>

      {/* Main Split View */}
      <div className="flex flex-col lg:flex-row gap-6 flex-grow min-h-0">
        
        {/* Left: Input */}
        <div className="flex-1 flex flex-col bg-white border border-[#E5E7EB] rounded-3xl overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB] bg-[#FAFAFA]">
            <h2 className="text-sm font-bold text-[#111827]">Input JSON</h2>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleFormat}
                className="px-4 py-1.5 bg-[#334155] text-white rounded-lg text-xs font-bold hover:bg-[#1E293B] transition-colors shadow-sm"
              >
                Format
              </button>
              <button 
                onClick={handleMinify}
                className="px-4 py-1.5 bg-white border border-[#E5E7EB] text-[#4B5563] rounded-lg text-xs font-bold hover:bg-gray-50 transition-colors shadow-sm"
              >
                Minify
              </button>
            </div>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Paste your JSON here... e.g. {"name": "QuickTools"}'
            className="flex-1 w-full p-6 text-sm font-mono text-[#374151] placeholder-gray-400 focus:outline-none resize-none bg-[#FAFAFA]"
            spellCheck="false"
          />
        </div>

        {/* Right: Output */}
        <div className="flex-1 flex flex-col bg-white border border-[#E5E7EB] rounded-3xl overflow-hidden shadow-sm relative">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB] bg-[#FAFAFA]">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-bold text-[#111827]">Output</h2>
              {error && (
                <span className="text-xs font-semibold text-[#EF4444] bg-[#FEF2F2] px-2.5 py-1 rounded-md border border-[#FCA5A5]">
                  Invalid JSON
                </span>
              )}
              {!error && output && (
                <span className="text-xs font-semibold text-[#10B981] bg-[#ECFDF5] px-2.5 py-1 rounded-md border border-[#6EE7B7]">
                  Valid JSON
                </span>
              )}
            </div>
            <button 
              onClick={copyToClipboard}
              disabled={!output}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-sm border ${
                copied 
                  ? 'bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]' 
                  : 'bg-white text-[#4B5563] border-[#E5E7EB] hover:bg-gray-50'
              } ${!output && 'opacity-50 cursor-not-allowed'}`}
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
                  <button 
                    onClick={() => downloadAsPDF('result-content', 'Document.pdf')}
                    className="flex items-center gap-2 px-4 py-2 bg-[#F0FDF4] text-[#16A34A] rounded-xl text-sm font-bold hover:bg-[#DCFCE7] transition-colors"
                  >
                    <Download className="w-4 h-4" /> PDF
                  </button>
          </div>
          
          <div className="flex-1 relative bg-[#1E293B] overflow-hidden">
            {error ? (
              <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
                  <Code2 className="w-8 h-8 text-red-400" />
                </div>
                <p className="text-red-400 font-mono text-sm max-w-md break-words">{error}</p>
              </div>
            ) : (
              <textarea
                value={output}
                readOnly
                placeholder="Formatted JSON will appear here..."
                className="w-full h-full p-6 text-sm font-mono text-[#E2E8F0] focus:outline-none resize-none bg-transparent"
                spellCheck="false"
              />
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
