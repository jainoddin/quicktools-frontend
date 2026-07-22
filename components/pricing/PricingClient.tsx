'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Gift, Crown, Building2, CheckCircle2, X, HelpCircle, ArrowRight, Zap, ChevronDown, ChevronUp, Home, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { trackBeginCheckout, trackBillingPeriodToggle } from '@/lib/analytics';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    icon: Gift,
    description: 'Perfect for getting started',
    originalPrice: 10,
    monthlyPrice: 3.60,
    yearlyPrice: 43.20,
    features: [
      { name: '500 Credits / month', included: true },
      { name: 'Standard Image Generation', included: true },
      { name: 'AI Background Remover', included: true },
      { name: 'AI Text Summarizer', included: true },
      { name: 'AI Code Writer', included: true },
      { name: 'HD Image Generation', included: false },
    ],
    buttonText: 'Get Starter',
    popular: false,
    color: 'blue'
  },
  {
    id: 'pro',
    name: 'Pro',
    icon: Crown,
    description: 'For professionals and creators',
    originalPrice: 40,
    monthlyPrice: 4.00,
    yearlyPrice: 43.20, // 3.60 * 12
    features: [
      { name: '14,400 Credits / year', included: true },
      { name: 'HD Image Generation', included: true },
      { name: 'Fast Processing', included: true },
      { name: 'Priority Support', included: true },
      { name: 'AI Text Summarizer', included: true },
      { name: 'AI Code Writer', included: true },
    ],
    buttonText: 'Get Pro',
    popular: true,
    color: 'gold'
  },
  {
    id: 'business',
    name: 'Business',
    icon: Building2,
    description: 'For teams and power users',
    originalPrice: 100,
    monthlyPrice: 7.00,
    yearlyPrice: 72.00, // 6.00 * 12
    features: [
      { name: '18,000 Credits / year', included: true },
      { name: 'Team Members (Up to 5)', included: true },
      { name: 'API Access', included: true },
      { name: 'Admin Dashboard', included: true },
      { name: 'Dedicated Support', included: true },
      { name: 'Custom AI Solutions', included: true },
    ],
    buttonText: 'Contact Sales',
    popular: false,
    color: 'blue'
  }
];

const compareFeatures = [
  { name: 'Access Limit', starter: '100 / month', pro: 'Unlimited', business: 'Unlimited' },
  { name: 'HD Image Generation', starter: false, pro: true, business: true },
  { name: 'AI Background Remover', starter: true, pro: true, business: true },
  { name: 'AI Text Summarizer', starter: true, pro: true, business: true },
  { name: 'AI Code Writer', starter: true, pro: true, business: true },
  { name: 'API Access', starter: false, pro: false, business: true },
  { name: 'Team Management', starter: false, pro: false, business: true },
  { name: 'Support', starter: 'Community', pro: 'Priority Email', business: 'Dedicated Account Manager' },
];

const faqs = [
  { q: 'What happened to the Free Trial?', a: 'To ensure high quality service, we have removed the free tier. Our Starter plan is perfect for beginners and is heavily discounted for the first month.' },
  { q: 'What happens after the first month?', a: 'The 50% discount is a special offer for your first month! From the second month onwards, the subscription renews at the regular price. You can cancel anytime.' },
  { q: 'Can I upgrade my plan later?', a: 'Yes! You can upgrade from Starter to Pro or Business at any time. Your billing will be pro-rated.' },
  { q: 'Can I cancel my subscription anytime?', a: 'Yes, you can cancel your subscription at any time from your account settings. You will not be charged for the next month.' }
];

