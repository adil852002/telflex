import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — Mattress Questions Answered | Telflex",
  description:
    "Frequently asked questions about Telflex mattresses: delivery, returns, warranty, EMI, sizing, and care. Get answers before you buy.",
  alternates: { canonical: "/faq" },
};

const FAQS = [
  {
    category: "Ordering & Delivery",
    items: [
      { q: "How long does delivery take?", a: "We deliver across South India in 3–7 business days. Our team will call you to confirm delivery timing before it arrives." },
      { q: "Is delivery really free?", a: "Yes! Free delivery on all orders to Kerala, Tamil Nadu, Karnataka, and Andhra Pradesh. No hidden charges." },
      { q: "Do you deliver to my city?", a: "We deliver to all major cities and districts across Kerala, Tamil Nadu, Karnataka, and Andhra Pradesh. For remote areas, contact us to confirm." },
      { q: "How is the mattress delivered?", a: "Rolled-in compressed packaging for foam mattresses. Our delivery team will bring it inside and set it up. Cotton mattresses are delivered in flat packaging." },
    ],
  },
  {
    category: "Trial & Returns",
    items: [
      { q: "How does the 30-night trial work?", a: "Sleep on your Telflex mattress for up to 30 nights. If you're not completely satisfied, call us and we'll arrange free pickup and a full refund — no questions asked." },
      { q: "What if I receive a damaged mattress?", a: "Report damage within 48 hours of delivery with photos. We'll replace it at no charge." },
      { q: "How do I initiate a return?", a: "Call us at +91 94000 00000 or WhatsApp. We'll schedule a pickup within 3 working days and process your refund in 5–7 business days." },
    ],
  },
  {
    category: "Warranty",
    items: [
      { q: "What does the warranty cover?", a: "Our warranty covers manufacturing defects, excessive sagging (>1.5 inches), foam deterioration, and stitching defects. It does not cover damage from misuse, stains, or normal wear." },
      { q: "How do I claim warranty?", a: "WhatsApp or call us with photos of the issue. We'll inspect and repair/replace within 10 working days." },
      { q: "What is the warranty period?", a: "Economy range: 3 years. Mid range: 5–7 years. Premium range: 10 years. Exact warranty is listed on each product page." },
    ],
  },
  {
    category: "Payment & EMI",
    items: [
      { q: "What payment methods do you accept?", a: "UPI (GPay, PhonePe, Paytm), Credit/Debit Cards, Net Banking, No-Cost EMI, and Cash on Delivery." },
      { q: "How does No-Cost EMI work?", a: "Available on orders above ₹5,000 via Razorpay. Choose 3, 6, or 12-month tenure. No extra interest — the full EMI amount equals the product price." },
      { q: "Is Cash on Delivery available?", a: "Yes, COD is available across South India. Maximum order value for COD is ₹30,000." },
    ],
  },
  {
    category: "Product & Size",
    items: [
      { q: "Which mattress size should I choose?", a: "Single: 72×30\" or 72×36\" (one person). Double: 72×48\" (two people, compact). Queen: 72×60\" (two people, comfortable). King: 72×72\" (maximum space). Read our size guide for more detail." },
      { q: "What thickness is best?", a: "4–5 inch for budget options. 6 inch is the most popular all-rounder. 8 inch offers maximum comfort. Choose based on your bed frame height and personal preference." },
      { q: "Which mattress is best for back pain?", a: "The Orthocare and 40 Plus range are specifically designed for back pain with medium-firm orthopaedic support. Read our blog for a detailed guide." },
      { q: "Can I get a custom size?", a: "Yes! We can manufacture custom sizes for specific bed frames. Contact us with your requirements. Custom orders take 7–10 business days." },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="font-display font-bold text-4xl text-ink">Frequently Asked Questions</h1>
        <p className="mt-2 text-muted">Everything you need to know before buying a Telflex mattress</p>
      </div>

      <div className="space-y-10">
        {FAQS.map((section) => (
          <div key={section.category}>
            <h2 className="font-display font-bold text-xl text-ink mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded-full block" />
              {section.category}
            </h2>
            <div className="space-y-3">
              {section.items.map((faq) => (
                <details key={faq.q} className="group border border-line rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between p-4 cursor-pointer font-semibold text-sm text-ink hover:bg-primary-tint transition-colors">
                    {faq.q}
                    <span className="ml-4 shrink-0 text-primary group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-4 pb-4 text-sm text-muted leading-relaxed">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-primary-tint rounded-2xl p-6 text-center">
        <h3 className="font-semibold text-ink mb-2">Still have questions?</h3>
        <p className="text-sm text-muted mb-4">Our sleep experts are happy to help</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a href="https://wa.me/919400000000" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-primary hover:underline">
            WhatsApp Us →
          </a>
          <a href="tel:+919400000000" className="text-sm font-semibold text-primary hover:underline">
            Call +91 94000 00000 →
          </a>
        </div>
      </div>
    </div>
  );
}
