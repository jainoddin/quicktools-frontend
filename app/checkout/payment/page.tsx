'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ShieldCheck, CreditCard, Smartphone, Loader2, Zap, Building2 } from 'lucide-react';
import Stepper from '../../../components/checkout/Stepper';
import { useAuth } from '@/contexts/AuthContext';
import { getEndpoint } from '@/lib/api';
import { trackBeginCheckout, trackPurchase, trackAddPaymentInfo } from '@/lib/analytics';

/* ─── Brand Logo Images ─── */
const VisaLogo       = () => <img src="https://raw.githubusercontent.com/gilbarbara/logos/main/logos/visa.svg" alt="Visa" className="h-6 w-auto object-contain" />;
const MastercardLogo = () => <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-7 w-auto object-contain" />;
const RupayLogo      = () => <img src="https://upload.wikimedia.org/wikipedia/commons/d/d1/RuPay.svg" alt="RuPay" className="h-6 w-auto object-contain" />;
const UpiLogo        = () => <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-7 w-auto object-contain" />;
const PhonePeLogo    = () => <img src="https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg" alt="PhonePe" className="h-6 w-auto object-contain" />;

/* ─── Input style ─── */
const inputCls = "w-full px-4 py-3 rounded-xl border border-[#D1D5DB] bg-white text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#6D5EF8]/30 focus:border-[#6D5EF8] transition-all";

/* ─── Card Form ─── */
interface CardData { number: string; expiry: string; cvv: string; name: string; }
const CardForm = ({ data, onChange }: { data: CardData; onChange: (d: CardData) => void }) => (
  <div className="mt-4 p-5 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] space-y-4">
    <div>
      <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Card Number</label>
      <div className="relative">
        <input
          type="text" placeholder="1234  5678  9012  3456" maxLength={19}
          value={data.number}
          onChange={e => onChange({ ...data, number: e.target.value })}
          className={`${inputCls} pr-12 font-mono`}
        />
        <CreditCard className="absolute right-4 top-3.5 w-4 h-4 text-[#9CA3AF]" />
      </div>
    </div>
    <div className="grid grid-cols-2 gap-3">
      <div>
        <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Expiry Date</label>
        <input type="text" placeholder="MM / YY" maxLength={7}
          value={data.expiry}
          onChange={e => onChange({ ...data, expiry: e.target.value })}
          className={`${inputCls} font-mono`} />
      </div>
      <div>
        <label className="text-xs font-semibold text-[#374151] mb-1.5 block">CVV</label>
        <input type="password" placeholder="• • •" maxLength={4}
          value={data.cvv}
          onChange={e => onChange({ ...data, cvv: e.target.value })}
          className={`${inputCls} font-mono`} />
      </div>
    </div>
    <div>
      <label className="text-xs font-semibold text-[#374151] mb-1.5 block">Name on Card</label>
      <input type="text" placeholder="John Doe"
        value={data.name}
        onChange={e => onChange({ ...data, name: e.target.value })}
        className={inputCls} />
    </div>
  </div>
);

