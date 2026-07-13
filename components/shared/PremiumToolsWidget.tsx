'use client';
import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { Sparkles, ArrowRight, Image as ImageIcon, FileText, Code2, Video, LayoutGrid } from 'lucide-react';

export default function PremiumToolsWidget() {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading || !isAuthenticated) {
    return null;
  }
  
  return (
    <div className="bg-gradient-to-br from-[#111827] to-[#1F2937] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden border border-gray-800">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#6D5EF8] opacity-20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      
      <div className="flex items-center gap-2 mb-3 relative z-10">
        <Sparkles className="w-5 h-5 text-[#A78BFA]" />
        <h3 className="font-bold text-lg text-white">Generate with AI</h3>
      </div>
      
      <p className="text-sm text-gray-300 mb-6 relative z-10 leading-relaxed">
        You have full access to our premium suite. Turn your ideas into reality instantly.
      </p>

      <div className="space-y-3 relative z-10 mb-6">
        <Link href="/tools/ai-image-generator" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group">
          <div className="w-8 h-8 rounded-lg bg-[#6D5EF8]/20 text-[#A78BFA] flex items-center justify-center shrink-0">
            <ImageIcon className="w-4 h-4" />
          </div>
          <span className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors flex-1">Image Generator</span>
          <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
        </Link>

        <Link href="/tools/ai-writer" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group">
          <div className="w-8 h-8 rounded-lg bg-[#10B981]/20 text-[#34D399] flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <span className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors flex-1">AI Writer</span>
          <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
        </Link>
      </div>

      <Link 
        href="/tools" 
        className="relative z-10 w-full flex items-center justify-center gap-2 bg-white text-[#111827] font-bold text-sm px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors shadow-sm"
      >
        <LayoutGrid className="w-4 h-4" />
        View All Tools
      </Link>
    </div>
  );
}
