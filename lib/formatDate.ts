import { format } from "date-fns";

export const formatDate = (dateStr: string | null | undefined) => {
  if (!dateStr) return "—";
  const [y, m, d] = dateStr.slice(0, 10).split("-").map(Number);
  if (!y || !m || !d) return "—";
  return format(new Date(y, m - 1, d), "MMM d, yyyy");
};