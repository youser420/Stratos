import type { ReactNode } from "react";

import { AnalyticsInit } from "@/features/legal/components/analytics-init";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <>
      {children}
      <AnalyticsInit />
    </>
  );
}
