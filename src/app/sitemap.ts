import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://telflex.in";

const STATIC_ROUTES = [
  { url: "/", priority: 1.0, changeFrequency: "weekly" },
  { url: "/collections/mattresses", priority: 0.9, changeFrequency: "weekly" },
  { url: "/collections/cotton-mattresses", priority: 0.8, changeFrequency: "weekly" },
  { url: "/collections/bedding", priority: 0.7, changeFrequency: "monthly" },
  { url: "/collections/baby-mattresses", priority: 0.7, changeFrequency: "monthly" },
  { url: "/collections/institutional", priority: 0.7, changeFrequency: "monthly" },
  { url: "/premium", priority: 0.9, changeFrequency: "monthly" },
  { url: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { url: "/about", priority: 0.6, changeFrequency: "yearly" },
  { url: "/contact", priority: 0.6, changeFrequency: "yearly" },
  { url: "/bulk-purchase", priority: 0.7, changeFrequency: "monthly" },
  { url: "/warranty", priority: 0.5, changeFrequency: "yearly" },
  { url: "/faq", priority: 0.6, changeFrequency: "monthly" },
  { url: "/shipping", priority: 0.5, changeFrequency: "yearly" },
  { url: "/returns", priority: 0.5, changeFrequency: "yearly" },
  { url: "/emi", priority: 0.5, changeFrequency: "yearly" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.url}`,
    lastModified: new Date(),
    changeFrequency: r.changeFrequency as MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: r.priority,
  }));

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at ?? post.published_at),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
