import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/blog-data';
import { getAllVehicles } from '@/lib/data';
import VehicleCard from '@/components/VehicleCard';
import SchemaJsonLd from '@/components/SchemaJsonLd';
import {
  Clock,
  Calendar,
  ChevronRight,
  User,
  HelpCircle,
  Car,
  KeyRound,
  ArrowRight,
  Share2
} from 'lucide-react';

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return { title: 'Article Not Found | MOTOR' };
  }

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `/blog/${slug}`,
      images: [{ url: post.heroImage, width: 1200, height: 630, alt: post.title }],
      type: 'article',
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const allVehicles = await getAllVehicles();
  const relatedVehicles = allVehicles.filter((v) => post.relatedVehiclesSlugs.includes(v.slug));

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.metaDescription,
    "image": post.heroImage,
    "author": {
      "@type": "Person",
      "name": post.author,
      "jobTitle": post.authorRole
    },
    "publisher": {
      "@type": "Organization",
      "name": "MOTOR Lahore",
      "logo": "https://images.pexels.com/photos/5288746/pexels-photo-5288746.jpeg"
    },
    "datePublished": "2026-03-01",
    "mainEntityOfPage": `https://motor.wordbitxtech.com/blog/${post.slug}`
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 space-y-12">
      <SchemaJsonLd schema={articleSchema} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-900 transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/blog" className="hover:text-slate-900 transition">Guides & Blog</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-900 truncate">{post.title}</span>
        </nav>

        {/* Article Header */}
        <div className="space-y-4">
          <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 rounded-md">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pb-4 border-b border-slate-200 gap-2">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-slate-900">{post.author}</span>
              <span>•</span>
              <span>{post.authorRole}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span>{post.publishDate}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-md">
          <img
            src={post.heroImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-6">
          <div
            className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {/* In-article CTAs */}
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-bold text-slate-900 text-sm">Need a car for your family or journey?</p>
              <p className="text-xs text-slate-500 mt-0.5">Explore 150-point certified inventory or book a rental today.</p>
            </div>
            <div className="flex items-center space-x-2 shrink-0">
              <Link
                href="/cars"
                className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 transition"
              >
                Buy a Car
              </Link>
              <Link
                href="/rent"
                className="px-4 py-2 bg-slate-800 text-white text-xs font-bold rounded-xl hover:bg-slate-700 transition"
              >
                Rent a Car
              </Link>
            </div>
          </div>
        </div>

        {/* FAQs */}
        {post.faqs && post.faqs.length > 0 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-indigo-600" />
              <span>Frequently Asked Questions</span>
            </h2>
            <div className="space-y-4">
              {post.faqs.map((faq, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                  <h3 className="text-xs font-bold text-slate-900">{faq.question}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Vehicles */}
        {relatedVehicles.length > 0 && (
          <div className="space-y-6 pt-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Related Vehicles in Our Lahore Showrooms
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedVehicles.map((car) => (
                <VehicleCard key={car.id} vehicle={car} viewMode="sale" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
