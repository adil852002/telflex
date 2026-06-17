import type { Metadata } from "next";
import HeroCarousel from "@/components/home/HeroCarousel";
import TrustStrip from "@/components/home/TrustStrip";
import CategoryTiles from "@/components/home/CategoryTiles";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WhyTelflex from "@/components/home/WhyTelflex";
import Testimonials from "@/components/home/Testimonials";
import BulkCTA from "@/components/home/BulkCTA";
import BlogPreview from "@/components/blog/BlogPreview";
import { BLOG_POSTS } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Telflex Mattress — Kerala's #1 Mattress Manufacturer Since 2000",
  description:
    "Buy the best mattresses online from Telflex. Free delivery across Kerala, Tamil Nadu, Karnataka & Andhra Pradesh. 30-night trial, No-Cost EMI, COD available. Factory-direct pricing.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const recentPosts = BLOG_POSTS.slice(0, 3);
  return (
    <>
      <HeroCarousel />
      <TrustStrip />
      <CategoryTiles />
      <FeaturedProducts />
      <WhyTelflex />
      <Testimonials />
      <BulkCTA />
      <BlogPreview posts={recentPosts} />
    </>
  );
}
