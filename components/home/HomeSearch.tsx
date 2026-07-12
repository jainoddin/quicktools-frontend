'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HomeSearch() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/tools?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push('/tools');
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative flex items-center mb-6">
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search tools (e.g., image generator, background remover...)" 
        className="w-full pl-5 pr-14 py-4 rounded-xl border border-[#E5E7EB] shadow-sm focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] outline-none text-sm sm:text-base transition-all bg-white"
      />
      <button type="submit" className="absolute right-2 p-2.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-lg transition-colors">
        <Search className="w-5 h-5" />
      </button>
    </form>
  );
}
