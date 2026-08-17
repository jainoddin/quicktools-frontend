import React from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock, Calendar, BookOpen, Code, Play, FileQuestion, FileText } from 'lucide-react';
import DynamicContentRenderer from '@/components/learn/DynamicContentRenderer';
import { LEARN_UPDATE_BADGE_DAYS } from '@/lib/constants';
import { getEndpoint } from '@/lib/api';
import RelevantToolsLinks from '@/components/shared/RelevantToolsLinks';
import RelatedPromptsLinks from '@/components/shared/RelatedPromptsLinks';

type Props = {
  params: { courseSlug: string; lessonSlug: string }
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const res = await fetch(getEndpoint(`/api/learn/courses/${resolvedParams.courseSlug}/lessons/${resolvedParams.lessonSlug}`), { cache: 'no-store' });
  
  if (!res.ok) {
    return { title: 'Lesson Not Found' };
  }

  const data = await res.json();
  const { lesson, course } = data; 

  const courseRes = await fetch(getEndpoint(`/api/learn/courses/${resolvedParams.courseSlug}`), { cache: 'no-store' });
  const courseData = courseRes.ok ? await courseRes.json() : null;
  const courseTitle = course?.title || courseData?.course?.title || resolvedParams.courseSlug.charAt(0).toUpperCase() + resolvedParams.courseSlug.slice(1);

  const keywords = [
    courseTitle,
    `${courseTitle} tutorial`,
    `Learn ${courseTitle}`,
    `${courseTitle} A-Z`,
    `${courseTitle} beginner guide`,
    `${courseTitle} prompts`,
    `${courseTitle} AI`,
    "QuickTool Learn",
    lesson.title,
    `${courseTitle} ${lesson.title}`
  ];

  if (lesson.seoKeywords && lesson.seoKeywords.length > 0) {
    keywords.push(...lesson.seoKeywords);
  }

  const defaultDesc = `Learn ${courseTitle} AI from beginner to advanced with the QuickTool Learn platform. ${lesson.excerpt ? lesson.excerpt : `Understand ${courseTitle} and master it through step-by-step interactive lessons.`}`;
  const finalDescription = lesson.seoDescription || defaultDesc;

  return {
    title: lesson.seoTitle || `${lesson.title} - QuickTool Learn`,
    description: finalDescription,
    keywords: keywords,
    alternates: {
      canonical: lesson.canonicalUrl || `https://quicktool.space/learn/${resolvedParams.courseSlug}/${resolvedParams.lessonSlug}`,
    },
    openGraph: {
      title: lesson.seoTitle || lesson.title,
      description: finalDescription,
      type: 'article',
      publishedTime: lesson.publishedAt,
      modifiedTime: lesson.lastUpdatedAt,
      url: lesson.canonicalUrl || `https://quicktool.space/learn/${resolvedParams.courseSlug}/${resolvedParams.lessonSlug}`,
      images: [{ url: 'https://pub-68a98c57e70a4a1fa317739dd20098b9.r2.dev/2016d9e2-797d-46ce-888e-1179fac50d79.png', width: 1200, height: 630, alt: `${courseTitle} lesson on QuickTool Learn` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: lesson.seoTitle || lesson.title,
      description: finalDescription,
      images: ['https://pub-68a98c57e70a4a1fa317739dd20098b9.r2.dev/2016d9e2-797d-46ce-888e-1179fac50d79.png'],
    }
  };
}

export default async function LessonPage({ params }: Props) {
  const resolvedParams = await params;
  const url = getEndpoint(`/api/learn/courses/${resolvedParams.courseSlug}/lessons/${resolvedParams.lessonSlug}`);
  const res = await fetch(url, { cache: 'no-store' });
  
  if (!res.ok) {
    notFound();
  }

  let data;
  try {
    data = await res.json();
  } catch (err: any) {
    notFound();
  }
  const { lesson, previousLesson, nextLesson, relatedPrompts = [] } = data;

  if (!lesson) {
    notFound();
  }

  const courseTitle = data.course?.title || resolvedParams.courseSlug.charAt(0).toUpperCase() + resolvedParams.courseSlug.slice(1);

  return (
    <article className="max-w-3xl mx-auto pb-16">
      {/* JSON-LD structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LearningResource",
            "name": lesson.title,
            "description": lesson.excerpt,
            "learningResourceType": "Lesson",
            "timeRequired": `PT${lesson.estimatedReadMinutes}M`,
            "datePublished": lesson.publishedAt,
            "dateModified": lesson.lastUpdatedAt
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://quicktool.space"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Learn",
                "item": "https://quicktool.space/learn"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": courseTitle,
                "item": `https://quicktool.space/learn/${resolvedParams.courseSlug}`
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": lesson.title,
                "item": `https://quicktool.space/learn/${resolvedParams.courseSlug}/${resolvedParams.lessonSlug}`
              }
            ]
          })
        }}
      />

      <header className="mb-10 pb-8 border-b border-slate-200">
        <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {lesson.estimatedReadMinutes} min read
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            Updated {new Date(lesson.lastUpdatedAt || lesson.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
            lesson.difficulty === 'Beginner' ? 'bg-emerald-100 text-emerald-700' :
            lesson.difficulty === 'Intermediate' ? 'bg-amber-100 text-amber-700' :
            'bg-rose-100 text-rose-700'
          }`}>
            {lesson.difficulty}
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
          {lesson.title}
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          {lesson.excerpt}
        </p>
      </header>

      {lesson.lastMajorUpdateAt && (() => {
        const updateDate = new Date(lesson.lastMajorUpdateAt);
        const isUpdateRecent = (Date.now() - updateDate.getTime()) <= (LEARN_UPDATE_BADGE_DAYS * 24 * 60 * 60 * 1000);
        if (!isUpdateRecent) return null;

        const validIds = new Set(lesson.contentBlocks.map((block: any) => block.id));
        const updateAnchor =
          lesson.primaryUpdateAnchor && validIds.has(lesson.primaryUpdateAnchor)
            ? lesson.primaryUpdateAnchor
            : lesson.updatedBlockIds?.find((id: string) => validIds.has(id)) ?? 'top';

        return (
          <div className="mb-8 p-5 bg-indigo-50 border border-indigo-100 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex gap-3">
              <span className="text-xl leading-none pt-0.5">🆕</span>
              <div>
                <h3 className="font-bold text-indigo-900 text-sm">
                  Updated on {updateDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </h3>
                <p className="text-sm text-indigo-700 mt-1">{lesson.updateSummary}</p>
              </div>
            </div>
            {updateAnchor && (
              <Link 
                href={`#${updateAnchor}`}
                className="flex-shrink-0 px-4 py-2 bg-white text-indigo-600 text-sm font-semibold rounded-lg shadow-sm border border-indigo-100 hover:bg-indigo-50 transition-colors self-start sm:self-auto"
              >
                See what changed
              </Link>
            )}
          </div>
        );
      })()}

      {/* Main Content Rendered Server-Side */}
      <DynamicContentRenderer blocks={lesson.contentBlocks} updatedBlockIds={lesson.updatedBlockIds} />
      <RelevantToolsLinks content={`${courseTitle} ${lesson.title} ${lesson.excerpt || ''} ${(lesson.seoKeywords || []).join(' ')}`} />
      <RelatedPromptsLinks prompts={relatedPrompts} title="Practice with related prompts" />

      {/* Footer Navigation */}
      <footer className="mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        {previousLesson ? (
          <Link 
            href={`/learn/${resolvedParams.courseSlug}/${previousLesson.slug}`}
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <div className="flex flex-col">
              <span className="text-xs text-slate-400 font-normal">Previous</span>
              <span>{previousLesson.title}</span>
            </div>
          </Link>
        ) : <div />}

        {nextLesson ? (
          <Link 
            href={`/learn/${resolvedParams.courseSlug}/${nextLesson.slug}`}
            className="flex items-center justify-end gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors w-full sm:w-auto text-right"
          >
            <div className="flex flex-col">
              <span className="text-xs text-slate-400 font-normal">Next Up</span>
              <span>{nextLesson.title}</span>
            </div>
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : <div />}
      </footer>
    </article>
  );
}
