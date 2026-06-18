import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Star, Truck, Shield } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { IMG } from "@/lib/images";

const CATALOG = [
  // Pillows
  {
    slug: "recron-pillow",
    name: "Recron Fibre Pillow",
    type: "pillow-recron",
    category: "Pillows",
    tagline: "Soft recron fibre — hotel-grade comfort",
    features: ["Premium recron fibre fill", "Soft & resilient", "Machine washable cover", "Anti-allergen treatment"],
    sizes: ['16×24"', '17×27"'],
    price_from: 350,
    mrp: 520,
    rating: 4.5,
    reviews: 1240,
    badge: "Bestseller",
    img: IMG.bedding.pillow,
  },
  {
    slug: "vacuum-pillow",
    name: "Vacuum Compressed Pillow",
    type: "pillow-vacuum",
    category: "Pillows",
    tagline: "Compressed for easy storage & travel",
    features: ["Vacuum-packed for storage", "Expands to full size", "Recron fibre fill", "Space-saving packaging"],
    sizes: ['16×24"'],
    price_from: 299,
    mrp: 450,
    rating: 4.3,
    reviews: 687,
    badge: null,
    img: IMG.bedding.pillow,
  },
  {
    slug: "silk-cotton-pillow",
    name: "Silk Cotton Pillow",
    type: "pillow-cotton",
    category: "Pillows",
    tagline: "Traditional silk cotton — naturally cool",
    features: ["100% silk cotton fill", "Breathable cotton cover", "Traditional comfort", "Ideal for Kerala climate"],
    sizes: ['16×24"', '17×27"'],
    price_from: 280,
    mrp: 420,
    rating: 4.2,
    reviews: 543,
    badge: "Natural",
    img: IMG.bedding.pillow,
  },
  // Quilts
  {
    slug: "recron-quilt",
    name: "Recron Quilt",
    type: "quilt",
    category: "Quilts",
    tagline: "Warm recron-filled quilt for cozy nights",
    features: ["Recron fibre fill", "Soft cotton shell", "Lightweight warmth", "Machine washable"],
    sizes: ['60×90"', '90×90"'],
    price_from: 1200,
    mrp: 1800,
    rating: 4.4,
    reviews: 328,
    badge: null,
    img: IMG.bedding.quilt,
  },
  {
    slug: "cotton-quilt",
    name: "Pure Cotton Quilt",
    type: "quilt",
    category: "Quilts",
    tagline: "Pure cotton summer quilt — breathable & light",
    features: ["Pure cotton fill & cover", "Ideal for South Indian summers", "Naturally breathable", "Hypoallergenic"],
    sizes: ['60×90"', '90×90"'],
    price_from: 1500,
    mrp: 2200,
    rating: 4.3,
    reviews: 218,
    badge: "Natural",
    img: IMG.bedding.quilt,
  },
  // Bed Covers
  {
    slug: "gsm-bedcover",
    name: "GSM Bed Cover",
    type: "bedcover",
    category: "Bed Covers",
    tagline: "Heavy-duty woven GSM bed cover",
    features: ["Heavy GSM woven fabric", "Durable & colourfast", "Easy to wash", "Fits all standard beds"],
    sizes: ["Single", "Double", "Queen", "King"],
    price_from: 800,
    mrp: 1200,
    rating: 4.4,
    reviews: 456,
    badge: null,
    img: IMG.bedding.bedcover,
  },
  {
    slug: "classic-bedcover",
    name: "Classic Bed Cover",
    type: "bedcover",
    category: "Bed Covers",
    tagline: "Everyday classic bedcover — soft & sturdy",
    features: ["Classic woven finish", "Soft on skin", "Fade resistant", "Budget-friendly"],
    sizes: ["Single", "Double", "Queen"],
    price_from: 650,
    mrp: 950,
    rating: 4.2,
    reviews: 312,
    badge: "Value",
    img: IMG.bedding.bedcover,
  },
  // Cushions
  {
    slug: "hd-cushion",
    name: "HD Foam Cushion",
    type: "cushion",
    category: "Cushions",
    tagline: "High-density foam — firm, long-lasting shape",
    features: ["High-density foam fill", "Firm supportive feel", "Holds shape over time", "Multiple sizes available"],
    sizes: ['12×12"', '16×16"', '18×18"'],
    price_from: 250,
    mrp: 400,
    rating: 4.3,
    reviews: 274,
    badge: null,
    img: IMG.bedding.cushion,
  },
  {
    slug: "ld-cushion",
    name: "LD Foam Cushion",
    type: "cushion",
    category: "Cushions",
    tagline: "Soft LD foam — plush seating comfort",
    features: ["Low-density foam fill", "Soft & plush feel", "Lightweight", "Ideal for sofas & chairs"],
    sizes: ['12×12"', '16×16"'],
    price_from: 180,
    mrp: 300,
    rating: 4.1,
    reviews: 198,
    badge: null,
    img: IMG.bedding.cushion,
  },
];

const FILTER_TABS = [
  { label: "All Products", value: "" },
  { label: "Pillows", value: "pillow" },
  { label: "Quilts", value: "quilt" },
  { label: "Bed Covers", value: "bedcover" },
  { label: "Cushions", value: "cushion" },
];

