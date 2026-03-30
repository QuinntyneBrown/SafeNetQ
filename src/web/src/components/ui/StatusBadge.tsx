import { Badge } from "./Badge";

const statusMap: Record<string, { variant: "active" | "pending" | "suspended" | "verified" | "default"; label: string }> = {
  draft: { variant: "default", label: "Draft" },
  submitted: { variant: "pending", label: "Submitted" },
  under_review: { variant: "verified", label: "Under Review" },
  approved: { variant: "active", label: "Approved" },
  disbursed: { variant: "active", label: "Disbursed" },
  rejected: { variant: "suspended", label: "Rejected" },
  appealed: { variant: "pending", label: "Appealed" },
  completed: { variant: "active", label: "Completed" },
  pending: { variant: "pending", label: "Pending" },
  failed: { variant: "suspended", label: "Failed" },
  active: { variant: "active", label: "Active" },
  suspended: { variant: "suspended", label: "Suspended" },
  processing: { variant: "verified", label: "Processing" },
};

export function StatusBadge({ status }: { status: string }) {
  const info = statusMap[status] || { variant: "default" as const, label: status };
  return <Badge variant={info.variant}>{info.label}</Badge>;
}
