import React from 'react';
import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';

export default function LearnPromptingCTA() {
  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-gray-700 mb-6">
        <BookOpen className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Learn Prompt Engineering</h3>
      <p className="text-gray-500 mb-6 text-sm flex-grow">Master the art of prompting with our expert guides and courses.</p>
      <Link 
        href="/learn"
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl flex items-center justify-center gap-2 text-sm w-fit transition-colors"
      >
        Start Learning <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
