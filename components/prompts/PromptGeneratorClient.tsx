'use client';

import { useState } from 'react';
import { Check, Copy, Loader2, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { getEndpoint } from '@/lib/api';

export default function PromptGeneratorClient() {
  const [goal, setGoal] = useState('');
  const [model, setModel] = useState('ChatGPT');
  const [category, setCategory] = useState('Productivity');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function generate() {
    if (goal.trim().length < 10) return toast.error('Please describe your goal clearly');
    setLoading(true); setResult(null);
    try {
      const response = await fetch(getEndpoint('/api/prompts/generate'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ goal, model, category }) });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || 'Generation failed');
      setResult(data.data);
    } catch (error: any) { toast.error(error.message || 'Generation failed'); }
    finally { setLoading(false); }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(result.prompt);
      setCopied(true); toast.success('Prompt copied'); setTimeout(() => setCopied(false), 1800);
    } catch { toast.error('Unable to copy. Please select the prompt manually.'); }
  }

  return <div className="space-y-6">
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm text-left">
      <label className="block text-sm font-bold text-gray-700 mb-2">What do you want the AI to do?</label>
      <textarea aria-describedby="prompt-goal-help" maxLength={1000} value={goal} onChange={e => setGoal(e.target.value)} className="w-full h-36 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Example: Create a 30-day social media plan for a local bakery..." />
      <div id="prompt-goal-help" className="mt-2 flex justify-between gap-3 text-xs text-gray-500"><span>Include your audience, goal, tone, and constraints for a better result.</span><span>{goal.length}/1000</span></div>
      <div className="grid sm:grid-cols-2 gap-4 my-4">
        <select aria-label="AI model" value={model} onChange={e => setModel(e.target.value)} className="p-3 rounded-xl border border-gray-200 bg-white"><option>ChatGPT</option><option>Claude</option><option>Gemini</option></select>
        <select aria-label="Prompt category" value={category} onChange={e => setCategory(e.target.value)} className="p-3 rounded-xl border border-gray-200 bg-white"><option>Productivity</option><option>Business</option><option>Marketing</option><option>Coding</option><option>SEO</option><option>Writing</option><option>Career</option><option>Education</option></select>
      </div>
      <button onClick={generate} disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2">{loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}{loading ? 'Generating...' : 'Generate Prompt'}</button>
    </div>
    {result && <div className="bg-[#0B0F19] text-white rounded-3xl p-6 sm:p-8 text-left shadow-xl">
      <div className="flex justify-between gap-4 mb-4"><div><p className="text-indigo-300 text-xs font-bold uppercase">{result.category} · {result.models?.[0]}</p><h2 className="text-2xl font-bold mt-1">{result.title}</h2></div><button onClick={copy} className="h-11 px-4 bg-white/10 rounded-xl flex items-center gap-2">{copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} Copy</button></div>
      <pre className="whitespace-pre-wrap text-sm leading-7 text-gray-200 font-mono">{result.prompt}</pre>
    </div>}
  </div>;
}
