import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Filter, Star, Truck, Shield } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { IMG } from "@/lib/images";

const CATALOG = [
  {
    slug: "vertigo",
    family: "Vertigo",
    tier: "premium" as const,
    tagline: "Ultra-premium sleep engineering",
    features: ["Memory foam layers", "Cool-gel technology", "Pillow-top finish"],
    sizes: ["72×60", "72×72", "72×48"],
    price_from: 32000,
    mrp_from: 48000,
    rating: 4.9,
    reviews: 248,
    badge: "Bestseller",
    tags: ["premium"],
  },
  {
    slug: "descanso",
    family: "Descanso",
    tier: "premium" as const,
    tagline: "Luxury comfort with deep support",
    features: ["High-density foam", "Euro-top quilting", "Motion isolation"],
    sizes: ["72×60", "72×72", "72×48"],
    price_from: 24500,
    mrp_from: 36000,
    rating: 4.8,
    reviews: 312,
    badge: "Premium",
    tags: ["premium"],
  },
  {
    slug: "pearls",
    family: "Pearls",
    tier: "premium" as const,
    tagline: "Pressure-relieving luxury",
    features: ["Micro-coil support", "Plush quilted top", "Edge support system"],
    sizes: ["72×60", "72×72", "72×48"],
    price_from: 18500,
    mrp_from: 28000,
    rating: 4.7,
    reviews: 189,
    badge: "New",
    tags: ["premium"],
  },
  {
    slug: "siesta",
    family: "Siesta",
    tier: "premium" as const,
    tagline: "Deep rest for restless nights",
    features: ["Convoluted foam layers", "Pillow-top comfort", "Adaptive support"],
    sizes: ["72×60", "72×72", "72×48"],
    price_from: 14500,
    mrp_from: 22000,
    rating: 4.8,
    reviews: 276,
    badge: "Popular",
    tags: ["premium"],
  },
  {
    slug: "sereno",
    family: "Sereno",
    tier: "mid" as const,
    tagline: "Balanced comfort for everyday sleep",
    features: ["HR foam core", "Standard top", "5-year warranty"],
    sizes: ["72×60", "72×48", "72×36"],
    price_from: 8500,
    mrp_from: 12000,
    rating: 4.6,
    reviews: 423,
    badge: "Value Pick",
    tags: ["mid"],
  },
  {
    slug: "cera",
    family: "Cera",
    tier: "mid" as const,
    tagline: "Firm support, lasting comfort",
    features: ["Medium-firm foam", "Breathable cover", "7-year warranty"],
    sizes: ["72×60", "72×48", "72×36"],
    price_from: 7200,
    mrp_from: 10500,
    rating: 4.5,
    reviews: 358,
    badge: null,
    tags: ["mid"],
  },
  {
    slug: "orthocare",
    family: "Orthocare",
    tier: "mid" as const,
    tagline: "Engineered for spinal health",
    features: ["Ortho-support foam", "Doctor-recommended firmness", "Back pain relief"],
    sizes: ["72×60", "72×48", "72×36", "72×30"],
    price_from: 9800,
    mrp_from: 14000,
    rating: 4.7,
    reviews: 541,
    badge: "Doctors' Choice",
    tags: ["mid", "orthopedic"],
  },
  {
    slug: "40plus",
    family: "40 Plus",
    tier: "mid" as const,
    tagline: "Crafted for mature bodies",
    features: ["Joint-relief foam", "Medium-firm support", "Easy-get-up height"],
    sizes: ["72×60", "72×48", "72×36"],
    price_from: 10500,
    mrp_from: 15500,
    rating: 4.6,
    reviews: 198,
    badge: null,
    tags: ["mid"],
  },
  {
    slug: "sleepy-cotton",
    family: "Sleepy",
    tier: "economy" as const,
    tagline: "Natural cotton comfort",
    features: ["Pure cotton filling", "Breathable cover", "Handcrafted"],
    sizes: ["72×60", "72×48", "72×36", "72×30"],
    price_from: 3090,
    mrp_from: 4500,
    rating: 4.3,
    reviews: 892,
    badge: null,
    tags: ["economy", "cotton"],
  },
  {
    slug: "kiddo",
    family: "Kiddo",
    tier: "economy" as const,
    tagline: "Safe, firm sleep for growing kids",
    features: ["Hypoallergenic foam", "Washable cover", "Firm support for growth"],
    sizes: ["72×36", "60×36", "48×30"],
    price_from: 4200,
    mrp_from: 6000,
    rating: 4.5,
    reviews: 267,
    badge: "Kids' Pick",
    tags: ["economy", "kids"],
  },
  {
    slug: "dream-foam",
    family: "Dream Foam",
    tier: "economy" as const,
    tagline: "Everyday foam comfort",
    features: ["PU foam core", "Durable cover", "Budget-friendly"],
    sizes: ["72×60", "72×48", "72×36"],
    price_from: 5500,
    mrp_from: 7800,
    rating: 4.2,
    reviews: 643,
    badge: null,
    tags: ["economy"],
  },
  {
    slug: "nature-fresh",
    family: "Nature Fresh",
    tier: "economy" as const,
    tagline: "Natural coir & foam blend",
    features: ["Rubberised coir", "Foam top layer", "Firm & breathable"],
    sizes: ["72×60", "72×48", "72×36"],
    price_from: 4800,
    mrp_from: 7000,
    rating: 4.3,
    reviews: 412,
    badge: null,
    tags: ["economy", "cotton"],
  },
];

