import { Typography } from "@/components/common/typography";
import { cn } from "@/utils/cn";

type EmptyStateProps = {
  title: string;
  description: string;
  className?: string;
  action?: React.ReactNode;
};

/**
 * Section 14 (Empty and Insufficient-Data States): every "not enough
 * evidence yet" moment in the Sphere uses this same neutral, non-judgmental
 * presentation instead of inventing a recommendation or implying failure.
 */
export function EmptyState({ title, description, className, action }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-3 border border-dashed border-border bg-muted/40 p-6",
        className,
      )}
    >
      <Typography variant="h4">{title}</Typography>
      <Typography variant="muted">{description}</Typography>
      {action}
    </div>
  );
}
