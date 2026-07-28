import React from 'react';
import Link from 'next/link';
import { getEndpoint } from '../../lib/api';

interface CrossLinksWidgetProps {
  category?: string;
}

export default async function CrossLinksWidget({ category }: CrossLinksWidgetProps) {
  // Fetch latest content from all 3 types
  let latestBlogs = [];
  let latestArticles = [];
  let latestNews = [];

  try {
    const categoryQuery = category ? `&category=${encodeURIComponent(category)}` : '';
    const [blogsRes, articlesRes, newsRes] = await Promise.all([
      fetch(getEndpoint(`/api/blogs?limit=3${categoryQuery}`), { next: { revalidate: 3600 } }),
      fetch(getEndpoint(`/api/articles?limit=3${categoryQuery}`), { next: { revalidate: 3600 } }),
      fetch(getEndpoint(`/api/news?limit=3${categoryQuery}`), { next: { revalidate: 3600 } })
    ]);

    if (blogsRes.ok) latestBlogs = (await blogsRes.json()).data || [];
    if (articlesRes.ok) latestArticles = (await articlesRes.json()).data || [];
    if (newsRes.ok) latestNews = (await newsRes.json()).data || [];
  } catch (error) {
    console.error("CrossLinksWidget fetch error:", error);
  }

  return (
    <div className="mt-16 pt-12 border-t border-gray-100">
      <h3 className="text-2xl font-bold text-[#111827] mb-8">Discover More on QuickTools.ai</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Latest Blogs */}
        {latestBlogs.length > 0 && (
          <div>
            <h4 className="font-bold text-sm text-[#4F46E5] uppercase tracking-wider mb-4 border-b border-[#E5E7EB] pb-2">Latest Blogs</h4>
            <ul className="space-y-4">
              {latestBlogs.map((blog: any) => (
                <li key={blog._id}>
                  <Link href={`/blog/${blog.slug}`} className="group flex flex-col">
                    <span className="text-[#111827] font-medium group-hover:text-[#4F46E5] transition-colors line-clamp-2">
                      {blog.title}
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      {new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Latest Articles */}
        {latestArticles.length > 0 && (
          <div>
            <h4 className="font-bold text-sm text-[#4F46E5] uppercase tracking-wider mb-4 border-b border-[#E5E7EB] pb-2">In-Depth Articles</h4>
            <ul className="space-y-4">
              {latestArticles.map((article: any) => (
                <li key={article._id}>
                  <Link href={`/articles/${article.slug}`} className="group flex flex-col">
                    <span className="text-[#111827] font-medium group-hover:text-[#4F46E5] transition-colors line-clamp-2">
                      {article.title}
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Latest News */}
        {latestNews.length > 0 && (
          <div>
            <h4 className="font-bold text-sm text-[#4F46E5] uppercase tracking-wider mb-4 border-b border-[#E5E7EB] pb-2">AI Industry News</h4>
            <ul className="space-y-4">
              {latestNews.map((news: any) => (
                <li key={news._id}>
                  <Link href={`/news/${news.slug}`} className="group flex flex-col">
                    <span className="text-[#111827] font-medium group-hover:text-[#4F46E5] transition-colors line-clamp-2">
                      {news.title}
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      {new Date(news.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
