import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getEndpoint } from '../../lib/api';

export const metadata: Metadata = {
  title: 'Create Your Free QuickTools.ai Account',
  description: 'Create your QuickTools.ai account today and get instant access to our powerful suite of premium AI tools for text, images, video, and code.',
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row font-sans selection:bg-[#6D5EF8] selection:text-white">

      
      {/* ── LEFT SIDE (Image Graphic) ── */}
      {/* Hidden on mobile, takes 50% width on tablet/desktop */}
      <div className="hidden md:flex md:w-1/2 p-6 lg:p-8">
        <div className="w-full h-full relative flex items-center justify-center">
          {/* Using the user's provided exact image URL */}
          <img 
            src="https://pub-68a98c57e70a4a1fa317739dd20098b9.r2.dev/9766c871-78dd-4b3a-a606-faa1cf880e7d.png"
            alt="QuickTools.ai AI Platform"
            className="w-full h-auto max-h-full object-contain rounded-[25px] shadow-sm"
          />
        </div>
      </div>

      {/* ── RIGHT SIDE (Sign Up Form) ── */}
      <div className="w-full md:w-1/2 flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-24 relative">
        <div className="w-full max-w-[440px]">
          {/* Header */}
          <div className="text-center mb-10 animate-stagger-1">
            <h1 className="text-3xl font-bold text-[#111827] mb-3">Create an Account ✨</h1>
            <p className="text-[#6B7280]">Join QuickTools.ai and boost your productivity</p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-4">
            
            {/* Google Button */}
            <div className="animate-stagger-2">
              <a href={getEndpoint('/api/auth/google')} className="w-full flex items-center justify-center gap-3 bg-white border-2 border-[#E5E7EB] hover:border-[#6D5EF8] hover:bg-[#F0EFFF] hover:shadow-md text-[#111827] font-bold text-sm px-6 py-3.5 rounded-xl transition-all duration-300">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign up with Google
              </a>
            </div>

            {/* GitHub Button */}
            <div className="animate-stagger-3">
              <button className="w-full flex items-center justify-center gap-3 bg-white border-2 border-[#E5E7EB] hover:border-gray-900 hover:bg-gray-50 hover:shadow-md text-[#111827] font-bold text-sm px-6 py-3.5 rounded-xl transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              Sign up with GitHub
              </button>
            </div>
            
          </div>

          {/* Footer Text */}
          <div className="animate-stagger-4">
            <p className="text-center text-sm text-[#6B7280] mt-10">
              Already have an account? <Link href="/login" className="text-[#6D5EF8] font-bold hover:underline">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
