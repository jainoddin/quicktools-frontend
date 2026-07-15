"use client";

import React, { useState } from 'react';
import {
  Code2, History, LayoutGrid, Maximize, Copy, Download, Play,
  Box, ExternalLink, Lightbulb, Edit3, Headphones, Sparkles, ArrowLeft, Crown
} from 'lucide-react';
import AiCodeDownloadModal from './AiCodeDownloadModal';
import { PDFDocument, rgb } from 'pdf-lib';

interface AiCodeResultProps {
  onHistoryClick: () => void;
  onBackClick?: () => void;
  isAuthenticated?: boolean;
  onRequireLogin?: () => void;
  onRequirePremium?: () => void;
  resultData?: { html: string; css: string; js: string; explanation: string[] };
  language?: string;
  framework?: string;
  isPro?: boolean;
}

export default function AiCodeResult({ onHistoryClick, onBackClick, isAuthenticated = true, onRequireLogin, onRequirePremium, resultData, language, framework, isPro = false }: AiCodeResultProps) {
  const [activeTab, setActiveTab] = useState('html');
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => { setActiveTab(defaultTab); }, [resultData]);

  const htmlCode = resultData?.html || '';
  const cssCode = resultData?.css || '';
  const jsCode = resultData?.js || '';
  const explanation = resultData?.explanation || ['No explanation provided.'];

  let htmlName = 'index.html';
  let cssName = 'style.css';
  let jsName = 'script.js';
  
  let htmlExt = 'text/html';
  let cssExt = 'text/css';
  let jsExt = 'text/javascript';

  const langLower = (language || '').toLowerCase();
  const frameLower = (framework || '').toLowerCase();

  if (langLower.includes('react')) {
    htmlName = 'App.jsx';
    htmlExt = 'text/javascript';
    jsName = 'utils.js';
  } else if (langLower.includes('python')) {
    htmlName = 'main.py';
    htmlExt = 'text/x-python';
  } else if (langLower.includes('java') && !langLower.includes('javascript')) {
    htmlName = 'Main.java';
    htmlExt = 'text/x-java-source';
  } else if (langLower.includes('c++') || langLower.includes('cpp')) {
    htmlName = 'main.cpp';
    htmlExt = 'text/x-c++src';
  } else if (langLower.includes('typescript')) {
    htmlName = frameLower.includes('react') || frameLower.includes('next') ? 'App.tsx' : 'index.ts';
    htmlExt = 'text/typescript';
  } else if (langLower.includes('vue')) {
    htmlName = 'App.vue';
    htmlExt = 'text/plain';
  } else if (langLower.includes('node') || (langLower === 'javascript' && !frameLower.includes('react'))) {
    htmlName = 'app.js';
    htmlExt = 'text/javascript';
  }

  // Only show files that have meaningful content (more than just wrapper/boilerplate)
  const hasContent = (code: string) => code && code.trim().length > 30;
  const showHtml = hasContent(htmlCode);
  const showCss = hasContent(cssCode);
  const showJs = hasContent(jsCode);

  // Default tab to first file with content
  const defaultTab = showHtml ? 'html' : showCss ? 'css' : 'js';

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!');
  };

  const handleDirectDownload = async (content: string, filename: string, type: string) => {
    if (!isPro && onRequirePremium) {
      onRequirePremium();
      return;
    }
    if (isPro) {
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
            // Truncate long lines to avoid them going off page (rudimentary wrapping)
            const lineText = lines[i].substring(0, 100); 
            page.drawText(lineText, { x: 40, y: y, size: fontSize, color: rgb(0, 0, 0) });
          } catch(err) {
            // Ignore invalid characters
          }
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
    } else {
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

  return (
    <div className="flex flex-col animate-in fade-in duration-500 min-w-0">

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-start lg:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#6D5EF8] rounded-xl flex items-center justify-center shrink-0 shadow-sm">
            <Code2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#111827] flex items-center gap-2">
              Your Code is Ready! <span className="text-xl">🚀</span>
            </h1>
            <p className="text-sm text-[#6B7280] mt-0.5">Your AI-generated code is ready to use. You can copy, download or edit it.</p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {onBackClick && (
            <button onClick={onBackClick} className="flex items-center gap-2 bg-white border border-[#E5E7EB] px-4 py-2.5 rounded-xl text-sm font-semibold text-[#111827] hover:bg-gray-50 transition-all shadow-sm">
              <ArrowLeft className="w-4 h-4 text-[#6B7280]" /> Back
            </button>
          )}
          <button onClick={onHistoryClick} className="flex items-center gap-2 bg-white border border-[#E5E7EB] px-4 py-2.5 rounded-xl text-sm font-semibold text-[#111827] hover:bg-gray-50 transition-all shadow-sm">
            <History className="w-4 h-4 text-[#6B7280]" /> History
          </button>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="flex flex-col xl:flex-row gap-6 items-start min-w-0">

        {/* Left Column (Code Editor & Actions) */}
        <div className="w-full flex-grow flex flex-col gap-6 min-w-0">

          {/* Code Editor Block */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden flex flex-col min-w-0">

            {/* Tabs Header */}
            <div className="flex items-center justify-between border-b border-[#E5E7EB] px-2 py-2 bg-white overflow-x-auto custom-scrollbar">
              <div className="flex items-center gap-1">
                {showHtml && (
                  <button
                    onClick={() => setActiveTab('html')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${activeTab === 'html' ? 'bg-[#EEF2FF] text-[#6D5EF8]' : 'text-[#6B7280] hover:bg-gray-50'}`}
                  >
                    <div className="w-4 h-4 bg-[#E44D26] rounded-sm flex items-center justify-center text-[8px] font-bold text-white shrink-0">5</div>
                    {htmlName}
                  </button>
                )}
                {showCss && (
                  <button
                    onClick={() => setActiveTab('css')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${activeTab === 'css' ? 'bg-[#EEF2FF] text-[#6D5EF8]' : 'text-[#6B7280] hover:bg-gray-50'}`}
                  >
                    <div className="w-4 h-4 bg-[#264DE4] rounded-sm flex items-center justify-center text-[8px] font-bold text-white shrink-0">3</div>
                    {cssName}
                  </button>
                )}
                {showJs && (
                  <button
                    onClick={() => setActiveTab('js')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${activeTab === 'js' ? 'bg-[#EEF2FF] text-[#6D5EF8]' : 'text-[#6B7280] hover:bg-gray-50'}`}
                  >
                    <div className="w-4 h-4 bg-[#F7DF1E] rounded-sm flex items-center justify-center text-[8px] font-bold text-black shrink-0">JS</div>
                    {jsName}
                  </button>
                )}
              </div>
            </div>

            {/* Code Content */}
            <div className="bg-[#1e1e2e] relative overflow-hidden flex flex-col group min-h-[400px] max-h-[600px]">

              {/* Code Pre/Code block with line numbers */}
              <div className="flex flex-grow text-sm font-mono overflow-auto custom-scrollbar relative p-4 min-w-0">
                {/* Line Numbers */}
                <div className="flex flex-col text-right pr-4 text-[#6e6e8e] select-none sticky left-0 bg-[#1e1e2e] border-r border-[#313244] shrink-0 min-h-full">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <span key={i} className="leading-6">{i + 1}</span>
                  ))}
                </div>
                <div
                  className={`pl-4 text-[#cdd6f4] whitespace-pre min-w-max leading-6 select-none`}
                  onContextMenu={(e) => { e.preventDefault(); }}
                >
                  {activeTab === 'html' ? htmlCode : activeTab === 'css' ? cssCode : activeTab === 'js' ? jsCode : null}
                </div>
              </div>
            </div>
          </div>



          {/* Tip Banner */}
          <div className="bg-[#F5F3FF] rounded-xl border border-[#EDE9FE] p-4 flex items-center justify-center gap-2 text-sm text-[#4B5563] shadow-sm mt-4">
            <Lightbulb className="w-4 h-4 text-[#6D5EF8]" />
            <span className="font-bold text-[#111827]">Tip:</span> Be more specific in your description to get better results.
          </div>

        </div>

        {/* Right Column (Sidebar Details) */}
        <div className="w-full xl:w-[320px] shrink-0 space-y-6">

          {/* Code Explanation */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-sm">
            <h3 className="font-bold text-[#111827] mb-3 text-sm flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-[#F59E0B]" /> What this code does:
            </h3>
            <ul className="space-y-2">
              {explanation.map((line: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-[#4B5563]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6D5EF8] mt-1.5 shrink-0"></div>
                  <span className="leading-relaxed">{line}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Files Generated */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-sm">
            <h3 className="text-sm font-bold text-[#111827] mb-4 flex items-center gap-2">
              Files Generated
              {!isPro && <Crown className="w-4 h-4 text-[#F59E0B]" />}
            </h3>
            <div className="space-y-2 mb-4">

              {showHtml && (
                <div
                  onClick={() => handleDirectDownload(htmlCode, htmlName, htmlExt)}
                  className="flex items-center justify-between p-3 rounded-xl border border-[#E5E7EB] hover:border-gray-300 transition-colors bg-[#FAFAFA] group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 bg-[#E44D26] rounded-sm flex items-center justify-center text-[9px] font-bold text-white shrink-0 shadow-sm">5</div>
                    <span className="text-sm font-semibold text-[#111827]">{htmlName}</span>
                  </div>
                  <Download className="w-4 h-4 text-gray-400 group-hover:text-[#6D5EF8] transition-colors" />
                </div>
              )}

              {showCss && (
                <div
                  onClick={() => handleDirectDownload(cssCode, cssName, cssExt)}
                  className="flex items-center justify-between p-3 rounded-xl border border-[#E5E7EB] hover:border-gray-300 transition-colors bg-[#FAFAFA] group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 bg-[#264DE4] rounded-sm flex items-center justify-center text-[9px] font-bold text-white shrink-0 shadow-sm">3</div>
                    <span className="text-sm font-semibold text-[#111827]">{cssName}</span>
                  </div>
                  <Download className="w-4 h-4 text-gray-400 group-hover:text-[#6D5EF8] transition-colors" />
                </div>
              )}

              {showJs && (
                <div
                  onClick={() => handleDirectDownload(jsCode, jsName, jsExt)}
                  className="flex items-center justify-between p-3 rounded-xl border border-[#E5E7EB] hover:border-gray-300 transition-colors bg-[#FAFAFA] group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 bg-[#F7DF1E] rounded-sm flex items-center justify-center text-[9px] font-bold text-black shrink-0 shadow-sm">JS</div>
                    <span className="text-sm font-semibold text-[#111827]">{jsName}</span>
                  </div>
                  <Download className="w-4 h-4 text-gray-400 group-hover:text-[#6D5EF8] transition-colors" />
                </div>
              )}

            </div>

            <button
              onClick={() => isPro ? setIsDownloadModalOpen(true) : (onRequirePremium && onRequirePremium())}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#6D5EF8] text-sm font-bold text-[#6D5EF8] hover:bg-[#F5F3FF] transition-colors"
            >
              <Download className="w-4 h-4" /> Download All Files
            </button>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-sm">
            <h3 className="text-sm font-bold text-[#111827] mb-4">Next Steps</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5"><Edit3 className="w-4 h-4 text-[#6B7280]" /></div>
                <p className="text-xs text-[#4B5563] leading-relaxed">Edit the code to fit your needs.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5"><Download className="w-4 h-4 text-[#6B7280]" /></div>
                <p className="text-xs text-[#4B5563] leading-relaxed">Download and deploy on your server.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5"><Headphones className="w-4 h-4 text-[#6B7280]" /></div>
                <p className="text-xs text-[#4B5563] leading-relaxed">Need help? Contact our support.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
      {/* Modals */}
      <AiCodeDownloadModal 
        isOpen={isDownloadModalOpen} 
        onClose={() => setIsDownloadModalOpen(false)} 
        htmlCode={htmlCode}
        cssCode={cssCode}
        jsCode={jsCode}
        htmlName={htmlName}
        cssName={cssName}
        jsName={jsName}
        htmlExt={htmlExt}
        cssExt={cssExt}
        jsExt={jsExt}
        isPro={isPro}
      />
    </div>
  );
}