/* ─── UPI Form ─── */
const UpiForm = ({ upiId, onChange }: { upiId: string; onChange: (v: string) => void }) => (
  <div className="mt-4 p-5 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB]">
    <div className="flex flex-col items-center py-2 gap-4">

      {/* Secure info panel */}
      <div className="w-full flex flex-col items-center gap-3 p-4 bg-[#6D5EF8]/5 border border-[#6D5EF8]/20 rounded-2xl">
        <div className="w-14 h-14 rounded-2xl bg-[#6D5EF8] flex items-center justify-center shadow-md">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg"
            alt="UPI" className="w-8 h-8 object-contain"
          />
        </div>
        <div className="text-center">
          <p className="text-sm font-bold text-[#111827]">Pay via UPI</p>
          <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
            Click <span className="font-bold text-[#6D5EF8]">"Pay $1.00"</span> below →
            Razorpay popup opens → <span className="font-semibold">UPI tab</span> select cheyyi →
            UPI ID enter cheyyi or QR scan cheyyi
          </p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-3 py-2 w-full">
          <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
          <p className="text-[11px] text-green-700 font-medium">
            Payment request goes directly to your UPI app — 100% secure
          </p>
        </div>
      </div>

      {/* Optional prefill UPI ID */}
      <div className="w-full">
        <label className="text-xs font-semibold text-[#374151] mb-1.5 block">
          UPI ID <span className="text-[#9CA3AF] font-normal">(optional — to pre-fill)</span>
        </label>
        <input type="text" placeholder="yourname@oksbi"
          value={upiId}
          onChange={e => onChange(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-[#D1D5DB] bg-white text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#6D5EF8]/30 focus:border-[#6D5EF8] transition-all" />
        <p className="text-[11px] text-[#9CA3AF] mt-1.5">Example: name@oksbi · name@paytm · name@ybl</p>
      </div>

    </div>
  </div>
);

/* ─── PhonePe Form ─── */
const PhonePeForm = ({ mobile, onChange }: { mobile: string; onChange: (v: string) => void }) => (
  <div className="mt-4 p-5 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB]">
    <div className="flex flex-col items-center py-2 gap-4">

      {/* Secure dynamic QR info */}
      <div className="w-full flex flex-col items-center gap-3 p-4 bg-[#5B2D8E]/5 border border-[#5B2D8E]/20 rounded-2xl">
        <div className="w-14 h-14 rounded-2xl bg-[#5B2D8E] flex items-center justify-center shadow-md">
          <Smartphone className="w-7 h-7 text-white" />
        </div>
        <div className="text-center">
          <p className="text-sm font-bold text-[#111827]">Secure UPI QR</p>
          <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
            Click <span className="font-bold text-[#5B2D8E]">"Pay $1.00"</span> below → Razorpay popup opens →{' '}
            <span className="font-semibold">UPI tab</span> select cheyyi → Scan QR with PhonePe
          </p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-3 py-2 w-full">
          <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
          <p className="text-[11px] text-green-700 font-medium">
            QR is tied to your Order ID — cannot be tampered with
          </p>
        </div>
      </div>

      <div className="w-full flex items-center gap-3">
        <div className="flex-1 h-px bg-[#E5E7EB]" />
        <span className="text-[11px] text-[#9CA3AF] font-medium">OR enter mobile</span>
        <div className="flex-1 h-px bg-[#E5E7EB]" />
      </div>

      <div className="w-full">
        <label className="text-xs font-semibold text-[#374151] mb-1.5 block">PhonePe Registered Mobile</label>
        <input type="tel" placeholder="+91 98765 43210" maxLength={14}
          value={mobile}
          onChange={e => onChange(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-[#D1D5DB] bg-white text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#5B2D8E]/30 focus:border-[#5B2D8E] transition-all" />
      </div>
    </div>
  </div>
);

/* ─── Payment Methods List ─── */
const paymentMethods = [
  { id: 'card',    title: 'Card',    description: 'Visa, Mastercard, Rupay',  logos: [<VisaLogo key="v"/>, <MastercardLogo key="mc"/>, <RupayLogo key="rp"/>] },
];

// --- Main Payment Page ---
function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  
  const planId = searchParams.get('plan') || 'pro';
  
  let planName = 'Pro Plan';
  let planIcon = <Zap className="w-5 h-5 text-[#6D5EF8]" />;
  let totalAmount = '23.60';

  if (planId === 'starter') {
    planName = 'Starter Plan';
    totalAmount = '5.90';
  } else if (planId === 'business') {
    planName = 'Business Plan';
    planIcon = <Building2 className="w-5 h-5 text-[#6D5EF8]" />;
    totalAmount = '59.00';
  }

  const [selectedMethod, setSelectedMethod] = useState('card');
  const [loading, setLoading]               = useState(false);
  const [error, setError]                   = useState('');

  // Card state
  const [cardData, setCardData] = useState({ number: '', expiry: '', cvv: '', name: '' });
  // UPI state
  const [upiId, setUpiId]       = useState('');
  // PhonePe state
  const [mobile, setMobile]     = useState('');

  const handlePay = async () => {
    setLoading(true);
    setError('');

    try {
      trackBeginCheckout(planId, Number(totalAmount));

      // Step 1 — Backend lo Razorpay order create
      const res = await fetch(getEndpoint('/api/payment/create-order'), {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          plan: planId, 
          email: user?.email || 'guest@example.com',
          userId: user?.id
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed to create order');

      // Step 2 — Method based prefill
      // Razorpay popup lo correct tab pre-select avutundi
      type RazorpayPrefill = {
        name?: string;
        email?: string;
        contact?: string;
        method?: string;
        'card[number]'?: string;
        'card[expiry]'?: string;
        'card[cvv]'?: string;
        vpa?: string;
      };

      const prefill: RazorpayPrefill = { email: 'user@example.com' };

      if (selectedMethod === 'card') {
        prefill.method         = 'card';
        prefill.name           = cardData.name || 'User';
        prefill['card[number]']= cardData.number.replace(/\s/g, '');
      } else if (selectedMethod === 'upi') {
        prefill.method = 'upi';
        if (upiId) prefill.vpa = upiId;
      } else if (selectedMethod === 'phonepe') {
        // PhonePe is UPI — contact number prefill chestam
        prefill.method  = 'upi';
        prefill.contact = mobile.replace(/\s/g, '');
      }

      // Step 3 — Razorpay checkout open
      const options = {
        key:         data.keyId,
        amount:      data.amount,
        currency:    data.currency,
        order_id:    data.orderId,
        name:        'QuickTools.ai',
        description: `${planName} Subscription`,
        prefill,
        theme: { color: '#6D5EF8' },

        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          // Step 4 — Backend lo signature verify
          const verifyRes = await fetch(getEndpoint('/api/payment/verify'), {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpayOrderId:   response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            }),
          });
          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            trackPurchase({
              plan: planId,
              value: Number(totalAmount),
              transactionId: response.razorpay_payment_id,
            });
            router.replace('/checkout/success');
          } else {
            router.replace('/checkout/failed');
          }
        },

        modal: {
          ondismiss: () => setLoading(false),
        },
      };

      const RazorpayConstructor = (window as any).Razorpay;
      if (!RazorpayConstructor) throw new Error('Razorpay not loaded. Check internet.');
      new RazorpayConstructor(options).open();

    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6">
      <div className="max-w-[800px] mx-auto bg-white rounded-3xl border border-[#E5E7EB] shadow-sm p-6 sm:p-10">

        <Stepper currentStep={3} />

        <h1 className="text-xl font-bold text-[#111827] mb-6">Select Payment Method</h1>

        <div className="space-y-3 mb-8">
          {paymentMethods.map((method) => (
            <div key={method.id}>
              <label className={`flex items-center p-5 rounded-2xl border cursor-pointer transition-all ${
                selectedMethod === method.id
                  ? 'border-[#6D5EF8] bg-[#EEF2FF] shadow-sm shadow-[#6D5EF8]/10'
                  : 'border-[#E5E7EB] hover:border-[#D1D5DB] bg-white'
              }`}>
                <input
                  type="radio" name="payment_method" value={method.id}
                  checked={selectedMethod === method.id}
                  onChange={() => {
                    setSelectedMethod(method.id);
                    trackAddPaymentInfo(method.id, planId);
                  }}
                  className="w-5 h-5 text-[#6D5EF8] border-[#D1D5DB] focus:ring-[#6D5EF8] shrink-0"
                />
                <div className="ml-4 flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="block text-sm font-bold text-[#111827]">{method.title}</span>
                    <span className="block text-xs font-medium text-[#6B7280]">{method.description}</span>
                  </div>
                  <div className="flex items-center gap-2">{method.logos}</div>
                </div>
              </label>

              {/* Expanded form per method */}
              {selectedMethod === method.id && (
                <>
                  {method.id === 'card'    && <CardForm    data={cardData} onChange={setCardData} />}
                  {method.id === 'upi'     && <UpiForm     upiId={upiId}   onChange={setUpiId} />}
                  {method.id === 'phonepe' && <PhonePeForm mobile={mobile} onChange={setMobile} />}
                </>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 text-xs font-medium text-[#6B7280] mb-6">
          <ShieldCheck className="w-4 h-4 text-[#10B981]" />
          Secure payments powered by
          <span className="font-black text-[#6D5EF8] bg-[#EEF2FF] px-1.5 py-0.5 rounded">Razorpay</span>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600 font-medium">
            ⚠️ {error}
          </div>
        )}

        <button
          onClick={handlePay}
          disabled={loading}
          className="w-full bg-[#6D5EF8] hover:bg-[#5A4DE0] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-[#6D5EF8]/20 hover:shadow-[#6D5EF8]/30 flex items-center justify-center gap-2"
        >
          {loading
            ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
            : `Pay $${totalAmount}`
          }
        </button>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <PaymentContent />
    </Suspense>
  );
}
