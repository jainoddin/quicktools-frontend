'use client';

import { useToast } from '@/contexts/ToastContext';
import React, { useState } from 'react';
import { 
  QrCode, Loader2, Download,
  Sparkles, Link2, FileText, Image as ImageIcon
} from 'lucide-react';

export default function QrCodeClient() {
  const { error, success } = useToast();
  const [text, setText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [qrUrl, setQrUrl] = useState('');
  const [qrKey, setQrKey] = useState(0); // For forcing re-render of image

  const handleGenerate = () => {
    if (!text.trim()) return;
    setIsProcessing(true);
    
    // Simulate slight delay for effect
    setTimeout(() => {
      const generatedUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(text)}`;
      setQrUrl(generatedUrl);
      setQrKey(prev => prev + 1);
      setIsProcessing(false);
    }, 800);
  };

  const handleDownload = async () => {
    if (!qrUrl) return;
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `qrcode_${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error('Failed to download QR Code', err);
      error('Failed to download image. Try right-clicking and saving it.');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-full">
      {/* Left Sidebar */}
      <aside className="w-full lg:w-[340px] shrink-0 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
        
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="flex items-center gap-2 text-sm font-bold text-[#111827]">
              Enter URL or Text
            </label>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value.substring(0, 1000))}
            placeholder="e.g., https://example.com"
            className="w-full h-32 p-4 bg-white rounded-2xl border border-[#E5E7EB] text-sm text-[#4B5563] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] transition-all resize-none shadow-sm"
          />
        </div>

        <div className="pt-2">
          <button
            onClick={handleGenerate}
            disabled={isProcessing || !text.trim()}
            className={`w-full text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${isProcessing || !text.trim() ? 'bg-[#9CA3AF] cursor-not-allowed' : 'bg-[#3B82F6] hover:bg-[#2563EB]'}`}
          >
            {isProcessing ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Generating...</>
            ) : (
              <><QrCode className="w-5 h-5" /> Generate QR Code</>
            )}
          </button>
        </div>

        {/* Interlinks */}
        <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
          <h3 className="text-xs font-bold text-[#111827] mb-3">Explore Other Free Tools</h3>
          <div className="flex flex-col gap-2">
            <a href="/tools/url-shortener" className="flex items-center gap-3 p-2.5 bg-[#F9FAFB] hover:bg-[#EFF6FF] rounded-xl transition-colors group">
              <div className="w-8 h-8 shrink-0 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center group-hover:border-[#3B82F6]/30 group-hover:shadow-sm transition-all">
                <Link2 className="w-4 h-4 text-[#3B82F6]" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#111827] group-hover:text-[#3B82F6] transition-colors">URL Shortener</p>
                <p className="text-[9px] text-[#6B7280]">Shorten long links</p>
              </div>
            </a>
            <a href="/tools/ai-grammar-checker" className="flex items-center gap-3 p-2.5 bg-[#F9FAFB] hover:bg-[#EFF6FF] rounded-xl transition-colors group">
              <div className="w-8 h-8 shrink-0 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center group-hover:border-[#3B82F6]/30 group-hover:shadow-sm transition-all">
                <FileText className="w-4 h-4 text-[#3B82F6]" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#111827] group-hover:text-[#3B82F6] transition-colors">Grammar Checker</p>
                <p className="text-[9px] text-[#6B7280]">Fix typos with AI</p>
              </div>
            </a>
          </div>
        </div>
      </aside>

      {/* Right Main Area */}
      <main className="flex-grow flex flex-col min-w-0">
        
        {/* Header */}
        {!qrUrl && !isProcessing && (
          <div className="flex flex-col md:flex-row md:items-start lg:items-center justify-between gap-4 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both delay-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#3B82F6] rounded-xl flex items-center justify-center shadow-sm shrink-0">
                <QrCode className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#111827] flex items-center gap-2">
                  QR Code Generator <Sparkles className="w-5 h-5 text-[#3B82F6]" />
                </h1>
                <p className="text-sm text-[#6B7280]">Create instant QR codes for any URL or text.</p>
              </div>
            </div>
          </div>
        )}

        {isProcessing ? (
          <div className="flex-grow bg-white rounded-3xl border border-[#E5E7EB] p-8 flex flex-col items-center justify-center shadow-sm animate-in fade-in duration-500 h-[600px]">
            <Loader2 className="w-12 h-12 text-[#3B82F6] animate-spin mb-4" />
            <h2 className="text-xl font-bold text-[#111827]">Generating QR Code...</h2>
          </div>
        ) : qrUrl ? (
          <div className="flex-grow flex flex-col bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-sm animate-in zoom-in-95 duration-500 h-[600px]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#111827]">Your QR Code</h2>
              <button 
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-[#EFF6FF] text-[#2563EB] rounded-xl text-sm font-bold hover:bg-[#DBEAFE] transition-colors"
              >
                <Download className="w-4 h-4" />
                Download PNG
              </button>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#FAFAFA] rounded-2xl border border-[#E5E7EB]">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6 transform transition-transform hover:scale-105 duration-300">
                <img 
                  key={qrKey}
                  src={qrUrl} 
                  alt="Generated QR Code" 
                  className="w-64 h-64 object-contain"
                />
              </div>
              <p className="text-sm text-gray-500 text-center max-w-sm">
                Scan this QR code with your phone camera to test it. Click "Download PNG" to save the image.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex-grow bg-white rounded-3xl border border-[#E5E7EB] p-8 lg:p-12 shadow-sm flex flex-col items-center justify-center text-center relative animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both delay-200 h-[600px]">
            
            {/* Animated Graphic */}
            <div className="relative w-72 h-64 mb-10 flex items-center justify-center mt-4">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-blue-50 rounded-full blur-2xl opacity-80"></div>
              
              <div className="relative z-10 w-40 h-40 bg-white rounded-2xl shadow-[0_10px_30px_-10px_rgba(59,130,246,0.3)] border-4 border-blue-200 overflow-hidden flex items-center justify-center transform hover:scale-105 transition-transform duration-500 animate-pulse" style={{ animationDuration: '3s' }}>
                <QrCode className="w-20 h-20 text-[#3B82F6]" strokeWidth={1.5} />
                
                {/* Scanning line animation */}
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-400 opacity-70 animate-[bounce_2s_infinite]"></div>
              </div>

              <Sparkles className="absolute top-4 left-10 w-6 h-6 text-blue-300 animate-pulse" />
              <Sparkles className="absolute bottom-4 right-10 w-5 h-5 text-blue-300 animate-pulse" style={{ animationDelay: '500ms' }} />
            </div>

            <h2 className="text-2xl lg:text-3xl font-bold text-[#111827] mb-3">
              Ready to <span className="text-[#3B82F6]">generate?</span>
            </h2>
            <p className="text-[#6B7280] max-w-sm mx-auto mb-8">
              Paste your link or text on the left and click <span className="text-[#3B82F6] font-semibold">"Generate QR Code"</span>.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
