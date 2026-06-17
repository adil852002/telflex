import type { Metadata } from "next";
import { RefreshCw, CheckCircle, Clock, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Returns & Refund Policy — 30-Night Trial | Telflex",
  description:
    "Telflex offers a 30-night in-home sleep trial. Return your mattress within 30 nights for a full refund — free pickup, no questions asked.",
  alternates: { canonical: "/returns" },
};

export default function ReturnsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-primary-tint rounded-2xl flex items-center justify-center">
          <RefreshCw size={24} className="text-primary" />
        </div>
        <div>
          <h1 className="font-display font-bold text-3xl text-ink">Returns & Refund Policy</h1>
          <p className="text-muted text-sm">30-night in-home trial — no risk, no hassle</p>
        </div>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          { icon: RefreshCw, title: "30-Night Trial", desc: "Sleep on it for a full month before deciding" },
          { icon: CheckCircle, title: "Full Refund", desc: "100% of your money back — no deductions" },
          { icon: Clock, title: "Free Pickup", desc: "We collect the mattress from your home at no cost" },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-primary-tint rounded-2xl p-5 text-center">
            <Icon size={24} className="text-primary mx-auto mb-2" />
            <div className="font-semibold text-ink text-sm mb-1">{title}</div>
            <div className="text-xs text-muted">{desc}</div>
          </div>
        ))}
      </div>

      <div className="prose-telflex space-y-8">
        <div>
          <h2>30-Night Trial Policy</h2>
          <p>
            We want you to love your Telflex mattress. That's why every mattress purchase comes with a 30-night in-home trial. Sleep on it, live with it, and if it's not the right fit for you within 30 nights — we'll pick it up and refund you in full.
          </p>
        </div>

        <div>
          <h2>How to Return</h2>
          <ol className="list-none space-y-3 mt-3">
            {[
              "Contact us within 30 nights of delivery — call +91 94000 00000 or WhatsApp.",
              "Our team will schedule a free pickup from your home within 3 working days.",
              "The mattress will be collected and inspected at our facility.",
              "Refund will be processed to your original payment method within 5–7 business days.",
              "COD orders: refund via bank transfer (provide account details at time of return).",
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                <span className="text-ink">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h2>Return Eligibility</h2>
          <ul className="space-y-2 mt-3">
            {[
              { ok: true, text: "Initiated within 30 nights of delivery" },
              { ok: true, text: "Mattress in reasonable condition (slept on, not damaged)" },
              { ok: true, text: "Original purchase from telflex.in" },
              { ok: false, text: "After 30 nights (except warranty claims)" },
              { ok: false, text: "Mattresses with stains, burns, or physical damage" },
              { ok: false, text: "Bulk/institutional orders (separate terms apply)" },
            ].map(({ ok, text }) => (
              <li key={text} className="flex items-start gap-2 text-sm">
                {ok ? (
                  <CheckCircle size={14} className="text-green-500 shrink-0 mt-0.5" />
                ) : (
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-red-400 shrink-0 mt-0.5" />
                )}
                <span className={ok ? "text-ink" : "text-muted line-through"}>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Damaged or Wrong Item</h2>
          <p>
            If your mattress arrives damaged or incorrect, report it within 48 hours of delivery with photos. We'll arrange a free replacement with priority shipping — no need to wait 30 nights.
          </p>
        </div>
      </div>

      <div className="mt-12 border border-line rounded-2xl p-6 flex items-start gap-4">
        <Phone size={20} className="text-primary shrink-0 mt-0.5" />
        <div>
          <div className="font-semibold text-ink">Want to initiate a return?</div>
          <div className="text-sm text-muted mt-0.5">
            Call <a href="tel:+919400000000" className="text-primary">+91 94000 00000</a> or{" "}
            <a href="https://wa.me/919400000000" className="text-primary" target="_blank" rel="noopener noreferrer">WhatsApp us</a>.
            Our team will handle everything.
          </div>
        </div>
      </div>
    </div>
  );
}
