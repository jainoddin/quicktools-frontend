import React from 'react';
import { Metadata } from 'next';
import PricingClient from '@/components/pricing/PricingClient';

export const metadata: Metadata = {
  title: 'Simple & Transparent Pricing Plans',
  description: 'Simple, transparent pricing for everyone. Start free and upgrade anytime to access premium AI generation features.',
  alternates: {
    canonical: '/pricing',
  }
};

export default function PricingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "QuickTools.ai Pricing",
    "description": "Simple, transparent pricing for everyone.",
    "url": "https://quicktool.space/pricing",
    "mainEntity": {
      "@type": "OfferCatalog",
      "name": "QuickTools.ai Subscription Plans",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Free Starter",
          "price": "0",
          "priceCurrency": "USD"
        },
        {
          "@type": "Offer",
          "name": "Pro Creator",
          "price": "9.99",
          "priceCurrency": "USD"
        }
      ]
    }
  };

  return (
    <div className="flex-grow bg-[#F8FAFC] font-sans selection:bg-[#6D5EF8] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PricingClient />
    </div>
  );
}
