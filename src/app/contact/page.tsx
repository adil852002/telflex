"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, MessageCircle, CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setSent(true);
    } catch {
      setError("Failed to send. Please try WhatsApp or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="font-display font-bold text-4xl text-ink">Contact Us</h1>
        <p className="mt-2 text-muted">We're here to help. Reach us by phone, WhatsApp, or email.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Info */}
        <div>
          <h2 className="font-display font-bold text-xl text-ink mb-6">Get in Touch</h2>
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary-tint rounded-xl flex items-center justify-center shrink-0">
                <Phone size={18} className="text-primary" />
              </div>
              <div>
                <div className="font-semibold text-ink text-sm">Phone & WhatsApp</div>
                <a href="tel:+919400000000" className="text-primary hover:underline">+91 94000 00000</a>
                <div className="text-xs text-muted mt-0.5">Mon–Sat, 9 AM – 7 PM</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary-tint rounded-xl flex items-center justify-center shrink-0">
                <MessageCircle size={18} className="text-primary" />
              </div>
              <div>
                <div className="font-semibold text-ink text-sm">WhatsApp</div>
                <a
                  href="https://wa.me/919400000000?text=Hi Telflex, I have a query about mattresses"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm"
                >
                  Chat on WhatsApp →
                </a>
                <div className="text-xs text-muted mt-0.5">Usually replies within 30 minutes</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary-tint rounded-xl flex items-center justify-center shrink-0">
                <Mail size={18} className="text-primary" />
              </div>
              <div>
                <div className="font-semibold text-ink text-sm">Email</div>
                <a href="mailto:support@telflex.in" className="text-primary hover:underline">support@telflex.in</a>
                <div className="text-xs text-muted mt-0.5">We respond within 24 hours</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary-tint rounded-xl flex items-center justify-center shrink-0">
                <MapPin size={18} className="text-primary" />
              </div>
              <div>
                <div className="font-semibold text-ink text-sm">Factory & Showroom</div>
                <div className="text-sm text-muted">
                  Telflex Mattresses Pvt. Ltd.<br />
                  Industrial Area, Kottayam<br />
                  Kerala — 686 001
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div>
          {sent ? (
            <div className="text-center py-12">
              <CheckCircle size={56} className="mx-auto text-green-500 mb-4" />
              <h3 className="font-display font-bold text-xl text-ink mb-2">Message Sent!</h3>
              <p className="text-muted">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Your Name *" placeholder="Full name" required {...field("name")} />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Phone" placeholder="Mobile number" {...field("phone")} />
                <Input label="Email" placeholder="email@example.com" type="email" {...field("email")} />
              </div>
              <Input label="Subject" placeholder="What's this about?" {...field("subject")} />
              <Textarea label="Message *" placeholder="Tell us how we can help..." rows={5} required {...field("message")} />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" variant="primary" size="lg" loading={loading}>
                Send Message
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
