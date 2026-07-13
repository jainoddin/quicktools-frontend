'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, ChevronDown, Headphones, ArrowRight, BookOpen } from 'lucide-react';

const FAQ_CATEGORIES = [
  { name: 'All Questions', count: 67 },
  { name: 'General', count: 12 },
  { name: 'Account', count: 10 },
  { name: 'Billing & Payments', count: 14 },
  { name: 'AI Tools & Usage', count: 15 },
  { name: 'API', count: 6 },
  { name: 'Privacy & Security', count: 6 },
  { name: 'Refunds', count: 4 },
];

const FAQS = [
  {
    id: 1,
    category: 'General',
    question: 'What is QuickTools.ai?',
    answer: 'QuickTools.ai is an all-in-one platform providing access to the most powerful AI tools for image generation, content writing, video creation, coding assistance, and SEO optimization. It is designed to save you time and help you work smarter.'
  },
  {
    id: 2,
    category: 'Account',
    question: 'How do I create an account?',
    answer: 'You can create an account by clicking the "Sign Up" button in the top right corner of the website. You can sign up using your email address, or quickly authenticate using your Google or GitHub account.'
  },
  {
    id: 3,
    category: 'Billing & Payments',
    question: 'How do credits work?',
    answer: 'Credits are the currency used on QuickTools.ai. Different AI tools consume different amounts of credits per use. Free accounts get 15 credits per month, while premium plans offer significantly more. You can purchase additional credits anytime.'
  },
  {
    id: 4,
    category: 'Billing & Payments',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, debit cards, PayPal, and various local payment methods depending on your region, processed securely via Razorpay/Stripe.'
  },
  {
    id: 5,
    category: 'Billing & Payments',
    question: 'Can I upgrade or downgrade my plan?',
    answer: 'Yes, you can change your subscription plan at any time from your Account Settings. If you upgrade, the new credits are added immediately. If you downgrade, the changes take effect at the start of your next billing cycle.'
  },
  {
    id: 6,
    category: 'Refunds',
    question: 'Do you offer refunds?',
    answer: 'Yes, we offer a 7-day money-back guarantee for our premium plans if you are not satisfied with the service and have used less than 10% of your allocated credits. Please contact support to initiate a refund.'
  },
  {
    id: 7,
    category: 'General',
    question: 'How can I contact support?',
    answer: 'You can reach out to our support team 24/7 by clicking the "Contact Support" button on the Help Center page, or by emailing us directly at helloquicktool@gmail.com. We usually respond within 24 hours.'
  }
];

export default function FaqClient() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('All Questions');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);

  useEffect(() => {
    const q = searchParams.get('q');
    const category = searchParams.get('category');
    if (q) setSearchQuery(q);
    if (category) {
      // Find matching category name, e.g. 'Getting Started' -> 'General' (just mapping or set directly)
      // For now, let's just set it if it exists in FAQ_CATEGORIES
      const matched = FAQ_CATEGORIES.find(c => c.name.toLowerCase() === category.toLowerCase());
      if (matched) {
        setActiveCategory(matched.name);
      } else {
        // Just map generic ones
        setActiveCategory('All Questions');
      }
    }
  }, [searchParams]);

  const filteredFaqs = FAQS.filter(faq => {
    const matchesCategory = activeCategory === 'All Questions' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex-grow bg-[#F8FAFC] font-sans selection:bg-[#6D5EF8] selection:text-white">
      
      {/* ── HERO SECTION ── */}
      <div className="relative pt-20 pb-16 px-4 overflow-hidden bg-white border-b border-[#E5E7EB]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-br from-[#FAF5FF] to-[#EEF2FF] blur-3xl opacity-70 rounded-full pointer-events-none -z-10"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#F3F4F6] text-[#4B5563] text-xs font-bold mb-6 border border-[#E5E7EB] shadow-sm">
            <BookOpen className="w-3.5 h-3.5 mr-1.5 text-[#6D5EF8]" /> FAQs
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#111827] mb-4 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-[#6B7280] text-sm md:text-base max-w-lg mx-auto mb-10 leading-relaxed">
            Find quick answers to the most common questions about QuickTools.ai
          </p>

          <div className="max-w-2xl mx-auto relative shadow-xl shadow-[#6D5EF8]/5 rounded-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search questions..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-32 py-4 rounded-2xl border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#6D5EF8]/20 focus:border-[#6D5EF8] transition-all text-sm bg-white"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* ── CONTENT SECTION ── */}
      <div className="max-w-[1200px] mx-auto px-4 py-16 flex flex-col lg:flex-row gap-10">
        
        {/* Sidebar Categories */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-2 shadow-sm sticky top-24">
            {FAQ_CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  activeCategory === cat.name 
                  ? 'bg-[#EEF2FF] text-[#6D5EF8] font-bold' 
                  : 'text-[#4B5563] hover:bg-[#F3F4F6] hover:text-[#111827]'
                }`}
              >
                {cat.name}
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  activeCategory === cat.name ? 'bg-[#6D5EF8]/10 text-[#6D5EF8]' : 'bg-[#F3F4F6] text-[#9CA3AF]'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="flex-grow">
          {filteredFaqs.length > 0 ? (
            <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm divide-y divide-[#E5E7EB]">
              {filteredFaqs.map((faq) => (
                <div key={faq.id} className="p-6">
                  <button 
                    onClick={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
                    className="w-full flex items-center justify-between text-left focus:outline-none group"
                  >
                    <span className="font-bold text-[#111827] group-hover:text-[#6D5EF8] transition-colors pr-8">
                      {faq.question}
                    </span>
                    <ChevronDown 
                      className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${openFaqId === faq.id ? 'rotate-180 text-[#6D5EF8]' : ''}`} 
                    />
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaqId === faq.id ? 'max-h-96 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="text-sm text-[#4B5563] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-12 text-center shadow-sm">
              <h3 className="font-bold text-[#111827] mb-2">No questions found</h3>
              <p className="text-sm text-[#6B7280]">Try adjusting your search query or select a different category.</p>
            </div>
          )}

          {/* Contact Support CTA */}
          <div className="mt-8 bg-[#FAF5FF] border border-[#E9D5FF] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm border border-[#E9D5FF]">
                <Headphones className="w-6 h-6 text-[#8B5CF6]" />
              </div>
              <div>
                <h3 className="font-bold text-[#111827] text-base mb-1">Still have questions?</h3>
                <p className="text-xs text-[#6B7280]">Our support team is ready to help you.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Link href="/contact" className="flex-1 md:flex-none text-center bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white font-bold py-2.5 px-6 rounded-xl text-sm transition-colors shadow-sm">
                Contact Support
              </Link>
              <a href="mailto:helloquicktool@gmail.com" className="flex-1 md:flex-none text-center bg-white border border-[#E5E7EB] hover:bg-[#F9FAFB] text-[#374151] font-bold py-2.5 px-6 rounded-xl text-sm transition-colors shadow-sm">
                Email Us
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
