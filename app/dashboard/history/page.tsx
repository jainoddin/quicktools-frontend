'use client';
import React from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { 
  MessageSquare, Image as ImageIcon, FileText, LayoutGrid, 
  PenTool, CheckCircle2, Search, Filter
} from 'lucide-react';
import Link from 'next/link';

const historyData = [
  { 
    tool: { name: 'AI Image Generator', icon: ImageIcon, color: 'bg-[#6D5EF8] text-white' },
    input: 'Futuristic city with sunset',
    resultType: 'images',
    result: ['https://pub-68a98c57e70a4a1fa317739dd20098b9.r2.dev/8272f569-4d19-493a-a322-db5d2b122697.png', 'https://pub-68a98c57e70a4a1fa317739dd20098b9.r2.dev/8272f569-4d19-493a-a322-db5d2b122697.png', 'https://pub-68a98c57e70a4a1fa317739dd20098b9.r2.dev/8272f569-4d19-493a-a322-db5d2b122697.png'],
    date: 'May 12, 2024',
    time: '10:30 AM'
  },
  { 
    tool: { name: 'AI Chat', icon: MessageSquare, color: 'bg-[#10B981] text-white' },
    input: 'Explain quantum computing',
    resultType: 'text',
    result: 'Text response',
    date: 'May 12, 2024',
    time: '10:16 AM'
  },
  { 
    tool: { name: 'PDF to Word', icon: FileText, color: 'bg-[#EF4444] text-white' },
    input: 'contract.pdf',
    resultType: 'link',
    result: 'contract.docx',
    date: 'May 12, 2024',
    time: '09:45 AM'
  },
  { 
    tool: { name: 'Background Remover', icon: LayoutGrid, color: 'bg-[#10B981] text-white' },
    input: 'product-image.jpg',
    resultType: 'images',
    result: ['https://pub-68a98c57e70a4a1fa317739dd20098b9.r2.dev/8272f569-4d19-493a-a322-db5d2b122697.png'],
    date: 'May 11, 2024',
    time: '04:20 PM'
  },
  { 
    tool: { name: 'AI Writer', icon: PenTool, color: 'bg-[#3B82F6] text-white' },
    input: 'Write a blog about AI',
    resultType: 'text',
    result: 'Text response',
    date: 'May 11, 2024',
    time: '02:10 PM'
  },
  { 
    tool: { name: 'Grammar Checker', icon: CheckCircle2, color: 'bg-[#10B981] text-white' },
    input: 'My essay about AI...',
    resultType: 'text',
    result: 'Corrected text',
    date: 'May 11, 2024',
    time: '11:30 AM'
  },
];

export default function HistoryPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] mb-1">History</h1>
          <p className="text-sm text-[#6B7280]">Your recent activity and tool usage</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input 
              type="text" 
              placeholder="Search history..." 
              className="w-full h-10 pl-9 pr-4 bg-white border border-[#E5E7EB] rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#6D5EF8]/20 focus:border-[#6D5EF8] transition-all placeholder:text-[#9CA3AF]"
            />
          </div>
          <button className="flex items-center gap-2 text-sm font-medium text-[#4B5563] bg-white border border-[#E5E7EB] px-4 py-2 h-10 rounded-xl hover:bg-[#F9FAFB] transition-colors shrink-0">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-[#E5E7EB]">
              <th className="py-4 px-6 text-xs font-semibold text-[#6B7280] uppercase tracking-wider w-[25%]">Tool Used</th>
              <th className="py-4 px-6 text-xs font-semibold text-[#6B7280] uppercase tracking-wider w-[35%]">Input / Title</th>
              <th className="py-4 px-6 text-xs font-semibold text-[#6B7280] uppercase tracking-wider w-[20%]">Result</th>
              <th className="py-4 px-6 text-xs font-semibold text-[#6B7280] uppercase tracking-wider w-[20%]">Date & Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {historyData.map((item, i) => (
              <tr key={i} className="hover:bg-[#F9FAFB] transition-colors cursor-pointer">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.tool.color}`}>
                      <item.tool.icon className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-sm text-[#111827]">{item.tool.name}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="text-sm text-[#4B5563] truncate block max-w-[250px]">{item.input}</span>
                </td>
                <td className="py-4 px-6">
                  {item.resultType === 'images' ? (
                    <div className="flex items-center gap-1">
                      {(item.result as string[]).map((img, idx) => (
                        <div key={idx} className="w-8 h-8 rounded bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                          <img src={img} alt="Result" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  ) : item.resultType === 'link' ? (
                    <span className="text-sm text-[#3B82F6] hover:underline cursor-pointer">{item.result as string}</span>
                  ) : (
                    <span className="text-sm text-[#6B7280]">{item.result as string}</span>
                  )}
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#4B5563]">{item.date}</span>
                    <span className="text-xs text-[#9CA3AF]">{item.time}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
