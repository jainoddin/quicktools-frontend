import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ChevronRight, ArrowRight, Check, Home } from 'lucide-react';
import ShareButtons from '../../../components/blog/ShareButtons';
import type { Metadata } from 'next';

// Simple markdown parser helper
const parseMarkdown = (text: string) => {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#111827]">$1</strong>')
    .replace(/!\[([^\]]+)\]\(([^)]+)\)/g, '</p><div class="my-8 rounded-xl overflow-hidden border border-[#E5E7EB]"><img src="$2" alt="$1" class="w-full h-auto object-cover" loading="lazy" /></div><p class="text-[#4B5563] text-lg leading-relaxed mb-6">')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#4F46E5] font-semibold hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/\n\n/g, '</p><p class="text-[#4B5563] text-lg leading-relaxed mb-6">')
    .replace(/\n/g, ' ');
};

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await fetch(`http://localhost:5000/api/news/${slug}`);
    if (res.ok) {
      const json = await res.json();
      const news = json.data;
      return {
        title: news.metaTitle || `${news.title} | QuickTools News`,
        description: news.metaDescription || news.summary,
        openGraph: {
          title: news.metaTitle,
          description: news.metaDescription,
          images: [news.heroImage],
          type: 'article',
        },
      };
    }
  } catch (e) {}
  return { title: 'News Not Found' };
}

