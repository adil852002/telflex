import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Star, Shield, Heart, Leaf, Truck } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { IMG } from "@/lib/images";

export const metadata: Metadata = {
  title: "Baby & Kids Mattresses — Safe Sleep for Children | Telflex Kerala",
  description:
    "Buy hypoallergenic baby and kids mattresses online. Firm support for healthy spine development. Washable covers, chemical-free foam. Free delivery across South India. Telflex Kerala.",
  alternates: { canonical: "/collections/baby" },
  openGraph: {
    title: "Baby & Kids Mattresses — Safe Sleep | Telflex",
    description: "Hypoallergenic baby and kids mattresses from Kerala's leading manufacturer. Free delivery, 30-night trial.",
    url: "/collections/baby",
  },
};

const MATTRESSES = [
  {
    slug: "kiddo",
    name: "Telflex Kiddo",
    badge: "Best for Kids",
    tagline: "Safe, firm sleep for growing children",
    description:
      "The Kiddo is engineered specifically for children aged 3–15. A firm foam core supports healthy spine development while the zip-off, washable cover keeps things hygienic. 100% hypoallergenic materials — no off-gassing, no harsh chemicals.",
    features: [
      "Hypoallergenic CFC-free foam",
      "Zip-off washable cover",
      "Firm support for spine development",
      "Anti-bacterial & anti-fungal treatment",
      "Breathable knitted fabric",
      "Safe for children aged 3–15",
    ],
    sizes: [
      { label: '48×30" (Toddler)', note: "Age 2–5" },
      { label: '60×36" (Single Small)', note: "Age 5–10" },
      { label: '72×36" (Single)', note: "Age 10–15" },
    ],
    price_from: 4200,
    mrp_from: 6000,
    rating: 4.5,
    reviews: 267,
    img: IMG.babyCollection.hero,
  },
];

const ACCESSORIES = [
  {
    name: "Baby Recron Pillow",
    tagline: "Soft hypoallergenic pillow for infants & toddlers",
    features: ["Hypoallergenic recron fibre", "Soft & supportive", "Washable cotton cover", "Safe for infants 12m+"],
    sizes: ['12×18"', '14×20"'],
    price_from: 280,
    mrp: 420,
    img: IMG.bedding.pillow,
  },
  {
    name: "Baby Bed Cover",
    tagline: "Ultra-soft breathable cotton bedcover",
    features: ["100% cotton fabric", "Ultra-soft on baby skin", "Fade & shrink resistant", "Easy machine wash"],
    sizes: ['24×36"', '30×45"'],
    price_from: 450,
    mrp: 650,
    img: IMG.bedding.bedcover,
  },
  {
    name: "Kids Pillow",
    tagline: "Medium-firm pillow for older children",
    features: ["Medium-firm support", "Anti-allergen treatment", "Washable cover", "Ideal for age 5–15"],
    sizes: ['14×22"', '16×24"'],
    price_from: 320,
    mrp: 480,
    img: IMG.bedding.pillow,
  },
];

const SAFETY_BADGES = [
  { icon: Shield, title: "Hypoallergenic", desc: "No synthetic dyes, adhesives or harsh chemicals. Safe for sensitive skin." },
  { icon: Leaf, title: "Chemical-Free Foam", desc: "CFC-free foam certified safe — no off-gassing that could harm children." },
  { icon: Heart, title: "Spine-Safe Firmness", desc: "Recommended firmness level for proper spinal development in growing children." },
  { icon: Star, title: "Washable Covers", desc: "Zip-off covers that go straight into the washing machine — hygiene made easy." },
];

