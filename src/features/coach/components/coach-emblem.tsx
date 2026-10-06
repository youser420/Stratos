import { cn } from "@/utils/cn";

type CoachEmblemProps = {
  /**
   * "living" = idle, visibly present with restrained motion (pre-conversation).
   * "dimmed" = conversation is active; the emblem recedes into the
   * background but keeps the same size — section 11: "Coach changes
   * presence, not size."
   */
  presence: "living" | "dimmed";
  className?: string;
};

export function CoachEmblem({ presence, className }: CoachEmblemProps) {
  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      role="img"
      aria-label="Coach"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- approved brand SVG asset, not a next/image candidate */}
      <img
        src="/sphere/coach-icon.svg"
        alt=""
        aria-hidden
        className={cn(
          "h-full w-full object-contain transition-opacity duration-500",
          presence === "living" && "motion-safe:coach-living-glow opacity-100",
          presence === "dimmed" && "opacity-25",
        )}
      />
    </div>
  );
}
