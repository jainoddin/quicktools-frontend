const categorySlugMap: Record<string, string> = {
  business: 'Business',
  career: 'Career',
  coding: 'Coding',
  'design-image': 'Design / Image',
  education: 'Education',
  marketing: 'Marketing',
  productivity: 'Productivity',
  seo: 'SEO',
  'social-media': 'Social Media',
  writing: 'Writing',
};

export function isKnownPromptCategorySlug(slug: string) {
  try { return Object.prototype.hasOwnProperty.call(categorySlugMap, decodeURIComponent(slug).toLowerCase()); }
  catch { return false; }
}

export function promptCategoryToSlug(category: string) {
  return category
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function promptSlugToCategory(slug: string) {
  const normalized = decodeURIComponent(slug).toLowerCase();
  return categorySlugMap[normalized] || normalized.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
}
