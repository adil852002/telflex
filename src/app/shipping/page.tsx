import type { Metadata } from "next";
import { Truck, Clock, MapPin, Package } from "lucide-react";

export const metadata: Metadata = {
  title: "Shipping Policy — Free Delivery Across South India | Telflex",
  description:
    "Telflex offers free mattress delivery across Kerala, Tamil Nadu, Karnataka, and Andhra Pradesh. Learn about delivery timelines, tracking, and process.",
  alternates: { canonical: "/shipping" },
};

const DELIVERY_TABLE = [
  { region: "Kerala — Major Cities", timeframe: "2–4 business days", charge: "FREE" },
  { region: "Kerala — Remote Districts", timeframe: "4–6 business days", charge: "FREE" },
  { region: "Tamil Nadu", timeframe: "4–6 business days", charge: "FREE" },
  { region: "Karnataka", timeframe: "4–7 business days", charge: "FREE" },
  { region: "Andhra Pradesh", timeframe: "5–7 business days", charge: "FREE" },
  { region: "Other South Indian States", timeframe: "6–9 business days", charge: "Nominal charge" },
  { region: "Rest of India", timeframe: "7–12 business days", charge: "Contact us" },
];

export default function ShippingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-primary-tint rounded-2xl flex items-center justify-center">
          <Truck size={24} className="text-primary" />
        </div>
        <div>
          <h1 className="font-display font-bold text-3xl text-ink">Shipping Policy</h1>
          <p className="text-muted text-sm">Free delivery across South India</p>
        </div>
      </div>

      {/* Key points */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          { icon: Truck, title: "Free Delivery", desc: "All orders shipped free to Kerala, TN, Karnataka & AP" },
          { icon: Clock, title: "2–7 Days", desc: "Delivery timelines by region — we'll confirm before shipping" },
          { icon: Package, title: "Safe Packaging", desc: "Compressed roll-pack for foam, flat-pack for cotton mattresses" },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-primary-tint rounded-2xl p-5">
            <Icon size={24} className="text-primary mb-2" />
            <div className="font-semibold text-ink text-sm mb-1">{title}</div>
            <div className="text-xs text-muted">{desc}</div>
          </div>
        ))}
      </div>

      {/* Delivery table */}
      <h2 className="font-display font-bold text-xl text-ink mb-4">Delivery by Region</h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-primary-tint">
              <th className="text-left px-4 py-3 font-semibold text-ink rounded-tl-xl">Region</th>
              <th className="text-left px-4 py-3 font-semibold text-ink">Estimated Delivery</th>
              <th className="text-left px-4 py-3 font-semibold text-ink rounded-tr-xl">Shipping Charge</th>
            </tr>
          </thead>
          <tbody>
            {DELIVERY_TABLE.map((row, i) => (
              <tr key={row.region} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                <td className="px-4 py-3 text-ink">{row.region}</td>
                <td className="px-4 py-3 text-muted">{row.timeframe}</td>
                <td className={`px-4 py-3 font-medium ${row.charge === "FREE" ? "text-green-600" : "text-ink"}`}>{row.charge}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose-telflex space-y-6">
        <div>
          <h2>Delivery Process</h2>
          <ol className="list-none space-y-2 mt-3">
            {[
              "Order confirmed — you'll receive an SMS and WhatsApp confirmation.",
              "Dispatched from our Kottayam factory within 1–2 business days.",
              "Our delivery partner will call you 24 hours before arrival.",
              "Mattress delivered to your doorstep (inside your home if requested).",
              "Inspection at delivery — report any issues within 48 hours.",
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                <span className="text-ink">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h2>Important Notes</h2>
          <ul className="space-y-2 mt-3">
            {[
              "Business days exclude Sundays and public holidays.",
              "Delivery to remote/inaccessible areas may take additional 2–3 days.",
              "Large orders (10+ units) may be scheduled separately — our team will coordinate.",
              "We cannot deliver to P.O. boxes — a complete address is required.",
            ].map((note) => (
              <li key={note} className="flex items-start gap-2 text-sm text-muted">
                <span className="w-1 h-1 rounded-full bg-muted mt-2 shrink-0" />
                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
