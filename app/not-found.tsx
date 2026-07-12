import React from 'react';
import Link from 'next/link';
import { Navigation, Globe, Star, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 overflow-hidden relative">
      
      {/* Background stars animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#6D5EF8] rounded-full animate-ping opacity-20"></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-[#10B981] rounded-full animate-pulse opacity-20" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-[#F59E0B] rounded-full animate-ping opacity-20" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-md w-full text-center relative z-10">
        
        <h1 className="text-6xl md:text-8xl font-black text-[#6D5EF8] mb-8 tracking-tighter animate-pulse">
          404
        </h1>

        {/* Abstract Illustration (Astronaut/Space Theme) */}
        <div className="relative w-48 h-48 mx-auto mb-8 animate-[bounce_3s_infinite]">
          {/* Main planet */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Globe className="w-32 h-32 text-[#111827]" strokeWidth={1} />
          </div>
          {/* Floating rocket */}
          <div className="absolute top-0 right-4 animate-[spin_6s_linear_infinite]">
            <Navigation className="w-12 h-12 text-[#6D5EF8] -rotate-45" />
          </div>
          {/* Stars */}
          <Star className="absolute bottom-4 left-0 w-8 h-8 text-[#F59E0B]" />
        </div>

        <h2 className="text-2xl font-black text-[#111827] mb-3">
          Oops! Page not found
        </h2>
        
        <p className="text-[#6B7280] mb-8 font-medium">
          The page you're looking for doesn't exist, was removed, or is temporarily unavailable.
        </p>

        <Link 
          href="/" 
          className="inline-flex items-center justify-center gap-2 bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-md shadow-[#6D5EF8]/20 hover:shadow-lg hover:shadow-[#6D5EF8]/30 transform hover:-translate-y-0.5"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back Home
        </Link>

      </div>
    </div>
  );
}
