'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, Lock } from 'lucide-react';
import Stepper from '../../../components/checkout/Stepper';

export default function ProcessingPage() {
  const router = useRouter();

  useEffect(() => {
    // Simulate payment processing time, then randomly redirect to success or failure
    // For demo purposes, we'll mostly go to success. You can change this logic.
    const timer = setTimeout(() => {
      const isSuccess = Math.random() > 0.2; // 80% chance of success
      if (isSuccess) {
        router.replace('/checkout/success');  // replace = not stored in history
      } else {
        router.replace('/checkout/failed');   // replace = not stored in history
      }
    }, 3500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6">
      <div className="max-w-[800px] mx-auto bg-white rounded-3xl border border-[#E5E7EB] shadow-sm p-6 sm:p-10 flex flex-col items-center">
        
        <div className="w-full">
          <Stepper currentStep={3} />
        </div>

        <div className="flex flex-col items-center justify-center py-12">
          {/* Animated Icons Container */}
          <div className="relative w-40 h-40 mb-10 flex items-center justify-center">
            {/* Pulsating background circles */}
            <div className="absolute inset-0 rounded-full bg-[#EEF2FF] animate-ping opacity-75"></div>
            <div className="absolute inset-4 rounded-full bg-[#E0E7FF] animate-pulse"></div>
            
            {/* Central Card Icon */}
            <div className="w-20 h-16 bg-[#6D5EF8] rounded-xl relative z-10 shadow-lg shadow-[#6D5EF8]/30 flex flex-col justify-between p-2">
              <div className="w-full h-2 bg-white/20 rounded-full"></div>
              <div className="flex gap-2">
                <div className="w-4 h-2 bg-white/20 rounded-full"></div>
                <div className="w-4 h-2 bg-white/20 rounded-full"></div>
              </div>
              
              {/* Lock Badge */}
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-md border border-[#E5E7EB]">
                <Lock className="w-4 h-4 text-[#6D5EF8]" />
              </div>
            </div>
            
            {/* Decorative sparkles/stars */}
            <div className="absolute top-0 right-4 w-1.5 h-1.5 bg-[#6D5EF8] rounded-full animate-bounce"></div>
            <div className="absolute bottom-8 left-0 w-2 h-2 bg-[#6D5EF8] rounded-full animate-pulse"></div>
          </div>

          <h1 className="text-xl font-bold text-[#111827] mb-2">
            Processing your payment...
          </h1>
          
          <p className="text-[#6B7280] mb-8 font-medium text-sm">
            Please don't close this window or refresh the page.
          </p>

          {/* 4 Dots Loading Indicator */}
          <div className="flex gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div 
                key={i} 
                className="w-2.5 h-2.5 bg-[#6D5EF8] rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              ></div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
