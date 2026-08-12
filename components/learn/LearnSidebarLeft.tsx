'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { BookOpen, ChevronDown, ChevronRight, FileText } from 'lucide-react';
import { getEndpoint } from '@/lib/api';

export default function LearnSidebarLeft() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCourseSlug = (params?.courseSlug as string) || (searchParams?.get('course') as string);
  const currentLessonSlug = params?.lessonSlug as string;

  useEffect(() => {
    fetch(getEndpoint('/api/learn/courses'))
      .then(res => res.json())
      .then(data => {
        const coursesList = Array.isArray(data) ? data : [];
        setCourses(coursesList);
        if (coursesList.length > 0 && !currentCourseSlug) {
          setExpandedCourse(coursesList[0].slug);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [currentCourseSlug]);

  useEffect(() => {
    if (currentCourseSlug) {
      setExpandedCourse(currentCourseSlug);
    }
  }, [currentCourseSlug]);

  if (loading) {
    return <div className="p-6 text-slate-500 animate-pulse">Loading courses...</div>;
  }

  return (
    <div className="flex flex-col h-full bg-transparent">
      <div className="py-4 mb-4 border-b border-slate-200">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          QuickTool Learn
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-3">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Courses</p>
        
        {courses.map(course => (
          <div key={course._id} className="border border-indigo-100 rounded-xl bg-white shadow-sm overflow-hidden">
            <button 
              onClick={() => {
                const isExpanded = expandedCourse === course.slug;
                setExpandedCourse(isExpanded ? null : course.slug);
                if (!isExpanded && !params?.courseSlug) {
                  router.push(`?course=${course.slug}`, { scroll: false });
                }
              }}
              className="w-full flex items-center justify-between p-3 text-left hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-800">{course.title}</span>
              </div>
              {expandedCourse === course.slug ? (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-slate-400" />
              )}
            </button>
            
            {expandedCourse === course.slug && (
              <div className="bg-white border-t border-slate-100 p-2">
                <CourseLessonList courseSlug={course.slug} currentLessonSlug={currentLessonSlug} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

import { LEARN_UPDATE_BADGE_DAYS } from '@/lib/constants';

function CourseLessonList({ courseSlug, currentLessonSlug }: { courseSlug: string, currentLessonSlug?: string }) {
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(getEndpoint(`/api/learn/courses/${courseSlug}`))
      .then(res => res.json())
      .then(data => {
        setLessons(data.lessons || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [courseSlug]);

  if (loading) return <div className="text-xs text-slate-400 p-2 animate-pulse">Loading lessons...</div>;
  if (!lessons.length) return <div className="text-xs text-slate-400 p-2">No lessons yet.</div>;

  return (
    <ul className="space-y-1">
      {lessons.map((lesson) => {
        const isActive = currentLessonSlug === lesson.slug;
        const isRecent = lesson.lastMajorUpdateAt && (new Date().getTime() - new Date(lesson.lastMajorUpdateAt).getTime()) < LEARN_UPDATE_BADGE_DAYS * 24 * 60 * 60 * 1000;
        
        return (
          <li key={lesson._id}>
            <Link 
              href={`/learn/${courseSlug}/${lesson.slug}`}
              className={`flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                isActive 
                  ? 'bg-indigo-100 text-indigo-700 font-medium' 
                  : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <FileText className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span className="truncate">{lesson.title}</span>
              </div>
              {isRecent && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-sm font-bold flex-shrink-0 ml-2 ${
                  lesson.updateType === 'new_lesson' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {lesson.updateType === 'new_lesson' ? 'New' : 'Updated'}
                </span>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
