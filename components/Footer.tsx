'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Zap, Globe, MessageCircle, Share2, Mail } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { getEndpoint } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import NewsletterForm from './shared/NewsletterForm';

export default function Footer() {
  const pathname = usePathname();
  const themeColor = pathname.startsWith('/tools') ? '#6D5EF8' : '#4F46E5';

  const { isAuthenticated, isLoading } = useAuth();

  // Hide footer on login, signup, and dashboard (dashboard has its own layout)
  if (pathname === '/login' || pathname === '/signup' || pathname.startsWith('/dashboard')) return null;

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'QuickTools.ai',
          text: 'Check out QuickTools.ai - The Ultimate AI Toolkit!',
          url: window.location.origin
        });
      } else {
        await navigator.clipboard.writeText(window.location.origin);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  return (
    <footer className="bg-white border-t border-[#E5E7EB] w-full mt-auto">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {!isAuthenticated ?
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 pb-12 pt-8 mt-8">
            <div className="col-span-2 md:col-span-2">
              <div className="flex items-center gap-2 mb-4 group cursor-pointer">
                <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1">
                  <Zap className="w-6 h-6" style={{ color: themeColor, fill: themeColor }} />
                </div>
                <span className="text-xl font-black tracking-tighter text-[#111827]">QuickTools<span style={{ color: themeColor }}>.ai</span></span>
              </div>
              <p className="text-sm text-[#6B7280] mb-6 pr-4">All AI tools you need in one place. Save time, work smarter, and achieve more with AI.</p>
              <div className="flex items-center gap-4 text-gray-400">
                <Link href="/" aria-label="Website">
                  <Globe className="w-5 h-5 cursor-pointer transition-colors" style={{ ':hover': { color: themeColor } } as any} />
                </Link>
                <button onClick={handleShare} aria-label="Share" className="focus:outline-none">
                  <Share2 className="w-5 h-5 cursor-pointer transition-colors" style={{ ':hover': { color: themeColor } } as any} />
                </button>
                <a href="mailto:hello@quicktool.space" aria-label="Email">
                  <Mail className="w-5 h-5 cursor-pointer transition-colors" style={{ ':hover': { color: themeColor } } as any} />
                </a>
              </div>
            </div>

            <div className="col-span-1">
              <h4 className="font-bold text-sm mb-4 text-[#111827]">Quick Links</h4>
              <ul className="space-y-3 text-sm text-[#6B7280]">
                <li><Link href="/" className="transition-colors" style={{ ':hover': { color: themeColor } } as any}>Home</Link></li>
                <li><Link href="/tools" className="transition-colors" style={{ ':hover': { color: themeColor } } as any}>All Tools</Link></li>
                <li><Link href="/pricing" className="transition-colors" style={{ ':hover': { color: themeColor } } as any}>Pricing</Link></li>
                <li><Link href="/blog" className="transition-colors" style={{ ':hover': { color: themeColor } } as any}>Blog</Link></li>
                <li><Link href="/news" className="transition-colors" style={{ ':hover': { color: themeColor } } as any}>News</Link></li>
                <li><Link href="/articles" className="transition-colors" style={{ ':hover': { color: themeColor } } as any}>Articles</Link></li>
                <li><Link href="/about" className="transition-colors" style={{ ':hover': { color: themeColor } } as any}>About Us</Link></li>
                <li><Link href="/contact" className="transition-colors" style={{ ':hover': { color: themeColor } } as any}>Contact Us</Link></li>
              </ul>
            </div>

            <div className="col-span-1">
              <h4 className="font-bold text-sm mb-4 text-[#111827]">Categories</h4>
              <ul className="space-y-3 text-sm text-[#6B7280]">
                <li><Link href="/tools?c=AI Image" className="transition-colors" style={{ ':hover': { color: themeColor } } as any}>Image Tools</Link></li>
                <li><Link href="/tools?c=AI Writer" className="transition-colors" style={{ ':hover': { color: themeColor } } as any}>Writing Tools</Link></li>
                <li><Link href="/tools?c=AI Video" className="transition-colors" style={{ ':hover': { color: themeColor } } as any}>Video Tools</Link></li>
                <li><Link href="/tools?c=AI Code" className="transition-colors" style={{ ':hover': { color: themeColor } } as any}>Code Tools</Link></li>
                <li><Link href="/tools?c=SEO" className="transition-colors" style={{ ':hover': { color: themeColor } } as any}>SEO Tools</Link></li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h4 className="font-bold text-sm mb-4 text-[#111827]">Support</h4>
              <ul className="space-y-3 text-sm text-[#6B7280]">
                <li><Link href="/help" className="transition-colors" style={{ ':hover': { color: themeColor } } as any}>Help Center</Link></li>
                <li><Link href="/faq" className="transition-colors" style={{ ':hover': { color: themeColor } } as any}>FAQs</Link></li>
                <li><Link href="/privacy" className="transition-colors" style={{ ':hover': { color: themeColor } } as any}>Privacy Policy</Link></li>
                <li><Link href="/terms" className="transition-colors" style={{ ':hover': { color: themeColor } } as any}>Terms of Service</Link></li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h4 className="font-bold text-sm mb-4 text-[#111827]">Subscribe</h4>
              <p className="text-xs text-[#6B7280] mb-4">Get the latest updates, new tools, tips, and offers.</p>
              <NewsletterForm
                className="flex flex-col gap-2"
                inputClassName="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] text-[#111827] placeholder-gray-400 text-sm focus:outline-none focus:ring-1 transition-all bg-[#F8FAFC]"
                inputStyle={{ '--tw-ring-color': themeColor, borderColor: themeColor } as any}
                buttonClassName="text-white font-semibold py-2.5 rounded-lg text-sm shadow-sm w-full"
                buttonStyle={{ backgroundColor: themeColor }}
              />
            </div>
          </div>
          :

          <div className={`py-6 flex flex-col md:flex-row items-center justify-between text-xs text-[#6B7280] ${!isAuthenticated ? 'border-t border-[#E5E7EB]' : ''}`}>

            {/* Left: Logo */}
            <div className="w-full md:w-1/3 flex justify-center md:justify-start mb-4 md:mb-0">
              <Link href="/" className="flex items-center gap-2 group cursor-pointer">
                <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1">
                  <Zap className="w-5 h-5 text-[#6D5EF8]" style={{ fill: '#6D5EF8' }} />
                </div>
                <span className="text-lg font-black tracking-tighter text-[#111827]">
                  QuickTools<span className="text-[#6D5EF8]">.ai</span>
                </span>
              </Link>
            </div>

            {/* Middle: Copyright */}
            <div className="w-full md:w-1/3 text-center mb-4 md:mb-0">
              © {new Date().getFullYear()} QuickTools.ai. All rights reserved.
            </div>

            {/* Right: Links */}
            <div className="w-full md:w-1/3 flex justify-center md:justify-end gap-6">
              <Link href="/privacy" className="transition-colors hover:text-[#6D5EF8]">Privacy Policy</Link>
              <Link href="/terms" className="transition-colors hover:text-[#6D5EF8]">Terms of Service</Link>
              <Link href="/cookies" className="transition-colors hover:text-[#6D5EF8]">Cookies Policy</Link>
            </div>
          </div>}
      </div>
    </footer>
  );
}


