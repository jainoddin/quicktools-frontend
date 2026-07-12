'use client';
import React from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { 
  Star, ArrowRight, ChevronDown
} from 'lucide-react';
import Link from 'next/link';
import { allTools, IconMap } from '../../../components/tools/ToolsClient';

function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const Icon = IconMap[name];
  if (!Icon) return null;
  return <Icon className={className} />;
}

export default function AllToolsPage() {
  const filters = ['All', 'Popular', 'New', 'Free', 'Premium'];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#111827] mb-2 tracking-tight">All AI Tools</h1>
        <p className="text-[#6B7280] text-lg">{allTools.length} AI-powered tools to boost your productivity ✨</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
          {filters.map((filter, i) => (
            <button 
              key={filter} 
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors shadow-sm ${i === 0 ? 'bg-[#6D5EF8] text-white shadow-md shadow-[#6D5EF8]/20' : 'bg-white border border-[#E5E7EB] text-[#4B5563] hover:bg-[#F9FAFB]'}`}
            >
              {filter}
            </button>
          ))}
        </div>

        <button className="flex items-center gap-2 text-sm font-medium text-[#4B5563] bg-white border border-[#E5E7EB] px-4 py-2 rounded-xl hover:bg-[#F9FAFB] transition-colors shrink-0 shadow-sm">
          Sort by: Popular <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {allTools.map((tool, index) => (
          <Link href={tool.slug} key={index} className="group">
            <div className="bg-white p-5 rounded-2xl border border-[#E5E7EB] hover:border-[#6D5EF8] hover:shadow-xl hover:shadow-[#6D5EF8]/10 transition-all duration-300 relative h-full flex flex-col">

              {/* Top Row: Icon and Tag */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner ${tool.color}`}>
                  <DynamicIcon name={tool.iconName} className="w-7 h-7" />
                </div>

                <div className="flex gap-2 items-center">
                  {tool.tag && (
                    <div className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold ${tool.tag.type === 'popular' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-600'}`}>
                      <DynamicIcon name={tool.tag.iconName} className="w-3 h-3" />
                      {tool.tag.label}
                    </div>
                  )}
                  <button className="text-[#9CA3AF] hover:text-[#6D5EF8] transition-colors">
                    <Star className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-[#111827] mb-2 group-hover:text-[#6D5EF8] transition-colors">
                {tool.name}
              </h3>
              <p className="text-[#6B7280] text-sm leading-relaxed mb-6 flex-grow">
                {tool.description}
              </p>

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
