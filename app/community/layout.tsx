import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Community | QuickTools.ai",
  description: "Join the QuickTools community. Ask questions, share your knowledge, discuss AI tools, and learn from experts.",
  keywords: ["QuickTools community", "AI tools forum", "ask questions", "AI discussions", "prompt engineering help"],
  openGraph: {
    title: "Community | QuickTools.ai",
    description: "Join the QuickTools community. Ask questions, share your knowledge, discuss AI tools, and learn from experts.",
    url: "https://quicktool.space/community",
    type: "website",
  }
};

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 w-full max-w-[1500px]">
        {children}
      </div>
    </div>
  );
}
