"use client";
import { useState } from "react";
import { X } from "lucide-react";

const messages = [
  "🚚 Free delivery across Kerala, Tamil Nadu, Karnataka & Andhra Pradesh",
  "💳 No-Cost EMI available on orders above ₹5,000 — 3, 6 & 12 months",
  "🌙 30-Night Sleep Trial on all mattresses — love it or return it",
  "🏭 Manufacturing in Kerala since 2000 — direct from factory",
  "📞 WhatsApp us for bulk / B2B orders: +91 9400000000",
];

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-primary text-white text-sm relative overflow-hidden">
      <div className="flex items-center h-9 overflow-hidden relative">
        {/* Marquee wrapper */}
        <div className="flex animate-marquee whitespace-nowrap">
          {[...messages, ...messages].map((msg, i) => (
            <span key={i} className="inline-flex items-center px-8 font-medium">
              {msg}
              <span className="mx-4 text-white/40">|</span>
            </span>
          ))}
        </div>
      </div>
      <button
        onClick={() => setVisible(false)}
        aria-label="Close announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-1 rounded"
      >
        <X size={14} />
      </button>
    </div>
  );
}
