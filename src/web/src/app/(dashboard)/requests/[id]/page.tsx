"use client";

import { useParams } from "next/navigation";
import { CheckCircle2, Clock, FileText, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

const mockRequest = {
  id: "REQ-2026-0042",
  title: "Emergency dental surgery",
  category: "medical",
  status: "under_review",
  amountRequested: 4500,
  description:
    "Unexpected dental emergency requiring immediate surgery. Insurance covers only partial costs.",
  documents: [
    { name: "dental_estimate.pdf", size: "240 KB" },
    { name: "insurance_statement.pdf", size: "180 KB" },
  ],
  timeline: [
    { action: "Submitted", description: "Request submitted for review", timestamp: "Mar 25, 2026 at 10:30 AM", icon: "submit" },
    { action: "Documents Verified", description: "All supporting documents verified", timestamp: "Mar 26, 2026 at 2:15 PM", icon: "verify" },
    { action: "Community Review", description: "Under community voting (12/25 votes)", timestamp: "Mar 27, 2026 at 9:00 AM", icon: "review" },
  ],
};

const iconMap: Record<string, React.ReactNode> = {
  submit: <FileText className="h-4 w-4" />,
  verify: <CheckCircle2 className="h-4 w-4" />,
  review: <Clock className="h-4 w-4" />,
  approve: <CheckCircle2 className="h-4 w-4" />,
  reject: <AlertCircle className="h-4 w-4" />,
};

export default function RequestDetailPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="font-heading text-2xl font-bold">Request {id || mockRequest.id}</h1>
            <StatusBadge status={mockRequest.status} />
          </div>
          <p className="text-sm text-secondary">{mockRequest.title}</p>
        </div>
        <Button variant="secondary" size="sm">
          Appeal Decision
        </Button>
      </div>

      {/* Details */}
      <Card>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-4">
          <div>
            <p className="text-xs text-secondary">Category</p>
            <p className="text-sm font-medium capitalize mt-0.5">{mockRequest.category}</p>
          </div>
          <div>
            <p className="text-xs text-secondary">Amount Requested</p>
            <p className="text-sm font-medium mt-0.5">
              {formatCurrency(mockRequest.amountRequested)}
            </p>
          </div>
          <div>
            <p className="text-xs text-secondary">Status</p>
            <div className="mt-0.5">
              <StatusBadge status={mockRequest.status} />
            </div>
          </div>
        </div>
        <div>
          <p className="text-xs text-secondary mb-1">Description</p>
          <p className="text-sm">{mockRequest.description}</p>
        </div>
      </Card>

      {/* Documents */}
      <Card>
        <h3 className="font-heading text-base font-semibold mb-3">Documents</h3>
        <div className="flex flex-col gap-2">
          {mockRequest.documents.map((doc) => (
            <div
              key={doc.name}
              className="flex items-center justify-between rounded-lg bg-surface p-3"
            >
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-secondary" />
                <span className="text-sm font-medium">{doc.name}</span>
              </div>
              <Badge variant="default" dot={false}>{doc.size}</Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Timeline */}
      <Card>
        <h3 className="font-heading text-base font-semibold mb-4">Timeline</h3>
        <div className="relative pl-8">
          <div className="absolute left-3 top-2 bottom-2 w-px bg-border" />
          {mockRequest.timeline.map((event, i) => (
            <div key={i} className="relative pb-6 last:pb-0">
              <div
                className={cn(
                  "absolute -left-5 flex h-6 w-6 items-center justify-center rounded-full",
                  i === mockRequest.timeline.length - 1
                    ? "bg-primary text-white"
                    : "bg-success/10 text-success"
                )}
              >
                {iconMap[event.icon] || <Clock className="h-3 w-3" />}
              </div>
              <div>
                <p className="text-sm font-medium">{event.action}</p>
                <p className="text-xs text-secondary">{event.description}</p>
                <p className="text-xs text-secondary mt-0.5">{event.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
