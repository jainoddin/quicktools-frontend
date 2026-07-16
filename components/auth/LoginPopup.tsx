'use client';

import React from 'react';
import { X, Lock } from 'lucide-react';
import Image from 'next/image';
import { getEndpoint } from '../../lib/api';
import { trackLoginStart } from '@/lib/analytics';

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginPopup({ isOpen, onClose }: LoginPopupProps) {
  if (!isOpen) return null;

  const handleGoogleLogin = () => {
    trackLoginStart('google');
    window.location.href = getEndpoint('/api/auth/google');
  };

  const handleGitHubLogin = () => {
    trackLoginStart('github');
    window.location.href = getEndpoint('/api/auth/github');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl overflow-hidden border border-[#E5E7EB] transform transition-all scale-100 opacity-100">
        
        {/* Decorative Background */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="flex flex-col items-center text-center relative z-10">
          <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-5 shadow-inner">
            <Lock className="w-7 h-7 text-[#6D5EF8]" />
          </div>
          
          <h3 className="text-xl font-bold text-[#111827] mb-2 tracking-tight">Login Required</h3>
          <p className="text-sm text-[#6B7280] mb-8 leading-relaxed">
            Please sign in to save your favorite tools and access them across all your devices.
          </p>

          <div className="w-full space-y-3">
            <button 
              onClick={handleGoogleLogin}
              className="w-full bg-white border border-[#E5E7EB] hover:bg-gray-50 text-[#111827] font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-3 transition-all shadow-sm hover:shadow-md"
            >
              <img src="https://www.google.com/favicon.ico" width={20} height={20} alt="Google" />
              Continue with Google
            </button>
            <button 
              onClick={handleGitHubLogin}
              className="w-full bg-white border border-[#E5E7EB] hover:bg-gray-50 text-[#111827] font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-3 transition-all shadow-sm hover:shadow-md"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              Continue with GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
