"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart, Menu, X, ChevronDown, Phone } from "lucide-react";
import { useCartStore } from "@/hooks/useCart";

const NAV = [
  {
    label: "Mattresses",
    href: "/collections/mattresses",
    mega: [
      {
        group: "Premium Range",
        items: [
          { label: "Vertigo", href: "/products/vertigo", desc: "Top-of-range comfort" },
          { label: "Descanso", href: "/products/descanso", desc: "Multi-zone deep sleep" },
          { label: "Pearls", href: "/products/pearls", desc: "Cooling pearl foam" },
          { label: "Siesta", href: "/products/siesta", desc: "South India favourite" },
        ],
      },
      {
        group: "Mid Range",
        items: [
          { label: "Sereno", href: "/products/sereno", desc: "Great value HD foam" },
          { label: "Cera", href: "/products/cera", desc: "Ceramic-cool cover" },
          { label: "Orthocare", href: "/products/orthocare", desc: "Orthopedic firm" },
          { label: "40 Plus", href: "/products/40-plus", desc: "Designed for 40+" },
        ],
      },
      {
        group: "Economy Range",
        items: [
          { label: "Hitech", href: "/products/hitech", desc: "Affordable quality" },
          { label: "iSoft", href: "/products/isoft", desc: "Soft everyday sleep" },
          { label: "Dreams", href: "/products/dreams", desc: "Upgrade from basic" },
          { label: "Crown / Moon / Prince", href: "/collections/mattresses?tier=economy", desc: "Budget options" },
        ],
      },
    ],
  },
  {
    label: "Cotton Mattresses",
    href: "/collections/cotton-mattresses",
  },
  {
    label: "Pillows & Bedding",
    href: "/collections/bedding",
    mega: [
      {
        group: "Pillows",
        items: [
          { label: "Recron Pillows", href: "/collections/bedding?type=pillow-recron", desc: "Soft fibre fill" },
          { label: "Vacuum Pillows", href: "/collections/bedding?type=pillow-vacuum", desc: "Compressed travel-ready" },
          { label: "Silk Cotton Pillows", href: "/collections/bedding?type=pillow-cotton", desc: "Traditional comfort" },
        ],
      },
      {
        group: "Bedding",
        items: [
          { label: "Quilts", href: "/collections/bedding?type=quilt", desc: "Recron filled" },
          { label: "Bed Covers", href: "/collections/bedding?type=bedcover", desc: "GSM & Classic" },
          { label: "Cushions", href: "/collections/bedding?type=cushion", desc: "LD & HD foam" },
        ],
      },
    ],
  },
  { label: "Baby", href: "/collections/baby" },
  { label: "Bulk / B2B", href: "/bulk-purchase" },
  {
    label: "Premium",
    href: "/premium",
    gold: true,
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const cartCount = useCartStore((s) => s.items.reduce((acc, i) => acc + i.quantity, 0));
  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const openMega = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(label);
  };

  const closeMega = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(null), 120);
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${scrolled ? "shadow-md" : "border-b border-line"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image src="/logo.png" alt="Telflex Mattresses" width={200} height={60} className="h-14 w-auto object-contain" priority />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.mega && openMega(item.label)}
                onMouseLeave={() => item.mega && closeMega()}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    item.gold
                      ? "gold-text font-bold"
                      : "text-ink hover:text-primary hover:bg-primary-tint"
                  }`}
                >
                  {item.label}
                  {item.mega && <ChevronDown size={14} className={`transition-transform ${megaOpen === item.label ? "rotate-180" : ""}`} />}
                </Link>

                {/* Mega menu */}
                {item.mega && megaOpen === item.label && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[580px] bg-white border border-line rounded-2xl shadow-card-hover p-6 grid grid-cols-3 gap-6 animate-fade-in"
                    onMouseEnter={() => openMega(item.label)}
                    onMouseLeave={() => closeMega()}
                  >
                    {item.mega.map((group) => (
                      <div key={group.group}>
                        <p className="text-xs font-bold uppercase tracking-widest text-muted mb-3">{group.group}</p>
                        <ul className="space-y-2">
                          {group.items.map((sub) => (
                            <li key={sub.label}>
                              <Link
                                href={sub.href}
                                className="group block rounded-lg p-2 hover:bg-primary-tint transition-colors"
                                onClick={() => setMegaOpen(null)}
                              >
                                <span className="block text-sm font-semibold text-ink group-hover:text-primary">{sub.label}</span>
                                <span className="block text-xs text-muted mt-0.5">{sub.desc}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/919400000000?text=Hi, I'd like to know more about Telflex mattresses"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-sm font-medium text-success hover:underline px-2 py-1 rounded-lg"
              aria-label="WhatsApp"
            >
              <Phone size={15} />
              <span className="hidden xl:inline">+91 9400000000</span>
            </a>

            <Link
              href="/search"
              aria-label="Search"
              className="p-2 rounded-lg text-ink hover:text-primary hover:bg-primary-tint transition-colors"
            >
              <Search size={20} />
            </Link>

            <Link
              href="/cart"
              aria-label={`Cart (${cartCount} items)`}
              className="relative p-2 rounded-lg text-ink hover:text-primary hover:bg-primary-tint transition-colors"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-ink hover:bg-primary-tint transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-line bg-white animate-slide-up max-h-[80vh] overflow-y-auto">
          <nav className="px-4 py-4 space-y-1" aria-label="Mobile navigation">
            {NAV.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between w-full px-3 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    item.gold
                      ? "bg-premium-bg text-gold-2"
                      : "text-ink hover:bg-primary-tint hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
                {item.mega && (
                  <div className="pl-4 mt-1 space-y-1">
                    {item.mega.flatMap((g) =>
                      g.items.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setMobileOpen(false)}
                          className="block px-3 py-2 text-sm text-muted hover:text-primary rounded-lg hover:bg-primary-tint"
                        >
                          {sub.label}
                        </Link>
                      ))
                    )}
                  </div>
                )}
              </div>
            ))}
            <a
              href="tel:+919400000000"
              className="flex items-center gap-2 px-3 py-3 text-sm font-semibold text-success"
            >
              <Phone size={16} /> +91 9400000000
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
