import React, { Suspense } from 'react';
import { Metadata } from 'next';
import ToolsClient from '@/components/tools/ToolsClient';

export const metadata: Metadata = {
  title: 'All AI Tools | QuickTools.ai',
  description: 'Explore our curated collection of 5 premium AI tools including Image Generator, Writer, Code Generator, Background Remover, and Video Generator.',
  alternates: {
    canonical: 'https://quicktools.ai/tools',
  },
};

export default function AllToolsPage() {
  return (
    <div className="bg-[#F8FAFC] text-[#111827] font-sans selection:bg-[#6D5EF8] selection:text-white min-h-screen">
      <Suspense fallback={<div className="p-8 text-center">Loading tools...</div>}>
        <ToolsClient />
      </Suspense>
    </div>
  );
}
