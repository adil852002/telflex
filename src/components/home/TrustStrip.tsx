import { Shield, Truck, RotateCcw, Star, Award, Factory } from "lucide-react";

const TRUSTS = [
  { icon: <Factory size={22} />, title: "Since 2000", sub: "25 years manufacturing" },
  { icon: <Star size={22} />, title: "1 Lakh+ Families", sub: "Trust Telflex" },
  { icon: <RotateCcw size={22} />, title: "30-Night Trial", sub: "Love it or return it" },
  { icon: <Shield size={22} />, title: "5–10 Year Warranty", sub: "Every mattress covered" },
  { icon: <Truck size={22} />, title: "Free Delivery", sub: "Kerala & South India" },
  { icon: <Award size={22} />, title: "Factory-Direct", sub: "No middleman markup" },
];

export default function TrustStrip() {
  return (
    <section className="bg-primary-tint border-y border-line py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {TRUSTS.map((t) => (
            <div key={t.title} className="flex flex-col items-center text-center gap-2">
              <span className="text-primary">{t.icon}</span>
              <span className="font-semibold text-sm text-ink">{t.title}</span>
              <span className="text-xs text-muted">{t.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
