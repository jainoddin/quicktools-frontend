'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock } from 'lucide-react';
import Stepper from '../../../components/checkout/Stepper';
import { getEndpoint } from '@/lib/api';

function ProcessingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  useEffect(() => {
    if (!orderId) {
      router.replace('/checkout/failed?reason=missing-order');
      return;
    }

    const controller = new AbortController();
    let attempts = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const checkStatus = async () => {
      attempts += 1;
      try {
        const response = await fetch(getEndpoint(`/api/payment/status/${encodeURIComponent(orderId)}`), {
          credentials: 'include',
          signal: controller.signal,
          cache: 'no-store',
        });
        if (response.status === 401) return router.replace('/login?next=/checkout/processing');
        const result = await response.json();
        if (result.status === 'paid') return router.replace('/checkout/success');
        if (result.status === 'failed' || result.status === 'cancelled') return router.replace('/checkout/failed');
      } catch (error) {
        if (controller.signal.aborted) return;
      }

      if (attempts >= 20) return router.replace('/checkout/failed?reason=verification-timeout');
      timer = setTimeout(checkStatus, 1500);
    };

    void checkStatus();
    return () => {
      controller.abort();
      if (timer) clearTimeout(timer);
    };
  }, [orderId, router]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6">
      <div className="max-w-[800px] mx-auto bg-white rounded-3xl border border-[#E5E7EB] shadow-sm p-6 sm:p-10 flex flex-col items-center">
        <div className="w-full"><Stepper currentStep={3} /></div>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="relative w-40 h-40 mb-10 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-[#EEF2FF] animate-ping opacity-75" />
            <div className="absolute inset-4 rounded-full bg-[#E0E7FF] animate-pulse" />
            <div className="w-20 h-16 bg-[#6D5EF8] rounded-xl relative z-10 shadow-lg flex items-center justify-center">
              <Lock className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-xl font-bold text-[#111827] mb-2">Verifying your payment...</h1>
          <p className="text-[#6B7280] mb-8 text-sm">Please keep this window open while we confirm the server payment status.</p>
          <div className="flex gap-2" aria-label="Checking payment status">
            {[0, 1, 2, 3].map((i) => <div key={i} className="w-2.5 h-2.5 bg-[#6D5EF8] rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProcessingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC]" aria-label="Loading payment verification" />}>
      <ProcessingContent />
    </Suspense>
  );
}
