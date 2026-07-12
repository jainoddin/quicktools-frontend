'use client';
import React from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { 
  Search, ChevronDown, Wrench, Sparkles, Plus
} from 'lucide-react';
import Link from 'next/link';

export default function MyToolsPage() {
  const tabs = ['All Tools', 'Recently Used', 'Custom Tools'];
  const myTools: any[] = []; // Intentionally empty to show empty state

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] mb-1">My Tools</h1>
          <p className="text-sm text-[#6B7280]">Tools you frequently use</p>
        </div>
        
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
          <input 
            type="text" 
            placeholder="Search my tools..." 
            className="w-full h-10 pl-9 pr-4 bg-white border border-[#E5E7EB] rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#6D5EF8]/20 focus:border-[#6D5EF8] transition-all placeholder:text-[#9CA3AF]"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
          {tabs.map((tab, i) => (
            <button 
              key={tab} 
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${i === 0 ? 'bg-[#6D5EF8] text-white shadow-md shadow-[#6D5EF8]/20' : 'bg-white border border-[#E5E7EB] text-[#4B5563] hover:bg-[#F9FAFB]'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white border border-dashed border-[#E5E7EB] rounded-2xl p-16 flex flex-col items-center justify-center text-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-[#6D5EF8]/20 rounded-full blur-xl animate-pulse"></div>
          <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center relative shadow-inner animate-[bounce_3s_ease-in-out_infinite]">
            <Wrench className="w-10 h-10 text-[#6D5EF8]" />
            <Sparkles className="w-5 h-5 text-amber-400 absolute -top-1 -right-1 animate-pulse" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-[#111827] mb-2">No tools used yet</h3>
        <p className="text-[#6B7280] max-w-sm mb-8">
          You haven't used any tools yet. Start exploring our collection of AI tools to boost your productivity.
        </p>
        
        <Link 
          href="/dashboard/all" 
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white font-semibold rounded-xl shadow-md shadow-[#6D5EF8]/20 transition-all hover:scale-105"
        >
          <Search className="w-4 h-4" />
          Explore Tools
        </Link>
      </div>
    </DashboardLayout>
  );
}
