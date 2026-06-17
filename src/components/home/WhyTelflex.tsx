import Image from "next/image";
import { Factory, Leaf, Package, HeadphonesIcon } from "lucide-react";
import { IMG } from "@/lib/images";

const PILLARS = [
  { icon: Factory, title: "Made in Kerala", color: "bg-blue-100 text-blue-700",
    desc: "Every mattress manufactured at our own factory. Factory-direct means no middleman — better quality, lower price." },
  { icon: Leaf, title: "Certified Materials", color: "bg-emerald-100 text-emerald-700",
    desc: "CertiPUR-grade foam, tested fabrics. Our covers are anti-microbial and durability-certified before leaving the factory." },
  { icon: Package, title: "Vacuum-Rolled Delivery", color: "bg-amber-100 text-amber-700",
    desc: "Arrives compressed in a box. Unroll, wait 24 hours — expands to perfect shape. Easy for any home, any floor." },
  { icon: HeadphonesIcon, title: "Real After-Sales Support", color: "bg-rose-100 text-rose-700",
    desc: "We're a local Kerala brand. Call, WhatsApp, or visit our showroom — real people, fast resolution, always." },
];

const STATS = [
  { val: "25+", label: "Years" },
  { val: "1L+", label: "Families" },
  { val: "14", label: "Collections" },
  { val: "1,100+", label: "Variants" },
];

export default function WhyTelflex() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — Image collage */}
          <div className="relative">
            {/* Main image */}
            <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5]">
              <Image
                src={IMG.about.bedroom}
                alt="Telflex bedroom"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />

              {/* Stats overlay */}
              <div className="absolute bottom-6 left-6 right-6 grid grid-cols-2 gap-3">
                {STATS.map((s) => (
                  <div key={s.label} className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg">
                    <div className="font-display font-bold text-2xl text-primary">{s.val}</div>
                    <div className="text-xs text-muted">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-5 -right-5 bg-amber-400 text-white rounded-2xl p-4 shadow-xl rotate-3">
              <div className="font-display font-bold text-2xl">₹3,090</div>
              <div className="text-xs font-semibold">Starting from</div>
            </div>

            {/* Blob decoration */}
            <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-primary-tint blob-1 -z-10" />
            <div className="absolute -top-10 left-20 w-24 h-24 bg-amber-100 blob-3 -z-10" />
          </div>

          {/* Right — Copy */}
          <div>
            <span className="inline-block px-4 py-1.5 bg-primary-tint text-primary text-xs font-bold rounded-full uppercase tracking-widest mb-4">
              Why Telflex?
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-ink leading-tight mb-4">
              Kerala's manufacturer,<br />
              <span className="text-primary">not just a brand.</span>
            </h2>
            <p className="text-muted leading-relaxed text-lg mb-10">
              Since 2000, we've crafted every mattress right here in Kerala — not importing, not outsourcing.
              Our manufacturing roots give us quality control no reseller brand can match.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {PILLARS.map((p) => (
                <div key={p.title} className="flex gap-4 p-4 rounded-2xl border border-line hover:shadow-card transition-shadow">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${p.color}`}>
                    <p.icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink text-sm mb-1">{p.title}</h3>
                    <p className="text-xs text-muted leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