const CATEGORY_COLORS: Record<string, string> = {
  Pillows: "bg-blue-50 border-blue-200",
  Quilts: "bg-violet-50 border-violet-200",
  "Bed Covers": "bg-amber-50 border-amber-200",
  Cushions: "bg-emerald-50 border-emerald-200",
};

interface Props {
  searchParams: Promise<{ type?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { type } = await searchParams;
  const labels: Record<string, string> = {
    pillow: "Pillows",
    "pillow-recron": "Recron Pillows",
    "pillow-vacuum": "Vacuum Pillows",
    "pillow-cotton": "Silk Cotton Pillows",
    quilt: "Quilts",
    bedcover: "Bed Covers",
    cushion: "Cushions",
  };
  const label = type ? labels[type] : null;
  return {
    title: label
      ? `${label} — Telflex Pillows & Bedding Kerala`
      : "Pillows, Quilts & Bedding — Telflex Kerala",
    description:
      "Buy Telflex pillows, quilts, bed covers and cushions online. Recron, vacuum & silk cotton pillows. Free delivery across South India.",
    alternates: { canonical: type ? `/collections/bedding?type=${type}` : "/collections/bedding" },
  };
}

export default async function BeddingPage({ searchParams }: Props) {
  const { type } = await searchParams;

  const filtered = type
    ? CATALOG.filter((p) => p.type === type || p.type.startsWith(type))
    : CATALOG;

  const groupedByCategory = filtered.reduce<Record<string, typeof CATALOG>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src={IMG.bedding.hero} alt="Telflex pillows and bedding" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 via-indigo-800/75 to-indigo-900/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-lg">
            <h1 className="font-display font-bold text-4xl md:text-5xl text-white leading-tight mb-4">
              Pillows &amp; Bedding
            </h1>
            <p className="text-white/80 text-lg mb-6">
              Complete your sleep setup with Telflex pillows, quilts, bed covers and cushions — made with the same care as our mattresses.
            </p>
            <div className="flex gap-3 flex-wrap text-sm">
              <span className="bg-white/15 text-white px-3 py-1.5 rounded-full border border-white/20">
                <Truck size={12} className="inline mr-1" />Free delivery
              </span>
              <span className="bg-white/15 text-white px-3 py-1.5 rounded-full border border-white/20">
                9 products
              </span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg viewBox="0 0 1440 40" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="text-xs text-muted mb-6">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-ink">Pillows & Bedding</span>
        </nav>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {FILTER_TABS.map((tab) => {
            const isActive = tab.value === "" ? !type : type === tab.value;
            return (
              <Link
                key={tab.value}
                href={tab.value ? `/collections/bedding?type=${tab.value}` : "/collections/bedding"}
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

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted">
            <p className="text-lg">No products found.</p>
            <Link href="/collections/bedding" className="mt-3 inline-block text-primary hover:underline">View all</Link>
          </div>
        ) : (
          Object.entries(groupedByCategory).map(([category, items]) => (
            <section key={category} className="mb-14">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="font-display font-bold text-2xl text-ink">{category}</h2>
                <span className="text-sm text-muted">{items.length} product{items.length !== 1 ? "s" : ""}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {items.map((product) => (
                  <Link key={product.slug} href={`/products/${product.slug}`} className="group">
                    <article className={`rounded-3xl border overflow-hidden shadow-card group-hover:shadow-card-hover group-hover:-translate-y-1 transition-all duration-300 h-full flex flex-col ${CATEGORY_COLORS[product.category] ?? "bg-white border-line"}`}>
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={product.img}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        {product.badge && (
                          <div className="absolute top-3 left-3">
                            <Badge variant={product.badge === "Bestseller" ? "sale" : product.badge === "Natural" ? "success" : "primary"}>
                              {product.badge}
                            </Badge>
                          </div>
                        )}
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <h3 className="font-display font-bold text-sm text-ink group-hover:text-primary transition-colors mb-1">
                          {product.name}
                        </h3>
                        <p className="text-xs text-muted mb-3 flex-1">{product.tagline}</p>
                        <ul className="space-y-1 mb-3">
                          {product.features.slice(0, 2).map((f) => (
                            <li key={f} className="text-xs text-muted flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {product.sizes.slice(0, 3).map((s) => (
                            <span key={s} className="text-xs border border-line rounded-md px-2 py-0.5 text-muted bg-white">{s}</span>
                          ))}
                        </div>
                        <div className="flex items-center gap-1 mb-3">
                          <Star size={11} className="fill-amber-400 text-amber-400" />
                          <span className="text-xs font-semibold">{product.rating}</span>
                          <span className="text-xs text-muted">({product.reviews})</span>
                        </div>
                        <div className="flex items-end justify-between">
                          <div>
                            <div className="font-bold text-base text-ink">{formatPrice(product.price_from)}</div>
                            <div className="text-xs text-muted line-through">{formatPrice(product.mrp)}</div>
                          </div>
                          <Button variant="primary" size="sm">View</Button>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
