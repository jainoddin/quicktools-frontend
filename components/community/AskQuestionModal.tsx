'use client';

import React, { useState, useEffect } from 'react';
import { X, AlertCircle, Loader2, Tag, ChevronDown, Sparkles } from 'lucide-react';
import { getEndpoint } from '../../lib/api';

const CATEGORIES = [
  'AI Tools',
  'Prompt Engineering',
  'Writing',
  'Coding',
  'Marketing',
  'Business',
  'Design',
  'Productivity',
  'QuickTool Help'
];

interface AskQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (questionSlug: string) => void;
  isGuest: boolean;
}

export default function AskQuestionModal({ isOpen, onClose, onSuccess, isGuest }: AskQuestionModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [tags, setTags] = useState('');

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (title.length < 12) {
      setError('Title must be at least 12 characters.');
      return;
    }
    if (body.length < 30) {
      setError('Details must be at least 30 characters.');
      return;
    }

    setLoading(true);

    try {
      const tagArray = tags.split(',').map(t => t.trim()).filter(Boolean).slice(0, 5);
      
      const payload = {
        title,
        body,
        category,
        tags: tagArray,
        guestName: isGuest ? 'QuickTool Guest' : undefined
      };

      const res = await fetch(getEndpoint('/api/community/questions'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      
      if (data.success) {
        if (data.guestSecret) {
          localStorage.setItem(`qt_guest_secret_${data.data.slug}`, data.guestSecret);
        }
        // Reset form
        setTitle(''); setBody(''); setTags(''); setCategory(CATEGORIES[0]);
        onSuccess(data.data.slug);
      } else {
        setError(data.message || 'Failed to post question');
      }
    } catch (err: any) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div 
        className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#EEF2FF] rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#4F46E5]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 leading-tight">Ask the Community</h2>
              {isGuest && (
                <p className="text-xs text-amber-600 font-medium">Posting as guest</p>
              )}
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="overflow-y-auto flex-1">
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {error && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-start gap-2 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}


            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Question Title <span className="text-red-500">*</span>
              </label>
              <input 
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g., What is the best AI tool for generating logos?"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5] transition-all outline-none text-sm font-medium"
                minLength={12}
                maxLength={180}
              />
              <p className="text-xs text-gray-400 mt-1 text-right">{title.length}/180</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Category <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select 
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full appearance-none px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5] transition-all outline-none text-sm pr-9"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Tags <span className="text-gray-400 font-normal">(up to 5)</span>
                </label>
                <div className="relative">
                  <Tag className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input 
                    type="text"
                    value={tags}
                    onChange={e => setTags(e.target.value)}
                    placeholder="logo, design, ai"
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5] transition-all outline-none text-sm"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Details <span className="text-red-500">*</span>
              </label>
              <textarea 
                required
                value={body}
                onChange={e => setBody(e.target.value)}
                placeholder="Provide more context or explain what you are trying to achieve..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5] transition-all outline-none text-sm min-h-[140px] resize-none"
                minLength={30}
                maxLength={10000}
              />
              <p className="text-xs text-gray-400 mt-1 flex justify-between">
                <span>Markdown is supported</span>
                <span>{body.length}/10000</span>
              </p>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
              <button 
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 text-sm font-semibold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-70 disabled:pointer-events-none"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Posting...</>
                ) : (
                  <><Sparkles className="w-4 h-4" /> Post Question</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
