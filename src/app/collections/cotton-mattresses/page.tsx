import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Star, Leaf, Wind, Shield, Truck } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { IMG } from "@/lib/images";

export const metadata: Metadata = {
  title: "Cotton & Coir Mattresses — Natural Sleep | Telflex Kerala",
  description:
    "Buy pure cotton and rubberised coir mattresses online. Natural, breathable, chemical-free sleep. Factory-direct from Telflex Kerala. Free delivery across South India. Starting ₹3,090.",
  alternates: { canonical: "/collections/cotton-mattresses" },
  openGraph: {
    title: "Cotton & Coir Mattresses — Natural Sleep | Telflex",
    description: "Pure cotton and coir mattresses from Kerala's leading manufacturer. From ₹3,090. Free delivery.",
    url: "/collections/cotton-mattresses",
  },
};

const PRODUCTS = [
  {
    slug: "sleepy-cotton",
    family: "Sleepy",
    subtitle: "Pure Cotton",
    badge: "Most Natural",
    badgeVariant: "success" as const,
    tagline: "Traditional handcrafted cotton comfort",
    description: "The Sleepy Cotton is filled with 100% pure cotton — handpicked and handcrafted by skilled artisans in Kerala. Naturally breathable and hypoallergenic, it stays cool through Kerala's humid summers.",
    features: [
      "100% pure cotton filling",
      "Breathable handcrafted cover",
      "Naturally hypoallergenic",
      "Perfect for Kerala's climate",
      "Lightweight & easy to handle",
      "Chemical-free construction",
    ],
    sizes: ['72×30"', '72×36"', '72×48"', '72×60"', '72×72"'],
    price_from: 3090,
    mrp_from: 4500,
    rating: 4.3,
    reviews: 892,
    img: IMG.cotton.hero,
  },
  {
    slug: "nature-fresh",
    family: "Nature Fresh",
    subtitle: "Coir & Foam",
    badge: "Eco Pick",
    badgeVariant: "primary" as const,
    tagline: "Rubberised coir with soft foam top",
    description: "Nature Fresh combines rubberised coconut coir — Kerala's most traditional sleep material — with a PU foam comfort layer. Firm, breathable, and naturally resistant to dust mites.",
    features: [
      "Rubberised coconut coir core",
      "PU foam comfort layer",
      "Firm & naturally breathable",
      "Anti-dust mite & anti-fungal",
      "Ideal for back support",
      "5-year warranty",
    ],
    sizes: ['72×30"', '72×36"', '72×48"', '72×60"'],
    price_from: 4800,
    mrp_from: 7000,
    rating: 4.3,
    reviews: 412,
    img: IMG.cotton.coir,
  },
  {
    slug: "dream-foam",
    family: "Dream Foam",
    subtitle: "Economy Foam",
    badge: "Budget Value",
    badgeVariant: "muted" as const,
    tagline: "Everyday foam comfort at an honest price",
    description: "Dream Foam gives you quality PU foam sleep without the premium price tag. Durable, supportive, and available in all standard sizes — a practical upgrade from any cotton mattress.",
    features: [
      "High-resilience PU foam core",
      "Durable woven fabric cover",
      "Lightweight & easy to move",
      "Available in all sizes",
      "Budget-friendly",
      "3-year warranty",
    ],
    sizes: ['72×36"', '72×48"', '72×60"'],
    price_from: 5500,
    mrp_from: 7800,
    rating: 4.2,
    reviews: 643,
    img: IMG.cotton.natural,
  },
];

const WHY_NATURAL = [
  { icon: Leaf, title: "Chemical-Free", desc: "No adhesives, synthetic dyes or chemical treatments — just natural materials as nature intended." },
  { icon: Wind, title: "Naturally Breathable", desc: "Cotton and coir fibres allow superior airflow — essential for comfortable sleep in South India's humid climate." },
  { icon: Shield, title: "Hypoallergenic", desc: "Natural cotton and coir are resistant to dust mites and allergens — ideal for sensitive sleepers." },
  { icon: Star, title: "Eco-Friendly", desc: "Biodegradable materials with a much lower environmental footprint than synthetic foam alternatives." },
];

