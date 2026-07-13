import { Metadata } from 'next';
import FaqClient from '../../components/faq/FaqClient';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | QuickTools.ai',
  description: 'Find quick answers to the most common questions about QuickTools.ai, including billing, accounts, and API usage.',
  alternates: { canonical: '/faq' },
};

export default function FaqPage() {
  // Add FAQ JSON-LD Schema for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is QuickTools.ai?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'QuickTools.ai is an all-in-one platform providing access to the most powerful AI tools for image generation, content writing, video creation, coding assistance, and SEO optimization. It is designed to save you time and help you work smarter.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do credits work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Credits are the currency used on QuickTools.ai. Different AI tools consume different amounts of credits per use. Free accounts get 15 credits per month, while premium plans offer significantly more.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you offer refunds?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we offer a 7-day money-back guarantee for our premium plans if you are not satisfied with the service and have used less than 10% of your allocated credits.',
        },
      }
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FaqClient />
    </>
  );
}
