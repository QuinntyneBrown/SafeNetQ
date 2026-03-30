import Link from "next/link";
import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-heading text-lg font-bold">SafeNetQ</span>
            </div>
            <p className="text-sm text-secondary">
              Community-powered financial safety net. Together, we protect each other.
            </p>
          </div>
          <div>
            <h4 className="font-heading text-sm font-semibold mb-3">Product</h4>
            <ul className="flex flex-col gap-2">
              <li><Link href="#how-it-works" className="text-sm text-secondary hover:text-foreground">How It Works</Link></li>
              <li><Link href="#tiers" className="text-sm text-secondary hover:text-foreground">Tiers</Link></li>
              <li><Link href="#trust" className="text-sm text-secondary hover:text-foreground">Trust & Safety</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-sm font-semibold mb-3">Support</h4>
            <ul className="flex flex-col gap-2">
              <li><Link href="/help" className="text-sm text-secondary hover:text-foreground">Help Center</Link></li>
              <li><Link href="/contact" className="text-sm text-secondary hover:text-foreground">Contact Us</Link></li>
              <li><Link href="/faq" className="text-sm text-secondary hover:text-foreground">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-sm font-semibold mb-3">Legal</h4>
            <ul className="flex flex-col gap-2">
              <li><Link href="/privacy" className="text-sm text-secondary hover:text-foreground">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-secondary hover:text-foreground">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-secondary">
          &copy; {new Date().getFullYear()} SafeNetQ. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
