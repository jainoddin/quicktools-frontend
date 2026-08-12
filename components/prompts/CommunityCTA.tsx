import React from 'react';
import Link from 'next/link';
import { Users, ArrowRight } from 'lucide-react';

export default function CommunityCTA() {
  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 shadow-sm flex flex-col h-full hover:shadow-md hover:-translate-y-0.5 transition-all">
      <div className="w-11 h-11 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
        <Users className="w-6 h-6" />
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Join Our Prompt Community</h3>
      <p className="text-gray-500 mb-5 text-sm leading-relaxed flex-grow">Share, discuss and discover prompts with other AI users.</p>
      <Link 
        href="/community"
        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm w-full sm:w-fit transition-colors"
      >
        Explore Community <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
