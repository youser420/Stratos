"use client";

import Link from "next/link";
import { useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  authenticatedUtilityNavLinks,
  guestUtilityNavLinks,
} from "@/config/navigation";
import { signOutUser } from "@/features/auth/sign-out";
import { cn } from "@/utils/cn";

type HeaderUtilityNavProps = {
  isAuthenticated: boolean;
  className?: string;
  linkClassName?: string;
  onNavigate?: () => void;
  orientation?: "horizontal" | "vertical";
};

export function HeaderUtilityNav({
  isAuthenticated,
  className,
  linkClassName,
  onNavigate,
  orientation = "horizontal",
}: HeaderUtilityNavProps) {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const links = isAuthenticated ? authenticatedUtilityNavLinks : guestUtilityNavLinks;

  async function handleSignOut() {
    if (isSigningOut) {
      return;
    }

    setIsSigningOut(true);

    try {
      await signOutUser();
    } catch {
      setIsSigningOut(false);
    }
  }

  return (
    <nav
      aria-label="Utility"
      className={cn(
        orientation === "horizontal"
          ? "flex items-center gap-1"
          : "flex flex-col gap-2",
        className,
      )}
    >
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onNavigate}
          className={cn(
            buttonVariants({
              variant: link.label === "Sign Up" ? "default" : "ghost",
              size: orientation === "horizontal" ? "sm" : "default",
            }),
            orientation === "vertical" && "justify-center",
            linkClassName,
          )}
        >
          {link.label}
        </Link>
      ))}
      {isAuthenticated ? (
        <Button
          type="button"
          variant="ghost"
          size={orientation === "horizontal" ? "sm" : "default"}
          className={cn(orientation === "vertical" && "justify-center")}
          disabled={isSigningOut}
          onClick={() => {
            onNavigate?.();
            void handleSignOut();
          }}
        >
          {isSigningOut ? "Signing out..." : "Log out"}
        </Button>
      ) : null}
    </nav>
  );
}
