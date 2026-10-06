"use client";

import { useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";

const THEME_STORAGE_KEY = "stratos-theme";
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

/**
 * The root layout's inline boot script already sets the real .dark class
 * before paint (no flash on a fresh load), but useSyncExternalStore still
 * needs a consistent value for the server-rendered markup itself, since
 * the server has no DOM to read. React reconciles this against the real
 * client snapshot right after hydration on its own — no manual effect
 * needed, which is what keeps this hook off the "setState in an effect"
 * lint rule other approaches here would hit.
 */
function getServerSnapshot() {
  return false;
}

function setTheme(isDark: boolean) {
  document.documentElement.classList.toggle("dark", isDark);

  try {
    localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
  } catch {
    // Private mode / blocked storage: theme still applies for this view,
    // it just won't persist across visits.
  }

  for (const listener of listeners) {
    listener();
  }
}

/**
 * App-wide manual dark mode toggle. The design tokens for dark mode already
 * exist in globals.css (the .dark class), but nothing activated them until
 * now.
 */
export function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(!isDark)}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}
