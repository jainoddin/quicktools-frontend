'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

const fixedLabels: Record<string, string> = {
  prompts: 'Prompts',
  chatgpt: 'ChatGPT',
  claude: 'Claude',
  gemini: 'Gemini',
  category: 'Categories',
  categories: 'Categories',
  collections: 'Collections',
  generator: 'Prompt Generator',
};

function segmentLabel(segment: string) {
  if (fixedLabels[segment]) return fixedLabels[segment];
  return decodeURIComponent(segment)
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, letter => letter.toUpperCase());
}

function segmentHref(segments: string[], index: number) {
  const segment = segments[index];

  if (segment === 'category') return '/prompts/categories';
  if (segment === 'collections') return '/prompts';

  return `/${segments.slice(0, index + 1).join('/')}`;
}

export default function PromptBreadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const crumbs = segments.map((segment, index) => ({
    label: segmentLabel(segment),
    href: segmentHref(segments, index),
  }));

  return (
    <nav aria-label="Breadcrumb" className="bg-slate-50/90">
      <ol className="mx-auto flex max-w-[1440px] items-center gap-2 overflow-x-auto px-4 pb-[25px] pt-[10px] text-sm font-medium text-[#6B7280] sm:px-6 lg:px-8 [scrollbar-width:none]">
        <li className="shrink-0">
          <Link href="/" className="flex items-center gap-1.5 transition-colors hover:text-[#111827]">
            <Home className="h-4 w-4" aria-hidden />
            <span>Home</span>
          </Link>
        </li>
        {crumbs.map((crumb, index) => {
          const current = index === crumbs.length - 1;
          return (
            <li key={crumb.href} className="flex min-w-0 shrink-0 items-center gap-2">
              <ChevronRight className="h-4 w-4 text-slate-400" aria-hidden />
              {current ? (
                <span aria-current="page" className="max-w-[260px] truncate font-bold text-indigo-600">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="transition-colors hover:text-[#111827]">{crumb.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
