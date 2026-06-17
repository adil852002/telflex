"use client";

import { useState } from "react";
import { CheckCircle, Building2, Hotel, School, Stethoscope, Home } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

const SEGMENTS = [
  { icon: Hotel, label: "Hotels & Resorts", desc: "Bulk orders for rooms, staff quarters. Custom firmness & branding available." },
  { icon: School, label: "Hostels & PGs", desc: "Student hostels, paying guest houses. Durable, budget-friendly options." },
  { icon: Stethoscope, label: "Hospitals & Clinics", desc: "Orthopaedic-grade hospital mattresses. Anti-microbial fabric. PVC option." },
  { icon: Building2, label: "Corporate Housing", desc: "Furnished apartments, company guest houses. Volume discounts." },
  { icon: Home, label: "Real Estate Builders", desc: "Fit-outs for apartments & villas. Ongoing supply agreements." },
];

export default function BulkPurchasePage() {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", organisation: "",
    city: "", state: "Kerala", quantity: "", product_interest: "", message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/bulk-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setSent(true);
    } catch {
      setError("Failed to submit. Please call us at +91 94000 00000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">B2B & Institutional</span>
        <h1 className="font-display font-bold text-4xl md:text-5xl text-ink">Bulk Purchase</h1>
        <p className="mt-3 text-muted max-w-xl mx-auto">
          Supply agreements, volume discounts and custom configurations for hotels, hospitals, hostels, and real estate builders across South India.
        </p>
      </div>

      {/* Segments */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {SEGMENTS.map(({ icon: Icon, label, desc }) => (
          <div key={label} className="bg-white border border-line rounded-2xl p-5">
            <div className="w-10 h-10 bg-primary-tint rounded-xl flex items-center justify-center mb-3">
              <Icon size={20} className="text-primary" />
            </div>
            <h3 className="font-semibold text-ink mb-1">{label}</h3>
            <p className="text-xs text-muted">{desc}</p>
          </div>
        ))}
      </div>

      {/* Benefits */}
      <div className="bg-primary-tint rounded-2xl p-6 mb-12">
        <h2 className="font-display font-bold text-xl text-ink mb-4">Bulk Order Benefits</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Minimum 5% discount on orders of 10+ units",
            "Up to 25% discount on orders of 100+ units",
            "Custom firmness and fabric options",
            "Branded/logo mattress covers available",
            "Phased delivery across multiple locations",
            "Dedicated account manager",
            "Net-30/Net-60 credit terms (subject to approval)",
            "Free pickup for warranty claims",
          ].map((b) => (
            <div key={b} className="flex items-start gap-2 text-sm text-ink">
              <CheckCircle size={14} className="text-primary shrink-0 mt-0.5" />
              {b}
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl">
        <h2 className="font-display font-bold text-2xl text-ink mb-6">Send Bulk Enquiry</h2>
        {sent ? (
          <div className="text-center py-12">
            <CheckCircle size={56} className="mx-auto text-green-500 mb-4" />
            <h3 className="font-bold text-xl text-ink mb-2">Enquiry Received!</h3>
            <p className="text-muted">Our B2B team will contact you within 4 business hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Your Name *" placeholder="Full name" required {...field("name")} />
              <Input label="Phone *" placeholder="10-digit mobile" required {...field("phone")} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Email" placeholder="work email" type="email" {...field("email")} />
              <Input label="Organisation" placeholder="Hotel / Hospital / Company" {...field("organisation")} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="City *" placeholder="City" required {...field("city")} />
              <Input label="Quantity Needed *" placeholder="Number of units" inputMode="numeric" required {...field("quantity")} />
            </div>
            <Input label="Product Interest" placeholder="e.g. Sereno Queen 6 inch, hospital mattresses..." {...field("product_interest")} />
            <Textarea label="Additional Requirements" placeholder="Custom firmness, branding, delivery schedule..." rows={4} {...field("message")} />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" variant="primary" size="lg" loading={loading}>
              Submit Bulk Enquiry
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
