'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bookmark, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import PromptLoginModal from './PromptLoginModal';

export default function SavedPromptsCTA() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  const openSavedPrompts = () => {
    if (isLoading) return;
    if (!user) {
      setShowLogin(true);
      return;
    }
    router.push('/prompts/all?tab=saved');
  };

  return (
    <>
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 shadow-sm flex flex-col h-full hover:shadow-md hover:-translate-y-0.5 transition-all">
        <div className="w-11 h-11 bg-violet-50 border border-violet-100 rounded-xl flex items-center justify-center text-violet-600 mb-4">
          <Bookmark className="w-6 h-6" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Build Your Saved Library</h3>
        <p className="text-gray-500 mb-5 text-sm leading-relaxed flex-grow">Keep useful prompts together and access them again whenever you need them.</p>
        <button type="button" onClick={openSavedPrompts} disabled={isLoading} className="bg-violet-600 hover:bg-violet-700 disabled:cursor-wait disabled:opacity-70 text-white font-semibold px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm w-full transition-colors">
          View Saved Prompts <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <PromptLoginModal open={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}
