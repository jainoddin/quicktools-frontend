'use client';

import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LearnBreadcrumbs() {
  const params = useParams();
  const courseSlug = params?.courseSlug as string;
  const lessonSlug = params?.lessonSlug as string;

  const [courseTitle, setCourseTitle] = useState<string>('');
  const [lessonTitle, setLessonTitle] = useState<string>('');

  useEffect(() => {
    if (courseSlug) {
      // We can fetch the course title, or we can just format the slug for now to avoid extra fetches if not strictly needed
      // But for exact names, fetching is better.
      fetch(process.env.NEXT_PUBLIC_API_URL + `/api/learn/courses/${courseSlug}`)
        .then(res => res.json())
        .then(data => {
           if (data?.course?.title) setCourseTitle(data.course.title);
        })
        .catch(() => {});
    } else {
      setCourseTitle('');
    }
  }, [courseSlug]);

  useEffect(() => {
    if (courseSlug && lessonSlug) {
      fetch(process.env.NEXT_PUBLIC_API_URL + `/api/learn/courses/${courseSlug}/lessons/${lessonSlug}`)
        .then(res => res.json())
        .then(data => {
           if (data?.lesson?.title) setLessonTitle(data.lesson.title);
        })
        .catch(() => {});
    } else {
      setLessonTitle('');
    }
  }, [courseSlug, lessonSlug]);

  return (
    <nav className="flex items-center gap-2 text-sm text-[#6B7280] mb-6 animate-in fade-in slide-in-from-left-4 duration-500">
      <Link href="/" className="hover:text-[#111827] transition-colors flex items-center gap-1.5">
        <Home className="w-4 h-4" /> Home
      </Link>
      <ChevronRight className="w-4 h-4" />
      <Link href="/learn" className={`hover:text-[#111827] transition-colors ${!courseSlug ? 'text-[#4F46E5] font-semibold' : ''}`}>
        Learn
      </Link>

      {courseSlug && courseTitle && (
        <>
          <ChevronRight className="w-4 h-4" />
          <Link 
            href={`/learn?course=${courseSlug}`} 
            className={`hover:text-[#111827] transition-colors ${!lessonSlug ? 'text-[#4F46E5] font-semibold' : ''} truncate max-w-[200px]`}
          >
            {courseTitle}
          </Link>
        </>
      )}

      {lessonSlug && lessonTitle && (
        <>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#4F46E5] font-semibold truncate max-w-[300px]">
            {lessonTitle}
          </span>
        </>
      )}
    </nav>
  );
}
