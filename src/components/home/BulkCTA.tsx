import Link from "next/link";
import Image from "next/image";
import { Building2, Hotel, School, Stethoscope, ArrowRight } from "lucide-react";
import { IMG } from "@/lib/images";

const SECTORS = [
  { icon: Hotel, label: "Hotels & Resorts", color: "bg-blue-900/50" },
  { icon: School, label: "Hostels & PGs", color: "bg-violet-900/50" },
  { icon: Stethoscope, label: "Hospitals", color: "bg-emerald-900/50" },
  { icon: Building2, label: "Guest Houses", color: "bg-amber-900/50" },
];

export default function BulkCTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background image */}
      <Image
        src={IMG.bulk}
        alt="Bulk mattress supply"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/95 via-[#0a1628]/85 to-[#0a1628]/50" />

      {/* Decorative */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none rotate-180">
        <svg viewBox="0 0 1440 48" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,24 C480,48 960,0 1440,24 L1440,48 L0,48 Z" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-400/20 text-amber-300 text-xs font-bold rounded-full border border-amber-400/30 mb-6">
              B2B & Institutional
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white leading-tight mb-4">
              Buying in bulk?<br />
              <span className="text-amber-400">We've got you covered.</span>
            </h2>
            <p className="text-white/70 leading-relaxed text-lg mb-8">
              As a direct manufacturer, Telflex offers unbeatable bulk pricing for hotels, hospitals,
              hostels, and guest houses. Special hostel-grade mattresses from just ₹721 per unit.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {SECTORS.map(({ icon: Icon, label, color }) => (
                <div key={label} className={`flex items-center gap-3 ${color} border border-white/10 rounded-2xl px-4 py-3`}>
                  <Icon size={18} className="text-white/80 shrink-0" />
                  <span className="text-sm text-white/80 font-medium">{label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/bulk-purchase"
                className="px-7 py-3.5 bg-amber-400 text-[#0a1628] font-bold rounded-2xl text-sm hover:bg-amber-300 transition-colors flex items-center gap-2 shadow-lg"
              >
                Get Bulk Quote <ArrowRight size={16} />
              </Link>
              <a
                href="https://wa.me/919400000000?text=I need a bulk mattress quote"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 border-2 border-white/30 text-white font-semibold rounded-2xl text-sm hover:bg-white/10 transition-colors"
              >
                WhatsApp Us
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { val: "₹721", label: "Starting price/unit", sub: "Hostel grade", color: "border-blue-500/30 bg-blue-950/50" },
              { val: "MOQ 10", label: "Minimum order", sub: "Flexible for large orders", color: "border-violet-500/30 bg-violet-950/50" },
              { val: "72 hrs", label: "Delivery (Kerala/TN)", sub: "Pan-India available", color: "border-emerald-500/30 bg-emerald-950/50" },
              { val: "GST Bill", label: "B2B invoicing", sub: "All states covered", color: "border-amber-500/30 bg-amber-950/50" },
            ].map((s) => (
              <div key={s.label} className={`border ${s.color} rounded-2xl p-5 backdrop-blur-sm`}>
                <div className="font-display font-bold text-3xl text-white">{s.val}</div>
                <div className="text-sm font-semibold text-white/80 mt-1">{s.label}</div>
                <div className="text-xs text-white/50 mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
