"use client";

import { ReactNode, Suspense } from 'react';
import { usePathname } from 'next/navigation';
import LearnSidebarLeft from './LearnSidebarLeft';
import LearnSidebarRight from './LearnSidebarRight';

export default function LearnLayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  
  // Check if we are on the exact root learn page
  const isRootLearnPage = pathname === '/learn' || pathname === '/learn/';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
      <aside className="lg:hidden">
        <details className="bg-white border border-indigo-100 rounded-xl shadow-sm group">
          <summary className="cursor-pointer list-none px-4 py-3 font-semibold text-slate-800 flex items-center justify-between">
            Browse courses and lessons
            <span className="text-indigo-600 group-open:rotate-180 transition-transform">⌄</span>
          </summary>
          <div className="px-4 pb-4 border-t border-slate-100">
            <Suspense fallback={<div className="h-40 animate-pulse bg-slate-100 rounded-xl mt-4" />}><LearnSidebarLeft /></Suspense>
          </div>
        </details>
      </aside>
      {/* Left Sidebar */}
      <aside className="hidden lg:block lg:col-span-3">
         <div className="sticky top-24">
           <Suspense fallback={<div className="h-96 animate-pulse bg-slate-100 rounded-xl" />}>
             <LearnSidebarLeft />
           </Suspense>
         </div>
      </aside>
      
      {/* Main Content Area */}
      <main className={`bg-white rounded-2xl shadow-sm border border-slate-100 p-8 lg:p-12 h-fit ${
        isRootLearnPage 
          ? 'lg:col-span-9' // Give it more width if root page
          : 'lg:col-span-6 xl:col-span-7' // Normal width for lessons
      }`}>
        {children}
      </main>
      
      {/* Right Sidebar - Hidden on root page */}
      {!isRootLearnPage && (
        <aside className="hidden lg:block lg:col-span-3 xl:col-span-2">
           <div className="sticky top-24">
             <LearnSidebarRight />
           </div>
        </aside>
      )}
    </div>
  );
}
