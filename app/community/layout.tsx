import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://quicktool.space'),
  title: {
    absolute: "AI Community - Ask Questions & Share Knowledge | QuickTools",
  },
  description: "Join the QuickTools AI Community to ask questions, share knowledge, discuss ChatGPT, Claude, Gemini, coding, prompting, and AI tools.",
  keywords: ["AI community", "AI forum", "AI questions", "AI answers", "AI discussions", "Ask AI questions", "AI tools community", "ChatGPT community", "Claude community", "Gemini community", "Prompt engineering", "AI help", "Developer community", "QuickTools Community", "AI knowledge sharing", "AI support forum", "AI learning community"],
  alternates: {
    canonical: 'https://quicktool.space/community',
  },
  openGraph: {
    title: "AI Community - Ask Questions & Share Knowledge | QuickTools",
    description: "Join the QuickTools AI Community to ask questions, share knowledge, discuss ChatGPT, Claude, Gemini, coding, prompting, and AI tools.",
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
