'use client';

import React, { useState } from 'react';
import { 
  AlignLeft, Copy, CheckCircle2, Type
} from 'lucide-react';

export default function LoremIpsumClient() {
  const [count, setCount] = useState(3);
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const words = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'ut', 'aliquip', 'ex', 'ea',
    'commodo', 'consequat', 'duis', 'aute', 'irure', 'dolor', 'in', 'reprehenderit',
    'in', 'voluptate', 'velit', 'esse', 'cillum', 'dolore', 'eu', 'fugiat', 'nulla',
    'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat', 'non', 'proident',
    'sunt', 'in', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
  ];

  const generateWord = () => words[Math.floor(Math.random() * words.length)];

  const generateSentence = (isFirst = false) => {
    const length = Math.floor(Math.random() * 10) + 5;
    let sentence = [];
    
    if (isFirst && startWithLorem) {
      sentence = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet'];
      for (let i = 5; i < length; i++) sentence.push(generateWord());
    } else {
      for (let i = 0; i < length; i++) sentence.push(generateWord());
      sentence[0] = sentence[0].charAt(0).toUpperCase() + sentence[0].slice(1);
    }
    
    return sentence.join(' ') + '.';
  };

  const generateParagraph = (isFirst = false) => {
    const length = Math.floor(Math.random() * 5) + 4;
    let paragraph = [];
    for (let i = 0; i < length; i++) {
      paragraph.push(generateSentence(isFirst && i === 0));
    }
    return paragraph.join(' ');
  };

  const handleGenerate = () => {
    let generated = [];
    
    if (type === 'paragraphs') {
      for (let i = 0; i < count; i++) generated.push(generateParagraph(i === 0));
      setResult(generated.join('\n\n'));
    } else if (type === 'sentences') {
      for (let i = 0; i < count; i++) generated.push(generateSentence(i === 0));
      setResult(generated.join(' '));
    } else {
      if (startWithLorem && count >= 5) {
        generated = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet'];
        for (let i = 5; i < count; i++) generated.push(generateWord());
      } else {
        for (let i = 0; i < count; i++) generated.push(generateWord());
      }
      setResult(generated.join(' '));
    }
  };

  // Generate on mount
  React.useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-full">
      
      {/* Left Sidebar */}
      <aside className="w-full lg:w-[340px] shrink-0 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
        
        <div className="bg-white rounded-3xl p-6 border border-[#E5E7EB] shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-[#E5E7EB]">
            <div className="w-10 h-10 bg-[#14B8A6] rounded-xl flex items-center justify-center shadow-sm">
              <Type className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-bold text-[#111827]">Generator Settings</h2>
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-bold text-[#111827] mb-2">
              Paragraphs/Words Count
            </label>
            <input 
              type="number" 
              min="1" 
              max="100" 
              value={count} 
              onChange={(e) => setCount(Math.max(1, Math.min(100, Number(e.target.value))))}
              className="w-full p-3 bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6]"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#111827] mb-3">Format</label>
            <div className="space-y-2">
              {['paragraphs', 'sentences', 'words'].map((t) => (
                <label key={t} className="flex items-center gap-3 p-3 border border-[#E5E7EB] rounded-xl cursor-pointer hover:bg-[#FAFAFA] transition-colors group">
                  <input 
                    type="radio" 
                    name="type"
                    checked={type === t}
                    onChange={() => setType(t as any)}
                    className="w-4 h-4 text-[#14B8A6] focus:ring-[#14B8A6]"
                  />
                  <span className="text-sm font-bold text-[#4B5563] group-hover:text-[#111827] capitalize">{t}</span>
                </label>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-3 pt-4 border-t border-[#E5E7EB] cursor-pointer group">
            <input 
              type="checkbox" 
              checked={startWithLorem}
              onChange={(e) => setStartWithLorem(e.target.checked)}
              className="w-4 h-4 rounded text-[#14B8A6] focus:ring-[#14B8A6]"
            />
            <span className="text-sm font-bold text-[#4B5563] group-hover:text-[#111827]">Start with 'Lorem ipsum...'</span>
          </label>

          <button
            onClick={handleGenerate}
            className="w-full text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 bg-[#14B8A6] hover:bg-[#0D9488]"
          >
            <AlignLeft className="w-5 h-5" /> Generate Text
          </button>
        </div>

      </aside>

      {/* Right Main Area */}
      <main className="flex-grow flex flex-col min-w-0">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start lg:items-center justify-between gap-4 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both delay-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#14B8A6] rounded-xl flex items-center justify-center shadow-sm shrink-0">
              <AlignLeft className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#111827] flex items-center gap-2">
                Lorem Ipsum Generator 
              </h1>
              <p className="text-sm text-[#6B7280]">Generate dummy placeholder text for your designs instantly.</p>
            </div>
          </div>
        </div>

        <div className="flex-grow flex flex-col bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-sm animate-in zoom-in-95 duration-500 h-[600px]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#111827]">Generated Output</h2>
            <button 
              onClick={copyToClipboard}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
                copied 
                  ? 'bg-[#F0FDF4] text-[#16A34A]' 
                  : 'bg-[#F0FDFA] text-[#0D9488] hover:bg-[#CCFBF1]'
              }`}
            >
              {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Text'}
            </button>
          </div>
          
          <div className="flex-1 bg-[#FAFAFA] p-6 rounded-2xl border border-[#E5E7EB] overflow-y-auto">
            <p className="text-sm text-[#374151] whitespace-pre-wrap leading-relaxed">
              {result}
            </p>
          </div>
        </div>
      </main>

    </div>
  );
}
