import type { Metadata } from "next";
import Link from "next/link";
import { Star, Shield, Truck, RefreshCw, ArrowRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { formatPrice, calculateDiscount } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Premium Mattresses — Telflex Luxury Sleep Collection",
  description:
    "Discover Telflex's premium mattress collection: Vertigo, Descanso, Pearls & Siesta. Luxury memory foam, Euro-top & pillow-top mattresses. Free delivery. 30-night trial.",
  alternates: { canonical: "/premium" },
  openGraph: {
    title: "Telflex Premium — Luxury Mattress Collection",
    description: "Ultra-premium sleep engineering. Free delivery across South India.",
    url: "/premium",
  },
};

const PREMIUM_RANGE = [
  {
    slug: "vertigo",
    name: "Vertigo",
    tagline: "Ultra-premium sleep engineering",
    description: "Our flagship mattress. Multiple memory foam layers, cool-gel technology, and a hand-stitched pillow top create an unmatched sleep surface.",
    price_from: 32000,
    mrp_from: 48000,
    rating: 4.9,
    reviews: 248,
    highlights: ["Cool-gel memory foam", "Hand-stitched pillow top", "10-year warranty"],
    emoji: "✨",
  },
  {
    slug: "descanso",
    name: "Descanso",
    tagline: "Luxury comfort, deep support",
    description: "High-density foam with Euro-top quilting and motion isolation. Perfect for couples who value undisturbed sleep.",
    price_from: 24500,
    mrp_from: 36000,
    rating: 4.8,
    reviews: 312,
    highlights: ["Euro-top quilted cover", "Motion isolation", "Breathable micro-perf cover"],
    emoji: "🌙",
  },
  {
    slug: "pearls",
    name: "Pearls",
    tagline: "Pressure-relieving luxury",
    description: "Micro-coil support system with plush quilted layers eliminates pressure points for a cloud-like sleep experience.",
    price_from: 18500,
    mrp_from: 28000,
    rating: 4.7,
    reviews: 189,
    highlights: ["Micro-coil support", "Plush quilted top", "Anti-microbial cover"],
    emoji: "💎",
  },
  {
    slug: "siesta",
    name: "Siesta",
    tagline: "Deep rest for restless nights",
    description: "Convoluted foam layers with adaptive support technology that responds to your body contours through the night.",
    price_from: 14500,
    mrp_from: 22000,
    rating: 4.8,
    reviews: 276,
    highlights: ["Convoluted foam tech", "Adaptive body contouring", "Premium knitted cover"],
    emoji: "🌟",
  },
];

export default function PremiumPage() {
  return (
    <div className="bg-premium-bg min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4">
            <span className="text-xs font-bold uppercase tracking-[0.25em] gold-text">Telflex Premium</span>
          </div>
          <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
            <span className="text-white">Sleep Like</span>
            <br />
            <span className="gold-shimmer-text">Royalty</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto mb-10">
            Our premium collection is engineered for those who understand that exceptional sleep is not an indulgence — it's an investment in every waking hour.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { icon: Truck, text: "Free Delivery" },
              { icon: RefreshCw, text: "30-Night Trial" },
              { icon: Shield, text: "10-Year Warranty" },
              { icon: Star, text: "Factory-Direct" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm text-white/70">
                <Icon size={14} className="text-gold-3" />
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Decorative gradient */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gold-gradient opacity-5 blur-3xl" />
        </div>
      </section>

      {/* Collection grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PREMIUM_RANGE.map((product) => {
            const discount = calculateDiscount(product.mrp_from, product.price_from);
            return (
              <Link key={product.slug} href={`/products/${product.slug}`} className="group">
                <article className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden group-hover:border-gold-3/50 transition-all duration-300 group-hover:shadow-premium">
                  {/* Image area */}
                  <div className="aspect-video bg-gradient-to-br from-white/5 to-gold-gradient/10 flex items-center justify-center text-8xl relative">
                    <span className="group-hover:scale-110 transition-transform duration-500">{product.emoji}</span>
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge variant="gold">Premium</Badge>
                      {discount >= 30 && (
                        <Badge variant="sale">{discount}% OFF</Badge>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="font-display font-bold text-2xl text-white group-hover:gold-text transition-colors">
                      Telflex {product.name}
                    </h2>
                    <p className="text-white/50 text-sm mt-0.5 mb-3">{product.tagline}</p>
                    <p className="text-white/70 text-sm leading-relaxed mb-4">{product.description}</p>

                    {/* Highlights */}
                    <ul className="space-y-1.5 mb-5">
                      {product.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2 text-xs text-white/60">
                          <span className="w-1 h-1 rounded-full bg-gold-3" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-5">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} size={12} className={i <= Math.floor(product.rating) ? "fill-gold-3 text-gold-3" : "text-white/20"} />
                        ))}
                      </div>
                      <span className="text-xs text-white/60">{product.rating} ({product.reviews} reviews)</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="font-bold text-2xl gold-text">{formatPrice(product.price_from)}</div>
                        <div className="text-xs text-white/40 line-through">{formatPrice(product.mrp_from)}</div>
                      </div>
                      <div className="flex items-center gap-1 text-sm font-semibold text-gold-3 group-hover:gap-2 transition-all">
                        View Details <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Testimonials — premium look */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h2 className="font-display font-bold text-3xl text-center mb-8">
          <span className="gold-text">What Our Customers Say</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: "Aravind Menon", city: "Kochi", text: "The Descanso is genuinely the best sleep I've had in 15 years. I bought it during a sale and it's worth every paisa at full price.", rating: 5 },
            { name: "Lalitha S", city: "Chennai", text: "I was sceptical about buying a mattress online. The 30-night trial removed all doubt. The Vertigo is exceptional.", rating: 5 },
            { name: "Preetham Rao", city: "Bengaluru", text: "Compared with hotel mattresses I've slept on at 5-star properties — the Descanso is on par. Factory-direct makes it incredible value.", rating: 5 },
            { name: "Suma Krishnan", city: "Thiruvananthapuram", text: "My back pain disappeared within a week of switching to the Siesta. My orthopaedist even asked what mattress I was sleeping on!", rating: 5 },
          ].map((review) => (
            <div key={review.name} className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="flex gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={12} className="fill-gold-3 text-gold-3" />
                ))}
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-4">"{review.text}"</p>
              <div className="text-xs text-white/40">{review.name} · {review.city}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 text-center">
        <div className="border border-gold-3/30 rounded-3xl p-10 bg-white/3 backdrop-blur-sm">
          <div className="text-3xl mb-4">✨</div>
          <h2 className="font-display font-bold text-3xl text-white mb-2">Elevate Your Sleep</h2>
          <p className="text-white/60 mb-6">
            Free delivery · 30-night trial · 10-year warranty · No-Cost EMI available
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/collections/mattresses"
              className="px-8 py-3 bg-gold-gradient text-[#0C0C0E] font-bold rounded-xl text-sm hover:opacity-90 transition-opacity"
            >
              Shop All Mattresses
            </Link>
            <a
              href="https://wa.me/919400000000?text=Hi, I'm interested in the Telflex Premium range"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-gold-3/50 text-gold-3 font-semibold rounded-xl text-sm hover:bg-gold-3/10 transition-colors"
            >
              WhatsApp for Advice
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
