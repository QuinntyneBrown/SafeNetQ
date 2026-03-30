"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, CreditCard, Building2, Smartphone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

const methods = [
  { id: "card", label: "Debit/Credit Card", icon: <CreditCard className="h-5 w-5" /> },
  { id: "bank", label: "Bank Transfer", icon: <Building2 className="h-5 w-5" /> },
  { id: "mobile", label: "Mobile Money", icon: <Smartphone className="h-5 w-5" /> },
];

export default function SetupPaymentPage() {
  const [selected, setSelected] = useState("card");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 1500);
  };

  if (done) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-surface px-4">
        <div className="w-full max-w-md text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success mx-auto mb-4">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h2 className="font-heading text-2xl font-bold mb-2">You&apos;re All Set!</h2>
          <p className="text-sm text-secondary mb-8">
            Your payment method has been saved. Your first contribution will be processed shortly.
          </p>
          <Link href="/dashboard">
            <Button className="w-full" size="lg">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-surface px-4 py-8">
      <Link href="/" className="flex items-center gap-2 mb-10">
        <Shield className="h-8 w-8 text-primary" />
        <span className="font-heading text-2xl font-bold">SafeNetQ</span>
      </Link>

      <div className="w-full max-w-md text-center mb-8">
        <h1 className="font-heading text-2xl font-bold">Set Up Payment</h1>
        <p className="mt-2 text-sm text-secondary">
          Choose how you would like to make your monthly contributions.
        </p>
      </div>

      <div className="w-full max-w-md rounded-xl border border-border bg-white p-6">
        <div className="flex flex-col gap-3 mb-6">
          {methods.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelected(m.id)}
              className={cn(
                "flex items-center gap-3 rounded-lg border p-3 transition-colors text-left",
                selected === m.id ? "border-primary bg-primary/5" : "border-border hover:bg-surface"
              )}
            >
              <span className="text-primary">{m.icon}</span>
              <span className="text-sm font-medium">{m.label}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {selected === "card" && (
            <>
              <Input label="Card Number" placeholder="1234 5678 9012 3456" required />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Expiry" placeholder="MM/YY" required />
                <Input label="CVV" placeholder="123" required />
              </div>
              <Input label="Cardholder Name" placeholder="John Doe" required />
            </>
          )}
          {selected === "bank" && (
            <>
              <Input label="Bank Name" placeholder="Your bank name" required />
              <Input label="Account Number" placeholder="Account number" required />
              <Input label="Routing Number" placeholder="Routing number" required />
            </>
          )}
          {selected === "mobile" && (
            <>
              <Input label="Phone Number" placeholder="+1 (555) 000-0000" required />
              <Input label="Provider" placeholder="e.g., M-Pesa, Venmo" required />
            </>
          )}

          <Button type="submit" loading={loading} className="w-full mt-2">
            Save Payment Method
          </Button>
        </form>
      </div>
    </div>
  );
}