export default function BabyPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src={IMG.babyCollection.hero} alt="Baby and kids sleep products" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-rose-900/85 via-rose-800/70 to-rose-900/30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-rose-400/20 text-rose-200 text-xs font-bold rounded-full border border-rose-400/30 mb-5">
              <Heart size={12} /> Safe for Little Ones
            </span>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-white leading-tight mb-4">
              Baby &amp; Kids Sleep
            </h1>
            <p className="text-white/80 text-lg leading-relaxed mb-8">
              Hypoallergenic, washable, and built to support growing spines. Because great sleep matters most when they're young.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Free delivery", "30-night trial", "Hypoallergenic materials"].map((txt) => (
                <span key={txt} className="flex items-center gap-1.5 bg-white/15 text-white text-sm px-4 py-2 rounded-full border border-white/20">
                  {txt === "Free delivery" && <Truck size={12} />}
                  {txt === "30-night trial" && <Shield size={12} />}
                  {txt === "Hypoallergenic materials" && <Leaf size={12} />}
                  {txt}
                </span>
              ))}
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
        <nav className="text-xs text-muted mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-ink">Baby & Kids</span>
        </nav>

        {/* Safety badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {SAFETY_BADGES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-rose-50 border border-rose-100 rounded-2xl p-5">
              <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center mb-3">
                <Icon size={18} className="text-rose-600" />
              </div>
              <h3 className="font-semibold text-sm text-ink mb-1">{title}</h3>
              <p className="text-xs text-muted leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Main mattress */}
        <h2 className="font-display font-bold text-2xl text-ink mb-6">Kids Mattresses</h2>
        {MATTRESSES.map((product) => {
          const discount = calculateDiscount(product.mrp_from, product.price_from);
          return (
            <article key={product.slug} className="bg-white border border-line rounded-3xl overflow-hidden shadow-card mb-14">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={product.img}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge variant="sale">{product.badge}</Badge>
                  </div>
                  {discount >= 20 && (
                    <div className="absolute top-4 right-4">
                      <Badge variant="success">{discount}% OFF</Badge>
                    </div>
                  )}
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <h3 className="font-display font-bold text-2xl text-ink mb-1">{product.name}</h3>
                  <p className="text-muted mb-4">{product.tagline}</p>
                  <p className="text-sm text-muted leading-relaxed mb-5">{product.description}</p>

                  <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-5">
                    {product.features.map((f) => (
                      <li key={f} className="text-xs text-muted flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-2 mb-5">
                    {product.sizes.map((s) => (
                      <div key={s.label} className="flex items-center gap-3">
                        <span className="text-xs border border-line rounded-lg px-3 py-1.5 font-medium text-ink min-w-[140px]">{s.label}</span>
                        <span className="text-xs text-muted">{s.note}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 mb-5">
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

        {/* Accessories */}
        <h2 className="font-display font-bold text-2xl text-ink mb-6">Baby & Kids Accessories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {ACCESSORIES.map((acc) => (
            <article key={acc.name} className="bg-rose-50 border border-rose-100 rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={acc.img}
                  alt={acc.name}
                  fill
                  className="object-cover"
                  sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="font-display font-bold text-base text-ink mb-1">{acc.name}</h3>
                <p className="text-xs text-muted mb-3">{acc.tagline}</p>
                <ul className="space-y-1 mb-4">
                  {acc.features.map((f) => (
                    <li key={f} className="text-xs text-muted flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-rose-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1 mb-4">
                  {acc.sizes.map((s) => (
                    <span key={s} className="text-xs border border-rose-200 rounded-md px-2 py-0.5 text-muted bg-white">{s}</span>
                  ))}
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="font-bold text-base text-ink">{formatPrice(acc.price_from)}</div>
                    <div className="text-xs text-muted line-through">{formatPrice(acc.mrp)}</div>
                  </div>
                  <Button variant="primary" size="sm">View</Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Age guide */}
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-100 rounded-3xl p-8 mb-12">
          <h2 className="font-display font-bold text-xl text-ink mb-6">Which Size Is Right?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { age: "Age 2–5 (Toddler)", size: '48×30"', note: "Toddler bed or cot" },
              { age: "Age 5–10 (Child)", size: '60×36"', note: "Single small bed frame" },
              { age: "Age 10–15 (Pre-teen)", size: '72×36"', note: "Standard single bed" },
            ].map((row) => (
              <div key={row.age} className="bg-white rounded-2xl p-5 border border-rose-100">
                <p className="text-xs font-bold text-rose-600 uppercase tracking-wide mb-1">{row.age}</p>
                <p className="font-display font-bold text-xl text-ink">{row.size}</p>
                <p className="text-xs text-muted mt-1">{row.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary rounded-3xl p-10 text-center text-white">
          <h2 className="font-display font-bold text-3xl mb-2">Give your child the best sleep</h2>
          <p className="text-white/80 mb-6">Free delivery · 30-night trial · Hypoallergenic guarantee</p>
          <Link href="/products/kiddo">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90" variant="primary">
              Shop Kiddo Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
