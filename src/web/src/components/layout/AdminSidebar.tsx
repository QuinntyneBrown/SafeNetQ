"use client";

import {
  LayoutDashboard,
  Users,
  FileText,
  Shield,
  Settings,
  LogOut,
} from "lucide-react";
import { Sidebar } from "@/components/ui/Sidebar";
import { NavItem } from "@/components/ui/NavItem";
import { useAuthStore } from "@/stores/authStore";

export function AdminSidebar() {
  const user = useAuthStore((s) => s.user);

  return (
    <Sidebar
      userSection={
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/20 text-accent-dark text-sm font-semibold">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {user?.firstName || "Admin"}
            </p>
            <p className="text-xs text-secondary truncate">Administrator</p>
          </div>
          <button className="text-secondary hover:text-error" aria-label="Sign out">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      }
    >
      <NavItem href="/admin" icon={<LayoutDashboard className="h-5 w-5" />} label="Fund Dashboard" />
      <NavItem href="/admin/members" icon={<Users className="h-5 w-5" />} label="Members" />
      <NavItem href="/admin/requests" icon={<FileText className="h-5 w-5" />} label="Requests" />
      <NavItem href="/admin/audit" icon={<Shield className="h-5 w-5" />} label="Audit Trail" />
      <NavItem href="/admin/settings" icon={<Settings className="h-5 w-5" />} label="Settings" />
    </Sidebar>
  );
}