export default async function NewsDetailPage({ params }: any) {
  const { slug } = await params;

  const res = await fetch(`http://localhost:5000/api/news/${slug}`, {
    next: { revalidate: 300 }
  });

  if (!res.ok) {
    return notFound();
  }

  const { data: news, relatedNews } = await res.json();
  const canonicalUrl = `https://quicktools.ai/news/${slug}`;

  // Fetch Top Tools
  let topTools = [];
  try {
    const toolsRes = await fetch(`http://localhost:5000/api/tools?limit=4`, { next: { revalidate: 3600 } });
    if (toolsRes.ok) {
      const tData = await toolsRes.json();
      topTools = tData.data || [];
    }
  } catch (e) {
    console.error("Failed to fetch tools", e);
  }

  return (
    <div className="min-h-screen bg-white pb-20 pt-[15px]">
      {/* JSON-LD NewsArticle Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "NewsArticle",
              "headline": news.title,
              "image": [news.heroImage],
              "datePublished": news.publishedAt,
              "dateModified": news.updatedAt || news.publishedAt,
              "author": [{
                "@type": "Person",
                "name": news.author.name,
              }],
              "publisher": {
                "@type": "Organization",
                "name": "QuickTools AI",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://quicktools.ai/icon.svg"
                }
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://quicktools.ai/" },
                { "@type": "ListItem", "position": 2, "name": "News", "item": "https://quicktools.ai/news" },
                { "@type": "ListItem", "position": 3, "name": news.category, "item": `https://quicktools.ai/news?category=${encodeURIComponent(news.category)}` },
                { "@type": "ListItem", "position": 4, "name": news.title, "item": `https://quicktools.ai/news/${news.slug}` }
              ]
            }
          ])
        }}
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb - Spans full width above columns */}
        <nav className="flex items-center space-x-2 text-xs md:text-sm font-medium text-[#6B7280] mb-[25px] overflow-x-auto whitespace-nowrap pb-2 [&::-webkit-scrollbar]:hidden">
          <Link href="/" className="hover:text-[#111827] transition-colors flex items-center gap-1.5">
            <Home className="w-4 h-4" /> Home
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
          <Link href="/news" className="hover:text-[#111827] transition-colors">News</Link>
          <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
          <Link href={`/news?category=${encodeURIComponent(news.category)}`} className="hover:text-[#111827] transition-colors">{news.category}</Link>
          <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
          <span className="text-[#4F46E5] font-bold truncate max-w-[200px] sm:max-w-md">{news.title}</span>
        </nav>

        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT SIDEBAR (TOC & Promo) */}
          <aside className="hidden xl:block col-span-2 space-y-8 sticky top-24 self-start pb-10">
            <div>
              <h3 className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider mb-4">On This Page</h3>
              <ul className="space-y-3 border-l-2 border-gray-100 ml-2 pl-4">
                {news.whatHappened && <li><a href="#section-1" className="text-sm font-medium text-gray-500 hover:text-[#4F46E5] block py-1">1. What Happened?</a></li>}
                {news.keyHighlights && news.keyHighlights.length > 0 && <li><a href="#section-2" className="text-sm font-medium text-gray-500 hover:text-[#4F46E5] block py-1">2. Key Highlights</a></li>}
                {news.whyItMatters && <li><a href="#section-3" className="text-sm font-medium text-gray-500 hover:text-[#4F46E5] block py-1">3. Why It Matters</a></li>}
                {news.industryReaction && <li><a href="#section-4" className="text-sm font-medium text-gray-500 hover:text-[#4F46E5] block py-1">4. Industry Reaction</a></li>}
                {news.quickToolsInsight && <li><a href="#section-5" className="text-sm font-medium text-gray-500 hover:text-[#4F46E5] block py-1">5. QuickTools Insight</a></li>}
                {news.conclusion && <li><a href="#section-6" className="text-sm font-medium text-gray-500 hover:text-[#4F46E5] block py-1">6. Conclusion</a></li>}
              </ul>
            </div>
            
            {/* Top Tools Widget */}
            <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-sm mt-12">
              <h3 className="font-bold text-[#111827] mb-4 text-sm flex items-center gap-2">
                <span className="text-lg">🔥</span> Trending Tools
              </h3>
              <div className="space-y-4">
                {topTools.length > 0 ? topTools.map((tool: any, idx: number) => (
                  <Link href={`/tools/${tool.slug || tool._id}`} key={idx} className="flex gap-3 group items-center">
                    <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-gray-100 bg-gray-50 flex items-center justify-center relative">
                      {tool.image ? (
                        <Image src={tool.image} fill alt={tool.title || tool.name || 'Tool'} className="object-cover" unoptimized />
                      ) : (
                        <span className="text-xs font-bold text-gray-400">AI</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-[#111827] truncate group-hover:text-[#4F46E5] transition-colors leading-tight">
                        {tool.title || tool.name}
                      </h4>
                      <p className="text-[10px] text-[#6B7280] truncate mt-0.5">
                        {tool.category || 'AI Tool'}
                      </p>
                    </div>
                  </Link>
                )) : (
                  <p className="text-xs text-[#6B7280]">Loading tools...</p>
                )}
              </div>
              <Link href="/tools" className="mt-5 w-full flex items-center justify-center gap-1.5 text-xs font-bold text-[#4F46E5] bg-[#EEF2FF] hover:bg-[#E0E7FF] px-4 py-2.5 rounded-xl transition-colors">
                Explore all tools <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </aside>

          {/* MAIN CONTENT CENTER */}
          <main className="col-span-12 lg:col-span-7 xl:col-span-7 min-w-0">
            
            {news.isBreaking ? (
              <div className="mb-6 inline-flex items-center gap-2 bg-[#FEF2F2] text-[#DC2626] text-[10px] font-bold px-3 py-1.5 rounded-full border border-[#FCA5A5]/30 tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] animate-pulse"></span>
                BREAKING NEWS
              </div>
            ) : (
              <span className="inline-block bg-[#EEF2FF] text-[#4F46E5] text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-6">
                {news.category}
              </span>
            )}

            <h1 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold text-[#111827] leading-[1.15] tracking-tight mb-8">
              {news.title}
            </h1>

            <p className="text-xl text-[#4B5563] leading-relaxed mb-8 border-l-4 border-[#4F46E5] pl-5 font-medium">
              {news.summary}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-[#E5E7EB] mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                  <Image src={news.author.avatar} alt={news.author.name} width={48} height={48} className="object-cover" />
                </div>
                <div>
                  <div className="font-bold text-[#111827] flex items-center gap-1">
                    {news.author.name}
                    <div className="w-4 h-4 bg-[#4F46E5] rounded-full flex items-center justify-center text-white text-[10px]">✓</div>
                  </div>
                  <div className="text-sm text-gray-500 font-medium flex items-center gap-2">
                    <span>{new Date(news.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span>•</span>
                    <span>{news.readTime}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 self-start sm:self-auto">
                <span className="text-xs font-semibold text-[#6B7280]">Share:</span>
                <ShareButtons url={canonicalUrl} title={news.title} />
              </div>
            </div>

            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-12 shadow-sm border border-gray-100">
              <Image src={news.heroImage} alt={news.title} fill className="object-cover" priority unoptimized />
            </div>

            {/* In Short Box */}
            <div className="bg-[#F5F3FF] rounded-2xl p-8 mb-12 border border-[#E0E7FF] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              <h2 className="text-xl font-bold text-[#4F46E5] mb-5 flex items-center gap-2 relative z-10">
                <span className="text-2xl">⚡</span> In Short
              </h2>
              <ul className="space-y-4 relative z-10">
                {news.keyHighlights?.map((point: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-[#374151] font-medium leading-relaxed">
                    <div className="mt-1 bg-white rounded-full p-1 shadow-sm text-[#4F46E5] shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-[#111827] prose-a:text-[#4F46E5]">
              
              {news.whatHappened && (
                <>
                  <h2 id="section-1" className="text-2xl font-bold mb-4 mt-12 scroll-mt-32">What Happened?</h2>
                  <div className="text-[#4B5563] text-lg leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: parseMarkdown(news.whatHappened) }}></div>
                </>
              )}

              {news.keyHighlights && news.keyHighlights.length > 0 && (
                <>
                  <h2 id="section-2" className="text-2xl font-bold mb-6 mt-12 scroll-mt-32">Key Highlights</h2>
                  <div className="space-y-4 mb-8">
                    {news.keyHighlights.map((hl: string, i: number) => (
                      <div key={i} className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50">
                        <div className="w-10 h-10 rounded-lg bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center shrink-0 font-bold">
                          {i + 1}
                        </div>
                        <p className="text-[#374151] font-medium pt-2">{hl}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {news.whyItMatters && (
                <>
                  <h2 id="section-3" className="text-2xl font-bold mb-4 mt-12 scroll-mt-32">Why It Matters</h2>
                  <div className="text-[#4B5563] text-lg leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: parseMarkdown(news.whyItMatters) }}></div>
                </>
              )}

              {news.industryReaction && (
                <>
                  <h2 id="section-4" className="text-2xl font-bold mb-4 mt-12 scroll-mt-32">Industry Reaction</h2>
                  <div className="text-[#4B5563] text-lg leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: parseMarkdown(news.industryReaction) }}></div>
                </>
              )}

              {news.quickToolsInsight && (
                <>
                  <div className="bg-[#FEF9C3] rounded-2xl p-6 my-10 border border-[#FEF08A]">
                    <h2 id="section-5" className="text-lg font-bold text-[#854D0E] mb-3 flex items-center gap-2 scroll-mt-32">
                      <span className="text-xl">💡</span> QuickTools Insight
                    </h2>
                    <div className="text-[#713F12] font-medium" dangerouslySetInnerHTML={{ __html: parseMarkdown(news.quickToolsInsight) }}></div>
                  </div>
                </>
              )}

              {news.conclusion && (
                <>
                  <h2 id="section-6" className="text-2xl font-bold mb-4 mt-12 scroll-mt-32">Conclusion</h2>
                  <div className="text-[#4B5563] text-lg leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: parseMarkdown(news.conclusion) }}></div>
                </>
              )}

            </div>

            {/* Bottom Share Box */}
            <div className="bg-[#F9FAFB] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 border border-[#E5E7EB]">
              <span className="font-bold text-[#111827] text-sm">Found this news helpful? Share it with your network!</span>
              <ShareButtons url={canonicalUrl} title={news.title} />
            </div>
            
          </main>

          {/* RIGHT SIDEBAR (Author, News, Related) */}
          <aside className="col-span-12 lg:col-span-5 xl:col-span-3 space-y-8 sticky top-24 self-start pb-10">

            {/* Related News Widget */}
            {relatedNews && relatedNews.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-sm">
                <h3 className="font-bold text-[#111827] mb-5 text-lg">Related News</h3>
                <div className="space-y-5">
                  {relatedNews.map((rn: any, idx: number) => (
                    <Link href={`/news/${rn.slug}`} key={idx} className="flex gap-4 group items-center">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-gray-100 relative bg-gray-50">
                        <Image src={rn.heroImage} fill alt={rn.title} className="object-cover group-hover:scale-110 transition-transform duration-500" unoptimized />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-[13px] font-bold text-[#111827] leading-tight group-hover:text-[#4F46E5] transition-colors line-clamp-2 mb-1.5">
                          {rn.title}
                        </h4>
                        <p className="text-[10px] text-gray-400 font-semibold tracking-wider">
                          {new Date(rn.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href="/news" className="block text-center text-[#4F46E5] font-bold text-sm mt-6 hover:underline">
                  View all news →
                </Link>
              </div>
            )}

            {/* Newsletter Box */}
            <div className="bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
              <div className="flex items-center gap-2 mb-2 relative z-10">
                <span className="text-xl">📫</span>
                <h3 className="font-bold text-lg">Stay Updated</h3>
              </div>
              <p className="text-sm text-indigo-100 mb-5 relative z-10">
                Get the latest AI news straight to your inbox.
              </p>
              <form className="relative z-10 flex flex-col gap-3">
                <input type="email" placeholder="Enter your email" className="w-full px-4 py-3 rounded-xl text-sm text-gray-900 border-0 focus:ring-2 focus:ring-white/50 bg-white/95" required />
                <button type="submit" className="w-full bg-white text-[#4F46E5] font-bold text-sm px-4 py-3 rounded-xl hover:bg-indigo-50 transition-colors shadow-sm">
                  Subscribe
                </button>
              </form>
              <p className="text-[10px] text-indigo-200 mt-4 text-center relative z-10">
                No spam. Unsubscribe anytime.
              </p>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}
