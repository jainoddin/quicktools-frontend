'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { Check, ArrowRight, Download, Sparkles, Copy } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import Stepper from '../../../components/checkout/Stepper';

function SuccessContent() {
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();

  const planId = searchParams.get('plan') || 'pro';
  const amount = searchParams.get('amount') || '58.82';
  const paymentId = searchParams.get('paymentId') || 'pay_3N8Jk2h2h6as';

  const planName = planId === 'starter' ? 'Starter Plan' : planId === 'business' ? 'Business Plan' : 'Pro Plan';

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6">
      <div className="max-w-[800px] mx-auto bg-white rounded-3xl border border-[#E5E7EB] shadow-sm p-6 sm:p-10 flex flex-col items-center">
        
        <div className="w-full">
          <Stepper currentStep={4} />
        </div>

        <div className="flex flex-col items-center text-center w-full max-w-md py-6">
          
          {/* Animated Checkmark */}
          <div className="relative mb-6">
            <div className="absolute -top-6 -left-8 w-4 h-4 bg-[#EF4444] rounded-full animate-bounce"></div>
            <div className="absolute top-2 -right-10 w-3 h-3 bg-[#10B981] rounded-sm animate-[spin_3s_linear_infinite]"></div>
            <div className="absolute bottom-4 -left-12 w-2 h-2 bg-[#F59E0B] rounded-full animate-pulse"></div>
            <div className="absolute -bottom-6 right-0 w-4 h-4 bg-[#6D5EF8] rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>

            <div className="w-24 h-24 bg-[#D1FAE5] rounded-full flex items-center justify-center relative z-10 shadow-inner">
              <div className="w-16 h-16 bg-[#10B981] rounded-full flex items-center justify-center shadow-lg shadow-[#10B981]/40 transform hover:scale-105 transition-transform animate-[bounce_1s_ease-out]">
                <Check className="w-8 h-8 text-white" strokeWidth={4} />
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-black text-[#111827] mb-2">
            Payment Successful!
          </h1>
          
          <p className="text-[#6B7280] font-medium mb-8 text-sm">
            Thank you for upgrading to {planName}.<br/>
            You now have access to all premium features.
          </p>

          {/* Receipt Details */}
          <div className="w-full space-y-4 text-sm mb-8">
            <div className="flex justify-between items-center py-2 border-b border-[#E5E7EB] border-dashed">
              <span className="text-[#6B7280]">Plan</span>
              <span className="font-bold text-[#111827]">{planName}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-[#E5E7EB] border-dashed">
              <span className="text-[#6B7280]">Amount Paid</span>
              <span className="font-bold text-[#111827]">${amount}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-[#E5E7EB] border-dashed">
              <span className="text-[#6B7280]">Payment ID</span>
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-[#111827]">{paymentId}</span>
                <Copy className="w-3.5 h-3.5 text-[#9CA3AF] cursor-pointer hover:text-[#111827]" />
              </div>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-[#E5E7EB] border-dashed">
              <span className="text-[#6B7280]">Date</span>
              <span className="font-medium text-[#111827]">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <button 
              className="w-full bg-white hover:bg-[#F9FAFB] text-[#6D5EF8] font-bold py-3.5 rounded-xl border-2 border-[#EEF2FF] flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" />
              Download Invoice
            </button>
            <Link 
              href="/dashboard" 
              className="w-full bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md shadow-[#6D5EF8]/20"
            >
              Go to Dashboard
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
