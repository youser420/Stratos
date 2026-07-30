import { Container } from "@/components/common/container";
import { cn } from "@/utils/cn";

type SectionProps = React.ComponentProps<"section"> & {
  variant?: "default" | "muted" | "warm" | "dark";
  containerSize?: "default" | "narrow";
  containerClassName?: string;
  bleed?: boolean;
};

const variantClasses: Record<NonNullable<SectionProps["variant"]>, string> = {
  default: "",
  muted: "bg-muted",
  warm: "bg-[oklch(0.965_0.012_55)]",
  dark: "gym-grid-pattern gym-radial-glow relative overflow-hidden",
};

export function Section({
  className,
  variant = "default",
  containerSize = "default",
  containerClassName,
  bleed = false,
  children,
  ...props
}: SectionProps) {
  const isDark = variant === "dark";

  return (
    <section
      data-section-theme={isDark ? "dark" : variant === "warm" ? "warm" : undefined}
      className={cn(
        "py-16 md:py-24",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {bleed ? (
        children
      ) : (
        <Container size={containerSize} className={containerClassName}>
          {children}
        </Container>
      )}
    </section>
  );
}
