'use client';
import React from 'react';
import DashboardLayout from '../../../../components/dashboard/DashboardLayout';
import Link from 'next/link';
import { Plus, MoreHorizontal, Lock } from 'lucide-react';

export default function PaymentMethodsPage() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#111827] mb-1">Billing</h1>
        <div className="text-sm font-medium text-[#6B7280] flex items-center gap-2">
          <Link href="/dashboard/billing" className="hover:text-[#111827] transition-colors">Billing</Link>
          <span className="text-[#D1D5DB]">/</span>
          <span className="text-[#111827]">Payment Methods</span>
        </div>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-[24px] p-6 lg:p-10 shadow-sm">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl font-bold text-[#111827] mb-1">Payment Methods</h2>
            <p className="text-sm text-[#6B7280]">Manage your saved payment methods</p>
          </div>
          
          <button className="flex items-center gap-2 bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white font-bold py-2.5 px-4 rounded-xl transition-colors shadow-md shadow-[#6D5EF8]/20 self-start sm:self-auto text-sm">
            <Plus className="w-4 h-4" /> Add Payment Method
          </button>
        </div>

        {/* Saved Cards List */}
        <div className="space-y-4 mb-10">
          
          {/* Card 1 (Visa - Default) */}
          <div className="flex items-center justify-between p-5 border border-[#E5E7EB] rounded-2xl hover:bg-[#F9FAFB] transition-colors group">
            <div className="flex items-center gap-5">
              <div className="w-16 h-10 border border-[#E5E7EB] rounded flex items-center justify-center bg-white shrink-0 shadow-sm">
                {/* Visa Logo Text placeholder */}
                <span className="text-[#1434CB] font-black italic text-xl tracking-tighter">VISA</span>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-0.5">
                  <span className="font-bold text-[#111827]">Visa ending in 4242</span>
                  <span className="text-[10px] font-bold text-[#10B981] bg-[#ECFDF5] px-2 py-0.5 rounded-full uppercase tracking-wider border border-[#A7F3D0]">Default</span>
                </div>
                <span className="text-sm text-[#6B7280]">Expires 08/28</span>
              </div>
            </div>
            <button className="p-2 text-[#9CA3AF] hover:text-[#111827] hover:bg-[#E5E7EB] rounded-lg transition-colors">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* Card 2 (Mastercard) */}
          <div className="flex items-center justify-between p-5 border border-[#E5E7EB] rounded-2xl hover:bg-[#F9FAFB] transition-colors group">
            <div className="flex items-center gap-5">
              <div className="w-16 h-10 border border-[#E5E7EB] rounded flex items-center justify-center bg-white shrink-0 shadow-sm">
                {/* Mastercard Logo SVG placeholder */}
                <div className="relative w-8 h-5 flex items-center justify-center">
                  <div className="absolute left-0 w-5 h-5 rounded-full bg-[#EB001B] opacity-90"></div>
                  <div className="absolute right-0 w-5 h-5 rounded-full bg-[#F79E1B] opacity-90"></div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-0.5">
                  <span className="font-bold text-[#111827]">Mastercard ending in 8888</span>
                </div>
                <span className="text-sm text-[#6B7280]">Expires 11/27</span>
              </div>
            </div>
            <button className="p-2 text-[#9CA3AF] hover:text-[#111827] hover:bg-[#E5E7EB] rounded-lg transition-colors">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Footer info */}
        <div className="flex items-center gap-2 text-sm text-[#6B7280]">
          <Lock className="w-4 h-4 text-[#9CA3AF]" />
          <span>Your payment information is secure and encrypted.</span>
        </div>

      </div>
    </DashboardLayout>
  );
}
