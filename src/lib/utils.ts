import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateDiscount(mrp: number, base: number): number {
  return Math.round(((mrp - base) / mrp) * 100);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function sizeLabel(size: string): string {
  const map: Record<string, string> = {
    "72X30": "Single (72×30\")",
    "72X36": "Single XL (72×36\")",
    "72X42": "Small Double (72×42\")",
    "72X48": "Double (72×48\")",
    "72X60": "Queen (72×60\")",
    "72X72": "King (72×72\")",
    "75X30": "Single (75×30\")",
    "75X36": "Single XL (75×36\")",
    "75X42": "Small Double (75×42\")",
    "75X48": "Double (75×48\")",
    "75X60": "Queen (75×60\")",
    "75X72": "King (75×72\")",
    "78X30": "Single Long (78×30\")",
    "78X36": "Single XL Long (78×36\")",
    "78X42": "Small Double Long (78×42\")",
    "78X48": "Double Long (78×48\")",
    "78X60": "Queen Long (78×60\")",
    "78X72": "King Long (78×72\")",
  };
  return map[size] ?? size;
}

export function topTypeLabel(code: string | null): string {
  if (!code) return "";
  const map: Record<string, string> = {
    ST: "Standard Top",
    ET: "Euro Top",
    PT: "Pillow Top",
  };
  const prefix = code.split(" ")[0];
  return map[prefix] ?? code;
}

export function readTime(content: string): number {
  const wpm = 220;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wpm));
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length).trimEnd() + "…";
}
