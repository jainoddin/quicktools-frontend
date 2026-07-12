'use client';
import React from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { 
  MessageSquare, Image as ImageIcon, FileText, LayoutGrid, 
  Mic, PenTool, QrCode, PlaySquare, ChevronDown,
  Star, ArrowRight, Code, CheckCircle2, Flame, Sparkles
} from 'lucide-react';
import Link from 'next/link';

const allTools = [
  { name: 'AI Chat', desc: 'Ask anything, get AI powered answers', icon: MessageSquare, color: 'bg-[#10B981] text-white', slug: '/tools/ai-chat', tag: { label: 'Popular', type: 'popular', icon: Flame } },
  { name: 'AI Image Generator', desc: 'Create stunning images from text', icon: ImageIcon, color: 'bg-[#6D5EF8] text-white', slug: '/tools/ai-image-generator', tag: { label: 'Popular', type: 'popular', icon: Flame } },
  { name: 'Background Remover', desc: 'Remove background from any image', icon: LayoutGrid, color: 'bg-[#10B981] text-white', slug: '/tools/background-remover', tag: { label: 'Popular', type: 'popular', icon: Flame } },
  { name: 'PDF to Word', desc: 'Convert PDF files to editable Word', icon: FileText, color: 'bg-[#EF4444] text-white', slug: '/tools/pdf-converter', tag: null },
  { name: 'Image Upscaler', desc: 'Increase image resolution with AI', icon: ImageIcon, color: 'bg-[#3B82F6] text-white', slug: '/tools/image-upscaler', tag: { label: 'New', type: 'new', icon: Sparkles } },
  { name: 'AI Writer', desc: 'Generate high-quality content in seconds', icon: PenTool, color: 'bg-[#8B5CF6] text-white', slug: '/tools/ai-writer', tag: { label: 'Popular', type: 'popular', icon: Flame } },
  { name: 'Text to Speech', desc: 'Convert text to natural speech', icon: Mic, color: 'bg-[#F59E0B] text-white', slug: '/tools/text-to-speech', tag: null },
  { name: 'AI Code Generator', desc: 'Generate code with AI assistance', icon: Code, color: 'bg-[#8B5CF6] text-white', slug: '/tools/ai-code-generator', tag: { label: 'New', type: 'new', icon: Sparkles } },
  { name: 'PDF Summarizer', desc: 'Summarize PDF content instantly', icon: FileText, color: 'bg-[#EF4444] text-white', slug: '/tools/pdf-summarizer', tag: null },
  { name: 'Grammar Checker', desc: 'Check grammar and improve writing', icon: CheckCircle2, color: 'bg-[#10B981] text-white', slug: '/tools/grammar-checker', tag: null },
  { name: 'YouTube Summary', desc: 'Get summary of any YouTube video', icon: PlaySquare, color: 'bg-[#EF4444] text-white', slug: '/tools/youtube-summary', tag: { label: 'New', type: 'new', icon: Sparkles } },
  { name: 'QR Code Generator', desc: 'Create custom QR codes', icon: QrCode, color: 'bg-[#EF4444] text-white', slug: '/tools/qr-code', tag: null },
];

export default function AllToolsPage() {
  const filters = ['All', 'Popular', 'New', 'Free', 'Premium'];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#111827] mb-2 tracking-tight">All AI Tools</h1>
        <p className="text-[#6B7280] text-lg">100+ AI-powered tools to boost your productivity ✨</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
          {filters.map((filter, i) => (
            <button 
              key={filter} 
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors shadow-sm ${i === 0 ? 'bg-[#6D5EF8] text-white shadow-md shadow-[#6D5EF8]/20' : 'bg-white border border-[#E5E7EB] text-[#4B5563] hover:bg-[#F9FAFB]'}`}
            >
              {filter}
            </button>
          ))}
        </div>

        <button className="flex items-center gap-2 text-sm font-medium text-[#4B5563] bg-white border border-[#E5E7EB] px-4 py-2 rounded-xl hover:bg-[#F9FAFB] transition-colors shrink-0 shadow-sm">
          Sort by: Popular <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {allTools.map((tool, index) => (
          <Link href={tool.slug} key={index} className="group">
            <div className="bg-white p-5 rounded-2xl border border-[#E5E7EB] hover:border-[#6D5EF8] hover:shadow-xl hover:shadow-[#6D5EF8]/10 transition-all duration-300 relative h-full flex flex-col">

              {/* Top Row: Icon and Tag */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner ${tool.color}`}>
                  <tool.icon className="w-7 h-7" />
                </div>

                <div className="flex gap-2 items-center">
                  {tool.tag && (
                    <div className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold ${tool.tag.type === 'popular' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-600'}`}>
                      <tool.tag.icon className="w-3 h-3" />
                      {tool.tag.label}
                    </div>
                  )}
                  <button className="text-[#9CA3AF] hover:text-[#6D5EF8] transition-colors">
                    <Star className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-[#111827] mb-2 group-hover:text-[#6D5EF8] transition-colors">
                {tool.name}
              </h3>
              <p className="text-[#6B7280] text-sm leading-relaxed mb-6 flex-grow">
                {tool.desc}
              </p>

              {/* Try Now Button */}
              <div className="w-full py-2.5 bg-[#F8FAFC] group-hover:bg-[#EEF2FF] text-[#6D5EF8] rounded-xl font-semibold text-[14px] flex items-center justify-center transition-colors">
                Try Now <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>

            </div>
          </Link>
        ))}
      </div>
    </DashboardLayout>
  );
}
