import React from 'react';
import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';

export default function LearnPromptingCTA() {
  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 shadow-sm flex flex-col h-full hover:shadow-md hover:-translate-y-0.5 transition-all">
      <div className="w-11 h-11 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center text-amber-600 mb-4">
        <BookOpen className="w-6 h-6" />
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Learn Prompt Engineering</h3>
      <p className="text-gray-500 mb-5 text-sm leading-relaxed flex-grow">Master the art of prompting with our expert guides and courses.</p>
      <Link 
        href="/learn"
        className="bg-gray-950 hover:bg-gray-800 text-white font-semibold px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm w-full sm:w-fit transition-colors"
      >
        Start Learning <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
