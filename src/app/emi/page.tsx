import type { Metadata } from "next";
import Link from "next/link";
import { CreditCard, CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "No-Cost EMI on Mattresses — 0% Interest | Telflex",
  description:
    "Buy Telflex mattresses on No-Cost EMI. 3, 6, or 12-month EMI plans with 0% interest via Razorpay. Available on all mattresses above ₹5,000.",
  alternates: { canonical: "/emi" },
};

const EMI_EXAMPLE = [
  { plan: "3 months", amount: 24500, emi: 8167 },
  { plan: "6 months", amount: 24500, emi: 4084 },
  { plan: "12 months", amount: 24500, emi: 2042 },
];

export default function EMIPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-primary-tint rounded-2xl flex items-center justify-center">
          <CreditCard size={24} className="text-primary" />
        </div>
        <div>
          <h1 className="font-display font-bold text-3xl text-ink">No-Cost EMI</h1>
          <p className="text-muted text-sm">0% interest — pay in easy monthly instalments</p>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-primary rounded-2xl p-6 text-white mb-8">
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="font-display font-bold text-3xl">0%</div>
            <div className="text-white/80 text-sm mt-1">Interest</div>
          </div>
          <div>
            <div className="font-display font-bold text-3xl">3/6/12</div>
            <div className="text-white/80 text-sm mt-1">Month Plans</div>
          </div>
          <div>
            <div className="font-display font-bold text-3xl">₹5K+</div>
            <div className="text-white/80 text-sm mt-1">Min. Order</div>
          </div>
        </div>
      </div>

      {/* Example */}
      <h2 className="font-display font-bold text-xl text-ink mb-4">EMI Example — Telflex Descanso Queen</h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-primary-tint">
              <th className="text-left px-4 py-3 font-semibold text-ink rounded-tl-xl">EMI Plan</th>
              <th className="text-left px-4 py-3 font-semibold text-ink">Mattress Price</th>
              <th className="text-left px-4 py-3 font-semibold text-ink">Monthly EMI</th>
              <th className="text-left px-4 py-3 font-semibold text-ink rounded-tr-xl">Interest</th>
            </tr>
          </thead>
          <tbody>
            {EMI_EXAMPLE.map((row) => (
              <tr key={row.plan} className="border-t border-line">
                <td className="px-4 py-3 font-medium text-ink">{row.plan}</td>
                <td className="px-4 py-3 text-muted">₹{row.amount.toLocaleString("en-IN")}</td>
                <td className="px-4 py-3 font-bold text-primary">₹{row.emi.toLocaleString("en-IN")}/mo</td>
                <td className="px-4 py-3 font-semibold text-green-600">₹0</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-6 mb-10">
        <div>
          <h2 className="font-display font-bold text-xl text-ink mb-3">How to Get EMI</h2>
          <ol className="space-y-3">
            {[
              "Add your mattress to cart and proceed to checkout.",
              "At payment, choose 'Pay Online' via Razorpay.",
              "Select your card or bank and choose the EMI option.",
              "Pick your preferred tenure (3, 6, or 12 months).",
              "Your mattress is ordered — EMI starts from next month.",
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                <span className="text-ink">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h2 className="font-display font-bold text-xl text-ink mb-3">Eligible Cards & Banks</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {["HDFC Bank", "ICICI Bank", "SBI Card", "Axis Bank", "Kotak Mahindra", "IndusInd Bank", "IDFC FIRST", "American Express", "Bajaj Finserv"].map((bank) => (
              <div key={bank} className="flex items-center gap-2 text-sm text-ink border border-line rounded-lg px-3 py-2">
                <CheckCircle size={12} className="text-green-500" />
                {bank}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted mt-2">More banks available at checkout. Subject to bank approval.</p>
        </div>
      </div>

      <Link href="/collections/mattresses">
        <Button variant="primary" size="lg">Shop with No-Cost EMI</Button>
      </Link>
    </div>
  );
}
