import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  children: ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-white p-6", className)}>
      {children}
    </div>
  );
}

interface StatCardProps {
  icon: ReactNode;
  value: string | number;
  label: string;
  trend?: { value: string; positive: boolean };
  className?: string;
}

export function StatCard({ icon, value, label, trend, className }: StatCardProps) {
  return (
    <Card className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </span>
        {trend && (
          <span
            className={cn(
              "text-xs font-medium",
              trend.positive ? "text-success" : "text-error"
            )}
          >
            {trend.positive ? "+" : ""}
            {trend.value}
          </span>
        )}
      </div>
      <div>
        <p className="text-2xl font-semibold font-heading text-foreground">{value}</p>
        <p className="text-sm text-secondary">{label}</p>
      </div>
    </Card>
  );
}

interface ContentCardProps {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function ContentCard({ title, action, children, className }: ContentCardProps) {
  return (
    <Card className={cn("flex flex-col gap-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-lg font-semibold">{title}</h3>
        {action}
      </div>
      {children}
    </Card>
  );
}
