import React from 'react';
import Link from 'next/link';
import { getEndpoint } from '../../lib/api';
import { MessageSquare, ThumbsUp, ArrowRight, User, Users } from 'lucide-react';

function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return `${seconds} seconds ago`;
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days} days ago`;
  const months = Math.round(days / 30);
  if (months < 12) return `${months} months ago`;
  const years = Math.round(months / 12);
  return `${years} years ago`;
}

async function fetchLatestQuestions() {
  try {
    const res = await fetch(getEndpoint('/api/community/questions?limit=4'), {
      next: { revalidate: 60 }
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (e) {
    return [];
  }
}

export default async function LatestCommunity() {
  const questions = await fetchLatestQuestions();

  if (!questions || questions.length === 0) return null;

  return (
    <section className="py-20 bg-[#F8FAFC] relative overflow-hidden border-t border-gray-100">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-100/40 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 animate-pulse" style={{ animationDuration: '4s' }}></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold mb-4 border border-indigo-100">
              <Users className="w-4 h-4" />
              Community
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">
              Join the Conversation
            </h2>
            <p className="text-lg text-gray-500 leading-relaxed">
              Discover insights, ask questions, and share your knowledge with thousands of creators and developers.
            </p>
          </div>
          <Link 
            href="/community" 
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-300 shadow-sm whitespace-nowrap"
          >
            Explore Community
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {questions.map((q: any, i: number) => (
            <Link 
              key={q.slug || i} 
              href={`/community/questions/${q.slug}`}
              className="group flex flex-col bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-[0_8px_30px_rgb(79,70,229,0.08)] hover:-translate-y-1 hover:border-indigo-100 transition-all duration-300 relative"
            >
              <div className="flex items-center gap-3 mb-4">
                {q.author?.avatar ? (
                  <img src={q.author.avatar} alt={q.author.name} className="w-10 h-10 rounded-full border border-gray-100 object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center border border-indigo-100 text-indigo-600">
                    <User className="w-5 h-5" />
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-gray-900 line-clamp-1">{q.author?.name || 'Anonymous'}</p>
                  <p className="text-xs text-gray-500">{timeAgo(q.createdAt)}</p>
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                {q.title}
              </h3>
              
              <p className="text-sm text-gray-500 line-clamp-2 mb-6 flex-grow">
                {q.excerpt || q.body?.replace(/[#*`]/g, '')}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
                  <div className="flex items-center gap-1.5 group-hover:text-indigo-500 transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{q.likes || 0}</span>
                  </div>
                  <div className="flex items-center gap-1.5 group-hover:text-blue-500 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    <span>{q.answers?.length || 0}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