export default function CottonMattressesPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src={IMG.cotton.hero} alt="Cotton mattress" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 via-emerald-800/80 to-emerald-900/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-400/20 text-emerald-200 text-xs font-bold rounded-full border border-emerald-400/30 mb-5">
              <Leaf size={12} /> Natural Sleep Collection
            </span>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-white leading-tight mb-4">
              Cotton & Coir Mattresses
            </h1>
            <p className="text-white/80 text-lg leading-relaxed mb-8">
              Pure natural materials. Chemical-free comfort. Crafted in Kerala the traditional way — and shipped free to your door across South India.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full border border-white/20">
                <Truck size={14} /> Free delivery
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full border border-white/20">
                <Shield size={14} /> 30-night trial
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full border border-white/20">
                Starting ₹3,090
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg viewBox="0 0 1440 40" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="text-xs text-muted mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-ink">Cotton Mattresses</span>
        </nav>

        {/* Why Natural */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {WHY_NATURAL.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center mb-3">
                <Icon size={18} className="text-emerald-700" />
              </div>
              <h3 className="font-semibold text-sm text-ink mb-1">{title}</h3>
              <p className="text-xs text-muted leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Products */}
        <h2 className="font-display font-bold text-2xl text-ink mb-8">Our Natural Mattress Range</h2>
        <div className="space-y-8">
          {PRODUCTS.map((product, idx) => {
            const discount = calculateDiscount(product.mrp_from, product.price_from);
            return (
              <article
                key={product.slug}
                className="bg-white border border-line rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow"
              >
                <div className={`grid grid-cols-1 md:grid-cols-2 ${idx % 2 === 1 ? "md:grid-flow-dense" : ""}`}>
                  {/* Image */}
                  <div className={`relative aspect-[4/3] ${idx % 2 === 1 ? "md:col-start-2" : ""}`}>
                    <Image
                      src={product.img}
                      alt={`Telflex ${product.family} ${product.subtitle}`}
                      fill
                      className="object-cover"
                      sizes="(max-width:768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge variant={product.badgeVariant}>{product.badge}</Badge>
                    </div>
                    {discount >= 20 && (
                      <div className="absolute top-4 right-4">
                        <Badge variant="sale">{discount}% OFF</Badge>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col justify-center">
                    <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">{product.subtitle}</p>
                    <h3 className="font-display font-bold text-2xl text-ink mb-1">Telflex {product.family}</h3>
                    <p className="text-muted mb-4">{product.tagline}</p>
                    <p className="text-sm text-muted leading-relaxed mb-5">{product.description}</p>

                    <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-6">
                      {product.features.map((f) => (
                        <li key={f} className="text-xs text-muted flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {product.sizes.map((s) => (
                        <span key={s} className="text-xs border border-line rounded-lg px-2.5 py-1 text-muted">{s}</span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 mb-6">
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map((i) => (
                          <Star key={i} size={12} className={i <= Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-200"} />
                        ))}
                      </div>
                      <span className="text-xs font-semibold">{product.rating}</span>
                      <span className="text-xs text-muted">({product.reviews} reviews)</span>
                    </div>

                    <div className="flex items-end justify-between">
                      <div>
                        <div className="font-bold text-2xl text-ink">{formatPrice(product.price_from)}</div>
                        <div className="text-sm text-muted line-through">{formatPrice(product.mrp_from)}</div>
                      </div>
                      <Link href={`/products/${product.slug}`}>
                        <Button variant="primary" size="lg">View & Buy</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* SEO text */}
        <div className="mt-16 max-w-3xl">
          <h2 className="font-display font-bold text-2xl text-ink mb-4">Buy Cotton Mattresses Online — Telflex Kerala</h2>
          <p className="text-muted leading-relaxed mb-4">
            Telflex has been crafting cotton and coir mattresses in Kerala since 2000. Our natural mattress range is designed specifically for South India's climate — breathable, hypoallergenic, and built to last.
          </p>
          <p className="text-muted leading-relaxed">
            Every natural mattress ships free across Kerala, Tamil Nadu, Karnataka, and Andhra Pradesh with our 30-night in-home trial. If you're not completely satisfied, we'll arrange a free pickup and full refund.
          </p>
        </div>
      </div>
    </div>
  );
}
