'use client';
import React from 'react';
import { Search, Gift, Bell, ChevronDown, ZapIcon, Coins } from 'lucide-react';
import { getEndpoint } from '../../lib/api';
import Link from 'next/link';

export default function DashboardHeader({ user, onMenuClick }: { user: any, onMenuClick?: () => void }) {
  const handleLogout = async () => {
    try {
      await fetch(getEndpoint('/api/auth/logout'), {
        method: 'POST',
        credentials: 'include',
      });
      window.location.reload();
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <header className="h-16 border-b border-[#E5E7EB] bg-white z-40">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">

        {/* Left: Logo & Mobile Menu */}
        <div className="flex items-center gap-3 w-auto lg:w-[240px] shrink-0">
          <button onClick={onMenuClick} className="lg:hidden p-1.5 -ml-1.5 text-[#6B7280] hover:bg-[#F3F4F6] rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#6D5EF8] rounded-lg flex items-center justify-center shrink-0">
              <ZapIcon className="w-5 h-5 text-white fill-white" />
            </div>
            <Link href="/dashboard" className="text-lg md:text-xl font-bold text-[#111827] hidden sm:block">QuickTools</Link>
          </div>
        </div>

        {/* Center: Search */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const q = new FormData(e.currentTarget).get('q');
            if (q) window.location.href = `/dashboard/all?q=${encodeURIComponent(q.toString())}`;
          }}
          className="flex-1 max-w-md relative hidden md:block"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
          <input
            type="text"
            name="q"
            placeholder="Search tools..."
            className="w-full h-9 pl-9 pr-10 bg-[#F9FAFB] border-none rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#6D5EF8]/20 transition-all placeholder:text-[#9CA3AF] text-[#111827]"
          />
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-[#9CA3AF] hover:text-[#6D5EF8] transition-colors rounded-md hover:bg-indigo-50">
            <Search className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Right: Actions & Profile */}
        <div className="flex items-center gap-4 md:gap-6 ml-auto">
          {user && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FEF3C7] text-[#D97706] rounded-xl text-sm font-bold border border-[#FDE68A] shadow-sm">
              <Coins className="w-4 h-4" />
              {user.credits || 0}
            </div>
          )}
          <div className="h-6 w-[1px] bg-[#E5E7EB] mx-1 hidden sm:block"></div>

          <div className="relative group cursor-pointer">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#6D5EF8] to-purple-400 p-[2px]">
                <div className="w-full h-full rounded-full border-2 border-white overflow-hidden bg-white flex items-center justify-center">
                  {user?.avatar ? (
                    <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[#6D5EF8] font-bold text-xs">{user?.name?.charAt(0) || 'U'}</span>
                  )}
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-sm font-semibold text-[#111827]">{user?.name?.split(' ')[0] || 'User'}</span>
                <ChevronDown className="w-4 h-4 text-[#6B7280]" />
              </div>
            </div>

            {/* Dropdown */}
            <div className="absolute top-full right-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-xl py-2 w-48 overflow-hidden">
                <div className="px-4 py-2 border-b border-[#F3F4F6] mb-1">
                  <p className="text-sm font-bold text-[#111827] truncate">{user?.name || 'User'}</p>
                  <p className="text-xs text-[#6B7280] truncate">{user?.email || 'user@example.com'}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
