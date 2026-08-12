import React from 'react';
import type { Metadata } from 'next';
import { getEndpoint } from '../../../../lib/api';
import QuestionClient from './QuestionClient';

const COMMUNITY_TITLE_SUFFIX = ' | QuickTool';
const MAX_SEO_TITLE_LENGTH = 60;

function buildCommunitySeoTitle(questionTitle: string) {
  const cleanTitle = questionTitle.replace(/\s+/g, ' ').trim();
  const maxQuestionLength = MAX_SEO_TITLE_LENGTH - COMMUNITY_TITLE_SUFFIX.length - 1;

  if (cleanTitle.length <= maxQuestionLength) {
    return `${cleanTitle}${COMMUNITY_TITLE_SUFFIX}`;
  }

  const clipped = cleanTitle.slice(0, maxQuestionLength);
  const lastSpace = clipped.lastIndexOf(' ');
  const readableCut = lastSpace >= Math.floor(maxQuestionLength * 0.7)
    ? clipped.slice(0, lastSpace)
    : clipped;

  return `${readableCut.trimEnd()}…${COMMUNITY_TITLE_SUFFIX}`;
}

async function fetchQuestion(slug: string) {
  try {
    const res = await fetch(getEndpoint(`/api/community/questions/${slug}`), {
      next: { revalidate: 60 } // Revalidate every minute
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (e) {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const question = await fetchQuestion(slug);

  if (!question) {
    return {
      title: { absolute: "Question Not Found | QuickTool" },
    };
  }

  const title = buildCommunitySeoTitle(question.title);
  const description = question.excerpt || question.body?.substring(0, 160) || "Join the discussion on QuickTool Community.";
  
  const titleWords = question.title.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(' ').filter((w: string) => w.length > 3 && !['how', 'to', 'use', 'with', 'using', 'what', 'the', 'is', 'for', 'and', 'can', 'you'].includes(w));
  const dynamicKeywords = [
    question.title,
    ...(question.tags || []),
    ...titleWords,
    ...titleWords.map((w: string) => `AI ${w}`),
    "QuickTool community",
    "AI community",
    "AI tools forum"
  ];

  return {
    metadataBase: new URL('https://quicktool.space'),
    title: { absolute: title },
    description,
    keywords: Array.from(new Set(dynamicKeywords)),
    authors: [{ name: question.author?.name }],
    alternates: {
      canonical: `https://quicktool.space/community/questions/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://quicktool.space/community/questions/${slug}`,
      publishedTime: question.createdAt,
      modifiedTime: question.updatedAt || question.createdAt,
      authors: [question.author?.name],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    }
  };
}

export default async function QuestionPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const question = await fetchQuestion(slug);

  const jsonLd = question ? {
    "@context": "https://schema.org",
    "@type": "QAPage",
    "mainEntity": {
      "@type": "Question",
      "name": question.title,
      "text": question.body,
      "answerCount": question.answers?.length || 0,
      "upvoteCount": question.likes || 0,
      "dateCreated": question.createdAt,
      "author": {
        "@type": "Person",
        "name": question.author?.name
      },
      "suggestedAnswer": (question.answers || []).map((ans: any) => ({
        "@type": "Answer",
        "text": ans.body,
        "dateCreated": ans.createdAt,
        "upvoteCount": ans.likes || 0,
        "author": {
          "@type": "Person",
          "name": ans.author?.name
        }
      }))
    }
  } : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <QuestionClient slug={slug} />
    </>
  );
}
