'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, MessageSquare, Image as ImageIcon, FileText, LayoutGrid, 
  ChevronRight, Mic, PenTool, LayoutTemplate, QrCode, PlaySquare, 
  MoreVertical, Star, TrendingUp, CheckCircle2, Code, Clock, ChevronDown
} from 'lucide-react';
import Sidebar from '../../components/dashboard/Sidebar';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import { getEndpoint } from '../../lib/api';

const popularTools = [
  { name: 'AI Image Generator', icon: ImageIcon, color: 'bg-[#6D5EF8] text-white', lightColor: 'bg-[#F5F3FF] text-[#6D5EF8]', slug: '/tools/ai-image-generator' },
  { name: 'AI Chat Assistant', icon: MessageSquare, color: 'bg-[#8B5CF6] text-white', lightColor: 'bg-[#F5F3FF] text-[#8B5CF6]', slug: '/tools/ai-chat-assistant' },
  { name: 'Background Remover', icon: LayoutGrid, color: 'bg-[#10B981] text-white', lightColor: 'bg-[#ECFDF5] text-[#10B981]', slug: '/tools/background-remover' },
  { name: 'PDF Converter', icon: FileText, color: 'bg-[#EF4444] text-white', lightColor: 'bg-[#FEF2F2] text-[#EF4444]', slug: '/tools/pdf-converter' },
  { name: 'AI Writer', icon: PenTool, color: 'bg-[#3B82F6] text-white', lightColor: 'bg-[#EFF6FF] text-[#3B82F6]', slug: '/tools/ai-writer' }
];

const recentTools = [
  { name: 'Background Remover', desc: 'Removed background from image.png', icon: LayoutGrid, color: 'bg-[#10B981] text-white', time: '2 min ago' },
  { name: 'AI Image Generator', desc: '"Cute cat in astronaut suit"', icon: ImageIcon, color: 'bg-[#6D5EF8] text-white', time: '1 hour ago' },
  { name: 'PDF to Word', desc: 'converted_document.pdf', icon: FileText, color: 'bg-[#EF4444] text-white', time: '3 hours ago' },
];

import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';
import { useContext } from 'react';

