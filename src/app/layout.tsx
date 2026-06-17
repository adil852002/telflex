import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://telflex.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Telflex Mattress — Kerala's #1 Mattress Manufacturer Since 2000",
    template: "%s | Telflex Mattress",
  },
  description:
    "Buy the best mattresses online from Telflex — Kerala's leading mattress manufacturer since 2000. Free delivery across South India, 30-night trial, No-Cost EMI & COD available.",
  keywords: [
    "mattress Kerala", "best mattress Kerala", "buy mattress online Kerala",
    "mattress manufacturer Kerala", "mattress Kochi", "mattress Thiruvananthapuram",
    "mattress Tamil Nadu", "mattress Bengaluru", "foam mattress", "orthopaedic mattress",
    "Telflex mattress", "mattress free delivery Kerala",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Telflex Mattress",
    title: "Telflex Mattress — Kerala's #1 Mattress Manufacturer Since 2000",
    description:
      "Factory-direct mattresses. Free delivery across Kerala & South India. 30-night trial. No-Cost EMI.",
    images: [{ url: `${SITE_URL}/og-default.jpg`, width: 1200, height: 630, alt: "Telflex Mattress" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Telflex Mattress — Kerala's #1 Manufacturer",
    description: "Factory-direct mattresses. Free delivery across South India.",
    images: [`${SITE_URL}/og-default.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: SITE_URL },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${sora.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans text-ink bg-white">
        <AnnouncementBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
