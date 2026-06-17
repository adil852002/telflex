import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { IMG } from "@/lib/images";

const CATEGORIES = [
  {
    title: "Foam Mattresses",
    sub: "14 families · Economy to Premium",
    href: "/collections/mattresses",
    img: IMG.categories.foam,
    badge: "Most Popular",
    badgeColor: "bg-primary text-white",
    overlay: "from-blue-900/80 to-primary/60",
  },
  {
    title: "Cotton Mattresses",
    sub: "Silk Cotton, Recron & Mill Cotton",
    href: "/collections/cotton-mattresses",
    img: IMG.categories.cotton,
    badge: "Natural",
    badgeColor: "bg-amber-500 text-white",
    overlay: "from-amber-900/80 to-yellow-700/60",
  },
  {
    title: "Pillows & Quilts",
    sub: "Recron, Vacuum & Silk Cotton",
    href: "/collections/bedding",
    img: IMG.categories.pillows,
    badge: "Sleep Better",
    badgeColor: "bg-emerald-600 text-white",
    overlay: "from-emerald-900/80 to-teal-700/60",
  },
  {
    title: "Baby Beds",
    sub: "Safe, soft & designed for infants",
    href: "/collections/baby-mattresses",
    img: IMG.categories.baby,
    badge: "For Infants",
    badgeColor: "bg-rose-500 text-white",
    overlay: "from-rose-900/80 to-pink-700/60",
  },
  {
    title: "Hostel / Bulk",
    sub: "LD · HD · Coir · B2B pricing",
    href: "/collections/institutional",
    img: IMG.categories.bulk,
    badge: "Wholesale",
    badgeColor: "bg-slate-700 text-white",
    overlay: "from-slate-900/80 to-slate-700/60",
  },
  {
    title: "Telflex Premium",
    sub: "Vertigo · Descanso · Pearls · Siesta",
    href: "/premium",
    img: IMG.categories.premium,
    badge: "✨ Luxury",
    badgeColor: "bg-gold-gradient text-[#0C0C0E]",
    overlay: "from-black/90 to-black/50",
    special: true,
  },
];

export default function CategoryTiles() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary-tint text-primary text-xs font-bold rounded-full uppercase tracking-widest mb-3">
            Our Collections
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-ink">Explore Our Range</h2>
          <p className="mt-3 text-muted max-w-xl mx-auto text-lg">
            Every Telflex mattress is crafted in Kerala — from everyday comfort to ultra-luxury sleep.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="group relative rounded-3xl overflow-hidden aspect-[4/3] block"
            >
              {/* Image */}
              <Image
                src={cat.img}
                alt={cat.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
              />

              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${cat.overlay} transition-opacity duration-300`} />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-6">
                <span className={`self-start text-xs font-bold px-3 py-1 rounded-full ${cat.badgeColor}`}>
                  {cat.badge}
                </span>
                <div>
                  <h3 className={`font-display font-bold text-xl mb-1 text-white ${cat.special ? "gold-shimmer-text" : ""}`}>
                    {cat.title}
                  </h3>
                  <p className="text-white/70 text-sm mb-3">{cat.sub}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/90 group-hover:gap-3 transition-all">
                    Shop now <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
