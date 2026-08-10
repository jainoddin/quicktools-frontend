import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function PromptGeneratorCTA() {
  return (
    <div className="bg-indigo-50/50 rounded-2xl p-8 border border-indigo-100 flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
        <Sparkles className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Generate Your Own Custom Prompt</h3>
      <p className="text-gray-500 mb-6 text-sm flex-grow">Create tailored prompts for your specific needs in seconds.</p>
      <Link 
        href="/prompts/generator"
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl flex items-center justify-center gap-2 text-sm w-fit transition-colors"
      >
        Try Prompt Generator <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
