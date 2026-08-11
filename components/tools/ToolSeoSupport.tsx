'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { allTools, toolByRouteSlug } from '@/lib/toolsRegistry';
import { toolCategoryHubs } from '@/lib/toolCategoryHubs';
import { priorityToolSlugs } from '@/lib/priorityToolSeoContent';
import { getToolSeoContent } from '@/lib/toolSeoContent';

export default function ToolSeoSupport() {
  const pathname = usePathname();
  const routeSlug = pathname.match(/^\/tools\/([^/]+)\/?$/)?.[1];
  if (!routeSlug) return null;
  if (priorityToolSlugs.has(routeSlug)) return null;
  const tool = toolByRouteSlug.get(routeSlug);
  if (!tool) return null;
  const content = getToolSeoContent(routeSlug);
  if (!content) return null;

  const related = allTools.filter(item => item.category === tool.category && item.slug !== tool.slug).slice(0, 4);
  const hub = toolCategoryHubs.find(category => category.sourceCategories.includes(tool.category));
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 pb-14 pt-8 sm:px-6 lg:px-8" aria-labelledby="tool-help-heading">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 id="tool-help-heading" className="mb-3 text-2xl font-black text-slate-950">How to use {tool.name}</h2>
            <p className="mb-6 max-w-3xl leading-7 text-slate-600">{content.intro}</p>
            <ol className="grid gap-3 sm:grid-cols-3">
              {content.steps.map((step, index) => (
                <li key={step.title} className="rounded-2xl bg-slate-50 p-4">
                  <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">{index + 1}</span>
                  <h3 className="mb-1 font-bold text-slate-950">{step.title}</h3><p className="text-sm leading-6 text-slate-600">{step.description}</p>
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
        <div className="mt-9 grid gap-5 lg:grid-cols-3">
          <DetailList title="Who it helps" items={content.audience} />
          <DetailList title="Information to provide" items={content.inputs} />
          <DetailList title="What you receive" items={content.outputs} />
        </div>
        <div className="mt-9 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 p-5"><h2 className="mb-3 text-xl font-bold text-slate-950">Example input</h2><p className="text-sm leading-7 text-slate-600">{content.exampleInput}</p></div>
          <div className="rounded-2xl bg-slate-950 p-5 text-white"><h2 className="mb-3 text-xl font-bold">Expected output</h2><p className="text-sm leading-7 text-slate-300">{content.exampleOutput}</p></div>
        </div>
        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {content.useCases.map(item => <article key={item.title} className="rounded-2xl border border-slate-200 p-5"><h3 className="font-bold text-slate-950">{item.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p></article>)}
        </div>
        <div className="mt-9 rounded-2xl border border-amber-200 bg-amber-50 p-5"><h2 className="mb-3 text-xl font-bold text-slate-950">Limitations and checks</h2><ul className="space-y-2">{content.limitations.map(item => <li key={item} className="flex gap-2 text-sm leading-6 text-slate-700"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-amber-600" />{item}</li>)}</ul></div>
        <div className="mt-9"><h2 className="mb-4 text-xl font-bold text-slate-950">Frequently asked questions</h2><div className="grid gap-4 lg:grid-cols-2">{content.faqs.map(faq => <article key={faq.question} className="rounded-2xl border border-slate-200 p-5"><h3 className="font-bold text-slate-950">{faq.question}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{faq.answer}</p></article>)}</div></div>
        {(related.length > 0 || hub) && <div className="mt-9 border-t border-slate-200 pt-7">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><h2 className="text-xl font-bold text-slate-950">Related {tool.category} tools</h2>{hub && <Link href={`/tools/category/${hub.slug}`} className="flex items-center gap-1 font-semibold text-indigo-600 hover:underline">Explore the category <ArrowRight className="h-4 w-4" /></Link>}</div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{related.map(item => <Link key={item.slug} href={item.slug} className="rounded-xl border border-slate-200 p-4 font-semibold text-slate-800 transition hover:border-indigo-400 hover:text-indigo-600">{item.name}</Link>)}</div>
          <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold">
            <Link href="/blog" className="rounded-full bg-slate-100 px-4 py-2 text-slate-700 hover:text-indigo-600">Related blog guides</Link>
            <Link href="/articles" className="rounded-full bg-slate-100 px-4 py-2 text-slate-700 hover:text-indigo-600">In-depth articles</Link>
            <Link href="/prompts" className="rounded-full bg-slate-100 px-4 py-2 text-slate-700 hover:text-indigo-600">Prompt library</Link>
            <Link href="/learn" className="rounded-full bg-slate-100 px-4 py-2 text-slate-700 hover:text-indigo-600">Learning courses</Link>
          </div>
        </div>}
      </div>
    </section>
  );
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return <div className="rounded-2xl border border-slate-200 p-5"><h2 className="mb-3 text-lg font-bold text-slate-950">{title}</h2><ul className="space-y-2">{items.map(item => <li key={item} className="flex gap-2 text-sm leading-6 text-slate-600"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />{item}</li>)}</ul></div>;
}
