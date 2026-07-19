'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import {
  Search, Zap, Image as ImageIcon, PenTool, Code, Video,
  ArrowRight, LayoutGrid, Moon, MessageCircle, Palette,
  Briefcase, TrendingUp, Crown, Flame, Sparkles, Star,
  Clock, ChevronDown, Globe, Share2, Mail,
  Home, ChevronRight, LucideIcon, Menu, X,
  FileText, Languages, FileUser, Link2, Gift,
  SpellCheck, QrCode, Hash,
  Lightbulb, List, RefreshCw, ShoppingBag, Magnet, 
  Megaphone, Key, Code2, Terminal, Braces, Type, Utensils, 
  Dumbbell, QuoteIcon,
  Users, Database, Mic2, BookOpen, Map, CalendarDays, Calendar,
  PlaySquare, Wind, GitBranch, FileX, SmilePlus, CloudSun,
  MessageSquare, Home as HomeIcon
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getEndpoint } from '@/lib/api';
import LoginPopup from '@/components/auth/LoginPopup';
import { trackToolFilter, trackFavorite } from '@/lib/analytics';

// ✅ Static icon map — RSC bundler idi safely handle cheyagaladu
export const IconMap: Record<string, LucideIcon> = {
  LayoutGrid,
  ImageIcon,
  PenTool,
  Video,
  Code,
  MessageCircle,
  Palette,
  Briefcase,
  Search,
  TrendingUp,
  Flame,
  Sparkles,
  Star,
  Clock,
  FileText,
  Languages,
  FileUser,
  Link2,
  Gift,
  SpellCheck,
  QrCode,
  Hash,
  Mail,
  Lightbulb,
  List,
  RefreshCw,
  ShoppingBag,
  Magnet,
  Megaphone,
  Key,
  Code2,
  Terminal,
  Braces,
  Type,
  Utensils,
  Dumbbell,
  QuoteIcon,
  Users,
  Database,
  Mic2,
  BookOpen,
  Map,
  CalendarDays,
  Calendar,
  PlaySquare,
  Wind,
  GitBranch,
  FileX,
  SmilePlus,
  CloudSun,
  MessageSquare,
  Home: HomeIcon,
};

function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const Icon = IconMap[name];
  if (!Icon) return null;
  return <Icon className={className} />;
}

export const categoriesList = [
  { name: 'All Tools', iconName: 'LayoutGrid' },
  { name: 'AI Image', iconName: 'ImageIcon' },
  { name: 'AI Writer', iconName: 'PenTool' },
  { name: 'AI Video', iconName: 'Video' },
  { name: 'AI Code', iconName: 'Code' },
  { name: 'AI Chat', iconName: 'MessageCircle' },
  { name: 'Design', iconName: 'Palette' },
  { name: 'Productivity', iconName: 'Briefcase' },
  { name: 'Utilities', iconName: 'Link2' },
  { name: 'SEO', iconName: 'Search' },
  { name: 'Business', iconName: 'TrendingUp' },
];

const filtersList = [
  { name: 'Popular', iconName: 'Flame' },
  { name: 'New', iconName: 'LayoutGrid' },
  { name: 'Trending', iconName: 'TrendingUp' },
  { name: 'Most Used', iconName: 'Star' },
  { name: 'Recent', iconName: 'Clock' },
];

export function isNewTool(createdAt?: string) {
  if (!createdAt) return false;
  const launchDate = new Date(createdAt);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - launchDate.getTime()) / (1000 * 3600 * 24));
  return diffDays <= 30;
}

