import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getEndpoint } from '../../../../lib/api';
import PromptDetailClient from '../../../../components/prompts/PromptDetailClient';
import PromptQuickLinks from '../../../../components/prompts/PromptQuickLinks';
import { promptMetadata } from '../../../../lib/promptMetadata';
import RelevantToolsLinks from '../../../../components/shared/RelevantToolsLinks';

export const revalidate = 3600;

async function getPrompt(slug: string) {
  try {
    const res = await fetch(getEndpoint(`/api/prompts/${slug}`), { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return json.success ? json.data : null;
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ model: string, slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const prompt = await getPrompt(resolvedParams.slug);
  
  if (!prompt) {
    return { title: 'Prompt Not Found', robots: { index: false, follow: false } };
  }
  
  const primaryModel = String(prompt.models?.[0] || 'chatgpt').toLowerCase();
  return promptMetadata(`${prompt.title} | AI Prompt`, prompt.description, `https://quicktool.space/prompts/${primaryModel}/${resolvedParams.slug}`);
}

export default async function PromptDetailPage({ params }: { params: Promise<{ model: string, slug: string }> }) {
  const resolvedParams = await params;
  const modelIcons: Record<string, string> = {
    chatgpt: 'https://pub-0a928134dcdc420da2af02e6238ef06b.r2.dev/ChatGPT%20Image%20Aug%206%2C%202026%2C%2001_14_25%20PM.png',
    claude: 'https://pub-0a928134dcdc420da2af02e6238ef06b.r2.dev/ChatGPT%20Image%20Aug%206%2C%202026%2C%2001_24_40%20PM.png',
    gemini: 'https://pub-0a928134dcdc420da2af02e6238ef06b.r2.dev/ChatGPT%20Image%20Aug%206%2C%202026%2C%2001_34_48%20PM.png',
  };
  const prompt = await getPrompt(resolvedParams.slug);
  if (!prompt) notFound();
  if (!['chatgpt', 'claude', 'gemini'].includes(resolvedParams.model.toLowerCase())) notFound();
  const canonicalModel = String(prompt.models?.[0] || 'chatgpt').toLowerCase();
  const canonicalUrl = `https://quicktool.space/prompts/${canonicalModel}/${prompt.slug}`;
  const structuredData = { '@context': 'https://schema.org', '@graph': [{ '@type': 'CreativeWork', name: prompt.title, description: prompt.description, text: prompt.prompt, datePublished: prompt.publishedAt || prompt.createdAt, dateModified: prompt.updatedAt || prompt.publishedAt || prompt.createdAt, url: canonicalUrl, inLanguage: 'en', isAccessibleForFree: true, author: { '@type': 'Organization', name: 'QuickTools.ai', url: 'https://quicktool.space' }, keywords: Array.isArray(prompt.tags) ? prompt.tags.join(', ') : undefined }, { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://quicktool.space' }, { '@type': 'ListItem', position: 2, name: 'AI Prompts', item: 'https://quicktool.space/prompts' }, { '@type': 'ListItem', position: 3, name: prompt.title, item: canonicalUrl }] }] };

  return (
    <div className="flex-grow bg-[#F8FAFC] text-[#111827] pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <div className="bg-white pt-12 pb-8 border-b border-gray-100">
         <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-sm font-bold text-indigo-600 mb-2 uppercase tracking-wider flex items-center gap-2">
               <img src={modelIcons[resolvedParams.model.toLowerCase()] || `/learn-logos/${resolvedParams.model.toLowerCase()}.svg`} className="w-6 h-6 rounded-md object-cover" alt={`${resolvedParams.model} icon`} /> {resolvedParams.model} Prompts
            </h1>
         </div>
      </div>
      
      <PromptQuickLinks />

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 mt-10 -translate-y-16">
        <PromptDetailClient prompt={prompt} selectedModel={resolvedParams.model} />
        <RelevantToolsLinks content={`${prompt.title} ${prompt.description || ''} ${prompt.category || ''} ${(prompt.tags || []).join(' ')}`} />
      </div>
    </div>
  );
}
