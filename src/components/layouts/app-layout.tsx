import { CoachPaneDesktop, CoachPaneTablet } from "@/features/coach";
import { AppHeader } from "@/features/landing";
import { CoachProvider } from "@/components/providers/coach-ui-provider";

type AppLayoutProps = {
  children: React.ReactNode;
  greeting: string;
};

/**
 * Shell for the authenticated STRATOS Sphere experience (Landing Page and
 * all six nodes). Section 11 (Coach Responsive Behavior): a persistent pane
 * on desktop, a collapsible one on tablet, and nothing here at all on
 * mobile — mobile reaches Coach through its own full-screen route instead.
 */
export function AppLayout({ children, greeting }: AppLayoutProps) {
  return (
    <CoachProvider>
      <div className="flex min-h-full flex-1 flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-none focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        >
          Skip to content
        </a>
        <AppHeader greeting={greeting} />
        <div className="flex flex-1">
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <CoachPaneDesktop />
        </div>
        <CoachPaneTablet />
      </div>
    </CoachProvider>
  );
}
