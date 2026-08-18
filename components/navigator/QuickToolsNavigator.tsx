'use client';

import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronRight, Mic, MicOff, Pause, Play, Send, Square, ThumbsDown, ThumbsUp, Volume2, VolumeX, X } from 'lucide-react';
import Lottie from 'lottie-react';
import { useAuth } from '@/contexts/AuthContext';
import LoginPopup from '@/components/auth/LoginPopup';
import { getEndpoint } from '@/lib/api';
import quickToolsAiAnimation from '../../public/animations/quicktools-ai-logo.json';

type Language = 'en' | 'te' | 'hi';
type ContentType = 'blog' | 'article' | 'news';
type ChatMessage = { role: 'assistant' | 'user'; text: string };
type SearchResult = { type: string; id: string; title: string; description: string; path: string };
type SessionContext = {
  currentPage: string; currentContentType?: ContentType; currentContentId?: string; currentSlug?: string;
  currentTitle?: string; previousAction?: string; detectedLanguage: Language; lastSearchResults: SearchResult[];
};
type SpeechRecognitionEventLike = { resultIndex?: number; results: ArrayLike<{ 0: { transcript: string; confidence?: number }; isFinal?: boolean }> };
type SpeechRecognitionLike = {
  continuous: boolean; interimResults: boolean; lang: string; start: () => void; stop: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: { error: string }) => void) | null; onend: (() => void) | null; onnomatch?: (() => void) | null;
  onaudiostart?: (() => void) | null; onspeechstart?: (() => void) | null;
};

const GREETING = "Hi, I'm QuickTool AI. What can I help you find or do?";
const ROUTES = [
  { terms: ['home', 'homepage', 'హోమ్', 'मुख्य पेज'], path: '/', label: 'Home' },
  { terms: ['all tools', 'tools page', 'tools', 'టూల్స్', 'टूल्स'], path: '/tools', label: 'All Tools' },
  { terms: ['blogs', 'blog page', 'blog', 'బ్లాగ్స్', 'ब्लॉग'], path: '/blog', label: 'Blogs' },
  { terms: ['articles', 'article page', 'article', 'ఆర్టికల్స్', 'लेख'], path: '/articles', label: 'Articles' },
  { terms: ['news page', 'news', 'new', 'న్యూస్', 'समाचार'], path: '/news', label: 'News' },
  { terms: ['community', 'కమ్యూనిటీ', 'समुदाय'], path: '/community', label: 'Community' },
  { terms: ['courses', 'learn', 'academy', 'లెర్న్', 'सीखें'], path: '/learn', label: 'QuickTool Learn' },
  { terms: ['prompts', 'prompt hub', 'ప్రాంప్ట్స్', 'प्रॉम्प्ट'], path: '/prompts', label: 'Prompt Hub' },
  { terms: ['chatgpt prompts'], path: '/prompts/chatgpt', label: 'ChatGPT Prompts' },
  { terms: ['claude prompts'], path: '/prompts/claude', label: 'Claude Prompts' },
  { terms: ['gemini prompts'], path: '/prompts/gemini', label: 'Gemini Prompts' },
  { terms: ['pricing', 'plans', 'ధరలు', 'कीमत'], path: '/pricing', label: 'Pricing' },
  { terms: ['about', 'గురించి', 'हमारे बारे में'], path: '/about', label: 'About' },
  { terms: ['contact', 'support', 'సంప్రదించండి', 'संपर्क'], path: '/contact', label: 'Contact' },
  { terms: ['help center', 'help page'], path: '/help', label: 'Help Center' },
  { terms: ['frequently asked questions', 'faq page', 'faqs', 'faq'], path: '/faq', label: 'FAQs' },
  { terms: ['privacy policy', 'privacy'], path: '/privacy', label: 'Privacy Policy' },
  { terms: ['terms of service', 'terms'], path: '/terms', label: 'Terms of Service' },
  { terms: ['cookie policy', 'cookies'], path: '/cookies', label: 'Cookie Policy' },
  { terms: ['login page', 'log in', 'login'], path: '/login', label: 'Login' },
  { terms: ['sign up page', 'create account', 'sign up', 'signup'], path: '/signup', label: 'Sign Up' },
  { terms: ['prompt generator'], path: '/prompts/generator', label: 'Prompt Generator' },
  { terms: ['prompt categories'], path: '/prompts/categories', label: 'Prompt Categories' },
  { terms: ['community leaderboard', 'leaderboard'], path: '/community/leaderboard', label: 'Community Leaderboard' },
] as const;

const detectLanguage = (): Language => 'en';
const say = (language: Language, key: 'opening' | 'found' | 'reading' | 'paused' | 'stopped' | 'back' | 'failed', value = '') => ({
  en: { opening: `Opening ${value}.`, found: `I found ${value}.`, reading: 'Reading this page. Use pause, resume, next section, or stop.', paused: 'Reading paused.', stopped: 'Voice stopped.', back: 'Going back.', failed: 'That action could not be completed. Please try again.' },
  te: { opening: `${value} open chesthunna.`, found: `${value} dorikindi.`, reading: 'Ee page chaduvuthunna. Pause, resume, next section లేదా stop use cheyyachu.', paused: 'Reading pause chesanu.', stopped: 'Voice stop chesanu.', back: 'Venakki velthunna.', failed: 'Aa action complete avaledu. Malli try cheyyandi.' },
  hi: { opening: `${value} खोल रहा हूँ।`, found: `${value} मिल गया।`, reading: 'यह पेज पढ़ रहा हूँ। Pause, resume, next section या stop इस्तेमाल करें।', paused: 'पढ़ना रोक दिया है।', stopped: 'आवाज़ बंद कर दी है।', back: 'पीछे जा रहा हूँ।', failed: 'यह काम पूरा नहीं हुआ। कृपया फिर कोशिश करें।' },
}[language][key]);

