import React from 'react';
import Link from 'next/link';
import { Users, ArrowRight } from 'lucide-react';

export default function CommunityCTA() {
  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-gray-700 mb-6">
        <Users className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Join Our Prompt Community</h3>
      <p className="text-gray-500 mb-6 text-sm flex-grow">Share, discuss and discover prompts with other AI users.</p>
      <Link 
        href="/community"
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl flex items-center justify-center gap-2 text-sm w-fit transition-colors"
      >
        Explore Community <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
