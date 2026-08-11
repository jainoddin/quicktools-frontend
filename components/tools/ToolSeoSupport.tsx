'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { allTools, toolByRouteSlug } from '@/lib/toolsRegistry';
import { toolCategoryHubs } from '@/lib/toolCategoryHubs';

export default function ToolSeoSupport() {
  const pathname = usePathname();
  const routeSlug = pathname.match(/^\/tools\/([^/]+)\/?$/)?.[1];
  if (!routeSlug) return null;
  const tool = toolByRouteSlug.get(routeSlug);
  if (!tool) return null;

  const related = allTools.filter(item => item.category === tool.category && item.slug !== tool.slug).slice(0, 4);
  const hub = toolCategoryHubs.find(category => category.sourceCategories.includes(tool.category));

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 pb-14 pt-8 sm:px-6 lg:px-8" aria-labelledby="tool-help-heading">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 id="tool-help-heading" className="mb-3 text-2xl font-black text-slate-950">How to use {tool.name}</h2>
            <p className="mb-6 max-w-3xl leading-7 text-slate-600">{tool.description} Use the workflow below to get a focused result, then verify important facts, figures, and decisions before publishing or sharing the output.</p>
            <ol className="grid gap-3 sm:grid-cols-3">
              {[
                ['1', 'Add clear details', 'Describe the goal, audience, constraints, and required format.'],
                ['2', 'Generate the draft', 'Review the generated result and refine any missing context.'],
                ['3', 'Verify and export', 'Check accuracy, make final edits, and save the useful version.'],
              ].map(([step, title, text]) => (
                <li key={step} className="rounded-2xl bg-slate-50 p-4">
                  <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">{step}</span>
                  <h3 className="mb-1 font-bold text-slate-950">{title}</h3><p className="text-sm leading-6 text-slate-600">{text}</p>
                </li>
              ))}
            </ol>
          </div>
          <aside className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5">
            <h2 className="mb-4 text-lg font-bold text-slate-950">Good output checklist</h2>
            <ul className="space-y-3 text-sm text-slate-700">
              {['Matches the requested audience and format', 'Uses only details you supplied or verified', 'Avoids unsupported claims and invented experience', 'Is reviewed before professional or public use'].map(item => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />{item}</li>)}
            </ul>
          </aside>
        </div>
        {(related.length > 0 || hub) && <div className="mt-9 border-t border-slate-200 pt-7">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><h2 className="text-xl font-bold text-slate-950">Related {tool.category} tools</h2>{hub && <Link href={`/tools/category/${hub.slug}`} className="flex items-center gap-1 font-semibold text-indigo-600 hover:underline">Explore the category <ArrowRight className="h-4 w-4" /></Link>}</div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{related.map(item => <Link key={item.slug} href={item.slug} className="rounded-xl border border-slate-200 p-4 font-semibold text-slate-800 transition hover:border-indigo-400 hover:text-indigo-600">{item.name}</Link>)}</div>
        </div>}
      </div>
    </section>
  );
}
