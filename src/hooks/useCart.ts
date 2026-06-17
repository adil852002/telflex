"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartVariant {
  id: string;
  size: string;
  size_label: string;
  variant_label: string;
  thickness: string;
  top_type: string | null;
  mrp: number;
  base_price: number;
  sku: string;
}

export interface CartProduct {
  id: string;
  slug: string;
  family: string;
  category: string;
  images: string[];
}

export interface CartItem {
  cartItemId: string;
  product: CartProduct;
  variant: CartVariant;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  coupon: string | null;
  discount: number;

  addItem: (product: CartProduct, variant: CartVariant, qty?: number) => void;
  removeItem: (cartItemId: string) => void;
  updateQty: (cartItemId: string, qty: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;

  // Computed
  subtotal: () => number;
  total: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,
      discount: 0,

      addItem: (product, variant, qty = 1) => {
        const id = `${product.id}-${variant.id}`;
        set((state) => {
          const existing = state.items.find((i) => i.cartItemId === id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.cartItemId === id ? { ...i, quantity: i.quantity + qty } : i
              ),
            };
          }
          return {
            items: [...state.items, { cartItemId: id, product, variant, quantity: qty }],
          };
        });
      },

      removeItem: (cartItemId) =>
        set((state) => ({ items: state.items.filter((i) => i.cartItemId !== cartItemId) })),

      updateQty: (cartItemId, qty) =>
        set((state) => ({
          items:
            qty <= 0
              ? state.items.filter((i) => i.cartItemId !== cartItemId)
              : state.items.map((i) => (i.cartItemId === cartItemId ? { ...i, quantity: qty } : i)),
        })),

      clearCart: () => set({ items: [], coupon: null, discount: 0 }),

      applyCoupon: (code, discount) => set({ coupon: code, discount }),

      removeCoupon: () => set({ coupon: null, discount: 0 }),

      subtotal: () => get().items.reduce((acc, i) => acc + i.variant.mrp * i.quantity, 0),

      total: () => {
        const sub = get().subtotal();
        return Math.max(0, sub - get().discount);
      },

      itemCount: () => get().items.reduce((acc, i) => acc + i.quantity, 0),
    }),
    { name: "telflex-cart" }
  )
);
