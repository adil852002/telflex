"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, Tag, ArrowRight, ShoppingBag, Truck, Shield } from "lucide-react";
import Button from "@/components/ui/Button";
import { useCartStore } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQty = useCartStore((s) => s.updateQty);
  const applyCoupon = useCartStore((s) => s.applyCoupon);
  const subtotalFn = useCartStore((s) => s.subtotal);
  const totalFn = useCartStore((s) => s.total);

  const [couponCode, setCouponCode] = useState("");
  const [couponMsg, setCouponMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);

  const VALID_COUPONS: Record<string, number> = {
    SLEEP10: 0.1,
    KERALA15: 0.15,
    TELFLEX20: 0.2,
    WELCOME5: 0.05,
  };

  const cartSubtotal = subtotalFn();
  const cartTotal = totalFn();
  const discount = cartSubtotal - cartTotal;
  const shipping = cartTotal >= 5000 ? 0 : 500;

  const handleCoupon = async () => {
    setCouponLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const upper = couponCode.trim().toUpperCase();
    if (VALID_COUPONS[upper]) {
      const disc = Math.round(cartSubtotal * VALID_COUPONS[upper]);
      applyCoupon(upper, disc);
      setCouponMsg({ ok: true, text: `Coupon applied! You save ${formatPrice(disc)}.` });
    } else {
      setCouponMsg({ ok: false, text: "Invalid coupon code. Try SLEEP10 or KERALA15." });
    }
    setCouponLoading(false);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <ShoppingBag size={64} className="mx-auto text-muted mb-6" />
        <h1 className="font-display font-bold text-2xl text-ink mb-2">Your cart is empty</h1>
        <p className="text-muted mb-8">Looks like you haven't added any mattresses yet.</p>
        <Link href="/collections/mattresses">
          <Button variant="primary" size="lg">Shop Mattresses</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-xs text-muted mb-6">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-ink">Cart</span>
      </nav>

      <h1 className="font-display font-bold text-3xl text-ink mb-8">
        Shopping Cart{" "}
        <span className="text-muted font-normal text-xl">
          ({items.length} item{items.length !== 1 ? "s" : ""})
        </span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.cartItemId} className="bg-white rounded-2xl border border-line p-4 flex gap-4">
              <div className="w-24 h-24 rounded-xl bg-primary-tint flex items-center justify-center text-4xl shrink-0">
                🛏️
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-ink">Telflex {item.product.family}</h3>
                    <p className="text-xs text-muted mt-0.5">{item.variant.variant_label}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.cartItemId)}
                    className="text-muted hover:text-red-500 transition-colors shrink-0"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2 border border-line rounded-xl p-1">
                    <button
                      onClick={() => updateQty(item.cartItemId, Math.max(1, item.quantity - 1))}
                      className="w-7 h-7 flex items-center justify-center hover:bg-primary-tint rounded-lg"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.cartItemId, item.quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center hover:bg-primary-tint rounded-lg"
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-ink">
                      {formatPrice(item.variant.base_price * item.quantity)}
                    </div>
                    {item.quantity > 1 && (
                      <div className="text-xs text-muted">{formatPrice(item.variant.base_price)} each</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Coupon */}
          <div className="bg-white rounded-2xl border border-line p-4">
            <div className="flex items-center gap-2 mb-3">
              <Tag size={16} className="text-primary" />
              <span className="font-semibold text-sm">Have a coupon?</span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => { setCouponCode(e.target.value.toUpperCase()); setCouponMsg(null); }}
                className="flex-1 border border-line rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary uppercase"
              />
              <Button variant="outline" size="md" onClick={handleCoupon} loading={couponLoading}>
                Apply
              </Button>
            </div>
            {couponMsg && (
              <p className={`mt-2 text-xs ${couponMsg.ok ? "text-green-600" : "text-red-500"}`}>
                {couponMsg.text}
              </p>
            )}
          </div>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-line p-6 sticky top-24">
            <h2 className="font-display font-bold text-lg text-ink mb-5">Order Summary</h2>

            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-muted">Subtotal</span>
                <span className="font-medium">{formatPrice(cartSubtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Coupon discount</span>
                  <span>−{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted">Shipping</span>
                {shipping === 0 ? (
                  <span className="text-green-600 font-medium">FREE</span>
                ) : (
                  <span className="font-medium">{formatPrice(shipping)}</span>
                )}
              </div>
              {cartTotal < 5000 && (
                <p className="text-xs text-muted bg-amber-50 rounded-lg p-2">
                  Add {formatPrice(5000 - cartTotal)} more for free shipping!
                </p>
              )}
              <div className="border-t border-line pt-3 flex justify-between font-bold text-base">
                <span>Total</span>
                <span>{formatPrice(cartTotal + shipping)}</span>
              </div>
            </div>

            <Link href="/checkout">
              <Button variant="primary" size="lg" className="w-full">
                Proceed to Checkout <ArrowRight size={16} />
              </Button>
            </Link>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted">
                <Truck size={12} className="text-primary" /> Free delivery on orders above ₹5,000
              </div>
              <div className="flex items-center gap-2 text-xs text-muted">
                <Shield size={12} className="text-primary" /> 30-night trial — return for free
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-line">
              <p className="text-xs text-muted mb-2">Secure payments via</p>
              <div className="flex flex-wrap gap-2">
                {["UPI", "Visa", "Mastercard", "EMI", "COD"].map((p) => (
                  <span key={p} className="text-xs border border-line rounded-md px-2 py-1 text-muted">{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
