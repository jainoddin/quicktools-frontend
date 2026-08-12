import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ChevronRight, Home } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getToolCategoryHub, getToolsForHub, toolCategoryGuides, toolCategoryHubs } from '@/lib/toolCategoryHubs';

const BASE_URL = 'https://quicktool.space';

export function generateStaticParams() {
  return toolCategoryHubs.map(category => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = getToolCategoryHub(slug);
  if (!category) return {};
  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `${BASE_URL}/tools/category/${category.slug}` },
    openGraph: {
      title: `${category.name} | QuickTool`,
      description: category.description,
      url: `${BASE_URL}/tools/category/${category.slug}`,
      type: 'website',
      images: [{
        url: `${BASE_URL}/api/og?title=${encodeURIComponent(category.name)}&type=collection`,
        width: 1200,
        height: 630,
        alt: `${category.name} collection`,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.name} | QuickTool`,
      description: category.description,
      images: [`${BASE_URL}/api/og?title=${encodeURIComponent(category.name)}&type=collection`],
    },
  };
}

export default async function ToolCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getToolCategoryHub(slug);
  if (!category) notFound();
  const tools = getToolsForHub(category);
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'CollectionPage', name: category.name,
    description: category.description, url: `${BASE_URL}/tools/category/${category.slug}`,
    mainEntity: { '@type': 'ItemList', itemListElement: tools.map((tool, index) => ({ '@type': 'ListItem', position: index + 1, name: tool.name, url: `${BASE_URL}${tool.slug}` })) },
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: category.faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-8 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="flex items-center gap-1 hover:text-indigo-600"><Home className="h-4 w-4" />Home</Link><ChevronRight className="h-4 w-4" />
          <Link href="/tools" className="hover:text-indigo-600">Tools</Link><ChevronRight className="h-4 w-4" /><span className="font-semibold text-indigo-600">{category.name}</span>
        </nav>
        <header className="mb-10 max-w-3xl">
          <h1 className="mb-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">{category.name}</h1>
          <p className="text-lg leading-8 text-slate-600">{category.description} Compare focused options below, open the tool that matches your task, and review its output before using it in professional work.</p>
          <p className="mt-4 leading-7 text-slate-600"><strong className="text-slate-900">Who this collection is for:</strong> {category.audience}</p>
          <p className="mt-3 leading-7 text-slate-600"><strong className="text-slate-900">How to choose:</strong> {category.choosingGuide}</p>
        </header>
        <section className="mb-10 grid gap-5 md:grid-cols-2" aria-label={`${category.name} selection guide`}>
          {toolCategoryGuides[category.slug].map(paragraph => <p key={paragraph} className="rounded-2xl border border-slate-200 bg-white p-5 leading-7 text-slate-600 shadow-sm">{paragraph}</p>)}
        </section>
        <section className="mb-12 rounded-3xl border border-indigo-100 bg-white p-6 shadow-sm sm:p-8" aria-labelledby="workflow-heading">
          <h2 id="workflow-heading" className="mb-5 text-2xl font-bold text-slate-950">Recommended workflow</h2>
          <ol className="grid gap-3 md:grid-cols-5">{category.workflow.map((step, index) => <li key={step} className="rounded-2xl bg-slate-50 p-4"><span className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">{index + 1}</span><p className="text-sm font-semibold leading-6 text-slate-800">{step}</p></li>)}</ol>
        </section>
        <section aria-labelledby="category-tools-heading">
          <h2 id="category-tools-heading" className="mb-6 text-2xl font-bold text-slate-950">Explore {tools.length} tools</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tools.map(tool => (
              <Link key={tool.slug} href={tool.slug} className="group flex min-h-56 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-indigo-400 hover:shadow-lg">
                <span className="mb-4 text-xs font-bold uppercase tracking-wider text-indigo-600">{tool.category}</span>
                <h3 className="mb-2 text-lg font-bold text-slate-950 group-hover:text-indigo-600">{tool.name}</h3>
                <p className="mb-5 flex-1 text-sm leading-6 text-slate-600">{tool.description}</p>
                <span className="flex items-center gap-1 font-semibold text-indigo-600">Open tool <ArrowRight className="h-4 w-4" /></span>
              </Link>
            ))}
          </div>
        </section>
        <section className="mt-12 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div><h2 className="mb-5 text-2xl font-bold text-slate-950">Common questions</h2><div className="space-y-4">{category.faqs.map(faq => <article key={faq.question} className="rounded-2xl border border-slate-200 bg-white p-5"><h3 className="font-bold text-slate-950">{faq.question}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{faq.answer}</p></article>)}</div></div>
          <aside className="rounded-3xl bg-slate-950 p-6 text-white sm:p-8"><h2 className="mb-4 text-2xl font-bold">Continue the workflow</h2><p className="mb-6 leading-7 text-slate-300">Use a focused tool, then continue with a relevant guide, reusable prompt, or course. Keep links contextual instead of treating every page as related.</p><div className="grid gap-3"><Link href="/blog" className="rounded-xl bg-white/10 p-4 font-semibold hover:bg-white/15">Read practical blog guides</Link><Link href="/articles" className="rounded-xl bg-white/10 p-4 font-semibold hover:bg-white/15">Explore in-depth articles</Link><Link href="/prompts" className="rounded-xl bg-white/10 p-4 font-semibold hover:bg-white/15">Browse reusable prompts</Link><Link href="/learn" className="rounded-xl bg-white/10 p-4 font-semibold hover:bg-white/15">Follow a learning course</Link></div></aside>
        </section>
      </div>
    </main>
  );
}
