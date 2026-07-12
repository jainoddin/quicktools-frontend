'use client';
import React, { useState } from 'react';
import DashboardLayout from '../../../../components/dashboard/DashboardLayout';
import { CheckCircle2, ShieldCheck, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function BillingPlansPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#111827] mb-1">Billing</h1>
        <div className="text-sm font-medium text-[#6B7280] flex items-center gap-2">
          <Link href="/dashboard/billing" className="hover:text-[#111827] transition-colors">Billing</Link>
          <span className="text-[#D1D5DB]">/</span>
          <span className="text-[#111827]">Plans</span>
        </div>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-[24px] p-6 lg:p-10 shadow-sm">
        
        {/* Header & Toggle */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-2xl font-bold text-[#111827] mb-2">Choose Your Plan</h2>
            <p className="text-sm text-[#6B7280]">Select the perfect plan for your needs</p>
          </div>
          
          <div className="flex items-center gap-2 bg-[#F9FAFB] p-1.5 rounded-xl border border-[#E5E7EB] self-start md:self-auto">
            <button 
              onClick={() => setIsYearly(false)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${!isYearly ? 'bg-white text-[#111827] shadow-sm' : 'text-[#6B7280] hover:text-[#111827]'}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setIsYearly(true)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${isYearly ? 'bg-white text-[#111827] shadow-sm' : 'text-[#6B7280] hover:text-[#111827]'}`}
            >
              Yearly <span className="bg-[#ECFDF5] text-[#10B981] text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          
          {/* Free Plan */}
          <div className="border border-[#E5E7EB] rounded-[24px] p-8 flex flex-col hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-[#111827] mb-4">Free</h3>
            <div className="flex items-end gap-1 mb-2">
              <span className="text-4xl font-black text-[#111827]">$0</span>
              <span className="text-sm text-[#6B7280] mb-1">/ month</span>
            </div>
            <p className="text-sm text-[#6B7280] mb-8 pb-8 border-b border-[#F3F4F6]">Perfect for getting started</p>
            
            <div className="space-y-4 mb-8 flex-grow">
              {['10 tools per day', 'Standard processing', 'Community support', 'Access to free tools'].map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0" />
                  <span className="text-sm text-[#4B5563]">{feature}</span>
                </div>
              ))}
            </div>
            
            <button className="w-full py-3 bg-white border border-[#E5E7EB] text-[#9CA3AF] font-bold rounded-xl cursor-not-allowed">
              Current Plan
            </button>
          </div>

          {/* Pro Plan */}
          <div className="border-2 border-[#6D5EF8] rounded-[24px] p-8 flex flex-col relative shadow-lg shadow-[#6D5EF8]/10 bg-[#F5F3FF]/30">
            <div className="absolute -top-3 right-6 bg-[#6D5EF8] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              Most Popular
            </div>
            <h3 className="text-xl font-bold text-[#111827] mb-4">Pro</h3>
            <div className="flex items-end gap-1 mb-2">
              <span className="text-4xl font-black text-[#111827]">${isYearly ? '7.99' : '9.99'}</span>
              <span className="text-sm text-[#6B7280] mb-1">/ month</span>
            </div>
            <p className="text-sm text-[#6B7280] mb-8 pb-8 border-b border-[#E5E7EB]">For professionals and power users</p>
            
            <div className="space-y-4 mb-8 flex-grow">
              {['Unlimited tools', 'High priority processing', 'Advanced AI models', 'No daily limits', 'Email support'].map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#6D5EF8] shrink-0" />
                  <span className="text-sm font-medium text-[#111827]">{feature}</span>
                </div>
              ))}
            </div>
            
            <button className="w-full py-3 bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white font-bold rounded-xl transition-colors shadow-md shadow-[#6D5EF8]/20">
              Upgrade to Pro
            </button>
          </div>

          {/* Business Plan */}
          <div className="border border-[#E5E7EB] rounded-[24px] p-8 flex flex-col hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-[#111827] mb-4">Business</h3>
            <div className="flex items-end gap-1 mb-2">
              <span className="text-4xl font-black text-[#111827]">${isYearly ? '23.99' : '29.99'}</span>
              <span className="text-sm text-[#6B7280] mb-1">/ month</span>
            </div>
            <p className="text-sm text-[#6B7280] mb-8 pb-8 border-b border-[#F3F4F6]">For teams and businesses</p>
            
            <div className="space-y-4 mb-8 flex-grow">
              {['Everything in Pro', 'Team collaboration', 'API access', 'Custom limits', 'Priority support'].map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0" />
                  <span className="text-sm text-[#4B5563]">{feature}</span>
                </div>
              ))}
            </div>
            
            <button className="w-full py-3 bg-white border border-[#6D5EF8] text-[#6D5EF8] hover:bg-[#EEF2FF] font-bold rounded-xl transition-colors">
              Upgrade to Business
            </button>
          </div>

        </div>

        {/* Footer info */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-sm text-[#6B7280]">
          <span className="hidden sm:inline">All plans include secure payments, cancel anytime, and 30-day money-back guarantee.</span>
          <div className="flex items-center gap-6 sm:hidden">
            <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#9CA3AF]"/> Secure payments</div>
            <div className="flex items-center gap-2"><XCircle className="w-4 h-4 text-[#9CA3AF]"/> Cancel anytime</div>
          </div>
        </div>
        <div className="hidden sm:flex items-center justify-center gap-12 mt-6">
            <div className="flex items-center gap-2 text-sm text-[#6B7280]"><ShieldCheck className="w-4 h-4 text-[#9CA3AF]"/> Secure payments</div>
            <div className="flex items-center gap-2 text-sm text-[#6B7280]"><XCircle className="w-4 h-4 text-[#9CA3AF]"/> Cancel anytime</div>
            <div className="flex items-center gap-2 text-sm text-[#6B7280]"><CheckCircle2 className="w-4 h-4 text-[#9CA3AF]"/> 30-day money back</div>
        </div>
      </div>
    </DashboardLayout>
  );
}
