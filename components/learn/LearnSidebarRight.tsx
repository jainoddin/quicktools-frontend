'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ExternalLink, MessageCircle, FileText } from 'lucide-react';

export default function LearnSidebarRight() {
  const params = useParams();
  const currentCourseSlug = params?.courseSlug as string;
  const currentLessonSlug = params?.lessonSlug as string;

  const [lesson, setLesson] = useState<any>(null);

  useEffect(() => {
    if (!currentCourseSlug || !currentLessonSlug) {
      setLesson(null);
      return;
    }
    
    fetch(process.env.NEXT_PUBLIC_API_URL + `/api/learn/courses/${currentCourseSlug}/lessons/${currentLessonSlug}`)
      .then(res => res.json())
      .then(data => {
        setLesson(data.lesson || null);
      })
      .catch(() => setLesson(null));
  }, [currentCourseSlug, currentLessonSlug]);

  // Extract headings from content blocks
  const headings = lesson?.contentBlocks?.filter((block: any) => block.type === 'heading') || [];

  if (!currentLessonSlug) {
    return null; // Don't show right sidebar on course overview page
  }

  return (
    <div className="flex flex-col h-full bg-transparent">
      
      <div className="flex-1 overflow-y-auto space-y-8">
        {/* On This Page section */}
        {headings.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">On This Page</h3>
            <ul className="space-y-2">
              {headings.map((heading: any, index: number) => {
                const key = heading.id || `heading-${index}`;
                const title = heading.title || heading.content || 'Heading';
                return (
                  <li key={key} className={`${heading.level > 2 ? 'ml-4' : ''}`}>
                    <a 
                      href={`#${key}`} 
                      className="text-sm text-slate-600 hover:text-indigo-600 transition-colors"
                    >
                      {title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Need Help Box */}
        <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
          <h3 className="text-sm font-bold text-indigo-900 mb-2 flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-indigo-600" />
            Need Help?
          </h3>
          <p className="text-xs text-indigo-800/80 mb-4 leading-relaxed">
            Ask the community if you have any questions or get stuck on this lesson.
          </p>
          <Link 
            href="/community"
            className="block w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold text-center rounded-lg transition-colors"
          >
            Ask in Community
          </Link>
        </div>

        {/* Lesson Resources */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Resources</h3>
          <ul className="space-y-2">
            <li>
              <button className="flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600 transition-colors">
                <FileText className="w-4 h-4" />
                Download Cheat Sheet
              </button>
            </li>
            <li>
              <button className="flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600 transition-colors">
                <ExternalLink className="w-4 h-4" />
                Official Documentation
              </button>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
