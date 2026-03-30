import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        active: "bg-success/10 text-success",
        pending: "bg-warning/10 text-warning",
        suspended: "bg-error/10 text-error",
        verified: "bg-info/10 text-info",
        default: "bg-secondary/10 text-secondary",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

export function Badge({ className, variant, dot = true, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && (
        <span
          className={cn("h-1.5 w-1.5 rounded-full", {
            "bg-success": variant === "active",
            "bg-warning": variant === "pending",
            "bg-error": variant === "suspended",
            "bg-info": variant === "verified",
            "bg-secondary": !variant || variant === "default",
          })}
        />
      )}
      {children}
    </span>
  );
}
