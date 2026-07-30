"use client";

import { useEffect } from "react";

import { initAnalyticsIfConsented } from "@/features/legal/lib/analytics";

export function AnalyticsInit() {
  useEffect(() => {
    initAnalyticsIfConsented();
  }, []);

  return null;
}
