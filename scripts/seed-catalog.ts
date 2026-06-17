/**
 * Seed the Telflex product catalog into Supabase.
 * Run: npx tsx scripts/seed-catalog.ts
 */
import { createClient } from "@supabase/supabase-js";
import catalogRaw from "../telflex_catalog.json" assert { type: "json" };

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const TIER_MAP: Record<string, "premium" | "mid" | "economy"> = {
  Vertigo: "premium",
  Descanso: "premium",
  Pearls: "premium",
  Siesta: "premium",
  Sereno: "mid",
  Cera: "mid",
  Orthocare: "mid",
  "40 Plus": "mid",
  Hitech: "economy",
  iSoft: "economy",
  Dreams: "economy",
  Prince: "economy",
  Crown: "economy",
  Moon: "economy",
};

const SIZE_LABEL: Record<string, string> = {
  "72X30": 'Single (72×30")',
  "72X36": 'Single XL (72×36")',
  "72X42": 'Small Double (72×42")',
  "72X48": 'Double (72×48")',
  "72X60": 'Queen (72×60")',
  "72X72": 'King (72×72")',
  "75X30": 'Single (75×30")',
  "75X36": 'Single XL (75×36")',
  "75X42": 'Small Double (75×42")',
  "75X48": 'Double (75×48")',
  "75X60": 'Queen (75×60")',
  "75X72": 'King (75×72")',
  "78X30": 'Single Long (78×30")',
  "78X36": 'Single XL Long (78×36")',
  "78X42": 'Small Double Long (78×42")',
  "78X48": 'Double Long (78×48")',
  "78X60": 'Queen Long (78×60")',
  "78X72": 'King Long (78×72")',
};

const TOP_TYPE_MAP: Record<string, string> = {
  ST: "Standard Top",
  ET: "Euro Top",
  PT: "Pillow Top",
};

