'use client';
import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { Search, Filter } from 'lucide-react';
import { IconMap } from '../../../components/tools/ToolsClient';
import { getEndpoint } from '../../../lib/api';

function DynamicIcon({ name }: { name: string }) {
  // Try to find the tool by name in allTools, but we can't easily import it here if it's not exported.
  // We'll just use a generic icon mapping based on common names for now, or just fallback.
  // Actually, wait, IconMap expects keys like 'PenTool', 'ImageIcon', etc. 
  // We can just use a generic LayoutGrid if not matched.
  const Icon = IconMap['LayoutGrid'];
  return <Icon className="w-4 h-4" />;
}

export default function HistoryPage() {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(getEndpoint('/api/user/usage'), { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setHistoryData(data.data.history);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
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
            {loading ? (
              <tr>
                <td colSpan={4} className="py-12 text-center text-[#6B7280]">
                  Loading history...
                </td>
              </tr>
            ) : historyData.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-12 text-center text-[#6B7280]">
                  No history found. Start using tools to see your activity here.
                </td>
              </tr>
            ) : (
              historyData.map((item: any, i) => (
                <tr key={i} className="hover:bg-[#F9FAFB] transition-colors cursor-pointer">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-[#EEF2FF] text-[#6D5EF8]`}>
                        <DynamicIcon name={item.toolName} />
                      </div>
                      <span className="font-semibold text-sm text-[#111827]">{item.toolName}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-[#4B5563] truncate block max-w-[250px]">{item.prompt}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-[#6B7280]">{item.result || 'Generated content'}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[#4B5563]">
                        {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="text-xs text-[#9CA3AF]">
                        {new Date(item.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
