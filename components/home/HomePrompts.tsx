import Link from 'next/link';
import { ArrowRight, Bookmark, Bot, Sparkles } from 'lucide-react';
import { getEndpoint } from '../../lib/api';

interface HomePrompt {
  _id: string;
  slug: string;
  title: string;
  description: string;
  category?: string;
  models?: string[];
}

export default async function HomePrompts() {
  let prompts: HomePrompt[] = [];
  try {
    const response = await fetch(getEndpoint('/api/prompts?limit=4&sort=recent'), { next: { revalidate: 300 } });
    if (response.ok) {
      const data = await response.json();
      prompts = data.success && Array.isArray(data.data) ? data.data.slice(0, 4) : [];
    }
  } catch (error) {
    console.error('[home] prompts fetch failed:', error);
  }

  if (!prompts.length) return null;

  const promptUrl = (prompt: HomePrompt) => `/prompts/${String(prompt.models?.[0] || 'chatgpt').toLowerCase()}/${prompt.slug}`;
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Latest AI Prompts on QuickTools',
    url: 'https://quicktool.space/prompts',
    numberOfItems: prompts.length,
    itemListElement: prompts.map((prompt, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: prompt.title,
      url: `https://quicktool.space${promptUrl(prompt)}`,
    })),
  };

  return (
    <section className="w-full bg-white border-y border-gray-100" aria-labelledby="home-prompts-title">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-indigo-600 mb-3"><Sparkles className="w-4 h-4" /> Ready-to-use prompt library</div>
            <h2 id="home-prompts-title" className="text-2xl sm:text-3xl font-black text-gray-950 mb-2">Start faster with AI Prompts</h2>
            <p className="text-gray-500 max-w-2xl">Explore practical prompts for ChatGPT, Claude, and Gemini—organized by real tasks and ready to copy.</p>
          </div>
          <Link href="/prompts" className="shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 text-sm font-bold shadow-sm transition-colors">
            Browse All Prompts <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {prompts.map(prompt => {
            const model = prompt.models?.[0] || 'ChatGPT';
            return (
              <Link key={prompt._id} href={promptUrl(prompt)} className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between gap-3 mb-5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 text-indigo-700 px-3 py-1 text-[11px] font-bold"><Bot className="w-3.5 h-3.5" /> {model}</span>
                  <Bookmark className="w-4 h-4 text-gray-300 group-hover:text-indigo-500" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600">{prompt.category || 'Productivity'}</span>
                <h3 className="text-lg font-black leading-snug text-gray-950 mt-2 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">{prompt.title}</h3>
                <p className="text-sm leading-6 text-gray-500 line-clamp-2">{prompt.description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-bold text-indigo-600 mt-5">View Prompt <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
              </Link>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-2 mt-6">
          {['ChatGPT', 'Claude', 'Gemini'].map(model => <Link key={model} href={`/prompts/${model.toLowerCase()}`} className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-bold text-gray-600 hover:border-indigo-200 hover:text-indigo-600">{model} Prompts</Link>)}
          <Link href="/prompts/generator" className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-bold text-indigo-700 hover:bg-indigo-100">AI Prompt Generator</Link>
        </div>
      </div>
    </section>
  );
}
