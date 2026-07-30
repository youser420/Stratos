import { format, parseISO } from "date-fns";

export function formatBlogDate(isoDate: string): string {
  return format(parseISO(isoDate), "MMMM d, yyyy");
}
