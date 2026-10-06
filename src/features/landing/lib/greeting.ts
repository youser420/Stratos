/**
 * Section 1: "Displays current greeting/date context where applicable."
 * A simple, honest time-of-day greeting — no per-user timezone is stored
 * yet, so this uses server time rather than guessing the Individual's.
 */
export function getGreeting(name: string | null): string {
  const hour = new Date().getUTCHours();
  const timeOfDay = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return name ? `${timeOfDay}, ${name}` : timeOfDay;
}
