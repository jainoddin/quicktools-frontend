'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Zap, Clock, ShieldCheck, Building2 } from 'lucide-react';
import Stepper from '../../components/checkout/Stepper';
import { trackCheckoutContinue } from '@/lib/analytics';

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planId = searchParams.get('plan') || 'pro';
  
  // Dynamic Pricing Logic
  let planName = 'Pro Plan';
  let planIcon = <Zap className="w-6 h-6 text-[#6D5EF8]" />;
  let price = 3588;
  let period = 'year';
  let total = 3588;

  if (planId === 'starter') {
    planName = 'Pro Monthly';
    price = 299;
    period = 'month';
    total = 299;
  } else if (planId === 'business') {
    planName = 'Business Plan';
    planIcon = <Building2 className="w-6 h-6 text-[#6D5EF8]" />;
    price = 6000;
    period = 'year';
    total = 6000;
  }

  const handleContinue = () => {
    trackCheckoutContinue(planId, total);
    router.push(`/checkout/payment?plan=${planId}`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6">
      <div className="max-w-[800px] mx-auto bg-white rounded-3xl border border-[#E5E7EB] shadow-sm p-6 sm:p-10">
        
        <Stepper currentStep={2} />

        <h1 className="text-xl font-bold text-[#111827] mb-6">
          Review Your Order
        </h1>

        {/* Plan Details Card */}
        <div className="border border-[#E5E7EB] rounded-2xl p-5 mb-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#EEF2FF] flex items-center justify-center">
              {planIcon}
            </div>
            <div>
              <h3 className="font-bold text-[#111827] text-lg">{planName}</h3>
              <p className="text-sm text-[#6B7280]">Billed per {period}</p>
            </div>
          </div>
          <div className="text-right">
            <span className="font-bold text-[#111827] text-lg">₹{price.toLocaleString('en-IN')}</span>
            <span className="text-sm text-[#6B7280]"> /{period}</span>
          </div>
        </div>

        {/* Billing Breakdown */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between text-[#4B5563] text-sm">
            <span>Subtotal</span>
            <span className="font-bold text-[#111827]">₹{price.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-[#4B5563] text-sm">
            <span>Taxes</span>
            <span className="font-bold text-[#111827]">Included</span>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center py-6 border-t border-[#E5E7EB] mb-8">
          <span className="font-bold text-[#111827] text-lg">Total</span>
          <span className="font-black text-[#111827] text-3xl">₹{total.toLocaleString('en-IN')}</span>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-[#6B7280] mb-8">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            Cancel anytime
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            Secure Razorpay checkout
          </div>
        </div>

        {/* CTA */}
        <button 
          onClick={handleContinue}
          className="w-full bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white font-bold py-4 rounded-xl transition-all shadow-md shadow-[#6D5EF8]/20 hover:shadow-lg hover:shadow-[#6D5EF8]/30"
        >
          Continue to Payment
        </button>

      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
