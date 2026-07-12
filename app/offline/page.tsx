'use client';

import React from 'react';
import { WifiOff, Radio, RefreshCcw } from 'lucide-react';

export default function OfflinePage() {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 overflow-hidden relative">
      
      {/* Background floating disconnected waves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <WifiOff className="absolute top-1/4 left-1/4 w-32 h-32 text-[#111827] -rotate-12" />
        <WifiOff className="absolute bottom-1/4 right-1/4 w-48 h-48 text-[#111827] rotate-12" />
      </div>

      <div className="max-w-md w-full text-center relative z-10">
        
        {/* Abstract Illustration (Satellite Theme) */}
        <div className="relative w-48 h-48 mx-auto mb-8 animate-[bounce_4s_infinite]">
          {/* Main Satellite/Radio */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Radio className="w-32 h-32 text-[#111827]" strokeWidth={1} />
          </div>
          {/* Error Cross */}
          <div className="absolute top-4 right-4 bg-white rounded-full p-1 shadow-lg animate-pulse">
            <div className="w-8 h-8 bg-[#EF4444] rounded-full flex items-center justify-center">
              <div className="w-4 h-1 bg-white rotate-45 absolute rounded-full"></div>
              <div className="w-4 h-1 bg-white -rotate-45 absolute rounded-full"></div>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-black text-[#111827] mb-3">
          You are offline
        </h2>
        
        <p className="text-[#6B7280] mb-8 font-medium">
          Please check your internet connection and try again. It looks like you've lost connection to our servers.
        </p>

        <button 
          onClick={handleRetry}
          className="inline-flex items-center justify-center gap-2 bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white font-bold py-3.5 px-12 rounded-xl transition-all shadow-md shadow-[#6D5EF8]/20 hover:shadow-lg hover:-translate-y-0.5"
        >
          <RefreshCcw className="w-4 h-4" />
          Retry
        </button>

      </div>
    </div>
  );
}