export default function DashboardPage() {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] || 'Guest';
  const plan = (user?.plan || 'free').toLowerCase();
  const isPro = plan === 'pro' || plan === 'premium';

  const [searchQuery, setSearchQuery] = useState('');
  const [timeframe, setTimeframe] = useState('month');
  const [usageData, setUsageData] = useState<any>(null);
  const [isLoadingUsage, setIsLoadingUsage] = useState(true);

  useEffect(() => {
    const fetchUsage = async () => {
      try {
        setIsLoadingUsage(true);
        const res = await fetch(getEndpoint(`/api/user/usage?timeframe=${timeframe}`), {
          credentials: 'include'
        });
        const json = await res.json();
        if (json.success) {
          setUsageData(json.data);
        }
      } catch (err) {
        console.error('Failed to fetch usage', err);
      } finally {
        setIsLoadingUsage(false);
      }
    };
    if (user) {
      fetchUsage();
    }
  }, [timeframe, user]);

  const filteredTools = popularTools.filter(tool => 
    tool.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      {/* Hero Banner */}
            <div className="bg-gradient-to-r from-[#F5F3FF] to-[#EEF2FF] rounded-3xl p-6 md:p-10 relative overflow-hidden flex flex-col md:flex-row items-center border border-[#E5E7EB]/50 shadow-sm w-full">
              {/* Background Shapes */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3"></div>
              <div className="absolute bottom-0 left-10 w-40 h-40 bg-purple-200/40 blur-2xl rounded-full translate-y-1/2"></div>
              
              <div className="relative z-10 flex-1 w-full max-w-lg mb-8 md:mb-0">
                <h1 className="text-2xl md:text-3xl font-bold text-[#111827] mb-2">
                  Welcome back, {firstName}! 👋
                </h1>
                <p className="text-[#6B7280] mb-6">What would you like to create today?</p>
                
                <div className="relative flex items-center w-full max-w-md">
                  <Search className="absolute left-4 w-5 h-5 text-[#9CA3AF]" />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search from your AI tools..." 
                    className="w-full h-14 pl-12 pr-14 bg-white border border-white rounded-2xl shadow-sm outline-none focus:ring-4 focus:ring-[#6D5EF8]/20 transition-all text-[#111827]"
                  />
                  <button className="absolute right-2 w-10 h-10 bg-[#6D5EF8] hover:bg-[#5B4DF5] transition-colors rounded-xl flex items-center justify-center shadow-md">
                    <Search className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Illustration Placeholder (Right) */}
              <div className="relative z-10 w-full md:w-[40%] flex justify-end">
                <div className="relative w-[280px] h-[200px] flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#6D5EF8]/20 to-purple-400/20 rounded-full blur-2xl"></div>
                  {/* We use the custom 3D robot image */}
                  <div className="relative z-10 text-center animate-bounce-slow">
                    <img src="https://pub-68a98c57e70a4a1fa317739dd20098b9.r2.dev/8272f569-4d19-493a-a322-db5d2b122697.png" alt="AI Robot" className="w-[280px] object-contain drop-shadow-2xl" />
                  </div>
                  {/* Floating Elements */}
                  <div className="absolute top-4 right-10 bg-white p-2.5 rounded-xl shadow-lg rotate-12 animate-pulse">
                    <ImageIcon className="w-6 h-6 text-[#10B981]" />
                  </div>
                  <div className="absolute bottom-4 left-10 bg-white p-2.5 rounded-xl shadow-lg -rotate-12 animate-pulse" style={{ animationDelay: '1s' }}>
                    <Code className="w-6 h-6 text-[#6D5EF8]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
              <button className="bg-white border border-[#E5E7EB] hover:border-[#3B82F6] hover:shadow-md transition-all rounded-2xl p-4 flex items-center justify-between group w-full text-left">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 shrink-0 bg-[#EFF6FF] rounded-xl flex items-center justify-center text-[#3B82F6]">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-[#111827] truncate">AI Chat</div>
                    <div className="text-[11px] text-[#6B7280] truncate">Chat with AI assistant</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 shrink-0 text-[#9CA3AF] group-hover:text-[#3B82F6] group-hover:translate-x-1 transition-all ml-2" />
              </button>

              <button className="bg-white border border-[#E5E7EB] hover:border-[#10B981] hover:shadow-md transition-all rounded-2xl p-4 flex items-center justify-between group w-full text-left">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 shrink-0 bg-[#ECFDF5] rounded-xl flex items-center justify-center text-[#10B981]">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-[#111827] truncate">Image Generator</div>
                    <div className="text-[11px] text-[#6B7280] truncate">Create stunning images</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 shrink-0 text-[#9CA3AF] group-hover:text-[#10B981] group-hover:translate-x-1 transition-all ml-2" />
              </button>

              <button className="bg-white border border-[#E5E7EB] hover:border-[#8B5CF6] hover:shadow-md transition-all rounded-2xl p-4 flex items-center justify-between group w-full text-left">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 shrink-0 bg-[#F5F3FF] rounded-xl flex items-center justify-center text-[#8B5CF6]">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-[#111827] truncate">PDF Tools</div>
                    <div className="text-[11px] text-[#6B7280] truncate">Edit and convert PDFs</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 shrink-0 text-[#9CA3AF] group-hover:text-[#8B5CF6] group-hover:translate-x-1 transition-all ml-2" />
              </button>

              <button className="bg-gradient-to-br from-[#FFF7ED] to-[#FFEDD5] border border-[#FED7AA] hover:shadow-md transition-all rounded-2xl p-4 flex items-center justify-between group w-full text-left">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 shrink-0 bg-[#F97316] rounded-xl flex items-center justify-center text-white shadow-sm">
                    <LayoutGrid className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-[#9A3412] truncate">Explore All</div>
                    <div className="text-[11px] text-[#C2410C] truncate">Browse 100+ tools</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 shrink-0 text-[#F97316] group-hover:translate-x-1 transition-all ml-2" />
              </button>
            </div>

            {/* Dashboard Grid (Left Column 2/3, Right Column 1/3) */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              
              {/* Left Column (Popular & Recent) */}
              <div className="xl:col-span-2 space-y-6">
                
                {/* Popular Tools */}
                <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-bold text-lg text-[#111827]">Popular Tools</h2>
                    <button className="text-xs font-semibold text-[#6D5EF8] bg-[#EEF2FF] px-3 py-1.5 rounded-lg hover:bg-[#E0E7FF] transition-colors">
                      View all
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {filteredTools.map((tool, i) => (
                      <Link href={tool.slug} key={i} className="flex flex-col items-center justify-center p-3 rounded-2xl hover:bg-[#F9FAFB] transition-colors group cursor-pointer border border-transparent hover:border-[#E5E7EB]">
                        <div className={`w-14 h-14 ${tool.color} rounded-[18px] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm`}>
                          <tool.icon className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-semibold text-[#374151] text-center px-1 leading-tight">{tool.name}</span>
                      </Link>
                    ))}
                    {filteredTools.length === 0 && (
                      <div className="col-span-full text-center text-sm text-[#6B7280] py-8">
                        No tools found matching "{searchQuery}"
                      </div>
                    )}
                  </div>
                </div>

                {/* Recent Tools */}
                <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-bold text-lg text-[#111827]">Recent Tools</h2>
                    <Link href="/dashboard/history" className="text-xs font-semibold text-[#4B5563] bg-[#F3F4F6] px-3 py-1.5 rounded-lg hover:bg-[#E5E7EB] transition-colors inline-block">
                      View all
                    </Link>
                  </div>

                  <div className="space-y-4">
                    {isLoadingUsage ? (
                      <div className="text-center text-sm text-[#6B7280] py-8 animate-pulse">Loading history...</div>
                    ) : usageData?.history && usageData.history.length > 0 ? (
                      usageData.history.slice(0, 3).map((item: any, i: number) => {
                        const tool = popularTools.find(t => t.name === item.toolName) || popularTools[0];
                        return (
                          <Link href={tool.slug} key={item._id} className="flex items-center justify-between p-4 border border-[#E5E7EB] rounded-2xl hover:bg-[#F9FAFB] transition-colors cursor-pointer group block">
                            <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${tool.color}`}>
                                <tool.icon className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="font-bold text-sm text-[#111827]">{item.toolName}</div>
                                <div className="text-xs text-[#6B7280] truncate max-w-[150px] sm:max-w-[200px]">{item.prompt}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-xs text-[#9CA3AF] hidden sm:block">
                                {new Date(item.createdAt).toLocaleDateString()}
                              </span>
                              <ChevronRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#111827] transition-colors" />
                            </div>
                          </Link>
                        );
                      })
                    ) : (
                      <div className="text-center text-sm text-[#6B7280] py-8">
                        No recent tools used. Start creating!
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-[#F3F4F6] text-center">
                    <Link href="/dashboard/history" className="text-sm font-semibold text-[#6D5EF8] flex items-center justify-center gap-2 w-full hover:bg-[#EEF2FF] py-2 rounded-xl transition-colors">
                      <Clock className="w-4 h-4" /> View full history
                    </Link>
                  </div>
                </div>

              </div>

              {/* Right Column (Usage, Plan, Tips) */}
              <div className="space-y-6">
                
                {/* Usage Overview */}
                <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-bold text-lg text-[#111827]">Usage Overview</h2>
                    <select 
                      value={timeframe}
                      onChange={(e) => setTimeframe(e.target.value)}
                      className="text-xs font-medium text-[#4B5563] border border-[#E5E7EB] px-2.5 py-1 rounded-md bg-white hover:bg-[#F9FAFB] outline-none cursor-pointer"
                    >
                      <option value="today">Today</option>
                      <option value="yesterday">Yesterday</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                    </select>
                  </div>
                  
                  {isLoadingUsage ? (
                    <div className="flex justify-center items-center py-10">
                      <div className="w-6 h-6 border-2 border-[#6D5EF8] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-6">
                      <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                        <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#EEF2FF"
                            strokeWidth="3.5"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#6D5EF8"
                            strokeWidth="3.5"
                            strokeDasharray={`${usageData ? Math.min((usageData.creditsUsedThisPeriod / usageData.maxCredits) * 100, 100) : 0}, 100`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute flex flex-col items-center justify-center text-center">
                          <span className="text-2xl font-black text-[#111827]">
                            {usageData ? Math.round((usageData.creditsUsedThisPeriod / usageData.maxCredits) * 100) : 0}%
                          </span>
                          <span className="text-[8px] text-[#6B7280] uppercase tracking-wide">used</span>
                        </div>
                      </div>

                      <div className="flex-1 space-y-4">
                        <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-2">
                          <span className="text-xs text-[#6B7280]">Used</span>
                          <span className="text-sm font-bold text-[#111827]">{usageData?.creditsUsedThisPeriod?.toLocaleString() || 0}</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-2">
                          <span className="text-xs text-[#6B7280]">Total</span>
                          <span className="text-sm font-bold text-[#111827]">{usageData?.maxCredits?.toLocaleString() || 0}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-[#6B7280]">Remaining</span>
                          <span className="text-xs font-semibold text-[#10B981]">{usageData ? Math.max(0, usageData.maxCredits - usageData.creditsUsedThisPeriod).toLocaleString() : 0}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Current Plan */}
                <div className={`bg-white border rounded-3xl p-6 shadow-sm ${isPro ? 'border-[#F59E0B]/30' : 'border-[#E5E7EB]'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-lg text-[#111827]">Current Plan</h2>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${
                      isPro ? 'text-[#D97706] bg-[#FFFBEB]' : 'text-[#6D5EF8] bg-[#EEF2FF]'
                    }`}>
                      {plan} Plan
                    </span>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    {[
                      isPro ? '10,000 credits / month' : 'Free credits / month',
                      isPro ? 'HD & Original image quality' : 'Standard processing',
                      isPro ? 'Priority support' : 'Community support',
                      'Access to all tools'
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className={`w-4 h-4 ${isPro ? 'text-[#F59E0B]' : 'text-[#10B981]'}`} />
                        <span className="text-sm text-[#4B5563]">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link href={isPro ? "/dashboard/billing" : "/dashboard/billing/plans"} className={`w-full font-semibold py-3 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 ${
                    isPro 
                      ? 'bg-[#111827] hover:bg-black text-white shadow-gray-900/20' 
                      : 'bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white shadow-[#6D5EF8]/20'
                  }`}>
                    {isPro ? (
                      <>Manage Plan</>
                    ) : (
                      <><TrendingUp className="w-4 h-4" /> Upgrade to Pro</>
                    )}
                  </Link>
                </div>

                {/* Tips & Shortcuts */}
                <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-sm">
                  <h2 className="font-bold text-lg text-[#111827] mb-4">Tips & Shortcuts</h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-[#4B5563]">
                      <div className="w-6 h-6 bg-[#F3F4F6] rounded flex items-center justify-center font-mono text-xs text-[#6B7280]">/</div>
                      <span>Press / to search any tool</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[#4B5563]">
                      <Star className="w-4 h-4 text-[#6D5EF8]" />
                      <span>Add tools to favorites</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[#4B5563]">
                      <Clock className="w-4 h-4 text-[#6D5EF8]" />
                      <span>Check your history</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[#4B5563]">
                      <CrownIcon className="w-4 h-4 text-[#F59E0B]" />
                      <span>Upgrade for more credits</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

    </DashboardLayout>
  );
}

// Reusing Crown Icon
function CrownIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
    </svg>
  );
}
