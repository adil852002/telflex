-- ─────────────────────────────────────────────────────────────────
-- Telflex: Initial Schema
-- ─────────────────────────────────────────────────────────────────

-- Products (one row per family)
CREATE TABLE IF NOT EXISTS products (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            TEXT UNIQUE NOT NULL,
  family          TEXT NOT NULL,
  category        TEXT NOT NULL,          -- 'Mattress' | 'Cotton Mattress' | etc.
  tier            TEXT NOT NULL DEFAULT 'mid', -- 'premium' | 'mid' | 'economy'
  tagline         TEXT NOT NULL DEFAULT '',
  description     TEXT NOT NULL DEFAULT '',
  features        TEXT[] DEFAULT '{}',
  images          TEXT[] DEFAULT '{}',
  trial_nights    INTEGER DEFAULT 30,
  warranty_years  INTEGER DEFAULT 5,
  is_active       BOOLEAN DEFAULT TRUE,
  sort_order      INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Variants (size × top-type × thickness per product)
CREATE TABLE IF NOT EXISTS variants (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id      UUID REFERENCES products(id) ON DELETE CASCADE,
  size            TEXT NOT NULL,          -- '72X60'
  size_label      TEXT NOT NULL DEFAULT '',  -- 'Queen (72×60")'
  variant_label   TEXT NOT NULL,          -- 'ST 6"'
  thickness       TEXT NOT NULL,          -- '6"'
  top_type        TEXT,                   -- 'Standard Top' | 'Euro Top' | 'Pillow Top' | null
  mrp             INTEGER NOT NULL,
  base_price      INTEGER NOT NULL,
  stock           INTEGER DEFAULT 999,
  sku             TEXT,
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Orders
CREATE TABLE IF NOT EXISTS orders (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number        TEXT UNIQUE NOT NULL,
  user_id             UUID,
  customer_name       TEXT NOT NULL,
  customer_email      TEXT,
  customer_phone      TEXT NOT NULL,
  items               JSONB NOT NULL DEFAULT '[]',
  shipping_address    JSONB NOT NULL DEFAULT '{}',
  billing_address     JSONB NOT NULL DEFAULT '{}',
  payment_method      TEXT NOT NULL,
  payment_status      TEXT NOT NULL DEFAULT 'pending',
  order_status        TEXT NOT NULL DEFAULT 'pending',
  subtotal            INTEGER NOT NULL,
  discount            INTEGER DEFAULT 0,
  coupon_code         TEXT,
  shipping_charge     INTEGER DEFAULT 0,
  total               INTEGER NOT NULL,
  razorpay_order_id   TEXT,
  razorpay_payment_id TEXT,
  notes               TEXT,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- Blog posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            TEXT UNIQUE NOT NULL,
  title           TEXT NOT NULL,
  excerpt         TEXT NOT NULL DEFAULT '',
  content         TEXT NOT NULL DEFAULT '',
  author          TEXT NOT NULL DEFAULT 'Telflex Team',
  author_bio      TEXT,
  published_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  category        TEXT NOT NULL DEFAULT 'Sleep Tips',
  tags            TEXT[] DEFAULT '{}',
  cover_image     TEXT DEFAULT '',
  is_published    BOOLEAN DEFAULT TRUE,
  region          TEXT,                   -- 'kerala' | 'tamilnadu' | 'karnataka' | 'andhra'
  meta_title      TEXT,
  meta_description TEXT,
  schema_faq      JSONB DEFAULT '[]'
);

-- Bulk / B2B enquiries
CREATE TABLE IF NOT EXISTS bulk_enquiries (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  phone           TEXT NOT NULL,
  email           TEXT,
  organisation    TEXT,
  city            TEXT NOT NULL,
  state           TEXT NOT NULL,
  quantity        INTEGER,
  product_interest TEXT,
  message         TEXT,
  status          TEXT DEFAULT 'new',
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Contact submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  phone           TEXT NOT NULL,
  email           TEXT,
  subject         TEXT,
  message         TEXT NOT NULL,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Coupons
CREATE TABLE IF NOT EXISTS coupons (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code            TEXT UNIQUE NOT NULL,
  discount_type   TEXT NOT NULL DEFAULT 'percent',  -- 'percent' | 'flat'
  discount_value  INTEGER NOT NULL,
  min_order       INTEGER DEFAULT 0,
  max_uses        INTEGER,
  used_count      INTEGER DEFAULT 0,
  expires_at      TIMESTAMPTZ,
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Indexes ────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_variants_product_id ON variants(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_region ON blog_posts(region);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_tier ON products(tier);

-- ─── RLS Policies ───────────────────────────────────────────────
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE bulk_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public can read active products" ON products FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public can read active variants" ON variants FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public can read published blogs" ON blog_posts FOR SELECT USING (is_published = TRUE);

-- Anyone can insert enquiries
CREATE POLICY "Anyone can insert enquiry" ON bulk_enquiries FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Anyone can insert contact" ON contact_submissions FOR INSERT WITH CHECK (TRUE);

-- Orders: users can read their own
CREATE POLICY "Users read own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Anyone can insert order" ON orders FOR INSERT WITH CHECK (TRUE);
