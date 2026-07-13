import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Search, Grid, List, Star, Filter, Trash2, Eye, Download, Heart, MoreVertical, ChevronLeft, ChevronRight, ChevronDown, Crown } from 'lucide-react';
import DownloadModal from './DownloadModal';
import { useAuth } from '@/contexts/AuthContext';
import { getEndpoint } from '../../lib/api';

interface HistoryViewProps {
  onClose: () => void;
  isAuthenticated?: boolean;
  onRequireLogin?: () => void;
  recentImages?: any[];
}

export default function HistoryView({ onClose, isAuthenticated = false, onRequireLogin, recentImages = [] }: HistoryViewProps) {
  const [activeFilter, setActiveFilter] = useState('All Images');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [deletedIds, setDeletedIds] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const { user } = useAuth();
  
  const plan = (user?.plan || '').toLowerCase();
  const isPro = plan === 'pro' || plan === 'premium';
  
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchQuery]);
  useEffect(() => {
    const savedDeleted = localStorage.getItem('quicktools_deleted_images');
    if (savedDeleted) {
      try {
        setDeletedIds(new Set(JSON.parse(savedDeleted)));
      } catch (e) {
        console.error("Failed to parse deleted images", e);
      }
    }
  }, []);
  
  const [backendFavorites, setBackendFavorites] = useState<any[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      fetch(getEndpoint('/api/user/favorites'), {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setBackendFavorites(data.data);
          const favIds = new Set<number>(data.data.map((img: any) => img.id as number));
          setFavorites(favIds);
        }
      })
      .catch(err => console.error('Failed to fetch favorites:', err));
    }
  }, [isAuthenticated]);
  
  const toggleFavorite = async (img: any) => {
    if (!isAuthenticated && onRequireLogin) {
      return onRequireLogin();
    }
    
    // Optimistic update
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(img.id)) next.delete(img.id);
      else next.add(img.id);
      return next;
    });

    if (isAuthenticated) {
      try {
        const res = await fetch(getEndpoint('/api/user/favorites'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ image: img })
        });
        const data = await res.json();
        if (data.success) {
          setBackendFavorites(data.data);
        }
      } catch (err) {
        console.error('Failed to toggle favorite:', err);
      }
    }
  };
  
  // Merge recent session images with backend favorites for full display
  const allImagesMap = new Map();
  recentImages.forEach(img => allImagesMap.set(img.id, img));
  backendFavorites.forEach(img => allImagesMap.set(img.id, img));
  const allImages = Array.from(allImagesMap.values());
  
  const toggleSelection = (id: number) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.size === 0) return;
    
    const idsArray = Array.from(selectedIds);
    
    setDeletedIds(prev => {
      const next = new Set(prev);
      idsArray.forEach(id => next.add(id));
      localStorage.setItem('quicktools_deleted_images', JSON.stringify(Array.from(next)));
      return next;
    });
    
    // Also remove them from backend favorites if they were favorited
    idsArray.forEach(id => {
      if (favorites.has(id)) {
        const img = allImages.find(i => i.id === id);
        if (img) toggleFavorite(img);
      }
    });

    // Delete from backend database
    if (isAuthenticated) {
      try {
        await fetch(getEndpoint('/api/user/usage'), {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ ids: idsArray })
        });
      } catch (e) {
        console.error('Failed to delete from backend', e);
      }
    }

    setSelectedIds(new Set());
  };

  const filteredImages = allImages.filter(img => {
    if (deletedIds.has(img.id)) return false;
    if (searchQuery && !img.prompt.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    if (activeFilter === 'All Images') return true;
    if (activeFilter === 'Favorites') return favorites.has(img.id);
    
    // Date Filtering Logic
    const now = new Date();
    let imgDate = new Date();
    
    if (img.date === 'Just now' || img.date === 'Today') {
      imgDate = new Date();
    } else {
      imgDate = new Date(img.date);
      if (isNaN(imgDate.getTime())) imgDate = new Date();
    }
    
    const diffTime = Math.abs(now.getTime() - imgDate.getTime());
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (activeFilter === 'Today') return diffDays < 1;
    if (activeFilter === 'This Week') return diffDays <= 7;
    if (activeFilter === 'This Month') return diffDays <= 30;
    
    return true;
  });

  const totalPages = Math.ceil(filteredImages.length / itemsPerPage);
  const validCurrentPage = Math.min(Math.max(currentPage, 1), Math.max(totalPages, 1));
  const startIndex = (validCurrentPage - 1) * itemsPerPage;
  const paginatedImages = filteredImages.slice(startIndex, startIndex + itemsPerPage);

  return (
    <main className="flex-grow flex flex-col min-w-0 space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <button onClick={onClose} className="text-sm font-bold text-[#6D5EF8] hover:text-[#5B4DF5] transition-colors flex items-center gap-1">
              &larr; Back to Generator
            </button>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-[#111827] flex items-center gap-2">
            History <span className="text-xl">✨</span>
          </h1>
          <p className="text-[#6B7280] text-sm lg:text-base mt-2">
            View and manage all your previously generated images.
          </p>
        </div>

        {/* Search and View Toggles */}
        <div className="flex items-center gap-3">
          <div className="relative flex-grow sm:flex-grow-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your images..." 
              className="pl-9 pr-4 py-2.5 rounded-xl border border-[#E5E7EB] text-sm focus:ring-2 focus:ring-[#6D5EF8] outline-none transition-all w-full sm:w-64"
            />
          </div>
        </div>
      </div>

      {/* Filters & Actions Bar */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-4">
        {/* Tabs */}
        <div className="flex overflow-x-auto custom-scrollbar gap-2 pb-2 xl:pb-0">
          {['All Images', 'Favorites', 'Today', 'This Week', 'This Month'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm transition-colors flex items-center gap-1.5 ${
                activeFilter === tab 
                  ? 'font-bold bg-[#6D5EF8] text-white shadow-sm' 
                  : 'font-semibold bg-white border border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50'
              }`}
            >
              {tab === 'Favorites' && <Star className={`w-4 h-4 ${activeFilter === tab ? 'text-white' : 'text-[#9CA3AF]'}`} />}
              {tab}
            </button>
          ))}
        </div>

        {/* Actions */}
        {isAuthenticated && (
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={handleDeleteSelected}
              disabled={selectedIds.size === 0}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors shadow-sm ${
                selectedIds.size > 0 
                  ? 'bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 cursor-pointer' 
                  : 'bg-gray-50 border border-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Trash2 className="w-4 h-4" /> 
              {selectedIds.size > 0 ? `Delete (${selectedIds.size})` : 'Delete Selected'}
            </button>
          </div>
        )}
      </div>

      {/* Image Grid */}
      {filteredImages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 border border-dashed border-gray-200 rounded-2xl bg-gray-50">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
            <Search className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-[#111827] mb-2">No Images Found</h3>
          <p className="text-[#6B7280] text-center max-w-sm mb-6">
            {allImages.length === 0 
              ? "You haven't generated any images yet. Go back to the generator to create your first masterpiece!" 
              : "No images match your current filter or search query."}
          </p>
          {allImages.length === 0 ? (
            <button onClick={onClose} className="px-6 py-2.5 bg-[#6D5EF8] text-white font-semibold rounded-xl hover:bg-[#5B4DF5] transition-colors shadow-sm">
              Generate Now
            </button>
          ) : (
            <button onClick={() => { setActiveFilter('All Images'); setSearchQuery(''); }} className="px-6 py-2.5 bg-white border border-[#E5E7EB] text-[#4B5563] font-semibold rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {paginatedImages.map((img) => (
            <div key={img.id} className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-sm hover:shadow-md hover:border-gray-300 transition-all group flex flex-col">
              {/* Image Box */}
              <div 
                className="relative aspect-video sm:aspect-[4/3] w-full overflow-hidden shrink-0 bg-gray-100"
                onContextMenu={(e) => {
                  if (!isAuthenticated) {
                    e.preventDefault();
                    onRequireLogin?.();
                  }
                }}
              >
                <Image 
                  src={img.src} 
                  alt={img.prompt} 
                  fill 
                  className={`object-cover group-hover:scale-105 transition-transform duration-500 ${!isAuthenticated ? 'filter blur-[3px] select-none pointer-events-none' : ''}`} 
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" 
                  unoptimized={true}
                />
                
                {!isAuthenticated && (
                  <div 
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/30 cursor-pointer hover:bg-black/40 transition-colors"
                    onClick={() => onRequireLogin?.()}
                  >
                    <Crown className="w-6 h-6 text-[#F59E0B] mb-1 drop-shadow-md" />
                    <span className="text-xs font-bold text-white tracking-widest uppercase drop-shadow-md">Premium</span>
                  </div>
                )}
                
                {/* Checkbox Overlay */}
                <div className={`absolute top-3 left-3 transition-opacity duration-200 z-20 ${selectedIds.has(img.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                  <input 
                    type="checkbox" 
                    checked={selectedIds.has(img.id)}
                    onChange={() => toggleSelection(img.id)}
                    className="w-5 h-5 rounded border-gray-300 accent-[#6D5EF8] bg-white cursor-pointer shadow-sm" 
                  />
                </div>
                
                {/* Star / Favorite Overlay */}
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(img); }}
                  className={`absolute top-3 right-3 z-20 p-2 rounded-xl backdrop-blur-md transition-all shadow-sm ${favorites.has(img.id) ? 'bg-[#6D5EF8] text-white opacity-100' : 'bg-black/20 text-white/70 hover:bg-black/40 opacity-0 group-hover:opacity-100'}`}
                >
                  <Star className={`w-4 h-4 ${favorites.has(img.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
              
              {/* Content Box */}
              <div className="p-4 flex flex-col flex-grow">
                <p className="text-sm font-bold text-[#111827] truncate mb-1">{img.prompt}</p>
                <p className="text-[11px] font-medium text-[#6B7280] mb-4">{img.date} &bull; {img.model}</p>
                
                {/* Actions */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                  <div className="flex items-center w-full">
                    <button 
                      onClick={() => {
                        if (!isAuthenticated && onRequireLogin) {
                          onRequireLogin();
                        } else {
                          setSelectedImage(img.src);
                          setIsDownloadModalOpen(true);
                        }
                      }} 
                      className="w-full flex items-center justify-center gap-2 p-2.5 text-sm font-bold text-[#6D5EF8] hover:bg-[#EEF2FF] rounded-xl transition-colors border border-transparent hover:border-[#EEF2FF]"
                    >
                      <Download className="w-4 h-4" /> Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination - Only show if there are multiple pages */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 gap-4">
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={validCurrentPage === 1}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-[#6D5EF8] bg-[#F5F3FF] hover:bg-[#EDE9FE] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {Array.from({ length: totalPages }).map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentPage(i + 1)}
                className={`w-9 h-9 flex items-center justify-center rounded-xl font-semibold transition-colors ${validCurrentPage === i + 1 ? 'bg-[#6D5EF8] text-white shadow-sm' : 'text-[#4B5563] hover:bg-gray-100'}`}
              >
                {i + 1}
              </button>
            ))}

            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={validCurrentPage === totalPages}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-[#4B5563] border border-[#E5E7EB] hover:bg-gray-50 transition-colors bg-white shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <select 
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="w-full appearance-none bg-white border border-[#E5E7EB] text-sm font-semibold text-[#4B5563] rounded-xl pl-4 pr-10 py-2.5 shadow-sm outline-none focus:ring-2 focus:ring-[#6D5EF8] focus:border-[#6D5EF8] transition-all cursor-pointer"
              >
                <option value={8}>8 per page</option>
                <option value={12}>12 per page</option>
                <option value={24}>24 per page</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <ChevronDown className="w-4 h-4 text-[#6B7280]" />
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedImage && (
        <DownloadModal 
          isOpen={isDownloadModalOpen} 
          onClose={() => setIsDownloadModalOpen(false)} 
          imageUrl={selectedImage} 
          isPro={isPro} 
          costWarning="This download will consume 2 credit points."
        />
      )}
    </main>
  );
}
