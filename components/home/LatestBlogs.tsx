import React from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { getEndpoint } from '../../lib/api';
import Image from 'next/image';

interface Blog {
  _id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  coverImage: string;
  readTime: string;
  author: { name: string; avatar: string };
  publishedAt: string;
  tags?: string[];
}

export default async function LatestBlogs() {
  let blogs: Blog[] = [];
  try {
    const res = await fetch(getEndpoint('/api/blogs?limit=3'), { next: { revalidate: 300 } });
    if (res.ok) {
      const data = await res.json();
      blogs = data.data || [];
    }
  } catch (err) {
    console.error('Failed to fetch latest blogs:', err);
  }

  blogs = blogs.slice(0, 3);

  if (blogs.length === 0) {
    return null;
  }

  const featuredBlog = blogs[0];
  const sideBlogs = blogs.slice(1);

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] mb-3 tracking-tight">Our Latest Insights</h2>
          <p className="text-base text-[#6B7280] max-w-2xl">Discover strategies, tutorials, and news about the future of AI tools.</p>
        </div>
        <Link href="/blog" className="shrink-0 px-5 py-2.5 bg-white border border-[#E5E7EB] text-[#111827] text-sm font-semibold rounded-xl hover:bg-[#F3F4F6] transition-colors flex items-center gap-2 shadow-sm">
          View All Blogs <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 h-full">
        {/* Featured Large Blog (Left) */}
        <Link 
          href={`/blog/${featuredBlog.slug}`} 
          className="group lg:col-span-7 flex flex-col rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 bg-white relative h-full min-h-[400px]"
        >
          <div className="absolute inset-0 bg-gray-200 z-0">
            {featuredBlog.coverImage ? (
              <img fetchPriority="high" loading="eager" src={featuredBlog.coverImage} alt={featuredBlog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600"></div>
            )}
            {/* Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
          </div>
          
          <div className="relative z-10 p-8 sm:p-10 flex flex-col justify-end h-full mt-auto text-white">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-[#4F46E5] rounded-full text-xs font-bold uppercase tracking-wider">{featuredBlog.category || 'AI News'}</span>
              <div className="flex items-center gap-1.5 text-sm font-medium text-gray-300">
                <Calendar className="w-4 h-4" />
                {new Date(featuredBlog.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
            <h3 className="font-bold text-3xl sm:text-4xl leading-tight mb-4 group-hover:text-indigo-200 transition-colors">
              {featuredBlog.title}
            </h3>
            <p className="text-gray-300 text-sm sm:text-base line-clamp-2 mb-6 max-w-2xl">
              {featuredBlog.description}
            </p>
            <div className="flex items-center gap-3 mt-auto">
              <div className="w-10 h-10 rounded-full bg-gray-600 overflow-hidden border-2 border-white/20">
                <img src={featuredBlog.author?.avatar || 'https://i.pravatar.cc/150?u=admin'} alt={featuredBlog.author?.name || 'Admin'} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-sm font-bold">{featuredBlog.author?.name || 'QuickTools Team'}</div>
                <div className="text-xs text-gray-400">{featuredBlog.readTime || '5 min read'}</div>
              </div>
            </div>
          </div>
        </Link>

        {/* Stacked Small Blogs (Right) */}
        <div className="lg:col-span-5 flex flex-col gap-8 h-full">
          {sideBlogs.map((blog) => (
            <Link 
              href={`/blog/${blog.slug}`} 
              key={blog._id} 
              className="group flex flex-col sm:flex-row gap-5 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#4F46E5]/30 transition-all duration-300 flex-1"
            >
              <div className="h-48 sm:h-full w-full sm:w-[200px] shrink-0 rounded-xl overflow-hidden bg-gray-100 relative">
                {blog.coverImage ? (
                  <img loading="lazy" src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-300 text-xs">No Image</div>
                )}
              </div>
              <div className="flex flex-col py-2 flex-1 justify-center">
                <div className="text-xs font-bold text-[#4F46E5] uppercase tracking-wider mb-2">{blog.category || 'Tutorials'}</div>
                <h3 className="font-bold text-[#111827] text-lg sm:text-xl mb-3 group-hover:text-[#4F46E5] transition-colors leading-snug line-clamp-2">
                  {blog.title}
                </h3>
                <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mt-auto">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    {blog.author?.name || 'Team'}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
