'use client';

import React, { useState } from 'react';
import { Link2, ArrowRight, Loader2, Copy, CheckCircle2 } from 'lucide-react';
import { getEndpoint } from '@/lib/api';

export default function UrlShortenerClient() {
  const [url, setUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [shortUrl, setShortUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!url.trim()) return;
    setIsProcessing(true);
    setShortUrl('');
    
    try {
      const res = await fetch(getEndpoint('/api/tools/shorten'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (data.success) {
        // Assume backend is on localhost:5000 in dev, or quicktools.ai in prod. 
        // We will just use the current window location origin to build the link
        const domain = process.env.NEXT_PUBLIC_API_URL?.includes('localhost') ? 'http://localhost:5000' : 'https://api.quicktool.space';
        setShortUrl(\`\${domain}/s/\${data.shortCode}\`);
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
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-stretch">
      <div className="w-full lg:w-1/2 flex flex-col gap-5">
        <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#F5F3FF] flex items-center justify-center text-[#6D5EF8]">
              <Link2 className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-[#111827]">Enter Long URL</h2>
          </div>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/very/long/url..."
            className="w-full p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl focus:border-[#6D5EF8] outline-none text-[15px]"
          />
          <button
            onClick={handleGenerate}
            disabled={isProcessing || !url.trim()}
            className="w-full mt-4 bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white font-bold py-4 rounded-2xl shadow-md transition-all flex items-center justify-center disabled:opacity-50"
          >
            {isProcessing ? (
              <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Shortening...</>
            ) : (
              <><Link2 className="w-5 h-5 mr-2" /> Shorten URL <ArrowRight className="w-5 h-5 ml-2" /></>
            )}
          </button>
        </div>
      </div>

      <div className="w-full lg:w-1/2">
        <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-sm h-full flex flex-col">
          <h2 className="text-lg font-bold text-[#111827] mb-4">Your Short Link</h2>
          
          <div className="flex-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-5 flex flex-col items-center justify-center">
            {shortUrl ? (
              <div className="w-full bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-sm text-center">
                <a href={shortUrl} target="_blank" rel="noreferrer" className="text-xl font-bold text-[#6D5EF8] hover:underline break-all">
                  {shortUrl}
                </a>
                <button 
                  onClick={copyToClipboard}
                  className="mt-6 w-full flex justify-center items-center gap-2 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl transition-colors"
                >
                  {copied ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                  {copied ? 'Copied to Clipboard!' : 'Copy Link'}
                </button>
              </div>
            ) : (
              <div className="text-center text-[#9CA3AF]">
                <Link2 className="w-12 h-12 mb-3 mx-auto text-gray-300" />
                <p>Your short link will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
