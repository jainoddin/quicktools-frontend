import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import BlogClient from '@/components/blog/BlogClient';
import { getEndpoint } from '@/lib/api';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'AI Blog: Expert Tips, Tutorials & Insights',
  description: 'Explore the QuickTools.ai blog for expert insights, detailed tutorials, and the latest news on AI tools. Learn how to boost your productivity.',
  alternates: {
    canonical: '/blog',
  }
};

async function getBlogs() {
  try {
    const res = await fetch(getEndpoint('/api/blogs?limit=12'), {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    if (!res.ok) return { data: [], pagination: {} };
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    return { data: [], pagination: {} };
  }
}

export default async function BlogPage() {
  const blogsResponse = await getBlogs();
  const allBlogs = blogsResponse.data || [];

  return (
    <div className="flex-grow bg-[#F8FAFC] flex flex-col font-sans selection:bg-[#6D5EF8] selection:text-white relative">
      
      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-[120px] -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-[120px] -translate-x-1/4 translate-y-1/4"></div>
      </div>
      
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-[15px] flex-grow flex flex-col relative z-10">

        {/* Top Navigation Row */}
        <div className="flex items-center mb-[25px]">

          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-sm font-medium text-[#6B7280]">
            <Link href="/" className="hover:text-[#111827] transition-colors flex items-center gap-1.5">
              <Home className="w-4 h-4" /> Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-[#6D5EF8] font-bold">Blog</span>
          </nav>

        </div>

        {/* JSON-LD Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://quicktool.space/" },
                { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://quicktool.space/blog" }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": allBlogs.slice(0, 10).map((blog: any, index: number) => ({
                "@type": "ListItem",
                "position": index + 1,
                "url": `https://quicktool.space/blog/${blog.slug}`
              }))
            }
          ])}}
        />

        {/* Client Component */}
        <BlogClient initialBlogs={allBlogs} initialPagination={blogsResponse.pagination} />

      </div>
    </div>
  );
}
