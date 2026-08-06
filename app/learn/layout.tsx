import { ReactNode } from 'react';
import LearnBreadcrumbs from '@/components/learn/LearnBreadcrumbs';
import LearnLayoutWrapper from '@/components/learn/LearnLayoutWrapper';

export default function LearnLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-[10px] pb-8 w-full max-w-[1440px]">
        {/* Breadcrumb */}
        <LearnBreadcrumbs />

        <LearnLayoutWrapper>
          {children}
        </LearnLayoutWrapper>
      </div>
    </div>
  );
}
