"use client";

import { Wallet, TrendingUp, Users, FileText, Heart, GraduationCap, AlertTriangle, Home } from "lucide-react";
import { StatCard, ContentCard } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatCurrency } from "@/lib/utils";

const recentContributions = [
  { id: "1", date: "Mar 1, 2026", amount: 50, status: "completed" },
  { id: "2", date: "Feb 1, 2026", amount: 50, status: "completed" },
  { id: "3", date: "Jan 1, 2026", amount: 50, status: "completed" },
];

const feedItems = [
  { id: "1", category: "medical", title: "Emergency surgery assistance", amount: 8500, date: "2 hours ago" },
  { id: "2", category: "education", title: "Tuition support for single parent", amount: 3200, date: "5 hours ago" },
  { id: "3", category: "housing", title: "Fire damage recovery fund", amount: 12000, date: "1 day ago" },
];

const categoryIcons: Record<string, React.ReactNode> = {
  medical: <Heart className="h-4 w-4 text-error" />,
  education: <GraduationCap className="h-4 w-4 text-info" />,
  emergency: <AlertTriangle className="h-4 w-4 text-warning" />,
  housing: <Home className="h-4 w-4 text-primary" />,
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-secondary mt-1">Welcome back! Here is your overview.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<Wallet className="h-5 w-5" />}
          value={formatCurrency(600)}
          label="Total Contributed"
          trend={{ value: "8.2%", positive: true }}
        />
        <StatCard
          icon={<TrendingUp className="h-5 w-5" />}
          value="Silver"
          label="Current Tier"
        />
        <StatCard
          icon={<Users className="h-5 w-5" />}
          value="2,547"
          label="Community Members"
          trend={{ value: "12", positive: true }}
        />
        <StatCard
          icon={<FileText className="h-5 w-5" />}
          value="0"
          label="Active Requests"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Contributions */}
        <ContentCard
          title="Recent Contributions"
          action={
            <a href="/contributions" className="text-sm text-primary hover:underline">
              View All
            </a>
          }
        >
          <div className="flex flex-col divide-y divide-border">
            {recentContributions.map((c) => (
              <div key={c.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium">{c.date}</p>
                  <p className="text-xs text-secondary">Monthly contribution</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold">{formatCurrency(c.amount)}</span>
                  <StatusBadge status={c.status} />
                </div>
              </div>
            ))}
          </div>
        </ContentCard>

        {/* Community Feed */}
        <ContentCard
          title="Community Feed"
          action={
            <a href="/community-feed" className="text-sm text-primary hover:underline">
              View All
            </a>
          }
        >
          <div className="flex flex-col divide-y divide-border">
            {feedItems.map((item) => (
              <div key={item.id} className="flex items-start gap-3 py-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface flex-shrink-0">
                  {categoryIcons[item.category]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge variant="active" dot={false}>
                      {formatCurrency(item.amount)}
                    </Badge>
                    <span className="text-xs text-secondary">{item.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ContentCard>
      </div>
    </div>
  );
}
