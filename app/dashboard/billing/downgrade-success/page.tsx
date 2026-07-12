'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import DashboardLayout from '../../../../components/dashboard/DashboardLayout';

export default function DowngradeSuccessPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto pt-16 pb-16">
        
        <div className={`bg-white rounded-3xl border border-[#E5E7EB] shadow-sm overflow-hidden transition-all duration-700 ease-out transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="p-10 flex flex-col items-center text-center">
            
            <div className="w-20 h-20 bg-[#D1FAE5] rounded-full flex items-center justify-center mb-6 shadow-inner">
              <CheckCircle2 className="w-10 h-10 text-[#10B981]" />
            </div>

            <h1 className="text-3xl font-black text-[#111827] mb-3">Subscription Canceled</h1>
            
            <p className="text-[#6B7280] mb-8 max-w-md">
              Your plan has been successfully downgraded to the <span className="font-bold text-[#111827]">Free Plan</span>. You will retain Pro access until the end of your current billing cycle on <span className="font-medium text-[#111827]">Jan 01, 2024</span>.
            </p>

            <div className="w-full bg-[#F9FAFB] rounded-2xl p-6 border border-[#E5E7EB] mb-8 text-left space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-2"></div>
                <p className="text-sm text-[#4B5563]">No further charges will be made to your card.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-2"></div>
                <p className="text-sm text-[#4B5563]">You can still use all 10 free credits every day.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-2"></div>
                <p className="text-sm text-[#4B5563]">You can upgrade back to Pro anytime without losing your data.</p>
              </div>
            </div>

            <Link 
              href="/dashboard"
              className="bg-[#111827] hover:bg-[#1F2937] text-white font-bold py-3.5 px-8 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              Return to Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
            
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
