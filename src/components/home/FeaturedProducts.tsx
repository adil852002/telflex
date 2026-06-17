import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Zap } from "lucide-react";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { IMG } from "@/lib/images";

const FEATURED = [
  {
    slug: "descanso",
    family: "Descanso",
    tagline: "Multi-zone deep sleep",
    tier: "premium" as const,
    mrp: 36000,
    base: 24500,
    rating: 4.8,
    reviews: 347,
    badge: "Best Seller",
    badgeBg: "bg-primary",
    features: ["Euro-top quilted", "Motion isolation", "10-yr warranty"],
    img: IMG.products.descanso,
    accentBg: "from-blue-50 to-indigo-50",
  },
  {
    slug: "siesta",
    family: "Siesta",
    tagline: "South India's favourite feel",
    tier: "premium" as const,
    mrp: 22000,
    base: 14500,
    rating: 4.7,
    reviews: 512,
    badge: "Most Popular in Kerala",
    badgeBg: "bg-rose-500",
    features: ["Medium-firm feel", "Adaptive support", "30-night trial"],
    img: IMG.products.siesta,
    accentBg: "from-rose-50 to-orange-50",
  },
  {
    slug: "sereno",
    family: "Sereno",
    tagline: "Outstanding mid-range value",
    tier: "mid" as const,
    mrp: 12000,
    base: 8500,
    rating: 4.6,
    reviews: 288,
    badge: "Great Value",
    badgeBg: "bg-emerald-600",
    features: ["HR foam core", "Breathable cover", "5-yr warranty"],
    img: IMG.products.sereno,
    accentBg: "from-emerald-50 to-teal-50",
  },
  {
    slug: "orthocare",
    family: "Orthocare",
    tagline: "Engineered for back health",
    tier: "mid" as const,
    mrp: 14000,
    base: 9800,
    rating: 4.7,
    reviews: 421,
    badge: "Doctor's Choice",
    badgeBg: "bg-amber-500",
    features: ["40D ortho-foam", "Back pain relief", "7-yr warranty"],
    img: IMG.products.orthocare,
    accentBg: "from-amber-50 to-yellow-50",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Top wave */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none rotate-180">
        <svg viewBox="0 0 1440 48" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,24 C480,48 960,0 1440,24 L1440,48 L0,48 Z" />
        </svg>
      </div>

      {/* Decorative blobs */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-primary-tint rounded-full opacity-40 blur-3xl -z-0" />
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-amber-100 rounded-full opacity-50 blur-3xl -z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 text-xs font-bold rounded-full uppercase tracking-widest mb-3">
              Top Picks
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-ink">Our Best Mattresses</h2>
            <p className="mt-2 text-muted text-lg">Most loved by families across Kerala & South India</p>
          </div>
          <Link href="/collections/mattresses" className="hidden md:flex items-center gap-2 text-sm font-bold text-primary bg-primary-tint px-4 py-2 rounded-xl hover:bg-primary hover:text-white transition-colors">
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED.map((p) => {
            const disc = calculateDiscount(p.mrp, p.base);
            return (
              <Link key={p.slug} href={`/products/${p.slug}`} className="group">
                <div className="bg-white rounded-3xl overflow-hidden shadow-card group-hover:shadow-card-hover group-hover:-translate-y-2 transition-all duration-300">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={p.img}
                      alt={`Telflex ${p.family} mattress`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className={`text-xs font-bold text-white px-2.5 py-1 rounded-full ${p.badgeBg}`}>
                        {p.badge}
                      </span>
                    </div>
                    {disc > 0 && (
                      <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                        {disc}% OFF
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="flex items-center gap-1">
                        {[1,2,3,4,5].map(i => (
                          <Star key={i} size={11} className={i <= Math.floor(p.rating) ? "fill-amber-400 text-amber-400" : "fill-white/30 text-white/30"} />
                        ))}
                        <span className="text-xs text-white/90 ml-1">{p.rating} ({p.reviews})</span>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className={`p-4 bg-gradient-to-b ${p.accentBg}`}>
                    <h3 className="font-display font-bold text-lg text-ink group-hover:text-primary transition-colors">
                      Telflex {p.family}
                    </h3>
                    <p className="text-sm text-muted mt-0.5 mb-3">{p.tagline}</p>

                    <ul className="space-y-1 mb-4">
                      {p.features.map((f) => (
                        <li key={f} className="text-xs text-muted flex items-center gap-1.5">
                          <Zap size={10} className="text-primary shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-xl text-ink">{formatPrice(p.base)}</span>
                        <span className="text-xs text-muted line-through ml-2">{formatPrice(p.mrp)}</span>
                      </div>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                        Save {formatPrice(p.mrp - p.base)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/collections/mattresses">
            <button className="px-6 py-3 border-2 border-primary text-primary font-bold rounded-2xl hover:bg-primary hover:text-white transition-colors">
              View All Mattresses
            </button>
          </Link>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 48" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,24 C480,48 960,0 1440,24 L1440,48 L0,48 Z" />
        </svg>
      </div>
    </section>
  );
}
