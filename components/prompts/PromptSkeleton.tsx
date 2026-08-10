import React from 'react';

export default function PromptSkeleton() {
  return (
    <div className="bg-[#111827] rounded-3xl p-5 border border-white/10 flex flex-col h-full animate-pulse">
      
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-white/5 shrink-0"></div>
        <div className="flex-1 space-y-2 py-1">
          <div className="h-4 bg-white/10 rounded w-3/4"></div>
          <div className="h-3 bg-white/5 rounded w-full"></div>
          <div className="h-3 bg-white/5 rounded w-5/6"></div>
        </div>
      </div>

      {/* Badges */}
      <div className="flex gap-2 mb-6">
        <div className="h-5 bg-white/10 rounded w-16"></div>
        <div className="h-5 bg-indigo-500/20 rounded w-20"></div>
      </div>

      <div className="flex-grow"></div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div className="flex gap-4">
          <div className="h-4 bg-white/5 rounded w-10"></div>
          <div className="h-4 bg-white/5 rounded w-10"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-8 w-8 bg-white/5 rounded-lg"></div>
          <div className="h-8 w-8 bg-indigo-500/20 rounded-lg"></div>
        </div>
      </div>
      
    </div>
  );
}
