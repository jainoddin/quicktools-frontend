import type { Metadata } from 'next';

export const PROMPT_OG_IMAGE = 'https://pub-68a98c57e70a4a1fa317739dd20098b9.r2.dev/2016d9e2-797d-46ce-888e-1179fac50d79.png';

export function promptMetadata(title: string, description: string, canonical: string): Metadata {
  // Root layout appends the site name. Keep page-specific titles compact.
  const cleanTitle = title.replace(/\s+/g, ' ').trim();
  const metaTitle = cleanTitle.length > 44
    ? `${cleanTitle.slice(0, 43).replace(/\s+\S*$/, '').trim()}…`
    : cleanTitle;

  const cleanDescription = description.replace(/\s+/g, ' ').trim();
  const helpfulSuffix = ' Browse, copy, customize, and use ready-to-use prompts free on QuickTools.ai.';
  const expandedDescription = cleanDescription.length < 110
    ? `${cleanDescription.replace(/[.!?]?$/, '.')}${helpfulSuffix}`
    : cleanDescription;
  const metaDescription = expandedDescription.length > 160
    ? `${expandedDescription.slice(0, 159).replace(/\s+\S*$/, '').trim()}…`
    : expandedDescription;

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      type: 'website', url: canonical, title: metaTitle, description: metaDescription,
      siteName: 'QuickTools.ai',
      images: [{ url: PROMPT_OG_IMAGE, width: 1200, height: 630, alt: 'QuickTools.ai Prompt Hub' }],
    },
    twitter: { card: 'summary_large_image', title: metaTitle, description: metaDescription, images: [PROMPT_OG_IMAGE] },
  };
}