export const allTools = [
  {
    name: 'AI Image Generator',
    description: 'Generate stunning images from text using advanced AI models.',
    iconName: 'ImageIcon',
    color: 'bg-[#6D5EF8] text-white',
    slug: '/tools/ai-image-generator',
    category: 'AI Image',
    createdAt: '2023-01-01',
    tag: { label: 'Popular', type: 'popular', iconName: 'Flame' }
  },
  {
    name: 'Background Remover',
    description: 'Remove background from any image instantly with AI precision.',
    iconName: 'LayoutGrid',
    color: 'bg-[#10B981] text-white',
    slug: '/tools/background-remover',
    category: 'AI Image',
    createdAt: '2023-02-01',
    tag: { label: 'Popular', type: 'popular', iconName: 'Flame' }
  },
  {
    name: 'AI Writer',
    description: 'Write blogs, emails, articles, and more in seconds.',
    iconName: 'PenTool',
    color: 'bg-[#F43F5E] text-white',
    slug: '/tools/ai-writer',
    category: 'AI Writer',
    createdAt: '2023-03-01',
    tag: { label: 'Popular', type: 'popular', iconName: 'Flame' }
  },
  {
    name: 'AI Video Generator',
    description: 'Generate videos from text with realistic AI visuals.',
    iconName: 'Video',
    color: 'bg-[#8B5CF6] text-white',
    slug: '/tools/ai-video-generator',
    category: 'AI Video',
    createdAt: '2026-07-10',
  },
  {
    name: 'AI Code Generator',
    description: 'Generate clean code in any programming language.',
    iconName: 'Code',
    color: 'bg-[#0EA5E9] text-white',
    slug: '/tools/ai-code-generator',
    category: 'AI Code',
    createdAt: '2026-07-05',
  },
  // ✅ NEW TOOLS ADDED
  {
    name: 'CSS Box Shadow Generator',
    description: 'Design beautiful, customized CSS box shadows instantly with visual preview.',
    iconName: 'Code2',
    color: 'bg-[#EC4899] text-white',
    slug: '/tools/css-box-shadow-generator',
    category: 'Developer Tools',
    createdAt: '2026-07-19',
    tag: { label: 'Free', type: 'free', iconName: 'Gift' }
  },
  // ✅ 20 NEW BATCH TOOLS
  {
    name: 'AI Interview Questions Generator',
    description: 'Generate tailored, role-specific interview questions instantly.',
    iconName: 'Users',
    color: 'bg-[#3B82F6] text-white',
    slug: '/tools/ai-interview-questions',
    category: 'Business',
    createdAt: '2026-07-19',
    tag: { label: 'New', type: 'free', iconName: 'Sparkles' }
  },
  {
    name: 'AI SQL Query Generator',
    description: 'Translate plain English text into complex SQL queries.',
    iconName: 'Database',
    color: 'bg-[#6366F1] text-white',
    slug: '/tools/ai-sql-generator',
    category: 'Developer Tools',
    createdAt: '2026-07-19',
    tag: { label: 'New', type: 'free', iconName: 'Sparkles' }
  },
  {
    name: 'AI Slogan Generator',
    description: 'Create catchy and memorable slogans for your brand or campaign.',
    iconName: 'Megaphone',
    color: 'bg-[#F43F5E] text-white',
    slug: '/tools/ai-slogan-generator',
    category: 'Business',
    createdAt: '2026-07-19',
    tag: { label: 'New', type: 'free', iconName: 'Sparkles' }
  },
  {
    name: 'AI Elevator Pitch Generator',
    description: 'Craft persuasive elevator pitches based on your role or product.',
    iconName: 'Mic2',
    color: 'bg-[#10B981] text-white',
    slug: '/tools/ai-elevator-pitch',
    category: 'Business',
    createdAt: '2026-07-19',
    tag: { label: 'New', type: 'free', iconName: 'Sparkles' }
  },
  {
    name: 'AI Video Script Generator',
    description: 'Write engaging scripts for YouTube, TikTok, or Instagram Reels.',
    iconName: 'Video',
    color: 'bg-[#8B5CF6] text-white',
    slug: '/tools/ai-video-script',
    category: 'Social Media',
    createdAt: '2026-07-19',
    tag: { label: 'New', type: 'free', iconName: 'Sparkles' }
  },
  {
    name: 'AI Job Description Generator',
    description: 'Create comprehensive and professional job descriptions for hiring.',
    iconName: 'Briefcase',
    color: 'bg-[#F59E0B] text-white',
    slug: '/tools/ai-job-description',
    category: 'Business',
    createdAt: '2026-07-19',
    tag: { label: 'New', type: 'free', iconName: 'Sparkles' }
  },
  {
    name: 'AI Instagram Hashtag Generator',
    description: 'Generate viral, relevant hashtags for your social media posts.',
    iconName: 'Hash',
    color: 'bg-[#EC4899] text-white',
    slug: '/tools/ai-hashtag-generator',
    category: 'Social Media',
    createdAt: '2026-07-19',
    tag: { label: 'New', type: 'free', iconName: 'Sparkles' }
  },
  {
    name: 'AI Story Generator',
    description: 'Write creative short stories based on a prompt and genre.',
    iconName: 'BookOpen',
    color: 'bg-[#6D5EF8] text-white',
    slug: '/tools/ai-story-generator',
    category: 'Writing',
    createdAt: '2026-07-19',
    tag: { label: 'New', type: 'free', iconName: 'Sparkles' }
  },
  {
    name: 'AI Travel Itinerary Planner',
    description: 'Create detailed daily travel plans for any destination.',
    iconName: 'Map',
    color: 'bg-[#14B8A6] text-white',
    slug: '/tools/ai-travel-planner',
    category: 'Utilities',
    createdAt: '2026-07-19',
    tag: { label: 'New', type: 'free', iconName: 'Sparkles' }
  },
  {
    name: 'AI Meal Planner',
    description: 'Generate weekly meal plans with specific dietary constraints.',
    iconName: 'Utensils',
    color: 'bg-[#F97316] text-white',
    slug: '/tools/ai-meal-planner',
    category: 'Utilities',
    createdAt: '2026-07-19',
    tag: { label: 'New', type: 'free', iconName: 'Sparkles' }
  },
  {
    name: 'AI Poem Generator',
    description: 'Generate beautiful poems in various styles and formats.',
    iconName: 'Wind',
    color: 'bg-[#A855F7] text-white',
    slug: '/tools/ai-poem-generator',
    category: 'Writing',
    createdAt: '2026-07-19',
    tag: { label: 'New', type: 'free', iconName: 'Sparkles' }
  },
  {
    name: 'AI Review Responder',
    description: 'Generate professional replies to customer reviews or feedback.',
    iconName: 'MessageSquare',
    color: 'bg-[#06B6D4] text-white',
    slug: '/tools/ai-review-responder',
    category: 'Business',
    createdAt: '2026-07-19',
    tag: { label: 'New', type: 'free', iconName: 'Sparkles' }
  },
  {
    name: 'AI Event Planner',
    description: 'Generate a step-by-step plan and schedule for any event or party.',
    iconName: 'Calendar',
    color: 'bg-[#84CC16] text-white',
    slug: '/tools/ai-event-planner',
    category: 'Utilities',
    createdAt: '2026-07-19',
    tag: { label: 'New', type: 'free', iconName: 'Sparkles' }
  },
  {
    name: 'AI YouTube Tags Generator',
    description: 'Generate optimized SEO tags and keywords for a YouTube video.',
    iconName: 'PlaySquare',
    color: 'bg-[#EF4444] text-white',
    slug: '/tools/ai-youtube-tags',
    category: 'Social Media',
    createdAt: '2026-07-19',
    tag: { label: 'New', type: 'free', iconName: 'Sparkles' }
  },
  {
    name: 'AI Apology Letter Generator',
    description: 'Write sincere, professional, or personal apology letters.',
    iconName: 'PenTool',
    color: 'bg-[#64748B] text-white',
    slug: '/tools/ai-apology-letter',
    category: 'Writing',
    createdAt: '2026-07-19',
    tag: { label: 'New', type: 'free', iconName: 'Sparkles' }
  },
  {
    name: 'AI Dream Interpreter',
    description: 'Analyzes your dreams and provides interesting psychological interpretations.',
    iconName: 'CloudSun',
    color: 'bg-[#38BDF8] text-white',
    slug: '/tools/ai-dream-interpreter',
    category: 'Utilities',
    createdAt: '2026-07-19',
    tag: { label: 'New', type: 'free', iconName: 'Sparkles' }
  },
  {
    name: 'AI Git Command Generator',
    description: 'Generates exact git commands based on plain English descriptions.',
    iconName: 'GitBranch',
    color: 'bg-[#F97316] text-white',
    slug: '/tools/ai-git-command',
    category: 'Developer Tools',
    createdAt: '2026-07-19',
    tag: { label: 'New', type: 'free', iconName: 'Sparkles' }
  },
  {
    name: 'AI Real Estate Listing Generator',
    description: 'Creates engaging property descriptions for real estate agents.',
    iconName: 'Home',
    color: 'bg-[#10B981] text-white',
    slug: '/tools/ai-real-estate-listing',
    category: 'Business',
    createdAt: '2026-07-19',
    tag: { label: 'New', type: 'free', iconName: 'Sparkles' }
  },
  {
    name: 'AI Resignation Letter Generator',
    description: 'Generates professional resignation letters tailored to your situation.',
    iconName: 'FileX',
    color: 'bg-[#64748B] text-white',
    slug: '/tools/ai-resignation-letter',
    category: 'Writing',
    createdAt: '2026-07-19',
    tag: { label: 'New', type: 'free', iconName: 'Sparkles' }
  },
  {
    name: 'AI Emoji Translator',
    description: 'Translates plain English text into creative emoji sequences.',
    iconName: 'SmilePlus',
    color: 'bg-[#FBBF24] text-white',
    slug: '/tools/ai-emoji-translator',
    category: 'Social Media',
    createdAt: '2026-07-19',
    tag: { label: 'New', type: 'free', iconName: 'Sparkles' }
  },
  // ✅ 5 NEW FREE TOOLS
  {
    name: 'AI Text Summarizer',
    description: 'Summarize long articles, PDFs, or any text into clear bullet points instantly.',
    iconName: 'FileText',
    color: 'bg-[#F97316] text-white',
    slug: '/tools/ai-summarizer',
    category: 'Productivity',
    createdAt: '2026-07-19',
    tag: { label: 'Free', type: 'free', iconName: 'Gift' },
  },
  {
    name: 'AI Language Translator',
    description: 'Translate text into 50+ languages instantly with AI-powered accuracy.',
    iconName: 'Languages',
    color: 'bg-[#06B6D4] text-white',
    slug: '/tools/ai-translator',
    category: 'Productivity',
    createdAt: '2026-07-19',
    tag: { label: 'Free', type: 'free', iconName: 'Gift' },
  },
  {
    name: 'AI Resume Builder',
    description: 'Generate a professional ATS-friendly resume from your details in seconds.',
    iconName: 'FileUser',
    color: 'bg-[#8B5CF6] text-white',
    slug: '/tools/ai-resume-builder',
    category: 'Productivity',
    createdAt: '2026-07-19',
    tag: { label: 'Free', type: 'free', iconName: 'Gift' },
  },
  {
    name: 'AI Color Palette',
    description: 'Generate beautiful color palettes from a brand name or mood description.',
    iconName: 'Palette',
    color: 'bg-[#EC4899] text-white',
    slug: '/tools/ai-color-palette',
    category: 'Design',
    createdAt: '2026-07-19',
    tag: { label: 'Free', type: 'free', iconName: 'Gift' },
  },
  {
    name: 'URL Shortener',
    description: 'Shorten any long URL into a clean, shareable link in one click.',
    iconName: 'Link2',
    color: 'bg-[#14B8A6] text-white',
    slug: '/tools/url-shortener',
    category: 'Utilities',
    createdAt: '2026-07-19',
    tag: { label: 'Free', type: 'free', iconName: 'Gift' },
  },
  {
    name: 'AI Grammar Checker',
    description: 'Fix grammar, spelling, and phrasing instantly with AI.',
    iconName: 'SpellCheck',
    color: 'bg-[#EF4444] text-white',
    slug: '/tools/ai-grammar-checker',
    category: 'Productivity',
    createdAt: '2026-07-19',
    tag: { label: 'Free', type: 'free', iconName: 'Gift' },
  },
  {
    name: 'QR Code Generator',
    description: 'Generate high-quality QR codes for any URL or text instantly.',
    iconName: 'QrCode',
    color: 'bg-[#3B82F6] text-white',
    slug: '/tools/qr-code-generator',
    category: 'Utilities',
    createdAt: '2026-07-19',
    tag: { label: 'Free', type: 'free', iconName: 'Gift' },
  },
  {
    name: 'AI Caption Generator',
    description: 'Generate engaging social media captions with emojis and trending hashtags.',
    iconName: 'Hash',
    color: 'bg-[#8B5CF6] text-white',
    slug: '/tools/ai-caption-generator',
    category: 'Business',
    createdAt: '2026-07-19',
    tag: { label: 'Free', type: 'free', iconName: 'Gift' },
  },
  {
    name: 'AI Email Generator',
    description: 'Draft professional and polite email replies in seconds based on your tone.',
    iconName: 'Mail',
    color: 'bg-[#10B981] text-white',
    slug: '/tools/ai-email-generator',
    category: 'Productivity',
    createdAt: '2026-07-19',
    tag: { label: 'Free', type: 'free', iconName: 'Gift' },
  },
  {
    name: 'AI Business Name Generator',
    description: 'Discover catchy, memorable names and taglines for your next startup.',
    iconName: 'Briefcase',
    color: 'bg-[#F59E0B] text-white',
    slug: '/tools/ai-business-name-generator',
    category: 'Business',
    createdAt: '2026-07-19',
    tag: { label: 'Free', type: 'free', iconName: 'Gift' },
  },
  {
    name: 'AI Blog Idea Generator',
    description: 'Generate 10 highly engaging and viral blog post ideas instantly.',
    iconName: 'Lightbulb',
    color: 'bg-[#F59E0B] text-white',
    slug: '/tools/ai-blog-idea-generator',
    category: 'AI Writer',
    createdAt: '2026-07-20',
    tag: { label: 'Free', type: 'free', iconName: 'Gift' },
  },
  {
    name: 'AI Article Outline Generator',
    description: 'Create a comprehensive, SEO-optimized article outline with headers.',
    iconName: 'List',
    color: 'bg-[#3B82F6] text-white',
    slug: '/tools/ai-article-outline-generator',
    category: 'AI Writer',
    createdAt: '2026-07-20',
    tag: { label: 'Free', type: 'free', iconName: 'Gift' },
  },
  {
    name: 'AI Paraphrasing Tool',
    description: 'Rewrite text completely uniquely while retaining the original meaning.',
    iconName: 'RefreshCw',
    color: 'bg-[#10B981] text-white',
    slug: '/tools/ai-paraphraser',
    category: 'Productivity',
    createdAt: '2026-07-20',
    tag: { label: 'Free', type: 'free', iconName: 'Gift' },
  },
  {
    name: 'AI Product Description Generator',
    description: 'Write compelling, conversion-focused product descriptions instantly.',
    iconName: 'ShoppingBag',
    color: 'bg-[#EC4899] text-white',
    slug: '/tools/ai-product-description',
    category: 'Business',
    createdAt: '2026-07-20',
    tag: { label: 'Free', type: 'free', iconName: 'Gift' },
  },
  {
    name: 'AI Cover Letter Generator',
    description: 'Write a professional, standout cover letter for any job application.',
    iconName: 'FileText',
    color: 'bg-[#6D5EF8] text-white',
    slug: '/tools/ai-cover-letter',
    category: 'Business',
    createdAt: '2026-07-20',
    tag: { label: 'Free', type: 'free', iconName: 'Gift' },
  },
  {
    name: 'AI SEO Title & Meta Generator',
    description: 'Generate SEO-optimized Page Titles and Meta Descriptions.',
    iconName: 'Search',
    color: 'bg-[#F43F5E] text-white',
    slug: '/tools/ai-seo-meta-generator',
    category: 'SEO',
    createdAt: '2026-07-20',
    tag: { label: 'Free', type: 'free', iconName: 'Gift' },
  },
  {
    name: 'AI YouTube Title Generator',
    description: 'Generate highly clickable, viral YouTube video titles for your next video.',
    iconName: 'Video',
    color: 'bg-[#EF4444] text-white',
    slug: '/tools/ai-youtube-title',
    category: 'Social Media',
    createdAt: '2026-07-20',
    tag: { label: 'Free', type: 'free', iconName: 'Gift' },
  },
  {
    name: 'AI Tweet Thread Generator',
    description: 'Write highly engaging, viral Twitter threads with perfect hooks.',
    iconName: 'MessageCircle',
    color: 'bg-[#0EA5E9] text-white',
    slug: '/tools/ai-tweet-thread',
    category: 'Social Media',
    createdAt: '2026-07-20',
    tag: { label: 'Free', type: 'free', iconName: 'Gift' },
  },
  {
    name: 'AI Hook Generator',
    description: 'Generate catchy, curiosity-inducing hooks for TikTok, Reels, or Shorts.',
    iconName: 'Magnet',
    color: 'bg-[#8B5CF6] text-white',
    slug: '/tools/ai-hook-generator',
    category: 'Social Media',
    createdAt: '2026-07-20',
    tag: { label: 'Free', type: 'free', iconName: 'Gift' },
  },
  {
    name: 'AI Ad Copy Generator',
    description: 'Write highly converting ad copy variations for Facebook or Google Ads.',
    iconName: 'Megaphone',
    color: 'bg-[#14B8A6] text-white',
    slug: '/tools/ai-ad-copy',
    category: 'Marketing',
    createdAt: '2026-07-20',
    tag: { label: 'Free', type: 'free', iconName: 'Gift' },
  },
  {
    name: 'AI LinkedIn Bio Generator',
    description: 'Write an optimized, professional LinkedIn About section.',
    iconName: 'Briefcase',
    color: 'bg-[#0A66C2] text-white',
    slug: '/tools/ai-linkedin-bio',
    category: 'Social Media',
    createdAt: '2026-07-20',
    tag: { label: 'Free', type: 'free', iconName: 'Gift' },
  },
  {
    name: 'Strong Password Generator',
    description: 'Generate ultra-secure, random passwords directly in your browser.',
    iconName: 'Key',
    color: 'bg-[#10B981] text-white',
    slug: '/tools/password-generator',
    category: 'Utilities',
    createdAt: '2026-07-20',
    tag: { label: 'Free', type: 'free', iconName: 'Gift' },
  },
  {
    name: 'Regex Generator',
    description: 'Describe what you want to match, and AI will generate the Regex pattern.',
    iconName: 'Code2',
    color: 'bg-[#3B82F6] text-white',
    slug: '/tools/ai-regex-generator',
    category: 'Utilities',
    createdAt: '2026-07-20',
    tag: { label: 'Free', type: 'free', iconName: 'Gift' },
  },
  {
    name: 'AI Code Explainer',
    description: 'Paste any complex code and AI will explain it in simple language.',
    iconName: 'Terminal',
    color: 'bg-[#8B5CF6] text-white',
    slug: '/tools/ai-code-explainer',
    category: 'Utilities',
    createdAt: '2026-07-20',
    tag: { label: 'Free', type: 'free', iconName: 'Gift' },
  },
  {
    name: 'JSON Formatter & Validator',
    description: 'Instantly format and validate messy JSON data in your browser.',
    iconName: 'Braces',
    color: 'bg-[#F97316] text-white',
    slug: '/tools/json-formatter',
    category: 'Utilities',
    createdAt: '2026-07-20',
    tag: { label: 'Free', type: 'free', iconName: 'Gift' },
  },
  {
    name: 'Lorem Ipsum Generator',
    description: 'Generate custom amounts of dummy text for your designs instantly.',
    iconName: 'Type',
    color: 'bg-[#6B7280] text-white',
    slug: '/tools/lorem-ipsum',
    category: 'Utilities',
    createdAt: '2026-07-20',
    tag: { label: 'Free', type: 'free', iconName: 'Gift' },
  },
  {
    name: 'AI Recipe Generator',
    description: 'Enter your available ingredients and get a delicious custom recipe.',
    iconName: 'Utensils',
    color: 'bg-[#EF4444] text-white',
    slug: '/tools/ai-recipe-generator',
    category: 'Lifestyle',
    createdAt: '2026-07-20',
    tag: { label: 'Free', type: 'free', iconName: 'Gift' },
  },
  {
    name: 'AI Workout Plan Generator',
    description: 'Get a custom workout plan based on your goals and schedule.',
    iconName: 'Dumbbell',
    color: 'bg-[#06B6D4] text-white',
    slug: '/tools/ai-workout-plan',
    category: 'Lifestyle',
    createdAt: '2026-07-20',
    tag: { label: 'Free', type: 'free', iconName: 'Gift' },
  },
  {
    name: 'AI Motivational Quote Generator',
    description: 'Generate profound, original motivational quotes on any topic.',
    iconName: 'QuoteIcon',
    color: 'bg-[#8B5CF6] text-white',
    slug: '/tools/ai-quote-generator',
    category: 'Lifestyle',
    createdAt: '2026-07-20',
    tag: { label: 'Free', type: 'free', iconName: 'Gift' },
  },
  {
    name: 'AI Gift Idea Generator',
    description: 'Find the perfect, thoughtful gift based on age and interests.',
    iconName: 'Gift',
    color: 'bg-[#EC4899] text-white',
    slug: '/tools/ai-gift-idea',
    category: 'Lifestyle',
    createdAt: '2026-07-20',
    tag: { label: 'Free', type: 'free', iconName: 'Gift' },
  },
];


