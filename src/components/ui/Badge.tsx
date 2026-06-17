import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "success" | "sale" | "gold" | "muted" | "outline";
  size?: "sm" | "md";
  className?: string;
}

export default function Badge({ children, variant = "primary", size = "sm", className }: BadgeProps) {
  const variants = {
    primary: "bg-primary-tint text-primary",
    success: "bg-emerald-50 text-emerald-700",
    sale: "bg-red-50 text-sale",
    gold: "bg-gold-gradient text-premium-bg",
    muted: "bg-gray-100 text-muted",
    outline: "border border-line text-muted bg-white",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full font-medium", variants[variant], sizes[size], className)}>
      {children}
    </span>
  );
}
