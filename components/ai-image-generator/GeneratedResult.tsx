'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Download, Crown, Share2, RefreshCw, PenTool, Sparkles, Heart, Maximize2, Copy, Cpu, Palette, Layout, Award, Calendar, Hash, X } from 'lucide-react';
import DownloadModal from './DownloadModal';
import ShareModal from './ShareModal';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface GeneratedResultProps {
  imageUrl: string;
  prompt: string;
  aspectRatio?: string;
  quality?: string;
  model?: string;
  style?: string;
  seed?: string;
  createdAt?: string;
  isAuthenticated?: boolean;
  onRequireLogin?: () => void;
  onRegenerate?: (newPrompt: string) => void;
}

export default function GeneratedResult({ 
  imageUrl, 
  prompt, 
  aspectRatio = '1:1', 
  quality = 'Standard', 
  model = 'DALL-E 3',
  style = 'Realistic',
  seed = 'Auto',
  createdAt = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }),
  isAuthenticated = true, 
  onRequireLogin, 
  onRegenerate 
}: GeneratedResultProps) {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isRegenerateModalOpen, setIsRegenerateModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'regenerate' | 'edit'>('regenerate');
  const [editedPrompt, setEditedPrompt] = useState(prompt);
  const router = useRouter();
  const { user } = useAuth();
  
  const plan = (user?.plan || '').toLowerCase();
  const isPro = plan === 'pro' || plan === 'premium';

  const handleAction = (action: () => void) => {
    if (!isAuthenticated && onRequireLogin) {
      onRequireLogin();
    } else {
      action();
    }
  };

  let aspectClass = "aspect-square"; // 1:1
  if (aspectRatio === '16:9') aspectClass = "aspect-[16/9]";
  else if (aspectRatio === '9:16') aspectClass = "aspect-[9/16]";
  else if (aspectRatio === '4:3') aspectClass = "aspect-[4/3]";

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Main Image Container Wrapper */}
      <div className="w-full flex justify-center bg-gray-50/50 rounded-3xl p-2 sm:p-6 border border-gray-100">
        <div
          className={`relative w-full max-w-2xl ${aspectClass} rounded-2xl overflow-hidden group shadow-md border border-[#E5E7EB] bg-white`}
        onContextMenu={(e) => {
          if (!isAuthenticated) {
            e.preventDefault();
            onRequireLogin?.();
          }
        }}
      >
        {/* Checkerboard Background for Aspect Ratio padding */}
        <div 
          className="absolute inset-0 z-0 opacity-80"
          style={{ 
            backgroundImage: 'linear-gradient(45deg, #E5E7EB 25%, transparent 25%, transparent 75%, #E5E7EB 75%, #E5E7EB), linear-gradient(45deg, #E5E7EB 25%, transparent 25%, transparent 75%, #E5E7EB 75%, #E5E7EB)',
            backgroundPosition: '0 0, 10px 10px',
            backgroundSize: '20px 20px'
          }}
        />

        <Image
          src={imageUrl}
          fill
          alt="Generated AI Image"
          className={`object-cover transition-transform duration-700 group-hover:scale-[1.02] ${!isAuthenticated ? 'select-none pointer-events-none filter blur-[2px]' : ''}`}
          draggable={isAuthenticated}
          sizes="(max-width: 1024px) 100vw, 60vw"
          unoptimized={true}
          priority
        />

        {/* Anti-Theft Watermark for unauthenticated users */}
        {!isAuthenticated && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center overflow-hidden select-none" onContextMenu={(e) => { e.preventDefault(); onRequireLogin?.(); }}>
            {/* Repeating subtle watermark */}
            <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'300\' height=\'300\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ctext x=\'50%25\' y=\'50%25\' font-size=\'32\' fill=\'white\' font-family=\'Arial\' font-weight=\'900\' text-anchor=\'middle\' dominant-baseline=\'middle\' transform=\'rotate(-30 150 150)\'%3EQUICKTOOLS%3C/text%3E%3C/svg%3E")' }}></div>

            {/* Main center watermark */}
            <div className="bg-black/70 backdrop-blur-md text-white px-8 py-4 rounded-3xl transform -rotate-6 border border-white/20 shadow-2xl flex flex-col items-center hover:scale-105 transition-transform cursor-pointer" onClick={() => onRequireLogin?.()}>
              <div className="flex items-center gap-2 mb-1">
                <Crown className="w-5 h-5 text-[#F59E0B]" />
                <span className="font-black text-xl tracking-widest uppercase">Premium Quality</span>
              </div>
              <span className="text-sm font-semibold tracking-wider text-gray-300">Click to Login & Download</span>
            </div>

            {/* Invisible shield to prevent easy inspect element clicking */}
            <div className="absolute inset-0 z-20" onClick={() => onRequireLogin?.()}></div>
          </div>
        )}

        {/* Overlay Badges and Actions */}
        <div className={`absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${!isAuthenticated ? 'pointer-events-none' : ''}`}></div>

        {quality === 'HD' && (
          <div className="absolute top-4 left-4">
            <div className="bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full">
              HD
            </div>
          </div>
        )}

        <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white/90 hover:bg-white text-gray-700 hover:text-black backdrop-blur-md p-2 rounded-full shadow-sm transition-all">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-wrap items-center gap-3">
        {isAuthenticated ? (
          <>
            <button
              onClick={() => setIsDownloadModalOpen(true)}
              className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-colors"
            >
              <Download className="w-4 h-4" /> Download
            </button>
          </>
        ) : (
          <button
            onClick={() => onRequireLogin?.()}
            className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:from-[#D97706] hover:to-[#B45309] text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-colors"
          >
            <Crown className="w-4 h-4 fill-white" /> Login to Download
          </button>
        )}

        {/* Divider on desktop */}
        <div className="hidden lg:block w-px h-6 bg-gray-200 mx-1"></div>

        <button
          onClick={() => setIsShareModalOpen(true)}
          className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-white border border-[#E5E7EB] hover:bg-gray-50 text-[#111827] px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-colors"
        >
          <Share2 className="w-4 h-4 text-[#6B7280]" /> Share
        </button>
        <button
          onClick={() => handleAction(() => {
            setModalMode('regenerate');
            setIsRegenerateModalOpen(true);
          })}
          className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-white border border-[#E5E7EB] hover:bg-gray-50 text-[#111827] px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-colors"
        >
          <RefreshCw className="w-4 h-4 text-[#6B7280]" /> Regenerate
        </button>
        <button
          onClick={() => handleAction(() => {
            setModalMode('edit');
            setEditedPrompt(prompt);
            setIsRegenerateModalOpen(true);
          })}
          className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-white border border-[#E5E7EB] hover:bg-gray-50 text-[#111827] px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-colors"
        >
          <PenTool className="w-4 h-4 text-[#6B7280]" /> Edit Prompt
        </button>
      </div>

      {/* Image Details */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl flex flex-col overflow-hidden shadow-sm">
        <div className="px-4 py-3 border-b border-[#E5E7EB] bg-gray-50/50">
          <h4 className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">Image Details</h4>
        </div>
        <div className="px-4 py-4 flex flex-wrap lg:flex-nowrap items-center justify-between gap-y-4 gap-x-2">

          <div className="flex items-center gap-2.5 w-[45%] lg:w-auto">
            <Cpu className="w-4 h-4 text-[#9CA3AF] shrink-0" />
            <div>
              <p className="text-[10px] text-[#6B7280] font-medium leading-tight">Model</p>
              <p className="text-xs font-bold text-[#111827]">{model}</p>
            </div>
          </div>

          <div className="hidden lg:block w-px h-8 bg-[#E5E7EB]"></div>

          <div className="flex items-center gap-2.5 w-[45%] lg:w-auto">
            <Palette className="w-4 h-4 text-[#9CA3AF] shrink-0" />
            <div>
              <p className="text-[10px] text-[#6B7280] font-medium leading-tight">Style</p>
              <p className="text-xs font-bold text-[#111827] capitalize">{style}</p>
            </div>
          </div>

          <div className="hidden lg:block w-px h-8 bg-[#E5E7EB]"></div>

          <div className="flex items-center gap-2.5 w-[45%] lg:w-auto">
            <Layout className="w-4 h-4 text-[#9CA3AF] shrink-0" />
            <div>
              <p className="text-[10px] text-[#6B7280] font-medium leading-tight">Aspect Ratio</p>
              <p className="text-xs font-bold text-[#111827]">{aspectRatio}</p>
            </div>
          </div>

          <div className="hidden lg:block w-px h-8 bg-[#E5E7EB]"></div>

          <div className="flex items-center gap-2.5 w-[45%] lg:w-auto">
            <Award className="w-4 h-4 text-[#9CA3AF] shrink-0" />
            <div>
              <p className="text-[10px] text-[#6B7280] font-medium leading-tight">Quality</p>
              <p className="text-xs font-bold text-[#111827] capitalize">{quality}</p>
            </div>
          </div>

          <div className="hidden lg:block w-px h-8 bg-[#E5E7EB]"></div>

          <div className="flex items-center gap-2.5 w-full lg:w-auto border-t lg:border-t-0 pt-3 lg:pt-0 border-gray-100">
            <Calendar className="w-4 h-4 text-[#9CA3AF] shrink-0" />
            <div>
              <p className="text-[10px] text-[#6B7280] font-medium leading-tight">Created</p>
              <p className="text-xs font-bold text-[#111827]">{createdAt}</p>
            </div>
          </div>

          <div className="hidden lg:block w-px h-8 bg-[#E5E7EB]"></div>

          <div className="flex items-center justify-between gap-4 flex-grow lg:flex-grow-0 w-full lg:w-auto pt-1 lg:pt-0">
            <div className="flex items-center gap-2.5">
              <Hash className="w-4 h-4 text-[#9CA3AF] shrink-0" />
              <div>
                <p className="text-[10px] text-[#6B7280] font-medium leading-tight">Seed</p>
                <p className="text-xs font-bold text-[#111827]">{seed}</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-[#6D5EF8] transition-colors p-1.5 hover:bg-gray-50 rounded-md">
              <Copy className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Prompt Used */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 flex flex-col gap-2 shadow-sm relative group">
        <h4 className="text-xs font-semibold text-[#6B7280]">Prompt Used</h4>
        <p className="text-sm text-[#111827] pr-8">{prompt}</p>
        <button className="absolute top-4 right-4 p-2 text-gray-400 hover:text-[#6D5EF8] bg-white rounded-lg transition-colors">
          <Copy className="w-4 h-4" />
        </button>
      </div>

      {/* Upgrade Banner - Only show if NOT pro */}
      {!isPro && (
        <div className="bg-gradient-to-r from-[#F5F3FF] to-white border border-[#EDE9FE] rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex gap-4 items-center">
          <div className="w-10 h-10 bg-[#EEF2FF] rounded-xl flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-[#6D5EF8]" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#111827] mb-0.5">Enjoying the results?</h4>
            <p className="text-xs text-[#6B7280]">Upgrade to Pro for faster generation, unlimited downloads and priority access.</p>
          </div>
        </div>
        <button
          onClick={() => router.push('/pricing')}
          className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 bg-white border-2 border-[#E5E7EB] hover:border-[#6D5EF8] text-[#111827] px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm"
        >
          <Crown className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" /> Upgrade to Pro
        </button>
      </div>
      )}

      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        imageUrl={imageUrl}
        isPro={isPro}
      />
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        imageUrl={imageUrl}
        isAuthenticated={isAuthenticated}
        onRequireLogin={onRequireLogin}
      />

      {isRegenerateModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-[#111827]/40 backdrop-blur-sm" onClick={() => setIsRegenerateModalOpen(false)}></div>
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4 shrink-0">
              <h2 className="text-xl font-bold text-[#111827]">
                {modalMode === 'edit' ? 'Edit Prompt' : 'Regenerate Image'}
              </h2>
              <button onClick={() => setIsRegenerateModalOpen(false)} className="p-2 -mr-2 text-gray-400 hover:text-[#111827] hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#FFFBEB] border border-[#F59E0B]/20 rounded-xl p-4 mb-6">
              <p className="text-sm font-bold text-[#D97706] flex items-center gap-2">
                <Crown className="w-4 h-4" /> Note: This costs 5 credits
              </p>
              <p className="text-xs text-[#D97706]/80 mt-1">Regenerating or editing this prompt will use your credits just like a new generation.</p>
            </div>

            {modalMode === 'edit' && (
              <>
                <h3 className="text-sm font-bold text-[#111827] mb-2">Your Prompt</h3>
                <textarea
                  className="w-full bg-white border-2 border-[#E5E7EB] rounded-xl p-4 text-[#111827] focus:outline-none focus:border-[#6D5EF8] transition-colors resize-none mb-6 h-32"
                  value={editedPrompt}
                  onChange={(e) => setEditedPrompt(e.target.value)}
                  placeholder="Describe what you want to see..."
                />
              </>
            )}

            <button
              onClick={() => {
                setIsRegenerateModalOpen(false);
                if (onRegenerate) onRegenerate(modalMode === 'edit' ? editedPrompt : prompt);
              }}
              className="w-full bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" /> {modalMode === 'edit' ? 'Generate New Image' : 'Regenerate Now'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
