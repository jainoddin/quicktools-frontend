'use client';

import React from 'react';
import { X, Lock } from 'lucide-react';
import Image from 'next/image';
import { getEndpoint } from '../../lib/api';

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginPopup({ isOpen, onClose }: LoginPopupProps) {
  if (!isOpen) return null;

  const handleGoogleLogin = () => {
    window.location.href = getEndpoint('/api/auth/google');
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

          <button 
            onClick={handleGoogleLogin}
            className="w-full bg-white border border-[#E5E7EB] hover:bg-gray-50 text-[#111827] font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-3 transition-all shadow-sm hover:shadow-md"
          >
            <img src="https://www.google.com/favicon.ico" width={20} height={20} alt="Google" />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
