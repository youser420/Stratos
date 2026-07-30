import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "font-heading text-4xl font-semibold uppercase tracking-tight text-foreground md:text-5xl md:leading-[1.05]",
      h2: "font-heading text-2xl font-semibold uppercase tracking-tight text-foreground md:text-3xl",
      h3: "font-heading text-xl font-medium uppercase tracking-wide text-foreground",
      h4: "font-heading text-lg font-medium tracking-wide text-foreground",
      body: "text-base leading-relaxed text-foreground",
      lead: "text-lg leading-relaxed text-muted-foreground",
      muted: "text-sm text-muted-foreground",
      label: "text-xs font-semibold uppercase tracking-widest text-foreground",
      eyebrow: "text-xs font-semibold uppercase tracking-[0.2em] text-primary",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

const defaultElements = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  body: "p",
  lead: "p",
  muted: "p",
  label: "span",
  eyebrow: "p",
} as const;

type TypographyProps = React.ComponentProps<"p"> &
  VariantProps<typeof typographyVariants> & {
    as?: React.ElementType;
  };

export function Typography({
  variant = "body",
  as,
  className,
  ...props
}: TypographyProps) {
  const resolvedVariant = variant ?? "body";
  const Component = as ?? defaultElements[resolvedVariant];

  return (
    <Component
      className={cn(typographyVariants({ variant: resolvedVariant }), className)}
      {...props}
    />
  );
}

export { typographyVariants };
