'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { trackSearch } from '@/lib/analytics';

export default function HomeSearch() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      trackSearch(query.trim(), 'home');
      router.push(`/tools?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push('/tools');
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative flex items-center mb-6 group">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search tools (e.g., image generator, background remover...)" 
        className="relative w-full pl-6 pr-14 py-4 rounded-xl border border-white/10 bg-[#111827]/60 backdrop-blur-md shadow-inner shadow-black/20 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 outline-none text-white placeholder-gray-400 text-sm sm:text-base transition-all hover:bg-[#111827]/80"
      />
      <button type="submit" className="absolute right-2 p-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white rounded-lg transition-all shadow-lg shadow-indigo-500/25 transform hover:scale-105 active:scale-95 z-10">
        <Search className="w-5 h-5" />
      </button>
    </form>
  );
}
