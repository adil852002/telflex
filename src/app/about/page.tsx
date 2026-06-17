import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Award, Factory, Users, MapPin } from "lucide-react";
import Button from "@/components/ui/Button";
import { IMG } from "@/lib/images";

export const metadata: Metadata = {
  title: "About Telflex — Kerala's Leading Mattress Manufacturer Since 2000",
  description:
    "Learn about Telflex, Kerala's leading mattress manufacturer since 2000. Factory-direct mattresses with 25+ years of sleep science expertise, shipped across South India.",
  alternates: { canonical: "/about" },
};

const STATS = [
  { label: "Years of Experience", value: "25+" },
  { label: "Mattresses Made", value: "5 Lakh+" },
  { label: "Happy Families", value: "1 Lakh+" },
  { label: "Product Variants", value: "1,100+" },
];

const TEAM = [
  { name: "Thomas Mathew", role: "Founder & CEO", bio: "25 years in mattress manufacturing. Started Telflex from a small factory in Kottayam." },
  { name: "Priya Nair", role: "Head of Product Design", bio: "Sleep scientist with expertise in foam technology and ergonomic support systems." },
  { name: "Anil Kumar", role: "Operations Director", bio: "Manages factory operations across Kerala ensuring consistent quality standards." },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero banner */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <Image
          src={IMG.about.hero}
          alt="Telflex mattress showroom"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 to-primary/60" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <span className="text-xs font-bold uppercase tracking-widest text-white/70 mb-3 block">Our Story</span>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Kerala's Most Trusted<br />Mattress Manufacturer
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Since 2000, Telflex has been engineering sleep from our factory in Kerala. We believe everyone deserves a great night's sleep — at a price that doesn't keep you awake.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg viewBox="0 0 1440 40" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" />
          </svg>
        </div>
      </div>

    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {STATS.map((s) => (
          <div key={s.label} className="text-center bg-primary-tint rounded-2xl p-6">
            <div className="font-display font-bold text-4xl text-primary mb-1">{s.value}</div>
            <div className="text-sm text-muted">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Story */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
        <div className="aspect-[4/3] rounded-3xl overflow-hidden relative shadow-card-hover">
          <Image
            src={IMG.about.factory}
            alt="Telflex mattress factory in Kerala"
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
        <div>
          <h2 className="font-display font-bold text-3xl text-ink mb-4">Factory to Your Doorstep</h2>
          <p className="text-muted mb-4 leading-relaxed">
            Telflex was founded in 2000 in Kottayam, Kerala, with a simple belief: manufacturing mattresses locally means we can control quality and pass the savings to customers.
          </p>
          <p className="text-muted mb-4 leading-relaxed">
            Today, we manufacture over 25 product families — from economy cotton mattresses to ultra-premium memory foam collections — all from our ISO-certified facility in Kerala.
          </p>
          <p className="text-muted leading-relaxed">
            Every mattress ships factory-direct to customers across Kerala, Tamil Nadu, Karnataka, and Andhra Pradesh — cutting out middlemen and saving buyers 20–40% versus retail stores.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="mb-16">
        <h2 className="font-display font-bold text-3xl text-ink text-center mb-8">Why We're Different</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: Factory, title: "Factory-Direct Pricing", desc: "We manufacture in Kerala and ship direct to you. No importers, no wholesalers, no retailers. You pay the factory price." },
            { icon: Award, title: "Quality You Can Trust", desc: "Every mattress is tested for density, firmness, and durability before it leaves our factory. 10-year warranty on premium range." },
            { icon: MapPin, title: "South India's Sleep Partner", desc: "We understand South India's climate — humid Kerala, hot Tamil Nadu, temperate Karnataka. Our foam recipes are optimised for each region." },
            { icon: Users, title: "1 Lakh+ Happy Customers", desc: "From Thiruvananthapuram to Hyderabad, over a lakh families sleep on Telflex mattresses. Our 30-night trial means zero risk for you." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white border border-line rounded-2xl p-6">
              <div className="w-10 h-10 bg-primary-tint rounded-xl flex items-center justify-center mb-4">
                <Icon size={20} className="text-primary" />
              </div>
              <h3 className="font-semibold text-ink mb-2">{title}</h3>
              <p className="text-sm text-muted leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="mb-16">
        <h2 className="font-display font-bold text-3xl text-ink text-center mb-8">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM.map((member, i) => (
            <div key={member.name} className="text-center bg-white border border-line rounded-3xl p-6 shadow-card">
              <div className="w-20 h-20 rounded-full overflow-hidden relative mx-auto mb-4 ring-4 ring-primary-tint">
                <Image
                  src={IMG.avatars[i] ?? IMG.avatars[0]}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <h3 className="font-display font-bold text-ink">{member.name}</h3>
              <p className="text-xs font-semibold text-primary mb-2">{member.role}</p>
              <p className="text-xs text-muted leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bedroom image section */}
      <div className="relative rounded-3xl overflow-hidden mb-16 h-64">
        <Image
          src={IMG.about.bedroom}
          alt="Telflex mattress in a beautiful bedroom"
          fill
          className="object-cover"
          sizes="(max-width:1024px) 100vw, 960px"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/80 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-center px-10">
          <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-2">Our Promise</p>
          <h3 className="font-display font-bold text-3xl text-white max-w-sm">
            Every Telflex mattress is made to outlast your expectations.
          </h3>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-primary rounded-3xl p-10 text-center text-white">
        <h2 className="font-display font-bold text-3xl mb-2">Ready to sleep better?</h2>
        <p className="text-white/80 mb-6">Free delivery · 30-night trial · No-Cost EMI</p>
        <Link href="/collections/mattresses">
          <Button size="lg" className="bg-white text-primary hover:bg-white/90" variant="primary">
            Shop All Mattresses
          </Button>
        </Link>
      </div>
    </div>
    </div>
  );
}
