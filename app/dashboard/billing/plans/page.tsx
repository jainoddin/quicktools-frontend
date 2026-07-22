'use client';
import React, { useState } from 'react';
import DashboardLayout from '../../../../components/dashboard/DashboardLayout';
import { CheckCircle2, ShieldCheck, XCircle, Gift, Crown, Building2, X } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { trackBeginCheckout } from '@/lib/analytics';

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
    yearlyPrice: 43.20,
    features: [
      { name: '14,400 Credits / year', included: true },
      { name: 'HD Image Generation', included: true },
      { name: 'Fast Processing', included: true },
      { name: 'Priority Support', included: true },
      { name: 'AI Text Summarizer', included: true },
      { name: 'AI Code Writer', included: true },
    ],
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
    yearlyPrice: 72.00,
    features: [
      { name: '18,000 Credits / year', included: true },
      { name: 'Team Members (Up to 5)', included: true },
      { name: 'API Access', included: true },
      { name: 'Admin Dashboard', included: true },
      { name: 'Dedicated Support', included: true },
      { name: 'Custom AI Solutions', included: true },
    ],
    popular: false,
    color: 'blue'
  }
];

export default function BillingPlansPage() {
  const [isYearly, setIsYearly] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  
  const currentPlan = (user?.plan || 'free').toLowerCase();

  const handlePlanClick = (planId: string) => {
    if (planId === currentPlan) return; // Do nothing if it's the current plan
    if (planId === 'free') {
      router.push('/dashboard');
    } else {
      trackBeginCheckout(planId);
      router.push(`/checkout?plan=${planId}`);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#111827] mb-1">Billing</h1>
        <div className="text-sm font-medium text-[#6B7280] flex items-center gap-2">
          <Link href="/dashboard/billing" className="hover:text-[#111827] transition-colors">Billing</Link>
          <span className="text-[#D1D5DB]">/</span>
          <span className="text-[#111827]">Plans</span>
        </div>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-[24px] p-6 lg:p-10 shadow-sm relative overflow-hidden">
        
        {/* Header & Toggle */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 relative z-10">
          <div>
            <h2 className="text-2xl font-bold text-[#111827] mb-2">Choose Your Plan</h2>
            <p className="text-sm text-[#6B7280]">Select the perfect plan for your needs</p>
          </div>
          
          <div className="flex items-center gap-2 bg-[#F9FAFB] p-1.5 rounded-xl border border-[#E5E7EB] self-start md:self-auto">
            <button 
              onClick={() => setIsYearly(false)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${!isYearly ? 'bg-white text-[#111827] shadow-sm' : 'text-[#6B7280] hover:text-[#111827]'}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setIsYearly(true)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${isYearly ? 'bg-white text-[#111827] shadow-sm' : 'text-[#6B7280] hover:text-[#111827]'}`}
            >
              Yearly <span className="bg-[#ECFDF5] text-[#10B981] text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mb-12 relative z-10">
          {plans.map((plan) => {
            const isCurrent = currentPlan === plan.id;
            
            return (
              <div 
                key={plan.id} 
                className={`relative flex flex-col bg-white rounded-3xl p-8 transition-transform ${plan.popular ? `border-2 ${plan.color === 'gold' ? 'border-[#F59E0B] shadow-[#F59E0B]/10' : 'border-[#6D5EF8] shadow-[#6D5EF8]/10'} shadow-xl lg:scale-105 z-10` : 'border border-[#E5E7EB] shadow-sm mt-4 mb-4 hover:shadow-md'}`}
              >
                {plan.popular && (
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 ${plan.color === 'gold' ? 'bg-[#F59E0B]' : 'bg-[#6D5EF8]'} text-white text-[10px] font-bold uppercase tracking-wider py-1 px-4 rounded-full flex items-center gap-1`}>
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

                <div className="flex-grow mb-8">
                  <ul className="space-y-4">
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

                <button 
                  onClick={() => handlePlanClick(plan.id)}
                  disabled={isCurrent}
                  className={`w-full py-3.5 font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 ${
                    isCurrent 
                      ? 'bg-[#111827] hover:bg-black text-white shadow-gray-900/20 cursor-default' 
                      : plan.color === 'gold' 
                        ? 'bg-[#F59E0B] hover:bg-[#D97706] text-white shadow-[#F59E0B]/20'
                        : 'bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white shadow-[#6D5EF8]/20'
                  }`}
                >
                  {isCurrent ? 'Current Plan' : `Upgrade to ${plan.name}`}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-sm text-[#6B7280] relative z-10 border-t border-[#E5E7EB] pt-8">
          <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#9CA3AF]"/> Secure payments</div>
          <div className="flex items-center gap-2"><XCircle className="w-4 h-4 text-[#9CA3AF]"/> Cancel anytime</div>
          <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#9CA3AF]"/> 30-day money back guarantee</div>
        </div>
      </div>
    </DashboardLayout>
  );
}
