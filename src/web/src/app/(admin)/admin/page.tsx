"use client";

import { DollarSign, Users, FileText, TrendingUp, ArrowUpRight } from "lucide-react";
import { StatCard, ContentCard } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatCurrency } from "@/lib/utils";

const recentPayouts = [
  { id: "PAY-001", recipient: "Member #1842", amount: 8500, status: "completed", date: "Mar 27, 2026" },
  { id: "PAY-002", recipient: "Member #0923", amount: 3200, status: "processing", date: "Mar 26, 2026" },
  { id: "PAY-003", recipient: "Member #1547", amount: 12000, status: "completed", date: "Mar 25, 2026" },
  { id: "PAY-004", recipient: "Member #0412", amount: 5000, status: "pending", date: "Mar 25, 2026" },
];

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Fund Dashboard</h1>
        <p className="text-sm text-secondary mt-1">Overview of community fund health and activity</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<DollarSign className="h-5 w-5" />}
          value={formatCurrency(847500)}
          label="Total Fund Balance"
          trend={{ value: "5.3%", positive: true }}
        />
        <StatCard
          icon={<TrendingUp className="h-5 w-5" />}
          value={formatCurrency(127500)}
          label="Monthly Inflow"
          trend={{ value: "2.1%", positive: true }}
        />
        <StatCard
          icon={<Users className="h-5 w-5" />}
          value="2,547"
          label="Active Members"
          trend={{ value: "12", positive: true }}
        />
        <StatCard
          icon={<FileText className="h-5 w-5" />}
          value="8"
          label="Pending Requests"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Chart placeholder */}
        <ContentCard title="Fund Balance Trend">
          <div className="flex h-64 items-center justify-center rounded-lg bg-surface text-sm text-secondary">
            Chart visualization will be rendered here
          </div>
        </ContentCard>

        {/* Reserve ratio */}
        <ContentCard title="Fund Health Indicators">
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-secondary">Reserve Ratio</span>
                <span className="font-medium">78%</span>
              </div>
              <div className="h-2 rounded-full bg-border">
                <div className="h-2 rounded-full bg-success" style={{ width: "78%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-secondary">Monthly Outflow</span>
                <span className="font-medium">{formatCurrency(98200)}</span>
              </div>
              <div className="h-2 rounded-full bg-border">
                <div className="h-2 rounded-full bg-warning" style={{ width: "62%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-secondary">Claims Approval Rate</span>
                <span className="font-medium">92%</span>
              </div>
              <div className="h-2 rounded-full bg-border">
                <div className="h-2 rounded-full bg-primary" style={{ width: "92%" }} />
              </div>
            </div>
          </div>
        </ContentCard>
      </div>

      {/* Recent Payouts */}
      <ContentCard
        title="Recent Payouts"
        action={
          <button className="flex items-center gap-1 text-sm text-primary hover:underline">
            View All <ArrowUpRight className="h-3 w-3" />
          </button>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left font-medium text-secondary">ID</th>
                <th className="px-4 py-3 text-left font-medium text-secondary">Recipient</th>
                <th className="px-4 py-3 text-left font-medium text-secondary">Amount</th>
                <th className="px-4 py-3 text-left font-medium text-secondary">Status</th>
                <th className="px-4 py-3 text-left font-medium text-secondary">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentPayouts.map((payout) => (
                <tr key={payout.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-medium">{payout.id}</td>
                  <td className="px-4 py-3 text-secondary">{payout.recipient}</td>
                  <td className="px-4 py-3 font-medium">{formatCurrency(payout.amount)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={payout.status} />
                  </td>
                  <td className="px-4 py-3 text-secondary">{payout.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ContentCard>
    </div>
  );
}
