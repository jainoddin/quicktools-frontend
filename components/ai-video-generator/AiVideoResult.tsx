import React, { useState } from 'react';
import { 
  Download, Crown, Share2, Monitor 
} from 'lucide-react';
import AiVideoDownloadModal from './AiVideoDownloadModal';
import AiVideoShareModal from './AiVideoShareModal';
import { trackFileDownload } from '@/lib/analytics';

interface AiVideoResultProps {
  isAuthenticated?: boolean;
  isPro?: boolean;
  onRequireLogin?: () => void;
  onShowHistory?: () => void;
  onCreateNew?: () => void;
  resultData?: {
    videoUrl?: string;
    hdVideoUrl?: string;
    thumbnailUrl?: string;
    prompt?: string;
  } | null;
}

export default function AiVideoResult({ isAuthenticated = true, isPro = false, onRequireLogin, onShowHistory, onCreateNew, resultData }: AiVideoResultProps) {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!isAuthenticated && onRequireLogin) {
      onRequireLogin();
      return;
    }
    if (resultData?.videoUrl && !isDownloading) {
      try {
        setIsDownloading(true);
        const response = await fetch(resultData.videoUrl);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `aivideo-${Date.now()}.mp4`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
        trackFileDownload('ai-video-generator', 'mp4', 'result');
      } catch (err) {
        console.error("Download failed:", err);
        alert("Failed to download video. Please try again.");
      } finally {
        setIsDownloading(false);
      }
    }
  };

  const handleDownloadHD = async () => {
    if (!isAuthenticated && onRequireLogin) {
      onRequireLogin();
      return;
    }
    if (!isPro) {
      alert("Please upgrade to Pro to download in HD quality.");
      return;
    }
    if (resultData?.hdVideoUrl && !isDownloading) {
      try {
        setIsDownloading(true);
        const response = await fetch(resultData.hdVideoUrl);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `aivideo-hd-${Date.now()}.mp4`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
        trackFileDownload('ai-video-generator', 'mp4_hd', 'result');
      } catch (err) {
        console.error("HD Download failed:", err);
        alert("Failed to download HD video. Please try again.");
      } finally {
        setIsDownloading(false);
      }
    }
  };

  const handleShare = () => {
    if (!isAuthenticated && onRequireLogin) {
      onRequireLogin();
      return;
    }
    setIsShareModalOpen(true);
  };

  return (
    <div className="flex flex-col animate-in fade-in duration-500">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-start lg:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] flex items-center gap-2">
            Your Video is Ready! <span className="text-xl">🎉</span>
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">Your AI video has been generated successfully.</p>
        </div>
        
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={onShowHistory}
            className="flex items-center gap-2 bg-white border border-[#E5E7EB] px-4 py-2.5 rounded-xl text-sm font-semibold text-[#111827] hover:bg-gray-50 transition-all shadow-sm"
          >
            <svg className="w-4 h-4 text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            History
          </button>
          <button 
            onClick={onCreateNew}
            className="flex items-center gap-2 bg-white border border-[#E5E7EB] px-4 py-2.5 rounded-xl text-sm font-semibold text-[#6D5EF8] hover:bg-blue-50 transition-all shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create New
          </button>
        </div>
      </div>

      {/* Main Content Split */}
      <div className="flex flex-col xl:flex-row gap-6 items-start">
        
        {/* Left Column (Video & Actions) */}
        <div className="w-full flex-grow space-y-6">
          
          {/* Video Player Mockup */}
          <div className="bg-black rounded-2xl overflow-hidden aspect-video relative group shadow-sm border border-gray-800">
            <video 
              src={resultData?.videoUrl || "https://www.w3schools.com/html/mov_bbb.mp4"}
              controls 
              autoPlay
              className="w-full h-full object-contain"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={handleDownload}
              disabled={isDownloading}
              className={`flex-1 lg:flex-none flex items-center justify-center gap-2 text-white px-5 py-3 rounded-xl text-sm font-semibold shadow-sm transition-all ${isDownloading ? 'bg-[#9CA3AF] cursor-not-allowed' : 'bg-[#6D5EF8] hover:bg-[#5B4DF5] hover:shadow-md hover:-translate-y-0.5'}`}
            >
              <Download className="w-4 h-4" /> {isDownloading ? 'Downloading...' : 'Download Video'}
            </button>
            <button 
              onClick={handleDownloadHD}
              disabled={isDownloading}
              className={`flex-1 lg:flex-none flex items-center justify-center gap-2 bg-white border border-[#E5E7EB] px-5 py-3 rounded-xl text-sm font-semibold shadow-sm transition-colors ${isDownloading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 text-[#111827]'}`}
            >
              <Monitor className="w-4 h-4 text-gray-500" /> {isDownloading ? 'Downloading...' : 'Download HD'} <Crown className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
            </button>
            <button 
              onClick={handleShare}
              className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-white border border-[#E5E7EB] hover:bg-gray-50 text-[#111827] px-5 py-3 rounded-xl text-sm font-semibold shadow-sm transition-colors"
            >
              <Share2 className="w-4 h-4 text-gray-500" /> Share
            </button>
          </div>

          {!isPro && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Upgrade to Pro */}
              <div className="bg-[#F8F7FF] rounded-2xl border border-[#E0DDF7] p-5 shadow-sm flex items-center gap-4 group cursor-pointer hover:bg-[#F3F1FF] transition-colors md:col-span-2">
                <div className="w-12 h-12 bg-[#6D5EF8] rounded-full flex items-center justify-center shrink-0 shadow-sm">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-sm font-bold text-[#111827] mb-1">Upgrade to Pro</h3>
                  <p className="text-xs text-[#6B7280]">Unlock HD downloads, remove watermark, longer videos and more.</p>
                </div>
                <button className="bg-white border border-[#6D5EF8] text-[#6D5EF8] px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#6D5EF8] hover:text-white transition-colors whitespace-nowrap">
                  Upgrade Now
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column (Sidebar) */}
        <div className="w-full xl:w-[340px] shrink-0 space-y-6">
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-sm">
            <h3 className="text-sm font-bold text-[#111827] mb-4">Video Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-gray-500">Video Type</span>
                <span className="text-xs font-semibold text-gray-900">Cinematic</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-gray-500">Resolution</span>
                <span className="text-xs font-semibold text-gray-900">{isPro ? '1080p (HD)' : '720p (SD)'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-gray-500">Duration</span>
                <span className="text-xs font-semibold text-gray-900">15 Seconds</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-gray-500">Aspect Ratio</span>
                <span className="text-xs font-semibold text-gray-900">16:9 (Landscape)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-gray-500">Generated On</span>
                <span className="text-xs font-semibold text-gray-900">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center mt-2 pt-3 border-t border-gray-100">
                <span className="text-xs font-medium text-gray-500">ID</span>
                <span className="text-xs font-mono font-semibold text-gray-900">VID-{Date.now().toString().substring(5, 11)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AiVideoDownloadModal isOpen={isDownloadModalOpen} onClose={() => setIsDownloadModalOpen(false)} />
      <AiVideoShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
    </div>
  );
}
