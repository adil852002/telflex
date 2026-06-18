"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Truck, Shield, RefreshCw, ChevronDown, ChevronUp, Plus, Minus, ShoppingCart, MessageCircle, CheckCircle } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { useCartStore } from "@/hooks/useCart";
import { IMG } from "@/lib/images";

// Static product data — in production, fetch from Supabase by slug
const PRODUCTS: Record<string, {
  slug: string;
  family: string;
  tier: "premium" | "mid" | "economy";
  tagline: string;
  description: string;
  features: string[];
  sizes: { label: string; code: string }[];
  thicknesses: { label: string; code: string }[];
  topTypes: { label: string; code: string }[];
  pricing: Record<string, number>; // variantKey → price
  mrp: Record<string, number>;
  rating: number;
  reviews: number;
  trial_nights: number;
  warranty_years: number;
  highlights: string[];
}> = {
  descanso: {
    slug: "descanso",
    family: "Descanso",
    tier: "premium",
    tagline: "Luxury comfort with deep support",
    description:
      "The Descanso is Telflex's flagship luxury mattress, engineered for those who refuse to compromise on sleep. With high-density foam layers, precision Euro-top quilting, and advanced motion isolation, the Descanso delivers hotel-grade sleep every night.",
    features: [
      "High-density 40D PU foam base",
      "Euro-top quilted comfort layer",
      "Advanced motion isolation",
      "Breathable micro-perforated cover",
      "Anti-microbial fabric treatment",
      "Roll-in, roll-out delivery",
    ],
    sizes: [
      { label: 'Single (72×30")', code: "72X30" },
      { label: 'Single (72×36")', code: "72X36" },
      { label: 'Double (72×48")', code: "72X48" },
      { label: 'Queen (72×60")', code: "72X60" },
      { label: 'King (72×72")', code: "72X72" },
    ],
    thicknesses: [
      { label: '6"', code: "6" },
      { label: '8"', code: "8" },
    ],
    topTypes: [
      { label: "Standard Top", code: "ST" },
      { label: "Euro Top", code: "ET" },
      { label: "Pillow Top", code: "PT" },
    ],
    pricing: {
      "72X60-ST-6": 24500,
      "72X60-ET-6": 26500,
      "72X60-PT-6": 28000,
      "72X60-ST-8": 27000,
      "72X60-ET-8": 29000,
      "72X60-PT-8": 30500,
      "72X48-ST-6": 18000,
      "72X48-ET-6": 20000,
      "72X48-PT-6": 22000,
      "72X72-ST-6": 30000,
      "72X72-ET-6": 33000,
      "72X72-PT-6": 35500,
    },
    mrp: {
      "72X60-ST-6": 36000,
      "72X60-ET-6": 39000,
      "72X60-PT-6": 41500,
      "72X60-ST-8": 40000,
      "72X60-ET-8": 43000,
      "72X60-PT-8": 45000,
      "72X48-ST-6": 27000,
      "72X48-ET-6": 30000,
      "72X48-PT-6": 33000,
      "72X72-ST-6": 45000,
      "72X72-ET-6": 49000,
      "72X72-PT-6": 52000,
    },
    rating: 4.8,
    reviews: 312,
    trial_nights: 30,
    warranty_years: 10,
    highlights: [
      "Factory-direct price — 30% lower than retail",
      "Free delivery across South India",
      "30-night in-home trial",
      "10-year manufacturer warranty",
      "No-Cost EMI on all orders",
    ],
  },
  sereno: {
    slug: "sereno",
    family: "Sereno",
    tier: "mid",
    tagline: "Balanced comfort for everyday sleep",
    description:
      "The Sereno strikes the perfect balance between comfort and affordability. Built with a high-resilience foam core and a breathable quilted cover, it's the ideal everyday mattress for the whole family.",
    features: [
      "HR foam core for consistent support",
      "Quilted comfort layer",
      "5-year warranty",
      "Easy-care fabric cover",
      "Available in all standard sizes",
    ],
    sizes: [
      { label: 'Single (72×30")', code: "72X30" },
      { label: 'Single (72×36")', code: "72X36" },
      { label: 'Double (72×48")', code: "72X48" },
      { label: 'Queen (72×60")', code: "72X60" },
    ],
    thicknesses: [
      { label: '4"', code: "4" },
      { label: '5"', code: "5" },
      { label: '6"', code: "6" },
    ],
    topTypes: [
      { label: "Standard Top", code: "ST" },
    ],
    pricing: {
      "72X60-ST-4": 7200,
      "72X60-ST-5": 8000,
      "72X60-ST-6": 8500,
      "72X48-ST-4": 5500,
      "72X48-ST-5": 6200,
      "72X48-ST-6": 7000,
    },
    mrp: {
      "72X60-ST-4": 10500,
      "72X60-ST-5": 11500,
      "72X60-ST-6": 12000,
      "72X48-ST-4": 8000,
      "72X48-ST-5": 9000,
      "72X48-ST-6": 10000,
    },
    rating: 4.6,
    reviews: 423,
    trial_nights: 30,
    warranty_years: 5,
    highlights: [
      "Best value mid-range mattress",
      "Free delivery across South India",
      "30-night in-home trial",
      "5-year manufacturer warranty",
      "No-Cost EMI available",
    ],
  },
  orthocare: {
    slug: "orthocare",
    family: "Orthocare",
    tier: "mid",
    tagline: "Engineered for spinal health",
    description:
      "The Orthocare is designed specifically for those with back pain, joint issues, or who simply want better spinal alignment. With a doctor-recommended medium-firm feel and ortho-support foam, it provides the structure your spine needs.",
    features: [
      "Ortho-support foam (40D density)",
      "Doctor-recommended medium-firm feel",
      "Promotes proper spinal alignment",
      "Durable anti-sag edge support",
      "Breathable knitted fabric cover",
      "7-year warranty",
    ],
    sizes: [
      { label: 'Single (72×30")', code: "72X30" },
      { label: 'Single (72×36")', code: "72X36" },
      { label: 'Double (72×48")', code: "72X48" },
      { label: 'Queen (72×60")', code: "72X60" },
    ],
    thicknesses: [
      { label: '5"', code: "5" },
      { label: '6"', code: "6" },
      { label: '8"', code: "8" },
    ],
    topTypes: [
      { label: "Standard Top", code: "ST" },
    ],
    pricing: {
      "72X60-ST-5": 8500,
      "72X60-ST-6": 9800,
      "72X60-ST-8": 12000,
      "72X48-ST-5": 6800,
      "72X48-ST-6": 7800,
      "72X48-ST-8": 9500,
    },
    mrp: {
      "72X60-ST-5": 12500,
      "72X60-ST-6": 14000,
      "72X60-ST-8": 17500,
      "72X48-ST-5": 10000,
      "72X48-ST-6": 11500,
      "72X48-ST-8": 14000,
    },
    rating: 4.7,
    reviews: 541,
    trial_nights: 30,
    warranty_years: 7,
    highlights: [
      "Doctor-recommended for back pain",
      "Free delivery across South India",
      "30-night in-home trial",
      "7-year manufacturer warranty",
      "No-Cost EMI on all orders",
    ],
  },
};

