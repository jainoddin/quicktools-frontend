import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { priorityToolSeoContent } from '@/lib/priorityToolSeoContent';

export default function PriorityToolSeoSection({ slug }: { slug: string }) {
  const content = priorityToolSeoContent[slug];
  if (!content) return null;

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
    <section className="mx-auto w-full max-w-[1440px] px-4 pb-16 pt-10 sm:px-6 lg:px-8" aria-labelledby={`${slug}-guide`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
        <header className="max-w-4xl">
          <p className="mb-2 text-sm font-bold uppercase tracking-wider text-indigo-600">Practical guide</p>
          <h2 id={`${slug}-guide`} className="mb-4 text-3xl font-black text-slate-950">How to use {content.name}</h2>
          <p className="text-base leading-7 text-slate-600">{content.intro}</p>
        </header>

        <div className="mt-9 grid gap-6 lg:grid-cols-2">
          <InfoList title="Who should use it" items={content.audience} />
          <div className="grid gap-6 sm:grid-cols-2">
            <InfoList title="Inputs" items={content.inputs} />
            <InfoList title="Outputs" items={content.outputs} />
          </div>
        </div>

        <div className="mt-10">
          <h2 className="mb-5 text-2xl font-bold text-slate-950">Three-step workflow</h2>
          <ol className="grid gap-4 md:grid-cols-3">
            {content.steps.map((step, index) => <li key={step.title} className="rounded-2xl bg-slate-50 p-5"><span className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">{index + 1}</span><h3 className="font-bold text-slate-950">{step.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p></li>)}
          </ol>
        </div>

        <div className="mt-10">
          <h2 className="mb-5 text-2xl font-bold text-slate-950">Realistic use cases</h2>
          <div className="grid gap-4 md:grid-cols-3">{content.useCases.map(item => <article key={item.title} className="rounded-2xl border border-slate-200 p-5"><h3 className="font-bold text-slate-950">{item.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p></article>)}</div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <Example title="Example input" text={content.exampleInput} />
          <Example title="Example output" text={content.exampleOutput} />
        </div>

        <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="mb-4 text-xl font-bold text-slate-950">Limitations and verification</h2>
          <ul className="space-y-3">{content.limitations.map(item => <li key={item} className="flex gap-2 text-sm leading-6 text-slate-700"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-amber-600" />{item}</li>)}</ul>
        </div>

        <div className="mt-10">
          <h2 className="mb-5 text-2xl font-bold text-slate-950">Frequently asked questions</h2>
          <div className="grid gap-4 lg:grid-cols-2">{content.faqs.map(faq => <article key={faq.question} className="rounded-2xl border border-slate-200 p-5"><h3 className="font-bold text-slate-950">{faq.question}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{faq.answer}</p></article>)}</div>
        </div>

        <div className="mt-10 grid gap-8 border-t border-slate-200 pt-8 lg:grid-cols-2">
          <LinkGroup title="Related tools" links={content.relatedTools} />
          <LinkGroup title="Continue learning" links={content.relatedContent} />
        </div>
      </div>
    </section>
  );
}

function InfoList({ title, items }: { title: string; items: string[] }) {
  return <div className="rounded-2xl border border-slate-200 p-5"><h2 className="mb-4 text-xl font-bold text-slate-950">{title}</h2><ul className="space-y-3">{items.map(item => <li key={item} className="flex gap-2 text-sm leading-6 text-slate-600"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />{item}</li>)}</ul></div>;
}

function Example({ title, text }: { title: string; text: string }) {
  return <article className="rounded-2xl bg-slate-950 p-6 text-white"><h2 className="mb-3 text-lg font-bold">{title}</h2><p className="text-sm leading-7 text-slate-300">{text}</p></article>;
}

function LinkGroup({ title, links }: { title: string; links: { label: string; href: string; type?: string }[] }) {
  return <div><h2 className="mb-4 text-xl font-bold text-slate-950">{title}</h2><div className="grid gap-3 sm:grid-cols-2">{links.map(link => <Link key={link.href} href={link.href} className="group rounded-xl border border-slate-200 p-4 font-semibold text-slate-800 transition hover:border-indigo-400 hover:text-indigo-600">{link.type && <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-400">{link.type}</span>}<span className="flex items-center justify-between gap-2">{link.label}<ArrowRight className="h-4 w-4 shrink-0 transition group-hover:translate-x-1" /></span></Link>)}</div></div>;
}
