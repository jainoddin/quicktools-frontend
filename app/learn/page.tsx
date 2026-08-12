import React from 'react';
import Link from 'next/link';
import { BookOpen, Clock, ArrowRight, Play, Users, Award, Target, FileText, Zap, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import { LEARN_UPDATE_BADGE_DAYS } from '@/lib/constants';
import { getEndpoint } from '@/lib/api';

export const metadata = {
  title: {
    absolute: 'Learn AI with ChatGPT, Claude & Gemini | QuickTool Learn',
  },
  description: 'Learn ChatGPT, Claude, Gemini, Cursor, and more with step-by-step AI courses, tutorials, prompts, and practical lessons on QuickTool Learn.',
  keywords: [
    'AI learning', 'AI courses', 'AI tutorials', 'Learn ChatGPT',
    'Learn Claude', 'Learn Gemini', 'Learn Cursor AI', 'AI education',
    'Prompt engineering', 'AI certification', 'QuickTool Learn', 'AI training'
  ],
  alternates: {
    canonical: 'https://quicktool.space/learn',
  },
  openGraph: { title: 'Learn AI with ChatGPT, Claude & Gemini', description: 'Step-by-step AI courses, tutorials, prompts, and practical lessons on QuickTool Learn.', url: 'https://quicktool.space/learn', type: 'website', images: [{ url: 'https://pub-68a98c57e70a4a1fa317739dd20098b9.r2.dev/2016d9e2-797d-46ce-888e-1179fac50d79.png', width: 1200, height: 630, alt: 'QuickTool Learn' }] },
  twitter: { card: 'summary_large_image', title: 'Learn AI with QuickTool Learn', description: 'Step-by-step practical AI courses.', images: ['https://pub-68a98c57e70a4a1fa317739dd20098b9.r2.dev/2016d9e2-797d-46ce-888e-1179fac50d79.png'] }
};

export default async function LearnPage({ searchParams }: { searchParams: Promise<{ course?: string }> }) {
  const resolvedParams = await searchParams;
  let courses = [];
  try {
    const res = await fetch(getEndpoint('/api/learn/courses'), { cache: 'no-store' });
    if (res.ok) {
      courses = await res.json();
    }
  } catch (err) {
    console.error('Failed to fetch courses:', err);
  }

  const R2 = 'https://pub-0a928134dcdc420da2af02e6238ef06b.r2.dev/learn-logos';

  // Find active course based on search params, or default to the first one
  const activeCourse = courses.find((c: any) => c.slug === resolvedParams?.course) || courses[0];
  
  let latestUpdate = null;
  if (activeCourse) {
    try {
      const res = await fetch(getEndpoint(`/api/learn/courses/${activeCourse.slug}`), { cache: 'no-store' });
      if (res.ok) {
        const activeCourseData = await res.json();
        const now = new Date().getTime();
        const updatedLessons = (activeCourseData.lessons || []).filter((l: any) => {
          if (!l.lastMajorUpdateAt) return false;
          const diffDays = (now - new Date(l.lastMajorUpdateAt).getTime()) / (1000 * 60 * 60 * 24);
          return diffDays <= LEARN_UPDATE_BADGE_DAYS;
        });
        updatedLessons.sort((a: any, b: any) => new Date(b.lastMajorUpdateAt).getTime() - new Date(a.lastMajorUpdateAt).getTime());
        if (updatedLessons.length > 0) {
          latestUpdate = updatedLessons[0];
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
  
  const courseColors: Record<string, { 
    textGradient: string; 
    bgGradient: string; 
    glow: string; 
    dotBg: string;
    dotInner: string;
    barFill: string;
    bottomBar: string;
    bottomBarShadow: string;
  }> = {
    chatgpt: {
      textGradient: 'from-emerald-500 to-teal-600',
      bgGradient: 'from-emerald-100 to-teal-50',
      glow: 'bg-emerald-400',
      dotBg: 'bg-emerald-100',
      dotInner: 'bg-emerald-500',
      barFill: 'bg-emerald-100',
      bottomBar: 'bg-emerald-400',
      bottomBarShadow: 'shadow-[0_0_10px_rgba(52,211,153,0.5)]'
    },
    claude: {
      textGradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-100 to-red-50',
      glow: 'bg-orange-400',
      dotBg: 'bg-orange-100',
      dotInner: 'bg-orange-500',
      barFill: 'bg-orange-100',
      bottomBar: 'bg-orange-400',
      bottomBarShadow: 'shadow-[0_0_10px_rgba(251,146,60,0.5)]'
    },
    gemini: {
      textGradient: 'from-blue-500 to-purple-600',
      bgGradient: 'from-blue-100 to-purple-50',
      glow: 'bg-blue-400',
      dotBg: 'bg-blue-100',
      dotInner: 'bg-blue-500',
      barFill: 'bg-blue-100',
      bottomBar: 'bg-blue-400',
      bottomBarShadow: 'shadow-[0_0_10px_rgba(96,165,250,0.5)]'
    },
    cursor: {
      textGradient: 'from-slate-700 to-slate-900',
      bgGradient: 'from-slate-200 to-slate-100',
      glow: 'bg-slate-400',
      dotBg: 'bg-slate-200',
      dotInner: 'bg-slate-600',
      barFill: 'bg-slate-200',
      bottomBar: 'bg-slate-500',
      bottomBarShadow: 'shadow-[0_0_10px_rgba(100,116,139,0.5)]'
    },
    perplexity: {
      textGradient: 'from-cyan-500 to-blue-600',
      bgGradient: 'from-cyan-100 to-blue-50',
      glow: 'bg-cyan-400',
      dotBg: 'bg-cyan-100',
      dotInner: 'bg-cyan-500',
      barFill: 'bg-cyan-100',
      bottomBar: 'bg-cyan-400',
      bottomBarShadow: 'shadow-[0_0_10px_rgba(34,211,238,0.5)]'
    },
    prompthub: {
      textGradient: 'from-indigo-600 to-purple-600',
      bgGradient: 'from-indigo-100 to-purple-50',
      glow: 'bg-indigo-400',
      dotBg: 'bg-indigo-100',
      dotInner: 'bg-indigo-500',
      barFill: 'bg-indigo-100',
      bottomBar: 'bg-indigo-400',
      bottomBarShadow: 'shadow-[0_0_10px_rgba(129,140,248,0.5)]'
    }
  };

  const activeColors = courseColors[activeCourse?.slug] || courseColors.prompthub;
  
  // If no courses yet, provide fallback empty state
  if (!activeCourse) {
    return <div className="p-12 text-center bg-white border border-slate-200 rounded-2xl"><BookOpen className="w-12 h-12 text-indigo-300 mx-auto mb-4" /><h1 className="text-2xl font-black text-slate-900 mb-2">Courses are temporarily unavailable</h1><p className="text-slate-500 mb-6">Please try again shortly or explore our free AI tools.</p><Link href="/tools" className="inline-flex items-center gap-2 bg-indigo-600 text-white font-bold px-5 py-2.5 rounded-xl">Explore AI tools <ArrowRight className="w-4 h-4" /></Link></div>;
  }

  return (
    <div className="space-y-16 animate-fade-in -mx-8 -mt-8 -mb-12 px-8 pt-8 pb-12">
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
              }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": courses.map((course: any, index: number) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "WebPage",
                "url": `https://quicktool.space/learn/${course.slug}/${course.firstLessonSlug || '1-introduction'}`,
                "name": course.title,
                "description": course.description
              }
            }))
          })
        }}
      />
      {/* HERO SECTION */}
      <div className="flex flex-col xl:flex-row items-center gap-12 pt-4">
        {/* Left Side: Copy & CTA */}
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
              Learn <span className={`text-transparent bg-clip-text bg-gradient-to-r ${activeColors.textGradient}`}>{activeCourse.title}</span> The Right Way
            </h1>
            <p className="text-base text-slate-600 max-w-lg leading-relaxed">
              {activeCourse.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
              <BookOpen className="w-3.5 h-3.5" /> {activeCourse.lessonCount} Lessons
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
              <Target className="w-3.5 h-3.5" /> Beginner to Advanced
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 text-xs font-bold border border-amber-100">
              <Zap className="w-3.5 h-3.5" /> Practical Examples
            </span>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <Link 
              href={`/learn/${activeCourse.slug}/${activeCourse.firstLessonSlug || '1-introduction'}`}
              className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-bold transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2 group"
            >
              Start Learning Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Latest Update Card */}
          {latestUpdate && (
            <div className="mt-8 border border-slate-200 bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🔥</span>
                <h3 className="font-bold text-slate-900">Latest Update</h3>
              </div>
              <p className="text-sm text-slate-600 mb-4">{latestUpdate.updateSummary}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Updated on {new Date(latestUpdate.lastMajorUpdateAt).toLocaleDateString()}</span>
                <Link 
                  href={`/learn/${activeCourse.slug}/${latestUpdate.slug}${latestUpdate.primaryUpdateAnchor ? `#${latestUpdate.primaryUpdateAnchor}` : ''}`}
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group"
                >
                  Explore Update
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Big Visual Card */}
        <div className="flex-1 w-full max-w-lg hidden lg:block relative">
          <div className={`absolute inset-0 bg-gradient-to-tr ${activeColors.bgGradient} rounded-3xl transform rotate-3 scale-105 opacity-50`}></div>
          <div className="relative bg-white border border-slate-200 shadow-2xl rounded-3xl p-8 overflow-hidden">
            {/* Decorative Glow */}
            <div className={`absolute -top-24 -right-24 w-48 h-48 ${activeColors.glow} opacity-20 blur-3xl rounded-full`}></div>
            
            <div className="flex items-start gap-8">
              <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center shadow-xl transform -rotate-6 border border-slate-100">
                <img src={activeCourse.icon} alt={activeCourse.title} className="w-20 h-20 object-contain drop-shadow-md" />
              </div>
              <div className="flex-1 space-y-4 pt-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full ${activeColors.dotBg} flex items-center justify-center`}>
                      <div className={`w-2.5 h-2.5 rounded-full ${activeColors.dotInner}`}></div>
                    </div>
                    <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`w-3/4 h-full ${activeColors.barFill} rounded-full`}></div>
                    </div>
                  </div>
                ))}
                <div className={`mt-6 h-2 w-1/3 ${activeColors.bottomBar} rounded-full ${activeColors.bottomBarShadow}`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STATS ROW */}
      <div className="grid grid-cols-2 gap-4 max-w-lg">
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xl font-black text-slate-900 leading-none">{courses.length}</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">Courses</p>
          </div>
        </div>
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <Play className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xl font-black text-slate-900 leading-none">{courses.reduce((sum: number, c: any) => sum + (c.lessonCount || 0), 0)}</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">Lessons</p>
          </div>
        </div>
      </div>

      {/* COURSES GRID */}
      <div>
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Explore Our Courses</h2>
            <p className="text-slate-600 mt-1">Master AI tools with structured learning paths</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Active Course(s) */}
          {courses.map((course: any) => (
            <Link 
              key={course._id} 
              href={`/learn/${course.slug}/${course.firstLessonSlug || '1-introduction'}`}
              className="group flex flex-col bg-white border-2 border-indigo-100 rounded-2xl overflow-hidden hover:shadow-xl hover:border-indigo-400 transition-all cursor-pointer relative"
            >
              <div className="absolute top-4 left-4 bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm z-10">
                {course.lessonCount} Lessons
              </div>
              <div className="h-40 bg-white flex items-center justify-center p-6 border-b border-indigo-100 relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50"></div>
                 <img src={course.icon} alt={course.title} className="relative z-10 w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-lg" />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-slate-900 mb-1.5">{course.title}</h3>
                <p className="text-xs text-slate-600 mb-5 flex-1 line-clamp-2">{course.description}</p>
                <div className="flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:text-indigo-700 transition-colors">
                  <span className="flex items-center gap-1.5"><Target className="w-4 h-4" /> Beginner to Advanced</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}


        </div>
      </div>

      {/* SEO Content Block */}
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 text-slate-600 space-y-6 text-sm leading-relaxed mb-8">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Master the Best AI Tools on QuickTool Learn</h2>
        
        <div>
          <h3 className="font-bold text-slate-800 mb-1">ChatGPT Course</h3>
          <p>Learn how to use OpenAI's ChatGPT effectively. Our tutorials cover everything from basic prompt engineering and interface navigation to advanced automation, data analysis, and custom GPT creation. Perfect for beginners and advanced users looking to boost productivity.</p>
        </div>
        
        <div>
          <h3 className="font-bold text-slate-800 mb-1">Claude AI Tutorial</h3>
          <p>Discover the power of Anthropic's Claude. We provide structured guides on utilizing Claude's massive context window, superior coding abilities, and nuanced writing skills. Learn how to craft the perfect prompts for long-form content and complex problem-solving.</p>
        </div>
        
        <div>
          <h3 className="font-bold text-slate-800 mb-1">Gemini AI Guide</h3>
          <p>Explore Google Gemini's multimodal capabilities. Our step-by-step courses teach you how to analyze images, integrate with Google Workspace, and write highly efficient prompts for Gemini Advanced.</p>
        </div>
        
        <div>
          <h3 className="font-bold text-slate-800 mb-1">Cursor & Perplexity</h3>
          <p>Supercharge your coding and research workflows. Learn how to use Cursor AI as an intelligent IDE assistant and master Perplexity AI for deep, accurate, and cited web research.</p>
        </div>
      </div>

      {/* FEATURES FOOTER */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-slate-100">
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center"><Target className="w-4 h-4" /></div>
          <div>
            <h4 className="font-bold text-slate-900 text-xs">Learn by Doing</h4>
            <p className="text-[10px] text-slate-500 mt-0.5">Hands-on examples</p>
          </div>
        </div>
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center"><FileText className="w-4 h-4" /></div>
          <div>
            <h4 className="font-bold text-slate-900 text-xs">Step-by-Step</h4>
            <p className="text-[10px] text-slate-500 mt-0.5">Structured lessons</p>
          </div>
        </div>
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center"><Zap className="w-4 h-4" /></div>
          <div>
            <h4 className="font-bold text-slate-900 text-xs">Stay Updated</h4>
            <p className="text-[10px] text-slate-500 mt-0.5">Latest features</p>
          </div>
        </div>
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center"><Users className="w-4 h-4" /></div>
          <div>
            <h4 className="font-bold text-slate-900 text-xs">Community</h4>
            <p className="text-[10px] text-slate-500 mt-0.5">Get help from experts</p>
          </div>
        </div>
      </div>
    </div>
  );
}
