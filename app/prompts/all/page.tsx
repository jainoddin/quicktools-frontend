import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, LibraryBig } from 'lucide-react';
import AllPromptsClient from '../../../components/prompts/AllPromptsClient';
import { getEndpoint } from '../../../lib/api';
import { promptMetadata } from '../../../lib/promptMetadata';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = promptMetadata(
  'All AI Prompts for ChatGPT, Claude & Gemini',
  'Browse the complete QuickTool library of practical prompts for writing, coding, marketing, design, business, and productivity.',
  'https://quicktool.space/prompts/all',
);

async function getInitialPrompts(tab: 'trending' | 'newest') {
  try {
    const sort = tab === 'newest' ? 'recent' : 'trending';
    const response = await fetch(getEndpoint(`/api/prompts?sort=${sort}&limit=20&page=1`), {
      cache: 'no-store',
    });
    if (!response.ok) return { prompts: [], total: 0 };
    const payload = await response.json();
    if (!payload.success) return { prompts: [], total: 0 };
    return { prompts: payload.data || [], total: payload.total || payload.data?.length || 0 };
  } catch (error) {
    console.error('Failed to load the initial prompt library:', error);
    return { prompts: [], total: 0 };
  }
}

export default async function AllPromptsPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const requestedTab = (await searchParams).tab;
  const initialTab = requestedTab === 'newest' ? 'newest' : 'trending';
  const { prompts, total } = await getInitialPrompts(initialTab);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'All QuickTool AI Prompts',
    description: 'The complete QuickTool prompt library for ChatGPT, Claude, and Gemini.',
    url: 'https://quicktool.space/prompts/all',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: total,
      itemListElement: prompts.map((prompt: any, index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: prompt.title,
        url: `https://quicktool.space/prompts/${String(prompt.models?.[0] || 'chatgpt').toLowerCase()}/${prompt.slug}`,
      })),
    },
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#111827]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <section className="border-y border-indigo-900/40 bg-[#0B1020] text-white">
        <div className="mx-auto grid max-w-[1440px] gap-7 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-indigo-200">
              <LibraryBig className="h-4 w-4" /> Complete library
            </div>
            <h1 className="text-3xl font-black tracking-tight sm:text-5xl">All AI Prompts</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Explore {total || 'all'} ready-to-use prompts across ChatGPT, Claude, and Gemini. Trending prompts load first, then more appear automatically as you scroll.
            </p>
          </div>
          <Link href="/prompts" className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/15">
            <ArrowLeft className="h-4 w-4" /> Prompt Hub
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-9 sm:px-6 sm:py-12 lg:px-8">
        {prompts.length ? (
          <AllPromptsClient initialPrompts={prompts} initialTotal={total} initialTab={requestedTab === 'saved' ? 'saved' : initialTab} />
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <LibraryBig className="mx-auto h-10 w-10 text-indigo-500" />
            <h2 className="mt-4 text-xl font-black">Prompt library is temporarily unavailable</h2>
            <p className="mt-2 text-slate-500">Please refresh in a moment. Your existing prompt pages are still available.</p>
          </div>
        )}
      </section>
    </main>
  );
}
