'use client';

import React, { useState } from 'react';
import { User, Mail, MessageSquare, PenLine, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { getEndpoint } from '../../lib/api';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Please fill in all required fields.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch(getEndpoint('/api/contact/submit'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to send message.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
        </div>
        <h3 className="text-xl font-bold text-emerald-900 mb-2">Message Sent Successfully!</h3>
        <p className="text-emerald-700 text-sm mb-6">Thank you for reaching out. Our team will get back to you shortly.</p>
        <button 
          onClick={() => setStatus('idle')}
          className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-bold transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {status === 'error' && (
        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
          {errorMessage}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="text-xs font-bold text-[#374151]">Full Name *</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-4 w-4 text-gray-400" />
            </div>
            <input 
              type="text" 
              id="name" 
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name" 
              className="w-full bg-white border border-[#E5E7EB] rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6D5EF8]/20 focus:border-[#6D5EF8] transition-all placeholder:text-gray-400"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-xs font-bold text-[#374151]">Email Address *</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-4 w-4 text-gray-400" />
            </div>
            <input 
              type="email" 
              id="email" 
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email" 
              className="w-full bg-white border border-[#E5E7EB] rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6D5EF8]/20 focus:border-[#6D5EF8] transition-all placeholder:text-gray-400"
              required
            />
          </div>
        </div>
      </div>

      {/* Subject */}
      <div className="space-y-2">
        <label htmlFor="subject" className="text-xs font-bold text-[#374151]">Subject</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MessageSquare className="h-4 w-4 text-gray-400" />
          </div>
          <input 
            type="text" 
            id="subject" 
            value={formData.subject}
            onChange={handleChange}
            placeholder="How can we help you?" 
            className="w-full bg-white border border-[#E5E7EB] rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6D5EF8]/20 focus:border-[#6D5EF8] transition-all placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label htmlFor="message" className="text-xs font-bold text-[#374151]">Message *</label>
        <div className="relative">
          <div className="absolute top-3 left-3 pointer-events-none">
            <PenLine className="h-4 w-4 text-gray-400" />
          </div>
          <textarea 
            id="message" 
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder="Type your message here..." 
            className="w-full bg-white border border-[#E5E7EB] rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6D5EF8]/20 focus:border-[#6D5EF8] transition-all placeholder:text-gray-400 resize-none"
            required
          ></textarea>
          <div className="absolute bottom-3 right-3 text-[10px] font-medium text-gray-400">
            {formData.message.length} / 1000
          </div>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={status === 'loading'}
        className="bg-gradient-to-r from-[#6D5EF8] to-[#8B5CF6] hover:from-[#5B4DF5] hover:to-[#7C3AED] text-white font-bold py-3 px-6 rounded-lg transition-all shadow-md shadow-[#6D5EF8]/20 flex items-center gap-2 text-sm disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />} 
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
