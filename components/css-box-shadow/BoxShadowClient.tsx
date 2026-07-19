'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, Copy, CheckCircle2, SlidersHorizontal, Square
} from 'lucide-react';

export default function BoxShadowClient() {
  const [offsetX, setOffsetX] = useState(10);
  const [offsetY, setOffsetY] = useState(10);
  const [blurRadius, setBlurRadius] = useState(25);
  const [spreadRadius, setSpreadRadius] = useState(-5);
  const [shadowColor, setShadowColor] = useState('rgba(0, 0, 0, 0.25)');
  const [boxColor, setBoxColor] = useState('#FFFFFF');
  const [backgroundColor, setBackgroundColor] = useState('#F8FAFC');
  const [inset, setInset] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const boxShadowStyle = `${inset ? 'inset ' : ''}${offsetX}px ${offsetY}px ${blurRadius}px ${spreadRadius}px ${shadowColor}`;
  
  const cssCode = `box-shadow: ${boxShadowStyle};\n-webkit-box-shadow: ${boxShadowStyle};\n-moz-box-shadow: ${boxShadowStyle};`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start lg:items-center justify-between gap-4 mb-6 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#8B5CF6] rounded-xl flex items-center justify-center shadow-sm shrink-0">
            <Box className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#111827] flex items-center gap-2">
              CSS Box Shadow Generator
            </h1>
            <p className="text-sm text-[#6B7280]">Visually generate perfect CSS box shadows and copy the code.</p>
          </div>
        </div>
      </div>

      {/* Main Split View */}
      <div className="flex flex-col lg:flex-row gap-6 flex-grow min-h-0">
        
        {/* Left: Controls */}
        <div className="w-full lg:w-[400px] shrink-0 flex flex-col bg-white border border-[#E5E7EB] rounded-3xl overflow-y-auto shadow-sm p-6 space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-[#E5E7EB]">
            <SlidersHorizontal className="w-5 h-5 text-[#8B5CF6]" />
            <h2 className="text-base font-bold text-[#111827]">Shadow Controls</h2>
          </div>

          <label className="flex items-center gap-3 p-3 bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
            <input 
              type="checkbox" 
              checked={inset}
              onChange={(e) => setInset(e.target.checked)}
              className="w-5 h-5 rounded text-[#8B5CF6] focus:ring-[#8B5CF6]"
            />
            <span className="text-sm font-bold text-[#111827]">Inset Shadow</span>
          </label>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1 text-sm font-bold text-[#4B5563]">
                <span>Shift Right (X)</span>
                <span>{offsetX}px</span>
              </div>
              <input type="range" min="-50" max="50" value={offsetX} onChange={(e) => setOffsetX(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#8B5CF6]" />
            </div>

            <div>
              <div className="flex justify-between mb-1 text-sm font-bold text-[#4B5563]">
                <span>Shift Down (Y)</span>
                <span>{offsetY}px</span>
              </div>
              <input type="range" min="-50" max="50" value={offsetY} onChange={(e) => setOffsetY(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#8B5CF6]" />
            </div>

            <div>
              <div className="flex justify-between mb-1 text-sm font-bold text-[#4B5563]">
                <span>Spread</span>
                <span>{spreadRadius}px</span>
              </div>
              <input type="range" min="-50" max="50" value={spreadRadius} onChange={(e) => setSpreadRadius(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#8B5CF6]" />
            </div>

            <div>
              <div className="flex justify-between mb-1 text-sm font-bold text-[#4B5563]">
                <span>Blur</span>
                <span>{blurRadius}px</span>
              </div>
              <input type="range" min="0" max="100" value={blurRadius} onChange={(e) => setBlurRadius(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#8B5CF6]" />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#E5E7EB]">
            <div>
              <label className="block text-sm font-bold text-[#4B5563] mb-2">Shadow Color (RGBA)</label>
              <input 
                type="text" 
                value={shadowColor}
                onChange={(e) => setShadowColor(e.target.value)}
                className="w-full p-2.5 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#4B5563] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 focus:border-[#8B5CF6]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-[#4B5563] mb-2">Box Color</label>
                <input 
                  type="color" 
                  value={boxColor}
                  onChange={(e) => setBoxColor(e.target.value)}
                  className="w-full h-10 rounded cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#4B5563] mb-2">Background</label>
                <input 
                  type="color" 
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-full h-10 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right: Preview & Code */}
        <div className="flex-1 flex flex-col gap-6 min-w-0">
          
          {/* Preview Area */}
          <div 
            className="flex-1 rounded-3xl border border-[#E5E7EB] shadow-sm flex items-center justify-center min-h-[300px] transition-colors"
            style={{ backgroundColor }}
          >
            <div 
              className="w-48 h-48 sm:w-64 sm:h-64 rounded-2xl flex items-center justify-center transition-all duration-200"
              style={{ 
                backgroundColor: boxColor,
                boxShadow: boxShadowStyle
              }}
            >
              <Square className="w-12 h-12 opacity-20" style={{ color: shadowColor }} />
            </div>
          </div>

          {/* Code Output */}
          <div className="bg-[#1E293B] rounded-3xl border border-[#0F172A] shadow-sm overflow-hidden shrink-0">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
              <h2 className="text-sm font-bold text-white">CSS Code</h2>
              <button 
                onClick={copyToClipboard}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  copied 
                    ? 'bg-[#10B981] text-white hover:bg-[#059669]' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied' : 'Copy CSS'}
              </button>
            </div>
            <div className="p-6">
              <pre className="text-sm font-mono text-[#E2E8F0] whitespace-pre-wrap leading-relaxed">
                {cssCode}
              </pre>
            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
}
