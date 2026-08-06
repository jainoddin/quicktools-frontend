import React from 'react';
import Link from 'next/link';
import { BookOpen, ChevronRight, Play, ArrowRight, Code, Sparkles, GraduationCap } from 'lucide-react';
import { getEndpoint } from '../../lib/api';

interface Course {
  _id: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  icon?: string;
}

export default async function HomeLearn() {
  let courses: Course[] = [];
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/learn/courses', { next: { revalidate: 300 } });
    if (res.ok) {
      const data = await res.json();
      courses = Array.isArray(data) ? data : (data.data || []);
    }
  } catch (err) {
    console.error('Failed to fetch latest courses:', err);
  }

  courses = courses.slice(0, 3);

  if (courses.length === 0) {
    return null;
  }

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] rounded-[3rem] p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl shadow-indigo-900/20 border border-indigo-500/20">
        
        {/* Animated Background Orbs */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen translate-y-1/2 -translate-x-1/4"></div>

        {/* Noise overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

        <div className="relative z-10 flex flex-col gap-12">
          
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b border-indigo-500/20 pb-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-sm font-bold mb-6 backdrop-blur-md">
                <GraduationCap className="w-4 h-4 text-indigo-400" />
                QuickTools Academy
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
                Master AI. <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  Elevate Your Career.
                </span>
              </h2>
              <p className="text-indigo-200/80 text-lg leading-relaxed max-w-xl">
                Free, interactive, step-by-step courses to master ChatGPT, Claude, Prompt Engineering, and AI automation.
              </p>
            </div>
            <Link 
              href="/learn" 
              className="group inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-indigo-50 text-indigo-900 font-bold rounded-2xl transition-all duration-300 shadow-xl shadow-white/5 hover:shadow-indigo-500/20 hover:-translate-y-1"
            >
              Start Learning Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Courses Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {courses.map((course, idx) => (
              <Link 
                href={`/learn?course=${course.slug}`} 
                key={course._id}
                className="group relative flex flex-col bg-[#1e293b]/50 backdrop-blur-xl border border-indigo-500/10 hover:border-indigo-500/40 rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(79,70,229,0.3)]"
              >
                {/* Image Container with Hover Scale */}
                <div className="relative h-56 overflow-hidden">
                  {/* Removed the dark overlay to ensure pure white background at all times */}
                  {course.coverImage ? (
                    <img 
                      src={course.coverImage} 
                      alt={course.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                  ) : course.icon ? (
                    <div className="w-full h-full bg-white flex items-center justify-center">
                      <img src={course.icon} alt={course.title} className="w-32 h-32 sm:w-40 sm:h-40 object-contain drop-shadow-lg opacity-100 group-hover:scale-110 transition-all duration-500" />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-white flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-indigo-200" />
                    </div>
                  )}
                </div>


                {/* Content */}
                <div className="p-6 sm:p-8 flex-grow flex flex-col">
                  <div className="inline-flex items-center gap-1.5 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-3">
                    <Sparkles className="w-3.5 h-3.5" />
                    Featured Course
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors line-clamp-2 leading-tight">
                    {course.title}
                  </h3>
                  <p className="text-indigo-200/70 text-sm line-clamp-2 leading-relaxed mb-6 flex-grow">
                    {course.description}
                  </p>
                  
                  {/* Footer interaction */}
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-indigo-500/10">
                    <span className="text-sm font-semibold text-white">View Curriculum</span>
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
                      <ChevronRight className="w-4 h-4 text-indigo-300 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
