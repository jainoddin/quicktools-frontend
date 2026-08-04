'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Check, AlertCircle } from 'lucide-react';

export default function CommunitySidebarRight({ selectedCategory, onCategoryChange }: any) {
  const router = useRouter();

  return (
    <aside className="hidden xl:block w-[300px] shrink-0 space-y-6 sticky top-24 h-fit pb-4">
      {/* Community Guidelines */}
      <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-[#4F46E5]" /> Community Guidelines
        </h3>
        <ul className="space-y-3">
          <li className="flex gap-2 text-sm text-gray-600">
            <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Be respectful and helpful to others
          </li>
          <li className="flex gap-2 text-sm text-gray-600">
            <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Search before asking to avoid duplicates
          </li>
          <li className="flex gap-2 text-sm text-gray-600">
            <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> No spam or self-promotion
          </li>
          <li className="flex gap-2 text-sm text-gray-600">
            <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Do not post offensive content
          </li>
          <li className="flex gap-2 text-sm text-gray-600">
            <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Use clear titles and descriptions
          </li>
          <li className="flex gap-2 text-sm text-gray-600">
            <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Share knowledge generously
          </li>
        </ul>
      </div>
    </aside>
  );
}
