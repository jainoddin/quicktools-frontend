'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Wand2, Shuffle, Image as ImageIcon,
  History, LayoutGrid, Crown, Info, Sparkles, ChevronDown, Star, ArrowLeft
} from 'lucide-react';
import GenerationProgress from './GenerationProgress';
import GeneratedResult from './GeneratedResult';
import HistoryView from './HistoryView';
import ErrorModal from './ErrorModal';
import { useAuth } from '@/contexts/AuthContext';
import LoginPopup from '@/components/auth/LoginPopup';
import { getEndpoint } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function ImageGeneratorClient() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const [activeView, setActiveView] = useState<'generate' | 'history'>('generate');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const [freeGenCount, setFreeGenCount] = useState(0);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);
  const [popupType, setPopupType] = useState<'hd' | 'credits'>('hd');
  const [quality, setQuality] = useState<'standard' | 'hd'>('standard');
  const [selectedStyle, setSelectedStyle] = useState('Realistic');
  const [selectedRatio, setSelectedRatio] = useState('16:9');
  const [selectedModel, setSelectedModel] = useState('dall-e-3');

  const [recentImages, setRecentImages] = useState<any[]>([]);

  // Load history from backend if authenticated, otherwise from local storage
  useEffect(() => {
    if (!isAuthenticated) {
      const count = parseInt(localStorage.getItem('freeImageGenCount') || '0', 10);
      setFreeGenCount(count);

      const savedHistory = localStorage.getItem('guestImageHistory');
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
            // Filter only image generation history
            const imageHistory = data.data.history.filter((item: any) => item.toolSlug === '/tools/ai-image-generator');

            const formattedHistory = imageHistory.map((item: any) => {
              const dateObj = new Date(item.createdAt);
              const isToday = dateObj.toLocaleDateString() === new Date().toLocaleDateString();

              return {
                id: item._id || Date.now() + Math.random(),
                src: item.result,
                prompt: item.prompt.replace(/Model:.*?, Style:.*?, /, ''), // Clean up prompt
                date: isToday ? 'Today' : dateObj.toLocaleDateString(),
                model: 'DALL-E 3'
              };
            });

            setRecentImages(formattedHistory);
          }
        })
        .catch(console.error);
    }
  }, [isAuthenticated]);

  // Simulate generation progress visually
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGenerating) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 95) return 95; // Wait at 95% for the actual API call to finish
          return prev + 2;
        });
      }, 100);
    } else {
      if (progress !== 100) setProgress(0);
    }
    return () => clearInterval(interval);
  }, [isGenerating, progress]);

  const handleGenerate = (overridePrompt?: string | any) => {
    const isString = typeof overridePrompt === 'string';
    const currentPrompt = isString ? overridePrompt : prompt;
    if (currentPrompt.trim() === '' || isGenerating) {
      return;
    }

    // Guest users: allow 1 free generation, then require login
    if (!isAuthenticated && freeGenCount >= 1) {
      setShowLoginPopup(true);
      return;
    }

    // Simulate error if prompt equals 'error'
    if (currentPrompt.toLowerCase().trim() === 'error') {
      setHasError(true);
      return;
    }

    setIsGenerating(true);
    setGeneratedImage(null);
    setHasError(false);
    setProgress(0);

    // Call the actual backend API to generate the image immediately
    fetch(getEndpoint('/api/tools/generate-image'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        prompt: currentPrompt,
        model: selectedModel,
        style: selectedStyle,
        ratio: selectedRatio,
        quality
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setGeneratedImage(data.data);
          // Add to recent history
          const newImage = {
            id: Date.now(),
            src: data.data,
            prompt: currentPrompt,
            date: 'Just now',
            model: selectedModel
          };

          setRecentImages(prev => {
            const updated = [newImage, ...prev];
            if (!isAuthenticated) {
              localStorage.setItem('guestImageHistory', JSON.stringify(updated));
            }
            return updated;
          });

          if (!isAuthenticated) {
            const newCount = freeGenCount + 1;
            setFreeGenCount(newCount);
            localStorage.setItem('freeImageGenCount', newCount.toString());
          }
        } else {
          // Handle specific error types from backend
          if (data.errorType === 'AUTH_REQUIRED') {
            // Shouldn't happen for guest 1-gen, but handle gracefully
            setShowLoginPopup(true);
          } else if (data.errorType === 'INSUFFICIENT_CREDITS') {
            setPopupType('credits');
            setShowPremiumPopup(true);
          } else {
            setHasError(true);
          }
        }
      })
      .catch((err) => {
        console.error("Backend generation error:", err);
        setHasError(true);
      })
      .finally(() => {
        setProgress(100);
        setIsGenerating(false);
      });
  };

  const handleCancel = () => {
    setIsGenerating(false);
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
              {popupType === 'hd' ? 'Premium Feature' : 'Out of Credits'}
            </h3>
            <p className="text-[#6B7280] mb-6">
              {popupType === 'hd'
                ? 'HD image generation is only available for premium users. Upgrade your plan to unlock HD quality.'
                : 'You have run out of credits to generate images. Please upgrade your plan to get more credits.'}
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

        {/* Settings Wrapper - Disabled when image is generated */}
        <div className={`space-y-6 transition-all duration-300 ${generatedImage ? 'pointer-events-none opacity-60 grayscale-[0.2]' : ''}`}>
          {/* 1. Describe Your Image */}
          <div>
            <h3 className="text-sm font-bold text-[#111827] mb-3">
              {generatedImage ? '1. Your Prompt' : '1. Describe Your Image'}
            </h3>
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-3 shadow-sm focus-within:ring-2 focus-within:ring-[#6D5EF8] focus-within:border-[#6D5EF8] transition-all">
              {generatedImage ? (
                <div className="w-full h-32 text-sm text-[#111827] bg-transparent overflow-y-auto pr-2">
                  {prompt}
                </div>
              ) : (
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the image you want to generate..."
                  className="w-full h-32 resize-none outline-none text-sm text-[#111827] placeholder-[#9CA3AF] bg-transparent"
                ></textarea>
              )}
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F3F4F6]">
                <div className="flex gap-2">
                  <button className="flex items-center gap-1.5 text-xs font-medium text-[#6B7280] hover:text-[#111827] bg-[#F8FAFC] px-2.5 py-1.5 rounded-lg border border-[#E5E7EB] transition-colors">
                    <Wand2 className="w-3.5 h-3.5" /> Prompt Ideas
                  </button>
                  <button
                    onClick={() => setPrompt('A futuristic city at sunset with flying cars, neon lights, and tall skyscrapers')}
                    className="flex items-center gap-1.5 text-xs font-medium text-[#6B7280] hover:text-[#111827] bg-[#F8FAFC] px-2.5 py-1.5 rounded-lg border border-[#E5E7EB] transition-colors"
                  >
                    <Shuffle className="w-3.5 h-3.5" /> Random
                  </button>
                </div>
                <span className="text-[10px] text-[#9CA3AF] font-medium">{prompt.length} / 1000</span>
              </div>
            </div>
          </div>

          {/* 2. Choose a Model */}
          <div>
            <h3 className="text-sm font-bold text-[#111827] mb-3">2. Choose a Model</h3>
            <div className="relative">
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full appearance-none bg-white border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm font-semibold text-[#111827] outline-none hover:border-gray-300 transition-colors focus:ring-2 focus:ring-[#6D5EF8]/20 focus:border-[#6D5EF8]"
              >
                <option value="dall-e-3">DALL-E 3</option>
                <option value="dall-e-2">DALL-E 2</option>
                <option value="midjourney">Midjourney v6</option>
                <option value="stable-diffusion">Stable Diffusion XL</option>
              </select>
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <div className="w-4 h-4 rounded-full border-4 border-t-red-500 border-r-blue-500 border-b-green-500 border-l-yellow-500 mr-2"></div>
              </div>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <ChevronDown className="w-4 h-4 text-[#6B7280]" />
              </div>
              <style dangerouslySetInnerHTML={{ __html: `select { padding-left: 2.5rem !important; }` }} />
            </div>
          </div>

          {/* 3. Choose a Style */}
          <div>
            <h3 className="text-sm font-bold text-[#111827] mb-3">3. Choose a Style</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: 'Realistic', img: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=100&q=80' },
                { name: 'Anime', img: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=100&q=80' },
                { name: '3D Render', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&q=80' },
                { name: 'Digital Art', img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=100&q=80' },
                { name: 'Painting', img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=100&q=80' },
                { name: 'Cyberpunk', img: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=100&q=80' },
              ].map((style, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedStyle(style.name)}
                  className="flex flex-col items-center gap-1.5 cursor-pointer group"
                >
                  <div className={`relative w-full aspect-square rounded-xl overflow-hidden transition-all duration-200 ${selectedStyle === style.name ? 'ring-2 ring-[#6D5EF8] ring-offset-2' : 'hover:ring-2 hover:ring-gray-300 hover:ring-offset-1'}`}>
                    <Image src={style.img} fill alt={style.name} className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                    {selectedStyle === style.name && (
                      <div className="absolute top-1 right-1 w-4 h-4 bg-[#6D5EF8] rounded-full flex items-center justify-center shadow-sm">
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </div>
                    )}
                  </div>
                  <span className={`text-[10px] font-semibold ${selectedStyle === style.name ? 'text-[#6D5EF8]' : 'text-[#6B7280] group-hover:text-[#111827]'}`}>{style.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Aspect Ratio */}
          <div>
            <h3 className="text-sm font-bold text-[#111827] mb-3">4. Aspect Ratio</h3>
            <div className="grid grid-cols-4 gap-2">
              {[
                { ratio: '1:1', label: 'Square' },
                { ratio: '16:9', label: 'Landscape' },
                { ratio: '9:16', label: 'Portrait' },
                { ratio: '4:3', label: 'Standard' },
              ].map((ar, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedRatio(ar.ratio)}
                  className={`flex flex-col items-center justify-center py-2 rounded-xl cursor-pointer transition-all border ${selectedRatio === ar.ratio ? 'bg-[#EEF2FF] border-[#6D5EF8] text-[#6D5EF8]' : 'bg-white border-[#E5E7EB] text-[#6B7280] hover:border-gray-300 hover:bg-gray-50'}`}
                >
                  <span className="text-xs font-bold mb-0.5">{ar.ratio}</span>
                  <span className="text-[9px]">{ar.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Image Quality */}
          <div>
            <h3 className="text-sm font-bold text-[#111827] mb-3">5. Image Quality</h3>
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
                  if (isPro) {
                    setQuality('hd');
                  } else {
                    setPopupType('hd');
                    setShowPremiumPopup(true);
                  }
                }}
                className={`flex-1 py-2 text-xs flex items-center justify-center gap-1.5 transition-all rounded-lg ${quality === 'hd' ? 'font-bold text-[#6D5EF8] bg-[#EEF2FF] border border-[#6D5EF8]/20 shadow-sm' : 'font-semibold text-[#6B7280] hover:text-[#111827]'}`}
              >
                HD <Crown className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
              </button>
            </div>
          </div>
        </div>

        {/* Generate Button Area */}
        <div className="pt-2">
          <button
            onClick={(!isAuthenticated && freeGenCount >= 1) ? () => setShowLoginPopup(true) : (generatedImage ? () => setGeneratedImage(null) : handleGenerate)}
            disabled={(isGenerating && !generatedImage) || activeView === 'history'}
            className={`w-full text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-sm ${((isGenerating && !generatedImage) || activeView === 'history') ? 'bg-[#9CA3AF] cursor-not-allowed opacity-70' : 'bg-[#6D5EF8] hover:bg-[#5B4DF5] shadow-lg shadow-[#6D5EF8]/20 hover:shadow-[#6D5EF8]/40 hover:-translate-y-0.5'}`}>
            <Sparkles className={`w-5 h-5 ${(!isGenerating && activeView !== 'history') && 'group-hover:scale-110 transition-transform'}`} />
            {isGenerating ? 'Generating...' : (!isAuthenticated && freeGenCount >= 1) ? 'Login to Generate More' : generatedImage ? 'Create New Image' : 'Generate Image'}
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
        />
      ) : (
        <main className="flex-grow flex flex-col min-w-0 space-y-6">

          {/* Header Area */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-[#111827] flex items-center gap-2">
                {generatedImage ? (
                  <>Your Image is Ready! <span className="text-xl">🎉</span></>
                ) : (
                  <>AI Image Generator <span className="text-xl">✨</span></>
                )}
              </h1>
              <p className="text-[#6B7280] text-sm lg:text-base mt-2">
                {generatedImage
                  ? "Here is your AI-generated image. You can download, share or create more."
                  : "Create stunning images from text descriptions with the power of AI."}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {generatedImage ? (
                <button
                  onClick={() => setGeneratedImage(null)}
                  className="flex items-center gap-2 bg-white border border-[#E5E7EB] px-4 py-2.5 rounded-xl text-sm font-bold text-[#111827] hover:bg-gray-50 transition-all shadow-sm"
                >
                  <ArrowLeft className="w-4 h-4 text-[#6B7280]" /> Back to Editor
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setActiveView('history')}
                    className="flex items-center gap-2 bg-white border border-[#E5E7EB] px-4 py-2.5 rounded-xl text-sm font-semibold text-[#111827] hover:bg-gray-50 transition-all shadow-sm"
                  >
                    <History className="w-4 h-4 text-[#6B7280]" /> History
                  </button>

                </>
              )}
            </div>
          </div>

          {/* Dynamic State Rendering */}
          {isGenerating ? (
            <GenerationProgress progress={progress} onCancel={handleCancel} />
          ) : generatedImage ? (
            <GeneratedResult
              imageUrl={generatedImage}
              prompt={prompt}
              aspectRatio={selectedRatio}
              quality={quality}
              model={selectedModel}
              style={selectedStyle}
              isAuthenticated={isAuthenticated}
              onRequireLogin={() => setShowLoginPopup(true)}
              onRegenerate={(newPrompt) => {
                setPrompt(newPrompt);
                // We need to use setTimeout to ensure state updates before generating
                setTimeout(() => handleGenerate(newPrompt), 0);
              }}
            />
          ) : (
            <>
              {/* Result Box (Empty State) */}
              <div className="flex-grow flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-bold text-[#111827]">Generated Result</h2>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-[#6D5EF8] bg-[#EEF2FF] border border-[#6D5EF8]/10 px-3 py-1.5 rounded-lg">
                    <Star className="w-3.5 h-3.5 text-[#6D5EF8]" /> Your creations are saved in history
                  </div>
                </div>

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

                  <h3 className="text-xl font-bold text-[#111827] mb-2">Your AI-generated image will appear here</h3>
                  <p className="text-sm text-[#6B7280] max-w-md mx-auto">
                    Enter a prompt, choose your preferences, and click "Generate Image" to create stunning visuals.
                  </p>
                </div>
              </div>

              {/* Pro Tip */}
              <div className="bg-[#F5F3FF] border border-[#EDE9FE] rounded-2xl p-4 flex gap-3 shadow-inner">
                <div className="shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5 text-[#6D5EF8]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#111827] mb-1">Pro Tip</h4>
                  <p className="text-xs text-[#6B7280] leading-relaxed">
                    Be specific and detailed in your prompt for better results. Include details about style, lighting, mood, colors, and composition.
                  </p>
                </div>
              </div>
            </>
          )}

        </main>
      )}

      <ErrorModal
        isOpen={hasError}
        onClose={() => setHasError(false)}
        onRetry={() => {
          setHasError(false);
          setPrompt('A futuristic city at sunset with flying cars, neon lights, and tall skyscrapers');
          setTimeout(() => {
            setIsGenerating(true);
            setGeneratedImage(null);
          }, 100);
        }}
      />
    </div>
  );
}
