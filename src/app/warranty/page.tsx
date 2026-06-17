import type { Metadata } from "next";
import Link from "next/link";
import { Shield, CheckCircle, XCircle, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Warranty Policy — Telflex Mattresses",
  description:
    "Telflex mattress warranty: 3 to 10 years depending on range. Learn what's covered, how to claim, and our simple warranty process.",
  alternates: { canonical: "/warranty" },
};

export default function WarrantyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-primary-tint rounded-2xl flex items-center justify-center">
          <Shield size={24} className="text-primary" />
        </div>
        <div>
          <h1 className="font-display font-bold text-3xl text-ink">Warranty Policy</h1>
          <p className="text-muted text-sm">Effective from date of purchase</p>
        </div>
      </div>

      {/* Periods */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          { range: "Economy Range", years: "3 Years", products: "Sleepy, Kiddo, Dream Foam, Nature Fresh" },
          { range: "Mid Range", years: "5–7 Years", products: "Sereno, Cera, Orthocare, 40 Plus" },
          { range: "Premium Range", years: "10 Years", products: "Vertigo, Descanso, Pearls, Siesta" },
        ].map((w) => (
          <div key={w.range} className="bg-primary-tint rounded-2xl p-5">
            <div className="font-display font-bold text-3xl text-primary mb-1">{w.years}</div>
            <div className="font-semibold text-ink text-sm mb-1">{w.range}</div>
            <div className="text-xs text-muted">{w.products}</div>
          </div>
        ))}
      </div>

      <div className="prose-telflex space-y-8">
        <div>
          <h2>What's Covered</h2>
          <ul className="space-y-2 mt-3">
            {[
              "Manufacturing defects in materials and workmanship",
              "Physical sagging or indentation exceeding 1.5 inches under normal use",
              "Foam deterioration resulting in loss of support",
              "Fabric stitching defects and zipper failures",
              "Structural failures in the foam core",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-ink">
                <CheckCircle size={14} className="text-green-500 shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>What's Not Covered</h2>
          <ul className="space-y-2 mt-3">
            {[
              "Normal wear and tear",
              "Stains, burns, or physical damage",
              "Damage from misuse (wet foam, improper base, overloading)",
              "Comfort preference changes (firmness too soft/firm after 30-night trial)",
              "Second-hand or transferred mattresses",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-ink">
                <XCircle size={14} className="text-red-400 shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>How to Claim</h2>
          <ol className="space-y-3 mt-3 list-none">
            {[
              "WhatsApp or call us at +91 94000 00000 with your order number and photos of the issue.",
              "Our team will review the claim within 2 working days.",
              "For approved claims, we'll arrange a free pickup and inspection at our factory.",
              "Repair or replacement will be completed within 10 working days.",
              "We'll deliver the repaired/replacement mattress back to you at no charge.",
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-ink">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-12 border border-line rounded-2xl p-6 flex items-start gap-4">
        <Phone size={20} className="text-primary shrink-0 mt-0.5" />
        <div>
          <div className="font-semibold text-ink">Need help with a warranty claim?</div>
          <div className="text-sm text-muted mt-0.5">
            Call <a href="tel:+919400000000" className="text-primary">+91 94000 00000</a> or{" "}
            <a href="https://wa.me/919400000000" className="text-primary" target="_blank" rel="noopener noreferrer">WhatsApp</a> us.
            Our customer care team responds within 4 business hours.
          </div>
        </div>
      </div>
    </div>
  );
}
