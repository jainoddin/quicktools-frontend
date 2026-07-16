import React, { useState } from 'react';
import { 
  Search, Grid, List, Filter, Trash2, Star, 
  FileText, Mail, MessageSquare, Tag, Eye, Copy, Download, MoreVertical,
  ChevronLeft, ChevronRight, Clock, Sparkles, File, X
} from 'lucide-react';

interface HistoryItem {
  id: string;
  title: string;
  preview: string;
  date: string;
  category: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  isStarred: boolean;
  words: string;
}

const mockHistory: HistoryItem[] = [
  {
    id: '1',
    title: 'The Future of Artificial Intelligence',
    preview: 'Artificial Intelligence (AI) is no longer a concept of the...',
    date: 'Today, 2:30 PM',
    category: 'Blog Post',
    icon: <FileText className="w-6 h-6" />,
    iconBg: 'bg-purple-100',
    iconColor: 'text-[#6D5EF8]',
    isStarred: true,
    words: '248 Words'
  },
  {
    id: '2',
    title: 'Product Launch Email',
    preview: 'We are excited to announce the launch of our new product designed to make your life easier and more productive. Check out what\'s new and get 20% off...',
    date: 'Today, 1:15 PM',
    category: 'Email',
    icon: <Mail className="w-6 h-6" />,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    isStarred: false,
    words: '156 Words'
  },
  {
    id: '3',
    title: 'LinkedIn Post on Productivity',
    preview: 'Productivity isn\'t about doing more, it\'s about focusing on what truly matters. Here are 5 tips to help you stay productive every day...',
    date: 'Today, 11:05 AM',
    category: 'Social Post',
    icon: <MessageSquare className="w-6 h-6" />,
    iconBg: 'bg-blue-100',
    iconColor: 'text-[#0A66C2]',
    isStarred: true,
    words: '98 Words'
  },
  {
    id: '4',
    title: '10 Tips to Improve Your Writing',
    preview: 'Writing is a skill that improves with practice. Here are 10 practical tips to help you write better content, engage your audience, and deliver value...',
    date: 'Yesterday, 8:45 PM',
    category: 'Blog Post',
    icon: <FileText className="w-6 h-6" />,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-500',
    isStarred: false,
    words: '512 Words'
  },
  {
    id: '5',
    title: 'Meeting Follow-up Email',
    preview: 'Thank you for taking the time to meet with us today. As discussed, here\'s a summary of the key points and next steps...',
    date: 'Yesterday, 4:10 PM',
    category: 'Email',
    icon: <Mail className="w-6 h-6" />,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-500',
    isStarred: false,
    words: '132 Words'
  },
  {
    id: '6',
    title: 'Benefits of Meditation',
    preview: 'Meditation is a powerful practice that can improve your mental clarity, reduce stress, and enhance overall well-being...',
    date: 'May 06, 2024',
    category: 'Blog Post',
    icon: <FileText className="w-6 h-6" />,
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    isStarred: false,
    words: '302 Words'
  }
];

