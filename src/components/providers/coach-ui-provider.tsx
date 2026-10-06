"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

import type { CoachSourceId } from "@/config/coach";

type CoachOpenRequest = {
  source: CoachSourceId;
  sourceDetail?: string;
};

type CoachUIState = {
  /**
   * Persists across client-side navigation within the (app) layout — Next.js
   * keeps a shared layout mounted across its child routes, so this state
   * (and therefore the open conversation) survives moving between Sphere
   * nodes. Section 12: "Coach conversation state should be preserved."
   */
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  lastOpenRequest: CoachOpenRequest;
  /** Desktop: expand the persistent pane into an inline chat. */
  isDesktopExpanded: boolean;
  /** Tablet: the collapsible pane's open/closed state. */
  isTabletPaneOpen: boolean;
  /** Section 11: carry legitimate source context when Coach is opened from elsewhere. */
  openCoach: (request: CoachOpenRequest) => void;
  collapseDesktop: () => void;
  setTabletPaneOpen: (open: boolean) => void;
};

const CoachUIContext = createContext<CoachUIState | null>(null);

/**
 * Lives outside `src/features/` deliberately: the Coach UI state (pane
 * open/closed, active conversation id, last-open source) is read by other
 * feature modules — e.g. the Landing header's Coach entry point — and the
 * "no cross-feature imports" rule means a feature can't reach into another
 * feature's components for this. Shared state like this belongs in
 * `src/components/`, mirroring how shared data-aggregation logic belongs in
 * `src/server/services/` rather than inside any one feature.
 */
export function CoachProvider({ children }: { children: React.ReactNode }) {
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [lastOpenRequest, setLastOpenRequest] = useState<CoachOpenRequest>({ source: "LANDING" });
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(false);
  const [isTabletPaneOpen, setIsTabletPaneOpen] = useState(false);

  const openCoach = useCallback((request: CoachOpenRequest) => {
    setLastOpenRequest(request);
    setIsDesktopExpanded(true);
    setIsTabletPaneOpen(true);
  }, []);

  const collapseDesktop = useCallback(() => setIsDesktopExpanded(false), []);

  const value = useMemo<CoachUIState>(
    () => ({
      activeConversationId,
      setActiveConversationId,
      lastOpenRequest,
      isDesktopExpanded,
      isTabletPaneOpen,
      openCoach,
      collapseDesktop,
      setTabletPaneOpen: setIsTabletPaneOpen,
    }),
    [activeConversationId, lastOpenRequest, isDesktopExpanded, isTabletPaneOpen, openCoach, collapseDesktop],
  );

  return <CoachUIContext.Provider value={value}>{children}</CoachUIContext.Provider>;
}

export function useCoachUI(): CoachUIState {
  const context = useContext(CoachUIContext);

  if (!context) {
    throw new Error("useCoachUI must be used within a CoachProvider");
  }

  return context;
}
