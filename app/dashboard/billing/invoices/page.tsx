'use client';
import React from 'react';
import DashboardLayout from '../../../../components/dashboard/DashboardLayout';
import Link from 'next/link';
import { Download, ChevronLeft, ChevronRight } from 'lucide-react';

const invoiceData = [
  { id: 'INV-2025-0006', date: 'May 12, 2025', amount: '$9.99', status: 'Paid' },
  { id: 'INV-2025-0005', date: 'Apr 12, 2025', amount: '$9.99', status: 'Paid' },
  { id: 'INV-2025-0004', date: 'Mar 12, 2025', amount: '$9.99', status: 'Paid' },
  { id: 'INV-2025-0003', date: 'Feb 12, 2025', amount: '$9.99', status: 'Paid' },
  { id: 'INV-2025-0002', date: 'Jan 12, 2025', amount: '$9.99', status: 'Paid' },
  { id: 'INV-2025-0001', date: 'Dec 12, 2024', amount: '$9.99', status: 'Paid' },
];

export default function InvoicesPage() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#111827] mb-1">Billing</h1>
        <div className="text-sm font-medium text-[#6B7280] flex items-center gap-2">
          <Link href="/dashboard/billing" className="hover:text-[#111827] transition-colors">Billing</Link>
          <span className="text-[#D1D5DB]">/</span>
          <span className="text-[#111827]">Invoices</span>
        </div>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-[24px] p-6 lg:p-10 shadow-sm flex flex-col h-auto lg:min-h-[600px]">
        
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#111827] mb-1">Invoices</h2>
          <p className="text-sm text-[#6B7280]">View and download your invoices</p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto flex-grow">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-[#E5E7EB]">
                <th className="py-4 px-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider w-[25%]">Invoice</th>
                <th className="py-4 px-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider w-[25%] text-center">Date</th>
                <th className="py-4 px-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider w-[20%] text-center">Amount</th>
                <th className="py-4 px-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider w-[15%] text-center">Status</th>
                <th className="py-4 px-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider w-[15%] text-center">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {invoiceData.map((invoice, i) => (
                <tr key={i} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="py-5 px-4">
                    <span className="font-bold text-sm text-[#111827]">{invoice.id}</span>
                  </td>
                  <td className="py-5 px-4 text-center">
                    <span className="text-sm font-medium text-[#4B5563]">{invoice.date}</span>
                  </td>
                  <td className="py-5 px-4 text-center">
                    <span className="text-sm font-bold text-[#111827]">{invoice.amount}</span>
                  </td>
                  <td className="py-5 px-4 text-center">
                    <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border ${invoice.status === 'Paid' ? 'bg-[#ECFDF5] text-[#10B981] border-[#A7F3D0]' : 'bg-[#FEF2F2] text-[#EF4444] border-[#FECACA]'}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="py-5 px-4 text-center">
                    <button className="p-2 text-[#6D5EF8] hover:bg-[#EEF2FF] hover:text-[#5B4DF5] rounded-lg transition-colors inline-flex justify-center">
                      <Download className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-8 pt-6 border-t border-[#E5E7EB]">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E5E7EB] text-[#9CA3AF] hover:text-[#111827] hover:bg-[#F9FAFB] transition-colors disabled:opacity-50" disabled>
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#6D5EF8] text-white font-bold text-sm shadow-md shadow-[#6D5EF8]/20">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E5E7EB] text-[#9CA3AF] hover:text-[#111827] hover:bg-[#F9FAFB] transition-colors disabled:opacity-50" disabled>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </DashboardLayout>
  );
}
