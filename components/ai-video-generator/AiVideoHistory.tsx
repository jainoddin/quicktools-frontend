import React, { useState } from 'react';
import { Search, Grid, List, Star, Filter, Trash2, Eye, Download, Heart, MoreVertical, Play, Video, Plus, Sparkles } from 'lucide-react';

interface AiVideoHistoryProps {
  onClose: () => void;
  history?: any[];
  isAuthenticated?: boolean;
  onRequireLogin?: () => void;
  onDelete?: (ids: number[]) => void;
}

export default function AiVideoHistory({ onClose, history = [], isAuthenticated = true, onRequireLogin, onDelete }: AiVideoHistoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

  const handleAction = (e: React.MouseEvent) => {
    if (!isAuthenticated && onRequireLogin) {
      e.preventDefault();
      onRequireLogin();
      return false;
    }
    return true;
  };

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!handleAction(e)) return;
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  const toggleSelect = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const handleDeleteSelected = () => {
    if (onDelete && selectedIds.size > 0) {
      if (confirm(`Are you sure you want to delete ${selectedIds.size} video(s)?`)) {
        onDelete(Array.from(selectedIds));
        setSelectedIds(new Set());
      }
    }
  };

  const filteredVideos = history.filter(vid => {
    const matchesSearch = vid.prompt?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    if (!matchesSearch) return false;
    
    if (filterType === 'Favorites') return favorites.includes(vid.id);
    if (filterType === 'Today') return new Date(vid.createdAt || vid.date).toDateString() === new Date().toDateString();
    if (filterType === 'This Week') return Math.ceil(Math.abs(new Date().getTime() - new Date(vid.createdAt || vid.date).getTime()) / (1000 * 60 * 60 * 24)) <= 7;
    if (filterType === 'This Month') return new Date(vid.createdAt || vid.date).getMonth() === new Date().getMonth() && new Date(vid.createdAt || vid.date).getFullYear() === new Date().getFullYear();
    
    return true;
  });

  const now = new Date();
  const counts = {
    all: history.length,
    favorites: favorites.length,
    today: history.filter(vid => new Date(vid.createdAt || vid.date).toDateString() === now.toDateString()).length,
    thisWeek: history.filter(vid => Math.ceil(Math.abs(now.getTime() - new Date(vid.createdAt || vid.date).getTime()) / (1000 * 60 * 60 * 24)) <= 7).length,
    thisMonth: history.filter(vid => new Date(vid.createdAt || vid.date).getMonth() === now.getMonth() && new Date(vid.createdAt || vid.date).getFullYear() === now.getFullYear()).length,
  };

  return (
    <main
      className={`flex-grow flex flex-col min-w-0 space-y-6 animate-in fade-in slide-in-from-right-8 duration-500 ${!isAuthenticated ? 'select-none' : ''}`}
      onContextMenu={(e) => { if (!isAuthenticated) e.preventDefault(); }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <button 
            onClick={onClose} 
            className="flex items-center gap-1.5 text-sm font-semibold text-[#6D5EF8] hover:text-[#5B4DF5] transition-colors mb-3"
          >
            &larr; Back to Tool
          </button>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-[#111827] flex items-center gap-2">
              History <Sparkles className="w-6 h-6 text-[#F59E0B] fill-[#F59E0B]" />
            </h1>
          </div>
          <p className="text-[#6B7280] text-sm md:text-base">View and manage all your previously generated content.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your content..." 
              className="pl-9 pr-4 py-2 border border-[#E5E7EB] rounded-xl text-sm w-full md:w-64 focus:outline-none focus:border-[#6D5EF8] focus:ring-1 focus:ring-[#6D5EF8]"
            />
          </div>
        </div>
      </div>

      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => setFilterType('All')} className={`px-5 py-2 text-sm font-semibold rounded-full flex items-center gap-2 shadow-sm transition-colors ${filterType === 'All' ? 'bg-[#6D5EF8] text-white' : 'bg-white border border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50'}`}>
            All <span className="text-xs">({counts.all})</span>
          </button>
          <button onClick={() => setFilterType('Favorites')} className={`px-4 py-2 text-sm font-semibold rounded-full flex items-center gap-2 transition-colors shadow-sm ${filterType === 'Favorites' ? 'bg-[#6D5EF8] text-white border-transparent' : 'bg-white border border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50'}`}>
            Favorites <span className={`text-xs ${filterType === 'Favorites' ? 'text-purple-200' : 'text-gray-400'}`}>({counts.favorites})</span>
          </button>
          <button onClick={() => setFilterType('Today')} className={`px-4 py-2 text-sm font-semibold rounded-full flex items-center gap-2 transition-colors shadow-sm ${filterType === 'Today' ? 'bg-[#6D5EF8] text-white border-transparent' : 'bg-white border border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50'}`}>
            Today <span className={`text-xs ${filterType === 'Today' ? 'text-purple-200' : 'text-gray-400'}`}>({counts.today})</span>
          </button>
          <button onClick={() => setFilterType('This Week')} className={`px-4 py-2 text-sm font-semibold rounded-full flex items-center gap-2 transition-colors shadow-sm ${filterType === 'This Week' ? 'bg-[#6D5EF8] text-white border-transparent' : 'bg-white border border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50'}`}>
            This Week <span className={`text-xs ${filterType === 'This Week' ? 'text-purple-200' : 'text-gray-400'}`}>({counts.thisWeek})</span>
          </button>
          <button onClick={() => setFilterType('This Month')} className={`px-4 py-2 text-sm font-semibold rounded-full flex items-center gap-2 transition-colors shadow-sm ${filterType === 'This Month' ? 'bg-[#6D5EF8] text-white border-transparent' : 'bg-white border border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50'}`}>
            This Month <span className={`text-xs ${filterType === 'This Month' ? 'text-purple-200' : 'text-gray-400'}`}>({counts.thisMonth})</span>
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={handleDeleteSelected}
            disabled={selectedIds.size === 0}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors shadow-sm ${selectedIds.size > 0 ? 'bg-red-50 border border-red-200 text-red-600 hover:bg-red-100' : 'bg-gray-50 border border-gray-200 text-gray-400 cursor-not-allowed'}`}
          >
            <Trash2 className="w-4 h-4" /> Delete Selected {selectedIds.size > 0 && `(${selectedIds.size})`}
          </button>
        </div>
      </div>

      {/* Video Grid */}
      {filteredVideos.length > 0 ? (
        <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 pb-12" : "flex flex-col gap-4 pb-12"}>
          {filteredVideos.map((vid) => {
            const isFav = favorites.includes(vid.id);
            const videoUrl = vid.result?.videoUrl || vid.result?.url || vid.videoUrl || "https://www.w3schools.com/html/mov_bbb.mp4";

            if (viewMode === 'list') {
              return (
                <div key={vid.id} className="bg-white flex items-center gap-4 p-3 rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-sm hover:shadow-md transition-all group">
                  <div className="relative aspect-video w-32 sm:w-48 overflow-hidden shrink-0 bg-gray-100 rounded-xl cursor-pointer" onClick={() => setPlayingVideo(vid.id)}>
                    <video src={videoUrl} autoPlay={playingVideo === vid.id} controls={playingVideo === vid.id} preload="metadata" className="w-full h-full object-cover" />
                    {playingVideo !== vid.id && (
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <Play className="w-8 h-8 text-white opacity-80" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col flex-grow min-w-0">
                    <h3 className="font-bold text-[#111827] truncate">{vid.prompt}</h3>
                    <p className="text-xs text-[#6B7280] mt-1">{vid.date} &bull; {vid.videoType || 'Video'}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 px-2">
                    <button onClick={(e) => toggleFavorite(vid.id, e)} className={`p-2 rounded-lg transition-colors ${isFav ? 'text-pink-500 bg-pink-50' : 'text-gray-400 hover:text-pink-500 hover:bg-pink-50'}`} title={isFav ? "Remove from Favorites" : "Favorite"}>
                      <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
              );
            }

            return (
              <div key={vid.id} className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-sm hover:shadow-md hover:border-gray-300 transition-all group flex flex-col">
                {/* Video Box */}
                <div className="relative aspect-video w-full overflow-hidden shrink-0 bg-gray-100 cursor-pointer" onClick={() => setPlayingVideo(vid.id)}>
                  <video src={videoUrl} autoPlay={playingVideo === vid.id} controls={playingVideo === vid.id} preload="metadata" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  
                  {playingVideo !== vid.id && (
                    <>
                      {/* Overlay elements */}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 pointer-events-none"></div>

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-all">
                          <Play className="w-5 h-5 text-[#6D5EF8] fill-[#6D5EF8] ml-1" />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Checkbox Overlay */}
                  <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10" onClick={e => e.stopPropagation()}>
                    <input 
                      type="checkbox" 
                      checked={selectedIds.has(vid.id)}
                      onChange={(e) => toggleSelect(vid.id, e)}
                      className="w-5 h-5 rounded border-gray-300 accent-[#6D5EF8] bg-white cursor-pointer shadow-sm" 
                    />
                  </div>

                  {/* Favorite Overlay */}
                  <div className="absolute top-3 right-3 z-10" onClick={(e) => { e.stopPropagation(); toggleFavorite(vid.id, e); }}>
                    <button className={`w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm transition-colors ${isFav ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'}`} title={isFav ? "Remove from Favorites" : "Favorite"}>
                      <Star className={`w-4 h-4 ${isFav ? 'fill-current text-yellow-400' : 'text-gray-400'}`} />
                    </button>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-4 flex flex-col flex-grow">
                  <p className="text-sm font-bold text-[#111827] truncate mb-1" title={vid.prompt}>{vid.prompt}</p>
                  <p className="text-[11px] font-medium text-[#6B7280] mb-4">{vid.date} &bull; {vid.videoType || 'Video'}</p>

                  <button onClick={handleAction} className="w-full flex items-center justify-center gap-2 py-2.5 mt-auto bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#6D5EF8] rounded-xl font-medium transition-colors text-sm">
                    <Download className="w-4 h-4" /> Download
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-white border border-[#E5E7EB] rounded-3xl shadow-sm text-center">
          <div className="w-16 h-16 bg-[#F5F3FF] rounded-2xl flex items-center justify-center mb-4">
            <Video className="w-8 h-8 text-[#6D5EF8]" />
          </div>
          <h3 className="text-xl font-bold text-[#111827] mb-2">No videos found</h3>
          <p className="text-sm text-[#6B7280] max-w-md mb-6">
            {searchQuery 
              ? `No videos match your search "${searchQuery}". Try a different term.`
              : filterType === 'Favorites' 
                ? "You haven't favorited any videos yet."
                : "You haven't generated any videos yet. Start exploring by creating your first AI video!"}
          </p>
          {!searchQuery && filterType === 'All' && (
            <button onClick={onClose} className="flex items-center gap-2 bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white px-6 py-3 rounded-xl text-sm font-bold shadow-sm transition-all">
              <Plus className="w-4 h-4" /> Create First Video
            </button>
          )}
        </div>
      )}
    </main>
  );
}
