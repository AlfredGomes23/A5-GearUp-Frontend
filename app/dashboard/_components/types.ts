export const statusVariant = (status: string) => {
  switch (status) {
    case "PLACED":
      return "secondary";
    case "CONFIRMED":
      return "outline";
    case "PAID":
      return "default";
    case "PICKED_UP":
      return "default";
    case "RETURNED":
      return "secondary";
    case "CANCELLED":
      return "destructive";
    case "PENDING":
      return "outline";
    case "COMPLETED":
      return "default";
    case "FAILED":
      return "destructive";
    default:
      return "outline";
  }
};

export type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export type PayPageParams = Promise<{ orderId: string }>;