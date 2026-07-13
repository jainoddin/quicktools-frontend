'use client';

import React, { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const faqs = [
  {
    q: 'What is QuickTools.ai?',
    a: 'QuickTools.ai is an all-in-one platform providing access to powerful AI models for generating images, writing content, analyzing code, and creating videos.'
  },
  {
    q: 'Are the tools really free to use?',
    a: 'Yes, we offer a generous free tier that lets you test out our most popular AI tools. You can upgrade to a premium plan for unlimited access and advanced features.'
  },
  {
    q: 'Do I need a credit card to start?',
    a: 'No, you do not need a credit card to sign up and start using the free tools. A credit card is only required when upgrading to a premium subscription.'
  },
  {
    q: 'Is my data safe with QuickTools.ai?',
    a: 'Absolutely. We use industry-standard encryption to protect your data. Your prompts and generated content remain private to your account.'
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a
      }
    }))
  };

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h2 className="text-xl sm:text-2xl font-bold text-[#111827] mb-8 text-center sm:text-left">Frequently Asked Questions</h2>
      <div className="grid md:grid-cols-2 gap-4 mb-8 items-start">
        {faqs.map((faq, i) => (
          <div 
            key={i} 
            className={`bg-white rounded-2xl border transition-all cursor-pointer ${openIndex === i ? 'border-[#6D5EF8] shadow-md' : 'border-gray-100 hover:shadow-sm'}`}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <div className="p-5 flex justify-between items-center group">
              <span className={`font-semibold text-sm sm:text-base transition-colors ${openIndex === i ? 'text-[#6D5EF8]' : 'text-[#111827]'}`}>{faq.q}</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${openIndex === i ? 'rotate-180 text-[#6D5EF8]' : 'text-gray-400 group-hover:text-[#4F46E5]'}`} />
            </div>
            {openIndex === i && (
              <div className="px-5 pb-5 pt-0 text-sm text-[#6B7280] leading-relaxed animate-in fade-in slide-in-from-top-2">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <Link href="/faq" className="text-sm font-semibold text-[#4F46E5] hover:text-[#4338CA] flex items-center justify-center gap-1 transition-colors">
          View all FAQs <ArrowRight className="w-4 h-4"/>
        </Link>
      </div>
    </section>
  );
}
