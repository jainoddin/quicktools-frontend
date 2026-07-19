import React from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
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
    const res = await fetch(getEndpoint('/api/blogs?limit=3'), { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      // The backend returns data.data for blogs!
      blogs = data.data || [];
    }
  } catch (err) {
    console.error('Failed to fetch latest blogs:', err);
  }

  // Slice to only show latest 3 in case API didn't limit properly
  blogs = blogs.slice(0, 3);

  if (blogs.length === 0) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 py-12 text-center text-gray-500">
        No blogs available yet.
      </div>
    );
  }

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="flex justify-between items-end mb-8 sm:mb-10">
        <h2 className="text-xl sm:text-2xl font-bold text-[#111827]">Latest from our Blog</h2>
        <Link href="/blog" className="text-sm font-semibold text-[#4F46E5] hover:text-[#4338CA] flex items-center gap-1">
          Read all articles <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <Link href={`/blog/${blog.slug}`} key={blog._id} className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#4F46E5]/30 transition-all duration-300">
            <div className="h-48 w-full bg-gray-200 relative overflow-hidden">
              {blog.coverImage ? (
                <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-300">
                  No Image
                </div>
              )}
            </div>
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mb-3">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
              <h3 className="font-bold text-[#111827] text-lg mb-2 group-hover:text-[#4F46E5] transition-colors line-clamp-2">
                {blog.title}
              </h3>
              <p className="text-sm text-[#6B7280] line-clamp-3 mb-4 flex-1">
                {blog.description}
              </p>
              <div className="text-sm font-semibold text-[#4F46E5] flex items-center gap-1 mt-auto">
                Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
