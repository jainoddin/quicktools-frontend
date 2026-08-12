import React from 'react';
import Link from 'next/link';
import { ArrowRight, Flame } from 'lucide-react';
import PromptCard from './PromptCard';
import PromptEmptyState from './PromptEmptyState';

interface TrendingPromptsProps {
  prompts: any[];
  isFallbackToNewest?: boolean;
}

export default function TrendingPrompts({ prompts, isFallbackToNewest = false }: TrendingPromptsProps) {
  const title = isFallbackToNewest ? 'Newest Prompts' : 'Trending Prompts';
  const desc = isFallbackToNewest ? 'Recently added prompts' : 'Most used prompts this week';
  const viewAllLink = isFallbackToNewest ? '/prompts/all?tab=newest' : '/prompts/all?tab=trending';

  return (
    <section className="w-full bg-[#0B0F19] py-16" id="trending">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 flex items-center gap-2">
              {!isFallbackToNewest && <Flame className="w-6 h-6 text-orange-500" />}
              {title}
            </h2>
            <p className="text-gray-400">{desc}</p>
          </div>
          <Link href={viewAllLink} className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors">
             View all {isFallbackToNewest ? 'newest' : 'trending'} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {prompts.length === 0 ? (
          <PromptEmptyState 
            title="Trending data is building"
            desc="Explore newest prompts instead."
            actionText="View Newest Prompts"
            actionLink="/prompts/all?tab=newest"
          />
        ) : (
          <div className="flex overflow-x-auto pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 gap-6 snap-x snap-mandatory scrollbar-hide">
            {prompts.map((prompt, i) => (
              <div key={i} className="min-w-[300px] w-[320px] max-w-[350px] shrink-0 snap-start">
                <PromptCard prompt={prompt} />
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
