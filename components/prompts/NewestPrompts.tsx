import React from 'react';
import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';
import PromptCard from './PromptCard';
import PromptEmptyState from './PromptEmptyState';

interface NewestPromptsProps {
  prompts: any[];
}

export default function NewestPrompts({ prompts }: NewestPromptsProps) {
  return (
    <section className="w-full bg-[#F8FAFC] py-16" id="newest">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#111827] mb-2 flex items-center gap-2">
              <Zap className="w-6 h-6 text-indigo-500" />
              Newest Prompts
            </h2>
            <p className="text-gray-500">Freshly added prompts from the AI community.</p>
          </div>
          <Link href="/prompts?sort=newest" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 flex items-center gap-1 transition-colors">
             View all newest <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {prompts.length === 0 ? (
          <PromptEmptyState 
            title="No new prompts found"
            desc="Be the first to submit a prompt to the community."
            actionText="Submit Prompt"
            actionLink="/dashboard/prompts/submit"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {prompts.map((prompt, i) => (
              <PromptCard key={i} prompt={prompt} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
