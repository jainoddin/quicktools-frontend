'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, X } from 'lucide-react';
import { updateAnalyticsConsent } from '@/lib/analytics';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('quicktools_cookie_consent');
    if (consent === 'declined') {
      updateAnalyticsConsent(false);
    } else if (consent === 'true') {
      updateAnalyticsConsent(true);
    }

    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('quicktools_cookie_consent', 'true');
    updateAnalyticsConsent(true);
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('quicktools_cookie_consent', 'declined');
    updateAnalyticsConsent(false);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-[9999] max-w-sm animate-in slide-in-from-bottom-5 duration-500 fade-in">
      <div className="bg-white/95 backdrop-blur-md border border-[#E5E7EB] rounded-2xl shadow-2xl p-5 flex flex-col relative overflow-hidden">
        
        {/* Subtle decorative gradient background */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#6D5EF8]/10 blur-2xl rounded-full pointer-events-none"></div>

        <div className="flex items-start gap-4 relative z-10">
          <div className="w-10 h-10 rounded-full bg-[#EEF2FF] flex items-center justify-center shrink-0 border border-[#C7D2FE]">
            <Cookie className="w-5 h-5 text-[#6D5EF8]" />
          </div>
          
          <div className="flex-grow">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-[#111827] text-sm">We use cookies</h3>
              <button 
                onClick={declineCookies}
                className="text-[#9CA3AF] hover:text-[#4B5563] transition-colors"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-[#6B7280] leading-relaxed mb-4 pr-2">
              We use cookies to improve your experience, analyze traffic, and personalize content. By clicking "Accept", you consent to our use of cookies.
            </p>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={acceptCookies}
                className="flex-1 bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white text-xs font-bold py-2 px-4 rounded-lg transition-colors shadow-sm"
              >
                Accept All
              </button>
              <Link 
                href="/privacy" 
                className="flex-1 text-center bg-white border border-[#E5E7EB] hover:bg-[#F9FAFB] text-[#4B5563] text-xs font-bold py-2 px-4 rounded-lg transition-colors"
                onClick={() => setIsVisible(false)} // Optionally hide if they navigate away to read
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
