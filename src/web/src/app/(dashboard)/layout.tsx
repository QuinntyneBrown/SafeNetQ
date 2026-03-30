"use client";

import { MemberSidebar } from "@/components/layout/MemberSidebar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { Menu } from "lucide-react";
import { useUiStore } from "@/stores/uiStore";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { toggleSidebar } = useUiStore();

  return (
    <div className="flex min-h-screen bg-surface">
      <MemberSidebar />
      <div className="flex flex-1 flex-col min-w-0">
        {/* Mobile header */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-white px-4 lg:hidden">
          <button
            onClick={toggleSidebar}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-secondary hover:bg-surface"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="font-heading text-lg font-bold">SafeNetQ</span>
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8 pb-20 lg:pb-8">{children}</main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
