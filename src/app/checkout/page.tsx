"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield, CheckCircle, ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useCartStore } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const STATES = [
  "Kerala", "Tamil Nadu", "Karnataka", "Andhra Pradesh", "Telangana",
  "Maharashtra", "Delhi", "West Bengal", "Gujarat", "Rajasthan",
];

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const subtotalFn = useCartStore((s) => s.subtotal);
  const totalFn = useCartStore((s) => s.total);
  const clearCart = useCartStore((s) => s.clearCart);
  const [step, setStep] = useState<"address" | "payment" | "success">("address");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    address_line1: "", address_line2: "",
    city: "", state: "Kerala", pincode: "",
    landmark: "",
    payment_method: "razorpay",
  });

  const cartSubtotal = subtotalFn();
  const cartTotal = totalFn();
  const discount = cartSubtotal - cartTotal;
  const shipping = cartTotal >= 5000 ? 0 : 500;
  const grandTotal = cartTotal + shipping;

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  const valid =
    form.name && form.phone.length === 10 && form.address_line1 && form.city && form.pincode.length === 6;

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setStep("payment");
  };

  const handleRazorpay = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: grandTotal, items }),
      });
      const { order_id, key } = await res.json();

      const rzp = new window.Razorpay({
        key,
        amount: grandTotal * 100,
        currency: "INR",
        name: "Telflex Mattresses",
        description: `Order — ${items.length} item(s)`,
        order_id,
        prefill: { name: form.name, email: form.email, contact: form.phone },
        theme: { color: "#15489F" },
        handler: async (response: any) => {
          await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...response, order_id }),
          });
          clearCart();
          setStep("success");
        },
      });
      rzp.open();
    } catch {
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCOD = async () => {
    setLoading(true);
    try {
      await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form, items, total: grandTotal, payment_method: "cod" }),
      });
      clearCart();
      setStep("success");
    } catch {
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && step !== "success") {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <h1 className="font-display font-bold text-2xl text-ink mb-4">Your cart is empty</h1>
        <Link href="/collections/mattresses"><Button variant="primary">Shop Mattresses</Button></Link>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-600" />
        </div>
        <h1 className="font-display font-bold text-3xl text-ink mb-2">Order Confirmed!</h1>
        <p className="text-muted mb-2">Thank you, {form.name}. Your Telflex mattress is on its way.</p>
        <p className="text-muted mb-8">You'll receive a confirmation call within 24 hours. Delivery: 3–7 business days.</p>
        <Link href="/"><Button variant="primary" size="lg">Back to Home</Button></Link>
      </div>
    );
  }

  return (
    <>
      {/* Razorpay SDK */}
      <script src="https://checkout.razorpay.com/v1/checkout.js" async />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Steps */}
        <div className="flex items-center gap-4 mb-8">
          {["address", "payment"].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                step === s ? "bg-primary text-white" : step === "payment" && s === "address" ? "bg-green-500 text-white" : "bg-line text-muted"
              }`}>
                {step === "payment" && s === "address" ? "✓" : i + 1}
              </div>
              <span className={`text-sm font-medium ${step === s ? "text-ink" : "text-muted"}`}>
                {s === "address" ? "Delivery Address" : "Payment"}
              </span>
              {i === 0 && <div className="w-8 h-px bg-line" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2">
            {step === "address" && (
              <form onSubmit={handleAddressSubmit} className="space-y-4">
                <h2 className="font-display font-bold text-xl text-ink mb-4">Delivery Address</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Full Name *" placeholder="Your name" required {...field("name")} />
                  <Input label="Phone *" placeholder="10-digit mobile" inputMode="numeric" maxLength={10} required {...field("phone")} />
                </div>
                <Input label="Email" placeholder="email@example.com" type="email" {...field("email")} />
                <Input label="Address Line 1 *" placeholder="House no, Street, Area" required {...field("address_line1")} />
                <Input label="Address Line 2" placeholder="Landmark, Colony (optional)" {...field("address_line2")} />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Input label="City *" placeholder="City" required {...field("city")} />
                  <div>
                    <label className="block text-sm font-medium text-ink mb-1.5">State *</label>
                    <select
                      {...field("state")}
                      className="w-full border border-line rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    >
                      {STATES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <Input label="Pincode *" placeholder="6-digit PIN" inputMode="numeric" maxLength={6} required {...field("pincode")} />
                </div>

                <div className="pt-2">
                  <Button type="submit" variant="primary" size="lg" disabled={!valid}>
                    Continue to Payment →
                  </Button>
                </div>
              </form>
            )}

            {step === "payment" && (
              <div>
                <button onClick={() => setStep("address")} className="flex items-center gap-1 text-sm text-muted hover:text-primary mb-6">
                  <ArrowLeft size={14} /> Edit address
                </button>
                <h2 className="font-display font-bold text-xl text-ink mb-6">Choose Payment</h2>

                <div className="space-y-4">
                  {/* Razorpay */}
                  <div className="border-2 border-primary rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-ink">Pay Online</h3>
                        <p className="text-xs text-muted">UPI, Cards, Net Banking, No-Cost EMI</p>
                      </div>
                      <div className="flex gap-1">
                        {["UPI", "Visa", "MC"].map((b) => (
                          <span key={b} className="text-xs border border-line rounded px-1.5 py-0.5">{b}</span>
                        ))}
                      </div>
                    </div>
                    <Button variant="primary" size="lg" onClick={handleRazorpay} loading={loading} className="w-full">
                      Pay {formatPrice(grandTotal)} Now
                    </Button>
                  </div>

                  {/* COD */}
                  <div className="border border-line rounded-2xl p-5">
                    <div className="mb-3">
                      <h3 className="font-semibold text-ink">Cash on Delivery</h3>
                      <p className="text-xs text-muted">Pay when your mattress arrives. Available across South India.</p>
                    </div>
                    <Button variant="outline" size="lg" onClick={handleCOD} loading={loading} className="w-full">
                      Place COD Order — {formatPrice(grandTotal)}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 text-xs text-muted">
                  <Shield size={12} className="text-primary" />
                  All payments are secured with 256-bit SSL encryption
                </div>
              </div>
            )}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-line p-5 sticky top-24">
              <h3 className="font-semibold text-ink mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm">
                {items.map((item) => (
                  <div key={item.cartItemId} className="flex gap-3">
                    <div className="w-10 h-10 bg-primary-tint rounded-lg flex items-center justify-center text-lg shrink-0">🛏️</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-ink text-xs">Telflex {item.product.family}</p>
                      <p className="text-xs text-muted">{item.variant.variant_label} × {item.quantity}</p>
                    </div>
                    <span className="font-medium text-xs shrink-0">{formatPrice(item.variant.base_price * item.quantity)}</span>
                  </div>
                ))}

                <div className="border-t border-line pt-3 space-y-2">
                  <div className="flex justify-between text-muted">
                    <span>Subtotal</span><span>{formatPrice(cartSubtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span><span>−{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-muted">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? <span className="text-green-600">FREE</span> : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-base pt-2 border-t border-line">
                    <span>Total</span><span>{formatPrice(grandTotal)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
