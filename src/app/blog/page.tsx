import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-data";
import { IMG } from "@/lib/images";

export const metadata: Metadata = {
  title: "Sleep Journal — Mattress Tips & Guides for South India | Telflex",
  description:
    "Read expert mattress guides, comparisons and sleep tips from Telflex — Kerala's #1 mattress manufacturer. Covering Kerala, Tamil Nadu, Karnataka & Andhra Pradesh.",
  alternates: { canonical: "/blog" },
};

const CATEGORY_COLORS: Record<string, string> = {
  "Buying Guides": "bg-blue-100 text-blue-700",
  "Health & Sleep": "bg-emerald-100 text-emerald-700",
  "Mattress Comparisons": "bg-amber-100 text-amber-700",
  "Sleep Tips": "bg-violet-100 text-violet-700",
};

export default function BlogIndexPage() {
  const featured = BLOG_POSTS[0];
  const rest = BLOG_POSTS.slice(1);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero banner */}
      <div className="relative bg-gradient-to-br from-primary-dark to-primary py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative z-10">
          <span className="inline-block px-4 py-1.5 bg-white/20 text-white/90 text-xs font-bold rounded-full border border-white/30 mb-4">
            Sleep Journal
          </span>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white">
            Mattress Guides & Sleep Tips
          </h1>
          <p className="mt-3 text-white/70 text-lg max-w-xl mx-auto">
            Expert advice for South Indian buyers — from Kerala's leading mattress manufacturer since 2000.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg viewBox="0 0 1440 40" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured */}
        {featured && (
          <Link href={`/blog/${featured.slug}`} className="group block mb-12">
            <article className="rounded-3xl overflow-hidden border border-line shadow-card group-hover:shadow-card-hover transition-all duration-300 grid grid-cols-1 md:grid-cols-2">
              <div className="relative aspect-video md:aspect-auto">
                <Image
                  src={IMG.blog[featured.slug as keyof typeof IMG.blog] ?? IMG.hero[0]}
                  alt={featured.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                  sizes="(max-width:768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">Featured</span>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center bg-white">
                <span className={`self-start text-xs font-bold px-3 py-1 rounded-full mb-4 ${CATEGORY_COLORS[featured.category] ?? "bg-gray-100 text-gray-700"}`}>
                  {featured.category}
                </span>
                <h2 className="font-display font-bold text-2xl md:text-3xl text-ink group-hover:text-primary transition-colors mb-3">
                  {featured.title}
                </h2>
                <p className="text-muted leading-relaxed mb-5">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-muted mb-5">
                  <span className="flex items-center gap-1"><Clock size={12} /> {featured.read_time} min read</span>
                  <span>{new Date(featured.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
                </div>
                <span className="flex items-center gap-2 text-sm font-bold text-primary">
                  Read article <ArrowRight size={14} />
                </span>
              </div>
            </article>
          </Link>
        )}

        {/* Grid */}
        <h2 className="font-display font-bold text-2xl text-ink mb-6">More Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => {
            const imgSrc = IMG.blog[post.slug as keyof typeof IMG.blog] ?? IMG.hero[0];
            const colorClass = CATEGORY_COLORS[post.category] ?? "bg-gray-100 text-gray-700";
            return (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <article className="bg-white rounded-3xl border border-line shadow-card overflow-hidden group-hover:shadow-card-hover group-hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={imgSrc}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <span className={`absolute bottom-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${colorClass}`}>
                      {post.category}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-xs text-muted mb-2">
                      <Clock size={11} /> {post.read_time} min
                    </div>
                    <h2 className="font-display font-bold text-base text-ink group-hover:text-primary line-clamp-2 transition-colors flex-1">
                      {post.title}
                    </h2>
                    <p className="text-xs text-muted mt-2 line-clamp-2">{post.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-muted">
                        {new Date(post.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                      <span className="text-xs font-bold text-primary flex items-center gap-1">
                        Read <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
