"use client";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "gold" | "danger";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading, fullWidth, className, children, disabled, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:cursor-not-allowed gap-2";

    const variants = {
      primary: "bg-primary text-white hover:bg-primary-dark active:scale-[0.98] shadow-sm hover:shadow-md",
      outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white active:scale-[0.98]",
      ghost: "text-primary hover:bg-primary-tint active:scale-[0.98]",
      gold: "bg-gold-gradient text-premium-bg font-bold hover:opacity-90 active:scale-[0.98] shadow-premium",
      danger: "bg-sale text-white hover:bg-red-700 active:scale-[0.98]",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-5 py-2.5 text-sm",
      lg: "px-6 py-3 text-base",
      xl: "px-8 py-4 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], fullWidth && "w-full", className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export default Button;
