'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AlertTriangle, ArrowLeft, Frown, ZapOff } from 'lucide-react';
import DashboardLayout from '../../../../components/dashboard/DashboardLayout';

export default function CancelSubscriptionPage() {
  const router = useRouter();
  const [isCanceling, setIsCanceling] = useState(false);

  const handleCancel = () => {
    setIsCanceling(true);
    // Simulate API call
    setTimeout(() => {
      router.push('/dashboard/billing/downgrade-success');
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto pt-8 pb-16">
        
        <Link href="/dashboard/billing" className="inline-flex items-center text-sm font-medium text-[#6B7280] hover:text-[#111827] transition-colors mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Billing
        </Link>

        <div className="bg-white rounded-3xl border border-[#E5E7EB] shadow-sm overflow-hidden">
          {/* Warning Header */}
          <div className="bg-[#FEF2F2] px-8 py-10 flex flex-col items-center text-center border-b border-[#FEE2E2]">
            <div className="w-16 h-16 bg-[#FEE2E2] rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8 text-[#EF4444]" />
            </div>
            <h1 className="text-2xl font-black text-[#111827] mb-2">Cancel Subscription?</h1>
            <p className="text-[#6B7280]">We're sorry to see you go. Are you sure you want to cancel your Pro plan?</p>
          </div>

          <div className="p-8">
            <h3 className="font-bold text-[#111827] mb-4 text-lg">If you cancel, you will lose:</h3>
            
            <div className="space-y-4 mb-8">
              {[
                { title: 'Unlimited AI Generations', desc: 'You will be downgraded to 10 generations per day.' },
                { title: 'Access to Premium Tools', desc: 'Pro tools like Advanced Video Editor will be locked.' },
                { title: 'Priority Support', desc: 'You will return to the standard support queue.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB]">
                  <div className="w-10 h-10 rounded-full bg-[#FEE2E2] flex items-center justify-center flex-shrink-0">
                    <ZapOff className="w-5 h-5 text-[#EF4444]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#111827]">{item.title}</h4>
                    <p className="text-sm text-[#6B7280]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#EEF2FF] rounded-2xl p-6 mb-8 border border-[#6D5EF8]/20 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 bg-[#6D5EF8] rounded-full flex items-center justify-center flex-shrink-0">
                <Frown className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-[#111827] mb-1">Wait! How about a discount?</h4>
                <p className="text-sm text-[#4B5563]">Stay on the Pro plan and get 50% off your next 3 months.</p>
              </div>
              <button className="whitespace-nowrap bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white font-bold py-2.5 px-5 rounded-xl transition-colors shadow-md shadow-[#6D5EF8]/20">
                Claim 50% Off
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-end border-t border-[#E5E7EB] pt-6">
              <button 
                onClick={handleCancel}
                disabled={isCanceling}
                className="w-full sm:w-auto text-[#6B7280] hover:text-[#EF4444] font-bold py-3 px-6 rounded-xl transition-colors disabled:opacity-50"
              >
                {isCanceling ? 'Canceling...' : 'Yes, cancel my plan'}
              </button>
              <Link 
                href="/dashboard/billing"
                className="w-full sm:w-auto bg-[#111827] hover:bg-[#1F2937] text-white font-bold py-3 px-8 rounded-xl transition-colors text-center"
              >
                Keep my Pro Plan
              </Link>
            </div>

          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