function parseVariantLabel(label: string): { topType: string | null; thickness: string } {
  const parts = label.split(" ");
  if (parts.length === 2) {
    return {
      topType: TOP_TYPE_MAP[parts[0]] ?? null,
      thickness: parts[1],
    };
  }
  return { topType: null, thickness: label };
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const DESCRIPTIONS: Record<string, string> = {
  Vertigo: "Experience a new dimension of sleep with the Vertigo — Telflex's flagship comfort system featuring advanced bonded foam layers engineered for precise body contouring and spinal alignment.",
  Descanso: "The Descanso (Spanish: rest) is built for deep, restorative sleep. Multi-zone foam construction adapts to every sleeping position for uninterrupted nights.",
  Pearls: "Pearls features a premium quilted top with pearl-infused comfort foam that stays naturally cool, making it ideal for Kerala's warm climate.",
  Siesta: "Named after the art of the perfect midday rest, Siesta delivers medium-firm support — the preferred feel in South Indian households for generations.",
  Sereno: "Sereno's serene sleep surface combines HD foam base with a gentle comfort layer. Outstanding value in the mid-range with proven durability.",
  Cera: "Cera's ceramic-fabric cover reflects body heat for a cooler sleep, paired with a supportive HD foam core. A smart upgrade from basic foam.",
  Orthocare: "Designed with orthopedic principles, Orthocare's high-density base provides firm, targeted support for back and joint health.",
  "40 Plus": "Specifically engineered for sleepers above 40 — firmer support zones, pressure-point relief, and durable construction for long-term well-being.",
  Hitech: "High-technology foam construction at an accessible price. Hitech delivers consistent support without the premium price tag.",
  iSoft: "iSoft's gentle contouring foam is a favourite for guest rooms and children's beds — soft, supportive, and easy on the wallet.",
  Dreams: "Dreams is the perfect first mattress upgrade — better materials than a basic foam, great pricing, delivered across Kerala and Tamil Nadu.",
  Prince: "Prince is crafted for everyday durability. Solid construction, honest pricing — the reliable choice for rental properties and student accommodation.",
  Crown: "Crown is Telflex's entry-level coir-foam mattress delivering firm traditional support, popular with elders who prefer a harder sleeping surface.",
  Moon: "Moon's feather-light design and affordable price make it the most accessible mattress in the Telflex range, available across South India.",
};

const FEATURES: Record<string, string[]> = {
  Vertigo: ["Advanced bonded foam system", "Pressure-point contouring", "Anti-sag edge support", "Breathable quilted cover", "5-zone spinal alignment"],
  Descanso: ["Multi-zone comfort layers", "Euro / Pillow Top options", "HD foam base for durability", "Motion isolation", "Hypoallergenic cover"],
  Pearls: ["Pearl-infused cooling foam", "Premium quilted top", "Excellent for warm climates", "Medium-firm feel", "10-year warranty option"],
  Siesta: ["Medium-firm feel preferred in South India", "Bonded foam comfort layer", "Strong HD foam base", "Available in Euro & Pillow Top", "Free home delivery Kerala & TN"],
  Sereno: ["HD foam for durability", "Comfortable quilted top", "Good motion isolation", "Value-for-money mid-range", "3 thickness options"],
  Cera: ["Ceramic-fabric cool cover", "HD foam base", "Multiple top constructions", "Ideal for year-round use", "5-year warranty"],
  Orthocare: ["Orthopedic firm support", "High-density foam core", "Back & joint health focus", "Available from 4\" to 6\"", "Recommended by physiotherapists"],
  "40 Plus": ["Designed for 40+ age group", "Extra-firm support zones", "Pressure relief for joints", "Enhanced durability", "Medium and high density options"],
  Hitech: ["High-technology foam layers", "Consistent support profile", "Available in 4\", 5\", 6\"", "Easy to maintain", "Value pricing"],
  iSoft: ["Soft contouring foam", "Ideal for guest beds", "Lightweight and portable", "Available in 4\" & 5\"", "All South India delivery"],
  Dreams: ["Upgraded foam from basics", "Good for daily use", "4\" and 5\" options", "Competitive pricing", "Kerala & TN focused delivery"],
  Prince: ["Durable everyday construction", "4\" and 5\" options", "Good for rental properties", "Consistent quality", "Pan South India delivery"],
  Crown: ["Coir-foam hybrid", "Traditional firm feel", "3\", 4\", 5\" options", "Preferred by elders", "Long-lasting construction"],
  Moon: ["Affordable entry-level", "Soft feel", "3\", 4\", 5\" options", "Lightweight design", "Budget-friendly"],
};

async function seed() {
  const catalog = catalogRaw as Array<{
    family: string;
    category: string;
    variants: Array<{ size: string | null; variant: string; mrp: number; base: number }>;
  }>;

  console.log(`Seeding ${catalog.length} product families…`);

  for (const item of catalog) {
    const slug = slugify(item.family);
    const tier = TIER_MAP[item.family] ?? "mid";

    // Upsert product
    const { data: product, error: pErr } = await supabase
      .from("products")
      .upsert({
        slug,
        family: item.family,
        category: item.category,
        tier,
        tagline: `${item.family} — crafted by Telflex since 2000`,
        description: DESCRIPTIONS[item.family] ?? `The ${item.family} mattress by Telflex — quality you can feel.`,
        features: FEATURES[item.family] ?? [],
        images: [`/images/products/${slug}/main.jpg`],
        trial_nights: tier === "premium" ? 100 : 30,
        warranty_years: tier === "premium" ? 10 : 5,
        is_active: true,
      }, { onConflict: "slug" })
      .select("id")
      .single();

    if (pErr) { console.error(`Product error for ${item.family}:`, pErr.message); continue; }

    // Delete old variants (full refresh)
    await supabase.from("variants").delete().eq("product_id", product.id);

    // Insert variants
    const variants = item.variants
      .filter((v) => v.size !== null)
      .map((v) => {
        const { topType, thickness } = parseVariantLabel(v.variant);
        const sizeKey = v.size as string;
        return {
          product_id: product.id,
          size: sizeKey,
          size_label: SIZE_LABEL[sizeKey] ?? sizeKey,
          variant_label: v.variant,
          thickness,
          top_type: topType,
          mrp: v.mrp,
          base_price: v.base,
          stock: 999,
          sku: `TF-${slug.toUpperCase().slice(0, 6)}-${sizeKey}-${v.variant.replace(/[^A-Z0-9]/gi, "")}`,
          is_active: true,
        };
      });

    if (variants.length > 0) {
      const { error: vErr } = await supabase.from("variants").insert(variants);
      if (vErr) console.error(`Variant error for ${item.family}:`, vErr.message);
    }

    console.log(`✓ ${item.family} (${variants.length} variants)`);
  }

  console.log("\n✅ Catalog seed complete!");
}

seed().catch(console.error);
