'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { 
  CheckCircle2, CreditCard, Receipt, History, Zap, ExternalLink 
} from 'lucide-react';
import { getEndpoint } from '../../../lib/api';

export default function BillingOverviewPage() {
  const [usage, setUsage] = useState({ credits: 0, creditsUsedThisMonth: 0, maxCredits: 50, plan: 'free' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(getEndpoint('/api/user/usage'), { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUsage(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const percentage = usage.maxCredits > 0 ? Math.round((usage.creditsUsedThisMonth / usage.maxCredits) * 100) : 0;
  const dashArray = `${percentage}, 100`;

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#111827] mb-1">Billing</h1>
        <div className="text-sm font-medium text-[#6B7280] flex items-center gap-2">
          <span>Billing</span>
          <span className="text-[#D1D5DB]">/</span>
          <span className="text-[#111827]">Overview</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Current Plan Card */}
        <div className="bg-white border border-[#E5E7EB] rounded-[24px] p-6 lg:p-8 flex flex-col shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-[16px] font-bold text-[#111827]">Current Plan</h2>
            <span className="text-[12px] font-bold text-[#6D5EF8] bg-[#EEF2FF] px-2.5 py-1 rounded-md uppercase tracking-wider">{usage.plan} Plan</span>
          </div>

          <div className="mb-8 flex-grow">
            <h3 className="text-3xl font-extrabold text-[#111827] mb-2 capitalize">{usage.plan}</h3>
            <p className="text-sm text-[#6B7280] mb-6">Essential tools to get you started.</p>
            
            <div className="space-y-3">
              {[
                'Free credits every month',
                'Standard processing',
                'Community support',
                'Access to free tools'
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  <span className="text-sm text-[#4B5563]">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <Link href="/dashboard/billing/plans" className="w-full bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white font-semibold py-3 rounded-xl transition-colors shadow-md shadow-[#6D5EF8]/20 flex items-center justify-center">
            Upgrade to Pro
          </Link>
        </div>

        {/* Usage This Month Card */}
        <div className="bg-white border border-[#E5E7EB] rounded-[24px] p-6 lg:p-8 flex flex-col shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-2">
            <h2 className="text-[16px] font-bold text-[#111827]">Usage This Month</h2>
            <span className="text-[12px] font-medium text-[#6B7280] bg-[#F9FAFB] px-3 py-1.5 rounded-lg border border-[#E5E7EB]">Resets at month end</span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center flex-grow">
              <div className="w-8 h-8 border-4 border-[#6D5EF8]/30 border-t-[#6D5EF8] rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-8 mb-8 flex-grow">
              {/* Circular Chart */}
              <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#EEF2FF"
                    strokeWidth="3.5"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#6D5EF8"
                    strokeWidth="3.5"
                    strokeDasharray={dashArray}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-black text-[#111827]">{percentage}%</span>
                  <span className="text-[9px] text-[#6B7280] uppercase tracking-wide font-medium mt-1">of {usage.maxCredits.toLocaleString()} credits</span>
                </div>
              </div>

              <div className="flex-1 w-full space-y-4">
                <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-3">
                  <span className="text-sm font-medium text-[#6B7280]">Used</span>
                  <span className="text-sm font-bold text-[#111827]">{usage.creditsUsedThisMonth.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-3">
                  <span className="text-sm font-medium text-[#6B7280]">Remaining</span>
                  <span className="text-sm font-bold text-[#111827]">{(usage.maxCredits - usage.creditsUsedThisMonth).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-sm font-bold text-[#111827]">Total Credits</span>
                  <span className="text-sm font-bold text-[#111827]">{usage.maxCredits.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          <Link href="/dashboard/history" className="w-full bg-white border border-[#E5E7EB] hover:bg-[#F9FAFB] text-[#4B5563] font-semibold py-3 rounded-xl transition-colors flex items-center justify-center">
            View Usage Details
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-[#E5E7EB] rounded-[24px] p-6 lg:p-8 shadow-sm">
        <h3 className="text-[16px] font-bold text-[#111827] mb-6">Quick Actions</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/dashboard/billing/plans" className="flex items-start gap-4 p-4 rounded-2xl hover:bg-[#F9FAFB] transition-colors border border-transparent hover:border-[#E5E7EB] group">
            <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-[#6D5EF8]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#111827] mb-1 group-hover:text-[#6D5EF8] transition-colors">Change Plan</h4>
              <p className="text-[12px] text-[#6B7280] leading-relaxed">View and update your plan</p>
            </div>
          </Link>

          <Link href="/dashboard/billing/payment-methods" className="flex items-start gap-4 p-4 rounded-2xl hover:bg-[#F9FAFB] transition-colors border border-transparent hover:border-[#E5E7EB] group">
            <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5 text-[#6D5EF8]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#111827] mb-1 group-hover:text-[#6D5EF8] transition-colors">Payment Methods</h4>
              <p className="text-[12px] text-[#6B7280] leading-relaxed">Manage your saved cards</p>
            </div>
          </Link>

          <Link href="/dashboard/billing/invoices" className="flex items-start gap-4 p-4 rounded-2xl hover:bg-[#F9FAFB] transition-colors border border-transparent hover:border-[#E5E7EB] group">
            <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] flex items-center justify-center shrink-0">
              <Receipt className="w-5 h-5 text-[#6D5EF8]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#111827] mb-1 group-hover:text-[#6D5EF8] transition-colors">Invoices</h4>
              <p className="text-[12px] text-[#6B7280] leading-relaxed">View and download your invoices</p>
            </div>
          </Link>

          <Link href="/dashboard/history" className="flex items-start gap-4 p-4 rounded-2xl hover:bg-[#F9FAFB] transition-colors border border-transparent hover:border-[#E5E7EB] group">
            <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] flex items-center justify-center shrink-0">
              <History className="w-5 h-5 text-[#6D5EF8]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#111827] mb-1 group-hover:text-[#6D5EF8] transition-colors">Billing History</h4>
              <p className="text-[12px] text-[#6B7280] leading-relaxed">View your payment history</p>
            </div>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
