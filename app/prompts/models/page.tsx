import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Bot, CheckCircle2, LibraryBig } from 'lucide-react';
import { getEndpoint } from '../../../lib/api';
import { promptMetadata } from '../../../lib/promptMetadata';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = promptMetadata(
  'AI Prompt Models: ChatGPT, Claude & Gemini',
  'Choose ChatGPT, Claude, or Gemini and browse practical prompts designed for the strengths of each AI model.',
  'https://quicktool.space/prompts/models',
);

const modelDetails = [
  {
    name: 'ChatGPT',
    slug: 'chatgpt',
    icon: 'https://pub-0a928134dcdc420da2af02e6238ef06b.r2.dev/ChatGPT%20Image%20Aug%206%2C%202026%2C%2001_14_25%20PM.png',
    description: 'Versatile prompts for writing, planning, coding, business, analysis, and everyday productivity.',
    strengths: ['Structured output', 'Creative drafting', 'General workflows'],
  },
  {
    name: 'Claude',
    slug: 'claude',
    icon: 'https://pub-0a928134dcdc420da2af02e6238ef06b.r2.dev/ChatGPT%20Image%20Aug%206%2C%202026%2C%2001_24_40%20PM.png',
    description: 'Detailed prompts for long-form analysis, thoughtful writing, documents, and careful reasoning.',
    strengths: ['Long documents', 'Nuanced analysis', 'Clear explanations'],
  },
  {
    name: 'Gemini',
    slug: 'gemini',
    icon: 'https://pub-0a928134dcdc420da2af02e6238ef06b.r2.dev/ChatGPT%20Image%20Aug%206%2C%202026%2C%2001_34_48%20PM.png',
    description: 'Practical prompts for research, multimodal ideas, Google workflows, content, and productivity.',
    strengths: ['Multimodal tasks', 'Research workflows', 'Idea generation'],
  },
];

async function getStats() {
  try {
    const response = await fetch(getEndpoint('/api/prompts/stats'), { cache: 'no-store' });
    if (!response.ok) return null;
    const payload = await response.json();
    return payload.success ? payload.data : null;
  } catch (error) {
    console.error('Failed to load prompt model statistics:', error);
    return null;
  }
}

export default async function PromptModelsPage() {
  const stats = await getStats();
  const countFor = (name: string) => stats?.modelCounts?.find((item: any) => item.name.toLowerCase() === name.toLowerCase())?.count || 0;
  const schema = {
    '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'AI Prompt Models',
    description: 'Browse prompt libraries for ChatGPT, Claude, and Gemini.',
    url: 'https://quicktool.space/prompts/models',
    mainEntity: { '@type': 'ItemList', numberOfItems: modelDetails.length, itemListElement: modelDetails.map((model, index) => ({ '@type': 'ListItem', position: index + 1, name: `${model.name} Prompts`, url: `https://quicktool.space/prompts/${model.slug}` })) },
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#111827]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <section className="overflow-hidden bg-[#0B1020] text-white">
        <div className="mx-auto max-w-[1440px] px-4 py-11 sm:px-6 sm:py-16 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-indigo-200"><Bot className="h-4 w-4" /> Choose your AI</div>
            <h1 className="text-3xl font-black tracking-tight sm:text-5xl">Prompts for Every AI Model</h1>
            <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">Pick the model you use, then browse prompts tailored to its strengths. Every model library links directly to its complete prompt collection.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {modelDetails.map(model => (
            <Link key={model.slug} href={`/prompts/${model.slug}`} className="group flex min-h-[330px] flex-col rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div className="h-16 w-16 overflow-hidden rounded-2xl bg-white shadow-lg"><img src={model.icon} alt={`${model.name} prompts`} className="h-full w-full object-cover" /></div>
                <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700">{countFor(model.name) || 'Explore'} compatible prompts</span>
              </div>
              <h2 className="mt-6 text-2xl font-black group-hover:text-indigo-600">{model.name} Prompts</h2>
              <p className="mt-3 leading-7 text-slate-600">{model.description}</p>
              <ul className="mt-5 space-y-2 text-sm font-medium text-slate-600">
                {model.strengths.map(strength => <li key={strength} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" />{strength}</li>)}
              </ul>
              <span className="mt-auto flex items-center gap-2 pt-7 font-bold text-indigo-600">Browse {model.name} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-[26px] bg-gradient-to-r from-indigo-600 to-violet-600 p-7 text-white shadow-lg sm:flex-row sm:items-center sm:p-9">
          <div><p className="text-sm font-bold uppercase tracking-[0.16em] text-indigo-100">Not sure which model?</p><h2 className="mt-2 text-2xl font-black">Browse every published prompt together</h2><p className="mt-2 text-indigo-100">Start with the newest prompts and load more automatically while scrolling.</p></div>
          <Link href="/prompts/all" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-indigo-700 transition hover:bg-indigo-50"><LibraryBig className="h-5 w-5" /> Browse All Prompts</Link>
        </div>
      </section>
    </main>
  );
}
