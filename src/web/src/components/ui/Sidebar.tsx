"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useUiStore } from "@/stores/uiStore";
import { Shield } from "lucide-react";

interface SidebarProps {
  children: ReactNode;
  userSection?: ReactNode;
  className?: string;
}

export function Sidebar({ children, userSection, className }: SidebarProps) {
  const { sidebarOpen, setSidebarOpen } = useUiStore();

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-dark/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 flex h-full w-64 flex-col border-r border-border bg-white transition-transform lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Shield className="h-7 w-7 text-primary" />
            <span className="font-heading text-lg font-bold text-foreground">SafeNetQ</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-secondary hover:bg-surface lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="flex flex-col gap-1">{children}</div>
        </nav>

        {/* User section */}
        {userSection && (
          <div className="border-t border-border p-4">{userSection}</div>
        )}
      </aside>
    </>
  );
}
