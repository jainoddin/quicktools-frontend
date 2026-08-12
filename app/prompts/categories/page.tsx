import Link from 'next/link';
import { getEndpoint } from '@/lib/api';
import { promptCategoryToSlug } from '@/lib/promptSlugs';
import { promptMetadata } from '@/lib/promptMetadata';

export const metadata = promptMetadata('AI Prompt Categories for Every Task', 'Browse AI prompt categories for writing, business, coding, marketing, design, education, and productivity. Find and copy practical prompts free.', 'https://quicktool.space/prompts/categories');
export const revalidate = 3600;

export default async function PromptCategoriesPage() {
  let categories: Array<{ name: string; count: number }> = [];
  try { const response = await fetch(getEndpoint('/api/prompts/stats'), { next: { revalidate: 3600 } }); const data = await response.json(); categories = data?.data?.categoryCounts || []; } catch {}
  const schema = { '@context': 'https://schema.org', '@graph': [{ '@type': 'CollectionPage', name: 'AI Prompt Categories', url: 'https://quicktool.space/prompts/categories', description: 'Browse QuickTool AI prompts by task and category.', mainEntity: { '@type': 'ItemList', itemListElement: categories.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, url: `https://quicktool.space/prompts/category/${promptCategoryToSlug(item.name)}` })) } }, { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://quicktool.space' }, { '@type': 'ListItem', position: 2, name: 'AI Prompts', item: 'https://quicktool.space/prompts' }, { '@type': 'ListItem', position: 3, name: 'Categories', item: 'https://quicktool.space/prompts/categories' }] }] };
  return <main className="flex-grow bg-[#F8FAFC] py-14"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} /><div className="max-w-[1200px] mx-auto px-4 sm:px-6"><h1 className="text-4xl font-black mb-3">Prompt Categories</h1><p className="text-gray-600 mb-10">Find practical prompts by the task you want to complete.</p>{categories.length ? <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{categories.map(item => <Link key={item.name} href={`/prompts/category/${promptCategoryToSlug(item.name)}`} className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-indigo-300 hover:shadow-md transition"><h2 className="text-xl font-bold">{item.name}</h2><p className="text-gray-500 mt-2">{item.count} published prompts</p></Link>)}</div> : <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-500">Prompt categories are temporarily unavailable. Please try again shortly.</div>}</div></main>;
}
