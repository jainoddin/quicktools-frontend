import React, { useEffect, useState } from 'react';
import { X, Code2, Crown, Download, ShieldCheck, Zap } from 'lucide-react';
import { PDFDocument, rgb } from 'pdf-lib';

interface AiCodeDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  htmlCode?: string;
  cssCode?: string;
  jsCode?: string;
  htmlName?: string;
  cssName?: string;
  jsName?: string;
  htmlExt?: string;
  cssExt?: string;
  jsExt?: string;
  isPro?: boolean;
}

export default function AiCodeDownloadModal({ 
  isOpen, onClose, htmlCode, cssCode, jsCode, 
  htmlName = 'index.html', cssName = 'style.css', jsName = 'script.js',
  htmlExt = 'text/html', cssExt = 'text/css', jsExt = 'text/javascript',
  isPro = false
}: AiCodeDownloadModalProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const triggerDownload = async (content: string, filename: string, type: string) => {
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([595, 842]);
      
      const lines = content.split('\n');
      const fontSize = 10;
      let y = 800;
      
      for (let i = 0; i < lines.length; i++) {
        if (y < 40) {
          pdfDoc.addPage([595, 842]);
          y = 800;
        }
        try {
          const lineText = lines[i].substring(0, 100); 
          page.drawText(lineText, { x: 40, y: y, size: fontSize, color: rgb(0, 0, 0) });
        } catch(err) {}
        y -= 15;
      }
      
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const pdfFilename = filename.replace(/\.[^/.]+$/, "") + '.pdf';
      const a = document.createElement('a');
      a.href = url;
      a.download = pdfFilename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("PDF generation failed, falling back to direct download", e);
      const blob = new Blob([content], { type });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const { default: JSZip } = await import('jszip');
      const zip = new JSZip();

      const addPdfToZip = async (content: string, filename: string) => {
        try {
          const pdfDoc = await PDFDocument.create();
          let page = pdfDoc.addPage([595, 842]);
          const lines = content.split('\n');
          const fontSize = 10;
          let y = 800;
          for (let i = 0; i < lines.length; i++) {
            if (y < 40) {
              page = pdfDoc.addPage([595, 842]);
              y = 800;
            }
            try {
              const lineText = lines[i].substring(0, 100); 
              page.drawText(lineText, { x: 40, y: y, size: fontSize, color: rgb(0, 0, 0) });
            } catch(err) {}
            y -= 15;
          }
          const pdfBytes = await pdfDoc.save();
          const pdfFilename = filename.replace(/\.[^/.]+$/, "") + '.pdf';
          zip.file(pdfFilename, pdfBytes);
        } catch (e) {
          console.error("PDF generation for zip failed", e);
          zip.file(filename, content);
        }
      };

      if (htmlCode) {
        if (isPro) await addPdfToZip(htmlCode, htmlName);
        else zip.file(htmlName, htmlCode);
      }
      if (cssCode) {
        if (isPro) await addPdfToZip(cssCode, cssName);
        else zip.file(cssName, cssCode);
      }
      if (jsCode) {
        if (isPro) await addPdfToZip(jsCode, jsName);
        else zip.file(jsName, jsCode);
      }

      const zipBlob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'project_files.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Zip generation failed", e);
    }
    
    setIsDownloading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div 
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-300 relative border border-[#E5E7EB]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E5E7EB]">
          <h2 className="text-xl font-bold text-[#111827] flex items-center gap-2">
            Download Project Files
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          
          <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl p-5 mb-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0 border border-yellow-200">
                <Crown className="w-6 h-6 text-[#F59E0B] fill-[#F59E0B]" />
              </div>
              <div>
                <h3 className="font-bold text-[#111827] flex items-center gap-2 text-lg">
                  Premium Export <span className="bg-[#F59E0B] text-white text-[10px] uppercase tracking-bold px-2 py-0.5 rounded-full font-bold">PRO</span>
                </h3>
                <p className="text-sm text-[#927F4C] mt-1 mb-3 font-medium">
                  Unlock the full project codebase in a ready-to-use ZIP file.
                </p>
                
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center gap-2 text-sm text-[#786326]">
                    <Code2 className="w-4 h-4 text-[#F59E0B]" /> All generated files ({[htmlCode && htmlName, cssCode && cssName, jsCode && jsName].filter(Boolean).join(', ')})
                  </li>
                  <li className="flex items-center gap-2 text-sm text-[#786326]">
                    <Zap className="w-4 h-4 text-[#F59E0B]" /> Un-minified & well-commented code
                  </li>
                  <li className="flex items-center gap-2 text-sm text-[#786326]">
                    <ShieldCheck className="w-4 h-4 text-[#F59E0B]" /> Commercial use license
                  </li>
                </ul>

                <button 
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="w-full flex items-center justify-center gap-2 bg-[#111827] hover:bg-black text-white px-5 py-3 rounded-xl text-sm font-bold shadow-md transition-all active:scale-[0.98]"
                >
                  {isDownloading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Download className="w-4 h-4" /> Download Full ZIP
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
