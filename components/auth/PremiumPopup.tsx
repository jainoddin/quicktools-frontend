import React, { useEffect, useState } from 'react';
import { Crown, X, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function PremiumPopup({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0">
      <div 
        className="fixed inset-0 bg-[#111827]/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />
      <div 
        className="relative bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6] rounded-xl transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 pb-6 text-center border-b border-yellow-100">
          <div className="w-20 h-20 bg-yellow-400 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-yellow-400/20 mb-6 rotate-3">
            <Crown className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-black text-[#111827] tracking-tight mb-2">
            Out of Credits
          </h2>
          <p className="text-[#4B5563] text-sm leading-relaxed max-w-[280px] mx-auto">
            You've run out of credits to generate premium content. Upgrade your plan or buy more credits.
          </p>
        </div>

        <div className="p-6">
          <Link
            href="/pricing"
            onClick={onClose}
            className="w-full h-14 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 mb-3"
          >
            <Sparkles className="w-5 h-5" />
            Upgrade Plan
          </Link>
          <button
            onClick={onClose}
            className="w-full h-12 bg-white text-[#4B5563] hover:bg-[#F3F4F6] font-semibold rounded-2xl transition-colors border border-[#E5E7EB]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
