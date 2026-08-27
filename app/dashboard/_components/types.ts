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

export const roleVariant = (role: string) => {
  switch (role) {
    case "ADMIN":
      return "default";
    case "PROVIDER":
      return "outline";
    case "CUSTOMER":
      return "secondary";
    default:
      return "outline";
  }
};

export const statusVariantForUser = (status: string) => {
  switch (status) {
    case "ACTIVE":
      return "default";
    case "SUSPENDED":
      return "destructive";
    default:
      return "outline";
  }
};

export type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export type PayPageParams = Promise<{ orderId: string }>;