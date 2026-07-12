'use client';
import React from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { 
  MessageSquare, Image as ImageIcon, FileText, PenTool, Code, 
  Mic, Video, Search, Zap, Share2, Palette, MoreHorizontal
} from 'lucide-react';
import Link from 'next/link';

const categories = [
  { name: 'AI Chat', tools: 12, icon: MessageSquare, color: 'bg-[#10B981] text-white' },
  { name: 'Image Tools', tools: 18, icon: ImageIcon, color: 'bg-[#6D5EF8] text-white' },
  { name: 'PDF Tools', tools: 15, icon: FileText, color: 'bg-[#EF4444] text-white' },
  { name: 'Writing Tools', tools: 14, icon: PenTool, color: 'bg-[#F59E0B] text-white' },
  { name: 'Code Tools', tools: 10, icon: Code, color: 'bg-[#8B5CF6] text-white' },
  { name: 'Audio Tools', tools: 8, icon: Mic, color: 'bg-[#F59E0B] text-white' },
  { name: 'Video Tools', tools: 9, icon: Video, color: 'bg-[#6D5EF8] text-white' },
  { name: 'SEO Tools', tools: 7, icon: Search, color: 'bg-[#3B82F6] text-white' },
  { name: 'Productivity', tools: 6, icon: Zap, color: 'bg-[#10B981] text-white' },
  { name: 'Social Media', tools: 6, icon: Share2, color: 'bg-[#F59E0B] text-white' },
  { name: 'Design Tools', tools: 11, icon: Palette, color: 'bg-[#EF4444] text-white' },
  { name: 'Other Tools', tools: 5, icon: MoreHorizontal, color: 'bg-[#8B5CF6] text-white' },
];

export default function CategoriesPage() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#111827] mb-1">Categories</h1>
        <p className="text-sm text-[#6B7280]">Browse tools by category</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
        {categories.map((cat, i) => (
          <Link href={`/dashboard/categories/${cat.name.toLowerCase().replace(' ', '-')}`} key={i} className="bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:border-[#6D5EF8] hover:shadow-xl hover:shadow-[#6D5EF8]/10 transition-all duration-300 group flex flex-col items-start text-left min-h-[160px] justify-center">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${cat.color} mb-4 group-hover:scale-110 transition-transform shadow-md`}>
              <cat.icon className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-[#111827] mb-1 group-hover:text-[#6D5EF8] transition-colors">{cat.name}</h3>
            <p className="text-xs font-medium text-[#6B7280]">{cat.tools} Tools</p>
          </Link>
        ))}
      </div>
    </DashboardLayout>
  );
}
