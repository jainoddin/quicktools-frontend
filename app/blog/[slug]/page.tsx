import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Home, ChevronRight, Link2,
  Clock, Check, Share2, Crown, Mail, ArrowRight, Star, ChevronDown
} from 'lucide-react';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import GithubSlugger from 'github-slugger';
import { getEndpoint } from '../../../lib/api';
import NewsletterForm from '../../../components/shared/NewsletterForm';
import NewsletterSectionWrapper from '../../../components/shared/NewsletterSectionWrapper';

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const res = await fetch(getEndpoint(`/api/blogs/${slug}`), { cache: 'no-store' });
  if (!res.ok) return { title: 'Blog Not Found | QuickTools.ai' };

  const json = await res.json();
  const blog = json.data;
  if (!blog) return { title: 'Blog Not Found | QuickTools.ai' };

  return {
    title: `${blog.metaTitle || blog.title} | QuickTools.ai Blog`,
    description: blog.metaDescription || blog.description,
    alternates: { canonical: `/blog/${blog.slug}` },
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: 'article',
      url: `https://quicktools.ai/blog/${blog.slug}`,
      siteName: 'QuickTools.ai',
      publishedTime: blog.publishedAt,
      authors: [blog.author?.name],
      images: [
        {
          url: blog.coverImage,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.description,
      images: [blog.coverImage],
    },
  };
}

