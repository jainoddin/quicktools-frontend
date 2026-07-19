'use client';

import React, { useState } from 'react';
import { Palette, ArrowRight, Loader2, Copy, CheckCircle2 } from 'lucide-react';
import { getEndpoint } from '@/lib/api';

export default function AiColorPaletteClient() {
  const [description, setDescription] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [palette, setPalette] = useState<{hex: string, name: string}[]>([]);
  const [copied, setCopied] = useState(-1);

  const handleGenerate = async () => {
    if (!description.trim()) return;
    setIsProcessing(true);
    setPalette([]);
    
    try {
      const res = await fetch(getEndpoint('/api/tools/color-palette'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ description }),
      });
      const data = await res.json();
      if (data.success) {
        setPalette(data.palette);
      } else {
        alert('Failed: ' + data.message);
      }
    } catch (error) {
      alert('Error connecting to server');
    } finally {
      setIsProcessing(false);
    }
  };

  const copyHex = (hex: string, index: number) => {
    navigator.clipboard.writeText(hex);
    setCopied(index);
    setTimeout(() => setCopied(-1), 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-stretch">
      <div className="w-full lg:w-1/2 flex flex-col gap-5">
        <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#F5F3FF] flex items-center justify-center text-[#6D5EF8]">
              <Palette className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-[#111827]">Describe your Brand/Mood</h2>
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="E.g. A modern tech startup with a futuristic vibe, using dark blues and neon purple..."
            className="w-full h-40 p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl focus:border-[#6D5EF8] outline-none resize-none text-[15px]"
          />
          <button
            onClick={handleGenerate}
            disabled={isProcessing || !description.trim()}
            className="w-full mt-4 bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white font-bold py-4 rounded-2xl shadow-md transition-all flex items-center justify-center disabled:opacity-50"
          >
            {isProcessing ? (
              <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Generating...</>
            ) : (
              <><Palette className="w-5 h-5 mr-2" /> Generate Palette <ArrowRight className="w-5 h-5 ml-2" /></>
            )}
          </button>
        </div>
      </div>

      <div className="w-full lg:w-1/2">
        <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-sm h-full flex flex-col">
          <h2 className="text-lg font-bold text-[#111827] mb-4">Generated Palette</h2>
          
          <div className="flex-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-5 flex flex-col gap-3 justify-center">
            {palette.length > 0 ? (
              palette.map((color, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg shadow-inner" style={{ backgroundColor: color.hex }}></div>
                    <div>
                      <h3 className="font-bold text-gray-800">{color.hex}</h3>
                      <p className="text-xs text-gray-500">{color.name}</p>
                    </div>
                  </div>
                  <button onClick={() => copyHex(color.hex, index)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
                    {copied === index ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center text-[#9CA3AF]">
                <Palette className="w-12 h-12 mb-3 mx-auto text-gray-300" />
                <p>Your color palette will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
