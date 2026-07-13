import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Search, Rocket, CreditCard, Sparkles, 
  Code, User, ShieldCheck, ArrowRight, Home
} from 'lucide-react';
import HideWhenAuthenticated from '../../components/shared/HideWhenAuthenticated';

export const metadata: Metadata = {
  title: 'Help Center | QuickTools.ai',
  description: 'Find answers, tutorials and support to make the most of QuickTools.ai',
  alternates: { canonical: '/help' },
};

const categories = [
  {
    icon: <Rocket className="w-6 h-6 text-[#8B5CF6]" />,
    title: 'Getting Started',
    desc: 'Learn the basics and get started in minutes.'
  },
  {
    icon: <CreditCard className="w-6 h-6 text-[#10B981]" />,
    title: 'Billing & Subscription',
    desc: 'Manage your plan, payments and invoices.'
  },
  {
    icon: <Sparkles className="w-6 h-6 text-[#F59E0B]" />,
    title: 'AI Tools',
    desc: 'Everything about our powerful AI tools.'
  },
  {
    icon: <Code className="w-6 h-6 text-[#EC4899]" />,
    title: 'API Documentation',
    desc: 'Integrate QuickTools.ai with our API.'
  },
  {
    icon: <User className="w-6 h-6 text-[#06B6D4]" />,
    title: 'Account & Settings',
    desc: 'Manage your account, profile and preferences.'
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-[#6366F1]" />,
    title: 'Privacy & Security',
    desc: 'We take your privacy and security seriously.'
  }
];

export default function HelpCenterPage() {
  return (
    <div className="flex-grow bg-[#F8FAFC] font-sans selection:bg-[#6D5EF8] selection:text-white">
      
      {/* ── HERO SECTION ── */}
      <div className="relative pt-20 pb-16 px-4 overflow-hidden border-b border-[#E5E7EB] bg-white">
        <HideWhenAuthenticated>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-br from-[#EEF2FF] to-[#FAF5FF] blur-3xl opacity-60 rounded-full pointer-events-none -z-10"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-100/50 rounded-full blur-2xl -z-10"></div>
          <div className="absolute top-20 right-20 w-40 h-40 bg-purple-100/50 rounded-full blur-2xl -z-10"></div>
        </HideWhenAuthenticated>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <HideWhenAuthenticated>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#FFFBEB] text-[#D97706] text-xs font-bold mb-6 border border-[#FEF3C7] shadow-sm">
              <span className="mr-2">👋</span> How can we help?
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-[#111827] mb-4 tracking-tight">
              Help Center
            </h1>
            <p className="text-[#6B7280] text-sm md:text-base max-w-lg mx-auto mb-10 leading-relaxed">
              Find answers, tutorials and support to make the most of QuickTools.ai
            </p>
          </HideWhenAuthenticated>

          <div className="max-w-2xl mx-auto relative shadow-xl shadow-[#6D5EF8]/5 rounded-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search for articles, guides or topics..." 
              className="w-full pl-12 pr-32 py-4 rounded-2xl border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#6D5EF8]/20 focus:border-[#6D5EF8] transition-all text-sm bg-white"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-colors">
              Search
            </button>
          </div>

          <div className="mt-6 flex flex-wrap justify-center items-center gap-2 text-xs">
            <span className="text-[#6B7280] font-medium mr-2">Popular searches:</span>
            {['credits', 'billing', 'refund', 'api', 'usage'].map(tag => (
              <span key={tag} className="px-3 py-1 bg-white border border-[#E5E7EB] rounded-full text-[#374151] hover:border-[#6D5EF8] hover:text-[#6D5EF8] cursor-pointer transition-colors shadow-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTENT SECTION ── */}
      <div className="max-w-[1000px] mx-auto px-4 py-16">
        
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-[#111827]">Browse by category</h2>
          <Link href="/help/categories" className="text-sm font-bold text-[#6D5EF8] hover:underline flex items-center gap-1">
            View all categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-4 lg:gap-6 mb-16">
          {categories.map((cat, idx) => (
            <Link key={idx} href="#" className="bg-white border border-[#E5E7EB] p-6 rounded-2xl hover:shadow-md hover:border-[#6D5EF8]/30 transition-all group flex gap-4 items-start cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] flex items-center justify-center shrink-0 group-hover:bg-[#EEF2FF] transition-colors">
                {cat.icon}
              </div>
              <div>
                <h3 className="font-bold text-[#111827] mb-1 group-hover:text-[#6D5EF8] transition-colors">{cat.title}</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* ── CTA BANNER ── */}
        <div className="bg-[#FAF5FF] border border-[#E9D5FF] rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-32 h-32 bg-[#E9D5FF]/50 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          <div className="relative z-10 text-center md:text-left">
            <h3 className="font-bold text-[#111827] text-lg mb-1">Can't find what you're looking for?</h3>
            <p className="text-[#6B7280] text-sm">Our support team is here to help you 24/7.</p>
          </div>
          <Link href="/contact" className="relative z-10 whitespace-nowrap bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors shadow-sm flex items-center gap-2">
            Contact Support <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
