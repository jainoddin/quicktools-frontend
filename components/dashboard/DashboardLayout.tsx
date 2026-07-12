'use client';
import React, { useState, useEffect } from 'react';
import DashboardHeader from './DashboardHeader';
import Sidebar from './Sidebar';
import { getEndpoint } from '../../lib/api';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  useEffect(() => {
    // If not loading and not authenticated, redirect to login
    if (!isLoading && !isAuthenticated) {
      window.location.href = '/login';
    }
  }, [isLoading, isAuthenticated]);

  if (isLoading || !isAuthenticated) {
    // Optional: Return a skeleton or simply nothing while redirecting
    return null; 
  }

  return (
    <>
      <div className="flex flex-col min-h-screen bg-[#F8FAFC] font-sans">
      
      {/* Header spanning full width */}
      <DashboardHeader user={user} onMenuClick={() => setIsMobileMenuOpen(true)} />

      {/* Global Breadcrumbs */}
      <div className="w-full z-10 relative">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-0 flex items-center text-[13px] font-medium">
          <Home className="w-4 h-4 mr-1.5 text-[#6B7280]" />
          <Link href="/" className="text-[#6B7280] hover:text-[#111827] transition-colors">Home</Link>
          <span className="mx-2 text-[#D1D5DB]">›</span>
          <Link href="/dashboard" className="text-[#6B7280] hover:text-[#111827] transition-colors">Dashboard</Link>
          {(() => {
            if (!pathname) return null;
            const segments = pathname.split('/').filter(Boolean);
            if (segments.length <= 1) return null;

            const lastSegment = segments[segments.length - 1];
            let label = lastSegment.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
            if (lastSegment === 'all') label = 'All Tools';
            if (lastSegment === 'my-tools') label = 'My Tools';

            return (
              <>
                <span className="mx-2 text-[#D1D5DB]">›</span>
                <span className="text-[#6D5EF8] font-bold">{label}</span>
              </>
            );
          })()}
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsMobileMenuOpen(false)}></div>
          
          {/* Drawer */}
          <div className="fixed inset-y-0 left-0 w-[260px] bg-white shadow-2xl transform transition-transform overflow-y-auto">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Layout Wrapper */}
      <div className="flex flex-1 relative">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-1 gap-8">
        
          {/* Sidebar */}
          <div className="hidden lg:block w-[260px] shrink-0">
            <Sidebar />
          </div>

          {/* Scrollable Content */}
          <main className="flex-1 py-8 relative min-w-0 overflow-hidden">
            <div className="w-full space-y-6">
              {children}
            </div>
          </main>
        </div>
      </div>
      </div>
    </>
  );
}