export default function PricingClient() {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  const handlePlanClick = (planId: string) => {
    if (isLoading) return; // Wait for auth check
    
    if (!isAuthenticated) {
      router.push('/login?callbackUrl=/pricing');
      return;
    }

    if (planId === 'free') {
      router.push('/dashboard'); // Go directly to the user dashboard
    } else {
      trackBeginCheckout(planId);
      router.push(`/checkout?plan=${planId}`);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-0">
      
      {/* ── BREADCRUMB ── */}
      <div className="bg-transparent pt-[15px] pb-[25px]">
        <div className="flex items-center gap-2 text-sm text-[#6B7280]">
          <Link href="/" className="hover:text-[#111827] flex items-center gap-1 transition-colors">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          <span className="text-[#6D5EF8] font-semibold">Pricing</span>
        </div>
      </div>
      {/* ── HEADER ── */}
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#EEF2FF] text-[#6D5EF8] text-xs font-bold uppercase tracking-widest mb-6">
          Pricing
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-[#111827] leading-tight mb-4 tracking-tight">
          Choose the <span className="text-[#6D5EF8]">Perfect Plan</span>
        </h1>
        <p className="text-[#6B7280] text-lg mb-8">
          Simple, transparent pricing for everyone.<br/>Start free and upgrade anytime.
        </p>

        {/* Toggle */}
        <div className="inline-flex items-center p-1.5 bg-white border border-[#E5E7EB] rounded-full shadow-sm">
          <button 
            onClick={() => {
              setIsYearly(false);
              trackBillingPeriodToggle('monthly');
            }}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-colors ${!isYearly ? 'bg-white text-[#6D5EF8] shadow-sm' : 'text-[#6B7280] hover:text-[#111827]'}`}
          >
            Monthly
          </button>
          <button 
            onClick={() => {
              setIsYearly(true);
              trackBillingPeriodToggle('yearly');
            }}
            className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-colors ${isYearly ? 'bg-white text-[#6D5EF8] shadow-sm' : 'text-[#6B7280] hover:text-[#111827]'}`}
          >
            Yearly <span className="px-2 py-0.5 rounded-full bg-[#6D5EF8] text-white text-[10px]">Save 20%</span>
          </button>
        </div>
      </div>

      {/* ── PRICING CARDS ── */}
      <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20 relative">
        {plans.map((plan) => (
          <div 
            key={plan.id} 
            className={`relative flex flex-col bg-white rounded-3xl p-8 ${plan.popular ? `border-2 ${plan.color === 'gold' ? 'border-[#F59E0B] shadow-[#F59E0B]/10' : 'border-[#6D5EF8] shadow-[#6D5EF8]/10'} shadow-xl scale-105 z-10` : 'border border-[#E5E7EB] shadow-sm mt-4 mb-4'}`}
          >
            {plan.popular && (
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 ${plan.color === 'gold' ? 'bg-[#F59E0B]' : 'bg-[#6D5EF8]'} text-white text-[10px] font-bold uppercase tracking-wider py-1 px-4 rounded-full flex items-center gap-1`}>
                ★ MOST POPULAR
              </div>
            )}
            
            <div className="flex flex-col items-center text-center mb-6">
              <div className={`w-16 h-16 ${plan.color === 'gold' ? 'bg-[#FFFBEB]' : 'bg-[#EEF2FF]'} rounded-full flex items-center justify-center mb-4`}>
                <plan.icon className={`w-8 h-8 ${plan.color === 'gold' ? 'text-[#F59E0B]' : 'text-[#6D5EF8]'}`} />
              </div>
              <h3 className="text-2xl font-bold text-[#111827] mb-1">{plan.name}</h3>
              <p className="text-sm text-[#6B7280] h-10">{isYearly ? 'Save 20% on annual billing!' : plan.description}</p>
            </div>

            <div className="text-center mb-8">
              {plan.originalPrice && (
                <div className="text-sm font-bold text-[#9CA3AF] line-through mb-1">
                  ${plan.originalPrice}/month
                </div>
              )}
              <div className="flex items-end justify-center gap-1">
                <span className="text-4xl font-black text-[#111827]">${isYearly ? (plan.yearlyPrice / 12).toFixed(0) : plan.monthlyPrice}</span>
                <span className="text-[#6B7280] font-medium pb-1">/month</span>
              </div>
              {isYearly && (
                <div className="text-xs font-semibold text-[#10B981] mt-2">
                  Billed ${plan.yearlyPrice} yearly
                </div>
              )}
            </div>

            <div className="flex-grow">
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className={`flex items-center gap-3 text-sm font-medium ${feature.included ? 'text-[#374151]' : 'text-[#9CA3AF] line-through'}`}>
                    {feature.included ? (
                      <CheckCircle2 className={`w-5 h-5 text-white shrink-0 ${plan.color === 'gold' ? 'fill-[#F59E0B]' : 'fill-[#6D5EF8]'}`} />
                    ) : (
                      <X className="w-5 h-5 text-[#D1D5DB] shrink-0" />
                    )}
                    {feature.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto">
              <button 
                onClick={() => handlePlanClick(plan.id)}
                disabled={isAuthenticated && (user?.plan || 'free').toLowerCase() === plan.id}
                className={`w-full py-3 px-6 rounded-xl font-bold text-sm transition-all ${
                  isAuthenticated && (user?.plan || 'free').toLowerCase() === plan.id
                    ? 'bg-[#111827] hover:bg-black text-white shadow-md cursor-default'
                    : plan.popular 
                      ? (plan.color === 'gold' ? 'bg-[#F59E0B] hover:bg-[#D97706] text-white shadow-md' : 'bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white shadow-md')
                      : 'bg-white border-2 border-[#EEF2FF] text-[#6D5EF8] hover:border-[#6D5EF8] hover:bg-[#EEF2FF]'
                }`}
              >
                {isAuthenticated && (user?.plan || 'free').toLowerCase() === plan.id ? 'Current Plan' : plan.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── COMPARE PLANS ── */}
      <div className="max-w-5xl mx-auto mb-20">
        <h2 className="text-2xl font-bold text-center text-[#111827] mb-8">Compare Plans</h2>
        <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                  <th className="px-6 py-4 text-left text-sm font-bold text-[#111827]">Features</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-[#6D5EF8]">Starter</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-[#F59E0B]">
                    <div className="flex items-center justify-center gap-1">
                      Pro <Crown className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-[#111827]">Business</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {compareFeatures.map((row, i) => (
                  <tr key={i} className="hover:bg-[#F9FAFB]/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-[#374151]">{row.name}</td>
                    
                    <td className="px-6 py-4 text-center">
                      {typeof row.starter === 'boolean' ? (
                        row.starter ? <CheckCircle2 className="w-5 h-5 mx-auto text-white fill-[#6D5EF8]" /> : <X className="w-4 h-4 mx-auto text-[#D1D5DB]" />
                      ) : (
                        <span className="text-sm font-medium text-[#374151]">{row.starter}</span>
                      )}
                    </td>
                    
                    <td className="px-6 py-4 text-center">
                      {typeof row.pro === 'boolean' ? (
                        row.pro ? <CheckCircle2 className="w-5 h-5 mx-auto text-white fill-[#F59E0B]" /> : <X className="w-4 h-4 mx-auto text-[#D1D5DB]" />
                      ) : (
                        <span className="text-sm font-medium text-[#374151]">{row.pro}</span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-center">
                      {typeof row.business === 'boolean' ? (
                        row.business ? <CheckCircle2 className="w-5 h-5 mx-auto text-white fill-[#6D5EF8]" /> : <X className="w-4 h-4 mx-auto text-[#D1D5DB]" />
                      ) : (
                        <span className="text-sm font-medium text-[#374151]">{row.business}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div className="max-w-4xl mx-auto mb-20">
        <h2 className="text-2xl font-bold text-center text-[#111827] mb-8">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className={`bg-white border rounded-xl overflow-hidden transition-all ${openFaq === i ? 'border-[#6D5EF8] shadow-sm' : 'border-[#E5E7EB] hover:border-[#D1D5DB]'}`}
            >
              <button 
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#EEF2FF] flex items-center justify-center shrink-0">
                    <HelpCircle className="w-4 h-4 text-[#6D5EF8]" />
                  </div>
                  <span className="font-bold text-sm text-[#111827]">{faq.q}</span>
                </div>
                {openFaq === i ? (
                  <ChevronUp className="w-4 h-4 text-[#6B7280]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#6B7280]" />
                )}
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5 pt-0 text-sm text-[#6B7280] pl-14">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA BANNER ── */}
      <div className="max-w-5xl mx-auto bg-[#F5F3FF] border border-[#EDE9FE] rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <div className="w-16 h-16 bg-[#6D5EF8] rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-[#6D5EF8]/20 rotate-3">
            <Zap className="w-8 h-8 text-white fill-white" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-[#111827] mb-2">Ready to create amazing AI content?</h3>
            <p className="text-[#4C1D95] text-sm max-w-lg font-medium">
              Join thousands of creators and businesses using QuickTools.ai to save time and boost productivity.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center shrink-0">
          <button 
            onClick={() => handlePlanClick('starter')}
            className="bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white font-bold py-3.5 px-8 rounded-xl shadow-md transition-all flex items-center gap-2 mb-2"
          >
            Start Creating Now <ArrowRight className="w-4 h-4" />
          </button>
          <span className="text-[11px] text-[#6D5EF8] font-medium">Cancel anytime</span>
        </div>
      </div>

    </div>
  );
}
