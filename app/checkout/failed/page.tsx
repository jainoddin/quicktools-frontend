'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { X, RefreshCcw, HeadphonesIcon } from 'lucide-react';

export default function FailedPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4">
      <div className={`max-w-lg w-full transition-all duration-700 ease-out transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        
        <div className="bg-white rounded-3xl shadow-xl shadow-[#EF4444]/10 border border-[#E5E7EB] overflow-hidden">
          {/* Top colored accent bar */}
          <div className="h-3 w-full bg-gradient-to-r from-[#EF4444] to-[#F87171]"></div>
          
          <div className="p-8 sm:p-12 flex flex-col items-center text-center">
            
            {/* Animated X Mark (Shake) */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-[#EF4444] rounded-full blur-xl opacity-30 animate-pulse"></div>
              <div className="w-20 h-20 bg-[#FEF2F2] border-4 border-[#FEE2E2] rounded-full flex items-center justify-center relative z-10 animate-[bounce_1s_infinite]">
                <div className="w-14 h-14 bg-gradient-to-br from-[#EF4444] to-[#DC2626] rounded-full flex items-center justify-center shadow-lg shadow-[#EF4444]/40">
                  <X className="w-7 h-7 text-white" strokeWidth={3} />
                </div>
              </div>
            </div>

            <h1 className="text-3xl font-black text-[#111827] mb-3">
              Payment Failed
            </h1>
            
            <p className="text-[#6B7280] font-medium mb-8">
              We couldn't process your payment. Your card was declined. Please check your payment details or try a different card.
            </p>

            <div className="flex flex-col gap-3 w-full">
              <Link 
                href="/checkout" 
                className="w-full bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-[#6D5EF8]/20 hover:shadow-lg hover:shadow-[#6D5EF8]/30"
              >
                <RefreshCcw className="w-4 h-4" />
                Try Again
              </Link>
              
              <Link 
                href="/contact"
                className="w-full bg-white hover:bg-[#F3F4F6] text-[#4B5563] font-bold py-3.5 px-6 rounded-xl border border-[#E5E7EB] flex items-center justify-center gap-2 transition-colors"
              >
                <HeadphonesIcon className="w-4 h-4" />
                Contact Support
              </Link>
            </div>
            
          </div>
        </div>
        
      </div>
    </div>
  );
}
