"use client";

import { useState } from "react";
import { ListIcon } from "@phosphor-icons/react";

import { HeaderUtilityNav } from "@/components/common/header-utility-nav";
import { Navigation } from "@/components/common/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { primaryNavLinks } from "@/config/navigation";

type MobileNavProps = {
  isAuthenticated: boolean;
  className?: string;
};

export function MobileNav({ isAuthenticated, className }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className={className}
            aria-label="Open menu"
          />
        }
      >
        <ListIcon />
      </SheetTrigger>
      <SheetContent side="right" className="flex w-full flex-col gap-8 sm:max-w-xs">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <Navigation
          links={primaryNavLinks}
          orientation="vertical"
          onNavigate={() => setOpen(false)}
        />
        <HeaderUtilityNav
          isAuthenticated={isAuthenticated}
          orientation="vertical"
          className="mt-auto border-t border-border pt-6"
          onNavigate={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
}