export default async function BlogSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const res = await fetch(getEndpoint(`/api/blogs/${slug}`), { cache: 'no-store' });

  if (!res.ok) {
    return <div className="text-center py-20 text-2xl font-bold">Blog post not found</div>;
  }

  const json = await res.json();
  const blogPost = json.data;

  if (!blogPost) {
    return <div className="text-center py-20 text-2xl font-bold">Blog post not found</div>;
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blogPost.title,
    description: blogPost.description,
    image: [blogPost.coverImage],
    datePublished: blogPost.publishedAt,
    dateModified: blogPost.publishedAt,
    author: [{
      '@type': 'Person',
      name: blogPost.author?.name || 'QuickTools AI',
      url: 'https://quicktools.ai/about'
    }],
    publisher: {
      '@type': 'Organization',
      name: 'QuickTools.ai',
      logo: {
        '@type': 'ImageObject',
        url: 'https://quicktools.ai/logo.png'
      }
    }
  };

  const faqSchema = (blogPost.faq && blogPost.faq.length > 0) ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: blogPost.faq.map((q: any) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer
      }
    }))
  } : null;

  return (
    <div className="flex-grow bg-white font-sans selection:bg-[#6D5EF8] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {/* Breadcrumb */}
      <div className="bg-transparent pt-[15px] pb-[25px]">
        <nav className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs md:text-sm font-medium text-[#6B7280] overflow-x-auto whitespace-nowrap pb-2 [&::-webkit-scrollbar]:hidden">
          <Link href="/" className="hover:text-[#111827] flex items-center gap-1.5 transition-colors">
            <Home className="w-4 h-4" /> Home
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
          <Link href="/blog" className="hover:text-[#111827] transition-colors">Blog</Link>
          <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
          <Link href={`/blog?category=${encodeURIComponent(blogPost.category)}`} className="hover:text-[#111827] transition-colors">{blogPost.category}</Link>
          <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
          <span className="text-[#6D5EF8] font-bold truncate max-w-[200px] sm:max-w-md">
            {blogPost.title}
          </span>
        </nav>
      </div>

      {/* Main 3-Column Layout */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* ── LEFT SIDEBAR ── */}
          <aside className="hidden lg:block w-[220px] xl:w-[250px] shrink-0 sticky top-24 self-start space-y-6">

            {/* Table of Contents */}
            {blogPost.tableOfContents && blogPost.tableOfContents.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-[#111827] uppercase tracking-widest mb-3">On This Page</h3>
                <nav className="space-y-0.5">
                  {(() => {
                    const slugger = new GithubSlugger();
                    return blogPost.tableOfContents.map((label: string, i: number) => {
                      const sectionId = slugger.slug(label);
                      return (
                        <a
                          key={i}
                          href={`#${sectionId}`}
                          className={`flex items-center gap-2 py-1.5 px-2 rounded-lg text-sm transition-colors ${i === 0
                              ? 'text-[#6D5EF8] font-semibold bg-[#EEF2FF]'
                              : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB]'
                            }`}
                        >
                          {i === 0 && <span className="w-1.5 h-1.5 rounded-full bg-[#6D5EF8] shrink-0"></span>}
                          {i !== 0 && <span className="w-1.5 h-1.5 rounded-full bg-transparent shrink-0"></span>}
                          {label}
                        </a>
                      )
                    });
                  })()}
                </nav>
              </div>
            )}

            {/* Share */}
            <div>
              <h3 className="text-xs font-bold text-[#111827] uppercase tracking-widest mb-3">Share this post</h3>
              <div className="flex items-center gap-2">
                <button className="w-9 h-9 rounded-full bg-[#1DA1F2]/10 text-[#1DA1F2] flex items-center justify-center hover:bg-[#1DA1F2]/20 transition-colors font-bold text-xs">
                  𝕏
                </button>
                <button className="w-9 h-9 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] flex items-center justify-center hover:bg-[#0A66C2]/20 transition-colors font-bold text-xs">
                  in
                </button>
                <button className="w-9 h-9 rounded-full bg-[#1877F2]/10 text-[#1877F2] flex items-center justify-center hover:bg-[#1877F2]/20 transition-colors font-bold text-xs">
                  f
                </button>
                <button className="w-9 h-9 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <Link2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Premium Card */}
            <div className="bg-gradient-to-br from-[#6D5EF8] to-[#4F46E5] rounded-2xl p-5 text-white relative overflow-hidden">
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
              <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center mb-3">
                <Crown className="w-4 h-4 text-white fill-white" />
              </div>
              <p className="text-xs text-white/70 mb-0.5 font-medium">Unlock More with</p>
              <h4 className="font-bold text-white text-sm mb-2">QuickTools.ai Pro</h4>
              <p className="text-xs text-white/70 mb-4 leading-relaxed">
                Get access to premium AI tools, faster generations & priority support.
              </p>
              <button className="w-full bg-white text-[#6D5EF8] font-bold text-xs py-2.5 rounded-xl hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-center gap-1.5">
                Upgrade Now <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </aside>

          {/* ── MAIN ARTICLE ── */}
          <main className="flex-1 min-w-0 max-w-[720px]">

            {/* Badge */}
            {blogPost.featured && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF2FF] text-[#6D5EF8] text-xs font-bold mb-4 border border-[#DDD6FE]">
                <Star className="w-3 h-3 fill-[#6D5EF8]" /> FEATURED
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-black text-[#111827] leading-tight mb-4 tracking-tight">
              {blogPost.title}
            </h1>

            {/* Description */}
            <p className="text-[#6B7280] text-lg leading-relaxed mb-6">{blogPost.description}</p>

            {/* Author Row */}
            <div className="flex items-center gap-3 mb-8 pb-8 border-b border-[#E5E7EB]">
              {blogPost.author?.avatar && (
                <Image
                  src={blogPost.author.avatar}
                  width={40} height={40}
                  alt={blogPost.author.name || 'Author'}
                  className="rounded-full w-10 h-10 object-cover border-2 border-[#EEF2FF]"
                />
              )}
              <div>
                <div className="font-bold text-sm text-[#111827]">{blogPost.author?.name || 'QuickTools AI'}</div>
                <div className="text-xs text-[#9CA3AF] flex items-center gap-2">
                  <span>{new Date(blogPost.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span>·</span>
                  <Clock className="w-3 h-3" />
                  <span>{blogPost.readTime}</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-10 bg-[#0F0A1E] flex items-center justify-center shadow-lg">
              <Image
                src={blogPost.coverImage}
                alt={blogPost.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Mobile Table of Contents (Native Dropdown) */}
            {blogPost.tableOfContents && blogPost.tableOfContents.length > 0 && (
              <details className="lg:hidden bg-white border border-[#E5E7EB] rounded-2xl mb-8 shadow-sm group">
                <summary className="p-4 font-bold text-[#111827] cursor-pointer flex items-center justify-between list-none outline-none">
                  <div className="flex items-center gap-2">
                    On This Page
                  </div>
                  <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="p-4 pt-2 border-t border-[#E5E7EB]">
                  <nav className="space-y-1">
                    {(() => {
                      const slugger = new GithubSlugger();
                      return blogPost.tableOfContents.map((label: string, i: number) => {
                        const sectionId = slugger.slug(label);
                        return (
                          <a
                            key={i}
                            href={`#${sectionId}`}
                            className="block py-1.5 text-sm text-[#6B7280] hover:text-[#6D5EF8] transition-colors"
                          >
                            {label}
                          </a>
                        )
                      });
                    })()}
                  </nav>
                </div>
              </details>
            )}

            {/* Article Body */}
            <div className="prose prose-lg max-w-none prose-h2:text-[#111827] prose-h2:font-bold prose-p:text-[#4B5563] prose-a:text-[#6D5EF8] prose-li:text-[#4B5563] scroll-smooth">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
                {blogPost.content}
              </ReactMarkdown>
            </div>

            {/* FAQ Section */}
            {blogPost.faq && blogPost.faq.length > 0 && (
              <div className="mt-12 pt-8 border-t border-[#E5E7EB]">
                <h2 className="text-2xl font-bold text-[#111827] mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {blogPost.faq.map((item: any, idx: number) => (
                    <details key={idx} className="group bg-[#F9FAFB] rounded-2xl border border-[#E5E7EB] overflow-hidden">
                      <summary className="p-5 font-semibold text-[#111827] cursor-pointer flex items-center justify-between list-none outline-none">
                        <span>{item.question}</span>
                        <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                      </summary>
                      <div className="p-5 pt-0 text-[#4B5563] leading-relaxed border-t border-[#E5E7EB]/50 group-open:mt-2">
                        {item.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )}

            {/* Conclusion Action */}
            <div className="mt-10 pt-4 border-t border-[#E5E7EB]">
              <Link href="/tools" className="inline-flex items-center gap-2 text-[#6D5EF8] font-semibold hover:underline text-sm">
                Try AI Tools on QuickTools.ai <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </main>

          {/* ── RIGHT SIDEBAR ── */}
          <aside className="w-full lg:w-[260px] xl:w-[280px] shrink-0 lg:sticky lg:top-24 lg:self-start space-y-6">

            {/* What you'll learn */}
            {blogPost.whatYoullLearn && blogPost.whatYoullLearn.length > 0 && (
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm">
                <h3 className="font-bold text-[#111827] mb-1">What you'll learn</h3>
                <div className="w-8 h-0.5 bg-[#6D5EF8] mb-4 rounded-full"></div>
                <ul className="space-y-3">
                  {blogPost.whatYoullLearn.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#EEF2FF] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#6D5EF8]" />
                      </div>
                      <span className="text-sm text-[#4B5563] leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Related Posts */}
            {blogPost.relatedPosts && blogPost.relatedPosts.length > 0 && (
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-[#111827]">Related Posts</h3>
                  <Link href="/blog" className="text-xs text-[#6D5EF8] font-semibold hover:underline">View all</Link>
                </div>
                <div className="space-y-4">
                  {blogPost.relatedPosts.map((post: any, i: number) => (
                    <Link key={i} href={`/blog/${post.slug}`} className="flex items-center gap-3 group">
                      <div className={`w-16 h-16 rounded-xl shrink-0 bg-gray-100 flex items-center justify-center overflow-hidden`}>
                        <Image
                          src={post.coverImage}
                          width={64} height={64}
                          alt={post.title}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#111827] group-hover:text-[#6D5EF8] transition-colors leading-snug line-clamp-2">{post.title}</p>
                        <p className="text-xs text-[#9CA3AF] mt-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {post.readTime}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Newsletter Subscribe */}
            <NewsletterSectionWrapper>
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm">
                <div className="w-9 h-9 bg-[#EEF2FF] rounded-xl flex items-center justify-center mb-3">
                  <Mail className="w-4 h-4 text-[#6D5EF8]" />
                </div>
                <h3 className="font-bold text-[#111827] mb-1">Subscribe to our newsletter</h3>
                <p className="text-xs text-[#6B7280] mb-4 leading-relaxed">
                  Get the latest AI tools, tutorials and productivity tips in your inbox.
                </p>
                <NewsletterForm
                  className="mt-4"
                  inputClassName="w-full h-10 px-3 border border-[#E5E7EB] rounded-xl text-sm outline-none focus:border-[#6D5EF8] focus:ring-2 focus:ring-[#6D5EF8]/10 transition-all mb-3"
                  buttonClassName="w-full h-10 bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white font-semibold text-sm rounded-xl transition-colors"
                />
              </div>
            </NewsletterSectionWrapper>

          </aside>

        </div>
      </div>
    </div>
  );
}
