import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getRelevantToolsForContent } from '@/lib/contentToolLinks';

export default function RelevantToolsLinks({ content, title = 'Tools for the next step' }: { content: string; title?: string }) {
  const tools = getRelevantToolsForContent(content);
  return (
    <section className="mt-12 border-t border-slate-200 pt-8" aria-labelledby="relevant-tools-heading">
      <h2 id="relevant-tools-heading" className="mb-2 text-2xl font-bold text-slate-950">{title}</h2>
      <p className="mb-5 text-sm leading-6 text-slate-600">These links are selected from this page&apos;s topic, not from a generic popularity list.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {tools.map(tool => <Link key={tool.slug} href={tool.slug} className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:border-indigo-400"><span className="text-xs font-bold uppercase tracking-wide text-indigo-600">{tool.category}</span><span className="mt-1 flex items-center justify-between gap-3 font-bold text-slate-950 group-hover:text-indigo-600">{tool.name}<ArrowRight className="h-4 w-4 shrink-0" /></span><span className="mt-2 block text-sm leading-5 text-slate-600">{tool.description}</span></Link>)}
      </div>
    </section>
  );
}
