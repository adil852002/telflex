import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect width="20" height="20" x="2" y="2" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

const FOOTER_LINKS = {
  Products: [
    { label: "Foam Mattresses", href: "/collections/mattresses" },
    { label: "Cotton Mattresses", href: "/collections/cotton-mattresses" },
    { label: "Pillows", href: "/collections/bedding" },
    { label: "Baby Beds", href: "/collections/baby-mattresses" },
    { label: "Institutional / Hostel", href: "/collections/institutional" },
    { label: "Telflex Premium", href: "/premium" },
  ],
  Help: [
    { label: "Warranty & Trial", href: "/warranty" },
    { label: "Shipping Policy", href: "/shipping" },
    { label: "Returns & Refunds", href: "/returns" },
    { label: "No-Cost EMI", href: "/emi" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact Us", href: "/contact" },
  ],
  Company: [
    { label: "About Telflex", href: "/about" },
    { label: "Bulk / B2B Orders", href: "/bulk-purchase" },
    { label: "Blog", href: "/blog" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

const REGIONS = [
  { label: "Mattress in Thiruvananthapuram", href: "/collections/mattresses?city=thiruvananthapuram" },
  { label: "Mattress in Kochi", href: "/collections/mattresses?city=kochi" },
  { label: "Mattress in Kozhikode", href: "/collections/mattresses?city=kozhikode" },
  { label: "Mattress in Chennai", href: "/collections/mattresses?city=chennai" },
  { label: "Mattress in Bengaluru", href: "/collections/mattresses?city=bengaluru" },
  { label: "Mattress in Hyderabad", href: "/collections/mattresses?city=hyderabad" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0F1117] text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image src="/logo.png" alt="Telflex Mattresses" width={140} height={40} className="h-10 w-auto object-contain brightness-0 invert" />
              <span className="block text-xs text-white/50 mt-1">Mattress & Pillows — Since 2000</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Kerala's trusted mattress manufacturer for 25 years. Factory-direct pricing, 30-night sleep trial, free delivery across South India.
            </p>
            <div className="mt-6 space-y-2">
              <a href="tel:+919400000000" className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
                <Phone size={14} /> +91 9400000000
              </a>
              <a href="mailto:info@telflex.in" className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
                <Mail size={14} /> info@telflex.in
              </a>
              <span className="flex items-start gap-2 text-sm text-white/70">
                <MapPin size={14} className="mt-0.5 shrink-0" />
                <span>Telflex Industries, Kerala, India</span>
              </span>
            </div>
            {/* Social */}
            <div className="mt-6 flex gap-3">
              {[
                { icon: <FacebookIcon />, href: "https://facebook.com/telflex", label: "Facebook" },
                { icon: <InstagramIcon />, href: "https://instagram.com/telflex", label: "Instagram" },
                { icon: <YoutubeIcon />, href: "https://youtube.com/@telflex", label: "YouTube" },
              ].map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-lg bg-white/10 hover:bg-primary transition-colors"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="font-semibold text-white text-sm mb-4">{heading}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Region SEO links */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">Shop by City</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {REGIONS.map((r) => (
              <Link key={r.label} href={r.href} className="text-xs text-white/40 hover:text-white/70 transition-colors">
                {r.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Telflex Industries. All rights reserved. Made in Kerala 🌴
          </p>
          <div className="flex items-center gap-4 text-xs text-white/40">
            <Link href="/privacy" className="hover:text-white/70">Privacy</Link>
            <Link href="/returns" className="hover:text-white/70">Returns</Link>
            <Link href="/shipping" className="hover:text-white/70">Shipping</Link>
          </div>
          {/* Payment badges */}
          <div className="flex items-center gap-2 text-white/40 text-xs">
            <span className="border border-white/20 rounded px-2 py-0.5">UPI</span>
            <span className="border border-white/20 rounded px-2 py-0.5">Visa</span>
            <span className="border border-white/20 rounded px-2 py-0.5">Mastercard</span>
            <span className="border border-white/20 rounded px-2 py-0.5">EMI</span>
            <span className="border border-white/20 rounded px-2 py-0.5">COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
