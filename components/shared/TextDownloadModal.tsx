'use client';

import React, { useState } from 'react';
import { X, FileText, File } from 'lucide-react';
import { trackFileDownload } from '@/lib/analytics';
import { downloadAsPDF } from '@/lib/pdfUtils';

interface TextDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  filename: string;
  elementId: string;
  toolSlug: string;
}

export default function TextDownloadModal({ isOpen, onClose, content, filename, elementId, toolSlug }: TextDownloadModalProps) {
  const [downloadFormat, setDownloadFormat] = useState('pdf');

  if (!isOpen) return null;

  const handleDownload = () => {
    // Sanitize filename
    const safeFilename = filename.replace(/[^a-z0-9]/gi, '_').toLowerCase();

    if (downloadFormat === 'pdf') {
      downloadAsPDF(elementId, `${safeFilename}.pdf`);
      trackFileDownload(toolSlug, 'pdf', 'result');
      onClose();
      return;
    }
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${safeFilename}.${downloadFormat === 'txt' ? 'txt' : 'docx'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    trackFileDownload(toolSlug, downloadFormat, 'result');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="font-bold text-lg text-gray-900">Download Document</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
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
            onClick={handleDownload}
            className="w-full py-3 bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white font-bold rounded-xl transition-colors shadow-lg shadow-[#6D5EF8]/20"
          >
            Download File
          </button>
        </div>
      </div>
    </div>
  );
}
