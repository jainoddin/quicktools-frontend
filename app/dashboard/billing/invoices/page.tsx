'use client';
import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../../components/dashboard/DashboardLayout';
import Link from 'next/link';
import { Download, ChevronLeft, ChevronRight, Loader2, FileText } from 'lucide-react';
import { getEndpoint } from '../../../../lib/api';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await fetch(getEndpoint('/api/payment/invoices'), { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setInvoices(data.invoices || []);
          }
        }
      } catch (err) {
        console.error('Failed to fetch invoices:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  const totalPages = Math.max(1, Math.ceil(invoices.length / itemsPerPage));
  const currentInvoices = invoices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatAmount = (amountInPaise: number) => {
    if (!amountInPaise) return '$0.00';
    // If it's INR in paise, just display as INR, or generic currency. 
    // Assuming INR format for now or generic:
    return `₹${(amountInPaise / 100).toFixed(2)}`;
  };

  const downloadInvoice = (invoice: any) => {
    const invoiceId = invoice.razorpayOrderId.replace('order_', 'INV-');
    const date = formatDate(invoice.createdAt);
    const amount = formatAmount(invoice.amount);
    const plan = (invoice.plan || 'Pro').charAt(0).toUpperCase() + (invoice.plan || 'Pro').slice(1);

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Invoice ${invoiceId}</title>
  <style>
    body { font-family: 'Segoe UI', sans-serif; margin: 0; padding: 40px; color: #111827; background: #fff; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; padding-bottom: 24px; border-bottom: 2px solid #E5E7EB; }
    .brand { display: flex; align-items: center; gap: 10px; }
    .brand-icon { width: 40px; height: 40px; background: #6D5EF8; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px; }
    .brand-name { font-size: 22px; font-weight: 800; color: #111827; }
    .invoice-badge { background: #EEF2FF; color: #6D5EF8; padding: 6px 14px; border-radius: 8px; font-weight: 700; font-size: 13px; }
    h2 { font-size: 28px; font-weight: 800; margin: 0 0 8px; }
    .meta { color: #6B7280; font-size: 14px; margin-bottom: 32px; }
    .row { display: flex; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid #F3F4F6; font-size: 15px; }
    .row span:first-child { color: #6B7280; }
    .row span:last-child { font-weight: 600; }
    .total { font-size: 18px; font-weight: 800; color: #111827; }
    .status-paid { background: #ECFDF5; color: #10B981; padding: 4px 12px; border-radius: 6px; font-weight: 700; font-size: 13px; }
    .footer { margin-top: 40px; text-align: center; color: #9CA3AF; font-size: 13px; }
  </style>
</head>
<body>
  <div class="header">
    <div class="brand">
      <div class="brand-icon">⚡</div>
      <span class="brand-name">QuickTools.ai</span>
    </div>
    <span class="invoice-badge">INVOICE</span>
  </div>
  <h2>Payment Receipt</h2>
  <p class="meta">Thank you for your purchase!</p>
  <div class="row"><span>Invoice ID</span><span>${invoiceId}</span></div>
  <div class="row"><span>Date</span><span>${date}</span></div>
  <div class="row"><span>Plan</span><span>${plan} Plan</span></div>
  <div class="row"><span>Status</span><span class="status-paid">PAID</span></div>
  <div class="row"><span class="total">Total Amount</span><span class="total">${amount}</span></div>
  <div class="footer">QuickTools.ai &bull; AI-Powered Productivity Tools &bull; support@quicktools.ai</div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${invoiceId}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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

        {/* Content */}
        {loading ? (
          <div className="flex-grow flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-[#6D5EF8] animate-spin" />
          </div>
        ) : invoices.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-[#111827] mb-2">No invoices found</h3>
            <p className="text-sm text-[#6B7280]">You haven't made any payments yet.</p>
          </div>
        ) : (
          <>
            {/* Table */}
            <div className="overflow-x-auto overflow-y-auto max-h-[420px] flex-grow custom-scrollbar">
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
                  {currentInvoices.map((invoice, i) => (
                    <tr key={invoice._id || i} className="hover:bg-[#F9FAFB] transition-colors">
                      <td className="py-5 px-4">
                        <span className="font-bold text-sm text-[#111827]" title={invoice.razorpayOrderId}>
                          {invoice.razorpayOrderId.replace('order_', 'INV-').substring(0, 15)}...
                        </span>
                      </td>
                      <td className="py-5 px-4 text-center">
                        <span className="text-sm font-medium text-[#4B5563]">{formatDate(invoice.createdAt)}</span>
                      </td>
                      <td className="py-5 px-4 text-center">
                        <span className="text-sm font-bold text-[#111827]">{formatAmount(invoice.amount)}</span>
                      </td>
                      <td className="py-5 px-4 text-center">
                        <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border ${invoice.status === 'paid' ? 'bg-[#ECFDF5] text-[#10B981] border-[#A7F3D0]' : invoice.status === 'created' ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-[#FEF2F2] text-[#EF4444] border-[#FECACA]'}`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="py-5 px-4 text-center">
                        <button 
                          onClick={() => downloadInvoice(invoice)}
                          className="p-2 text-[#6D5EF8] hover:bg-[#EEF2FF] hover:text-[#5B4DF5] rounded-lg transition-colors inline-flex justify-center" 
                          title="Download Invoice"
                        >
                          <Download className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8 pt-6 border-t border-[#E5E7EB]">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E5E7EB] text-[#9CA3AF] hover:text-[#111827] hover:bg-[#F9FAFB] transition-colors disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button 
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold text-sm ${
                      currentPage === page 
                        ? 'bg-[#6D5EF8] text-white shadow-md shadow-[#6D5EF8]/20' 
                        : 'border border-[#E5E7EB] text-[#4B5563] hover:bg-[#F9FAFB]'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E5E7EB] text-[#9CA3AF] hover:text-[#111827] hover:bg-[#F9FAFB] transition-colors disabled:opacity-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
