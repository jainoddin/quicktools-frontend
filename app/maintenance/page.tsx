import React from 'react';
import { PenTool, Wrench, AlertCircle } from 'lucide-react';

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 overflow-hidden relative">
      
      {/* Background construction tape stripes */}
      <div className="absolute top-0 left-0 w-full h-4 bg-[repeating-linear-gradient(45deg,#F59E0B,#F59E0B_10px,#FCD34D_10px,#FCD34D_20px)]"></div>
      <div className="absolute bottom-0 left-0 w-full h-4 bg-[repeating-linear-gradient(45deg,#F59E0B,#F59E0B_10px,#FCD34D_10px,#FCD34D_20px)]"></div>

      <div className="max-w-md w-full text-center relative z-10">
        
        {/* Abstract Illustration (Construction Theme) */}
        <div className="relative w-48 h-48 mx-auto mb-8 animate-[bounce_3s_infinite]">
          {/* Main Character */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <PenTool className="w-32 h-32 text-[#F59E0B]" strokeWidth={1.5} />
          </div>
          {/* Tool */}
          <div className="absolute bottom-4 right-4 animate-[wiggle_1s_infinite]">
            <Wrench className="w-12 h-12 text-[#111827] -rotate-45" />
          </div>
        </div>

        <h2 className="text-3xl font-black text-[#111827] mb-3">
          We'll be back soon!
        </h2>
        
        <p className="text-[#6B7280] mb-8 font-medium">
          We're currently performing scheduled maintenance to improve our platform. Please check back later. We apologize for the inconvenience.
        </p>

        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FEF3C7] text-[#D97706] rounded-full text-sm font-bold">
          <AlertCircle className="w-4 h-4" />
          Expected downtime: ~30 minutes
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes wiggle {
          0%, 100% { transform: rotate(-45deg); }
          50% { transform: rotate(-25deg); }
        }
      `}} />
    </div>
  );
}
