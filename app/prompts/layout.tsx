import type { ReactNode } from 'react';
import PromptBreadcrumbs from '@/components/prompts/PromptBreadcrumbs';

export default function PromptsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PromptBreadcrumbs />
      {children}
    </>
  );
}
