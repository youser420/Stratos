import { cn } from "@/utils/cn";

type ContainerProps = React.ComponentProps<"div"> & {
  size?: "default" | "narrow";
};

export function Container({
  className,
  size = "default",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        size === "default" && "max-w-6xl",
        size === "narrow" && "max-w-3xl",
        className,
      )}
      {...props}
    />
  );
}
