import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function PromptGeneratorCTA() {
  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 shadow-sm flex flex-col h-full hover:shadow-md hover:-translate-y-0.5 transition-all">
      <div className="w-11 h-11 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-4">
        <Sparkles className="w-6 h-6" />
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Generate Your Own Custom Prompt</h3>
      <p className="text-gray-500 mb-5 text-sm leading-relaxed flex-grow">Create tailored prompts for your specific needs in seconds.</p>
      <Link 
        href="/prompts/generator"
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm w-full sm:w-fit transition-colors"
      >
        Try Prompt Generator <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
