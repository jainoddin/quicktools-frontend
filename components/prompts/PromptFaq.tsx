"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ArrowRight } from 'lucide-react';

const faqs = [
  {
    q: "What is Prompt Hub?",
    a: "Prompt Hub is a curated library of 300+ practical AI prompts for ChatGPT, Claude, and Gemini. It helps you find a useful starting prompt for common tasks."
  },
  {
    q: "Are these prompts free to use?",
    a: "Yes! All prompts in the QuickTool Prompt Hub are completely free to view, copy, and use. You can also save them to your account for easy access later."
  },
  {
    q: "How do I use these prompts?",
    a: "Simply find a prompt you like, click the 'Copy' button, and paste it into your favorite AI tool (like ChatGPT). You can easily modify the bracketed text [like this] to fit your specific needs."
  },
  {
    q: "Which AI models are supported?",
    a: "The current library supports ChatGPT, Claude, and Gemini. Choose a model page or use the model tag shown on each prompt card."
  },
  {
    q: "Can I generate my own prompt?",
    a: "Yes. Open the free Prompt Generator, describe your goal, choose ChatGPT, Claude, or Gemini, and copy the generated prompt."
  },
  {
    q: "How can I save my favorite prompts?",
    a: "Create a free QuickTool account, and click the 'Bookmark' icon on any prompt card. It will be saved to your personal library for quick access anytime."
  }
];

export default function PromptFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <section className="w-full bg-white py-16 border-t border-gray-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }}
      />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10">
          <h2 className="text-2xl font-bold text-[#111827]">Frequently Asked Questions</h2>
          <Link href="/faq" className="text-indigo-600 font-semibold flex items-center gap-1 hover:text-indigo-700 transition mt-2 sm:mt-0 text-sm">
            View all FAQs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border-b transition-all duration-300 ${openIndex === index ? 'border-indigo-500' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <button 
                className="w-full py-5 flex items-center justify-between text-left font-medium text-gray-900"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {faq.q}
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-indigo-500' : ''}`} />
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-gray-500 text-sm leading-relaxed pr-8">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
