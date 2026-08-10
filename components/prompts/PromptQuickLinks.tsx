'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, Flame, Sparkles, Folder, Users, Bookmark } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function PromptQuickLinks() {
  const { user } = useAuth();
  const links = [
    { name: 'New Prompts', icon: Zap, href: '/prompts#newest', desc: 'Latest additions', color: 'text-blue-500' },
    { name: 'Trending Now', icon: Flame, href: '/prompts#trending', desc: 'Most popular', color: 'text-orange-500' },
    { name: 'Prompt Generator', icon: Sparkles, href: '/prompts/generator', desc: 'Create your own', color: 'text-indigo-500' },
    { name: 'Collections', icon: Folder, href: '/prompts#collections', desc: 'Curated lists', color: 'text-amber-500' },
    { name: 'Community', icon: Users, href: '/community', desc: 'Ask & share', color: 'text-purple-500' },
  ];

  if (user) {
    links.push({ name: 'Saved Prompts', icon: Bookmark, href: '/prompts#saved', desc: 'Your saved library', color: 'text-emerald-500' });
  }

  return (
    <section className="w-full bg-[#F8FAFC]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center overflow-x-auto pb-4 sm:pb-0 scrollbar-hide gap-4">
          {links.map((link, i) => (
            <Link 
              key={i} 
              href={link.href}
              className="flex items-center gap-3 shrink-0 py-2 hover:bg-white/50 px-3 rounded-xl transition-colors group"
            >
              <div className={`w-10 h-10 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform ${link.color}`}>
                <link.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900 whitespace-nowrap">{link.name}</div>
                <div className="text-xs text-gray-500 whitespace-nowrap">{link.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
