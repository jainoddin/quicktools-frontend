import { permanentRedirect } from 'next/navigation';
import { isKnownPromptCategorySlug } from '@/lib/promptSlugs';

export default async function LegacyPromptCollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categorySlug = slug.toLowerCase().replace(/-prompts?$/, '');
  permanentRedirect(isKnownPromptCategorySlug(categorySlug) ? `/prompts/category/${categorySlug}` : '/prompts/categories');
}
