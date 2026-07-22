'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Zap, ChevronDown, Image as ImageIcon, PenTool, Video, Code, LayoutGrid, LogOut, Menu, X, LayoutDashboard, Settings, Home, Wrench, FolderOpen, Newspaper, Globe, CreditCard, Info, Mail, Coins, Crown } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Writing');

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

  const categoryTools: Record<string, { name: string; href: string }[]> = {
    'Writing': [
      { name: 'AI Writer', href: '/tools/ai-writer' },
      { name: 'AI Blog Ideas', href: '/tools/ai-blog-idea-generator' },
      { name: 'AI Paraphraser', href: '/tools/ai-paraphraser' },
      { name: 'AI Grammar Checker', href: '/tools/ai-grammar-checker' },
      { name: 'AI Story Generator', href: '/tools/ai-story-generator' },
      { name: 'AI Poem Generator', href: '/tools/ai-poem-generator' },
      { name: 'AI Summarizer', href: '/tools/ai-summarizer' },
      { name: 'AI eBook Writer', href: '/tools/ai-ebook-writer' },
      { name: 'AI Hook Generator', href: '/tools/ai-hook-generator' },
      { name: 'AI Article Outline', href: '/tools/ai-article-outline-generator' },
      { name: 'AI Whitepaper', href: '/tools/ai-whitepaper-outline' },
      { name: 'AI Quote Generator', href: '/tools/ai-quote-generator' },
    ],
    'Marketing': [
      { name: 'AI Ad Copy', href: '/tools/ai-ad-copy' },
      { name: 'AI Email Generator', href: '/tools/ai-email-generator' },
      { name: 'AI Cold Email', href: '/tools/ai-cold-email' },
      { name: 'AI Sales Script', href: '/tools/ai-sales-script' },
      { name: 'AI Landing Page', href: '/tools/ai-landing-page-copy' },
      { name: 'AI Hashtag Generator', href: '/tools/ai-hashtag-generator' },
      { name: 'AI Tweet Thread', href: '/tools/ai-tweet-thread' },
      { name: 'AI Caption Generator', href: '/tools/ai-caption-generator' },
      { name: 'AI PR Pitch', href: '/tools/ai-pr-pitch' },
      { name: 'AI Newsletter', href: '/tools/ai-newsletter-content' },
      { name: 'AI Press Release', href: '/tools/ai-press-release' },
      { name: 'AI Slogan Generator', href: '/tools/ai-slogan-generator' },
    ],
    'Code & Tech': [
      { name: 'AI Code Generator', href: '/tools/ai-code-generator' },
      { name: 'AI Code Explainer', href: '/tools/ai-code-explainer' },
      { name: 'AI SQL Generator', href: '/tools/ai-sql-generator' },
      { name: 'AI Git Command', href: '/tools/ai-git-command' },
      { name: 'AI Regex Generator', href: '/tools/ai-regex-generator' },
      { name: 'AI App Architecture', href: '/tools/ai-app-architecture' },
      { name: 'JSON Formatter', href: '/tools/json-formatter' },
      { name: 'CSS Box Shadow', href: '/tools/css-box-shadow-generator' },
      { name: 'Password Generator', href: '/tools/password-generator' },
      { name: 'QR Code Generator', href: '/tools/qr-code-generator' },
      { name: 'Lorem Ipsum', href: '/tools/lorem-ipsum' },
      { name: 'URL Shortener', href: '/tools/url-shortener' },
    ],
    'Business': [
      { name: 'AI Business Plan', href: '/tools/ai-business-plan' },
      { name: 'AI Pitch Deck', href: '/tools/ai-pitch-deck' },
      { name: 'AI SWOT Analysis', href: '/tools/ai-swot-analysis' },
      { name: 'AI OKR Generator', href: '/tools/ai-okr-generator' },
      { name: 'AI Startup Ideas', href: '/tools/ai-startup-ideas' },
      { name: 'AI Competitor Analysis', href: '/tools/ai-competitor-analysis' },
      { name: 'AI Risk Assessment', href: '/tools/ai-risk-assessment' },
      { name: 'AI Investor Update', href: '/tools/ai-investor-update' },
      { name: 'AI Marketing Plan', href: '/tools/ai-marketing-plan' },
      { name: 'AI Pricing Strategy', href: '/tools/ai-pricing-strategy' },
      { name: 'AI Value Proposition', href: '/tools/ai-value-proposition' },
      { name: 'AI Business Name', href: '/tools/ai-business-name-generator' },
    ],
    'Creative': [
      { name: 'AI Image Generator', href: '/tools/ai-image-generator' },
      { name: 'AI Video Generator', href: '/tools/ai-video-generator' },
      { name: 'AI Color Palette', href: '/tools/ai-color-palette' },
      { name: 'Background Remover', href: '/tools/background-remover' },
      { name: 'AI Video Script', href: '/tools/ai-video-script' },
      { name: 'AI Podcast Script', href: '/tools/ai-podcast-script' },
      { name: 'AI Storyboard', href: '/tools/ai-video-storyboard' },
      { name: 'AI YouTube Tags', href: '/tools/ai-youtube-tags' },
      { name: 'AI YouTube Title', href: '/tools/ai-youtube-title' },
      { name: 'AI Emoji Translator', href: '/tools/ai-emoji-translator' },
      { name: 'AI Brand Guidelines', href: '/tools/ai-brand-guidelines' },
      { name: 'AI Social Calendar', href: '/tools/ai-social-calendar' },
    ],
    'Career & HR': [
      { name: 'AI Resume Builder', href: '/tools/ai-resume-builder' },
      { name: 'AI Cover Letter', href: '/tools/ai-cover-letter' },
      { name: 'AI Job Description', href: '/tools/ai-job-description' },
      { name: 'AI Interview Questions', href: '/tools/ai-interview-questions' },
      { name: 'AI LinkedIn Bio', href: '/tools/ai-linkedin-bio' },
      { name: 'AI Employee Review', href: '/tools/ai-employee-review' },
      { name: 'AI Resignation Letter', href: '/tools/ai-resignation-letter' },
      { name: 'AI Onboarding Plan', href: '/tools/ai-onboarding-plan' },
      { name: 'AI Training Module', href: '/tools/ai-training-module' },
      { name: 'AI Elevator Pitch', href: '/tools/ai-elevator-pitch' },
      { name: 'AI Apology Letter', href: '/tools/ai-apology-letter' },
      { name: 'AI User Persona', href: '/tools/ai-user-persona' },
    ],
  };

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
        <div className="hidden lg:flex items-center gap-1 xl:gap-5 text-sm font-medium text-[#6B7280]">
          <Link href="/" className={`px-2 xl:px-3 py-1.5 rounded-full transition-colors ${isActive('/') ? 'bg-[#F3F4F6]' : 'hover:text-[#111827]'}`} style={isActive('/') ? { color: themeColor } : {}}>Home</Link>
          <Link href="/tools" className={`px-2 xl:px-3 py-1.5 rounded-full transition-colors ${isActive('/tools') ? 'bg-[#EEF2FF]' : 'hover:text-[#111827]'}`} style={isActive('/tools') ? { color: themeColor } : {}}>All Tools</Link>
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-[#111827] transition-colors px-2 xl:px-3 py-1.5 rounded-full hover:bg-[#F3F4F6]">
              Categories <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-2xl overflow-hidden flex" style={{ width: '620px' }}>
                {/* Left - Category Sidebar */}
                <div className="w-[180px] shrink-0 bg-[#F8F9FF] border-r border-gray-100 py-3">
                  <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest px-4 pb-3">100+ AI Tools</p>
                  {Object.keys(categoryTools).map((cat) => (
                    <button
                      key={cat}
                      onMouseEnter={() => setActiveCategory(cat)}
                      className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors flex items-center justify-between group/cat ${activeCategory === cat
                        ? 'bg-white text-[#6D5EF8] border-r-2 border-[#6D5EF8]'
                        : 'text-[#6B7280] hover:text-[#111827] hover:bg-white/70'
                        }`}
                    >
                      {cat}
                      <ChevronDown className="w-3 h-3 -rotate-90 opacity-40" />
                    </button>
                  ))}
                  <div className="mt-3 px-3 pt-3 border-t border-gray-200">
                    <Link href="/tools" className="flex items-center gap-1.5 text-xs font-semibold text-[#6D5EF8] hover:underline px-1">
                      <LayoutGrid className="w-3 h-3" /> All Tools →
                    </Link>
                  </div>
                </div>

                {/* Right - Tools Grid */}
                <div className="flex-1 p-5">
                  <p className="text-[10px] font-bold text-[#6D5EF8] uppercase tracking-wider mb-3">{activeCategory}</p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    {(categoryTools[activeCategory] || []).map(t => (
                      <Link
                        key={t.href}
                        href={t.href}
                        className="text-sm text-[#4B5563] hover:text-[#6D5EF8] hover:bg-[#F5F3FF] px-2 py-1.5 rounded-lg transition-colors truncate"
                      >
                        {t.name}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <Link href="/tools" className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-[#6D5EF8] text-white text-xs font-semibold hover:bg-[#5b4dd4] transition-colors">
                      <LayoutGrid className="w-3.5 h-3.5" /> Browse All 100+ AI Tools
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link prefetch={false} href="/blog" className={`px-2 xl:px-3 py-1.5 rounded-full transition-colors ${isActiveStartsWith('/blog') ? 'bg-[#EEF2FF]' : 'hover:text-[#111827]'}`} style={isActiveStartsWith('/blog') ? { color: themeColor } : {}}>Blogs</Link>
          <Link prefetch={false} href="/articles" className={`px-2 xl:px-3 py-1.5 rounded-full transition-colors ${isActiveStartsWith('/articles') ? 'bg-[#EEF2FF]' : 'hover:text-[#111827]'}`} style={isActiveStartsWith('/articles') ? { color: themeColor } : {}}>Articles</Link>
          <Link prefetch={false} href="/news" className={`px-2 xl:px-3 py-1.5 rounded-full transition-colors ${isActiveStartsWith('/news') ? 'bg-[#EEF2FF]' : 'hover:text-[#111827]'}`} style={isActiveStartsWith('/news') ? { color: themeColor } : {}}>News</Link>
          <Link href="/pricing" className={`px-2 xl:px-3 py-1.5 rounded-full transition-colors ${isActive('/pricing') ? 'bg-[#EEF2FF]' : 'hover:text-[#111827]'}`} style={isActive('/pricing') ? { color: themeColor } : {}}>Pricing</Link>
          {!user && (
            <>
              {/* Direct links for xl and above */}
              <div className="hidden xl:flex items-center gap-1 xl:gap-5">
                <Link href="/about" className={`px-2 xl:px-3 py-1.5 rounded-full transition-colors ${isActive('/about') ? 'bg-[#F3F4F6]' : 'hover:text-[#111827]'}`} style={isActive('/about') ? { color: themeColor } : {}}>About</Link>
                <Link href="/contact" className={`px-2 xl:px-3 py-1.5 rounded-full transition-colors ${isActive('/contact') ? 'bg-[#F3F4F6]' : 'hover:text-[#111827]'}`} style={isActive('/contact') ? { color: themeColor } : {}}>Contact</Link>
              </div>

              {/* More dropdown for lg to xl */}
              <div
                className="relative group xl:hidden"
                onMouseLeave={() => setMoreDropdownOpen(false)}
              >
                <button
                  onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                  onMouseEnter={() => setMoreDropdownOpen(true)}
                  className={`flex items-center gap-1 transition-colors px-3 py-1.5 rounded-full hover:bg-[#F3F4F6] ${(isActive('/about') || isActive('/contact') || moreDropdownOpen) ? 'text-[#111827] bg-[#F3F4F6]' : 'hover:text-[#111827]'}`}
                >
                  More <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${moreDropdownOpen ? 'rotate-180' : 'group-hover:rotate-180'}`} />
                </button>
                <div className={`absolute top-full right-0 pt-2 transition-all duration-200 z-50 ${moreDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible'}`}>
                  <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-xl py-2 w-32 flex flex-col">
                    <Link href="/about" onClick={() => setMoreDropdownOpen(false)} className={`px-4 py-2 text-sm font-medium hover:bg-[#F9FAFB] transition-colors ${isActive('/about') ? 'text-[#6D5EF8]' : 'text-[#4B5563]'}`}>About</Link>
                    <Link href="/contact" onClick={() => setMoreDropdownOpen(false)} className={`px-4 py-2 text-sm font-medium hover:bg-[#F9FAFB] transition-colors ${isActive('/contact') ? 'text-[#6D5EF8]' : 'text-[#4B5563]'}`}>Contact</Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right side - Auth + Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {loadingUser ? (
            <div className="w-8 h-8 rounded-full border-2 border-[#6D5EF8] border-t-transparent animate-spin"></div>
          ) : user ? (
            <div className="flex items-center gap-2">
              <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-[#FEF3C7] text-[#D97706] rounded-xl text-sm font-bold border border-[#FDE68A] shadow-sm mr-2">
                <Coins className="w-4 h-4" />
                {user.credits || 0}
              </div>
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
                    {user.email === 'skjainoddin39854@gmail.com' && (
                      <Link href="/admin/users" className="w-full text-left px-4 py-2 text-sm font-bold text-fuchsia-600 hover:bg-fuchsia-50 transition-colors flex items-center gap-2 mb-1">
                        <Crown className="w-4 h-4" />
                        Admin Panel
                      </Link>
                    )}
                    <div className="border-t border-[#F3F4F6]"></div>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 mt-1 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2">
                      <LogOut className="w-4 h-4" />
                      Log Out
                    </button>
                  </div>
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
        <div className="lg:hidden mobile-menu-animate bg-white border-t border-[#E5E7EB] shadow-lg max-h-[calc(100dvh-64px)] overflow-y-auto">
          <div className="px-4 py-3 flex flex-col gap-1">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-3 flex items-center gap-3 rounded-xl text-sm font-medium transition-colors ${isActive('/') ? 'text-[#4F46E5] bg-[#EEF2FF]' : 'text-[#374151] hover:bg-[#F9FAFB]'}`}>
              <Home className="w-4 h-4" /> Home
            </Link>
            <Link href="/tools" onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-3 flex items-center gap-3 rounded-xl text-sm font-medium transition-colors ${isActive('/tools') ? 'text-[#6D5EF8] bg-[#EEF2FF]' : 'text-[#374151] hover:bg-[#F9FAFB]'}`}>
              <Wrench className="w-4 h-4" /> All Tools
            </Link>

            {/* Categories Accordion */}
            <div>
              <button
                onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-[#374151] hover:bg-[#F9FAFB] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FolderOpen className="w-4 h-4" /> <span>Categories</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileCategoriesOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileCategoriesOpen && (
                <div className="ml-4 mt-1 flex flex-col gap-1 border-l-2 border-[#EEF2FF] pl-3">
                  {Object.entries(categoryTools).map(([cat, catTools]) => (
                    <div key={cat}>
                      <p className="text-[10px] font-bold text-[#6D5EF8] uppercase tracking-wider px-3 pt-2 pb-1">{cat}</p>
                      {catTools.slice(0, 4).map((t) => (
                        <Link key={t.href} href={t.href} onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center px-3 py-2 rounded-xl hover:bg-[#F9FAFB] transition-colors text-sm text-[#374151] hover:text-[#6D5EF8]">
                          {t.name}
                        </Link>
                      ))}
                    </div>
                  ))}
                  <Link href="/tools" onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2.5 mt-1 rounded-xl bg-[#6D5EF8] text-white text-sm font-semibold">
                    <LayoutGrid className="w-4 h-4" /> Browse All 100+ Tools
                  </Link>
                </div>
              )}
            </div>

            <Link prefetch={false} href="/blog" onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-3 flex items-center gap-3 rounded-xl text-sm font-medium transition-colors ${isActiveStartsWith('/blog') ? 'text-[#6D5EF8] bg-[#EEF2FF]' : 'text-[#374151] hover:bg-[#F9FAFB]'}`}>
              <PenTool className="w-4 h-4" /> Blog
            </Link>
            <Link prefetch={false} href="/articles" onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-3 flex items-center gap-3 rounded-xl text-sm font-medium transition-colors ${isActiveStartsWith('/articles') ? 'text-[#6D5EF8] bg-[#EEF2FF]' : 'text-[#374151] hover:bg-[#F9FAFB]'}`}>
              <Newspaper className="w-4 h-4" /> Articles
            </Link>
            <Link prefetch={false} href="/news" onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-3 flex items-center gap-3 rounded-xl text-sm font-medium transition-colors ${isActiveStartsWith('/news') ? 'text-[#6D5EF8] bg-[#EEF2FF]' : 'text-[#374151] hover:bg-[#F9FAFB]'}`}>
              <Globe className="w-4 h-4" /> News
            </Link>
            <Link href="/pricing" onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-3 flex items-center gap-3 rounded-xl text-sm font-medium transition-colors ${isActive('/pricing') ? 'text-[#6D5EF8] bg-[#EEF2FF]' : 'text-[#374151] hover:bg-[#F9FAFB]'}`}>
              <CreditCard className="w-4 h-4" /> Pricing
            </Link>
            {!user && (
              <>
                <Link href="/about" onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 flex items-center gap-3 rounded-xl text-sm font-medium transition-colors ${isActive('/about') ? 'text-[#4F46E5] bg-[#EEF2FF]' : 'text-[#374151] hover:bg-[#F9FAFB]'}`}>
                  <Info className="w-4 h-4" /> About
                </Link>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 flex items-center gap-3 rounded-xl text-sm font-medium transition-colors ${isActive('/contact') ? 'text-[#4F46E5] bg-[#EEF2FF]' : 'text-[#374151] hover:bg-[#F9FAFB]'}`}>
                  <Mail className="w-4 h-4" /> Contact
                </Link>
              </>
            )}

            {/* Mobile Auth Section */}
            <div className="border-t border-[#F3F4F6] mt-2 pt-3">
              {user ? (
                <div className="flex flex-col gap-2">

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
                    {user.email === 'skjainoddin39854@gmail.com' && (
                      <Link href="/admin/users" onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-fuchsia-600 hover:bg-fuchsia-50 transition-colors">
                        <Crown className="w-4 h-4" />
                        Admin Panel
                      </Link>
                    )}
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
