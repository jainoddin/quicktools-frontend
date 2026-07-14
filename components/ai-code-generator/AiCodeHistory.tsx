import React, { useState } from 'react';
import { 
  Search, Star, Trash2, Download, Copy, Code2, 
  Sparkles, File, FileCode2, X
} from 'lucide-react';

interface AiCodeHistoryProps {
  history?: any[];
  onClose: () => void;
  onToggleFavorite?: (id: string) => void;
  onDelete?: (ids: string[]) => void;
  isAuthenticated?: boolean;
  onRequireLogin?: () => void;
}

export default function AiCodeHistory({ history = [], onClose, onToggleFavorite, onDelete, isAuthenticated = true, onRequireLogin }: AiCodeHistoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  
  const [itemToDownload, setItemToDownload] = useState<any>(null);
  const [downloadFormat, setDownloadFormat] = useState<'txt' | 'json' | 'js'>('js');

  const now = new Date();
  const counts = {
    all: history.length,
    favorites: history.filter(h => h.isStarred).length,
    today: history.filter(h => new Date(h.createdAt).toDateString() === now.toDateString()).length,
    thisWeek: history.filter(h => Math.ceil(Math.abs(now.getTime() - new Date(h.createdAt).getTime()) / (1000 * 60 * 60 * 24)) <= 7).length,
    thisMonth: history.filter(h => new Date(h.createdAt).getMonth() === now.getMonth() && new Date(h.createdAt).getFullYear() === now.getFullYear()).length,
  };

  let displayHistory = [...history];

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    displayHistory = displayHistory.filter(item => 
      (item.prompt && item.prompt.toLowerCase().includes(q)) ||
      (item.result && item.result.toLowerCase().includes(q))
    );
  }

  if (filterType === 'Favorites') {
    displayHistory = displayHistory.filter(item => item.isStarred);
  } else if (filterType === 'Today') {
    displayHistory = displayHistory.filter(item => new Date(item.createdAt).toDateString() === now.toDateString());
  } else if (filterType === 'This Week') {
    displayHistory = displayHistory.filter(item => Math.ceil(Math.abs(now.getTime() - new Date(item.createdAt).getTime()) / (1000 * 60 * 60 * 24)) <= 7);
  } else if (filterType === 'This Month') {
    displayHistory = displayHistory.filter(item => new Date(item.createdAt).getMonth() === now.getMonth() && new Date(item.createdAt).getFullYear() === now.getFullYear());
  }

  const handleCopy = (text: string) => {
    if (!isAuthenticated && onRequireLogin) {
      onRequireLogin();
      return;
    }
    const textToCopy = text || 'No code available.';
    navigator.clipboard.writeText(textToCopy);
  };

  const handleDownloadClick = (item: any) => {
    if (!isAuthenticated && onRequireLogin) {
      onRequireLogin();
      return;
    }
    setItemToDownload(item);
  };

  const executeDownload = () => {
    if (!itemToDownload) return;
    const textToDownload = itemToDownload.result || itemToDownload.preview || 'No code available.';
    const blob = new Blob([textToDownload], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Generated_Code.${downloadFormat}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setItemToDownload(null);
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
              Code History <Sparkles className="w-6 h-6 text-[#F59E0B] fill-[#F59E0B]" />
            </h1>
          </div>
          <p className="text-[#6B7280] text-sm md:text-base">View and manage your previously generated code snippets.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your code..." 
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

      {/* Code List */}
      <div className="flex flex-col gap-4">
        {displayHistory.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#E5E7EB] p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
              <Code2 className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No code found</h3>
            <p className="text-gray-500 max-w-md">You haven't generated any code yet, or no results match your current filters.</p>
            <button onClick={onClose} className="mt-6 px-6 py-2.5 bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white font-bold rounded-xl transition-colors">
              Generate Now
            </button>
          </div>
        ) : (
          displayHistory.map((item: any) => (
            <div 
              key={item.id || item._id} 
              className={`flex items-center gap-4 bg-white border ${selectedIds.has(item.id || item._id) ? 'border-[#6D5EF8] bg-purple-50/20' : 'border-[#E5E7EB] hover:border-gray-300 hover:shadow-sm'} rounded-2xl p-4 transition-all`}
            >
              {/* Checkbox */}
              <div 
                onClick={() => toggleSelect(item.id || item._id)}
                className={`w-5 h-5 rounded flex items-center justify-center border cursor-pointer transition-colors shrink-0 ${selectedIds.has(item.id || item._id) ? 'bg-[#6D5EF8] border-[#6D5EF8]' : 'border-gray-300 hover:border-gray-400'}`}
              >
                {selectedIds.has(item.id || item._id) && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
              </div>

              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-blue-50 text-blue-500`}>
                <Code2 className="w-5 h-5" />
              </div>
              
              {/* Main Content */}
              <div 
                className={`flex-grow min-w-0 pr-4 border-r border-gray-100 ${!isAuthenticated ? 'select-none' : ''}`}
                onContextMenu={(e) => { if (!isAuthenticated) e.preventDefault(); }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-[#111827] text-base truncate">
                    {item.prompt || 'Generated Code Snippet'}
                  </h3>
                  <button onClick={(e) => { e.stopPropagation(); onToggleFavorite && onToggleFavorite(item.id || item._id); }} className="hover:scale-110 transition-transform">
                    <Star className={`w-4 h-4 ${item.isStarred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 hover:text-yellow-400'}`} />
                  </button>
                </div>
                <div className="text-xs text-[#6B7280]">{new Date(item.createdAt).toLocaleString()}</div>
              </div>
              
              {/* Actions */}
              <div className="flex items-center gap-1.5 pl-2 shrink-0">
                <button onClick={() => handleCopy(item.result)} className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-[#111827] border border-gray-200 hover:bg-gray-50 rounded-full transition-colors">
                  <Copy className="w-4 h-4" />
                </button>
                <button onClick={() => handleDownloadClick(item)} className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-[#111827] border border-gray-200 hover:bg-gray-50 rounded-full transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Download Modal */}
      {itemToDownload && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="font-bold text-lg text-gray-900">Download Code</h3>
              <button onClick={() => setItemToDownload(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5 space-y-4">
              <div 
                onClick={() => setDownloadFormat('js')}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${downloadFormat === 'js' ? 'border-[#6D5EF8] bg-purple-50/50' : 'border-gray-100 hover:border-gray-200'}`}
              >
                <div className="w-10 h-10 rounded-lg bg-yellow-100 text-yellow-600 flex items-center justify-center shrink-0">
                  <FileCode2 className="w-5 h-5" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-bold text-gray-900 text-sm">JavaScript (.js)</h4>
                  <p className="text-xs text-gray-500">Standard JavaScript file</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${downloadFormat === 'js' ? 'border-[#6D5EF8] bg-[#6D5EF8]' : 'border-gray-300'}`}>
                  {downloadFormat === 'js' && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </div>
              
              <div 
                onClick={() => setDownloadFormat('txt')}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${downloadFormat === 'txt' ? 'border-[#6D5EF8] bg-purple-50/50' : 'border-gray-100 hover:border-gray-200'}`}
              >
                <div className="w-10 h-10 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
                  <File className="w-5 h-5" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-bold text-gray-900 text-sm">Text File (.txt)</h4>
                  <p className="text-xs text-gray-500">Plain text format</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${downloadFormat === 'txt' ? 'border-[#6D5EF8] bg-[#6D5EF8]' : 'border-gray-300'}`}>
                  {downloadFormat === 'txt' && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </div>
            </div>
            
            <div className="p-5 border-t border-gray-100 bg-gray-50">
              <button 
                onClick={executeDownload}
                className="w-full py-3 bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white font-bold rounded-xl transition-colors shadow-lg shadow-[#6D5EF8]/20"
              >
                Download Code
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
