'use client';
import React from 'react';

export default function ClientImageFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <span className="block my-10 rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-sm bg-gray-50 relative min-h-[200px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        {...props} 
        className="w-full h-auto object-cover" 
        loading="lazy" 
        onError={(e) => {
          if (e.target && (e.target as HTMLImageElement).parentElement) {
            (e.target as HTMLImageElement).parentElement!.style.display = 'none';
          }
        }} 
      />
    </span>
  );
}
