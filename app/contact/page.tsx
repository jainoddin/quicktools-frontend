import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Home, ChevronRight, Mail, Send, Zap, CheckCircle2, X, MessageSquare
} from 'lucide-react';
import NewsletterForm from '../../components/shared/NewsletterForm';
import NewsletterSectionWrapper from '../../components/shared/NewsletterSectionWrapper';
import LiveChatBot from '../../components/contact/LiveChatBot';
import ContactForm from '../../components/contact/ContactForm';
import FeedbackModal from '../../components/contact/FeedbackModal';

export const metadata: Metadata = {
  title: 'Contact Us | QuickTools.ai',
  description: 'Get in touch with the QuickTools.ai team. We are here to help you with any questions, feedback, or support requests regarding our AI tools.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact QuickTools.ai",
    "description": "Get in touch with the QuickTools.ai team. We are here to help you with any questions, feedback, or support requests regarding our AI tools.",
    "url": "https://quicktool.space/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "QuickTools.ai",
      "email": "helloquicktool@gmail.com",
      "url": "https://quicktool.space",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "email": "helloquicktool@gmail.com",
        "availableLanguage": ["English"]
      }
    }
  };

  return (
    <div className="flex-grow bg-[#F8FAFC] font-sans selection:bg-[#6D5EF8] selection:text-white overflow-x-hidden pb-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      
      {/* CSS Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float-envelope {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fly-plane {
          0% { transform: translate(0px, 0px) rotate(0deg); opacity: 1; }
          100% { transform: translate(40px, -40px) rotate(10deg); opacity: 0; }
        }
        .animate-envelope {
          animation: float-envelope 4s ease-in-out infinite;
        }
        .animate-plane {
          animation: fly-plane 3s ease-out infinite;
        }
      `}} />

      {/* Breadcrumb */}
      <div className="bg-transparent relative z-10 pt-[15px] pb-[25px]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-sm text-[#6B7280]">
          <Link href="/" className="hover:text-[#111827] flex items-center gap-1 transition-colors">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          <span className="text-[#6D5EF8] font-semibold">Contact Us</span>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-10 lg:pb-12">
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* ── LEFT COLUMN ── */}
          <div>
            {/* Header */}
            <div className="mb-10">
              <div className="inline-flex items-center px-3 py-1 rounded-md bg-[#EEF2FF] text-[#6D5EF8] text-xs font-bold mb-6">
                Get in Touch
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-[#111827] leading-tight mb-4 tracking-tight">
                We'd love to hear<br />from <span className="text-[#6D5EF8]">you!</span>
              </h1>
              <p className="text-[#6B7280] text-sm leading-relaxed max-w-md">
                Have a question, suggestion, or just want to say hi? We're always here to help and improve QuickTools.ai for you.
              </p>
            </div>

            {/* Custom Animated Illustration */}
            <div className="relative w-64 h-48 mx-auto lg:mx-0 mb-12">
              <div className="absolute inset-0 bg-[#F3F4F6] rounded-full blur-3xl opacity-50"></div>
              
              {/* Envelope */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-envelope z-10">
                <div className="relative w-32 h-24 bg-gradient-to-br from-[#8B5CF6] to-[#6D5EF8] rounded-xl shadow-xl flex items-center justify-center border-t-4 border-[#A78BFA]">
                   <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-xl">
                      <div className="w-0 h-0 border-l-[64px] border-l-transparent border-r-[64px] border-r-transparent border-t-[48px] border-t-white/20 absolute top-0 left-0"></div>
                   </div>
                   <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-inner z-10 rotate-12">
                     <Zap className="w-6 h-6 text-[#6D5EF8] fill-[#6D5EF8]" />
                   </div>
                </div>
              </div>

              {/* Paper Plane (Animated) */}
              <div className="absolute top-4 right-4 animate-plane text-[#6D5EF8]">
                <Send className="w-8 h-8 fill-[#6D5EF8]/20" />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute bottom-8 left-4 w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="absolute top-12 left-12 w-2 h-2 rounded-full bg-pink-400"></div>
              <div className="absolute top-8 right-16 w-4 h-4 rounded-full bg-emerald-400"></div>
            </div>

            {/* Other ways to reach us (2x2 Grid) */}
            <div>
              <h3 className="font-bold text-[#111827] text-lg mb-4">Other ways to reach us</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                
                {/* Email */}
                <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 flex gap-4 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-full bg-[#EEF2FF] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#6D5EF8]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#111827] text-sm">Email Us</p>
                    <p className="text-xs text-[#6B7280] mb-1">We're here to help</p>
                    <a href="mailto:helloquicktool@gmail.com" className="text-xs font-bold text-[#6D5EF8] hover:underline">
                      helloquicktool@gmail.com
                    </a>
                  </div>
                </div>

                {/* Live Chat Component */}
                <LiveChatBot />

                {/* LinkedIn */}
                <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 flex gap-4 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-full bg-[#EEF2FF] flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#6D5EF8]"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  </div>
                  <div>
                    <p className="font-bold text-[#111827] text-sm">LinkedIn</p>
                    <p className="text-xs text-[#6B7280] mb-1">hello quicktool</p>
                    <a href="https://www.linkedin.com/in/hello-quicktool-4ba7b5421/" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-[#6D5EF8] hover:underline">Connect with us</a>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="space-y-6">
            
            {/* Form Card */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-[#111827] mb-1">Send us a message</h2>
              <p className="text-[#6B7280] text-sm mb-8">We usually respond within <span className="font-bold text-[#6D5EF8]">24 hours.</span></p>
              
              <ContactForm />
            </div>

            {/* Feedback Modal */}
            <FeedbackModal />

          </div>
        </div>

        {/* ── BOTTOM NEWSLETTER BAR ── */}
        <NewsletterSectionWrapper>
          <div className="mt-16 bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 flex flex-col xl:flex-row items-center justify-between gap-8 shadow-sm">
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#6D5EF8] rounded-full flex items-center justify-center shadow-md shrink-0">
                <Zap className="w-6 h-6 text-white fill-white" />
              </div>
              <div>
                <h3 className="font-bold text-[#111827] text-base mb-1">Stay in the loop</h3>
                <p className="text-xs text-[#6B7280]">Subscribe to get the latest AI tools, tutorials and productivity tips straight to your inbox.</p>
              </div>
            </div>

            <NewsletterForm 
              className="flex w-full xl:w-auto items-center gap-2"
              inputClassName="w-full xl:w-64 bg-white border border-[#E5E7EB] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6D5EF8]/20 focus:border-[#6D5EF8] transition-all"
              buttonClassName="whitespace-nowrap inline-flex items-center gap-2 px-6 py-2.5 bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white text-sm font-bold rounded-lg transition-colors"
              buttonText={<>Subscribe <Send className="w-4 h-4" /></>}
            />

            <div className="flex items-center gap-6 hidden md:flex">
              <div className="flex items-center gap-1.5 text-xs text-[#6B7280] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#8B5CF6]" /> No spam
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#6B7280] font-medium">
                <X className="w-4 h-4 text-[#8B5CF6]" /> Unsubscribe anytime
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#6B7280] font-medium">
                <MessageSquare className="w-4 h-4 text-[#8B5CF6]" /> Weekly updates
              </div>
            </div>

          </div>
        </NewsletterSectionWrapper>

      </div>
    </div>
  );
}
