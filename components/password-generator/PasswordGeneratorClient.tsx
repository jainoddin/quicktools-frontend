'use client';

import React, { useState, useEffect } from 'react';
import { KeyRound, Copy, CheckCircle2, RefreshCw, ShieldCheck } from 'lucide-react';

export default function PasswordGeneratorClient() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState({ label: 'Strong', color: 'bg-[#10B981]' });

  const generatePassword = () => {
    let chars = '';
    if (includeUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) chars += '0123456789';
    if (includeSymbols) chars += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (chars === '') {
      setPassword('');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPassword);
    evaluateStrength(newPassword);
  };

  const evaluateStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length > 8) score += 1;
    if (pwd.length > 12) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    if (score < 3) setStrength({ label: 'Weak', color: 'bg-[#EF4444]' });
    else if (score < 4) setStrength({ label: 'Medium', color: 'bg-[#F59E0B]' });
    else setStrength({ label: 'Strong', color: 'bg-[#10B981]' });
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500 max-w-3xl mx-auto py-8">
      
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-4 mb-10">
        <div className="w-16 h-16 bg-[#0F172A] rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
          <KeyRound className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[#111827] mb-2">
            Strong Password Generator
          </h1>
          <p className="text-[#6B7280]">Generate secure, random passwords to keep your accounts safe.</p>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-3xl shadow-xl border border-[#E5E7EB] overflow-hidden">
        
        {/* Password Display */}
        <div className="bg-[#FAFAFA] p-8 border-b border-[#E5E7EB] relative">
          <div className="flex items-center justify-between gap-4">
            <input 
              type="text" 
              value={password}
              readOnly
              className="w-full bg-transparent text-2xl md:text-3xl font-mono text-[#111827] focus:outline-none tracking-wider font-bold"
            />
            <div className="flex items-center gap-2 shrink-0">
              <button 
                onClick={generatePassword}
                className="w-12 h-12 flex items-center justify-center bg-white border border-[#E5E7EB] rounded-xl hover:bg-gray-50 transition-colors shadow-sm text-[#4B5563]"
                title="Regenerate"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button 
                onClick={copyToClipboard}
                className={`w-32 h-12 flex items-center justify-center gap-2 rounded-xl font-bold transition-colors shadow-sm ${
                  copied 
                    ? 'bg-[#10B981] text-white hover:bg-[#059669]' 
                    : 'bg-[#0F172A] text-white hover:bg-[#1E293B]'
                }`}
              >
                {copied ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
          
          {/* Strength Indicator */}
          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#4B5563] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" /> Strength: {strength.label}
            </div>
            <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${strength.color} transition-all duration-300`} 
                style={{ width: strength.label === 'Strong' ? '100%' : strength.label === 'Medium' ? '66%' : '33%' }}
              ></div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="p-8 space-y-8">
          
          {/* Length Slider */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-bold text-[#111827]">Password Length</label>
              <span className="text-lg font-bold text-[#0F172A] bg-gray-100 px-4 py-1 rounded-lg">{length}</span>
            </div>
            <input 
              type="range" 
              min="8" 
              max="64" 
              value={length} 
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0F172A]"
            />
            <div className="flex justify-between text-xs text-[#6B7280] mt-2 font-medium">
              <span>8</span>
              <span>64</span>
            </div>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center gap-3 p-4 border border-[#E5E7EB] rounded-xl cursor-pointer hover:bg-[#FAFAFA] transition-colors group">
              <input 
                type="checkbox" 
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="w-5 h-5 rounded text-[#0F172A] focus:ring-[#0F172A]"
              />
              <div>
                <p className="text-sm font-bold text-[#111827] group-hover:text-[#0F172A]">Uppercase Letters</p>
                <p className="text-xs text-[#6B7280]">A-Z</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 border border-[#E5E7EB] rounded-xl cursor-pointer hover:bg-[#FAFAFA] transition-colors group">
              <input 
                type="checkbox" 
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                className="w-5 h-5 rounded text-[#0F172A] focus:ring-[#0F172A]"
              />
              <div>
                <p className="text-sm font-bold text-[#111827] group-hover:text-[#0F172A]">Lowercase Letters</p>
                <p className="text-xs text-[#6B7280]">a-z</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 border border-[#E5E7EB] rounded-xl cursor-pointer hover:bg-[#FAFAFA] transition-colors group">
              <input 
                type="checkbox" 
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="w-5 h-5 rounded text-[#0F172A] focus:ring-[#0F172A]"
              />
              <div>
                <p className="text-sm font-bold text-[#111827] group-hover:text-[#0F172A]">Numbers</p>
                <p className="text-xs text-[#6B7280]">0-9</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 border border-[#E5E7EB] rounded-xl cursor-pointer hover:bg-[#FAFAFA] transition-colors group">
              <input 
                type="checkbox" 
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-5 h-5 rounded text-[#0F172A] focus:ring-[#0F172A]"
              />
              <div>
                <p className="text-sm font-bold text-[#111827] group-hover:text-[#0F172A]">Symbols</p>
                <p className="text-xs text-[#6B7280]">!@#$%^&*</p>
              </div>
            </label>
          </div>

        </div>
      </div>
    </div>
  );
}
