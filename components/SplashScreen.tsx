'use client';

import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

export default function SplashScreen() {
  const [show, setShow] = useState(true);
  const [fade, setFade] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if we've already shown the splash screen in this session
    // to avoid annoying the user on every hard refresh if not desired.
    // However, the user requested it to mask loading. We'll show it 
    // once per session (sessionStorage) or always depending on preference.
    // For now, always show on hard refresh as it masks the initial load nicely.

    // Simulate progress bar
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 5;
      });
    }, 50); // 100 / 5 = 20 ticks. 20 * 50ms = 1000ms to fill

    // Start fade out at 1500ms
    const fadeTimer = setTimeout(() => {
      setFade(true);
    }, 1500);

    // Completely remove from DOM at 2000ms
    const removeTimer = setTimeout(() => {
      setShow(false);
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0B0F19] transition-opacity duration-500 ease-in-out ${fade ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Central Content */}
      <div className="flex flex-col items-center justify-center flex-grow">
        {/* Glowing Logo */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-[#6D5EF8] blur-xl opacity-50 rounded-full animate-pulse"></div>
          <Zap
            className="w-16 h-16 relative z-10"
            style={{
              color: '#8B5CF6',
              fill: 'url(#gradient-bolt)',
              strokeWidth: 1.5
            }}
          />
          {/* SVG Gradient definition for the Zap icon fill */}
          <svg width="0" height="0">
            <linearGradient id="gradient-bolt" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop stopColor="#3B82F6" offset="0%" />
              <stop stopColor="#8B5CF6" offset="100%" />
            </linearGradient>
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-black tracking-tight text-white mb-2">
          QuickTools.ai
        </h1>

        {/* Subtitle */}
        <p className="text-sm font-medium text-[#9CA3AF]">
          All-in-One AI Tools Platform
        </p>
      </div>

      {/* Bottom Progress Bar Area */}
      <div className="w-full max-w-xs mb-16 px-4 flex flex-col items-center">
        {/* Progress Bar Track */}
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
          {/* Progress Bar Fill */}
          <div
            className="h-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] rounded-full transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
