import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Telflex Mattresses",
  description: "Telflex privacy policy: how we collect, use, and protect your personal information when you buy mattresses on telflex.in.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display font-bold text-4xl text-ink mb-2">Privacy Policy</h1>
      <p className="text-muted text-sm mb-8">Last updated: January 2025</p>

      <div className="prose-telflex space-y-8">
        <div>
          <h2>Information We Collect</h2>
          <p>When you place an order or contact us, we collect:</p>
          <ul className="list-none space-y-1 mt-2">
            {[
              "Name, phone number, and email address",
              "Delivery address and pincode",
              "Payment information (processed securely by Razorpay — we do not store card details)",
              "Order history and communication history",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-ink">
                <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul className="list-none space-y-1 mt-2">
            {[
              "Process and deliver your orders",
              "Communicate about delivery status and warranty claims",
              "Send occasional mattress care tips and special offers (with your consent)",
              "Improve our products and services",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-ink">
                <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Data Security</h2>
          <p>
            Your personal information is protected with industry-standard SSL encryption. Payment data is handled exclusively by Razorpay (PCI-DSS Level 1 certified) — Telflex never stores your card or UPI details on our servers.
          </p>
        </div>

        <div>
          <h2>Data Sharing</h2>
          <p>
            We do not sell your personal information. We share data only with:
          </p>
          <ul className="list-none space-y-1 mt-2">
            {[
              "Razorpay (payment processing)",
              "Delivery partners (your address and phone for delivery coordination)",
              "Supabase (our secure database provider, hosted in India)",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-ink">
                <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Cookies</h2>
          <p>
            We use essential cookies to maintain your shopping cart and session. We do not use tracking cookies without your consent.
          </p>
        </div>

        <div>
          <h2>Your Rights</h2>
          <p>
            You may request access to, correction of, or deletion of your personal data by contacting us at{" "}
            <a href="mailto:privacy@telflex.in" className="text-primary hover:underline">privacy@telflex.in</a> or calling{" "}
            <a href="tel:+919400000000" className="text-primary hover:underline">+91 94000 00000</a>.
          </p>
        </div>

        <div>
          <h2>Contact</h2>
          <p>
            For privacy-related queries, contact us at{" "}
            <a href="mailto:privacy@telflex.in" className="text-primary hover:underline">privacy@telflex.in</a>
          </p>
        </div>
      </div>
    </div>
  );
}
