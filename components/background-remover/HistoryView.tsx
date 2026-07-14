import React, { useState } from 'react';
import { Search, Star, Trash2, Download, Image as ImageIcon, Sparkles, X } from 'lucide-react';

interface HistoryViewProps {
  onClose: () => void;
  isAuthenticated?: boolean;
  onRequireLogin?: () => void;
  recentImages?: any[];
  onToggleFavorite?: (id: string) => void;
  onDelete?: (ids: string[]) => void;
}

export default function HistoryView({ onClose, recentImages = [], onToggleFavorite, onDelete }: HistoryViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const now = new Date();
  
  // recentImages already comes with isStarred from parent
  const counts = {
    all: recentImages.length,
    favorites: recentImages.filter(h => h.isStarred).length,
    today: recentImages.filter(h => h.date === 'Today' || h.date === 'Just now' || new Date(h.createdAt || Date.now()).toDateString() === now.toDateString()).length,
    thisWeek: recentImages.filter(h => {
      const date = new Date(h.createdAt || Date.now());
      return Math.ceil(Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)) <= 7;
    }).length,
  };

  let displayImages = [...recentImages];

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    displayImages = displayImages.filter(item => 
      (item.filename && item.filename.toLowerCase().includes(q))
    );
  }

  if (filterType === 'Favorites') {
    displayImages = displayImages.filter(item => item.isStarred);
  } else if (filterType === 'Today') {
    displayImages = displayImages.filter(h => h.date === 'Today' || h.date === 'Just now' || new Date(h.createdAt || Date.now()).toDateString() === now.toDateString());
  } else if (filterType === 'This Week') {
    displayImages = displayImages.filter(h => {
      const date = new Date(h.createdAt || Date.now());
      return Math.ceil(Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)) <= 7;
    });
  }

  const executeDownload = (item: any) => {
    if (!item || !item.src) return;
    const a = document.createElement('a');
    a.href = item.src;
    a.download = item.filename || 'Processed_Image.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  return (
    <div className="flex flex-col w-full h-full animate-in fade-in duration-300">
      
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
              Image History <Sparkles className="w-6 h-6 text-[#F59E0B] fill-[#F59E0B]" />
            </h1>
          </div>
          <p className="text-[#6B7280] text-sm md:text-base">View and manage your processed images.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search images..." 
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
        </div>
        
        <div className="flex items-center gap-3">
          {selectedIds.size > 0 && (
            <button 
              onClick={() => {
                if (onDelete) {
                  onDelete(Array.from(selectedIds));
                  setSelectedIds(new Set());
                }
              }}
              className="px-4 py-2 bg-red-50 text-red-600 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-red-100 transition-colors"
            >
              <Trash2 className="w-4 h-4" /> Delete Selected ({selectedIds.size})
            </button>
          )}
        </div>
      </div>

      {/* Grid List */}
      {displayImages.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#E5E7EB] p-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
            <ImageIcon className="w-8 h-8 text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No images found</h3>
          <p className="text-gray-500 max-w-md">You haven't processed any images yet, or no results match your current filters.</p>
          <button onClick={onClose} className="mt-6 px-6 py-2.5 bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white font-bold rounded-xl transition-colors">
            Upload Image
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayImages.map((item: any) => (
            <div 
              key={item.id || item._id} 
              className={`relative flex flex-col bg-white border ${selectedIds.has(item.id || item._id) ? 'border-[#6D5EF8] bg-purple-50/20 shadow-md' : 'border-[#E5E7EB] hover:border-gray-300 hover:shadow-md'} rounded-2xl overflow-hidden transition-all group`}
            >
              {/* Checkbox */}
              <div 
                onClick={() => toggleSelect(item.id || item._id)}
                className={`absolute z-10 top-3 left-3 w-6 h-6 rounded-md flex items-center justify-center border cursor-pointer transition-colors shadow-sm ${selectedIds.has(item.id || item._id) ? 'bg-[#6D5EF8] border-[#6D5EF8]' : 'bg-white border-gray-300 hover:border-gray-400'}`}
              >
                {selectedIds.has(item.id || item._id) && <div className="w-3 h-3 bg-white rounded-sm" />}
              </div>

              {/* Star Button */}
              <button 
                onClick={(e) => { e.stopPropagation(); onToggleFavorite && onToggleFavorite(item.id || item._id); }} 
                className={`absolute z-10 top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-sm hover:scale-110 transition-transform ${item.isStarred ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
              >
                <Star className={`w-4 h-4 ${item.isStarred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 hover:text-yellow-400'}`} />
              </button>

              {/* Image Preview */}
              <div className="relative w-full aspect-square bg-[url('https://transparenttextures.com/patterns/cubes.png')] bg-gray-50 border-b border-gray-100 flex items-center justify-center p-4">
                <img 
                  src={item.src} 
                  alt={item.filename} 
                  className="max-w-full max-h-full object-contain drop-shadow-md"
                />
              </div>
              
              {/* Main Content */}
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-[#111827] text-sm truncate flex-grow">
                    {item.filename || 'Processed Image'}
                  </h3>
                </div>
                <div className="text-xs text-[#6B7280] mb-3">{item.date || new Date(item.createdAt).toLocaleDateString()}</div>
                
                {/* Actions */}
                <div className="mt-auto">
                  <button 
                    onClick={() => executeDownload(item)} 
                    className="w-full flex items-center justify-center gap-2 py-2 text-sm font-semibold text-[#6D5EF8] hover:text-white bg-[#EEF2FF] hover:bg-[#6D5EF8] rounded-xl transition-colors"
                  >
                    <Download className="w-4 h-4" /> Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
