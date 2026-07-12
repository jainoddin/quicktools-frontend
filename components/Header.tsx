'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Zap, ChevronDown, Image as ImageIcon, PenTool, Video, Code, LayoutGrid, LogOut, Menu, X, LayoutDashboard, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);

  const themeColor = pathname.startsWith('/tools') ? '#6D5EF8' : '#4F46E5';
  const isActive = (path: string) => pathname === path;
  const isActiveStartsWith = (path: string) => pathname.startsWith(path);

  const { user, isLoading: loadingUser, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setMobileMenuOpen(false);
  };

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Hide header on login, signup, and dashboard pages
  if (pathname === '/login' || pathname === '/signup' || pathname.startsWith('/dashboard')) return null;

  const tools = [
    { name: 'AI Image Generator', href: '/tools/ai-image-generator', icon: ImageIcon, color: 'bg-[#6D5EF8] text-white' },
    { name: 'AI Writer', href: '/tools/ai-writer', icon: PenTool, color: 'bg-[#F43F5E] text-white' },
    { name: 'AI Video Generator', href: '/tools/ai-video-generator', icon: Video, color: 'bg-[#8B5CF6] text-white' },
    { name: 'AI Code Generator', href: '/tools/ai-code-generator', icon: Code, color: 'bg-[#0EA5E9] text-white' },
    { name: 'Background Remover', href: '/tools/background-remover', icon: LayoutGrid, color: 'bg-[#10B981] text-white' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E5E7EB]">
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes textSlideIn {
          0% { opacity: 0; transform: translateX(20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes lightSweep {
          0% { left: -100%; opacity: 0; }
          30% { opacity: 1; }
          70% { opacity: 1; }
          100% { left: 150%; opacity: 0; }
        }
        @keyframes slideDown {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-reveal-text {
          opacity: 0;
          animation: textSlideIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.3s;
        }
        .sweep-mask {
          position: relative;
          overflow: hidden;
          display: inline-block;
        }
        .sweep-mask::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 25px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent);
          transform: skewX(-20deg);
          animation: lightSweep 4s cubic-bezier(0.16, 1, 0.3, 1) infinite 2s;
          pointer-events: none;
        }
        .mobile-menu-animate {
          animation: slideDown 0.25s ease forwards;
        }
      `}} />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1">
            <div className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-80 transition-opacity duration-500 animate-pulse" style={{ backgroundColor: themeColor }}></div>
            <Zap className="w-7 h-7 relative z-10 group-hover:scale-125 group-hover:rotate-[20deg] group-hover:text-fuchsia-500 group-hover:fill-fuchsia-500 transition-all duration-300" style={{ color: themeColor, fill: themeColor }} />
          </div>
          <span className="text-2xl font-black tracking-tighter animate-reveal-text sweep-mask px-1">
            <span className="text-[#111827] transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:to-fuchsia-500" style={{ '--tw-gradient-from': themeColor } as any}>QuickTools</span>
            <span className="transition-colors duration-300 group-hover:text-fuchsia-500" style={{ color: themeColor }}>.ai</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#6B7280]">
          <Link href="/" className={`px-3 py-1.5 rounded-full transition-colors ${isActive('/') ? 'bg-[#F3F4F6]' : 'hover:text-[#111827]'}`} style={isActive('/') ? { color: themeColor } : {}}>Home</Link>
          <Link href="/tools" className={`px-3 py-1.5 rounded-full transition-colors ${isActive('/tools') ? 'bg-[#EEF2FF]' : 'hover:text-[#111827]'}`} style={isActive('/tools') ? { color: themeColor } : {}}>All Tools</Link>
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-[#111827] transition-colors px-3 py-1.5 rounded-full hover:bg-[#F3F4F6]">
              Categories <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-xl p-2 w-[240px]">
                <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest px-3 pt-2 pb-1">AI Tools</p>
                {tools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link key={tool.name} href={tool.href} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F9FAFB] transition-colors group/item">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${tool.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-[#374151] group-hover/item:text-[#111827]">{tool.name}</span>
                    </Link>
                  );
                })}
                <div className="border-t border-[#F3F4F6] mt-1 pt-1">
                  <Link href="/tools" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#EEF2FF] transition-colors group/item">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-[#EEF2FF]">
                      <LayoutGrid className="w-4 h-4 text-[#6D5EF8]" />
                    </div>
                    <span className="text-sm font-semibold text-[#6D5EF8]">View All Tools →</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <Link href="/blog" className={`px-3 py-1.5 rounded-full transition-colors ${isActiveStartsWith('/blog') ? 'bg-[#EEF2FF]' : 'hover:text-[#111827]'}`} style={isActiveStartsWith('/blog') ? { color: themeColor } : {}}>Blog</Link>
          <Link href="/pricing" className={`px-3 py-1.5 rounded-full transition-colors ${isActive('/pricing') ? 'bg-[#EEF2FF]' : 'hover:text-[#111827]'}`} style={isActive('/pricing') ? { color: themeColor } : {}}>Pricing</Link>
          {!user && (
            <>
              <Link href="/about" className={`px-3 py-1.5 rounded-full transition-colors ${isActive('/about') ? 'bg-[#F3F4F6]' : 'hover:text-[#111827]'}`} style={isActive('/about') ? { color: themeColor } : {}}>About</Link>
              <Link href="/contact" className={`px-3 py-1.5 rounded-full transition-colors ${isActive('/contact') ? 'bg-[#F3F4F6]' : 'hover:text-[#111827]'}`} style={isActive('/contact') ? { color: themeColor } : {}}>Contact</Link>
            </>
          )}
        </div>

        {/* Right side - Auth + Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {loadingUser ? (
            <div className="w-8 h-8 rounded-full border-2 border-[#6D5EF8] border-t-transparent animate-spin"></div>
          ) : user ? (
            <div className="relative group hidden lg:block">
              <button className="flex items-center gap-2 focus:outline-none">
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-[#6D5EF8] text-white flex items-center justify-center font-bold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <span className="text-sm font-semibold text-[#111827]">{user.name.split(' ')[0]}</span>
                <ChevronDown className="w-4 h-4 text-[#6B7280] group-hover:rotate-180 transition-transform duration-200 shrink-0" />
              </button>
              <div className="absolute top-full right-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-xl py-2 w-48 overflow-hidden">
                  <div className="px-4 py-2 border-b border-[#F3F4F6] mb-1">
                    <p className="text-sm font-bold text-[#111827] truncate">{user.name}</p>
                    <p className="text-xs text-[#6B7280] truncate">{user.email}</p>
                  </div>
                  <Link href="/dashboard" className="w-full text-left px-4 py-2 text-sm font-medium text-[#4B5563] hover:bg-[#F9FAFB] hover:text-[#111827] transition-colors flex items-center gap-2">
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <Link href="/dashboard/settings" className="w-full text-left px-4 py-2 text-sm font-medium text-[#4B5563] hover:bg-[#F9FAFB] hover:text-[#111827] transition-colors flex items-center gap-2 mb-1">
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                  <div className="border-t border-[#F3F4F6]"></div>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 mt-1 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2">
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-2">
              <Link href="/login" className="text-sm font-semibold text-[#111827] hover:text-[#4F46E5] transition-colors px-4 py-2">Login</Link>
              <Link href="/signup" className="text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all shadow-sm hover:shadow-md" style={{ backgroundColor: themeColor }}>Sign Up</Link>
            </div>
          )}


          {/* Hamburger Button - only mobile */}
          <button
            id="mobile-menu-toggle"
            className="lg:hidden p-2 rounded-xl hover:bg-[#F3F4F6] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen
              ? <X className="w-6 h-6 text-[#111827]" />
              : <Menu className="w-6 h-6 text-[#111827]" />
            }
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden mobile-menu-animate bg-white border-t border-[#E5E7EB] shadow-lg">
          <div className="px-4 py-3 flex flex-col gap-1">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive('/') ? 'text-[#4F46E5] bg-[#EEF2FF]' : 'text-[#374151] hover:bg-[#F9FAFB]'}`}>
              🏠 Home
            </Link>
            <Link href="/tools" onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive('/tools') ? 'text-[#6D5EF8] bg-[#EEF2FF]' : 'text-[#374151] hover:bg-[#F9FAFB]'}`}>
              🛠️ All Tools
            </Link>

            {/* Categories Accordion */}
            <div>
              <button
                onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-[#374151] hover:bg-[#F9FAFB] transition-colors"
              >
                <span>📂 Categories</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileCategoriesOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileCategoriesOpen && (
                <div className="ml-4 mt-1 flex flex-col gap-1 border-l-2 border-[#EEF2FF] pl-3">
                  {tools.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <Link key={tool.name} href={tool.href} onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F9FAFB] transition-colors">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${tool.color}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-sm text-[#374151]">{tool.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <Link href="/blog" onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActiveStartsWith('/blog') ? 'text-[#6D5EF8] bg-[#EEF2FF]' : 'text-[#374151] hover:bg-[#F9FAFB]'}`}>
              📝 Blog
            </Link>
            <Link href="/pricing" onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive('/pricing') ? 'text-[#6D5EF8] bg-[#EEF2FF]' : 'text-[#374151] hover:bg-[#F9FAFB]'}`}>
              💰 Pricing
            </Link>
            {!user && (
              <>
                <Link href="/about" onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive('/about') ? 'text-[#4F46E5] bg-[#EEF2FF]' : 'text-[#374151] hover:bg-[#F9FAFB]'}`}>
                  ℹ️ About
                </Link>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive('/contact') ? 'text-[#4F46E5] bg-[#EEF2FF]' : 'text-[#374151] hover:bg-[#F9FAFB]'}`}>
                  📬 Contact
                </Link>
              </>
            )}

            {/* Mobile Auth Section */}
            <div className="border-t border-[#F3F4F6] mt-2 pt-3">
              {user ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 px-4 py-2">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#E5E7EB] shrink-0">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-[#6D5EF8] text-white flex items-center justify-center font-bold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#111827]">{user.name}</p>
                      <p className="text-xs text-[#6B7280]">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 mt-1">
                    <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-[#374151] hover:bg-[#F9FAFB] transition-colors">
                      <LayoutDashboard className="w-4 h-4 text-[#6B7280]" />
                      Dashboard
                    </Link>
                    <Link href="/dashboard/settings" onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-[#374151] hover:bg-[#F9FAFB] transition-colors">
                      <Settings className="w-4 h-4 text-[#6B7280]" />
                      Settings
                    </Link>
                    <button onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors mt-2 border-t border-[#F3F4F6]">
                      <LogOut className="w-4 h-4" />
                      Log Out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2 px-1">
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}
                    className="text-center text-sm font-semibold text-[#374151] border border-[#E5E7EB] px-4 py-2.5 rounded-xl hover:bg-[#F9FAFB] transition-colors">
                    Login
                  </Link>
                  <Link href="/signup" onClick={() => setMobileMenuOpen(false)}
                    className="text-center text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md"
                    style={{ backgroundColor: themeColor }}>
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
