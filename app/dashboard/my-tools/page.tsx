'use client';
import React from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { 
  MessageSquare, Image as ImageIcon, FileText, LayoutGrid, 
  PenTool, CheckCircle2, PlaySquare, ChevronDown, Search,
  Star, ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const myTools = [
  { name: 'AI Chat', used: 12, lastUsed: '1h ago', icon: MessageSquare, color: 'bg-[#10B981] text-white', slug: '/tools/ai-chat' },
  { name: 'AI Image Generator', used: 8, lastUsed: '2h ago', icon: ImageIcon, color: 'bg-[#6D5EF8] text-white', slug: '/tools/ai-image-generator' },
  { name: 'PDF to Word', used: 5, lastUsed: '1d ago', icon: FileText, color: 'bg-[#EF4444] text-white', slug: '/tools/pdf-converter' },
  { name: 'Background Remover', used: 5, lastUsed: '1d ago', icon: LayoutGrid, color: 'bg-[#10B981] text-white', slug: '/tools/background-remover' },
  { name: 'AI Writer', used: 10, lastUsed: '2d ago', icon: PenTool, color: 'bg-[#3B82F6] text-white', slug: '/tools/ai-writer' },
  { name: 'Grammar Checker', used: 6, lastUsed: '3d ago', icon: CheckCircle2, color: 'bg-[#10B981] text-white', slug: '/tools/grammar-checker' },
  { name: 'Image Upscaler', used: 4, lastUsed: '3d ago', icon: ImageIcon, color: 'bg-[#3B82F6] text-white', slug: '/tools/image-upscaler' },
  { name: 'YouTube Summary', used: 3, lastUsed: '4d ago', icon: PlaySquare, color: 'bg-[#EF4444] text-white', slug: '/tools/youtube-summary' },
];

export default function MyToolsPage() {
  const tabs = ['All Tools', 'Recently Used', 'Custom Tools'];

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

        <button className="flex items-center gap-2 text-sm font-medium text-[#4B5563] bg-white border border-[#E5E7EB] px-4 py-2 rounded-xl hover:bg-[#F9FAFB] transition-colors shrink-0">
          Sort by: Recent <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {myTools.map((tool, index) => (
          <Link href={tool.slug} key={index} className="group">
            <div className="bg-white p-5 rounded-2xl border border-[#E5E7EB] hover:border-[#6D5EF8] hover:shadow-xl hover:shadow-[#6D5EF8]/10 transition-all duration-300 relative h-full flex flex-col">

              {/* Top Row: Icon and Tag */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner ${tool.color}`}>
                  <tool.icon className="w-7 h-7" />
                </div>

                <div className="flex gap-2">
                  <button className="text-[#9CA3AF] hover:text-[#6D5EF8] transition-colors">
                    <Star className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-[#111827] mb-2 group-hover:text-[#6D5EF8] transition-colors">
                {tool.name}
              </h3>
              <div className="flex-grow mb-6 space-y-1">
                <p className="text-[13px] font-medium text-[#4B5563]">Used {tool.used} times</p>
                <p className="text-[12px] text-[#9CA3AF]">Last used {tool.lastUsed}</p>
              </div>

              {/* Try Now Button */}
              <div className="w-full py-2.5 bg-[#F8FAFC] group-hover:bg-[#EEF2FF] text-[#6D5EF8] rounded-xl font-semibold text-[14px] flex items-center justify-center transition-colors">
                Try Now <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>

            </div>
          </Link>
        ))}
      </div>
    </DashboardLayout>
  );
}
