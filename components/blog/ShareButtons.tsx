"use client";

import React, { useState } from 'react';
import { Link as LinkIcon, Check } from 'lucide-react';
import { trackShare } from '@/lib/analytics';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(url);
      trackShare('content', 'copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareToTwitter = () => {
    if (typeof window !== 'undefined') {
      trackShare('content', 'twitter');
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
    }
  };

  const shareToLinkedIn = () => {
    if (typeof window !== 'undefined') {
      trackShare('content', 'linkedin');
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button 
        onClick={shareToTwitter}
        className="w-8 h-8 rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center text-[#4B5563] hover:bg-gray-50 hover:text-[#1DA1F2] transition-colors shadow-sm"
        aria-label="Share on X (Twitter)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>
      </button>
      <button 
        onClick={shareToLinkedIn}
        className="w-8 h-8 rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center text-[#4B5563] hover:bg-gray-50 hover:text-[#0A66C2] transition-colors shadow-sm"
        aria-label="Share on LinkedIn"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
      </button>
      <button 
        onClick={handleCopy}
        className="w-8 h-8 rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center text-[#4B5563] hover:bg-gray-50 hover:text-[#111827] transition-colors shadow-sm"
        aria-label="Copy Link"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <LinkIcon className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
}
