"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { NavLink } from "@/config/navigation";
import { cn } from "@/utils/cn";

type NavigationProps = {
  links: NavLink[];
  className?: string;
  listClassName?: string;
  linkClassName?: string;
  orientation?: "horizontal" | "vertical";
  onNavigate?: () => void;
};

export function Navigation({
  links,
  className,
  listClassName,
  linkClassName,
  orientation = "horizontal",
  onNavigate,
}: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav className={className} aria-label="Primary">
      <ul
        className={cn(
          orientation === "horizontal"
            ? "flex items-center gap-1"
            : "flex flex-col gap-1",
          listClassName,
        )}
      >
        {links.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onNavigate}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative px-3 py-2 text-xs font-medium uppercase tracking-wide transition-colors hover:text-foreground",
                  isActive ? "text-primary" : "text-muted-foreground",
                  isActive &&
                    "after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-primary",
                  linkClassName,
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
