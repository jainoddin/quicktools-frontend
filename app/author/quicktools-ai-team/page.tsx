import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Briefcase, Award, Sparkles, Code2, Users, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'QuickTools AI Team - Authors & Experts',
  description: 'Meet the QuickTools AI Team. We are a group of AI engineers, data scientists, and prompt engineering experts dedicated to bringing you the best AI tools and insights.',
  alternates: {
    canonical: 'https://quicktool.space/author/quicktools-ai-team'
  }
};

export default function AuthorPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* JSON-LD for Author Person/Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "QuickTools AI Team",
            "url": "https://quicktool.space/author/quicktools-ai-team",
            "logo": "https://pub-68a98c57e70a4a1fa317739dd20098b9.r2.dev/1b9be0e4-c385-49a5-b0b5-ef158e8ef402.png",
            "description": "Expert team of AI engineers and prompt engineering specialists developing cutting-edge AI tools.",
            "sameAs": [
              "https://twitter.com/quicktoolsai",
              "https://github.com/quicktoolsai"
            ]
          })
        }}
      />

      <div className="bg-white border-b border-[#E5E7EB] pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-[#EEF2FF] mb-6 shadow-md relative">
            <Image
              src="https://pub-68a98c57e70a4a1fa317739dd20098b9.r2.dev/1b9be0e4-c385-49a5-b0b5-ef158e8ef402.png"
              fill
              alt="QuickTools AI Team"
              className="object-cover"
              unoptimized
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#111827] mb-4">
            QuickTools AI Team
          </h1>
          <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto leading-relaxed">
            We are a dedicated team of AI engineers, data scientists, and content specialists. 
            Our mission is to democratize artificial intelligence by building intuitive, high-performance tools and providing expert industry analysis.
          </p>

          <div className="flex items-center justify-center gap-4 mt-8">
            <a href="mailto:hello@quicktool.space" className="flex items-center gap-2 px-6 py-3 bg-[#EEF2FF] text-[#4F46E5] font-bold rounded-xl hover:bg-[#E0E7FF] transition-colors">
              <Mail className="w-5 h-5" /> Contact Us
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-16">
        
        {/* Core Competencies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-[#EEF2FF] text-[#4F46E5] rounded-xl flex items-center justify-center mb-4">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#111827] mb-2">AI Engineering</h3>
            <p className="text-[#4B5563] leading-relaxed">
              We leverage advanced LLMs, open-source frameworks, and custom fine-tuning to build reliable production-grade AI tools.
            </p>
          </div>
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-[#FDF4FF] text-[#C026D3] rounded-xl flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#111827] mb-2">Prompt Optimization</h3>
            <p className="text-[#4B5563] leading-relaxed">
              Our prompt engineers meticulously craft and evaluate system prompts to ensure maximum output quality and minimize hallucinations.
            </p>
          </div>
        </div>

        {/* Editorial Standards */}
        <div className="bg-[#EEF2FF] rounded-3xl p-8 md:p-12 mb-16 border border-[#E0E7FF]">
          <h2 className="text-3xl font-bold text-[#111827] mb-6 flex items-center gap-3">
            <Award className="w-8 h-8 text-[#4F46E5]" />
            Our Editorial Standards
          </h2>
          <p className="text-[#4B5563] text-lg leading-relaxed mb-6">
            The AI landscape is moving at breakneck speed. We believe in providing accurate, hype-free, and actionable content. Every article, blog, and news piece undergoes rigorous technical review by our engineering team to ensure factual accuracy.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <CheckCircle />
              <span className="text-[#4B5563] font-medium">Fact-checked against official AI research papers and documentation.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle />
              <span className="text-[#4B5563] font-medium">Tools and software are personally evaluated by our team before recommendation.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle />
              <span className="text-[#4B5563] font-medium">Commitment to transparency and correcting technical inaccuracies immediately.</span>
            </li>
          </ul>
        </div>

        {/* Links to content */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#111827] mb-8">Explore Our Work</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/tools" className="flex items-center gap-2 px-6 py-4 bg-white border border-[#E5E7EB] text-[#111827] font-bold rounded-xl hover:border-[#4F46E5] hover:text-[#4F46E5] transition-all shadow-sm">
              <Briefcase className="w-5 h-5" /> Try Our AI Tools
            </Link>
            <Link href="/articles" className="flex items-center gap-2 px-6 py-4 bg-white border border-[#E5E7EB] text-[#111827] font-bold rounded-xl hover:border-[#4F46E5] hover:text-[#4F46E5] transition-all shadow-sm">
              <FileText className="w-5 h-5" /> Read Expert Articles
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

function CheckCircle() {
  return (
    <div className="w-6 h-6 rounded-full bg-[#4F46E5] text-white flex items-center justify-center shrink-0 mt-0.5">
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    </div>
  );
}
