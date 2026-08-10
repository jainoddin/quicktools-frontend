'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Home, MessageSquare, ThumbsUp, Eye, Clock, User, CheckCircle2, Loader2, Share2, AlertCircle, Bookmark, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { getEndpoint } from '../../../../lib/api';
import { useAuth } from '../../../../contexts/AuthContext';
import ReactMarkdown from 'react-markdown';
import CommunitySidebarLeft from '../../../../components/community/CommunitySidebarLeft';
import CommunitySidebarRight from '../../../../components/community/CommunitySidebarRight';

export default function QuestionClient({ slug }: { slug: string }) {
  const { user } = useAuth();
  const [question, setQuestion] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [answerBody, setAnswerBody] = useState('');
  const [guestName, setGuestName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [savedQuestions, setSavedQuestions] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('qt_saved_questions');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    }
    return new Set();
  });

  const [editingAnswerId, setEditingAnswerId] = useState<string | null>(null);
  const [editingAnswerBody, setEditingAnswerBody] = useState('');
  const [isEditingSubmit, setIsEditingSubmit] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyBody, setReplyBody] = useState('');
  const [isReplySubmitting, setIsReplySubmitting] = useState(false);

  const handleDeleteAnswer = async (answerId: string) => {
    if (!window.confirm("Are you sure you want to delete this answer?")) return;
    try {
      const res = await fetch(getEndpoint(`/api/community/questions/${slug}/answers/${answerId}`), {
        method: 'DELETE',
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success) {
        fetchQuestion();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchQuestion = async () => {
    try {
      let guestId = localStorage.getItem('qt_guest_id');
      if (!guestId) {
        guestId = Math.random().toString(36).substring(2) + Date.now().toString(36);
        localStorage.setItem('qt_guest_id', guestId);
      }
      const res = await fetch(getEndpoint(`/api/community/questions/${slug}`), {
        credentials: 'include',
        headers: {
          'x-guest-id': guestId
        }
      });
      const data = await res.json();
      if (data.success) {
        setQuestion(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [slug]);

  const handleLike = async (idOrSlug: string, type: 'question' | 'answer' | 'reply', parentAnswerId?: string) => {
    if (!user) {
      setShowLoginPopup(true);
      return;
    }
    try {
      let endpoint = '';
      if (type === 'question') endpoint = `/api/community/questions/${idOrSlug}/like`;
      else if (type === 'answer') endpoint = `/api/community/questions/${slug}/answers/${idOrSlug}/like`;
      else if (type === 'reply') endpoint = `/api/community/questions/${slug}/answers/${parentAnswerId}/replies/${idOrSlug}/like`;

      await fetch(getEndpoint(endpoint), {
        method: 'POST',
        credentials: 'include'
      });
      fetchQuestion();
    } catch (e) {}
  };

  const handleSubmitAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      if (!window.confirm("You are not logged in. Once the answer is submitted, it cannot be edited. Do you want to proceed?")) {
        return;
      }
    }
    setError('');
    if (answerBody.length < 10) {
      setError('Answer must be at least 10 characters.');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const payload = {
        body: answerBody,
        guestName: !user ? (guestName || 'QuickTools Guest') : undefined
      };

      const res = await fetch(getEndpoint(`/api/community/questions/${slug}/answers`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setAnswerBody('');
        setShowAnswerForm(false);
        fetchQuestion();
      } else {
        setError(data.message || 'Failed to submit answer.');
      }
    } catch (err) {
      setError('An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReplySubmit = async (e: React.FormEvent, answerId: string) => {
    e.preventDefault();
    if (!user) {
      if (!window.confirm("You are not logged in. Once the reply is submitted, it cannot be edited. Do you want to proceed?")) {
        return;
      }
    }
    if (replyBody.length < 2) return;
    setIsReplySubmitting(true);
    try {
      const payload = {
        body: replyBody,
        guestName: !user ? (guestName || 'QuickTools Guest') : undefined
      };
      const res = await fetch(getEndpoint(`/api/community/questions/${slug}/answers/${answerId}/replies`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setReplyingToId(null);
        setReplyBody('');
        fetchQuestion();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsReplySubmitting(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent, answerId: string) => {
    e.preventDefault();
    if (editingAnswerBody.length < 10) return;
    setIsEditingSubmit(true);
    try {
      const res = await fetch(getEndpoint(`/api/community/questions/${slug}/answers/${answerId}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ body: editingAnswerBody })
      });
      const data = await res.json();
      if (data.success) {
        setEditingAnswerId(null);
        fetchQuestion();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsEditingSubmit(false);
    }
  };

  const handleBookmark = async () => {
    if (!user) {
      setShowLoginPopup(true);
      return;
    }
    if (!question) return;
    try {
      const res = await fetch(getEndpoint(`/api/community/questions/${slug}/save`), {
        method: 'POST',
        credentials: 'include'
      });
      if (res.ok) {
        fetchQuestion();
      }
    } catch (e) {}
  };

  if (loading) {
    return (
      <div className="max-w-[1400px] mx-auto pt-8">
        <div className="flex flex-col xl:flex-row gap-8 relative items-start">
          <div className="hidden xl:block">
            <CommunitySidebarLeft user={user} />
          </div>
          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6 animate-pulse">
              <div className="h-6 w-24 bg-teal-50 rounded-md mb-5"></div>
              <div className="h-9 bg-gray-200 rounded-md w-3/4 mb-6"></div>
              <div className="flex gap-4 mb-8 border-b border-gray-100 pb-6">
                <div className="w-12 h-12 rounded-full bg-gray-200 shrink-0"></div>
                <div className="space-y-2.5 flex-1 pt-1">
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                  <div className="h-3 bg-gray-100 rounded w-24"></div>
                </div>
              </div>
              <div className="space-y-4 mb-8">
                <div className="h-4 bg-gray-100 rounded w-full"></div>
                <div className="h-4 bg-gray-100 rounded w-full"></div>
                <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                <div className="h-4 bg-gray-100 rounded w-4/6"></div>
              </div>
            </div>
          </main>
          <aside className="hidden xl:block w-[320px] shrink-0">
             <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm animate-pulse h-[400px]"></div>
          </aside>
        </div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Question not found</h2>
        <Link href="/community" className="text-[#4F46E5] hover:underline">Return to Community</Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[#6B7280] mb-6 animate-in fade-in slide-in-from-left-4 duration-500 flex-wrap">
        <Link href="/" className="hover:text-[#111827] transition-colors flex items-center gap-1.5"><Home className="w-4 h-4" /> Home</Link>
        <ChevronRight className="w-4 h-4 shrink-0" />
        <Link href="/community" className="hover:text-[#111827] transition-colors">Community</Link>
        <ChevronRight className="w-4 h-4 shrink-0" />
        <span className="text-[#4F46E5] font-semibold line-clamp-1">{question.title}</span>
      </nav>

      <div className="flex flex-col xl:flex-row gap-8 relative items-start">
        <div className="hidden xl:block">
          <CommunitySidebarLeft user={user} />
        </div>
        
        <div className="flex-1 min-w-0 pb-20 space-y-6">

      {/* Main Container - Question & Answers combined */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        
        {/* Question Header & Body */}
        <div className="p-5 sm:p-6">
          {/* Title row */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <h1 className="text-xl sm:text-2xl font-bold text-[#4F46E5] leading-snug flex-1 break-words min-w-0">{question.title}</h1>
            <button onClick={handleBookmark} className={`transition-colors shrink-0 pt-1 ${question.isSaved ? 'text-[#4F46E5]' : 'text-gray-400 hover:text-[#4F46E5]'}`}>
              <Bookmark className={`w-5 h-5 ${question.isSaved ? 'fill-[#4F46E5]' : ''}`} />
            </button>
          </div>

          {/* Body/excerpt */}
          <p className="text-gray-600 text-sm mb-4 leading-relaxed break-words overflow-hidden">
            {question.body}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-[11px] font-bold text-[#4F46E5] bg-[#EEF2FF] px-2.5 py-1 rounded-md">
              {question.category}
            </span>
            {question.tags?.map((tag: string) => (
              <span key={tag} className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md">
                {tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-t border-gray-50 pt-3">
            {/* Author */}
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-100 shrink-0">
                {question.author?.avatar ? (
                  <img src={question.author.avatar} alt={question.author.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-gray-500 bg-gray-200">
                    {question.author?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
              </div>
              <span className="text-xs font-semibold text-gray-900 truncate">{question.author?.name}</span>
              {question.author?.isAiAssisted && (
                <span className="text-[9px] font-semibold text-[#4F46E5] bg-[#EEF2FF] border border-[#C7D2FE] px-1.5 py-0.5 rounded-full shrink-0">AI-assisted</span>
              )}
              <span className="text-xs text-gray-400 shrink-0">•</span>
              <span className="text-xs text-gray-400 shrink-0">{new Date(question.createdAt).toLocaleDateString()}</span>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
              <button 
                onClick={() => setShowAnswerForm(!showAnswerForm)} 
                className="flex items-center gap-1.5 font-medium hover:text-[#4F46E5] transition-colors"
              >
                <MessageSquare className="w-4 h-4" /> {question.answers?.length || 0} answers
              </button>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-1.5 font-medium">
                <Eye className="w-4 h-4" /> {question.views} views
              </div>
              <span className="text-gray-300">•</span>
              <button
                onClick={() => handleLike(question.slug, 'question')}
                className={`flex items-center gap-1.5 font-medium px-2 py-0.5 rounded-md transition-all ${
                  question.isLiked ? 'text-[#4F46E5] bg-[#EEF2FF]' : 'text-gray-900 bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <ThumbsUp className={`w-3 h-3 ${question.isLiked ? 'text-[#4F46E5] fill-[#4F46E5]' : 'text-[#4F46E5]'}`} /> {question.likes} likes
              </button>
            </div>
          </div>
        </div>

        {/* Post Answer Form */}
        {showAnswerForm && (
          <div className="bg-gray-50 border-t border-gray-100 p-5 sm:p-6 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-bold text-gray-900">Your Answer</h4>
              <button onClick={() => setShowAnswerForm(false)} className="text-sm font-semibold text-gray-500 hover:text-gray-700">Cancel</button>
            </div>
            <form onSubmit={handleSubmitAnswer}>
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center gap-2 text-sm">
                  <AlertCircle className="w-4 h-4" /> {error}
                </div>
              )}
              
              <div className="mb-4">
                <textarea 
                  required
                  value={answerBody}
                  onChange={e => setAnswerBody(e.target.value)}
                  placeholder="Write your answer here... Markdown is supported."
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5] outline-none min-h-[120px]"
                  autoFocus
                />
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 text-sm font-semibold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Posting...</> : 'Post Answer'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Answers List */}
        {question.answers && question.answers.length > 0 && (
          <div className="flex flex-col">
            {question.answers.map((ans: any, idx: number) => (
              <div key={ans._id} className={`p-5 sm:p-6 border-t border-gray-100 ${ans.isAccepted ? 'bg-green-50/20' : ''}`}>
                
                {/* Header: Avatar, Name, Time, Three dots */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                      {ans.author?.avatar ? (
                        <img src={ans.author.avatar} alt={ans.author.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-sm font-bold text-gray-500 bg-gray-200">
                          {ans.author?.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-gray-900">{ans.author?.name}</span>
                        {ans.author?.isAiAssisted && <span className="text-[10px] font-medium text-[#4F46E5] bg-[#EEF2FF] px-1.5 py-0.5 rounded">AI-assisted</span>}
                      </div>
                      <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                         {ans.isAccepted && <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />}
                         {new Date(ans.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {ans.isOwner && !editingAnswerId && (
                    <div className="relative" onMouseLeave={() => setOpenDropdownId(null)}>
                      <button 
                        onClick={() => setOpenDropdownId(openDropdownId === ans._id ? null : ans._id)}
                        className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                      {openDropdownId === ans._id && (
                        <div className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-10 flex flex-col">
                          <button 
                            onClick={() => {
                              setOpenDropdownId(null);
                              setEditingAnswerId(ans._id);
                              setEditingAnswerBody(ans.body);
                            }}
                            className="w-full px-4 py-2 text-left text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                          >
                            <Edit className="w-4 h-4" /> Edit
                          </button>
                          <button 
                            onClick={() => {
                              setOpenDropdownId(null);
                              handleDeleteAnswer(ans._id);
                            }}
                            className="w-full px-4 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2"
                          >
                            <Trash2 className="w-4 h-4" /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="pl-[52px]">
                  {editingAnswerId === ans._id ? (
                    <form onSubmit={(e) => handleEditSubmit(e, ans._id)} className="mb-4">
                      <textarea 
                        value={editingAnswerBody}
                        onChange={e => setEditingAnswerBody(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-[#4F46E5] rounded-xl focus:ring-2 focus:ring-[#4F46E5]/50 outline-none min-h-[120px] mb-3 text-sm"
                      />
                      <div className="flex items-center gap-2">
                        <button type="submit" disabled={isEditingSubmit} className="px-4 py-2 bg-[#4F46E5] text-white rounded-lg text-sm font-semibold flex items-center gap-1 disabled:opacity-70">
                          {isEditingSubmit ? <Loader2 className="w-4 h-4 animate-spin" /> : null} Save
                        </button>
                        <button type="button" onClick={() => setEditingAnswerId(null)} className="px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg text-sm font-semibold transition-colors">
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="prose prose-sm md:prose-base prose-indigo max-w-none text-gray-800 mb-3">
                      <ReactMarkdown>{ans.body}</ReactMarkdown>
                    </div>
                  )}

                  {/* Footer Actions */}
                  <div className="flex items-center gap-4 mt-1">
                    <button 
                      onClick={() => handleLike(ans._id, 'answer')}
                      className={`flex items-center gap-1.5 text-sm font-semibold px-2 py-1 rounded-md transition-colors ${ans.isLiked ? 'text-[#4F46E5] bg-[#EEF2FF]' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}
                    >
                      <ThumbsUp className={`w-4 h-4 ${ans.isLiked ? 'fill-[#4F46E5]' : ''}`} /> 
                      {ans.likes} {ans.likes === 1 ? 'like' : 'likes'}
                    </button>
                    <button 
                      onClick={() => setReplyingToId(replyingToId === ans._id ? null : ans._id)}
                      className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:bg-gray-100 hover:text-gray-900 px-2 py-1 rounded-md transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" /> Comment
                    </button>
                  </div>

                  {/* Replies Section */}
                  {ans.replies && ans.replies.length > 0 && (
                    <div className="mt-4 space-y-4 border-l-2 border-gray-100 pl-4">
                      {ans.replies.map((reply: any) => (
                        <div key={reply._id} className="flex gap-3">
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 border border-gray-200 shrink-0 mt-1">
                            {reply.author?.avatar ? (
                              <img src={reply.author.avatar} alt={reply.author.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-500 bg-gray-200">
                                {reply.author?.name?.charAt(0).toUpperCase() || 'U'}
                              </div>
                            )}
                          </div>
                          <div className="flex-1 bg-gray-50 rounded-2xl p-4 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-sm text-gray-900">{reply.author?.name}</span>
                              <span className="text-xs text-gray-400">• {new Date(reply.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="prose prose-sm max-w-none text-gray-800">
                              <ReactMarkdown>{reply.body}</ReactMarkdown>
                            </div>
                            
                            {/* Reply Actions */}
                            <div className="flex items-center gap-3 mt-2">
                              <button 
                                onClick={() => handleLike(reply._id, 'reply', ans._id)}
                                className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded transition-colors ${reply.isLiked ? 'text-[#4F46E5] bg-[#EEF2FF]' : 'text-gray-500 hover:bg-gray-200 hover:text-gray-900'}`}
                              >
                                <ThumbsUp className={`w-3.5 h-3.5 ${reply.isLiked ? 'fill-[#4F46E5]' : ''}`} /> 
                                {reply.likes} {reply.likes === 1 ? 'like' : 'likes'}
                              </button>
                              <button 
                                onClick={() => {
                                  setReplyingToId(ans._id);
                                  setReplyBody(`@${reply.author?.name} `);
                                }}
                                className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:bg-gray-200 hover:text-gray-900 px-2 py-1 rounded transition-colors"
                              >
                                <MessageSquare className="w-3.5 h-3.5" /> Reply
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reply Form */}
                  {replyingToId === ans._id && (
                    <div className="mt-4 pl-4 border-l-2 border-[#4F46E5]/30">
                      <form onSubmit={(e) => handleReplySubmit(e, ans._id)} className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <textarea 
                          value={replyBody}
                          onChange={e => setReplyBody(e.target.value)}
                          placeholder="Write a reply..."
                          className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5] outline-none min-h-[80px] text-sm mb-3"
                          autoFocus
                        />
                        <div className="flex items-center gap-2">
                          <button 
                            type="submit" 
                            disabled={isReplySubmitting} 
                            className="px-4 py-2 bg-[#4F46E5] text-white rounded-lg text-sm font-semibold flex items-center gap-1 disabled:opacity-70"
                          >
                            {isReplySubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null} Post Reply
                          </button>
                          <button 
                            type="button" 
                            onClick={() => { setReplyingToId(null); setReplyBody(''); }} 
                            className="px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg text-sm font-semibold transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* Login Popup Modal */}
      {showLoginPopup && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200 text-center">
            <div className="w-16 h-16 bg-[#EEF2FF] rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-[#4F46E5]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Login Required</h3>
            <p className="text-gray-500 text-sm mb-6">
              You need to be logged in to like questions and answers. Join the community to earn XP!
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/login" className="w-full py-2.5 bg-[#4F46E5] text-white rounded-xl font-semibold shadow-md hover:bg-[#4338CA] transition-colors">
                Log In
              </Link>
              <button 
                onClick={() => setShowLoginPopup(false)}
                className="w-full py-2.5 text-gray-600 font-semibold hover:bg-gray-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
      
      <aside className="hidden xl:block w-[320px] shrink-0 space-y-6 sticky top-24 h-fit pb-4">
        <CommunitySidebarRight />
      </aside>

      </div>
    </div>
  );
}
