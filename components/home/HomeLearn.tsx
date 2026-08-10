import Link from 'next/link';
import { ArrowRight, BookOpen, ChevronRight, GraduationCap } from 'lucide-react';
import { getEndpoint } from '../../lib/api';

interface Course {
  _id: string;
  slug: string;
  title: string;
}

export default async function HomeLearn() {
  let courses: Course[] = [];
  try {
    const res = await fetch(getEndpoint('/api/learn/courses'), { next: { revalidate: 300 } });
    if (res.ok) {
      const data = await res.json();
      courses = (Array.isArray(data) ? data : (data.data || [])).slice(0, 3);
    }
  } catch (error) {
    console.error('Failed to fetch latest courses:', error);
  }

  if (!courses.length) return null;

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="relative overflow-hidden rounded-[28px] border border-indigo-500/20 bg-gradient-to-r from-[#0f172a] via-[#211e58] to-[#17143f] px-5 py-6 sm:px-7 lg:px-9 shadow-xl shadow-indigo-900/10">
        <div className="absolute -right-10 -top-24 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 grid items-center gap-6 lg:grid-cols-[1.25fr_1.5fr_auto]">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-indigo-300 mb-2">
              <GraduationCap className="w-4 h-4" /> QuickTools Academy
            </div>
            <h2 className="text-2xl sm:text-3xl font-black leading-tight text-white">
              Master AI. <span className="text-indigo-300">Grow faster.</span>
            </h2>
            <p className="mt-2 max-w-md text-sm leading-5 text-indigo-100/70">Free step-by-step courses for ChatGPT, Claude, Gemini, and AI productivity.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {courses.map(course => (
              <Link key={course._id} href={`/learn?course=${course.slug}`} className="group flex min-w-0 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.07] px-3 py-3 hover:border-indigo-300/40 hover:bg-white/[0.12] transition-colors">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-400/15 text-indigo-200"><BookOpen className="w-4 h-4" /></span>
                <span className="min-w-0 flex-1 truncate text-sm font-bold text-white">{course.title}</span>
                <ChevronRight className="w-4 h-4 shrink-0 text-indigo-300 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ))}
          </div>

          <Link href="/learn" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-white px-5 py-3 text-sm font-bold text-indigo-900 shadow-md hover:bg-indigo-50 transition-colors">
            Start Learning <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
