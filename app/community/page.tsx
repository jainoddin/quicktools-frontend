'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  MessageSquare, ThumbsUp, Eye, Clock, Plus, Filter, Loader2, User, Users,
  Home, TrendingUp, Clock as ClockIcon, HelpCircle, UserPlus, Bookmark, ChevronRight,
  Settings, ChevronUp, ChevronDown, Check, Zap, Flame, Award
} from 'lucide-react';
import { getEndpoint } from '../../lib/api';
import { useAuth } from '../../contexts/AuthContext';
import AskQuestionModal from '../../components/community/AskQuestionModal';
import CommunityQuestionCard from '../../components/community/CommunityQuestionCard';

export default function CommunityFeedPage() {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [unansweredBadge, setUnansweredBadge] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [metaCategories, setMetaCategories] = useState<{name: string, count: number}[]>([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  
  // Pagination State
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    fetch(getEndpoint('/api/community/meta'))
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.categories) {
          setMetaCategories(data.data.categories);
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (user) {
      const checkUnanswered = async () => {
        try {
          const res = await fetch(getEndpoint('/api/community/questions?tab=unanswered'), {
            credentials: 'include'
          });
          if (res.ok) {
            const data = await res.json();
            if (data.success && data.data) {
              const lastSeen = localStorage.getItem('lastSeenUnanswered');
              const lastSeenDate = lastSeen ? new Date(lastSeen) : new Date(0);
              const newQuestions = data.data.filter((q: any) => new Date(q.createdAt) > lastSeenDate);
              setUnansweredBadge(newQuestions.length);
            }
          }
        } catch (e) { }
      };
      checkUnanswered();
    }
  }, [user]);

  const handleUnansweredClick = () => {
    setActiveTab('unanswered');
    setSelectedCategory(null);
    setPage(1);
    setUnansweredBadge(0);
    localStorage.setItem('lastSeenUnanswered', new Date().toISOString());
  };

  const fetchQuestions = async (pageNum = 1, append = false, silent = false) => {
    if (!silent) {
      if (append) setLoadingMore(true);
      else setLoading(true);
    }
    try {
      const tabParam = activeTab === 'all' ? '' : activeTab;
      let url = `/api/community/questions?tab=${tabParam}&limit=15&page=${pageNum}`;
      if (selectedCategory) {
        url += `&category=${encodeURIComponent(selectedCategory)}`;
      }
      let guestId = localStorage.getItem('qt_guest_id');
      if (!guestId) {
        guestId = Math.random().toString(36).substring(2) + Date.now().toString(36);
        localStorage.setItem('qt_guest_id', guestId);
      }
      const res = await fetch(getEndpoint(url), {
        credentials: 'include',
        headers: {
          'x-guest-id': guestId
        }
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      if (data.success) {
        const newQuestions = data.data || [];
        if (append) {
          setQuestions(prev => [...prev, ...newQuestions]);
        } else {
          setQuestions(newQuestions);
        }
        
        // Check if there's more data
        if (data.pagination) {
          setHasMore(pageNum < data.pagination.pages);
        } else {
          setHasMore(newQuestions.length === 15);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      if (!silent) {
        setLoading(false);
        setLoadingMore(false);
      }
    }
  };

  useEffect(() => {
    setPage(1);
    fetchQuestions(1, false);
  }, [activeTab, selectedCategory]);
  
  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchQuestions(nextPage, true);
    }
  };

  const handleLike = async (questionId: string) => {
    if (!user) {
      setShowLoginPopup(true);
      return;
    }
    try {
      const q = questions.find((x: any) => x._id === questionId || x.id === questionId);
      if (!q) return;
      await fetch(getEndpoint(`/api/community/questions/${q.slug}/like`), {
        method: 'POST',
        credentials: 'include'
      });
      // Don't refresh whole list, just optimistically update or silently fetch page 1
      fetchQuestions(1, false, true);
    } catch (e) {}
  };

  const handleBookmark = async (e: React.MouseEvent, q: any) => {
    e.preventDefault();
    if (!user) {
      setShowLoginPopup(true);
      return;
    }
    try {
      const res = await fetch(getEndpoint(`/api/community/questions/${q.slug}/save`), {
        method: 'POST',
        credentials: 'include'
      });
      if (res.ok) {
        fetchQuestions(1, false, true); // silent refresh
      }
    } catch (e) {}
  };

  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[#6B7280] mb-6 animate-in fade-in slide-in-from-left-4 duration-500">
        <Link href="/" className="hover:text-[#111827] transition-colors flex items-center gap-1.5"><Home className="w-4 h-4" /> Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[#4F46E5] font-semibold">Community</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Sidebar */}
        <aside className="hidden lg:block w-[260px] shrink-0 space-y-8 sticky top-24 h-fit pb-4">
          
          <nav className="space-y-1">
            <button onClick={() => { setActiveTab('all'); setSelectedCategory(null); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold transition-colors ${!selectedCategory && activeTab === 'all' ? 'bg-[#EEF2FF] text-[#4F46E5]' : 'text-gray-600 hover:bg-gray-50'}`}>
              <Home className="w-5 h-5" /> All
            </button>
            <button onClick={() => { setActiveTab('trending'); setSelectedCategory(null); }} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-colors ${activeTab === 'trending' && !selectedCategory ? 'bg-[#EEF2FF] text-[#4F46E5]' : 'text-gray-600 hover:bg-gray-50'}`}>
              <div className="flex items-center gap-3"><TrendingUp className="w-5 h-5" /> Trending</div>
            </button>
            <button onClick={() => { setActiveTab('recent'); setSelectedCategory(null); }} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-colors ${activeTab === 'recent' && !selectedCategory ? 'bg-[#EEF2FF] text-[#4F46E5]' : 'text-gray-600 hover:bg-gray-50'}`}>
              <div className="flex items-center gap-3"><ClockIcon className="w-5 h-5" /> Latest <span className="text-[10px] text-gray-400 font-normal ml-1">3 days</span></div>
            </button>
            
            {user && (
              <>
                <button onClick={handleUnansweredClick} className="w-full flex items-center justify-between px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors">
                  <div className="flex items-center gap-3"><HelpCircle className="w-5 h-5" /> Unanswered</div>
                  {unansweredBadge > 0 && (
                    <span className="bg-[#EEF2FF] text-[#4F46E5] text-[10px] font-bold px-2 py-0.5 rounded-full">{unansweredBadge}</span>
                  )}
                </button>
                <button onClick={() => setActiveTab('saved')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors ${activeTab === 'saved' ? 'bg-[#EEF2FF] text-[#4F46E5]' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <Bookmark className="w-5 h-5" /> Saved
                </button>
                
                <div className="pt-4 mt-4 border-t border-gray-100 space-y-1">
                  <button onClick={() => { setActiveTab('mine'); setSelectedCategory(null); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors ${activeTab === 'mine' ? 'bg-[#EEF2FF] text-[#4F46E5]' : 'text-gray-600 hover:bg-gray-50'}`}>
                    <MessageSquare className="w-5 h-5" /> My Questions
                  </button>
                  <button onClick={() => { setActiveTab('my_answers'); setSelectedCategory(null); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors ${activeTab === 'my_answers' ? 'bg-[#EEF2FF] text-[#4F46E5]' : 'text-gray-600 hover:bg-gray-50'}`}>
                    <MessageSquare className="w-5 h-5" /> My Answers
                  </button>
                </div>
              </>
            )}
          </nav>

          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3 px-3">Categories</h3>
            <ul className="space-y-1">
              {(metaCategories.length > 0 ? metaCategories : [
                { name: 'AI Tools', count: 0 },
                { name: 'Prompt Engineering', count: 0 },
                { name: 'Coding', count: 0 },
                { name: 'Marketing', count: 0 },
                { name: 'Business', count: 0 },
                { name: 'Productivity', count: 0 },
              ]).map(cat => {
                const ICONS: any = { 
                  'AI Tools': '🚀', 
                  'Prompt Engineering': '💡', 
                  'Writing': '✍️',
                  'Coding': '💻', 
                  'Marketing': '📈', 
                  'Business': '💼',
                  'Business & Startup': '💼',
                  'Development': '💻',
                  'Design': '🎨',
                  'Productivity': '⚡', 
                  'No Code': '🛠️',
                  'QuickTools Help': '🛠️'
                };
                return (
                <li key={cat.name}>
                  <button onClick={() => setSelectedCategory(cat.name)} className={`w-full flex items-center justify-between px-3 py-2 hover:bg-gray-50 rounded-xl font-medium text-sm transition-colors ${selectedCategory === cat.name ? 'bg-gray-100 text-gray-900' : 'text-gray-600'}`}>
                    <span className="flex items-center gap-2"><span className="text-base">{ICONS[cat.name] || '📁'}</span> {cat.name}</span>
                    <span className="text-xs text-gray-400">{cat.count}</span>
                  </button>
                </li>
              )})}
            </ul>
          </div>

          {!user && (
            <div className="bg-[#EEF2FF] rounded-2xl p-5 border border-[#4F46E5]/10">
              <div className="w-10 h-10 bg-[#4F46E5] text-white rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-gray-900 mb-1">Join the community</h4>
              <p className="text-sm text-gray-600 mb-4">Ask questions, share knowledge and grow together.</p>
              <Link href="/login" className="block text-center w-full bg-[#4F46E5] text-white py-2.5 rounded-xl font-bold hover:bg-[#4338CA] transition-colors text-sm">
                Sign in / Sign up
              </Link>
            </div>
          )}
        </aside>

        <div className="flex-1 min-w-0 pb-20">
          <div className="flex flex-wrap-reverse items-start justify-between gap-4 mb-6">
            
            {/* Desktop Header */}
            <div className="hidden lg:block pt-1">
              <h1 className="text-2xl font-bold text-gray-900">
                {selectedCategory ? `${selectedCategory}` : 
                 activeTab === 'recent' ? 'Latest Discussions' : 
                 activeTab === 'trending' ? 'Trending Questions' : 
                 activeTab === 'unanswered' ? 'Unanswered Questions' : 
                 activeTab === 'saved' ? 'Saved Questions' :
                 activeTab === 'mine' ? 'My Questions' :
                 activeTab === 'my_answers' ? 'My Answers' : 'Community Feed'}
              </h1>
              <p className="text-sm text-gray-500 mt-1.5">
                {selectedCategory ? `Explore discussions and tools related to ${selectedCategory}.` : 'Join the conversation, ask questions, and share knowledge.'}
              </p>
            </div>

            <div className="flex lg:hidden flex-wrap items-center gap-2 flex-[1_1_550px] min-w-[280px]">
              {[
                { id: 'all', label: 'All' },
                { id: 'recent', label: '🕐 Latest' },
                { id: 'trending', label: '🔥 Trending' },
                { id: 'unanswered', label: 'Unanswered' },
                { id: 'liked', label: 'Most Liked' },
                { id: 'saved', label: '🔖 Saved' },
              ].filter(tab => !['unanswered','liked','saved'].includes(tab.id) || user).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setSelectedCategory(null); tab.id === 'unanswered' ? handleUnansweredClick() : setActiveTab(tab.id); }}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 border ${
                    activeTab === tab.id && !selectedCategory
                      ? 'bg-[#EEF2FF] text-[#4F46E5] border-[#4F46E5]/20 shadow-sm' 
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm'
                  }`}
                >
                  {tab.label}
                  {tab.id === 'unanswered' && unansweredBadge > 0 && (
                    <span className="bg-[#EEF2FF] text-[#4F46E5] text-[10px] px-1.5 py-0.5 rounded-full ml-1">{unansweredBadge}</span>
                  )}
                </button>
              ))}
            </div>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#4F46E5] text-white px-5 py-3 rounded-xl font-bold shadow-md shadow-[#4F46E5]/20 hover:bg-[#4338CA] transition-colors flex items-center justify-center gap-2 shrink-0 w-full sm:w-auto"
            >
              <Plus className="w-5 h-5" /> Ask Question
            </button>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm animate-pulse flex flex-col group">
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-3 mb-4">
                        <div className="flex-1 space-y-2.5">
                          <div className="h-5 bg-gray-200 rounded-md w-3/4"></div>
                          <div className="h-5 bg-gray-200 rounded-md w-1/2"></div>
                        </div>
                        <div className="w-6 h-6 bg-gray-200 rounded-md shrink-0"></div>
                      </div>
                      
                      <div className="space-y-2 mb-6">
                        <div className="h-3.5 bg-gray-100 rounded w-full"></div>
                        <div className="h-3.5 bg-gray-100 rounded w-5/6"></div>
                      </div>

                      <div className="flex gap-2 mb-5">
                        <div className="h-6 w-20 bg-[#EEF2FF] rounded-md"></div>
                        <div className="h-6 w-16 bg-teal-50 rounded-md"></div>
                      </div>

                      <div className="flex justify-between items-center border-t border-gray-50 pt-4 mt-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gray-200"></div>
                          <div className="h-3 w-24 bg-gray-200 rounded"></div>
                        </div>
                        <div className="flex gap-3">
                          <div className="h-4 w-16 bg-gray-100 rounded"></div>
                          <div className="h-4 w-16 bg-gray-100 rounded"></div>
                          <div className="h-4 w-16 bg-gray-100 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : questions.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900">No questions found</h3>
                <p className="text-gray-500 mt-1">Be the first to ask in this category.</p>
              </div>
            ) : (
              questions.map((q) => (
                <CommunityQuestionCard 
                  key={q.id || q._id} 
                  question={q} 
                  user={user} 
                  onUpdate={() => fetchQuestions(1, false, true)} 
                  setShowLoginPopup={setShowLoginPopup} 
                />
              ))
            )}
            
            {hasMore && (
              <button 
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="w-full py-4 bg-white border border-gray-200 rounded-2xl text-sm font-bold text-[#4F46E5] hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingMore ? 'Loading...' : 'Load more questions'} 
                {!loadingMore && <ChevronDown className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="hidden xl:block w-[320px] shrink-0 space-y-6 sticky top-24 h-fit pb-4">
          
          {/* Guidelines */}
          <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-[#4F46E5]">📋</span> Community Guidelines
            </h3>
            <ul className="space-y-3">
              <li className="flex gap-2 text-sm text-gray-600">
                <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Be respectful and helpful to others
              </li>
              <li className="flex gap-2 text-sm text-gray-600">
                <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Search before asking to avoid duplicates
              </li>
              <li className="flex gap-2 text-sm text-gray-600">
                <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> No spam or self-promotion
              </li>
              <li className="flex gap-2 text-sm text-gray-600">
                <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Do not post offensive content
              </li>
              <li className="flex gap-2 text-sm text-gray-600">
                <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Use clear titles and descriptions
              </li>
              <li className="flex gap-2 text-sm text-gray-600">
                <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Share knowledge generously
              </li>
            </ul>
          </div>

        </aside>

      </div>

      {/* Bottom Features Bar */}
      <div className="hidden md:grid grid-cols-4 gap-4 mt-8 bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center shrink-0">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm">Ask</h4>
            <p className="text-xs text-gray-500">Get your questions answered</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-green-50 text-green-500 rounded-full flex items-center justify-center shrink-0">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm">Answer</h4>
            <p className="text-xs text-gray-500">Share your knowledge</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center shrink-0">
            <Bookmark className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm">Learn</h4>
            <p className="text-xs text-gray-500">Grow together</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm">Earn</h4>
            <p className="text-xs text-gray-500">Get points and badges</p>
          </div>
        </div>
      </div>

      <AskQuestionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isGuest={!user}
        onSuccess={(slug) => {
          setIsModalOpen(false);
          fetchQuestions();
        }}
      />

      {/* Login Popup */}
      {showLoginPopup && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setShowLoginPopup(false)}>
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-sm w-full shadow-2xl text-center" onClick={e => e.stopPropagation()}>
            <div className="w-14 h-14 bg-[#EEF2FF] rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-7 h-7 text-[#4F46E5]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Login Required</h3>
            <p className="text-gray-500 text-sm mb-6">Sign in to like questions and join the conversation. Earn XP and badges!</p>
            <div className="flex flex-col gap-3">
              <Link href="/login" className="w-full py-2.5 bg-[#4F46E5] text-white rounded-xl font-semibold shadow-md hover:bg-[#4338CA] transition-colors block">
                Log In
              </Link>
              <button onClick={() => setShowLoginPopup(false)} className="w-full py-2.5 text-gray-600 font-semibold hover:bg-gray-100 rounded-xl transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>

      )}

      {/* JSON-LD Schema for Community Feed Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://quicktool.space"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Community",
                "item": "https://quicktool.space/community"
              }
            ]
          }),
        }}
      />
    </div>
  );
}
