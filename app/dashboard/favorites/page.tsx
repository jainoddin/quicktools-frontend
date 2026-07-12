'use client';
import React from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { 
  MessageSquare, Image as ImageIcon, FileText, LayoutGrid, 
  PenTool, CheckCircle2, Mic, Star, ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const favoriteTools = [
  { name: 'AI Chat', desc: 'Ask anything, get AI powered answers', icon: MessageSquare, color: 'bg-[#10B981] text-white', slug: '/tools/ai-chat' },
  { name: 'AI Image Generator', desc: 'Create stunning images from text', icon: ImageIcon, color: 'bg-[#6D5EF8] text-white', slug: '/tools/ai-image-generator' },
  { name: 'PDF to Word', desc: 'Convert PDF files to editable Word', icon: FileText, color: 'bg-[#EF4444] text-white', slug: '/tools/pdf-converter' },
  { name: 'Background Remover', desc: 'Remove background from any image', icon: LayoutGrid, color: 'bg-[#10B981] text-white', slug: '/tools/background-remover' },
  { name: 'AI Writer', desc: 'Generate high-quality content in seconds', icon: PenTool, color: 'bg-[#8B5CF6] text-white', slug: '/tools/ai-writer' },
  { name: 'Grammar Checker', desc: 'Check grammar and improve writing', icon: CheckCircle2, color: 'bg-[#10B981] text-white', slug: '/tools/grammar-checker' },
  { name: 'Image Upscaler', desc: 'Increase image resolution with AI', icon: ImageIcon, color: 'bg-[#3B82F6] text-white', slug: '/tools/image-upscaler' },
  { name: 'Text to Speech', desc: 'Convert text to natural speech', icon: Mic, color: 'bg-[#F59E0B] text-white', slug: '/tools/text-to-speech' },
];

export default function FavoritesPage() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#111827] mb-1">Favorites</h1>
        <p className="text-sm text-[#6B7280]">Your favorite tools</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favoriteTools.map((tool, index) => (
          <Link href={tool.slug} key={index} className="group">
            <div className="bg-white p-5 rounded-2xl border border-[#E5E7EB] hover:border-[#6D5EF8] hover:shadow-xl hover:shadow-[#6D5EF8]/10 transition-all duration-300 relative h-full flex flex-col">

              {/* Top Row: Icon and Tag */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner ${tool.color}`}>
                  <tool.icon className="w-7 h-7" />
                </div>

                <div className="flex gap-2">
                  <button className="text-[#F59E0B] hover:text-[#D97706] transition-colors">
                    <Star className="w-5 h-5 fill-current" />
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
