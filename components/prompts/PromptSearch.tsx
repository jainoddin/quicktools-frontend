"use client";

import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PromptSearch() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/prompts?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative flex items-center w-full group">
      <div className="absolute left-4 text-gray-400 group-focus-within:text-indigo-400 transition-colors z-10">
        <Search className="w-5 h-5" />
      </div>
      
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search any prompt... (e.g., Business Plan, SEO Article)"
        className="w-full h-14 pl-12 pr-32 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:bg-[#111827]/80 backdrop-blur-md transition-all text-sm sm:text-base shadow-inner"
      />
      
      <button 
        type="submit"
        className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-gradient-to-r from-[#6D5EF8] to-[#3B82F6] hover:from-[#5B4DF5] hover:to-[#2563EB] text-white rounded-xl font-bold flex items-center justify-center transition-all shadow-md z-10"
      >
        <span className="hidden sm:inline mr-1 text-sm">Search</span>
        <ArrowRight className="w-4 h-4 sm:hidden" />
      </button>

      {/* Basic Client-side suggestions could go here in a dropdown */}
    </form>
  );
}