function ToolsClientInner() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const { user, isAuthenticated, updateUser } = useAuth();
  const showUpgradeCard = (user?.plan || 'free').toLowerCase() === 'free';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState('All Tools');
  const [activeFilter, setActiveFilter] = useState('Popular');
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
  const [starredTools, setStarredTools] = useState<string[]>([]);

  useEffect(() => {
    if (user?.savedTools) {
      setStarredTools(user.savedTools);
    }
  }, [user]);

  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
  }, [searchParams]);

  useEffect(() => {
    if (!isAuthenticated && (activeFilter === 'Most Used' || activeFilter === 'Recent')) {
      setActiveFilter('Popular');
    }
  }, [isAuthenticated, activeFilter]);

  // Compute category counts dynamically
  const categories = useMemo(() => {
    return categoriesList.map(cat => {
      if (cat.name === 'All Tools') return { ...cat, count: allTools.length };
      const count = allTools.filter(t => t.category === cat.name).length;
      return { ...cat, count };
    }).filter(cat => cat.count > 0 || cat.name === 'All Tools');
  }, []);

  const filteredTools = useMemo(() => {
    let result = allTools;

    if (activeCategory !== 'All Tools') {
      result = result.filter(t => t.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t => 
        t.name.toLowerCase().includes(q) || 
        t.description.toLowerCase().includes(q)
      );
    }

    if (activeFilter === 'New') {
       result = result.filter(t => isNewTool(t.createdAt));
    } else if (activeFilter === 'Most Used' || activeFilter === 'Recent') {
       result = result.filter(t => starredTools.includes(t.slug));
    }

    return result;
  }, [searchQuery, activeCategory, activeFilter]);

  const toggleStar = async (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      setShowLoginPopup(true);
      return;
    }

    const isStarred = starredTools.includes(slug);
    const updatedStarred = isStarred 
      ? starredTools.filter(s => s !== slug) 
      : [...starredTools, slug];
    
    setStarredTools(updatedStarred);
    trackFavorite('tool', isStarred ? 'remove' : 'add', slug);

    try {
      const res = await fetch(getEndpoint(`/api/auth/tools/${encodeURIComponent(slug)}/star`), {
        method: 'PUT',
        credentials: 'include'
      });
      const data = await res.json();
      
      if (data.success && user) {
        updateUser({ ...user, savedTools: data.savedTools });
      } else {
        setStarredTools(starredTools);
      }
    } catch (err) {
      console.error('Failed to toggle star:', err);
      setStarredTools(starredTools);
    }
  };

  return (
    <>
      <LoginPopup isOpen={showLoginPopup} onClose={() => setShowLoginPopup(false)} />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-2 relative w-full">
        {/* Background Gradient */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-[100px] -z-10 pointer-events-none -translate-y-1/4"></div>

        {/* Top Navigation Row */}
        <div className="mb-4 flex flex-col gap-2">
          <nav className="flex items-center space-x-2 text-sm font-medium text-[#6B7280]">
            <Link href="/" className="hover:text-[#111827] transition-colors flex items-center gap-1.5">
              <Home className="w-4 h-4" /> Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-[#6D5EF8] font-bold">All Tools</span>
          </nav>
          
          {/* Mobile Categories Toggle (Below Breadcrumb) */}
          <button 
            onClick={() => setIsMobileCategoriesOpen(true)}
            className="lg:hidden flex items-center gap-2 w-fit px-4 py-2.5 bg-white border border-[#E5E7EB] rounded-xl hover:bg-[#F9FAFB] transition-colors shadow-sm text-[#111827] font-semibold"
          >
            <Menu className="w-5 h-5 text-[#6D5EF8]" />
            Categories
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Sidebar (Desktop) */}
          <aside className="hidden lg:block w-[260px] shrink-0 space-y-6 sticky top-20 self-start">
            <div>
              <h3 className="font-bold text-[#111827] mb-4 px-3">Categories</h3>
              <div className="space-y-1">
                {categories.map((category, index) => {
                  const isActive = activeCategory === category.name;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setActiveCategory(category.name);
                        trackToolFilter('category', category.name);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${isActive
                        ? 'bg-[#EEF2FF] text-[#6D5EF8] font-semibold'
                        : 'text-[#4B5563] hover:bg-white hover:text-[#111827] font-medium'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <DynamicIcon name={category.iconName} className={`w-5 h-5 ${isActive ? 'text-[#6D5EF8]' : 'text-[#6B7280]'}`} />
                        <span className="text-[15px]">{category.name}</span>
                      </div>
                      <span className={`text-xs ${isActive
                        ? 'text-[#6D5EF8] bg-white px-1.5 py-0.5 rounded-md shadow-sm'
                        : 'text-[#9CA3AF]'
                        }`}>
                        {category.count}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Premium Card — hide for paid plans (starter / pro / business) */}
            {showUpgradeCard && (
              <div className="bg-gradient-to-br from-white to-[#EEF2FF] border border-[#E5E7EB] rounded-2xl p-5 shadow-sm relative overflow-hidden">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#6D5EF8]/5 rounded-full blur-xl"></div>
                <div className="w-10 h-10 bg-[#EEF2FF] rounded-xl flex items-center justify-center mb-4 text-[#6D5EF8]">
                  <Crown className="w-5 h-5 fill-[#6D5EF8]" />
                </div>
                <h4 className="font-bold text-[#111827] mb-1">Unlock Premium</h4>
                <p className="text-sm text-[#6B7280] mb-5 leading-relaxed">
                  Get unlimited access to all tools and premium features.
                </p>
                <Link href="/pricing" className="w-full flex justify-center items-center bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white font-semibold text-sm py-2.5 rounded-xl transition-colors shadow-md shadow-[#6D5EF8]/20">
                  Upgrade Now
                </Link>
              </div>
            )}
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-[#111827] mb-2 tracking-tight">All Premium Tools</h1>
                <p className="text-[#6B7280] text-lg">Explore {allTools.length} AI-powered tools to boost your productivity ✨</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="mb-6 relative z-10">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF] group-focus-within:text-[#6D5EF8] transition-colors" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tools..."
                  className="w-full h-12 pl-11 pr-4 bg-white border border-[#E5E7EB] rounded-xl outline-none focus:border-[#6D5EF8] focus:ring-4 focus:ring-[#6D5EF8]/10 transition-all text-[15px] shadow-sm"
                />
              </div>
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap items-center gap-2.5 mb-8">
              {filtersList.map((filter, idx) => {
                if (!isAuthenticated && (filter.name === 'Most Used' || filter.name === 'Recent')) {
                  return null;
                }
                const isActive = activeFilter === filter.name;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveFilter(filter.name);
                      trackToolFilter('type', filter.name);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[14px] font-semibold transition-all shadow-sm ${isActive
                      ? 'bg-[#6D5EF8] text-white shadow-md shadow-[#6D5EF8]/20'
                      : 'bg-white text-[#4B5563] border border-[#E5E7EB] hover:bg-[#F9FAFB]'
                      }`}
                  >
                    <DynamicIcon name={filter.iconName} className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#9CA3AF]'}`} />
                    {filter.name}
                  </button>
                )
              })}
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredTools.length > 0 ? (
                filteredTools.map((tool, index) => {
                  const isStarred = starredTools.includes(tool.slug);
                  return (
                    <Link href={tool.slug} key={index} className="group">
                      <div className="bg-white p-5 rounded-2xl border border-[#E5E7EB] hover:border-[#6D5EF8] hover:shadow-xl hover:shadow-[#6D5EF8]/10 transition-all duration-300 relative h-full flex flex-col">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner ${tool.color}`}>
                            <DynamicIcon name={tool.iconName} className="w-7 h-7" />
                          </div>

                          <div className="flex gap-1.5 items-center flex-wrap justify-end">
                            {/* Free Badge */}
                            {tool.tag?.type === 'free' && (
                              <div className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-teal-50 text-teal-600">
                                <DynamicIcon name="Gift" className="w-3 h-3" />
                                Free
                              </div>
                            )}
                            {/* Popular Badge */}
                            {tool.tag?.type === 'popular' && !isNewTool(tool.createdAt) && (
                              <div className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-red-50 text-red-500`}>
                                <DynamicIcon name={tool.tag.iconName} className="w-3 h-3" />
                                {tool.tag.label}
                              </div>
                            )}
                            {/* New Badge */}
                            {isNewTool(tool.createdAt) && tool.tag?.type !== 'free' && (
                              <div className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-green-50 text-green-600`}>
                                <Sparkles className="w-3 h-3" />
                                New
                              </div>
                            )}
                            <button 
                              onClick={(e) => toggleStar(e, tool.slug)}
                              className={`transition-colors p-1 rounded-full ${isStarred ? 'text-[#F59E0B] bg-amber-50' : 'text-[#9CA3AF] hover:text-[#6D5EF8] hover:bg-indigo-50'}`}
                            >
                              <Star className={`w-5 h-5 ${isStarred ? 'fill-[#F59E0B]' : ''}`} />
                            </button>
                          </div>
                        </div>

                        <h3 className="text-lg font-bold text-[#111827] mb-2 group-hover:text-[#6D5EF8] transition-colors">
                          {tool.name}
                        </h3>
                        <p className="text-[#6B7280] text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                          {tool.description}
                        </p>

                        <div className="w-full py-2.5 bg-[#F8FAFC] group-hover:bg-[#EEF2FF] text-[#6D5EF8] rounded-xl font-semibold text-[14px] flex items-center justify-center transition-colors">
                          Try Now <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  )
                })
              ) : (
                <div className="col-span-full bg-white border border-dashed border-[#E5E7EB] rounded-2xl p-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-bold text-[#111827] mb-2">No tools found</h3>
                  <p className="text-[#6B7280] text-sm">We couldn't find any tools matching your search or filter.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Categories Drawer */}
      {isMobileCategoriesOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden flex">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#111827]/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsMobileCategoriesOpen(false)}
          ></div>
          
          {/* Drawer */}
          <div className="relative w-[280px] max-w-[80%] h-full bg-[#F8FAFC] shadow-2xl flex flex-col overflow-y-auto animate-[textSlideIn_0.3s_ease_forwards]">
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white border-b border-[#E5E7EB]">
              <h3 className="font-bold text-[#111827] text-lg">Categories</h3>
              <button 
                onClick={() => setIsMobileCategoriesOpen(false)}
                className="p-2 bg-gray-100 text-gray-500 hover:text-gray-900 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 flex flex-col flex-1 h-full overflow-y-auto space-y-6">
              <div className="space-y-1">
                {categories.map((category, index) => {
                  const isActive = activeCategory === category.name;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setActiveCategory(category.name);
                        trackToolFilter('category', category.name);
                        setIsMobileCategoriesOpen(false); // Close on select
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${isActive
                        ? 'bg-[#EEF2FF] text-[#6D5EF8] font-semibold'
                        : 'text-[#4B5563] hover:bg-white hover:text-[#111827] font-medium'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <DynamicIcon name={category.iconName} className={`w-5 h-5 ${isActive ? 'text-[#6D5EF8]' : 'text-[#6B7280]'}`} />
                        <span className="text-[15px]">{category.name}</span>
                      </div>
                      <span className={`text-xs ${isActive
                        ? 'text-[#6D5EF8] bg-white px-1.5 py-0.5 rounded-md shadow-sm'
                        : 'text-[#9CA3AF]'
                        }`}>
                        {category.count}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Premium Card Mobile — hide for paid plans */}
              {showUpgradeCard && (
                <div className="mt-auto pt-6">
                  <div className="bg-gradient-to-br from-white to-[#EEF2FF] border border-[#E5E7EB] rounded-2xl p-5 shadow-sm relative overflow-hidden">
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#6D5EF8]/5 rounded-full blur-xl"></div>
                    <div className="w-10 h-10 bg-[#EEF2FF] rounded-xl flex items-center justify-center mb-4 text-[#6D5EF8]">
                      <Crown className="w-5 h-5 fill-[#6D5EF8]" />
                    </div>
                    <h4 className="font-bold text-[#111827] mb-1">Unlock Premium</h4>
                    <p className="text-sm text-[#6B7280] mb-5 leading-relaxed">
                      Get unlimited access to all tools and premium features.
                    </p>
                    <Link href="/pricing" className="w-full flex justify-center items-center bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white font-semibold text-sm py-2.5 rounded-xl transition-colors shadow-md shadow-[#6D5EF8]/20">
                      Upgrade Now
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function ToolsClient() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#6D5EF8] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#6B7280] font-medium">Loading tools...</p>
        </div>
      </div>
    }>
      <ToolsClientInner />
    </Suspense>
  );
}
