import React from 'react';
import { Metadata } from 'next';
import { isKnownPromptCategorySlug, promptSlugToCategory } from '../../../../lib/promptSlugs';
import { promptMetadata } from '../../../../lib/promptMetadata';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  if (!isKnownPromptCategorySlug(resolvedParams.category)) return { title: 'Prompt Category Not Found', robots: { index: false, follow: false } };
  const category = promptSlugToCategory(resolvedParams.category);
  return promptMetadata(`${category} AI Prompts for Better Results`, `Explore practical ${category} AI prompts designed to save time and improve your results. Browse, copy, customize, and use every prompt free.`, `https://quicktool.space/prompts/category/${resolvedParams.category.toLowerCase()}`);
}

import PromptCard from '../../../../components/prompts/PromptCard';
import PromptEmptyState from '../../../../components/prompts/PromptEmptyState';
import { getEndpoint } from '../../../../lib/api';
import PromptQuickLinks from '../../../../components/prompts/PromptQuickLinks';

export default async function PromptCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  if (!isKnownPromptCategorySlug(resolvedParams.category)) notFound();
  const category = promptSlugToCategory(resolvedParams.category);
  
  let prompts = [];
  try {
    const res = await fetch(getEndpoint(`/api/prompts?category=${encodeURIComponent(category)}&limit=50`), { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      if (json.success) prompts = json.data;
    }
  } catch (error) {
    console.error(`Failed to fetch prompts for category ${category}`, error);
  }

  return (
    <div className="flex-grow bg-[#F8FAFC] text-[#111827] pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': [{ '@type': 'CollectionPage', name: `${category} AI Prompts`, url: `https://quicktool.space/prompts/category/${resolvedParams.category.toLowerCase()}`, description: `Practical AI prompts for ${category}.` }, { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://quicktool.space' }, { '@type': 'ListItem', position: 2, name: 'AI Prompts', item: 'https://quicktool.space/prompts' }, { '@type': 'ListItem', position: 3, name: category, item: `https://quicktool.space/prompts/category/${resolvedParams.category.toLowerCase()}` }] }] }).replace(/</g, '\\u003c') }} />
      
      <div className="bg-[#0B0F19] pt-12 pb-8 px-4 sm:px-6 lg:px-8 border-b border-indigo-500/20">
         <div className="max-w-[1440px] mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 capitalize text-white flex items-center gap-3">
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  {category}
               </span> Prompts
            </h1>
            <p className="text-gray-400 max-w-2xl text-lg">Browse all AI prompts in the {category} category to boost your productivity.</p>
         </div>
      </div>

      <PromptQuickLinks />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {prompts.length === 0 ? (
           <PromptEmptyState 
             title={`No ${category} prompts found`}
             desc="Check back later for new updates to this category."
             actionText="View All Prompts"
             actionLink="/prompts"
           />
        ) : (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
             {prompts.map((prompt: any, i: number) => (
               <PromptCard key={prompt._id || i} prompt={prompt} />
             ))}
           </div>
        )}
      </div>
    </div>
  );
}
