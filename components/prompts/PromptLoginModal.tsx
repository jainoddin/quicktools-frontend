'use client';

import Link from 'next/link';
import { Bookmark, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function PromptLoginModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', closeOnEscape);
    return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', closeOnEscape); };
  }, [open, onClose]);
  if (!mounted || !open) return null;
  return createPortal(
    <div className="fixed inset-0 z-[250] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" role="dialog" aria-modal="true" aria-labelledby="prompt-login-title" onMouseDown={onClose}>
      <div className="relative bg-white rounded-3xl p-7 max-w-sm w-full shadow-2xl text-center" onMouseDown={event => event.stopPropagation()}>
        <button onClick={onClose} aria-label="Close login popup" className="absolute right-4 top-4 p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700"><X className="w-5 h-5" /></button>
        <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-5"><Bookmark className="w-8 h-8 text-indigo-600" /></div>
        <h2 id="prompt-login-title" className="text-2xl font-black text-gray-900 mb-2">Save this prompt</h2>
        <p className="text-sm text-gray-500 leading-relaxed mb-6">Log in to save prompts securely to your QuickTools account and access them from any device.</p>
        <div className="flex flex-col gap-3">
          <Link href="/login" className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-colors">Log In</Link>
          <Link href="/signup" className="w-full py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl font-bold transition-colors">Create Free Account</Link>
          <button onClick={onClose} className="w-full py-2 text-gray-500 font-semibold hover:text-gray-800">Maybe later</button>
        </div>
      </div>
    </div>, document.body
  );
}
