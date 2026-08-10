import React from 'react';
import { Metadata } from 'next';
import PromptGeneratorClient from '../../../components/prompts/PromptGeneratorClient';
import { promptMetadata } from '../../../lib/promptMetadata';

export const metadata: Metadata = promptMetadata('Free AI Prompt Generator', 'Create a detailed custom prompt for ChatGPT, Claude, or Gemini. Choose your task and AI model, then copy your generated prompt free.', 'https://quicktool.space/prompts/generator');

export default function PromptGeneratorPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'QuickTools AI Prompt Generator',
        url: 'https://quicktool.space/prompts/generator',
        description: 'Create custom prompts for ChatGPT, Claude, and Gemini.',
        applicationCategory: 'ProductivityApplication',
        operatingSystem: 'Any',
        browserRequirements: 'Requires JavaScript and a modern web browser.',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        featureList: ['ChatGPT prompt generation', 'Claude prompt generation', 'Gemini prompt generation', 'Copy generated prompts'],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://quicktool.space' },
          { '@type': 'ListItem', position: 2, name: 'AI Prompts', item: 'https://quicktool.space/prompts' },
          { '@type': 'ListItem', position: 3, name: 'Prompt Generator', item: 'https://quicktool.space/prompts/generator' },
        ],
      },
    ],
  };
  return (
    <div className="flex-grow bg-[#F8FAFC] text-[#111827] py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-black mb-4">AI Prompt Generator</h1>
        <p className="text-gray-500 mb-8 text-lg">Describe what you want to achieve, and we&apos;ll generate the perfect prompt for you.</p>
        
        <PromptGeneratorClient />
      </div>
    </div>
  );
}
