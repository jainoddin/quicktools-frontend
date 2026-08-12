import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { promptMetadata } from '../../../lib/promptMetadata';

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ model: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const model = resolvedParams.model.toLowerCase();
  if (!['chatgpt', 'claude', 'gemini'].includes(model)) return { title: 'AI Model Not Found', robots: { index: false, follow: false } };
  const label = model === 'chatgpt' ? 'ChatGPT' : model === 'claude' ? 'Claude' : model === 'gemini' ? 'Gemini' : resolvedParams.model;
  return promptMetadata(`300+ ${label} AI Prompts for Better Results`, `Explore practical ${label} prompts for writing, business, marketing, coding, productivity, and everyday work. Copy and customize any prompt free.`, `https://quicktool.space/prompts/${model}`);
}

import PromptCard from '../../../components/prompts/PromptCard';
import PromptEmptyState from '../../../components/prompts/PromptEmptyState';
import { getEndpoint } from '../../../lib/api';
import PromptQuickLinks from '../../../components/prompts/PromptQuickLinks';

export default async function PromptModelPage({ params }: { params: Promise<{ model: string }> }) {
  const resolvedParams = await params;
  const model = resolvedParams.model;
  if (!['chatgpt', 'claude', 'gemini'].includes(model.toLowerCase())) notFound();
  const modelKey = model.toLowerCase();
  const modelLabel = modelKey === 'chatgpt' ? 'ChatGPT' : modelKey === 'claude' ? 'Claude' : 'Gemini';
  const modelIcons: Record<string, string> = {
    chatgpt: 'https://pub-0a928134dcdc420da2af02e6238ef06b.r2.dev/ChatGPT%20Image%20Aug%206%2C%202026%2C%2001_14_25%20PM.png',
    claude: 'https://pub-0a928134dcdc420da2af02e6238ef06b.r2.dev/ChatGPT%20Image%20Aug%206%2C%202026%2C%2001_24_40%20PM.png',
    gemini: 'https://pub-0a928134dcdc420da2af02e6238ef06b.r2.dev/ChatGPT%20Image%20Aug%206%2C%202026%2C%2001_34_48%20PM.png',
  };
  
  let prompts = [];
  try {
    const res = await fetch(getEndpoint(`/api/prompts?model=${model}&limit=50`), { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      if (json.success) prompts = json.data;
    }
  } catch (error) {
    console.error(`Failed to fetch prompts for model ${model}`, error);
  }
  const canonicalUrl = `https://quicktool.space/prompts/${modelKey}`;
  const structuredData = {
    '@context': 'https://schema.org', '@graph': [
      { '@type': 'CollectionPage', name: `${modelLabel} AI Prompts`, url: canonicalUrl, description: `Practical AI prompts optimized for ${modelLabel}.`, mainEntity: { '@type': 'ItemList', numberOfItems: prompts.length, itemListElement: prompts.map((prompt: any, index: number) => ({ '@type': 'ListItem', position: index + 1, name: prompt.title, url: `https://quicktool.space/prompts/${String(prompt.models?.[0] || modelKey).toLowerCase()}/${prompt.slug}` })) } },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://quicktool.space' }, { '@type': 'ListItem', position: 2, name: 'AI Prompts', item: 'https://quicktool.space/prompts' }, { '@type': 'ListItem', position: 3, name: `${modelLabel} Prompts`, item: canonicalUrl }] },
    ],
  };

  return (
    <div className="flex-grow bg-[#F8FAFC] text-[#111827] pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      
      <div className="bg-white pt-12 pb-8 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
         <div className="max-w-[1440px] mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 capitalize text-gray-900 flex items-center gap-3">
               <img src={modelIcons[modelKey] || `/learn-logos/${modelKey}.svg`} alt={`${modelLabel} icon`} className="w-11 h-11 rounded-xl bg-gray-50 border border-gray-100 object-cover shadow-sm" />
               {modelLabel} Prompts
            </h1>
            <p className="text-gray-500 max-w-2xl text-lg">Browse all AI prompts optimized specifically for the {modelLabel} model.</p>
         </div>
      </div>

      <PromptQuickLinks />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {prompts.length === 0 ? (
           <PromptEmptyState 
             title={`No ${modelLabel} prompts found`}
             desc="Check back later for new updates to this category."
             actionText="View All Prompts"
             actionLink="/prompts"
           />
        ) : (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
             {prompts.map((prompt: any, i: number) => (
               <PromptCard key={prompt._id || i} prompt={prompt} displayModel={modelLabel} />
             ))}
           </div>
        )}
      </div>
    </div>
  );
}
