import React from 'react';
import Link from 'next/link';
import { SearchX, ArrowRight } from 'lucide-react';

interface PromptEmptyStateProps {
  title?: string;
  desc?: string;
  actionText?: string;
  actionLink?: string;
}

export default function PromptEmptyState({ 
  title = "No prompts found", 
  desc = "We couldn't find any prompts matching your criteria.", 
  actionText = "Explore All Prompts",
  actionLink = "/prompts"
}: PromptEmptyStateProps) {
  return (
    <div className="w-full rounded-3xl border border-dashed border-white/20 bg-white/[0.02] p-12 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 text-gray-500">
         <SearchX className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 mb-8 max-w-sm">{desc}</p>
      
      <div className="flex gap-4">
        {actionLink && (
          <Link href={actionLink} className="bg-white/10 hover:bg-white/15 text-white border border-white/10 px-6 py-2.5 rounded-xl font-bold transition-colors text-sm">
             {actionText}
          </Link>
        )}
        <Link href="/community" className="bg-gradient-to-r from-[#6D5EF8] to-[#3B82F6] hover:from-[#5B4DF5] hover:to-[#2563EB] text-white px-6 py-2.5 rounded-xl font-bold shadow-lg transition-colors text-sm flex items-center gap-2">
           Ask Community
        </Link>
      </div>
    </div>
  );
}
