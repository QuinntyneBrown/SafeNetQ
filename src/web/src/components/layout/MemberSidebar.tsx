"use client";

import {
  LayoutDashboard,
  Wallet,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  HandCoins,
} from "lucide-react";
import { Sidebar } from "@/components/ui/Sidebar";
import { NavItem } from "@/components/ui/NavItem";
import { useAuthStore } from "@/stores/authStore";

export function MemberSidebar() {
  const user = useAuthStore((s) => s.user);

  return (
    <Sidebar
      userSection={
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
            {user?.firstName?.[0]}
            {user?.lastName?.[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-secondary truncate">{user?.email}</p>
          </div>
          <button className="text-secondary hover:text-error" aria-label="Sign out">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      }
    >
      <NavItem href="/dashboard" icon={<LayoutDashboard className="h-5 w-5" />} label="Dashboard" />
      <NavItem href="/contributions" icon={<Wallet className="h-5 w-5" />} label="Contributions" />
      <NavItem href="/request-assistance" icon={<HandCoins className="h-5 w-5" />} label="Request Assistance" />
      <NavItem href="/requests" icon={<FileText className="h-5 w-5" />} label="My Requests" />
      <NavItem href="/community-feed" icon={<MessageSquare className="h-5 w-5" />} label="Community Feed" />
      <NavItem href="/settings" icon={<Settings className="h-5 w-5" />} label="Settings" />
    </Sidebar>
  );
}
