import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ChevronRight, Home } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getToolCategoryHub, getToolsForHub, toolCategoryHubs } from '@/lib/toolCategoryHubs';

const BASE_URL = 'https://quicktool.space';

export function generateStaticParams() {
  return toolCategoryHubs.map(category => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = getToolCategoryHub(slug);
  if (!category) return {};
  return {
    title: `${category.name} | QuickTools.ai`,
    description: category.description,
    alternates: { canonical: `${BASE_URL}/tools/category/${category.slug}` },
    openGraph: { title: category.name, description: category.description, url: `${BASE_URL}/tools/category/${category.slug}`, type: 'website' },
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

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-8 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="flex items-center gap-1 hover:text-indigo-600"><Home className="h-4 w-4" />Home</Link><ChevronRight className="h-4 w-4" />
          <Link href="/tools" className="hover:text-indigo-600">Tools</Link><ChevronRight className="h-4 w-4" /><span className="font-semibold text-indigo-600">{category.name}</span>
        </nav>
        <header className="mb-10 max-w-3xl">
          <h1 className="mb-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">{category.name}</h1>
          <p className="text-lg leading-8 text-slate-600">{category.description} Compare focused options below, open the tool that matches your task, and review its output before using it in professional work.</p>
        </header>
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
      </div>
    </main>
  );
}
