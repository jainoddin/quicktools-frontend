import React, { Suspense } from 'react';
import { Metadata } from 'next';
import PromptHero from '../../components/prompts/PromptHero';
import PromptQuickLinks from '../../components/prompts/PromptQuickLinks';
import PromptModelSelector from '../../components/prompts/PromptModelSelector';
import PromptCategories from '../../components/prompts/PromptCategories';
import PromptTabs from '../../components/prompts/PromptTabs';
import FeaturedCollections from '../../components/prompts/FeaturedCollections';
import PromptGeneratorCTA from '../../components/prompts/PromptGeneratorCTA';
import LearnPromptingCTA from '../../components/prompts/LearnPromptingCTA';
import PromptFaq from '../../components/prompts/PromptFaq';
import CommunityCTA from '../../components/prompts/CommunityCTA';
import SavedPromptsCTA from '../../components/prompts/SavedPromptsCTA';
import { promptMetadata } from '../../lib/promptMetadata';

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  ...promptMetadata('300+ ChatGPT, Claude & Gemini AI Prompts', 'Explore 300+ practical AI prompts for writing, coding, marketing, design, productivity, and business. Copy prompts free or save them to your account.', 'https://quicktool.space/prompts'),
  keywords: [
    'AI prompts', 'ChatGPT prompts', 'Claude prompts', 'Gemini prompts', 
    'Prompt engineering', 'Best AI prompts', 'Prompt templates'
  ],
};

import { getEndpoint } from '../../lib/api';

async function getPromptsData(query = '') {
  let stats = null;
  let trendingPrompts = [];
  let newestPrompts = [];
  let featured = null;

  try {
    const [statsRes, trendingRes, newestRes] = await Promise.all([
      fetch(getEndpoint('/api/prompts/stats'), { cache: 'no-store' }),
      fetch(getEndpoint(`/api/prompts?sort=trending&limit=10${query ? `&q=${encodeURIComponent(query)}` : ''}`), { cache: 'no-store' }),
      fetch(getEndpoint(`/api/prompts?sort=recent&limit=20${query ? `&q=${encodeURIComponent(query)}` : ''}`), { cache: 'no-store' })
    ]);

    if (statsRes.ok) {
      const statsJson = await statsRes.json();
      if (statsJson.success) stats = statsJson.data;
    }

    if (trendingRes.ok) {
      const trendingJson = await trendingRes.json();
      if (trendingJson.success) trendingPrompts = trendingJson.data;
    }

    if (newestRes.ok) {
      const newestJson = await newestRes.json();
      if (newestJson.success) newestPrompts = newestJson.data;
    }

    if (trendingPrompts.length > 0) {
      featured = trendingPrompts[0]; // Set top trending as featured
    } else if (newestPrompts.length > 0) {
      featured = newestPrompts[0];
    }

  } catch (error) {
    console.error("Failed to fetch prompts data:", error);
  }

  return { stats, trendingPrompts, newestPrompts, featured };
}

export default async function PromptsLandingPage({ searchParams }: { searchParams: Promise<{ q?: string; sort?: string }> }) {
  const resolved = await searchParams;
  const query = resolved.q?.trim() || '';
  const { stats, trendingPrompts, newestPrompts, featured } = await getPromptsData(query);
  
  const hasTrendingData = trendingPrompts && trendingPrompts.length > 0; 

  return (
    <div className="flex-grow overflow-x-clip bg-[#F8FAFC] text-[#111827] font-sans selection:bg-[#4F46E5] selection:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'QuickTools AI Prompt Hub', description: 'A library of 300+ practical prompts for ChatGPT, Claude, and Gemini.', url: 'https://quicktool.space/prompts', isPartOf: { '@type': 'WebSite', name: 'QuickTools.ai', url: 'https://quicktool.space' } }).replace(/</g, '\\u003c') }} />
      
      {/* 1. Hero */}
      <PromptHero stats={stats || undefined} featuredPrompt={featured} />
      
      {/* 2. Quick Links */}
      <PromptQuickLinks />

      {/* 3. Browse by AI Model */}
      <PromptModelSelector counts={stats?.modelCounts || []} totalPrompts={stats?.prompts || newestPrompts.length} />

      {/* 4. Browse by Category */}
      <PromptCategories counts={stats?.categoryCounts || []} />

      {query && <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8"><h2 className="text-2xl font-bold">Search results for “{query}”</h2></div>}

      {/* 5. Trending / Newest Prompts Tabs */}
      <PromptTabs trendingPrompts={trendingPrompts} newestPrompts={newestPrompts} initialTab={resolved.sort === 'newest' ? 'newest' : 'trending'} query={query} />

      {/* 6. Featured Collections */}
      <FeaturedCollections counts={stats?.categoryCounts || []} />

      {/* 7. Bottom CTAs in a 3-column grid */}
      <section className="w-full bg-gradient-to-b from-[#F8FAFC] to-indigo-50/70 pb-12 pt-3 sm:pb-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-5 sm:mb-7">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 mb-1.5">Do more with prompts</p>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Create, learn and share</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
            <PromptGeneratorCTA />
            <LearnPromptingCTA />
            <CommunityCTA />
            <SavedPromptsCTA />
          </div>
        </div>
      </section>

      {/* 11. FAQ & SEO Content */}
      <PromptFaq />
      
    </div>
  );
}
