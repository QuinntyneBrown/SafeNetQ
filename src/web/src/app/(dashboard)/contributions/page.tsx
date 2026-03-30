"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/Table";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Download, Filter } from "lucide-react";

interface ContributionRow {
  [key: string]: unknown;
  id: string;
  date: string;
  amount: number;
  method: string;
  status: string;
  receipt: string;
}

const mockData: ContributionRow[] = [
  { id: "1", date: "2026-03-01", amount: 50, method: "Visa *4242", status: "completed", receipt: "#" },
  { id: "2", date: "2026-02-01", amount: 50, method: "Visa *4242", status: "completed", receipt: "#" },
  { id: "3", date: "2026-01-01", amount: 50, method: "Visa *4242", status: "completed", receipt: "#" },
  { id: "4", date: "2025-12-01", amount: 50, method: "Visa *4242", status: "completed", receipt: "#" },
  { id: "5", date: "2025-11-01", amount: 50, method: "Visa *4242", status: "completed", receipt: "#" },
  { id: "6", date: "2025-10-01", amount: 50, method: "Visa *4242", status: "pending", receipt: "#" },
];

const columns = [
  { key: "date", header: "Date", render: (row: ContributionRow) => formatDate(row.date) },
  { key: "amount", header: "Amount", render: (row: ContributionRow) => formatCurrency(row.amount) },
  { key: "method", header: "Payment Method" },
  {
    key: "status",
    header: "Status",
    render: (row: ContributionRow) => <StatusBadge status={row.status} />,
  },
  {
    key: "receipt",
    header: "",
    render: () => (
      <button className="text-sm text-primary hover:underline">Receipt</button>
    ),
  },
];

export default function ContributionsPage() {
  const [page, setPage] = useState(1);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Contributions</h1>
          <p className="text-sm text-secondary mt-1">Your payment history and receipts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" icon={<Filter className="h-4 w-4" />}>
            Filter
          </Button>
          <Button variant="secondary" size="sm" icon={<Download className="h-4 w-4" />}>
            Export
          </Button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-white p-4">
          <p className="text-sm text-secondary">Total Contributed</p>
          <p className="font-heading text-xl font-bold mt-1">{formatCurrency(300)}</p>
        </div>
        <div className="rounded-lg border border-border bg-white p-4">
          <p className="text-sm text-secondary">Current Tier</p>
          <p className="font-heading text-xl font-bold mt-1">Silver - $50/mo</p>
        </div>
        <div className="rounded-lg border border-border bg-white p-4">
          <p className="text-sm text-secondary">Next Payment</p>
          <p className="font-heading text-xl font-bold mt-1">Apr 1, 2026</p>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-white p-4">
        <DataTable
          columns={columns}
          data={mockData}
          keyExtractor={(row) => row.id}
          page={page}
          totalPages={2}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
