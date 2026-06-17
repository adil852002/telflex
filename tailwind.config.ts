import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core brand
        primary: {
          DEFAULT: "#15489F",
          dark: "#0E3372",
          light: "#1E5FCC",
          tint: "#EAF1FB",
        },
        ink: "#1A1A1A",
        muted: "#5B6470",
        line: "#E6E8EC",
        success: "#1E8E5A",
        sale: "#C0392B",
        // Premium gold — used ONLY in /premium section
        gold: {
          1: "#BF953F",
          2: "#FCF6BA",
          3: "#B38728",
          4: "#FBF5B7",
          5: "#AA771C",
        },
        "premium-bg": "#0C0C0E",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-sora)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg,#BF953F 0%,#FCF6BA 45%,#AA771C 100%)",
        "gold-shimmer":
          "linear-gradient(90deg,#BF953F 0%,#FCF6BA 30%,#D4AF6B 50%,#FCF6BA 70%,#AA771C 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
        shimmer: "shimmer 2.5s infinite linear",
        "marquee": "marquee 30s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      boxShadow: {
        card: "0 2px 12px rgba(0,0,0,0.07)",
        "card-hover": "0 8px 28px rgba(0,0,0,0.12)",
        premium: "0 4px 24px rgba(191,149,63,0.25)",
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },
    },
  },
  plugins: [],
};

export default config;
