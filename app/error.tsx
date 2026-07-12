'use client';

import React, { useEffect } from 'react';
import { Bot, Wrench, RefreshCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        
        <h1 className="text-6xl md:text-8xl font-black text-[#EF4444] mb-8 tracking-tighter animate-pulse">
          500
        </h1>

        {/* Abstract Illustration (Robot Theme) */}
        <div className="relative w-48 h-48 mx-auto mb-8 animate-[bounce_2s_infinite]">
          {/* Main Robot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Bot className="w-32 h-32 text-[#111827]" strokeWidth={1.5} />
          </div>
          {/* Sparking wire/wrench */}
          <div className="absolute top-4 right-4 animate-[spin_3s_linear_infinite]">
            <Wrench className="w-10 h-10 text-[#EF4444]" />
          </div>
        </div>

        <h2 className="text-2xl font-black text-[#111827] mb-3">
          Something went wrong!
        </h2>
        
        <p className="text-[#6B7280] mb-8 font-medium">
          We are working on it. An unexpected error has occurred on our servers. Please try again later.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button 
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white font-bold py-3.5 px-6 rounded-xl transition-colors shadow-md shadow-[#6D5EF8]/20"
          >
            <RefreshCcw className="w-4 h-4" />
            Try Again
          </button>
          
          <Link 
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F9FAFB] text-[#111827] font-bold py-3.5 px-6 rounded-xl border border-[#E5E7EB] transition-colors"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
        </div>

      </div>
    </div>
  );
}
