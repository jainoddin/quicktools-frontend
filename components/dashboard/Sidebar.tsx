'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutGrid, Shapes, FolderDot, Heart, Clock,
  CreditCard, Settings, Key, Zap, Sun, ZapIcon, Crown, ChevronRight, ShieldCheck
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', icon: LayoutGrid, path: '/dashboard' },
];

import { useAuth } from '../../contexts/AuthContext';
import { allTools } from '../tools/ToolsClient';

const accountItems = [
  { name: 'Billing', icon: CreditCard, path: '/dashboard/billing' },
  { name: 'History', icon: Clock, path: '/dashboard/history' },
  { name: 'Settings', icon: Settings, path: '/dashboard/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const uniqueCategories = new Set(allTools.map(t => t.category)).size;
  const favoritesCount = user?.savedTools?.length || 0;

  const generalItems = [
    { name: 'All Tools', icon: LayoutGrid, path: '/dashboard/all', count: allTools.length },
    // { name: 'Categories', icon: Shapes, path: '/dashboard/categories', count: uniqueCategories },
    // { name: 'My Tools', icon: FolderDot, path: '/dashboard/my-tools', count: 0 },
    { name: 'Favorites', icon: Heart, path: '/dashboard/favorites', count: favoritesCount },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(path);
  };

  return (
    <aside className="w-[260px] bg-transparent flex flex-col shrink-0 h-full">
      <div className="flex-1 overflow-y-auto overflow-x-hidden pr-3 pt-6 pb-6 space-y-6">

        {/* Dashboard Link */}
        <div>
          {navItems.map((item, i) => {
            const active = isActive(item.path);
            return (
              <Link key={i} href={item.path} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all ${active ? 'bg-[#EEF2FF] text-[#6D5EF8] font-semibold' : 'text-[#4B5563] hover:bg-white hover:text-[#111827]'}`}>
                <item.icon className={`w-5 h-5 ${active ? 'text-[#6D5EF8]' : 'text-[#6B7280]'}`} />
                <span className="text-[15px]">{item.name}</span>
              </Link>
            );
          })}
          
          {user?.email === 'skjainoddin39854@gmail.com' && (
            <Link href="/admin/users" className={`flex items-center gap-3 px-3 py-2.5 mt-1 rounded-xl font-medium transition-all ${pathname.startsWith('/admin') ? 'bg-fuchsia-50 text-fuchsia-700 font-semibold' : 'text-fuchsia-600 hover:bg-fuchsia-50 hover:text-fuchsia-800'}`}>
              <ShieldCheck className={`w-5 h-5 ${pathname.startsWith('/admin') ? 'text-fuchsia-700' : 'text-fuchsia-600'}`} />
              <span className="text-[15px]">Super Admin</span>
            </Link>
          )}
        </div>

        {/* Categories Section */}
        <div>
          <h3 className="font-bold text-[#111827] mb-3 px-3">Categories</h3>
          <div className="space-y-1">
            {generalItems.map((item, i) => {
              const active = isActive(item.path);
              return (
                <Link key={i} href={item.path} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${active ? 'bg-[#EEF2FF] text-[#6D5EF8] font-semibold' : 'text-[#4B5563] hover:bg-white hover:text-[#111827] font-medium'}`}>
                  <div className="flex items-center gap-3">
                    <item.icon className={`w-5 h-5 ${active ? 'text-[#6D5EF8]' : 'text-[#6B7280]'}`} />
                    <span className="text-[15px]">{item.name}</span>
                  </div>
                  {item.count !== undefined && (
                    <span className={`text-xs ${active ? 'text-[#6D5EF8] bg-white px-1.5 py-0.5 rounded-md shadow-sm' : 'text-[#9CA3AF]'}`}>
                      {item.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Account Section */}
        <div>
          <h3 className="font-bold text-[#111827] mb-3 px-3">Account</h3>
          <div className="space-y-1">
            {accountItems.map((item, i) => {
              const active = isActive(item.path);
              return (
                <Link key={i} href={item.path} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all ${active ? 'bg-[#EEF2FF] text-[#6D5EF8] font-semibold' : 'text-[#4B5563] hover:bg-white hover:text-[#111827]'}`}>
                  <item.icon className={`w-5 h-5 ${active ? 'text-[#6D5EF8]' : 'text-[#6B7280]'}`} />
                  <span className="text-[15px]">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Upgrade Card - exactly like tools page */}
        {(!user || (user.plan || '').toLowerCase() !== 'pro' && (user.plan || '').toLowerCase() !== 'premium') ? (
          <div className="bg-gradient-to-br from-white to-[#EEF2FF] border border-[#E5E7EB] rounded-2xl p-5 shadow-sm relative overflow-hidden">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#6D5EF8]/5 rounded-full blur-xl"></div>
            <div className="w-10 h-10 bg-[#EEF2FF] rounded-xl flex items-center justify-center mb-4 text-[#6D5EF8]">
              <Crown className="w-5 h-5 fill-[#6D5EF8]" />
            </div>
            <h4 className="font-bold text-[#111827] mb-1">Unlock Premium</h4>
            <p className="text-sm text-[#6B7280] mb-5 leading-relaxed">
              Get unlimited access to all tools and premium features.
            </p>
            <Link href="/dashboard/billing/plans" className="w-full bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white font-semibold text-sm py-2.5 rounded-xl transition-colors shadow-md shadow-[#6D5EF8]/20 flex items-center justify-center gap-2">
              Upgrade Now <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-white to-[#FFFBEB] border border-[#F59E0B]/20 rounded-2xl p-5 shadow-sm relative overflow-hidden">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#F59E0B]/10 rounded-full blur-xl"></div>
            <div className="w-10 h-10 bg-[#FFFBEB] rounded-xl flex items-center justify-center mb-4 text-[#F59E0B]">
              <Crown className="w-5 h-5 fill-[#F59E0B]" />
            </div>
            <h4 className="font-bold text-[#111827] mb-1">Pro Member</h4>
            <p className="text-sm text-[#6B7280] mb-5 leading-relaxed">
              You have access to all premium features and HD tools.
            </p>
            <Link href="/dashboard/billing" className="w-full bg-[#111827] hover:bg-black text-white font-semibold text-sm py-2.5 rounded-xl transition-colors shadow-md shadow-gray-900/20 flex items-center justify-center gap-2">
              Manage Plan <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        )}



      </div>
    </aside>
  );
}
