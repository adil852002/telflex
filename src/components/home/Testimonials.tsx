import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { IMG } from "@/lib/images";

const REVIEWS = [
  { name: "Ananya Krishnan", location: "Thiruvananthapuram, Kerala", rating: 5,
    text: "Ordered the Siesta Queen size. Delivery was free, arrived in 3 days. The 30-night trial gave me confidence. Now on day 60 and sleeping better than ever!",
    product: 'Siesta ET 6"', avatar: IMG.avatars[0], color: "bg-blue-50 border-blue-200" },
  { name: "Rajesh Nair", location: "Kochi, Kerala", rating: 5,
    text: "We've used Telflex for 10 years. When we needed replacements, we came back without a second thought. Quality never disappoints.",
    product: 'Sereno ST 6"', avatar: IMG.avatars[1], color: "bg-emerald-50 border-emerald-200" },
  { name: "Priya Menon", location: "Kozhikode, Kerala", rating: 5,
    text: "Bought the Descanso for my parents. Dad has back issues and the orthopaedic support made a real difference. Grateful for a Kerala brand this good.",
    product: 'Descanso PT 8"', avatar: IMG.avatars[2], color: "bg-amber-50 border-amber-200" },
  { name: "Mohammed Riaz", location: "Chennai, Tamil Nadu", rating: 5,
    text: "The No-Cost EMI was perfect. Split into 6 months on my Visa card. Premium mattress without budget stress. A customer for life.",
    product: 'Vertigo ST 6"', avatar: IMG.avatars[3], color: "bg-violet-50 border-violet-200" },
  { name: "Meghana S", location: "Bengaluru, Karnataka", rating: 4,
    text: "The Pearls cooling effect is real — Bangalore heat is no issue now. Took a day to expand but then perfect. Would definitely buy again.",
    product: 'Pearls ST 6"', avatar: IMG.avatars[4], color: "bg-rose-50 border-rose-200" },
  { name: "Suresh Reddy", location: "Hyderabad, Andhra Pradesh", rating: 5,
    text: "Factory-direct pricing is a game changer. Same quality as expensive brands at 30% less. Hostel order arrived on time, exactly as described.",
    product: "Hostel HD 2\"", avatar: IMG.avatars[5], color: "bg-teal-50 border-teal-200" },
];

export default function Testimonials() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Colorful background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-tint via-white to-amber-50 -z-10" />
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 48" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 C360,48 1080,0 1440,0 L1440,0 L0,0 Z" />
        </svg>
      </div>
      <div className="absolute -top-32 right-0 w-96 h-96 bg-primary-tint blob-2 opacity-60 -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-100 blob-1 opacity-60 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 text-xs font-bold rounded-full uppercase tracking-widest mb-3">
            Customer Reviews
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-ink">
            Real families. Real sleep.
          </h2>
          <p className="mt-3 text-muted text-lg">Over 1 lakh families trust Telflex across South India</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((r) => (
            <div key={r.name} className={`bg-white rounded-3xl border-2 ${r.color} p-6 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all relative overflow-hidden`}>
              {/* Quote icon */}
              <Quote size={40} className="absolute top-4 right-4 text-black/5" fill="currentColor" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className={i < r.rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"} />
                ))}
              </div>

              <p className="text-sm text-ink/80 leading-relaxed mb-5 line-clamp-3">"{r.text}"</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-white shadow">
                    <Image src={r.avatar} alt={r.name} fill className="object-cover" sizes="40px" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-ink">{r.name}</p>
                    <p className="text-xs text-muted">{r.location}</p>
                  </div>
                </div>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-lg font-medium shrink-0">
                  {r.product}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Aggregate stats */}
        <div className="mt-14 grid grid-cols-3 gap-6 max-w-2xl mx-auto text-center">
          {[
            { val: "4.8/5", label: "Average Rating", color: "text-amber-600" },
            { val: "1,200+", label: "Verified Reviews", color: "text-primary" },
            { val: "98%", label: "Would Recommend", color: "text-emerald-600" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-5 shadow-card border border-line">
              <div className={`font-display font-bold text-3xl ${s.color}`}>{s.val}</div>
              <div className="text-xs text-muted mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