const FILTER_TABS = [
  { label: "All", value: "" },
  { label: "Premium", value: "premium" },
  { label: "Mid Range", value: "mid" },
  { label: "Economy", value: "economy" },
  { label: "Orthopedic", value: "orthopedic" },
  { label: "Cotton / Coir", value: "cotton" },
  { label: "Kids", value: "kids" },
];

const TIER_COLORS = {
  premium: "gold",
  mid: "primary",
  economy: "muted",
} as const;

const FILTER_META: Record<string, { title: string; desc: string }> = {
  premium: {
    title: "Premium Mattresses — Luxury Sleep | Telflex",
    desc: "Shop Telflex premium mattresses online. Memory foam, pillow-top & euro-top mattresses. Free delivery Kerala & South India. 30-night trial.",
  },
  mid: {
    title: "Mid-Range Mattresses — Best Value | Telflex",
    desc: "Quality mattresses at honest prices. Telflex mid-range foam mattresses with free delivery, 7-year warranty. Kerala & South India.",
  },
  economy: {
    title: "Affordable Mattresses from ₹3,090 | Telflex",
    desc: "Buy budget mattresses online. Cotton, foam & coir mattresses starting ₹3,090. Free delivery across South India. Telflex factory-direct.",
  },
  orthopedic: {
    title: "Orthopedic Mattresses for Back Pain | Telflex",
    desc: "Doctor-recommended orthopedic mattresses for back pain relief. Free delivery Kerala, Tamil Nadu, Karnataka & AP. 30-night trial.",
  },
  cotton: {
    title: "Cotton & Coir Mattresses — Natural Sleep | Telflex",
    desc: "Pure cotton and rubberised coir mattresses from Telflex. Natural, breathable, and chemical-free sleep. Free delivery South India.",
  },
  kids: {
    title: "Kids Mattresses — Safe Sleep for Children | Telflex",
    desc: "Hypoallergenic kids mattresses with washable covers. Firm support for healthy spine development. Free delivery across South India.",
  },
};

