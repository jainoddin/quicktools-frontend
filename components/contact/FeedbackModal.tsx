'use client';

import React, { useState } from 'react';
import { ArrowRight, Heart, X, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { getEndpoint } from '../../lib/api';

export default function FeedbackModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.message) {
      setErrorMessage('Please provide your feedback message.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch(getEndpoint('/api/contact/feedback'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit feedback.');
      setStatus('error');
    }
  };

  return (
    <>
      <div className="bg-[#FAF5FF] border border-[#E9D5FF] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
            <Heart className="w-6 h-6 text-[#8B5CF6] fill-[#8B5CF6]" />
          </div>
          <div>
            <h3 className="font-bold text-[#111827] text-base mb-1">We value your feedback</h3>
            <p className="text-xs text-[#6B7280]">Your feedback helps us build better tools and create a better experience for everyone.</p>
          </div>
        </div>
        <button 
          onClick={() => { setIsOpen(true); setStatus('idle'); setFormData({ name: '', email: '', message: '' }); }}
          className="whitespace-nowrap inline-flex items-center gap-2 px-4 py-2 border border-[#8B5CF6] text-[#8B5CF6] bg-white text-xs font-bold rounded-lg hover:bg-[#8B5CF6] hover:text-white transition-colors"
        >
          Share Feedback <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in duration-200">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
            
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#111827] mb-2 flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#8B5CF6] fill-[#8B5CF6]" /> Share Your Feedback
              </h2>
              <p className="text-sm text-gray-500">We read every piece of feedback to improve QuickTools.ai.</p>
            </div>

            {status === 'success' ? (
              <div className="bg-[#FAF5FF] border border-[#E9D5FF] rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-[#8B5CF6] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-[#111827] mb-2">Thank you!</h3>
                <p className="text-sm text-gray-600 mb-4">Your feedback has been successfully submitted.</p>
                <button onClick={() => setIsOpen(false)} className="px-6 py-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-lg text-sm font-bold transition-colors">
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {status === 'error' && (
                  <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
                    {errorMessage}
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="name" className="text-xs font-bold text-gray-700">Name (Optional)</label>
                    <input type="text" id="name" value={formData.name} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 focus:border-[#8B5CF6]" placeholder="Your name" />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="email" className="text-xs font-bold text-gray-700">Email (Optional)</label>
                    <input type="email" id="email" value={formData.email} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 focus:border-[#8B5CF6]" placeholder="Your email" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label htmlFor="message" className="text-xs font-bold text-gray-700">Feedback *</label>
                  <textarea id="message" rows={4} value={formData.message} onChange={handleChange} required className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 focus:border-[#8B5CF6] resize-none" placeholder="What can we do better?"></textarea>
                </div>
                <button type="submit" disabled={status === 'loading'} className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-70">
                  {status === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />} 
                  {status === 'loading' ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
