'use client';

import React, { useState } from 'react';

interface NewsletterFormProps {
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
  buttonText?: React.ReactNode;
  inputStyle?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
}

export default function NewsletterForm({
  className = "",
  inputClassName = "",
  buttonClassName = "",
  buttonText = "Subscribe",
  inputStyle = {},
  buttonStyle = {}
}: NewsletterFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch("https://formsubmit.co/ajax/helloquicktool@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            email,
            _subject: "New QuickTools Subscriber!",
            _template: "table"
        })
      });
      
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={`p-4 bg-green-500/10 text-green-600 rounded-xl text-sm font-bold text-center border border-green-500/20 backdrop-blur-sm ${className}`}>
        🎉 Subscribed successfully!
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <input
        type="email"
        name="email"
        required
        placeholder="Enter your email"
        className={inputClassName}
        style={inputStyle}
        disabled={status === 'loading'}
      />
      <button 
        type="submit" 
        className={buttonClassName}
        style={buttonStyle}
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Subscribing...' : buttonText}
      </button>
      {status === 'error' && (
        <p className="text-red-400 text-xs mt-2 text-center font-medium">Failed. Please try again.</p>
      )}
    </form>
  );
}
