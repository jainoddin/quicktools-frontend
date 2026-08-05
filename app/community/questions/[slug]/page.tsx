import React from 'react';
import type { Metadata } from 'next';
import { getEndpoint } from '../../../../lib/api';
import QuestionClient from './QuestionClient';

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
      title: "Question Not Found | QuickTools Community",
    };
  }

  const title = `${question.title} - QuickTools Community`;
  const description = question.excerpt || question.body?.substring(0, 160) || "Join the discussion on QuickTools Community.";

  return {
    metadataBase: new URL('https://quicktool.space'),
    title,
    description,
    authors: [{ name: question.author?.name }],
    alternates: {
      canonical: `/community/questions/${slug}`,
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
