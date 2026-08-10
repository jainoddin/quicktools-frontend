'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bookmark, MessageSquare, Eye, ThumbsUp, Loader2, Send } from 'lucide-react';
import { getEndpoint } from '../../lib/api';

export default function CommunityQuestionCard({ question, user, onUpdate, setShowLoginPopup }: any) {
  const [showAnswers, setShowAnswers] = useState(false);
  const [answerBody, setAnswerBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyBody, setReplyBody] = useState('');
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  const handleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      setShowLoginPopup(true);
      return;
    }
    try {
      const res = await fetch(getEndpoint(`/api/community/questions/${question.slug}/save`), {
        method: 'POST',
        credentials: 'include'
      });
      if (res.ok) {
        onUpdate();
      }
    } catch (e) {}
  };

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      setShowLoginPopup(true);
      return;
    }
    try {
      const res = await fetch(getEndpoint(`/api/community/questions/${question.slug}/like`), {
        method: 'POST',
        credentials: 'include'
      });
      if (res.ok) {
        onUpdate();
      }
    } catch (e) {}
  };

  const handleAnswerLike = async (e: React.MouseEvent, answerId: string) => {
    e.preventDefault();
    if (!user) {
      setShowLoginPopup(true);
      return;
    }
    try {
      const res = await fetch(getEndpoint(`/api/community/questions/${question.slug}/answers/${answerId}/like`), {
        method: 'POST',
        credentials: 'include'
      });
      if (res.ok) {
        onUpdate();
      }
    } catch (e) {}
  };

  const submitAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setShowLoginPopup(true);
      return;
    }
    if (answerBody.trim().length < 10) return;
    
    setIsSubmitting(true);
    try {
      const res = await fetch(getEndpoint(`/api/community/questions/${question.slug}/answers`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ body: answerBody })
      });
      const data = await res.json();
      if (data.success) {
        setAnswerBody('');
        onUpdate();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitReply = async (e: React.FormEvent, answerId: string) => {
    e.preventDefault();
    if (!user) {
      setShowLoginPopup(true);
      return;
    }
    if (replyBody.trim().length < 2) return;
    
    setIsSubmittingReply(true);
    try {
      const res = await fetch(getEndpoint(`/api/community/questions/${question.slug}/answers/${answerId}/replies`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ body: replyBody })
      });
      const data = await res.json();
      if (data.success) {
        setReplyBody('');
        setReplyingTo(null);
        onUpdate();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingReply(false);
    }
  };

  let answersToDisplay: any[] = [];
  let viewMoreText: string | null = null;

  if (question.answers && question.answers.length > 0) {
    const ans1 = question.answers[0];
    const ans1RepliesCount = ans1.repliesCount || (ans1.replies ? ans1.replies.length : 0);
    
    if (ans1RepliesCount > 2) {
      answersToDisplay.push(ans1);
      viewMoreText = `View ${ans1RepliesCount - 2} more ${ans1RepliesCount - 2 === 1 ? 'comment' : 'comments'}`;
    } else {
      answersToDisplay.push(ans1);
      if (question.answers.length > 1) {
        const ans2 = question.answers[1];
        const ans2RepliesCount = ans2.repliesCount || (ans2.replies ? ans2.replies.length : 0);
        answersToDisplay.push(ans2);
        
        if (ans2RepliesCount > 2) {
          viewMoreText = `View ${ans2RepliesCount - 2} more ${ans2RepliesCount - 2 === 1 ? 'comment' : 'comments'}`;
        } else if (question.answersCount > 2) {
          viewMoreText = `View all ${question.answersCount} answers`;
        }
      } else if (question.answersCount > 1) {
        viewMoreText = `View all ${question.answersCount} answers`;
      }
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#4F46E5]/30 transition-all flex flex-col group block overflow-hidden">
      {/* Main Card Content (Clickable) */}
      <Link href={`/community/questions/${question.slug}`} className="block p-5">
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-3 mb-2">
            <div className="flex-1 min-w-0">
              {question.isTrending && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-orange-600 bg-orange-50 border border-orange-100 px-2 py-0.5 rounded-full mb-1.5">
                  🔥 Trending
                </span>
              )}
              <h3 className="text-[17px] sm:text-[19px] font-bold text-gray-900 group-hover:text-[#4F46E5] transition-colors leading-snug line-clamp-2 break-words">
                {question.title}
              </h3>
            </div>
            <button className={`transition-colors shrink-0 pt-1 z-10 relative ${question.isSaved ? 'text-[#4F46E5]' : 'text-gray-400 hover:text-[#4F46E5]'}`} onClick={handleBookmark}>
              <Bookmark className={`w-5 h-5 ${question.isSaved ? 'fill-[#4F46E5]' : ''}`} />
            </button>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2 break-words overflow-hidden">
            {question.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-[11px] font-bold text-[#4F46E5] bg-[#EEF2FF] px-2.5 py-1 rounded-md">
              {question.category}
            </span>
            {question.tags?.slice(0,2).map((tag: string) => (
              <span key={tag} className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-t border-gray-50 pt-3">
            {/* Author */}
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-100 shrink-0">
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
            <div className="flex items-center gap-2 text-sm text-gray-500 flex-wrap z-10 relative">
              <button 
                onClick={(e) => { e.preventDefault(); setShowAnswers(!showAnswers); }}
                className={`flex items-center gap-1.5 font-medium px-2 py-0.5 rounded-md transition-all ${showAnswers ? 'text-[#4F46E5] bg-[#EEF2FF]' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
              >
                <MessageSquare className="w-4 h-4" /> {question.answersCount} answers
              </button>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-1.5 font-medium">
                <Eye className="w-4 h-4" /> {question.views} views
              </div>
              <span className="text-gray-300">•</span>
              <button 
                onClick={handleLike}
                className={`flex items-center gap-1.5 font-medium px-2 py-0.5 rounded-md transition-all ${
                  question.isLiked ? 'text-[#4F46E5] bg-[#EEF2FF]' : 'text-gray-900 bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <ThumbsUp className={`w-3 h-3 ${question.isLiked ? 'fill-[#4F46E5] text-[#4F46E5]' : 'text-[#4F46E5]'}`} /> {question.likes} likes
              </button>
            </div>
          </div>
        </div>
      </Link>

      {/* Inline Answers Section */}
      {showAnswers && (
        <div className="border-t border-gray-100 bg-gray-50/50 p-5">
          {/* Add Answer Form */}
          <form onSubmit={submitAnswer} className="mb-6">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-500 bg-gray-200">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
              </div>
              <div className="flex-1 relative">
                <textarea
                  value={answerBody}
                  onChange={(e) => setAnswerBody(e.target.value)}
                  placeholder="Write your answer..."
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] resize-none min-h-[80px]"
                />
                <div className="absolute bottom-2 right-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || answerBody.trim().length < 10}
                    className="bg-[#4F46E5] text-white p-1.5 rounded-lg hover:bg-[#4338CA] transition-colors disabled:opacity-50 flex items-center justify-center"
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
            {answerBody.trim().length > 0 && answerBody.trim().length < 10 && (
              <p className="text-xs text-red-500 mt-1 ml-11">Answer must be at least 10 characters.</p>
            )}
          </form>

          {/* Existing Answers */}
          {answersToDisplay.length > 0 && (
            <div className="space-y-4">
              {answersToDisplay.map((answer: any) => (
                <div key={answer._id || answer.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-100 shrink-0">
                        {answer.author?.avatar ? (
                          <img src={answer.author.avatar} alt={answer.author.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-gray-500">
                            {answer.author?.name?.charAt(0).toUpperCase() || 'U'}
                          </div>
                        )}
                      </div>
                      <span className="text-sm font-bold text-gray-900">{answer.author?.name}</span>
                      {answer.author?.isGuest && <span className="text-[10px] font-medium text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">Guest</span>}
                      {answer.author?.isAiAssisted && <span className="text-[10px] font-medium text-[#4F46E5] bg-[#EEF2FF] px-1.5 py-0.5 rounded">AI-assisted</span>}
                      {answer.isAccepted && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                          Accepted
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed break-words mb-3">{answer.body}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <button onClick={(e) => handleAnswerLike(e, answer._id || answer.id)} className={`flex items-center gap-1.5 font-medium transition-colors ${answer.isLiked ? 'text-[#4F46E5]' : 'hover:text-gray-900'}`}>
                      <ThumbsUp className={`w-3.5 h-3.5 ${answer.isLiked ? 'fill-[#4F46E5]' : ''}`} /> {answer.likes || 0}
                    </button>
                    <button onClick={(e) => { e.preventDefault(); setReplyingTo(replyingTo === (answer._id || answer.id) ? null : (answer._id || answer.id)); }} className={`flex items-center gap-1.5 font-medium transition-colors ${replyingTo === (answer._id || answer.id) ? 'text-gray-900' : 'hover:text-gray-900'}`}>
                      <MessageSquare className="w-3.5 h-3.5" /> Reply
                    </button>
                    {answer.repliesCount > 0 && (
                      <span className="flex items-center gap-1.5 font-medium">
                        {answer.repliesCount} {answer.repliesCount === 1 ? 'comment' : 'comments'}
                      </span>
                    )}
                  </div>

                  {/* Reply Form */}
                  {replyingTo === (answer._id || answer.id) && (
                    <form onSubmit={(e) => submitReply(e, answer._id || answer.id)} className="mt-3">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={replyBody}
                          onChange={(e) => setReplyBody(e.target.value)}
                          placeholder="Write a comment..."
                          className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]"
                        />
                        <button
                          type="submit"
                          disabled={isSubmittingReply || replyBody.trim().length < 2}
                          className="bg-[#4F46E5] text-white px-3 py-2 rounded-lg hover:bg-[#4338CA] transition-colors disabled:opacity-50 flex items-center justify-center text-xs font-medium"
                        >
                          {isSubmittingReply ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Post'}
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Inline Replies */}
                  {answer.replies && answer.replies.length > 0 && (
                    <div className="mt-3 pl-4 border-l-2 border-gray-100 space-y-3">
                      {answer.replies.slice(0, 2).map((reply: any) => (
                        <div key={reply._id || reply.id} className="text-sm">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="font-bold text-gray-900 text-xs">{reply.author?.name}</span>
                            <span className="text-gray-400 text-[10px]">• {new Date(reply.createdAt || Date.now()).toLocaleDateString()}</span>
                          </div>
                          <p className="text-gray-600 leading-relaxed text-xs">{reply.body}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {viewMoreText && (
                <div className="pt-2 text-center">
                  <Link href={`/community/questions/${question.slug}`} className="inline-flex items-center justify-center px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-[#4F46E5] hover:bg-gray-50 transition-colors">
                    {viewMoreText}
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
