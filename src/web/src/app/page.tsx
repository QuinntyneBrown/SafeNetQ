"use client";

import Link from "next/link";
import {
  Shield,
  Users,
  Heart,
  Lock,
  ArrowRight,
  CheckCircle2,
  Globe,
  Wallet,
  FileCheck,
  HandCoins,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const steps = [
  {
    icon: <Users className="h-6 w-6" />,
    title: "Join the Community",
    description: "Register, verify your identity, and choose a contribution tier.",
  },
  {
    icon: <Wallet className="h-6 w-6" />,
    title: "Contribute Monthly",
    description: "Small monthly contributions pool together into a shared safety net.",
  },
  {
    icon: <HandCoins className="h-6 w-6" />,
    title: "Request When Needed",
    description: "Submit a request with documentation when life throws you a curveball.",
  },
  {
    icon: <FileCheck className="h-6 w-6" />,
    title: "Community Review",
    description: "Requests are reviewed by the community for fair, transparent decisions.",
  },
];

const trustFeatures = [
  {
    icon: <Lock className="h-6 w-6" />,
    title: "Bank-Grade Security",
    description: "End-to-end encryption and SOC 2 compliance protect your data.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "KYC Verified Members",
    description: "Every member is identity-verified to prevent fraud.",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Full Transparency",
    description: "Real-time fund health dashboard and anonymized community feed.",
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Community Governed",
    description: "Democratic voting ensures fair assistance distribution.",
  },
];

const tiers = [
  { name: "Bronze", price: "$25", period: "/month", features: ["Up to $5,000 assistance", "Community feed access", "Email support"] },
  { name: "Silver", price: "$50", period: "/month", features: ["Up to $15,000 assistance", "Priority review", "Chat support", "Quarterly reports"], popular: true },
  { name: "Gold", price: "$100", period: "/month", features: ["Up to $50,000 assistance", "Fastest review", "Dedicated advisor", "Full audit access"] },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-full">
      <Header />

      {/* Hero */}
      <section className="relative bg-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-32 md:px-8">
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl leading-tight">
              Your Community{" "}
              <span className="text-accent">Safety Net</span>
            </h1>
            <p className="mt-6 text-lg text-white/70 max-w-lg">
              Pool resources with trusted, verified members. Contribute a little each month, access
              support when you need it most.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
            <div className="mt-10 flex gap-8">
              {[
                ["2,500+", "Members"],
                ["$1.2M", "Disbursed"],
                ["98%", "Satisfaction"],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="font-heading text-2xl font-bold text-white">{value}</p>
                  <p className="text-sm text-white/50">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-surface">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl font-bold">How SafeNetQ Works</h2>
            <p className="mt-3 text-secondary max-w-xl mx-auto">
              A simple, transparent process designed to help communities support each other.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div key={step.title} className="relative flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                  {step.icon}
                </div>
                <span className="absolute top-0 -left-2 font-heading text-5xl font-bold text-primary/10 md:left-auto">
                  {i + 1}
                </span>
                <h3 className="font-heading text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-secondary">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section id="trust" className="py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl font-bold">Built on Trust</h2>
            <p className="mt-3 text-secondary max-w-xl mx-auto">
              Security and transparency are at the core of everything we do.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {trustFeatures.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-border bg-white p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-heading text-base font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-secondary">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section id="tiers" className="py-20 bg-surface">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl font-bold">Choose Your Tier</h2>
            <p className="mt-3 text-secondary max-w-xl mx-auto">
              Select the plan that fits your budget. Upgrade or downgrade anytime.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-xl border bg-white p-6 flex flex-col ${
                  tier.popular ? "border-primary shadow-lg ring-1 ring-primary" : "border-border"
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-medium text-white">
                    Most Popular
                  </span>
                )}
                <h3 className="font-heading text-xl font-semibold">{tier.name}</h3>
                <div className="mt-3">
                  <span className="font-heading text-3xl font-bold">{tier.price}</span>
                  <span className="text-sm text-secondary">{tier.period}</span>
                </div>
                <ul className="mt-6 flex flex-col gap-3 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/register" className="mt-6">
                  <Button
                    variant={tier.popular ? "primary" : "secondary"}
                    className="w-full"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-8">
          <h2 className="font-heading text-3xl font-bold text-white">
            Ready to Join Your Safety Net?
          </h2>
          <p className="mt-4 text-white/70">
            Start protecting yourself and your community today.
          </p>
          <Link href="/register" className="mt-8 inline-block">
            <Button variant="accent" size="lg">
              Create Your Account <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
