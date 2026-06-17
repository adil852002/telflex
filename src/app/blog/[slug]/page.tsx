import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowLeft, Calendar, User } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-data";
import { BLOG_CONTENT } from "@/lib/blog-content";
import { IMG } from "@/lib/images";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://telflex.in";
  return {
    title: post.meta_title ?? post.title,
    description: post.meta_description ?? post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.meta_title ?? post.title,
      description: post.meta_description ?? post.excerpt,
      url: `/blog/${slug}`,
      type: "article",
      publishedTime: post.published_at,
      authors: [post.author],
      images: [{ url: `${siteUrl}${post.cover_image}`, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta_title ?? post.title,
      description: post.meta_description ?? post.excerpt,
    },
  };
}

function renderMarkdown(content: string): string {
  return content
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^---$/gm, '<hr class="my-8 border-line" />')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary underline">$1</a>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(.+)$/gm, (line) => {
      if (line.startsWith('<')) return line;
      return line;
    });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const content = BLOG_CONTENT[slug] ?? post.content;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://telflex.in";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        author: { "@type": "Person", name: post.author },
        datePublished: post.published_at,
        dateModified: post.updated_at ?? post.published_at,
        image: `${siteUrl}${post.cover_image}`,
        url: `${siteUrl}/blog/${slug}`,
        publisher: {
          "@type": "Organization",
          name: "Telflex",
          logo: { "@type": "ImageObject", url: `${siteUrl}/logo.png` },
        },
      },
      ...(post.schema_faq?.length
        ? [{
            "@type": "FAQPage",
            mainEntity: post.schema_faq.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }]
        : []),
    ],
  };

  const related = BLOG_POSTS.filter((p) => p.slug !== slug && (p.region === post.region || p.category === post.category)).slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary mb-8 transition-colors">
          <ArrowLeft size={14} /> Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge variant="primary">{post.category}</Badge>
            {post.region && (
              <Badge variant="muted">{post.region.charAt(0).toUpperCase() + post.region.slice(1)}</Badge>
            )}
            <span className="flex items-center gap-1 text-xs text-muted">
              <Clock size={12} /> {post.read_time} min read
            </span>
          </div>

          <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-ink leading-tight mb-4">
            {post.title}
          </h1>

          <p className="text-lg text-muted leading-relaxed mb-6">{post.excerpt}</p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted border-t border-line pt-4">
            <span className="flex items-center gap-1.5">
              <User size={14} /> {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {new Date(post.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </span>
          </div>
        </header>

        {/* Cover image */}
        <div className="relative aspect-video rounded-3xl overflow-hidden mb-10 shadow-card-hover">
          <Image
            src={IMG.blog[slug as keyof typeof IMG.blog] ?? IMG.hero[0]}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width:896px) 100vw, 896px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        {/* Content */}
        <div
          className="prose-telflex"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* FAQ Schema rendered visibly */}
        {post.schema_faq && post.schema_faq.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display font-bold text-2xl text-ink mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {post.schema_faq.map((faq) => (
                <details key={faq.question} className="group border border-line rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between p-4 cursor-pointer font-semibold text-ink hover:bg-primary-tint transition-colors">
                    {faq.question}
                    <span className="ml-2 shrink-0 text-primary group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-4 pb-4 text-muted text-sm leading-relaxed">{faq.answer}</div>
                </details>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs bg-primary-tint text-primary rounded-full px-3 py-1">{tag}</span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-primary rounded-2xl p-8 text-center text-white">
          <h3 className="font-display font-bold text-2xl mb-2">Ready to sleep better?</h3>
          <p className="text-white/80 mb-6">Free delivery across South India · 30-night trial · No-Cost EMI</p>
          <Link href="/collections/mattresses">
            <Button variant="primary" size="lg" className="bg-white text-primary hover:bg-white/90">
              Shop Mattresses Now
            </Button>
          </Link>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <h2 className="font-display font-bold text-2xl text-ink mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((rp) => (
              <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group">
                <div className="bg-white rounded-2xl border border-line shadow-card group-hover:shadow-card-hover group-hover:-translate-y-1 transition-all overflow-hidden">
                  <div className="relative aspect-video">
                    <Image
                      src={IMG.blog[rp.slug as keyof typeof IMG.blog] ?? IMG.hero[0]}
                      alt={rp.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="33vw"
                    />
                  </div>
                  <div className="p-4">
                    <Badge variant="primary" className="mb-2 text-xs">{rp.category}</Badge>
                    <h3 className="font-semibold text-sm text-ink group-hover:text-primary line-clamp-2 transition-colors">
                      {rp.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
