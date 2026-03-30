"use client";

import { Heart, GraduationCap, AlertTriangle, Home, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";

const categoryIcons: Record<string, React.ReactNode> = {
  medical: <Heart className="h-5 w-5 text-error" />,
  education: <GraduationCap className="h-5 w-5 text-info" />,
  emergency: <AlertTriangle className="h-5 w-5 text-warning" />,
  housing: <Home className="h-5 w-5 text-primary" />,
  other: <HelpCircle className="h-5 w-5 text-secondary" />,
};

const feedEntries = [
  { id: "1", category: "medical", title: "Emergency surgery assistance", description: "A member received support for an unexpected surgical procedure.", amount: 8500, region: "Northeast", date: "2 hours ago" },
  { id: "2", category: "education", title: "Tuition support for single parent", description: "Community funds helped cover semester tuition for a member returning to school.", amount: 3200, region: "Midwest", date: "5 hours ago" },
  { id: "3", category: "housing", title: "Fire damage recovery", description: "Funds disbursed to help a member recover from house fire damage.", amount: 12000, region: "Southeast", date: "1 day ago" },
  { id: "4", category: "emergency", title: "Flood evacuation support", description: "Emergency funds provided for temporary housing after flooding.", amount: 5000, region: "South", date: "2 days ago" },
  { id: "5", category: "medical", title: "Ongoing treatment support", description: "Monthly assistance for a member undergoing long-term medical treatment.", amount: 2800, region: "West", date: "3 days ago" },
  { id: "6", category: "other", title: "Legal aid assistance", description: "Support provided for unexpected legal expenses.", amount: 4200, region: "Northeast", date: "4 days ago" },
];

export default function CommunityFeedPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Community Feed</h1>
        <p className="text-sm text-secondary mt-1">
          See how the community is helping members. All entries are anonymized.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {feedEntries.map((entry) => (
          <Card key={entry.id} className="flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface flex-shrink-0">
              {categoryIcons[entry.category]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                <h3 className="text-sm font-semibold">{entry.title}</h3>
                <Badge variant="active" dot={false}>
                  {formatCurrency(entry.amount)}
                </Badge>
              </div>
              <p className="text-sm text-secondary">{entry.description}</p>
              <div className="flex items-center gap-3 mt-2 text-xs text-secondary">
                <span className="capitalize">{entry.category}</span>
                <span>{entry.region}</span>
                <span>{entry.date}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