const DEFAULT_PRODUCT = PRODUCTS["descanso"];

interface PageProps {
  params: { slug: string };
}

export default function ProductPage({ params }: PageProps) {
  const product = PRODUCTS[params.slug] ?? DEFAULT_PRODUCT;

  const [selectedSize, setSelectedSize] = useState(product.sizes[3]?.code ?? product.sizes[0].code);
  const [selectedThickness, setSelectedThickness] = useState(product.thicknesses[0].code);
  const [selectedTopType, setSelectedTopType] = useState(product.topTypes[0].code);
  const [qty, setQty] = useState(1);
  const [pincode, setPincode] = useState("");
  const [pincodeMsg, setPincodeMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);

  const productImg = IMG.products[product.slug as keyof typeof IMG.products] ?? IMG.products.default;
  const galleryImages = [productImg, IMG.about.bedroom, IMG.hero[1], IMG.hero[2]];
  const [selectedImg, setSelectedImg] = useState(productImg);

  const addItem = useCartStore((s) => s.addItem);

  const variantKey = `${selectedSize}-${selectedTopType}-${selectedThickness}`;
  const price = product.pricing[variantKey] ?? Object.values(product.pricing)[0];
  const mrp = product.mrp[variantKey] ?? Object.values(product.mrp)[0];
  const discount = calculateDiscount(mrp, price);

  const checkPincode = useCallback(() => {
    if (pincode.length !== 6) {
      setPincodeMsg({ ok: false, text: "Please enter a valid 6-digit pincode" });
      return;
    }
    const keralaPrefixes = ["67", "68", "69"];
    const tnPrefixes = ["60", "61", "62", "63", "64"];
    const karPrefixes = ["56", "57", "58", "59"];
    const apPrefixes = ["50", "51", "52", "53"];
    const prefix = pincode.slice(0, 2);
    if ([...keralaPrefixes, ...tnPrefixes, ...karPrefixes, ...apPrefixes].includes(prefix)) {
      setPincodeMsg({ ok: true, text: "Free delivery available! Estimated: 3–5 business days." });
    } else {
      setPincodeMsg({ ok: false, text: "Delivery available at a nominal charge. Contact us for details." });
    }
  }, [pincode]);

  const handleAddToCart = useCallback(() => {
    const cartProduct = {
      id: product.slug,
      slug: product.slug,
      family: product.family,
      category: "Mattress",
      images: [],
    };
    const sizeLbl = product.sizes.find((s) => s.code === selectedSize)?.label ?? selectedSize;
    const cartVariant = {
      id: variantKey,
      size: selectedSize,
      size_label: sizeLbl,
      variant_label: `${sizeLbl} · ${selectedTopType === "ST" ? "Standard Top" : selectedTopType === "ET" ? "Euro Top" : "Pillow Top"} · ${selectedThickness}"`,
      thickness: `${selectedThickness}"`,
      top_type: selectedTopType,
      mrp,
      base_price: price,
      sku: `TF-${product.slug.toUpperCase()}-${variantKey}`,
    };
    addItem(cartProduct, cartVariant, qty);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }, [product, variantKey, selectedSize, selectedTopType, selectedThickness, mrp, price, qty, addItem]);

  const faqs = [
    { q: "How long does delivery take?", a: "Free delivery across South India in 3–7 business days. We'll call you before delivery." },
    { q: "What if I don't like it after 30 nights?", a: "Contact us within 30 nights and we'll arrange a free pickup and full refund — no questions asked." },
    { q: "What does the warranty cover?", a: `Our ${product.warranty_years}-year warranty covers manufacturing defects, sagging beyond acceptable limits, and foam deterioration. Normal wear and tear is not covered.` },
    { q: "Can I pay in EMI?", a: "Yes! No-Cost EMI is available on orders above ₹5,000 via Razorpay. Choose 3, 6, or 12-month EMI at checkout." },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-muted mb-6">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/collections/mattresses" className="hover:text-primary">Mattresses</Link>
        <span className="mx-2">/</span>
        <span className="text-ink">Telflex {product.family}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* LEFT — Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden relative sticky top-24 shadow-card-hover">
            <Image
              src={selectedImg}
              alt={`Telflex ${product.family} mattress`}
              fill
              className="object-cover transition-opacity duration-300"
              priority
              sizes="(max-width:1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {galleryImages.map((src, i) => (
              <button
                key={i}
                onClick={() => setSelectedImg(src)}
                className={`aspect-square rounded-xl overflow-hidden relative transition-all border-2 ${
                  selectedImg === src ? "border-primary scale-95" : "border-transparent hover:border-primary/50"
                }`}
              >
                <Image
                  src={src}
                  alt={`Telflex ${product.family} view ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT — Details */}
        <div>
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant={product.tier === "premium" ? "gold" : "primary"}>
              {product.tier.charAt(0).toUpperCase() + product.tier.slice(1)}
            </Badge>
            {discount >= 20 && <Badge variant="sale">{discount}% OFF</Badge>}
          </div>

          {/* Title */}
          <h1 className="font-display font-bold text-3xl text-ink">Telflex {product.family}</h1>
          <p className="text-muted mt-1 mb-4">{product.tagline}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={14} className={i <= Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-200"} />
              ))}
            </div>
            <span className="text-sm font-semibold">{product.rating}</span>
            <span className="text-sm text-muted">({product.reviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-end gap-3 mb-8">
            <span className="font-bold text-4xl text-ink">{formatPrice(price)}</span>
            <span className="text-lg text-muted line-through mb-1">{formatPrice(mrp)}</span>
            <span className="text-sm font-semibold text-green-600 mb-1">Save {formatPrice(mrp - price)}</span>
          </div>

          {/* Size selector */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-ink">Size</span>
              <Link href="/blog/how-to-choose-mattress-size-india" className="text-xs text-primary hover:underline">Size guide →</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s.code}
                  onClick={() => setSelectedSize(s.code)}
                  className={`py-2.5 px-3 text-xs rounded-xl border font-medium transition-all ${
                    selectedSize === s.code
                      ? "border-primary bg-primary text-white"
                      : "border-line text-ink hover:border-primary"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Thickness selector */}
          <div className="mb-5">
            <span className="text-sm font-semibold text-ink block mb-2">Thickness</span>
            <div className="flex flex-wrap gap-2">
              {product.thicknesses.map((t) => (
                <button
                  key={t.code}
                  onClick={() => setSelectedThickness(t.code)}
                  className={`py-2 px-4 text-sm rounded-xl border font-medium transition-all ${
                    selectedThickness === t.code
                      ? "border-primary bg-primary text-white"
                      : "border-line text-ink hover:border-primary"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Top type selector */}
          {product.topTypes.length > 1 && (
            <div className="mb-6">
              <span className="text-sm font-semibold text-ink block mb-2">Top Type</span>
              <div className="flex flex-wrap gap-2">
                {product.topTypes.map((t) => (
                  <button
                    key={t.code}
                    onClick={() => setSelectedTopType(t.code)}
                    className={`py-2 px-4 text-sm rounded-xl border font-medium transition-all ${
                      selectedTopType === t.code
                        ? "border-primary bg-primary text-white"
                        : "border-line text-ink hover:border-primary"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-semibold text-ink">Qty</span>
            <div className="flex items-center gap-2 border border-line rounded-xl p-1">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 flex items-center justify-center hover:bg-primary-tint rounded-lg">
                <Minus size={14} />
              </button>
              <span className="w-8 text-center font-semibold text-sm">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-primary-tint rounded-lg">
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex gap-3 mb-6">
            <Button
              variant={addedToCart ? "outline" : "primary"}
              size="lg"
              onClick={handleAddToCart}
              className="flex-1"
            >
              {addedToCart ? (
                <span className="flex items-center gap-2"><CheckCircle size={18} /> Added to Cart!</span>
              ) : (
                <span className="flex items-center gap-2"><ShoppingCart size={18} /> Add to Cart</span>
              )}
            </Button>
            <a
              href={`https://wa.me/919400000000?text=Hi, I'm interested in Telflex ${product.family} (${selectedSize}, ${selectedThickness}", ${selectedTopType})`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg" className="border-green-500 text-green-600 hover:bg-green-50">
                <MessageCircle size={18} />
              </Button>
            </a>
          </div>

          {/* Highlights */}
          <div className="bg-primary-tint rounded-2xl p-4 mb-6">
            <ul className="space-y-2">
              {product.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-sm text-ink">
                  <CheckCircle size={14} className="text-primary shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="text-center p-3 border border-line rounded-xl">
              <Truck size={20} className="mx-auto text-primary mb-1" />
              <div className="text-xs font-semibold">Free Delivery</div>
            </div>
            <div className="text-center p-3 border border-line rounded-xl">
              <RefreshCw size={20} className="mx-auto text-primary mb-1" />
              <div className="text-xs font-semibold">{product.trial_nights}-Night Trial</div>
            </div>
            <div className="text-center p-3 border border-line rounded-xl">
              <Shield size={20} className="mx-auto text-primary mb-1" />
              <div className="text-xs font-semibold">{product.warranty_years}-Year Warranty</div>
            </div>
          </div>

          {/* Pincode check */}
          <div className="mb-6">
            <span className="text-sm font-semibold text-ink block mb-2">Check Delivery</span>
            <div className="flex gap-2">
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="Enter pincode"
                value={pincode}
                onChange={(e) => { setPincode(e.target.value.replace(/\D/g, "")); setPincodeMsg(null); }}
                className="flex-1 border border-line rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <Button variant="outline" size="md" onClick={checkPincode}>Check</Button>
            </div>
            {pincodeMsg && (
              <p className={`mt-2 text-xs ${pincodeMsg.ok ? "text-green-600" : "text-red-500"}`}>
                {pincodeMsg.text}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Description & Features */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="font-display font-bold text-2xl text-ink mb-4">About this mattress</h2>
          <p className="text-muted leading-relaxed">{product.description}</p>
        </div>
        <div>
          <h2 className="font-display font-bold text-2xl text-ink mb-4">Features</h2>
          <ul className="space-y-3">
            {product.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-ink">
                <CheckCircle size={16} className="text-primary shrink-0 mt-0.5" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-16 max-w-2xl">
        <h2 className="font-display font-bold text-2xl text-ink mb-6">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-line rounded-xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-4 text-left font-semibold text-sm text-ink hover:bg-primary-tint transition-colors"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                {faq.q}
                {openFaq === i ? <ChevronUp size={16} className="text-primary shrink-0" /> : <ChevronDown size={16} className="shrink-0" />}
              </button>
              {openFaq === i && (
                <div className="px-4 pb-4 text-sm text-muted">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-line p-4 flex gap-3 md:hidden z-50">
        <div className="flex-1">
          <div className="font-bold text-lg text-ink">{formatPrice(price)}</div>
          <div className="text-xs text-muted line-through">{formatPrice(mrp)}</div>
        </div>
        <Button variant="primary" size="lg" onClick={handleAddToCart} className="flex-1">
          {addedToCart ? "Added!" : "Add to Cart"}
        </Button>
        <Link href="/cart">
          <Button variant="outline" size="lg">Buy Now</Button>
        </Link>
      </div>
    </div>
  );
}
