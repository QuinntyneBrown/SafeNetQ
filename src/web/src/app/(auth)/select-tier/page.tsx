"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const tiers = [
  {
    id: "bronze",
    name: "Bronze",
    price: 25,
    maxAssistance: "$5,000",
    features: ["Basic community access", "Email support", "Standard review (7-10 days)"],
    fee: "$0.50 processing fee",
  },
  {
    id: "silver",
    name: "Silver",
    price: 50,
    maxAssistance: "$15,000",
    features: ["Priority review (3-5 days)", "Chat support", "Quarterly transparency reports"],
    fee: "$0.75 processing fee",
    popular: true,
  },
  {
    id: "gold",
    name: "Gold",
    price: 100,
    maxAssistance: "$50,000",
    features: ["Fastest review (1-2 days)", "Dedicated advisor", "Full audit trail access"],
    fee: "$1.00 processing fee",
  },
];

export default function SelectTierPage() {
  const [selected, setSelected] = useState("silver");

  return (
    <div className="flex min-h-screen flex-col items-center bg-surface px-4 py-8">
      <Link href="/" className="flex items-center gap-2 mb-10">
        <Shield className="h-8 w-8 text-primary" />
        <span className="font-heading text-2xl font-bold">SafeNetQ</span>
      </Link>

      <div className="w-full max-w-4xl text-center mb-10">
        <h1 className="font-heading text-2xl font-bold">Choose Your Contribution Tier</h1>
        <p className="mt-2 text-sm text-secondary">
          Your monthly contribution determines your maximum assistance limit.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 w-full max-w-4xl">
        {tiers.map((tier) => (
          <button
            key={tier.id}
            onClick={() => setSelected(tier.id)}
            className={cn(
              "relative rounded-xl border bg-white p-6 text-left transition-all",
              selected === tier.id
                ? "border-primary shadow-lg ring-2 ring-primary"
                : "border-border hover:border-primary/30",
              tier.popular && selected !== tier.id && "border-primary/50"
            )}
          >
            {tier.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-medium text-white">
                Recommended
              </span>
            )}
            <h3 className="font-heading text-lg font-semibold">{tier.name}</h3>
            <div className="mt-2">
              <span className="font-heading text-3xl font-bold">${tier.price}</span>
              <span className="text-sm text-secondary">/month</span>
            </div>
            <p className="text-xs text-secondary mt-1">{tier.fee}</p>
            <p className="mt-3 text-sm font-medium text-primary">
              Up to {tier.maxAssistance} assistance
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              {tier.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-secondary">
                  <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </button>
        ))}
      </div>

      <div className="mt-8 w-full max-w-md">
        <Link href="/setup-payment">
          <Button className="w-full" size="lg">
            Continue with {tiers.find((t) => t.id === selected)?.name}
          </Button>
        </Link>
      </div>
    </div>
  );
}
