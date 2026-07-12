'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Zap, Clock, ShieldCheck, Building2 } from 'lucide-react';
import Stepper from '../../components/checkout/Stepper';

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [couponCode, setCouponCode] = useState('');

  const planId = searchParams.get('plan') || 'pro';
  
  // Dynamic Pricing Logic
  const isBusiness = planId === 'business';
  const planName = isBusiness ? 'Business Plan' : 'Pro Plan';
  const planIcon = isBusiness ? <Building2 className="w-6 h-6 text-[#6D5EF8]" /> : <Zap className="w-6 h-6 text-[#6D5EF8]" />;
  const monthlyPrice = isBusiness ? 99 : 49;
  const subtotal = isBusiness ? 99.00 : 49.00;
  const gst = isBusiness ? 17.82 : 8.82;
  const total = isBusiness ? 116.82 : 57.82;

  const handleContinue = () => {
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
              <p className="text-sm text-[#6B7280]">Billed monthly</p>
            </div>
          </div>
          <div className="text-right">
            <span className="font-bold text-[#111827] text-lg">${monthlyPrice}</span>
            <span className="text-sm text-[#6B7280]"> /month</span>
          </div>
        </div>

        {/* Billing Breakdown */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between text-[#4B5563] text-sm">
            <span>Subtotal</span>
            <span className="font-bold text-[#111827]">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-[#4B5563] text-sm">
            <span>GST (18%)</span>
            <span className="font-bold text-[#111827]">${gst.toFixed(2)}</span>
          </div>
        </div>

        {/* Coupon Code */}
        <div className="mb-6">
          <p className="text-sm text-[#4B5563] mb-2">Have a coupon code?</p>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Enter coupon code" 
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-[#E5E7EB] focus:ring-2 focus:ring-[#6D5EF8]/20 focus:border-[#6D5EF8] outline-none text-sm transition-all"
            />
            <button className="bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#6D5EF8] font-bold px-6 py-3 rounded-xl transition-colors text-sm">
              Apply
            </button>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center py-6 border-t border-[#E5E7EB] mb-8">
          <span className="font-bold text-[#111827] text-lg">Total</span>
          <span className="font-black text-[#111827] text-3xl">${total.toFixed(2)}</span>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-[#6B7280] mb-8">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            Cancel anytime
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            30-day money-back guarantee
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
