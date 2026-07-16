import React, { useState, useEffect } from 'react';
import { X, Image as ImageIcon, FileImage, Layers, Monitor, Maximize, Download, Crown } from 'lucide-react';
import { trackFileDownload } from '@/lib/analytics';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  isPro?: boolean;
  costWarning?: string;
}

export default function DownloadModal({ isOpen, onClose, imageUrl, isPro = false, costWarning }: DownloadModalProps) {
  const [selectedFormat, setSelectedFormat] = useState('png');
  const [isDownloading, setIsDownloading] = useState(false);

  // Prevent scrolling on body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const options = [
    { id: 'png', title: 'PNG', badge: 'Recommended', badgeColor: 'bg-purple-100 text-[#6D5EF8]', desc: 'High quality image, best for graphics and transparent backgrounds', icon: ImageIcon, iconBg: 'bg-[#6D5EF8]' },
    { id: 'jpg', title: 'JPG', desc: 'Best for photos and sharing smaller file size', icon: FileImage, iconBg: 'bg-emerald-500' },
    { id: 'webp', title: 'WEBP', desc: 'Modern format, smaller size with high quality', icon: Layers, iconBg: 'bg-orange-500' },
    { id: 'hd', title: 'HD Quality', badge: 'Pro', badgeColor: 'bg-purple-100 text-[#6D5EF8]', desc: 'High resolution image (2048 x 1152)', icon: Monitor, iconBg: 'bg-[#6D5EF8]', isPro: true },
    { id: 'original', title: 'Original Size', badge: 'Pro', badgeColor: 'bg-purple-100 text-[#6D5EF8]', desc: 'Original resolution image (4096 x 2304)', icon: Maximize, iconBg: 'bg-blue-500', isPro: true },
  ];

  const handleDownload = async () => {
    const selectedOption = options.find(o => o.id === selectedFormat);
    if (selectedOption?.isPro && !isPro) {
      // User doesn't have Pro, shouldn't be able to click, but just in case
      return;
    }

    setIsDownloading(true);
    try {
      // Fetch the image first to avoid CORS issues if directly put in canvas (Pollinations supports CORS)
      const res = await fetch(imageUrl);
      const blob = await res.blob();
      
      // If original or hd (which are just JPGs usually from pollinations), download directly for now
      if (selectedFormat === 'hd' || selectedFormat === 'original') {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `quicktools-ai-${Date.now()}.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        // Convert to selected format using Canvas
        const img = new Image();
        const url = URL.createObjectURL(blob);
        
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = url;
        });

        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          
          let mimeType = 'image/png';
          let extension = 'png';
          
          if (selectedFormat === 'jpg') {
            mimeType = 'image/jpeg';
            extension = 'jpg';
          } else if (selectedFormat === 'webp') {
            mimeType = 'image/webp';
            extension = 'webp';
          }

          const dataUrl = canvas.toDataURL(mimeType, 1.0);
          const a = document.createElement('a');
          a.href = dataUrl;
          a.download = `quicktools-ai-${Date.now()}.${extension}`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
        URL.revokeObjectURL(url);
      }

      trackFileDownload('ai-image-generator', selectedFormat, 'download_modal');
      
      setTimeout(() => {
        onClose();
      }, 500);
    } catch (error) {
      console.error("Error downloading image:", error);
      alert("Failed to download image. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const selectedOption = options.find(o => o.id === selectedFormat);
  const isDisabled = (selectedOption?.isPro && !isPro) || isDownloading;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-[#111827]/40 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-[460px] max-h-[90vh] flex flex-col bg-white rounded-3xl shadow-2xl p-5 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between mb-1 shrink-0">
          <h2 className="text-xl font-bold text-[#111827]">Download Options</h2>
          <button onClick={onClose} className="p-2 -mr-2 text-gray-400 hover:text-[#111827] hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm text-[#6B7280] mb-4 sm:mb-6 shrink-0">Choose your preferred format and quality</p>
        
        <div className="space-y-2.5 mb-4 sm:mb-6 overflow-y-auto flex-grow pr-1">
          {options.map((opt) => (
            <div 
              key={opt.id}
              onClick={() => setSelectedFormat(opt.id)}
              className={`flex items-center p-3 sm:p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${selectedFormat === opt.id ? 'border-[#6D5EF8] bg-[#EEF2FF]' : 'border-transparent hover:border-gray-200 hover:bg-gray-50'}`}
            >
              <div className={`w-10 h-10 ${opt.iconBg} rounded-xl flex items-center justify-center shrink-0 mr-4 text-white shadow-sm`}>
                <opt.icon className="w-5 h-5" />
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-bold text-[#111827]">{opt.title}</span>
                  {opt.badge && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${opt.badgeColor}`}>
                      {opt.badge}
                    </span>
                  )}
                </div>
                <div className="text-xs text-[#6B7280] leading-snug pr-2">{opt.desc}</div>
              </div>
              
              {opt.isPro && (
                <div className="mr-4 shrink-0">
                  <Crown className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                </div>
              )}

              <div className={`shrink-0 flex items-center justify-center w-5 h-5 rounded-full border-2 ${selectedFormat === opt.id ? 'border-[#6D5EF8]' : 'border-gray-300'}`}>
                {selectedFormat === opt.id && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#6D5EF8]"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 shrink-0 space-y-4">
          {costWarning && (
            <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl">
              <span className="text-amber-500 font-bold text-lg">⚡</span>
              <p className="text-xs font-semibold text-amber-700">{costWarning}</p>
            </div>
          )}
          <button 
            onClick={handleDownload}
            disabled={isDisabled}
            className={`w-full text-white font-bold py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 ${isDisabled ? 'bg-gray-300 cursor-not-allowed shadow-none' : 'bg-[#6D5EF8] hover:bg-[#5B4DF5] shadow-[#6D5EF8]/20 hover:shadow-[#6D5EF8]/40'}`}
          >
            {isDownloading ? (
               <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
               <Download className="w-5 h-5" />
            )}
            {isDownloading ? 'Processing...' : (selectedOption?.isPro && !isPro) ? 'Pro Plan Required' : 'Download Image'}
          </button>
          <p className="text-center text-[11px] text-[#9CA3AF] mt-3 mb-1">
            Your download will start automatically
          </p>
        </div>

      </div>
    </div>
  );
}
