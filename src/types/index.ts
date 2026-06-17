// ── Product catalog types ──────────────────────────────────────
export interface ProductVariant {
  id: string;
  product_id: string;
  size: string;
  variant_label: string;     // e.g. "ST 6\"" → "Standard Top 6 inch"
  thickness: string;         // e.g. "6\""
  top_type: string | null;   // "Standard Top" | "Euro Top" | "Pillow Top" | null
  mrp: number;
  base_price: number;
  stock: number;
  sku: string;
}

export interface Product {
  id: string;
  slug: string;
  family: string;            // e.g. "Descanso"
  category: string;          // e.g. "Mattress"
  tier: "premium" | "mid" | "economy";
  tagline: string;
  description: string;
  features: string[];
  images: string[];
  sizes_available: string[];
  variants: ProductVariant[];
  trial_nights?: number;
  warranty_years?: number;
  is_active: boolean;
  created_at: string;
}

// ── Cart ──────────────────────────────────────────────────────
export interface CartItem {
  id: string;
  product_id: string;
  variant_id: string;
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  subtotal: number;
  discount: number;
  coupon_code?: string;
}

// ── Order ─────────────────────────────────────────────────────
export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "returned";

export type PaymentMethod = "razorpay_upi" | "razorpay_card" | "razorpay_netbanking" | "razorpay_emi" | "cod";

export interface Order {
  id: string;
  order_number: string;
  user_id?: string;
  items: OrderItem[];
  shipping_address: Address;
  billing_address: Address;
  payment_method: PaymentMethod;
  payment_status: "pending" | "paid" | "failed" | "refunded";
  order_status: OrderStatus;
  subtotal: number;
  discount: number;
  shipping_charge: number;
  total: number;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  notes?: string;
  created_at: string;
}

export interface OrderItem {
  product_id: string;
  variant_id: string;
  product_name: string;
  variant_label: string;
  size: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface Address {
  name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
}

// ── Blog ──────────────────────────────────────────────────────
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  author_bio?: string;
  published_at: string;
  updated_at?: string;
  category: string;
  tags: string[];
  cover_image: string;
  read_time: number;
  region?: string;           // "kerala" | "tamilnadu" | "karnataka" | "andhra"
  meta_title?: string;
  meta_description?: string;
  schema_faq?: { question: string; answer: string }[];
}

// ── Lead / Enquiry ────────────────────────────────────────────
export interface BulkEnquiry {
  name: string;
  phone: string;
  email?: string;
  organisation?: string;
  city: string;
  state: string;
  quantity: number;
  product_interest?: string;
  message?: string;
}

// ── Supabase DB row shapes ────────────────────────────────────
export interface DbProduct {
  id: string;
  slug: string;
  family: string;
  category: string;
  tier: string;
  tagline: string;
  description: string;
  features: string[];
  images: string[];
  trial_nights: number;
  warranty_years: number;
  is_active: boolean;
  created_at: string;
}

export interface DbVariant {
  id: string;
  product_id: string;
  size: string;
  variant_label: string;
  thickness: string;
  top_type: string | null;
  mrp: number;
  base_price: number;
  stock: number;
  sku: string;
}