export default function AiWriterHistory({ 
  history = [], 
  onBack,
  onToggleFavorite,
  onDelete,
  isAuthenticated = true,
  onRequireLogin
}: { 
  history?: any[], 
  onBack: () => void,
  onToggleFavorite?: (id: string) => void,
  onDelete?: (ids: string[]) => void,
  isAuthenticated?: boolean,
  onRequireLogin?: () => void
}) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [itemToDownload, setItemToDownload] = useState<any>(null);
  const [downloadFormat, setDownloadFormat] = useState('pdf');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const rawHistory = history.length > 0 ? history.map((item: any) => ({
    id: item.id || item._id,
    title: item.contentType || 'Generated Content',
    preview: item.prompt || 'No preview available',
    date: item.date || (item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Just now'),
    createdAt: item.createdAt || new Date().toISOString(),
    category: item.contentType || 'Tool',
    icon: <FileText className="w-6 h-6" />,
    iconBg: 'bg-purple-100',
    iconColor: 'text-[#6D5EF8]',
    isStarred: item.isStarred || false,
    words: 'Generated',
    result: item.result
  })) : [];

  const now = new Date();
  
  const counts = {
    all: rawHistory.length,
    favorites: rawHistory.filter((i: any) => i.isStarred).length,
    today: rawHistory.filter((i: any) => new Date(i.createdAt).toDateString() === now.toDateString()).length,
    thisWeek: rawHistory.filter((i: any) => Math.ceil(Math.abs(now.getTime() - new Date(i.createdAt).getTime()) / (1000 * 60 * 60 * 24)) <= 7).length,
    thisMonth: rawHistory.filter((i: any) => new Date(i.createdAt).getMonth() === now.getMonth() && new Date(i.createdAt).getFullYear() === now.getFullYear()).length,
  };

  let displayHistory = rawHistory;

  if (searchQuery) {
    displayHistory = displayHistory.filter((item: any) => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.preview.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (filterType === 'Favorites') {
    displayHistory = displayHistory.filter((item: any) => item.isStarred);
  } else if (filterType === 'Today') {
    displayHistory = displayHistory.filter((item: any) => new Date(item.createdAt).toDateString() === now.toDateString());
  } else if (filterType === 'This Week') {
    displayHistory = displayHistory.filter((item: any) => Math.ceil(Math.abs(now.getTime() - new Date(item.createdAt).getTime()) / (1000 * 60 * 60 * 24)) <= 7);
  } else if (filterType === 'This Month') {
    displayHistory = displayHistory.filter((item: any) => new Date(item.createdAt).getMonth() === now.getMonth() && new Date(item.createdAt).getFullYear() === now.getFullYear());
  }

  const totalPages = Math.max(1, Math.ceil(displayHistory.length / itemsPerPage));
  const validCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);
  const startIndex = (validCurrentPage - 1) * itemsPerPage;
  const paginatedHistory = displayHistory.slice(startIndex, startIndex + itemsPerPage);

  const setFilter = (type: string) => {
    setFilterType(type);
    setCurrentPage(1);
  };

  const handleCopy = (text: string) => {
    if (!isAuthenticated && onRequireLogin) {
      onRequireLogin();
      return;
    }
    const textToCopy = (text && text !== 'Generated content successfully') ? text : 'No content available.';
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
    const textToDownload = (itemToDownload.result && itemToDownload.result !== 'Generated content successfully') 
      ? itemToDownload.result 
      : (itemToDownload.preview || 'No content available.');
    const blob = new Blob([textToDownload], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${itemToDownload.title || 'Generated_Content'}.${downloadFormat === 'txt' ? 'txt' : (downloadFormat === 'pdf' ? 'pdf' : 'docx')}`;
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
    <div className="flex flex-col w-full animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <button 
            onClick={onBack} 
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
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search your content..." 
              className="pl-9 pr-4 py-2 border border-[#E5E7EB] rounded-xl text-sm w-full md:w-64 focus:outline-none focus:border-[#6D5EF8] focus:ring-1 focus:ring-[#6D5EF8]"
            />
          </div>
        </div>
      </div>

      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => setFilter('All')} className={`px-5 py-2 text-sm font-semibold rounded-full flex items-center gap-2 shadow-sm transition-colors ${filterType === 'All' ? 'bg-[#6D5EF8] text-white' : 'bg-white border border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50'}`}>
            All <span className="text-xs">({counts.all})</span>
          </button>
          <button onClick={() => setFilter('Favorites')} className={`px-4 py-2 text-sm font-semibold rounded-full flex items-center gap-2 transition-colors shadow-sm ${filterType === 'Favorites' ? 'bg-[#6D5EF8] text-white border-transparent' : 'bg-white border border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50'}`}>
            Favorites <span className={`text-xs ${filterType === 'Favorites' ? 'text-purple-200' : 'text-gray-400'}`}>({counts.favorites})</span>
          </button>
          <button onClick={() => setFilter('Today')} className={`px-4 py-2 text-sm font-semibold rounded-full flex items-center gap-2 transition-colors shadow-sm ${filterType === 'Today' ? 'bg-[#6D5EF8] text-white border-transparent' : 'bg-white border border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50'}`}>
            Today <span className={`text-xs ${filterType === 'Today' ? 'text-purple-200' : 'text-gray-400'}`}>({counts.today})</span>
          </button>
          <button onClick={() => setFilter('This Week')} className={`px-4 py-2 text-sm font-semibold rounded-full flex items-center gap-2 transition-colors shadow-sm ${filterType === 'This Week' ? 'bg-[#6D5EF8] text-white border-transparent' : 'bg-white border border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50'}`}>
            This Week <span className={`text-xs ${filterType === 'This Week' ? 'text-purple-200' : 'text-gray-400'}`}>({counts.thisWeek})</span>
          </button>
          <button onClick={() => setFilter('This Month')} className={`hidden md:flex px-4 py-2 text-sm font-semibold rounded-full items-center gap-2 transition-colors shadow-sm ${filterType === 'This Month' ? 'bg-[#6D5EF8] text-white border-transparent' : 'bg-white border border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50'}`}>
            This Month <span className={`text-xs ${filterType === 'This Month' ? 'text-purple-200' : 'text-gray-400'}`}>({counts.thisMonth})</span>
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
              className="px-4 py-2 bg-red-50 border border-red-100 text-red-600 hover:bg-red-100 text-sm font-semibold rounded-xl flex items-center gap-2 transition-colors shadow-sm animate-in fade-in"
            >
              <Trash2 className="w-4 h-4" /> Delete Selected
            </button>
          )}
        </div>
      </div>

      {/* List View */}
      <div className="flex flex-col gap-4 mb-6">
        {paginatedHistory.length === 0 ? (
          <div className="text-center py-12 text-gray-500 bg-white border border-dashed border-gray-200 rounded-2xl">
            No history found. Generate some content to see it here!
          </div>
        ) : paginatedHistory.map((item) => (
          <div key={item.id} className={`bg-white border rounded-2xl p-5 transition-all flex items-center gap-4 ${selectedIds.has(item.id) ? 'border-[#6D5EF8] ring-1 ring-[#6D5EF8]' : 'border-[#E5E7EB] hover:border-gray-300'}`}>
            
            {/* Checkbox */}
            <div 
              onClick={() => toggleSelect(item.id)}
              className={`w-5 h-5 rounded flex items-center justify-center border cursor-pointer transition-colors shrink-0 ${selectedIds.has(item.id) ? 'bg-[#6D5EF8] border-[#6D5EF8]' : 'border-gray-300 hover:border-gray-400'}`}
            >
              {selectedIds.has(item.id) && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
            </div>

            {/* Icon */}
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${item.iconBg} ${item.iconColor}`}>
              {item.icon}
            </div>
            
            {/* Main Content (Title & Preview) */}
            <div 
              className={`flex-grow min-w-0 pr-4 border-r border-gray-100 ${!isAuthenticated ? 'select-none' : ''}`}
              onContextMenu={(e) => { if (!isAuthenticated) e.preventDefault(); }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <h3 className="font-bold text-[#111827] text-base truncate">
                  {item.title}
                </h3>
                <button onClick={(e) => { e.stopPropagation(); onToggleFavorite && onToggleFavorite(item.id); }} className="hover:scale-110 transition-transform">
                  <Star className={`w-4 h-4 ${item.isStarred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 hover:text-yellow-400'}`} />
                </button>
              </div>
              <p className="text-sm text-[#6B7280] line-clamp-2 leading-relaxed">
                {item.preview}
              </p>
            </div>
            
            {/* Meta Data */}
            <div className="w-40 shrink-0 flex flex-col gap-1.5 pl-2">
              <div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  item.category === 'Blog Post' ? 'bg-purple-100 text-purple-600' :
                  item.category === 'Email' ? 'bg-green-100 text-green-600' :
                  item.category === 'Social Post' ? 'bg-blue-100 text-blue-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {item.category}
                </span>
              </div>
              <div className="text-xs text-[#6B7280] mt-1">{item.date}</div>
              <div className="text-xs text-[#9CA3AF]">{item.words}</div>
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
        ))}
      </div>

      {/* Pagination */}
      {displayHistory.length > 0 && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between pt-2 pb-4 gap-4">
          <p className="text-sm text-[#6B7280]">
            Showing {startIndex + 1}–{Math.min(startIndex + itemsPerPage, displayHistory.length)} of {displayHistory.length}
          </p>
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
        </div>
      )}
      
      {/* Download Modal */}
      {itemToDownload && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="font-bold text-lg text-gray-900">Download Document</h3>
              <button onClick={() => setItemToDownload(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5 space-y-4">
              <div 
                onClick={() => setDownloadFormat('pdf')}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${downloadFormat === 'pdf' ? 'border-[#6D5EF8] bg-purple-50/50' : 'border-gray-100 hover:border-gray-200'}`}
              >
                <div className="w-10 h-10 rounded-lg bg-red-100 text-red-500 flex items-center justify-center shrink-0">
                  <File className="w-5 h-5" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-bold text-gray-900 text-sm">PDF Document</h4>
                  <p className="text-xs text-gray-500">Best for sharing securely (.pdf)</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${downloadFormat === 'pdf' ? 'border-[#6D5EF8] bg-[#6D5EF8]' : 'border-gray-300'}`}>
                  {downloadFormat === 'pdf' && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </div>
              
              <div 
                onClick={() => setDownloadFormat('docx')}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${downloadFormat === 'docx' ? 'border-[#6D5EF8] bg-purple-50/50' : 'border-gray-100 hover:border-gray-200'}`}
              >
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-500 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-bold text-gray-900 text-sm">Word Document</h4>
                  <p className="text-xs text-gray-500">Best for further editing (.docx)</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${downloadFormat === 'docx' ? 'border-[#6D5EF8] bg-[#6D5EF8]' : 'border-gray-300'}`}>
                  {downloadFormat === 'docx' && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </div>
              
              <div 
                onClick={() => setDownloadFormat('txt')}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${downloadFormat === 'txt' ? 'border-[#6D5EF8] bg-purple-50/50' : 'border-gray-100 hover:border-gray-200'}`}
              >
                <div className="w-10 h-10 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-bold text-gray-900 text-sm">Text File</h4>
                  <p className="text-xs text-gray-500">Plain text format (.txt)</p>
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
                Download File
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
