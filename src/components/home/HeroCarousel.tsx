"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { IMG } from "@/lib/images";

const SLIDES = [
  {
    id: 1,
    eyebrow: "Kerala's #1 Since 2000",
    headline: "Sleep like royalty,\nevery single night.",
    sub: "25 years of manufacturing. Factory-direct pricing. Free delivery across Kerala & South India.",
    cta: { label: "Shop Mattresses", href: "/collections/mattresses" },
    cta2: { label: "Explore Premium ✨", href: "/premium" },
    img: IMG.hero[0],
    accent: "#EAF1FB",
    color: "from-[#0a1628] to-[#15489F]",
  },
  {
    id: 2,
    eyebrow: "30-Night Sleep Trial",
    headline: "Try it at home.\nLove it or return it.",
    sub: "Risk-free sleep. Sleep on it for 30 nights — if you don't love it, we'll pick it up and refund you in full.",
    cta: { label: "Start Your Trial", href: "/collections/mattresses" },
    cta2: { label: "See How It Works", href: "/returns" },
    img: IMG.hero[1],
    accent: "#F0FFF4",
    color: "from-[#0a2010] to-[#1E8E5A]",
  },
  {
    id: 3,
    eyebrow: "No-Cost EMI Available",
    headline: "Premium sleep.\nAffordable payments.",
    sub: "Split into 3, 6 or 12 zero-interest EMIs via UPI, Cards, or Net Banking. Starting ₹999/month.",
    cta: { label: "View EMI Plans", href: "/emi" },
    cta2: { label: "Shop Now", href: "/collections/mattresses" },
    img: IMG.hero[2],
    accent: "#FFF7ED",
    color: "from-[#1a0a00] to-[#92400e]",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % SLIDES.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5500);
    return () => clearInterval(id);
  }, [paused, next]);

  const slide = SLIDES[current];

  return (
    <section
      className="relative h-[90vh] min-h-[600px] max-h-[820px] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background image */}
      <Image
        key={slide.id}
        src={slide.img}
        alt="Telflex bedroom"
        fill
        className="object-cover transition-all duration-700"
        priority
        sizes="100vw"
      />

      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} opacity-80`} />

      {/* Decorative blob */}
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-10 bg-white blur-3xl" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl" key={slide.id}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-white/90 text-xs font-bold backdrop-blur-sm mb-6 border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              {slide.eyebrow}
            </span>

            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] whitespace-pre-line mb-5 drop-shadow-lg">
              {slide.headline}
            </h1>

            <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-lg">{slide.sub}</p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                href={slide.cta.href}
                className="px-7 py-3.5 bg-white text-primary font-bold rounded-2xl text-sm hover:bg-white/95 hover:scale-105 transition-all shadow-lg"
              >
                {slide.cta.label}
              </Link>
              <Link
                href={slide.cta2.href}
                className="px-7 py-3.5 border-2 border-white/50 text-white font-semibold rounded-2xl text-sm hover:bg-white/10 hover:border-white transition-all"
              >
                {slide.cta2.label}
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                  {["A","R","P","M"].map((l, i) => (
                    <div key={i} className="w-7 h-7 rounded-full bg-white/30 border-2 border-white/50 flex items-center justify-center text-white text-xs font-bold">
                      {l}
                    </div>
                  ))}
                </div>
                <span className="text-xs text-white/70">1 Lakh+ families</span>
              </div>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => <Star key={i} size={12} className="fill-amber-400 text-amber-400" />)}
                <span className="text-xs text-white/70 ml-1">4.8 rating</span>
              </div>
              <span className="text-xs text-white/60 bg-white/10 rounded-full px-3 py-1">Free Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" fill="white" xmlns="http://www.w3.org/2000/svg" className="block">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z" />
        </svg>
      </div>

      {/* Dots */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-white" : "w-2 bg-white/40"}`}
          />
        ))}
      </div>

      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors z-10 backdrop-blur-sm">
        <ChevronLeft size={20} />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors z-10 backdrop-blur-sm">
        <ChevronRight size={20} />
      </button>
    </section>
  );
}
