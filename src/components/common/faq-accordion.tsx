"use client";

import { Collapsible } from "@base-ui/react/collapsible";
import { CaretDownIcon } from "@phosphor-icons/react";

import { cn } from "@/utils/cn";

export type FAQItem = {
  question: string;
  answer: string;
};

type FAQAccordionProps = {
  items: readonly FAQItem[];
  className?: string;
};

export function FAQAccordion({ items, className }: FAQAccordionProps) {
  return (
    <div className={cn("divide-y divide-border border border-border", className)}>
      {items.map((item) => (
        <Collapsible.Root key={item.question}>
          <Collapsible.Trigger
            className="group flex w-full items-center justify-between gap-4 px-4 py-4 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <span>{item.question}</span>
            <CaretDownIcon
              className="size-4 shrink-0 text-muted-foreground transition-transform group-data-[panel-open]:rotate-180"
              aria-hidden
            />
          </Collapsible.Trigger>
          <Collapsible.Panel className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground">
            {item.answer}
          </Collapsible.Panel>
        </Collapsible.Root>
      ))}
    </div>
  );
}
