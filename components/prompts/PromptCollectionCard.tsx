import React from 'react';
import Link from 'next/link';
import { Layers, ArrowRight } from 'lucide-react';

interface PromptCollectionCardProps {
  collection: any;
}

export default function PromptCollectionCard({ collection }: PromptCollectionCardProps) {
  return (
    <Link 
      href={`/prompts/collections/${collection.slug}`}
      className="group relative bg-white rounded-3xl p-6 border border-gray-200 hover:border-indigo-500 hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden flex flex-col h-full block"
    >
      <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
        <Layers className="w-24 h-24 text-indigo-500 -mr-6 -mt-6 rotate-12" />
      </div>

      <div className="relative z-10 flex-grow">
        <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center shrink-0 ${collection.bgColor || 'bg-indigo-50 text-indigo-500'}`}>
           <Layers className="w-6 h-6" />
        </div>
        
        <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
          {collection.title}
        </h3>
        
        <p className="text-sm text-gray-500 line-clamp-3 mb-6">
          {collection.description}
        </p>
      </div>

      <div className="relative z-10 flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
        <span className="text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
          {collection.promptCount || 0} Prompts
        </span>
        <span className="text-indigo-600 font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          Explore <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}
