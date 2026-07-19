'use client';

import { useToast } from '@/contexts/ToastContext';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Upload, Image as ImageIcon, CheckCircle2,
  Crown, Info, Sparkles, History, LayoutGrid, Trash2, Loader2
} from 'lucide-react';
import BackgroundRemoverResult from './BackgroundRemoverResult';
import HistoryView from './HistoryView';
import BackgroundRemovalProgress from './BackgroundRemovalProgress';
import { useAuth } from '@/contexts/AuthContext';
import LoginPopup from '@/components/auth/LoginPopup';
import { getEndpoint } from '@/lib/api';
import { trackToolGenerate } from '@/lib/analytics';
// We will dynamically import @imgly/background-removal inside the handler to prevent SSR issues

export default function BackgroundRemoverClient() {
  const { error, success } = useToast();
  const { isAuthenticated, user } = useAuth();
  const isPro = ['pro', 'premium'].includes((user?.plan || '').toLowerCase());
  const [activeView, setActiveView] = useState<'generate' | 'history'>('generate');
  const [bgOption, setBgOption] = useState<'transparent' | 'white' | 'custom'>('transparent');
  const [quality, setQuality] = useState<'standard' | 'hd'>('standard');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);

  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const [freeGenCount, setFreeGenCount] = useState(0);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);
  const [recentImages, setRecentImages] = useState<any[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load history from backend if authenticated, otherwise from local storage
  useEffect(() => {
    if (!isAuthenticated) {
      const count = parseInt(localStorage.getItem('freeBgRemoverCount') || '0', 10);
      setFreeGenCount(count);

      const savedHistory = localStorage.getItem('guestBgHistory');
      if (savedHistory) {
        try {
          setRecentImages(JSON.parse(savedHistory));
        } catch (e) {
          console.error("Could not parse guest history", e);
        }
      }
    } else {
      // Fetch from backend for logged in users
      fetch(getEndpoint('/api/user/usage'), {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data && data.data.history) {
            // Filter only background remover history with valid images
            const bgHistory = data.data.history.filter((item: any) =>
              item.toolSlug === '/tools/background-remover' &&
              item.result &&
              (item.result.startsWith('http') || item.result.startsWith('data:image/'))
            );

            const formattedHistory = bgHistory.map((item: any) => {
              const dateObj = new Date(item.createdAt);
              const isToday = dateObj.toLocaleDateString() === new Date().toLocaleDateString();

              return {
                id: item._id || Date.now() + Math.random(),
                src: item.result,
                filename: item.prompt,
                date: isToday ? 'Today' : dateObj.toLocaleDateString(),
                type: 'Transparent BG',
                toolSlug: '/tools/background-remover'
              };
            });

            setRecentImages(formattedHistory);
          }
        })
        .catch(console.error);
    }
  }, [isAuthenticated]);

  const compressImage = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 400;
          const MAX_HEIGHT = 400;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            // Trick to fix semi-transparent ML artifacts in saved history: Draw image 6 times to boost alpha
            ctx.drawImage(img, 0, 0, width, height);
            ctx.drawImage(img, 0, 0, width, height);
            ctx.drawImage(img, 0, 0, width, height);
            ctx.drawImage(img, 0, 0, width, height);
            ctx.drawImage(img, 0, 0, width, height);
            ctx.drawImage(img, 0, 0, width, height);

            const dataUrl = canvas.toDataURL('image/png', 0.7);
            resolve(dataUrl);
          } else {
            resolve(reader.result as string);
          }
        };
        img.onerror = () => {
          resolve(reader.result as string);
        };
        img.src = reader.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        error("File size must be under 10MB");
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setResultImage(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
        setResultImage(null);
      }
    }
  };

  const handleRemoveBackground = async () => {
    const currentFile = imageFile;
    const currentPreview = imagePreview;

    if (!currentFile || !currentPreview) return;

    if (!isAuthenticated && freeGenCount >= 1) {
      setShowLoginPopup(true);
      return;
    }

    // Check credits client-side first for logged in users
    if (isAuthenticated && !isPro && ((user as any)?.credits || 0) < 5) {
      setShowPremiumPopup(true);
      return;
    }

    setIsProcessing(true);
    setProgress(10);
    let progressInterval: any = null;

    try {
      // Dynamically import to avoid Next.js window is not defined errors
      const imglyModule = await import('@imgly/background-removal');
      const removeBackground = (imglyModule.default || (imglyModule as any).removeBackground) as any;
      setProgress(30);

      // Start a smooth fake progressive interval to make the progress bar feel alive
      progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 80) return 80;
          return prev + 1;
        });
      }, 200);

      // We configure it to use the best models available
      const config = {
        model: quality === 'standard' ? 'medium' : 'isnet',
        output: { format: 'image/png' },
        progress: (key: string, current: number, total: number) => {
          const percent = Math.round((current / total) * 100);
          const mappedPercent = Math.min(80, 30 + Math.round(percent * 0.5));
          setProgress(prev => Math.max(prev, mappedPercent));
        }
      };

      const blob = await removeBackground(currentPreview, config as any);
      if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
      }
      setProgress(85);

      // Generate a compressed base64 representation of the processed blob for history storage
      const compressedBase64 = await compressImage(blob);
      setProgress(90);

      const url = URL.createObjectURL(blob);
      setResultImage(url);
      trackToolGenerate('background-remover', { quality, bg_option: bgOption });

      const newImage = {
        id: Date.now(),
        src: compressedBase64, // Use solid compressed Base64 for history display
        filename: currentFile.name,
        date: 'Just now',
        type: quality === 'hd' ? 'HD BG' : 'Transparent BG',
        toolSlug: '/tools/background-remover'
      };

      const guestHistoryImage = { ...newImage, src: compressedBase64 };

      // Deduct credits for auth users via backend API and send the result image
      if (isAuthenticated) {
        try {
          const res = await fetch(getEndpoint('/api/tools/deduct-credits'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
              toolSlug: '/tools/background-remover',
              toolName: 'Background Remover',
              creditsNeeded: 5,
              prompt: currentFile.name,
              result: compressedBase64
            })
          });
          const data = await res.json();
          if (!data.success) {
            if (data.errorType === 'INSUFFICIENT_CREDITS') {
              setShowPremiumPopup(true);
              setIsProcessing(false);
              return;
            } else {
              alert(data.message || 'Failed to deduct credits');
              setIsProcessing(false);
              return;
            }
          }
        } catch (err) {
          console.error("Credit deduction err", err);
          error("Something went wrong with credit deduction.");
          setIsProcessing(false);
          return;
        }
      }

      setRecentImages(prev => {
        const updated = [newImage, ...prev];
        if (!isAuthenticated) {
          const localHistory = [guestHistoryImage, ...prev];
          localStorage.setItem('guestBgHistory', JSON.stringify(localHistory));
        }
        return updated;
      });

      if (!isAuthenticated) {
        const newCount = freeGenCount + 1;
        setFreeGenCount(newCount);
        localStorage.setItem('freeBgRemoverCount', newCount.toString());
      }
    } catch (err) {
      console.error("Background removal failed:", err);
      error("Failed to remove background. Please try again with a different image.");
    } finally {
      if (progressInterval) {
        clearInterval(progressInterval);
      }
      setProgress(100);
      setIsProcessing(false);
    }
  };

  const handleToggleFavorite = async (id: string) => {
    setRecentImages(prev => prev.map(item => item.id === id || item._id === id ? { ...item, isStarred: !item.isStarred } : item));
    if (!isAuthenticated) {
      const newHistory = recentImages.map(item => item.id === id || item._id === id ? { ...item, isStarred: !item.isStarred } : item);
      localStorage.setItem('guestBgHistory', JSON.stringify(newHistory));
    } else {
      try {
        await fetch(getEndpoint(`/api/user/usage/${id}/favorite`), { method: 'PATCH', credentials: 'include' });
      } catch (err) {
        console.error('Failed to toggle favorite', err);
      }
    }
  };

  const handleDeleteHistory = async (ids: string[]) => {
    setRecentImages(prev => prev.filter(item => !ids.includes(item.id as string) && !ids.includes(item._id as string)));
    if (!isAuthenticated) {
      const newHistory = recentImages.filter(item => !ids.includes(item.id as string) && !ids.includes(item._id as string));
      localStorage.setItem('guestBgHistory', JSON.stringify(newHistory));
    } else {
      try {
        await fetch(getEndpoint('/api/user/usage'), {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ ids })
        });
      } catch (err) {
        console.error('Failed to delete history', err);
      }
    }
  };

  const handleCancel = () => {
    setIsProcessing(false);
    setProgress(0);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <LoginPopup isOpen={showLoginPopup} onClose={() => setShowLoginPopup(false)} />

      {/* Premium Popup */}
      {showPremiumPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 sm:p-8 text-center shadow-2xl">
            <div className="w-16 h-16 bg-[#F5F3FF] rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="w-8 h-8 text-[#F59E0B] fill-[#F59E0B]" />
            </div>
            <h3 className="text-2xl font-bold text-[#111827] mb-2">
              Out of Credits
            </h3>
            <p className="text-[#6B7280] mb-6">
              You have run out of credits to use this tool. Please upgrade your plan to get more credits.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => window.location.href = '/pricing'}
                className="w-full bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-[#6D5EF8]/20"
              >
                View Plans
              </button>
              <button
                onClick={() => setShowPremiumPopup(false)}
                className="w-full bg-white border border-[#E5E7EB] hover:bg-gray-50 text-[#111827] font-bold py-3 rounded-xl transition-all"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Left Sidebar Controls */}
      <aside className="w-full lg:w-[320px] shrink-0 space-y-6">

        {/* 1. Upload Image */}
        <div>
          <h3 className="text-sm font-bold text-[#111827] mb-3">1. Upload Image</h3>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/webp"
            className="hidden"
          />

          {resultImage || imageFile ? (
            <div className="border border-[#E5E7EB] bg-white rounded-2xl p-4 flex flex-col gap-4 shadow-sm animate-in fade-in">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden relative shrink-0 border border-gray-200 bg-gray-50">
                    {imagePreview && (
                      <Image src={imagePreview} alt="Thumbnail" fill className="object-cover" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#111827] truncate max-w-[120px]">{imageFile?.name || 'image.jpg'}</h4>
                    <p className="text-xs text-[#6B7280]">{(imageFile ? (imageFile.size / 1024 / 1024).toFixed(2) : 0)} MB</p>
                  </div>
                </div>
                <button
                  onClick={() => { setResultImage(null); setImageFile(null); setImagePreview(null); }}
                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 bg-[#F8FAFC] border border-[#E5E7EB] hover:bg-gray-50 text-[#6D5EF8] px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm"
              >
                <Upload className="w-4 h-4" /> Change Image
              </button>
              <p className="text-[10px] text-[#9CA3AF] text-center uppercase tracking-wider font-semibold">PNG, JPG, JPEG, WEBP up to 10MB</p>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="border-2 border-dashed border-[#6D5EF8]/30 bg-white rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all hover:border-[#6D5EF8]/60 hover:bg-[#EEF2FF]/50 cursor-pointer shadow-sm relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-[#6D5EF8]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative z-10 w-12 h-12 bg-[#EEF2FF] rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <ImageIcon className="w-6 h-6 text-[#6D5EF8]" />
              </div>
              <p className="relative z-10 text-sm font-medium text-[#111827] mb-1">Drag & drop your image here</p>
              <p className="relative z-10 text-xs text-[#6B7280] mb-4">or</p>
              <button className="relative z-10 bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-2">
                <Upload className="w-4 h-4" /> Upload Image
              </button>
              <p className="relative z-10 text-[10px] text-[#9CA3AF] mt-4 font-semibold uppercase tracking-wider">PNG, JPG, JPEG, WEBP up to 10MB</p>
            </div>
          )}
        </div>

        {/* 2. Choose Background */}
        <div className={resultImage || isProcessing ? "pointer-events-none opacity-50 transition-opacity" : "transition-opacity"}>
          <h3 className="text-sm font-bold text-[#111827] mb-3">2. Choose Background</h3>
          <div className="space-y-2.5">

            <div
              onClick={() => setBgOption('transparent')}
              className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all shadow-sm ${bgOption === 'transparent' ? 'border-[#6D5EF8] bg-[#EEF2FF]' : 'border-[#E5E7EB] bg-white hover:border-gray-300 hover:bg-gray-50'}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-200 shrink-0" style={{ backgroundImage: 'conic-gradient(#E5E7EB 90deg, #FFFFFF 90deg 180deg, #E5E7EB 180deg 270deg, #FFFFFF 270deg)', backgroundSize: '8px 8px' }}></div>
                <span className={`text-sm font-bold ${bgOption === 'transparent' ? 'text-[#6D5EF8]' : 'text-[#111827]'}`}>Transparent</span>
              </div>
              {bgOption === 'transparent' ? (
                <CheckCircle2 className="w-5 h-5 text-[#6D5EF8] fill-white" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
              )}
            </div>

            <div
              onClick={() => setBgOption('white')}
              className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all shadow-sm ${bgOption === 'white' ? 'border-[#6D5EF8] bg-[#EEF2FF]' : 'border-[#E5E7EB] bg-white hover:border-gray-300 hover:bg-gray-50'}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white border border-gray-200 shadow-sm shrink-0"></div>
                <span className={`text-sm font-bold ${bgOption === 'white' ? 'text-[#6D5EF8]' : 'text-[#111827]'}`}>White</span>
              </div>
              {bgOption === 'white' ? (
                <CheckCircle2 className="w-5 h-5 text-[#6D5EF8] fill-white" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
              )}
            </div>

            <div
              onClick={() => setBgOption('custom')}
              className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all shadow-sm ${bgOption === 'custom' ? 'border-[#6D5EF8] bg-[#EEF2FF]' : 'border-[#E5E7EB] bg-white hover:border-gray-300 hover:bg-gray-50'}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[conic-gradient(hsl(360,100%,50%),hsl(315,100%,50%),hsl(270,100%,50%),hsl(225,100%,50%),hsl(180,100%,50%),hsl(135,100%,50%),hsl(90,100%,50%),hsl(45,100%,50%),hsl(0,100%,50%))] shrink-0 border border-gray-200"></div>
                <span className={`text-sm font-bold ${bgOption === 'custom' ? 'text-[#6D5EF8]' : 'text-[#111827]'}`}>Custom Color</span>
              </div>
              {bgOption === 'custom' ? (
                <CheckCircle2 className="w-5 h-5 text-[#6D5EF8] fill-white" />
              ) : (
                <div className="w-5 h-5 rounded-md border-2 border-gray-300"></div>
              )}
            </div>

          </div>
        </div>

        {/* 3. More Options (Quality) */}
        <div className={resultImage || isProcessing ? "pointer-events-none opacity-50 transition-opacity" : "transition-opacity"}>
          <h3 className="text-sm font-bold text-[#111827] mb-3">
            3. More Options
          </h3>
          <div className="mb-2 flex items-center gap-1.5">
            <span className="text-xs font-bold text-[#111827]">Image Quality</span>
            <Info className="w-3.5 h-3.5 text-[#9CA3AF] cursor-pointer hover:text-[#6B7280]" />
          </div>
          <div className="flex bg-white rounded-xl border border-[#E5E7EB] p-1 shadow-sm">
            <button
              onClick={() => setQuality('standard')}
              className={`flex-1 py-2 text-xs transition-all rounded-lg ${quality === 'standard' ? 'font-bold text-[#6D5EF8] bg-[#EEF2FF] border border-[#6D5EF8]/20 shadow-sm' : 'font-semibold text-[#6B7280] hover:text-[#111827]'}`}
            >
              Standard
            </button>
            <button
              onClick={() => {
                const plan = (user?.plan || '').toLowerCase();
                const isPro = plan === 'pro' || plan === 'premium';
                if (!isAuthenticated) {
                  setShowLoginPopup(true);
                } else if (!isPro) {
                  setShowPremiumPopup(true); // Technically should show HD popup, reusing this for simplicity
                } else {
                  setQuality('hd');
                }
              }}
              className={`flex-1 py-2 text-xs flex items-center justify-center gap-1.5 transition-all rounded-lg ${quality === 'hd' ? 'font-bold text-[#6D5EF8] bg-[#EEF2FF] border border-[#6D5EF8]/20 shadow-sm' : 'font-semibold text-[#6B7280] hover:text-[#111827]'}`}
            >
              HD <Crown className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
            </button>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            disabled={!imageFile || isProcessing}
            onClick={handleRemoveBackground}
            className={`w-full text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-sm ${(!imageFile || isProcessing) ? 'bg-[#9CA3AF] cursor-not-allowed' : 'bg-[#6D5EF8] hover:bg-[#5B4DF5] shadow-lg shadow-[#6D5EF8]/20 hover:shadow-[#6D5EF8]/40 hover:-translate-y-0.5'}`}>
            {isProcessing ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
            ) : (
              <><Sparkles className={`w-5 h-5 ${imageFile && !resultImage && 'group-hover:scale-110 transition-transform'}`} /> Remove Background</>
            )}
          </button>
          <div className="flex items-center justify-center mt-3 text-xs text-[#9CA3AF]">
            This will cost 5 credits <Info className="w-3.5 h-3.5 ml-1 cursor-pointer hover:text-[#6B7280]" />
          </div>
        </div>

      </aside>

      {/* Right Main Area */}
      {activeView === 'history' ? (
        <HistoryView
          onClose={() => setActiveView('generate')}
          isAuthenticated={isAuthenticated}
          onRequireLogin={() => setShowLoginPopup(true)}
          recentImages={recentImages}
          onToggleFavorite={handleToggleFavorite}
          onDelete={handleDeleteHistory}
        />
      ) : (
        <main className="flex-grow flex flex-col min-w-0 space-y-6">

          {/* Header Area */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-[#111827] flex items-center gap-2">
                {isProcessing ? (
                  <>Removing Background... <span className="text-xl">⏳</span></>
                ) : resultImage ? (
                  <>Background Removed! <CheckCircle2 className="w-8 h-8 text-[#10B981] fill-[#10B981]/20" strokeWidth={3} /></>
                ) : (
                  <>Background Remover <span className="text-xl">✨</span></>
                )}
              </h1>
              <p className="text-[#6B7280] text-sm lg:text-base mt-2">
                {isProcessing ? 'Please wait while our AI analyzes and removes the background on your device.' : resultImage ? 'Your image background has been removed successfully.' : 'Remove image background instantly with AI.'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveView('history')}
                className="flex items-center gap-2 bg-white border border-[#E5E7EB] px-4 py-2.5 rounded-xl text-sm font-semibold text-[#111827] hover:bg-gray-50 transition-all shadow-sm"
              >
                <History className="w-4 h-4 text-[#6B7280]" /> History
              </button>

            </div>
          </div>

          {/* Main Content Area */}
          {isProcessing ? (
            <BackgroundRemovalProgress progress={progress} onCancel={handleCancel} />
          ) : resultImage && imagePreview ? (
            <BackgroundRemoverResult
              isAuthenticated={isAuthenticated}
              onRequireLogin={() => setShowLoginPopup(true)}
              onRequirePremium={() => setShowPremiumPopup(true)}
              originalImageUrl={imagePreview}
              resultImageUrl={resultImage}
              bgOption={bgOption}
              isPro={isPro}
            />
          ) : (
            <div className="flex-grow min-h-[400px] lg:min-h-[500px] bg-white rounded-2xl border border-[#E5E7EB] flex flex-col items-center justify-center p-8 text-center shadow-sm relative overflow-hidden group">

              {/* Empty State Background Decoration */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-50/50 rounded-full blur-3xl -z-10 group-hover:scale-110 transition-transform duration-1000"></div>

              <div className="relative w-32 h-32 mb-6">
                <div className="absolute inset-0 border-2 border-dashed border-[#6D5EF8]/30 rounded-2xl animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute inset-2 bg-[#EEF2FF] rounded-xl flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-[#6D5EF8]/60" />
                </div>
                <Sparkles className="absolute -top-3 -right-3 w-8 h-8 text-[#6D5EF8] animate-pulse" />
              </div>

              <h3 className="text-xl font-bold text-[#111827] mb-2">No image selected</h3>
              <p className="text-sm text-[#6B7280] max-w-xs mx-auto leading-relaxed">
                Upload an image from the left panel<br />to get started
              </p>
            </div>
          )}

          {/* Upgrade Banner */}
          {!isPro && (
            <div className="bg-[#F5F3FF] border border-[#EDE9FE] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#6D5EF8] rounded-full flex items-center justify-center shrink-0 shadow-md shadow-[#6D5EF8]/20">
                  <Crown className="w-6 h-6 text-white fill-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#111827] mb-0.5">Upgrade to Pro</h4>
                  <p className="text-xs text-[#6B7280]">Unlock HD quality, batch processing and more premium features.</p>
                </div>
              </div>
              <button
                onClick={() => window.location.href = '/pricing'}
                className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 bg-white border border-[#E5E7EB] text-[#6D5EF8] hover:border-[#6D5EF8] px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm"
              >
                <Crown className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" /> Upgrade to Pro
              </button>
            </div>
          )}

        </main>
      )}
    </div>
  );
}
