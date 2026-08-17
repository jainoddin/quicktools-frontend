import Link from 'next/link';

type RelatedPrompt = {
  title: string;
  slug: string;
  models?: string[];
  category?: string;
};

export default function RelatedPromptsLinks({ prompts = [], title = 'Related AI prompts' }: { prompts?: RelatedPrompt[]; title?: string }) {
  if (!prompts.length) return null;

  return (
    <section className="mt-10 rounded-2xl border border-indigo-100 bg-white p-5 sm:p-6" aria-labelledby="related-prompts-heading">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="related-prompts-heading" className="text-xl font-bold text-slate-900">{title}</h2>
        <Link href="/prompts/all" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">Browse all prompts →</Link>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {prompts.slice(0, 4).map((prompt) => {
          const model = String(prompt.models?.[0] || 'chatgpt').toLowerCase();
          return (
            <Link key={prompt.slug} href={`/prompts/${model}/${prompt.slug}`} className="rounded-xl border border-slate-200 p-4 transition hover:border-indigo-300 hover:bg-indigo-50/50">
              <span className="text-xs font-bold uppercase tracking-wide text-indigo-600">{prompt.category || model}</span>
              <span className="mt-1 block font-semibold text-slate-900">{prompt.title}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
