'use client';

import dynamic from 'next/dynamic';
import { Bot } from 'lucide-react';
import { useState } from 'react';

const QuickToolsNavigator = dynamic(() => import('./QuickToolsNavigator'), {
  ssr: false,
  loading: () => (
    <div className="fixed bottom-4 right-4 z-[180] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg sm:bottom-6 sm:right-6" aria-label="Loading QuickTool AI">
      <Bot className="h-6 w-6 animate-pulse" />
    </div>
  ),
});

export default function DeferredQuickToolsNavigator() {
  const [activated, setActivated] = useState(false);

  if (activated) return <QuickToolsNavigator initialOpen />;

  return (
    <button
      type="button"
      onClick={() => setActivated(true)}
      className="fixed bottom-4 right-4 z-[180] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-[0_12px_32px_rgba(79,70,229,0.32)] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200 sm:bottom-6 sm:right-6"
      aria-label="Open QuickTool AI"
    >
      <Bot className="h-7 w-7" aria-hidden />
    </button>
  );
}
