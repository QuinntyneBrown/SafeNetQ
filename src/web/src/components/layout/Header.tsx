"use client";

import Link from "next/link";
import { Shield, Menu } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useUiStore } from "@/stores/uiStore";

export function Header() {
  const { toggleSidebar } = useUiStore();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-white px-4 md:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-secondary hover:bg-surface lg:hidden"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Link href="/" className="flex items-center gap-2">
          <Shield className="h-7 w-7 text-primary" />
          <span className="font-heading text-lg font-bold text-foreground">SafeNetQ</span>
        </Link>
      </div>
      <nav className="hidden md:flex items-center gap-6">
        <Link href="#how-it-works" className="text-sm text-secondary hover:text-foreground">
          How It Works
        </Link>
        <Link href="#trust" className="text-sm text-secondary hover:text-foreground">
          Trust & Safety
        </Link>
        <Link href="#tiers" className="text-sm text-secondary hover:text-foreground">
          Tiers
        </Link>
      </nav>
      <div className="flex items-center gap-3">
        <Link href="/login">
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
        </Link>
        <Link href="/register">
          <Button size="sm">Get Started</Button>
        </Link>
      </div>
    </header>
  );
}
