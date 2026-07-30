import { cn } from "@/utils/cn";

type GridCols = 1 | 2 | 3 | 4;

type GridProps = React.ComponentProps<"div"> & {
  cols?: GridCols;
};

const colsClassNames: Record<GridCols, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

export function Grid({ className, cols = 3, ...props }: GridProps) {
  return (
    <div
      className={cn("grid gap-8 md:gap-12", colsClassNames[cols], className)}
      {...props}
    />
  );
}
