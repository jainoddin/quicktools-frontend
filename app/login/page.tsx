import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Home } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Login - QuickTools.ai',
  description: 'Sign in to access your QuickTools.ai account.',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row font-sans selection:bg-[#6D5EF8] selection:text-white">
      
      {/* ── LEFT SIDE (Image Graphic) ── */}
      {/* Hidden on mobile, takes 50% width on tablet/desktop */}
      <div className="hidden md:flex md:w-1/2 p-6 lg:p-8">
        <div className="w-full h-full relative rounded-3xl overflow-hidden bg-white shadow-sm border border-[#E5E7EB] flex items-center justify-center">
          {/* Using the user's provided exact image URL */}
          <Image 
            src="https://pub-68a98c57e70a4a1fa317739dd20098b9.r2.dev/9766c871-78dd-4b3a-a606-faa1cf880e7d.png"
            alt="QuickTools.ai AI Platform"
            fill
            className="object-cover"
            priority
            unoptimized // Since it's an external R2 bucket, unoptimized prevents Next.js image optimization errors if domain isn't configured
          />
          
          {/* Back to Home Button overlaying the image */}
          <Link href="/" className="absolute top-6 left-6 z-10 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-white/50 rounded-xl text-sm font-bold text-[#111827] shadow-sm hover:bg-white transition-colors">
            <Home className="w-4 h-4" /> Home
          </Link>
        </div>
      </div>

      {/* ── RIGHT SIDE (Login Form) ── */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 relative">
        
        {/* Mobile only Back to Home */}
        <Link href="/" className="md:hidden absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E7EB] rounded-xl text-sm font-bold text-[#111827] shadow-sm hover:bg-gray-50 transition-colors">
          <Home className="w-4 h-4" />
        </Link>

        <div className="w-full max-w-[440px]">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-[#111827] mb-3">Welcome Back! 👋</h1>
            <p className="text-[#6B7280]">Sign in to continue to your account</p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-4">
            
            {/* Google Button */}
            <button className="w-full flex items-center justify-center gap-3 bg-white border-2 border-[#E5E7EB] hover:border-gray-300 hover:bg-gray-50 text-[#111827] font-bold text-sm px-6 py-3.5 rounded-xl transition-all shadow-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            {/* GitHub Button */}
            <button className="w-full flex items-center justify-center gap-3 bg-white border-2 border-[#E5E7EB] hover:border-gray-300 hover:bg-gray-50 text-[#111827] font-bold text-sm px-6 py-3.5 rounded-xl transition-all shadow-sm">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              Continue with GitHub
            </button>
            
          </div>

          {/* Optional Divider (even though we removed email/password, it looks good for future proofing or just keeping the clean look. Wait, the user said "remove email and password, ONLY put social login". I should remove the "OR" divider too, to make it perfectly minimal like they want). */}

          {/* Footer Text */}
          <p className="text-center text-sm text-[#6B7280] mt-10">
            By signing in, you agree to our <br/>
            <Link href="/terms" className="text-[#6D5EF8] font-bold hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-[#6D5EF8] font-bold hover:underline">Privacy Policy</Link>.
          </p>

        </div>
      </div>
    </div>
  );
}
