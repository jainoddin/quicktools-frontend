'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';

const QUESTIONS = [
  "Hi! I'm the QuickTools Bot. What's your name?",
  "Nice to meet you! How can we help you today?",
  "Are you currently using any AI tools?",
  "Please provide your email ID so our team can connect with you."
];

export default function LiveChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: 'bot' | 'user' }[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [inputText, setInputText] = useState('');
  const [isFinished, setIsFinished] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Start the conversation
      setMessages([{ text: QUESTIONS[0], sender: 'bot' }]);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isFinished) return;

    const userMessage = inputText.trim();
    setInputText('');
    
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);

    // Email validation for the final question
    if (currentQuestionIndex === QUESTIONS.length - 1) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userMessage)) {
        setTimeout(() => {
          setMessages(prev => [...prev, { text: "Oops! That looks like an invalid email address. Please provide a valid one.", sender: 'bot' }]);
        }, 800);
        return;
      }
    }

    // Bot response delay
    setTimeout(() => {
      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex < QUESTIONS.length) {
        setMessages(prev => [...prev, { text: QUESTIONS[nextIndex], sender: 'bot' }]);
        setCurrentQuestionIndex(nextIndex);
      } else {
        setMessages(prev => [...prev, { text: "Our team will connect with you. Thank you!", sender: 'bot' }]);
        setIsFinished(true);
        setTimeout(() => setIsOpen(false), 3000);
      }
    }, 800);
  };

  return (
    <>
      {/* Trigger Card */}
      <div 
        onClick={() => setIsOpen(true)}
        className="bg-white border border-[#E5E7EB] rounded-xl p-4 flex gap-4 hover:shadow-md transition-shadow cursor-pointer"
      >
        <div className="w-10 h-10 rounded-full bg-[#EEF2FF] flex items-center justify-center shrink-0">
          <MessageSquare className="w-5 h-5 text-[#6D5EF8]" />
        </div>
        <div>
          <p className="font-bold text-[#111827] text-sm">Chat Bot</p>
          <p className="text-xs text-[#6B7280] mb-1">Chat with our team</p>
          <p className="text-xs font-bold text-[#6D5EF8]">Available 24/7</p>
        </div>
      </div>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Chat Window */}
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px]">
            
            {/* Header */}
            <div className="bg-[#6D5EF8] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">QuickTools Bot</h3>
                  <div className="flex items-center gap-1.5 text-white/80 text-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Online
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8FAFC]">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-2 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-[#EEF2FF]' : 'bg-[#6D5EF8]'}`}>
                      {msg.sender === 'user' ? (
                        <User className="w-4 h-4 text-[#6D5EF8]" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm ${
                      msg.sender === 'user' 
                        ? 'bg-[#6D5EF8] text-white rounded-tr-none' 
                        : 'bg-white border border-[#E5E7EB] text-[#374151] rounded-tl-none shadow-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-[#E5E7EB]">
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  disabled={isFinished}
                  placeholder={isFinished ? "Chat finished" : "Type your answer..."}
                  className="w-full pl-4 pr-12 py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6D5EF8]/20 focus:border-[#6D5EF8] disabled:opacity-50"
                />
                <button 
                  type="submit"
                  disabled={!inputText.trim() || isFinished}
                  className="absolute right-2 w-8 h-8 bg-[#6D5EF8] rounded-lg flex items-center justify-center text-white hover:bg-[#5B4DF5] disabled:opacity-50 disabled:hover:bg-[#6D5EF8] transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
