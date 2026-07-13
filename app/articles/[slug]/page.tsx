import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { 
  ChevronRight, 
  Home, 
  Link as LinkIcon, 
  CheckCircle2, 
  ArrowRight,
  Mail,
  Check
} from 'lucide-react';
import ShareButtons from '@/components/blog/ShareButtons';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://quicktool.space';

// ── Dynamic SEO Metadata ────────────────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await fetch(`http://localhost:5000/api/articles/${slug}`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return { title: 'Article Not Found' };
    const data = await res.json();
    const a = data.data;
    const canonicalUrl = `${BASE_URL}/articles/${slug}`;

    return {
      title: a.metaTitle || a.title,
      description: a.metaDescription || a.description,
      alternates: { canonical: canonicalUrl },
      openGraph: {
        type: 'article',
        url: canonicalUrl,
        title: a.metaTitle || a.title,
        description: a.metaDescription || a.description,
        images: [{ url: a.coverImage, width: 1200, height: 630, alt: a.title }],
        publishedTime: new Date(a.publishedAt).toISOString(),
        authors: [a.author?.name || 'QuickTools AI Team'],
        tags: a.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: a.metaTitle || a.title,
        description: a.metaDescription || a.description,
        images: [a.coverImage],
      },
      robots: { index: true, follow: true },
    };
  } catch {
    return { title: 'Article | QuickTools.ai' };
  }
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // Next.js 15: await params before accessing properties
  const { slug } = await params;

  const res = await fetch(`http://localhost:5000/api/articles/${slug}`, {
    next: { revalidate: 3600 }
  });
  
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
  
  if (!res.ok) {
    return <div className="p-20 text-center font-bold text-2xl">Article not found</div>;
  }
  
  const data = await res.json();
  const article = data.data;

  // We map the backend tableOfContents format to ensure isActive exists
  const tableOfContents = article.tableOfContents?.map((item: any, idx: number) => ({
    ...item,
    isActive: idx === 0
  })) || [];

  const relatedArticles = article.relatedArticles || [];
  const popularTags = article.tags || ['AI', 'Productivity', 'Tools'];

  // SEO Schema Generation
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.metaTitle || article.title,
    "description": article.metaDescription || article.description,
    "image": article.coverImage,
    "author": {
      "@type": "Person",
      "name": article.author?.name || "QuickTools AI Team",
      "url": "https://quicktools.ai/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "QuickTools AI",
      "logo": {
        "@type": "ImageObject",
        "url": "https://quicktools.ai/icon.svg"
      }
    },
    "datePublished": new Date(article.publishedAt).toISOString(),
    "dateModified": new Date(article.updatedAt || article.publishedAt).toISOString()
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://quicktools.ai/" },
      { "@type": "ListItem", "position": 2, "name": "Articles", "item": "https://quicktools.ai/articles" },
      { "@type": "ListItem", "position": 3, "name": article.category, "item": `https://quicktools.ai/articles?category=${encodeURIComponent(article.category)}` },
      { "@type": "ListItem", "position": 4, "name": article.title, "item": `https://quicktools.ai/articles/${article.slug}` }
    ]
  };

  let faqSchema = null;
  if (article.faq && article.faq.length > 0) {
    faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": article.faq.map((f: any) => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.answer
        }
      }))
    };
  }

  let currentSectionId = 1;
  const formattedContent = article.content
    .replace(/^## (.*$)/gim, (match: any, title: string) => {
      const id = currentSectionId++;
      return `</p><h2 id="section-${id}" class="text-2xl sm:text-3xl font-bold mb-5 mt-12 scroll-mt-32 text-[#111827]">${title.trim()}</h2><p class="text-[#4B5563] text-lg leading-relaxed mb-6">`;
    })
    .replace(/^### (.*$)/gim, (match: any, title: string) => {
      return `</p><h3 class="text-xl sm:text-2xl font-bold mb-4 mt-8 text-[#111827]">${title.trim()}</h3><p class="text-[#4B5563] text-lg leading-relaxed mb-6">`;
    })
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#111827]">$1</strong>')
    .replace(/!\[([^\]]+)\]\(([^)]+)\)/g, '</p><div class="my-10 rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-sm"><img src="$2" alt="$1" class="w-full h-auto object-cover" loading="lazy" /></div><p class="text-[#4B5563] text-lg leading-relaxed mb-6">')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#4F46E5] font-semibold hover:underline border-b border-transparent hover:border-[#4F46E5] transition-colors" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/\n\n/g, '</p><p class="text-[#4B5563] text-lg leading-relaxed mb-6">')
    .replace(/\n/g, ' ');

  const finalHtml = `<p class="text-[#4B5563] text-lg leading-relaxed mb-6">${formattedContent}</p>`.replace(/<p[^>]*>\s*<\/p>/g, '');
  const canonicalUrl = `${BASE_URL}/articles/${article.slug}`;

  return (
    <>
      {/* Inject SEO Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      
      <div className="flex-grow bg-white text-[#111827] font-sans selection:bg-[#4F46E5] selection:text-white pb-20 pt-[15px]">
      
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb - Spans full width above columns */}
        <nav className="flex items-center space-x-2 text-xs md:text-sm font-medium text-[#6B7280] mb-[25px] overflow-x-auto whitespace-nowrap pb-2 [&::-webkit-scrollbar]:hidden">
          <Link href="/" className="hover:text-[#111827] transition-colors flex items-center gap-1.5">
            <Home className="w-4 h-4" /> Home
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
          <Link href="/articles" className="hover:text-[#111827] transition-colors">Articles</Link>
          <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
          <Link href="/articles?category=ai-tools" className="hover:text-[#111827] transition-colors">{article.category}</Link>
          <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
          <span className="text-[#4F46E5] font-bold truncate max-w-[200px] sm:max-w-md">{article.title}</span>
        </nav>

        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT SIDEBAR (TOC & Promo) */}
          <aside className="hidden xl:block col-span-2 space-y-8 sticky top-24 self-start pb-10">
            <div>
              <h3 className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider mb-4">On This Page</h3>
              <ul className="space-y-4">
                {tableOfContents.map((item: any) => (
                  <li key={item.id} className="flex">
                    <a 
                      href={`#section-${item.id}`} 
                      className={`text-xs md:text-sm leading-snug transition-colors ${item.isActive ? 'text-[#4F46E5] font-bold' : 'text-[#4B5563] hover:text-[#111827]'}`}
                    >
                      <span className="mr-1.5">{item.id}.</span>
                      {item.title}
                    </a>
                  </li>
                ))}
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
            
            {/* Header / Meta */}
            <div className="mb-8">
              <span className="inline-block bg-[#EEF2FF] text-[#4F46E5] text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-4">
                {article.category}
              </span>
              
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#111827] leading-[1.15] mb-5 tracking-tight">
                {article.title}
              </h1>
              
              <p className="text-lg text-[#4B5563] leading-relaxed mb-8">
                {article.description}
              </p>

              {/* Author & Share Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-y border-[#E5E7EB] py-4">
                
                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-[#E5E7EB] bg-gray-100 flex items-center justify-center">
                    <Image src="/icon.svg" width={22} height={22} alt={article.author.name} />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-sm text-[#111827]">{article.author.name}</span>
                      {article.author.isVerified && <CheckCircle2 className="w-3.5 h-3.5 text-[#4F46E5] fill-[#4F46E5]/10" />}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                      <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                      <span>•</span>
                      <span>{article.views || '1.2K views'}</span>
                    </div>
                  </div>
                </div>

                {/* Share Icons */}
                <div className="flex items-center gap-3 self-start sm:self-auto">
                  <span className="text-xs font-semibold text-[#6B7280]">Share:</span>
                  <ShareButtons url={canonicalUrl} title={article.title} />
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] rounded-2xl overflow-hidden mb-8 shadow-sm border border-gray-100">
              <Image src={article.coverImage} fill alt={article.title} className="object-cover" priority unoptimized />
            </div>

            {/* What You'll Learn box */}
            {article.whatYoullLearn && article.whatYoullLearn.length > 0 && (
              <div className="bg-[#EEF2FF] border border-[#C7D2FE] rounded-2xl p-6 mb-10">
                <h2 className="text-base font-bold text-[#4F46E5] mb-4 flex items-center gap-2">
                  <span className="text-xl">🎯</span> What You&apos;ll Learn
                </h2>
                <ul className="space-y-2">
                  {article.whatYoullLearn.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-[#374151]">
                      <Check className="w-4 h-4 text-[#4F46E5] shrink-0 mt-0.5" strokeWidth={3} />
                      <span className="text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Article Content Body (Markdown Style) */}
            <div className="prose prose-lg max-w-none prose-headings:text-[#111827] prose-p:text-[#4B5563] prose-a:text-[#4F46E5] prose-li:text-[#4B5563]" dangerouslySetInnerHTML={{ __html: finalHtml }} />
            
            {article.comparisonTable && article.comparisonTable.headers.length > 0 && (
              <div className="overflow-x-auto my-12">
                <h2 className="text-2xl font-bold mb-6 text-[#111827]">Comparison Table</h2>
                <table className="w-full border-collapse border border-[#E5E7EB] text-sm md:text-base rounded-xl overflow-hidden shadow-sm">
                  <thead>
                    <tr>
                      {article.comparisonTable.headers.map((h: string, i: number) => (
                        <th key={i} className="bg-[#F9FAFB] border border-[#E5E7EB] px-4 py-3 font-bold text-center">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {article.comparisonTable.rows.map((row: string[], i: number) => (
                      <tr key={i}>
                        {row.map((cell: string, j: number) => (
                          <td key={j} className="border border-[#E5E7EB] px-4 py-3 text-center text-[#4B5563]">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {article.prosAndCons && (article.prosAndCons.pros.length > 0 || article.prosAndCons.cons.length > 0) && (
              <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-[#166534] mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" /> Pros
                  </h3>
                  <ul className="space-y-3">
                    {article.prosAndCons.pros.map((pro: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-[#15803D]">
                        <span className="text-lg leading-none shrink-0">•</span> <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-[#991B1B] mb-4 flex items-center gap-2">
                    <span className="text-xl">✖</span> Cons
                  </h3>
                  <ul className="space-y-3">
                    {article.prosAndCons.cons.map((con: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-[#B91C1C]">
                        <span className="text-lg leading-none shrink-0">•</span> <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {article.faq && article.faq.length > 0 && (
              <div className="my-12">
                <h2 className="text-2xl font-bold mb-6 text-[#111827]">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {article.faq.map((faq: any, i: number) => (
                    <div key={i} className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
                      <h3 className="text-lg font-bold text-[#111827] mb-2">{faq.question}</h3>
                      <p className="text-[#4B5563] leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {article.internalLinks && article.internalLinks.length > 0 && (
              <div className="my-12 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-6 text-[#111827] flex items-center gap-2">
                  <span className="text-2xl">🔗</span> Keep Exploring
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {article.internalLinks.map((link: any, i: number) => (
                    <Link href={link.path} key={i} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-[#E5E7EB] hover:border-[#4F46E5] hover:shadow-md transition-all group">
                      <div className="bg-[#EEF2FF] p-2 rounded-lg text-[#4F46E5] shrink-0 group-hover:bg-[#4F46E5] group-hover:text-white transition-colors">
                        <LinkIcon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold text-[#111827] group-hover:text-[#4F46E5] transition-colors leading-snug">
                        {link.anchor}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {article.externalLinks && article.externalLinks.length > 0 && (
              <div className="mb-12 bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-6 text-[#111827] flex items-center gap-2">
                  <span className="text-2xl">🌐</span> Authoritative Sources
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {article.externalLinks.map((link: any, i: number) => (
                    <a href={link.url} key={i} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-4 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] hover:border-[#4F46E5] hover:shadow-md transition-all group">
                      <div className="bg-white p-2 rounded-lg text-[#4B5563] border border-[#E5E7EB] shrink-0 group-hover:border-[#4F46E5] group-hover:text-[#4F46E5] transition-colors">
                        <LinkIcon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold text-[#4B5563] group-hover:text-[#111827] transition-colors leading-snug">
                        {link.anchor}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Share Box */}
            <div className="bg-[#EEF2FF] rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 border border-[#E0E7FF]">
              <span className="font-bold text-[#111827] text-sm">Loved this article? Share it with your network!</span>
              <ShareButtons url={canonicalUrl} title={article.title} />
            </div>

          </main>

          {/* RIGHT SIDEBAR (Author, News, Related) */}
          <aside className="col-span-12 lg:col-span-5 xl:col-span-3 space-y-8 sticky top-24 self-start pb-10">
            
            {/* About the Author */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-[#111827] mb-5 text-sm">About the Author</h3>
              <div className="w-16 h-16 rounded-full overflow-hidden border border-[#E5E7EB] mb-4 bg-gray-100 flex items-center justify-center">
                <Image src="/icon.svg" width={32} height={32} alt={article.author.name} />
              </div>
              <div className="flex items-center gap-1 mb-2">
                <span className="font-bold text-[#111827]">{article.author.name}</span>
                {article.author.isVerified && <CheckCircle2 className="w-4 h-4 text-[#4F46E5] fill-[#4F46E5]/10" />}
              </div>
              <p className="text-[#4B5563] text-sm leading-relaxed mb-5">
                {article.author.bio}
              </p>
              <Link href="/articles" className="text-[#4F46E5] font-bold text-sm hover:text-[#4338CA] transition-colors inline-flex items-center gap-1 bg-[#EEF2FF] px-4 py-2 rounded-full border border-transparent hover:border-[#4F46E5]/20">
                View all posts <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Newsletter CTA */}
            <div className="bg-[#4F46E5] rounded-2xl p-6 shadow-lg text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm relative z-10 border border-white/20">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-2 relative z-10">Stay Ahead with AI</h3>
              <p className="text-white/80 text-xs leading-relaxed mb-5 relative z-10">
                Get the latest AI insights, tools and productivity tips delivered to your inbox.
              </p>
              <div className="space-y-2 relative z-10">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full px-4 py-2.5 bg-white rounded-xl text-sm text-[#111827] focus:outline-none placeholder:text-gray-400 font-medium"
                />
                <button className="w-full py-2.5 bg-[#4338CA] border border-white/10 text-white rounded-xl text-sm font-bold hover:bg-[#3730A3] transition-colors">
                  Subscribe
                </button>
              </div>
              <p className="text-[10px] text-white/50 text-center mt-3 relative z-10">
                No spam. Unsubscribe anytime.
              </p>
            </div>

            {/* Related Articles */}
            <div>
              <h3 className="font-bold text-[#111827] mb-5 text-sm">Related Articles</h3>
              <div className="space-y-4">
                {relatedArticles.length > 0 ? relatedArticles.map((post: any, idx: number) => (
                  <Link href={`/articles/${post.slug}`} key={idx} className="flex gap-4 group cursor-pointer items-center">
                    <div className="w-16 h-16 rounded-xl shrink-0 relative overflow-hidden shadow-sm border border-gray-100">
                      <Image src={post.coverImage} fill alt={post.title} className="object-cover group-hover:scale-110 transition-transform duration-500" unoptimized />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-[#111827] leading-tight mb-1.5 group-hover:text-[#4F46E5] transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-[11px] text-[#6B7280]">{post.readTime}</p>
                    </div>
                  </Link>
                )) : <p className="text-sm text-gray-500">No related articles yet.</p>}
              </div>
              <div className="mt-6 flex justify-center">
                <Link href="/articles" className="w-full border border-[#E5E7EB] text-[#4F46E5] font-bold text-sm py-2.5 rounded-full hover:border-[#4F46E5] transition-colors flex items-center justify-center gap-2 shadow-sm">
                  View all articles <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Popular Tags */}
            <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-5">
              <h3 className="font-bold text-[#111827] mb-4 text-sm">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag: string) => (
                  <button 
                    key={tag} 
                    className="px-3 py-1.5 bg-white border border-[#E5E7EB] rounded-lg text-[11px] font-semibold text-[#4B5563] hover:border-[#4F46E5] hover:text-[#4F46E5] transition-colors shadow-sm"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

          </aside>

        </div>
      </div>
    </div>
    </>
  );
}
