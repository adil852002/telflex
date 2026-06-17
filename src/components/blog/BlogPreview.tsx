import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import type { BlogPost } from "@/types";
import { IMG } from "@/lib/images";

interface BlogPreviewProps {
  posts: BlogPost[];
}

const CATEGORY_COLORS: Record<string, string> = {
  "Buying Guides": "bg-blue-100 text-blue-700",
  "Health & Sleep": "bg-emerald-100 text-emerald-700",
  "Mattress Comparisons": "bg-amber-100 text-amber-700",
  "Sleep Tips": "bg-violet-100 text-violet-700",
};

export default function BlogPreview({ posts }: BlogPreviewProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full uppercase tracking-widest mb-3">
              Sleep Journal
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-ink">From the Sleep Journal</h2>
            <p className="mt-2 text-muted text-lg">Expert guides, comparisons and tips for South Indian sleepers</p>
          </div>
          <Link href="/blog" className="hidden md:flex items-center gap-2 text-sm font-bold text-primary bg-primary-tint px-4 py-2 rounded-xl hover:bg-primary hover:text-white transition-colors">
            All articles <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => {
            const imgSrc = IMG.blog[post.slug as keyof typeof IMG.blog] ?? IMG.hero[0];
            const colorClass = CATEGORY_COLORS[post.category] ?? "bg-gray-100 text-gray-700";
            return (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <article className="bg-white rounded-3xl overflow-hidden border border-line shadow-card group-hover:shadow-card-hover group-hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={imgSrc}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${colorClass}`}>
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-xs text-muted mb-3">
                      <span className="flex items-center gap-1"><Clock size={11} /> {post.read_time} min read</span>
                      <span>·</span>
                      <span>{new Date(post.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                    </div>
                    <h3 className="font-display font-bold text-base text-ink group-hover:text-primary line-clamp-2 transition-colors flex-1">
                      {post.title}
                    </h3>
                    <p className="text-xs text-muted mt-2 line-clamp-2">{post.excerpt}</p>
                    <div className="mt-4 flex items-center gap-1 text-xs font-bold text-primary">
                      Read more <ArrowRight size={12} />
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/blog" className="text-sm font-bold text-primary hover:underline flex items-center gap-1 justify-center">
            View all articles <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