function recognitionConstructor() {
  if (typeof window === 'undefined') return null;
  const speechWindow = window as typeof window & { SpeechRecognition?: new () => SpeechRecognitionLike; webkitSpeechRecognition?: new () => SpeechRecognitionLike };
  return speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition || null;
}

function TypewriterMessage({ text }: { text: string }) {
  const [visibleCharacters, setVisibleCharacters] = useState(0);
  useEffect(() => {
    const delay = text.length > 280 ? 8 : text.length > 120 ? 12 : 18;
    const timer = window.setInterval(() => {
      setVisibleCharacters(current => {
        if (current >= text.length) {
          window.clearInterval(timer);
          return current;
        }
        return current + 1;
      });
    }, delay);
    return () => window.clearInterval(timer);
  }, [text]);
  const complete = visibleCharacters >= text.length;
  return <span aria-label={text}><span aria-hidden>{text.slice(0, visibleCharacters)}</span>{!complete && <span aria-hidden className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-indigo-500 align-middle" />}</span>;
}

export default function QuickToolsNavigator({ initialOpen = false }: { initialOpen?: boolean }) {
  const router = useRouter(); const pathname = usePathname();
  const { user, isAuthenticated, updateUser } = useAuth();
  const [open, setOpen] = useState(initialOpen); const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: 'assistant', text: GREETING }]);
  const [listening, setListening] = useState(false); const [speaking, setSpeaking] = useState(false);
  const [micEnabled, setMicEnabled] = useState(false);
  const [micStatus, setMicStatus] = useState('Microphone off');
  const [speechActive, setSpeechActive] = useState(false); const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [speechSection, setSpeechSection] = useState(1);
  const [busy, setBusy] = useState(false); const [loginOpen, setLoginOpen] = useState(false);
  const [assistantIntro, setAssistantIntro] = useState('');
  const [navigatorBottom, setNavigatorBottom] = useState(12);
  const [viewportBottom, setViewportBottom] = useState(12);
  const [context, setContext] = useState<SessionContext>({ currentPage: pathname, detectedLanguage: 'en', lastSearchResults: [] });
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null); const endRef = useRef<HTMLDivElement>(null);
  const navigatorRef = useRef<HTMLDivElement>(null);
  const openRef = useRef(initialOpen); const autoListenRef = useRef(false); const speakingRef = useRef(false);
  const voiceCommandPendingRef = useRef(false); const voiceTypingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const greetedRef = useRef(false); const greetingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingContentRef = useRef<{ explain: boolean; read: boolean; title: string; language: Language } | null>(null);
  const speechChunksRef = useRef<string[]>([]); const speechIndexRef = useRef(0);
  const answerCacheRef = useRef(new Map<string, string>()); const searchCacheRef = useRef(new Map<string, SearchResult[]>());
  const speechSupported = typeof window !== 'undefined' && Boolean(recognitionConstructor());

  const track = useCallback((action: string, detail?: string, successful = true) => {
    const gtag = (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag;
    gtag?.('event', action, { detail, page_path: pathname, detected_language: context.detectedLanguage, successful });
    gtag?.('event', successful ? 'successful_action' : 'failed_action', { intent_type: action, detail, page_path: pathname });
  }, [context.detectedLanguage, pathname]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, busy]);
  useEffect(() => {
    const saved = sessionStorage.getItem('quicktools_navigator_context');
    if (saved) try { queueMicrotask(() => setContext(previous => ({ ...previous, ...JSON.parse(saved), currentPage: pathname }))); } catch { /* ignore invalid session */ }
  }, [pathname]);
  useEffect(() => {
    queueMicrotask(() => setContext(previous => ({ ...previous, currentPage: pathname })));
  }, [pathname]);
  useEffect(() => { sessionStorage.setItem('quicktools_navigator_context', JSON.stringify(context)); }, [context]);
  useEffect(() => () => { if (greetingTimerRef.current) clearTimeout(greetingTimerRef.current); if (voiceTypingTimerRef.current) clearInterval(voiceTypingTimerRef.current); recognitionRef.current?.stop(); window.speechSynthesis?.cancel(); }, []);
  useEffect(() => {
    let animationFrame = 0;
    const updatePosition = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        const baseBottom = window.matchMedia('(min-width: 640px)').matches ? 24 : 12;
        const footer = document.querySelector('footer');
        const footerTop = footer?.getBoundingClientRect().top ?? window.innerHeight;
        const footerOverlap = Math.max(0, window.innerHeight - footerTop + 12);
        const siteHeader = document.querySelector('body header');
        const headerBottom = siteHeader?.getBoundingClientRect().bottom ?? 0;
        const navigatorHeight = navigatorRef.current?.offsetHeight ?? 0;
        const maximumBottom = Math.max(baseBottom, window.innerHeight - headerBottom - navigatorHeight - 12);
        setViewportBottom(baseBottom);
        setNavigatorBottom(Math.min(baseBottom + footerOverlap, maximumBottom));
      });
    };
    updatePosition();
    window.addEventListener('scroll', updatePosition, { passive: true });
    window.addEventListener('resize', updatePosition);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, []);
  useEffect(() => {
    if (open) return;
    const message = "I'm your AI assistant — ask me anything about this website!";
    let characterIndex = 0;
    let pauseTicks = 0;
    const timer = window.setInterval(() => {
      if (characterIndex < message.length) {
        characterIndex += 1;
        setAssistantIntro(message.slice(0, characterIndex));
      } else if (pauseTicks < 18) {
        pauseTicks += 1;
      } else {
        characterIndex = 0;
        pauseTicks = 0;
        setAssistantIntro('');
      }
    }, 70);
    return () => window.clearInterval(timer);
  }, [open]);
  function startMicrophone() {
    if (!openRef.current || !autoListenRef.current || voiceCommandPendingRef.current || recognitionRef.current) return;
    const Recognition = recognitionConstructor();
    if (!Recognition) { autoListenRef.current = false; setMicEnabled(false); reply('Voice recognition is unavailable here. Text input still works.', false); track('voice_failed', 'unsupported', false); return; }
    try {
      const recognition = new Recognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = 'en-IN';
      recognition.onaudiostart = () => setMicStatus('Microphone connected — speak now');
      recognition.onspeechstart = () => setMicStatus('Voice detected — processing');
      recognition.onresult = event => {
        const result = event.results[event.results.length - 1];
        const transcript = result?.[0]?.transcript?.trim() || '';
        if (!transcript) return;
        setMicStatus(`Heard: ${transcript}`);
        voiceCommandPendingRef.current = true;
        recognition.stop();
        if (voiceTypingTimerRef.current) clearInterval(voiceTypingTimerRef.current);
        let characterIndex = 0;
        setInput('');
        voiceTypingTimerRef.current = setInterval(() => {
          characterIndex += 1;
          setInput(transcript.slice(0, characterIndex));
          if (characterIndex < transcript.length) return;
          if (voiceTypingTimerRef.current) clearInterval(voiceTypingTimerRef.current);
          voiceTypingTimerRef.current = null;
          window.setTimeout(() => {
            void handleCommand(transcript).finally(() => {
              voiceCommandPendingRef.current = false;
              if (openRef.current && autoListenRef.current && !speakingRef.current) startMicrophone();
            });
          }, 180);
        }, 38);
      };
      recognition.onnomatch = () => reply("I heard audio but couldn't recognize the words. Please speak clearly and try again.", false);
      recognition.onerror = event => {
        recognitionRef.current = null;
        const denied = event.error === 'not-allowed' || event.error === 'service-not-allowed';
        if (denied) {
          autoListenRef.current = false;
          setMicEnabled(false);
          setListening(false);
          setMicStatus('Microphone permission blocked');
          reply('Microphone permission was blocked. You can continue using text.', false);
          track('voice_failed', event.error, false);
        } else if (event.error === 'audio-capture') {
          autoListenRef.current = false;
          setMicEnabled(false);
          setListening(false);
          setMicStatus('No working microphone found');
          reply('No working microphone was found. Check your Windows microphone input and try again.', false);
          track('voice_failed', event.error, false);
        } else if (event.error === 'network') {
          setMicStatus('Speech service network error');
          reply('Browser speech recognition could not reach its voice service. Check the internet connection and try again.', false);
          track('voice_failed', event.error, false);
        } else if (event.error !== 'no-speech' && event.error !== 'aborted') {
          reply(`Voice recognition error: ${event.error}. Please try again.`, false);
          track('voice_failed', event.error, false);
        }
      };
      recognition.onend = () => {
        recognitionRef.current = null;
        if (openRef.current && autoListenRef.current && !speakingRef.current && !voiceCommandPendingRef.current) {
          setListening(true);
          setMicStatus('Listening — speak now');
          window.setTimeout(startMicrophone, 700);
        } else {
          setListening(false);
          if (!speakingRef.current) setMicStatus('Microphone off');
        }
      };
      recognitionRef.current = recognition;
      recognition.start();
      setListening(true);
      setMicStatus('Listening — speak now');
      track('voice_started');
    } catch {
      recognitionRef.current = null;
      setListening(false);
      window.setTimeout(() => { if (openRef.current && autoListenRef.current) startMicrophone(); }, 700);
    }
  }

  const chooseVoice = () => {
    const voices = window.speechSynthesis?.getVoices() || [];
    return voices.find(voice => voice.lang.toLowerCase().startsWith('en-in')) || voices.find(voice => voice.lang.toLowerCase().startsWith('en'));
  };
  function speakChunk(index: number, language: Language) {
    if (!voiceEnabled || !('speechSynthesis' in window) || index >= speechChunksRef.current.length) { speakingRef.current = false; setSpeaking(false); setSpeechActive(false); if (openRef.current && autoListenRef.current) window.setTimeout(startMicrophone, 300); return; }
    speechIndexRef.current = index; setSpeechSection(index + 1);
    const utterance = new SpeechSynthesisUtterance(speechChunksRef.current[index].replace(/[*#`]/g, ''));
    const voice = chooseVoice(); if (voice) utterance.voice = voice;
    utterance.lang = 'en-IN'; utterance.rate = 1;
    utterance.onstart = () => { speakingRef.current = true; recognitionRef.current?.stop(); setSpeaking(true); setSpeechActive(true); };
    utterance.onend = () => speakChunk(index + 1, language);
    utterance.onerror = () => { speakingRef.current = false; setSpeaking(false); setSpeechActive(false); track('voice_failed', 'speech_synthesis', false); if (openRef.current && autoListenRef.current) window.setTimeout(startMicrophone, 300); };
    window.speechSynthesis.speak(utterance);
  }
  const speak = (text: string, force = false, language = context.detectedLanguage) => {
    if ((!voiceEnabled && !force) || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel(); speechChunksRef.current = [text]; speechIndexRef.current = 0; speakChunk(0, language);
  };
  const reply = (text: string, aloud = true, language = context.detectedLanguage) => { setMessages(previous => [...previous, { role: 'assistant', text }]); if (aloud) speak(text, false, language); };
  const navigate = (path: string, label: string, language = context.detectedLanguage) => { reply(say(language, 'opening', label), true, language); setContext(previous => ({ ...previous, previousAction: 'navigate' })); track('content_open', path); router.push(path); };

  const readablePageText = () => {
    const root = document.querySelector('main article') || document.querySelector('main');
    if (!root) return '';
    const clone = root.cloneNode(true) as HTMLElement;
    clone.querySelectorAll('nav,footer,header,aside,button,script,style,[aria-hidden="true"]').forEach(node => node.remove());
    return (clone.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 30000);
  };
  const splitSpeech = (text: string) => (text.match(/[^.!?।]+[.!?।]+|[^.!?।]+$/g) || [text]).reduce<string[]>((chunks, sentence) => {
    const last = chunks[chunks.length - 1]; if (last && `${last} ${sentence}`.length < 850) chunks[chunks.length - 1] = `${last} ${sentence}`; else chunks.push(sentence.trim()); return chunks;
  }, []);
  const readPage = (language = context.detectedLanguage) => {
    const text = readablePageText(); if (text.length < 40) return reply("I couldn't find readable content on this page.", true, 'en');
    window.speechSynthesis?.cancel(); speechChunksRef.current = splitSpeech(text); speechIndexRef.current = 0;
    reply(say(language, 'reading'), false, language); speakChunk(0, language); setContext(previous => ({ ...previous, previousAction: 'read' })); track('read_page', pathname);
  };
  const stopSpeech = () => { window.speechSynthesis?.cancel(); speechChunksRef.current = []; speakingRef.current = false; setSpeaking(false); setSpeechActive(false); };

  const pageActions = () => Array.from(document.querySelectorAll('main a, main button')).map(element => ({ label: (element.textContent || element.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim(), href: element instanceof HTMLAnchorElement ? element.getAttribute('href') || '' : '' })).filter(action => action.label).slice(0, 40);
  const askAI = async (question: string, language = context.detectedLanguage) => {
    const cacheKey = `${pathname}|${language}|${question.toLowerCase().replace(/\s+/g, ' ').trim()}`;
    const cached = answerCacheRef.current.get(cacheKey); if (cached) { reply(cached, true, language); return; }
    setBusy(true); try {
      const response = await fetch('/api/navigator/ask', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question, language, history: messages.slice(-8), session: context, page: { path: pathname, title: document.title, description: document.querySelector('meta[name="description"]')?.getAttribute('content') || '', content: readablePageText().slice(0, 7000), actions: JSON.stringify(pageActions()) } }) });
      const data = await response.json(); if (!response.ok || !data.success) throw new Error(data.message);
      answerCacheRef.current.set(cacheKey, data.answer); reply(data.answer, true, language); setContext(previous => ({ ...previous, previousAction: 'answer' })); track(/summar|explain/i.test(question) ? 'summarize_page' : 'intent_type', 'ai_question');
    } catch (error) { reply(error instanceof Error && error.message ? error.message : say(language, 'failed'), true, language); track('ai_question', pathname, false); } finally { setBusy(false); }
  };

  const saveResolvedContent = async (item: { id: string; type: ContentType; title: string }, language: Language) => {
    if (!isAuthenticated || !user) { reply(language === 'hi' ? 'सेव करने के लिए लॉग इन करें।' : language === 'te' ? 'Save cheyyadaniki login avvandi.' : 'Please log in to save this item.', false, language); setLoginOpen(true); return false; }
    const field: 'savedBlogs' | 'savedArticles' | 'savedNews' = item.type === 'article' ? 'savedArticles' : item.type === 'news' ? 'savedNews' : 'savedBlogs';
    const current = user[field] || []; if (current.includes(item.id)) { reply(language === 'te' ? `“${item.title}” already saved undi.` : language === 'hi' ? `“${item.title}” पहले से सेव है।` : `“${item.title}” is already saved.`, true, language); return true; }
    const endpointType = item.type === 'article' ? 'articles' : item.type;
    const response = await fetch(getEndpoint(`/api/user/saved-${endpointType}/${item.id}`), { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include' });
    const data = await response.json(); if (!response.ok || !data.success || !data.isSaved) throw new Error(data.message || 'Save failed');
    updateUser({ ...user, [field]: data[field] || [...current, item.id] }); reply(language === 'te' ? `“${item.title}” save chesanu.` : language === 'hi' ? `“${item.title}” सेव कर दिया।` : `Saved “${item.title}”.`, true, language); track('save', `${item.type}:${item.id}`); return true;
  };

  const resolveContentRequest = async (request: string, language: Language) => {
    setBusy(true); try {
      const response = await fetch('/api/navigator/content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ request }) }); const data = await response.json();
      if (!response.ok || !data.success) {
        const alternative = data.alternative?.title ? ` ${language === 'te' ? `Closest available: ${data.alternative.title}. “Latest ${data.alternative.path?.startsWith('/articles') ? 'article' : data.alternative.path?.startsWith('/news') ? 'news' : 'blog'} open chey” ani adagandi.` : language === 'hi' ? `सबसे नज़दीकी उपलब्ध सामग्री: ${data.alternative.title}।` : `Closest available: ${data.alternative.title}. Ask me to open the latest one.`}` : '';
        reply(`${data.message || 'No matching published content was found.'}${alternative}`, true, language); track('content_open', request, false); return;
      }
      const item = data.data as { id: string; type: ContentType; path: string; title: string; language: string; explain: boolean; read: boolean; navigate: boolean; save: boolean };
      setContext(previous => ({ ...previous, currentContentId: item.id, currentContentType: item.type, currentSlug: item.path.split('/').pop(), currentTitle: item.title, previousAction: item.save ? 'save' : 'content', detectedLanguage: language }));
      if (item.save && !(await saveResolvedContent(item, language))) return;
      if (item.navigate) { if (!item.save) reply(say(language, 'opening', item.title), true, language); pendingContentRef.current = { explain: item.explain, read: item.read, title: item.title, language }; router.push(item.path); }
      else if (item.explain) await askAI(`Explain ${item.title} using the available current context.`, language); else if (!item.save) reply(say(language, 'found', item.title), true, language);
    } catch (error) { reply(error instanceof Error ? error.message : say(language, 'failed'), true, language); track('content_open', request, false); } finally { setBusy(false); }
  };

  const searchSite = async (query: string, language: Language, openBest: boolean) => {
    setBusy(true); try {
      const cacheKey = query.toLowerCase().trim(); let results = searchCacheRef.current.get(cacheKey);
      if (!results) { const response = await fetch(`/api/navigator/search?q=${encodeURIComponent(query)}`); const data = await response.json(); if (!response.ok || !data.success) throw new Error(data.message); results = data.data as SearchResult[]; searchCacheRef.current.set(cacheKey, results); }
      setContext(previous => ({ ...previous, lastSearchResults: results || [], previousAction: 'search' }));
      if (!results.length) { reply(language === 'te' ? 'Exact result dorakaledu. Vere keyword tho try cheyyandi.' : language === 'hi' ? 'सटीक परिणाम नहीं मिला। दूसरा शब्द आज़माएँ।' : 'No exact result was found. Try another keyword.', true, language); return; }
      if (openBest) navigate(results[0].path, results[0].title, language);
      else reply(`${say(language, 'found', results.slice(0, 3).map(item => `${item.title} (${item.type})`).join(', '))}`, true, language);
      track('tool_open', results[0]?.path);
    } catch { reply(say(language, 'failed'), true, language); track('search', query, false); } finally { setBusy(false); }
  };

  const adjacentContent = async (direction: 'next' | 'previous', language: Language) => {
    stopSpeech();
    const match = pathname.match(/^\/(blog|articles|news)\/([^/]+)/); const type = context.currentContentType || (match?.[1] === 'articles' ? 'article' : match?.[1] as ContentType); const slug = context.currentSlug || match?.[2];
    if (!type || !slug) return reply(language === 'te' ? 'Munduga blog, article లేదా news open cheyyandi.' : language === 'hi' ? 'पहले कोई ब्लॉग, लेख या समाचार खोलें।' : 'Open a blog, article, or news item first.', true, language);
    setBusy(true); try { const response = await fetch(`/api/navigator/adjacent?type=${type}&slug=${encodeURIComponent(slug)}&direction=${direction}`); const data = await response.json(); if (!response.ok || !data.success) throw new Error(data.message); const item = data.data; setContext(previous => ({ ...previous, currentContentId: item.id, currentSlug: item.slug, currentTitle: item.title, previousAction: direction })); navigate(item.path, item.title, language); } catch (error) { reply(error instanceof Error ? error.message : say(language, 'failed'), true, language); } finally { setBusy(false); }
  };

  const copyPage = async (language: Language) => { try { await navigator.clipboard.writeText(window.getSelection()?.toString().trim() || window.location.href); reply(language === 'te' ? 'Copy chesanu.' : language === 'hi' ? 'कॉपी कर दिया।' : 'Copied.', true, language); track('copy', pathname); } catch { reply(say(language, 'failed'), true, language); } };
  const sharePage = async (language: Language) => { try { if (navigator.share) await navigator.share({ title: document.title, url: window.location.href }); else await navigator.clipboard.writeText(window.location.href); reply(language === 'te' ? 'Share link ready.' : language === 'hi' ? 'शेयर लिंक तैयार है।' : 'Share link is ready.', true, language); track('share', pathname); } catch (error) { if ((error as DOMException)?.name !== 'AbortError') reply(say(language, 'failed'), true, language); } };

  const saveCurrentItem = async (language: Language) => {
    if (!isAuthenticated || !user) { reply(language === 'te' ? 'Save cheyyadaniki login avvandi.' : language === 'hi' ? 'सेव करने के लिए लॉग इन करें।' : 'Please log in to save this item.', false, language); setLoginOpen(true); return; }
    if (context.currentContentId && context.currentContentType && context.currentTitle) { await saveResolvedContent({ id: context.currentContentId, type: context.currentContentType, title: context.currentTitle }, language); return; }
    const contentMatch = pathname.match(/^\/(blog|articles|news)\/([^/]+)/);
    if (contentMatch) {
      const type: ContentType = contentMatch[1] === 'articles' ? 'article' : contentMatch[1] as ContentType;
      const apiType = type === 'article' ? 'articles' : type === 'blog' ? 'blogs' : 'news';
      const response = await fetch(`/api/${apiType}/${contentMatch[2]}`); const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || 'Content not found');
      await saveResolvedContent({ id: String(data.data._id), type, title: data.data.title }, language); return;
    }
    const toolMatch = pathname.match(/^\/tools\/([^/]+)/);
    if (toolMatch) {
      const slug = toolMatch[1]; if (user.savedTools?.includes(slug)) { reply(language === 'te' ? 'Ee tool already saved undi.' : language === 'hi' ? 'यह टूल पहले से सेव है।' : 'This tool is already saved.', true, language); return; }
      const response = await fetch(getEndpoint(`/api/auth/tools/${encodeURIComponent(slug)}/star`), { method: 'PUT', credentials: 'include' }); const data = await response.json(); if (!response.ok || !data.success) throw new Error(data.message || 'Save failed'); updateUser({ ...user, savedTools: data.savedTools }); reply(language === 'te' ? 'Tool save chesanu.' : language === 'hi' ? 'टूल सेव कर दिया।' : 'Tool saved.', true, language); track('save', `tool:${slug}`); return;
    }
    const promptMatch = pathname.match(/^\/prompts\/[^/]+\/([^/]+)/);
    if (promptMatch) {
      const favoritesResponse = await fetch('/api/prompts/favorites/me', { credentials: 'include' }); const favorites = await favoritesResponse.json();
      if (favoritesResponse.ok && favorites.data?.some((item: { slug: string }) => item.slug === promptMatch[1])) { reply(language === 'te' ? 'Ee prompt already saved undi.' : language === 'hi' ? 'यह प्रॉम्प्ट पहले से सेव है।' : 'This prompt is already saved.', true, language); return; }
      const response = await fetch(`/api/prompts/${promptMatch[1]}/favorite`, { method: 'POST', credentials: 'include' }); const data = await response.json(); if (!response.ok || !data.success || !data.data?.isFavorite) throw new Error(data.message || 'Save failed'); reply(language === 'te' ? 'Prompt save chesanu.' : language === 'hi' ? 'प्रॉम्प्ट सेव कर दिया।' : 'Prompt saved.', true, language); track('save', `prompt:${promptMatch[1]}`); return;
    }
    const lessonMatch = pathname.match(/^\/learn\/([^/]+)\/([^/]+)/);
    if (lessonMatch) {
      const detailResponse = await fetch(`/api/learn/courses/${lessonMatch[1]}/lessons/${lessonMatch[2]}`); const detail = await detailResponse.json(); if (!detailResponse.ok || !detail.lesson?._id) throw new Error('Lesson not found');
      const response = await fetch(`/api/learn/bookmarks/${detail.lesson._id}`, { method: 'POST', credentials: 'include' }); if (!response.ok) throw new Error('Bookmark failed'); reply(language === 'te' ? 'Lesson bookmark chesanu.' : language === 'hi' ? 'पाठ बुकमार्क कर दिया।' : 'Lesson bookmarked.', true, language); track('save', `lesson:${detail.lesson._id}`); return;
    }
    reply(language === 'te' ? 'Ee page ki save option available ledu.' : language === 'hi' ? 'इस पेज पर सेव विकल्प उपलब्ध नहीं है।' : 'Saving is not available for this page.', true, language);
  };

  // Navigation completion intentionally triggers the queued action only on pathname changes.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { const pending = pendingContentRef.current; if (!pending || (!pending.explain && !pending.read)) return; pendingContentRef.current = null; const timer = window.setTimeout(() => pending.read ? readPage(pending.language) : void askAI(`Explain this page simply. Selected content: ${pending.title}.`, pending.language), 800); return () => window.clearTimeout(timer); }, [pathname]);

  const handleCommand = async (raw: string) => {
    const command = raw.trim(); if (!command || busy) return;
    const language = detectLanguage(); setContext(previous => ({ ...previous, detectedLanguage: language })); track('detected_language', language);
    setMessages(previous => [...previous, { role: 'user', text: command }]); setInput(''); const lower = command.toLowerCase().replace(/[?.!]/g, '');
    if (/^(go )?back$|venakki|पीछे/.test(lower)) { stopSpeech(); reply(say(language, 'back'), true, language); router.back(); track('intent_type', 'back'); return; }
    if (/^(stop|wait|stop speaking|be quiet|mute)$|aapu|ఆపు|रुको|चुप/.test(lower)) { stopSpeech(); if (lower.includes('mute')) setVoiceEnabled(false); reply(say(language, 'stopped'), false, language); return; }
    if (/^(pause|pause reading)$|ఆపు చదవడం|रोक दो/.test(lower)) { window.speechSynthesis?.pause(); setSpeaking(false); reply(say(language, 'paused'), false, language); return; }
    if (/^(resume|continue reading)$|కొనసాగించు|जारी रखो/.test(lower)) { window.speechSynthesis?.resume(); setSpeaking(true); return; }
    if (/next section|తర్వాతి భాగం|अगला भाग/.test(lower)) { window.speechSynthesis?.cancel(); speakChunk(speechIndexRef.current + 1, language); return; }
    if (/next (blog|article|news|one)|తర్వాతి|अगला/.test(lower)) { await adjacentContent('next', language); return; }
    if (/previous (blog|article|news|one)|మునుపటి|पिछला/.test(lower)) { await adjacentContent('previous', language); return; }
    if (/read (this|the|current|it)|చదువు|చదివి|पढ़ो/.test(lower)) { readPage(language); return; }
    if (/simple|simply|explain|summar|వివరించు|సింపుల్|समझाओ|सारांश/.test(lower) && (/this|it|page|దీని|ఇది|इसे|यह/.test(lower) || context.previousAction === 'read' || Boolean(context.currentContentId) || /^\/(blog|articles|news)\//.test(pathname))) { stopSpeech(); await askAI(command, language); return; }
    // From this point onward a new action replaces any active read-aloud session.
    stopSpeech();
    if (/copy|కాపీ|कॉपी/.test(lower)) { await copyPage(language); return; }
    if (/share|షేర్|साझा/.test(lower)) { await sharePage(language); return; }
    if (/save|bookmark|సేవ్|बुकमार्क/.test(lower) && !/(blog|article|news|post|బ్లాగ్|ఆర్టికల్|న్యూస్|ब्लॉग|लेख|समाचार)/.test(lower)) { try { await saveCurrentItem(language); } catch { reply(say(language, 'failed'), true, language); track('save', pathname, false); } return; }
    const mentionsContent = /(blog|article|news|post|బ్లాగ్|ఆర్టికల్|న్యూస్|ब्लॉग|लेख|समाचार)/i.test(command);
    const specific = /(today|latest|newest|recent|yesterday|aaj|kal|eeroju|ninna|save|bookmark|ఈరోజు|నిన్న|సేవ్|आज|कल|सेव|\b\d{1,2}(?:st|nd|rd|th)?\b|january|february|march|april|may|june|july|august|september|october|november|december)/i.test(command);
    if (mentionsContent && specific) { await resolveContentRequest(command, language); return; }
    const actionWords = /(open|open chey|show|go|take me|teesukellu|chupinchu|kholo|dikhao|చూపించు|ఓపెన్|తీసుకెళ్ళు|खोलो|दिखाओ)/i;
    const direct = ROUTES.map(item => ({ item, matchedLength: Math.max(0, ...item.terms.filter(term => lower.includes(term)).map(term => term.length)) })).filter(match => match.matchedLength > 0).sort((a, b) => b.matchedLength - a.matchedLength)[0]?.item;
    if (direct && actionWords.test(lower)) { navigate(direct.path, direct.label, language); return; }
    const relatedQuery = /(related|సంబంధిత|संबंधित)/i.test(command) && context.currentTitle ? context.currentTitle.split(/\s+/).slice(0, 6).join(' ') : '';
    const need = relatedQuery || lower.replace(/\b(open|show|find|search|recommend|need|want|me|a|an|the|tool|tools|prompt|prompts|course|courses|please)\b/g, ' ').replace(/\s+/g, ' ').trim();
    if (actionWords.test(lower) && need.length > 1) { await searchSite(need, language, true); return; }
    if (/(find|search|recommend|need|want|tool|prompt|course|చూపించు|కావాలి|వెతుకు|चाहिए|ढूंढो)/i.test(command) && need.length > 1) { await searchSite(need, language, /(open|find|need|want|కావాలి|खोलो|चाहिए)/i.test(command)); return; }
    await askAI(command, language);
  };

  const submit = (event: FormEvent) => { event.preventDefault(); void handleCommand(input); };
  const toggleMic = () => { if (autoListenRef.current) { autoListenRef.current = false; setMicEnabled(false); setMicStatus('Microphone off'); recognitionRef.current?.stop(); recognitionRef.current = null; setListening(false); return; } autoListenRef.current = true; setMicEnabled(true); setMicStatus('Starting microphone…'); startMicrophone(); };
  const openPanel = () => { openRef.current = true; autoListenRef.current = false; setMicEnabled(false); setMicStatus('Microphone off'); setContext(previous => ({ ...previous, detectedLanguage: 'en' })); setOpen(true); setVoiceEnabled(true); track('assistant_open'); greetedRef.current = true; };
  const closePanel = () => { openRef.current = false; autoListenRef.current = false; voiceCommandPendingRef.current = false; setMicEnabled(false); setMicStatus('Microphone off'); if (greetingTimerRef.current) clearTimeout(greetingTimerRef.current); if (voiceTypingTimerRef.current) clearInterval(voiceTypingTimerRef.current); voiceTypingTimerRef.current = null; recognitionRef.current?.stop(); recognitionRef.current = null; stopSpeech(); setListening(false); setOpen(false); };

  if (pathname === '/login' || pathname === '/signup') return null;

  return <div ref={navigatorRef} className="fixed right-3 z-[180] transition-[bottom] duration-150 sm:right-6" style={{ bottom: open ? viewportBottom : navigatorBottom }}>
    <LoginPopup isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    {open && <section className="mb-3 h-[min(500px,65dvh)] w-[calc(100vw-1.5rem)] overflow-hidden rounded-[24px] border border-indigo-200/80 bg-white shadow-[0_24px_70px_rgba(30,41,59,0.24)] flex flex-col sm:h-[min(650px,calc(100dvh-7rem))] sm:w-[410px] sm:rounded-[28px]" role="dialog" aria-label="QuickTool AI Navigator">
      <header className="bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 text-white px-4 py-3.5 flex items-center justify-between"><div className="flex items-center gap-3"><div className={`w-12 h-10 overflow-hidden ${speaking || listening ? 'animate-pulse' : ''}`}><Lottie animationData={quickToolsAiAnimation} loop autoplay className="w-full h-full -translate-x-[12%] scale-[1.9] pointer-events-none" aria-hidden /></div><div><h2 className="font-black tracking-tight">QuickTool AI</h2><p className="max-w-[220px] truncate text-[11px] font-medium text-white/80">{speaking ? `Speaking · section ${speechSection}` : micEnabled ? micStatus : 'Microphone off'}</p></div></div><div className="flex items-center gap-1"><button onClick={() => { setVoiceEnabled(value => !value); stopSpeech(); }} className="p-2 rounded-xl hover:bg-white/15 transition-colors" aria-label={voiceEnabled ? 'Turn voice off' : 'Turn voice on'}>{voiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button><button onClick={closePanel} className="p-2 rounded-xl hover:bg-white/15 transition-colors" aria-label="Close navigator"><X className="w-5 h-5" /></button></div></header>
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-slate-50 via-white to-indigo-50/40 p-4 space-y-4" aria-live="polite">{messages.map((message, index) => <div key={`${message.role}-${index}`} className={`flex items-end gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>{message.role === 'assistant' && <span className="mb-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-blue-500 text-[10px] font-black text-white shadow-sm">AI</span>}<div className={`max-w-[82%] px-4 py-3 rounded-[20px] text-sm leading-relaxed ${message.role === 'user' ? 'bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-200/60 rounded-br-md' : 'bg-white text-slate-700 border border-slate-200/80 shadow-[0_5px_18px_rgba(15,23,42,0.07)] rounded-bl-md'}`}>{message.role === 'assistant' ? <TypewriterMessage text={message.text} /> : message.text}</div></div>)}{busy && <div className="ml-9 flex w-fit items-center gap-1 rounded-2xl border border-indigo-100 bg-white px-4 py-3 shadow-sm"><span className="h-2 w-2 animate-bounce rounded-full bg-indigo-400 [animation-delay:-0.3s]" /><span className="h-2 w-2 animate-bounce rounded-full bg-indigo-500 [animation-delay:-0.15s]" /><span className="h-2 w-2 animate-bounce rounded-full bg-indigo-600" /></div>}<div ref={endRef} /></div>
      {speechActive && <div className="px-4 py-2 border-t bg-white flex items-center justify-center gap-2"><button onClick={() => { window.speechSynthesis.pause(); setSpeaking(false); }} disabled={!speaking} className="p-2 rounded-lg bg-slate-100 disabled:opacity-40" aria-label="Pause"><Pause className="w-4 h-4" /></button><button onClick={() => { window.speechSynthesis.resume(); setSpeaking(true); }} disabled={speaking} className="p-2 rounded-lg bg-slate-100 disabled:opacity-40" aria-label="Resume"><Play className="w-4 h-4" /></button><button onClick={() => { window.speechSynthesis.cancel(); speakChunk(speechIndexRef.current + 1, context.detectedLanguage); }} className="p-2 rounded-lg bg-indigo-50 text-indigo-600" aria-label="Next section"><ChevronRight className="w-4 h-4" /></button><button onClick={stopSpeech} className="p-2 rounded-lg bg-red-50 text-red-600" aria-label="Stop"><Square className="w-4 h-4" /></button></div>}
      <div className="flex gap-2 overflow-x-auto border-t border-indigo-100 bg-white px-3 pt-3 [scrollbar-width:none]">{[['Open today’s blog', 'Today blog'], ['Find a resume tool', 'Resume tool'], ['Explain this page in simple English', 'Explain page']].map(([command, label]) => <button key={command} onClick={() => void handleCommand(command)} disabled={busy} className="shrink-0 rounded-full border border-indigo-100 bg-gradient-to-b from-white to-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700 shadow-sm transition hover:border-indigo-200 hover:shadow">{label}</button>)}</div>
      <form onSubmit={submit} className="bg-white p-3"><div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50/80 p-1.5 shadow-inner"><button type="button" onClick={toggleMic} className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all ${listening ? 'bg-gradient-to-br from-rose-500 to-red-500 text-white shadow-md shadow-red-200 animate-pulse' : 'bg-white text-indigo-600 shadow-sm hover:bg-indigo-50'}`} aria-label={listening ? 'Stop listening' : 'Start voice'}>{speechSupported ? listening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}</button><input value={input} onChange={event => setInput(event.target.value)} placeholder="Ask QuickTool AI…" className="h-11 min-w-0 flex-1 bg-transparent px-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none" disabled={busy} /><button type="submit" disabled={!input.trim() || busy} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-200 transition hover:scale-105 disabled:opacity-40 disabled:hover:scale-100" aria-label="Send"><Send className="w-5 h-5" /></button></div><div className="mt-2 flex justify-between items-center"><p className="text-[10px] text-slate-400">Click the mic and speak, or type your request.</p><div className="flex gap-1"><button type="button" onClick={() => track('thumbs_up')} aria-label="Helpful" className="rounded-lg p-1 text-slate-400 hover:bg-green-50 hover:text-green-600"><ThumbsUp className="w-3.5 h-3.5" /></button><button type="button" onClick={() => track('thumbs_down')} aria-label="Not helpful" className="rounded-lg p-1 text-slate-400 hover:bg-red-50 hover:text-red-600"><ThumbsDown className="w-3.5 h-3.5" /></button></div></div></form>
    </section>}
    {!open && <div className="quicktools-robot-message relative mb-1 ml-auto w-[min(280px,calc(100vw-2rem))] rounded-2xl border border-teal-100 bg-white/95 px-4 py-3 shadow-[0_10px_28px_rgba(15,118,110,0.14)] backdrop-blur-sm" aria-hidden><p className="min-h-10 text-sm font-semibold leading-5 text-slate-700">{assistantIntro}<span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-teal-500 align-middle" /></p><span className="absolute -bottom-2 right-9 h-4 w-4 rotate-45 border-b border-r border-teal-100 bg-white" /></div>}
    {!open && <button onClick={openPanel} className="relative ml-auto flex h-24 w-24 items-center justify-center overflow-hidden bg-transparent shadow-none transition-transform hover:scale-105 sm:h-28 sm:w-28" aria-label="Open QuickTool AI"><Lottie animationData={quickToolsAiAnimation} loop autoplay className="w-full h-full -translate-x-[12%] scale-[1.85] pointer-events-none" aria-hidden /></button>}
  </div>;
}
