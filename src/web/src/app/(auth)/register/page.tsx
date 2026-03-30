"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, Mail, Lock, User, Phone, Quote } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";

export default function RegisterPage() {
  const { register } = useAuth();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    try {
      await register({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-primary p-12 text-white">
        <div>
          <div className="flex items-center gap-2 mb-16">
            <Shield className="h-8 w-8 text-white" />
            <span className="font-heading text-2xl font-bold">SafeNetQ</span>
          </div>
          <h2 className="font-heading text-3xl font-bold leading-tight">
            Join a community that has your back.
          </h2>
          <p className="mt-4 text-white/70 max-w-sm">
            Thousands of verified members contributing together to create a reliable safety net.
          </p>
        </div>
        <div className="rounded-xl bg-white/10 p-6">
          <Quote className="h-6 w-6 text-accent mb-3" />
          <p className="text-white/90 italic">
            &quot;SafeNetQ helped me cover unexpected medical bills. The community review was fast
            and the funds arrived within 48 hours.&quot;
          </p>
          <p className="mt-4 text-sm text-white/60">-- Sarah K., Silver Member</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 items-center justify-center bg-surface px-4 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 lg:text-left">
            <div className="flex items-center gap-2 mb-6 justify-center lg:justify-start lg:hidden">
              <Shield className="h-8 w-8 text-primary" />
              <span className="font-heading text-2xl font-bold">SafeNetQ</span>
            </div>
            <h1 className="font-heading text-2xl font-bold">Create your account</h1>
            <p className="mt-2 text-sm text-secondary">Start your journey to financial safety</p>
          </div>

          <div className="rounded-xl border border-border bg-white p-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {error && (
                <div className="rounded-lg bg-error/10 p-3 text-sm text-error" role="alert">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  placeholder="John"
                  icon={<User className="h-4 w-4" />}
                  value={form.firstName}
                  onChange={update("firstName")}
                  required
                />
                <Input
                  label="Last Name"
                  placeholder="Doe"
                  icon={<User className="h-4 w-4" />}
                  value={form.lastName}
                  onChange={update("lastName")}
                  required
                />
              </div>

              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                icon={<Mail className="h-4 w-4" />}
                value={form.email}
                onChange={update("email")}
                required
              />

              <Input
                label="Phone (optional)"
                type="tel"
                placeholder="+1 (555) 000-0000"
                icon={<Phone className="h-4 w-4" />}
                value={form.phone}
                onChange={update("phone")}
              />

              <Input
                label="Password"
                type="password"
                placeholder="Min 8 characters"
                icon={<Lock className="h-4 w-4" />}
                value={form.password}
                onChange={update("password")}
                required
              />

              <Input
                label="Confirm Password"
                type="password"
                placeholder="Re-enter password"
                icon={<Lock className="h-4 w-4" />}
                value={form.confirmPassword}
                onChange={update("confirmPassword")}
                required
              />

              <Button type="submit" loading={loading} className="w-full">
                Create Account
              </Button>
            </form>
          </div>

          <p className="mt-6 text-center text-sm text-secondary">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
