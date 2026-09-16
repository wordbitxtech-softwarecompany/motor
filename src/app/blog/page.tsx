import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/blog-data';
import {
  BookOpen,
  Clock,
  User,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calendar
} from 'lucide-react';

export const metadata: Metadata = {
  alternates: { canonical: '/blog' },
  title: 'Automotive News & Guides Pakistan',
  description: 'Expert automotive advice on buying certified used cars in Lahore, rental fleet comparisons, mechanical inspections and car maintenance in Pakistan.',
};

export default function BlogIndexPage() {
  const categories = ['All Guides', 'Used Cars', 'Car Rental', 'Car Buying', 'SUVs', 'Maintenance'];

  return (
    <div className="bg-slate-50 min-h-screen py-12 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-14 border border-slate-800 shadow-xl">
          <div className="max-w-2xl space-y-4">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Pakistan Auto Insider</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              News, Reviews &amp; Buying Guides for Pakistan
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Practical guides on new car launches, EV and hybrid ownership, used car buying, rental tips and
              comparisons — written for Pakistani roads and Pakistani budgets.
            </p>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl hover:border-indigo-300 transition-all duration-300"
            >
              <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden">
                <img
                  src={post.heroImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-indigo-600 text-white rounded-lg shadow-sm">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center space-x-3 text-xs text-slate-400 mb-2">
                    <span className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      {post.readTime}
                    </span>
                    <span>•</span>
                    <span className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1" />
                      {post.publishDate}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs">
                    <p className="font-semibold text-slate-900">{post.author}</p>
                    <p className="text-[11px] text-slate-400">{post.authorRole}</p>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-xs font-bold text-indigo-600 hover:text-indigo-800 space-x-1"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
