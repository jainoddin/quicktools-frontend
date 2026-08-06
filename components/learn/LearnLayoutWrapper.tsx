"use client";

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import LearnSidebarLeft from './LearnSidebarLeft';
import LearnSidebarRight from './LearnSidebarRight';

export default function LearnLayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  
  // Check if we are on the exact root learn page
  const isRootLearnPage = pathname === '/learn' || pathname === '/learn/';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
      {/* Left Sidebar */}
      <aside className="hidden lg:block lg:col-span-3">
         <div className="sticky top-24">
           <LearnSidebarLeft />
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