interface Props {
  searchParams: Promise<{ tier?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { tier } = await searchParams;
  const meta = tier ? FILTER_META[tier] : null;
  return {
    title: meta?.title ?? "Buy Mattresses Online — Free Delivery Kerala & South India | Telflex",
    description: meta?.desc ?? "Shop Telflex mattresses online. Foam, orthopedic, cotton & premium mattresses with free delivery across Kerala, Tamil Nadu, Karnataka & Andhra Pradesh. 30-night trial. No-Cost EMI.",
    alternates: { canonical: tier ? `/collections/mattresses?tier=${tier}` : "/collections/mattresses" },
    openGraph: {
      title: meta?.title ?? "Telflex Mattresses — Free Delivery Across South India",
      description: meta?.desc ?? "25+ mattress models. Free delivery. 30-night trial. No-Cost EMI. Kerala's leading manufacturer.",
      url: `/collections/mattresses${tier ? `?tier=${tier}` : ""}`,
    },
  };
}

export default async function MattressesPage({ searchParams }: Props) {
  const { tier } = await searchParams;

  const filtered = tier
    ? CATALOG.filter((p) => p.tags.includes(tier))
    : CATALOG;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-muted mb-6">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-ink">Mattresses</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl md:text-4xl text-ink">
          {tier ? FILTER_META[tier]?.title?.split(" —")[0] ?? "Mattresses" : "Mattresses"}
        </h1>
        <p className="mt-2 text-muted">
          {filtered.length} product{filtered.length !== 1 ? "s" : ""} · Free delivery across Kerala & South India · 30-night trial
        </p>
      </div>

      {/* Trust bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { icon: Truck, text: "Free Delivery" },
          { icon: Shield, text: "30-Night Trial" },
          { icon: Star, text: "10-Year Warranty" },
          { icon: Filter, text: "No-Cost EMI" },
        ].map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-2 bg-primary-tint rounded-xl p-3 text-sm font-medium text-primary">
            <Icon size={16} />
            {text}
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {FILTER_TABS.map((tab) => {
          const isActive = (tab.value === "" && !tier) || tab.value === tier;
          return (
            <Link
              key={tab.value}
              href={tab.value ? `/collections/mattresses?tier=${tab.value}` : "/collections/mattresses"}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                isActive
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-ink border-line hover:border-primary hover:text-primary"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {/* Product Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-muted">
          <p className="text-lg font-semibold">No products found</p>
          <Link href="/collections/mattresses" className="mt-4 inline-block text-primary hover:underline">Clear filter</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => {
            const discount = calculateDiscount(product.mrp_from, product.price_from);
            return (
              <Link key={product.slug} href={`/products/${product.slug}`} className="group">
                <article className="bg-white rounded-3xl border border-line shadow-card group-hover:shadow-card-hover group-hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full flex flex-col">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src={IMG.products[product.slug as keyof typeof IMG.products] ?? IMG.products.default}
                      alt={`Telflex ${product.family} mattress`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    {product.badge && (
                      <div className="absolute top-3 left-3">
                        <Badge variant={product.tier === "premium" ? "gold" : product.badge === "Doctors' Choice" ? "success" : "sale"}>
                          {product.badge}
                        </Badge>
                      </div>
                    )}
                    {discount >= 20 && (
                      <div className="absolute top-3 right-3">
                        <Badge variant="sale">{discount}% OFF</Badge>
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={TIER_COLORS[product.tier]} className="text-xs">
                        {product.tier.charAt(0).toUpperCase() + product.tier.slice(1)}
                      </Badge>
                    </div>
                    <h2 className="font-display font-bold text-base text-ink group-hover:text-primary transition-colors">
                      Telflex {product.family}
                    </h2>
                    <p className="text-xs text-muted mt-0.5 mb-3">{product.tagline}</p>

                    <ul className="space-y-1 mb-4 flex-1">
                      {product.features.map((f) => (
                        <li key={f} className="text-xs text-muted flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {product.sizes.slice(0, 3).map((s) => (
                        <span key={s} className="text-xs border border-line rounded-md px-2 py-0.5 text-muted">
                          {s}"
                        </span>
                      ))}
                      {product.sizes.length > 3 && (
                        <span className="text-xs text-muted">+{product.sizes.length - 3}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 mb-3">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <span className="text-xs font-semibold">{product.rating}</span>
                      <span className="text-xs text-muted">({product.reviews})</span>
                    </div>

                    <div className="flex items-end justify-between">
                      <div>
                        <div className="font-bold text-lg text-ink">{formatPrice(product.price_from)}</div>
                        <div className="text-xs text-muted line-through">{formatPrice(product.mrp_from)}</div>
                      </div>
                      <Button variant="primary" size="sm">View</Button>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      )}

      {/* SEO footer text */}
      <div className="mt-16 prose-telflex max-w-3xl">
        <h2>Buy Mattresses Online — Free Delivery Across South India</h2>
        <p>
          Telflex has been manufacturing mattresses in Kerala since 2000. Our factory-direct model means you get premium quality at prices 20–40% lower than retail stores. Every mattress ships free to your doorstep across Kerala, Tamil Nadu, Karnataka, and Andhra Pradesh.
        </p>
        <h3>Why Buy a Telflex Mattress?</h3>
        <p>
          Every Telflex mattress comes with a 30-night in-home trial. If it's not right for you, we'll pick it up and refund you — no questions asked. Our mattresses are backed by up to 10-year warranties and No-Cost EMI on orders above ₹5,000.
        </p>
      </div>
    </div>
  );
}
