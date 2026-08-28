export const statusVariant = (status: string) => {
  switch (status) {
    case "PLACED":
      return "bg-amber-100 text-amber-800 border-amber-300";
    case "CONFIRMED":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "PAID":
      return "bg-purple-100 text-purple-800 border-purple-300";
    case "PICKED_UP":
      return "bg-green-100 text-green-800 border-green-300";
    case "RETURNED":
      return "bg-gray-100 text-gray-700 border-gray-300";
    case "CANCELLED":
      return "bg-red-100 text-red-700 border-red-300";
    case "PENDING":
      return "bg-orange-100 text-orange-800 border-orange-300";
    case "COMPLETED":
      return "bg-green-100 text-green-800 border-green-300";
    case "FAILED":
      return "bg-red-100 text-red-700 border-red-300";
    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
  }
};

export const roleVariant = (role: string) => {
  switch (role) {
    case "ADMIN":
      return "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-300 rounded-full";
    case "PROVIDER":
      return "bg-orange-100 text-orange-800 border-orange-300 rounded-full";
    case "CUSTOMER":
      return "bg-teal-100 text-teal-800 border-teal-300 rounded-full";
    default:
      return "bg-gray-100 text-gray-700 border-gray-300 rounded-full";
  }
};

export const statusVariantForUser = (status: string) => {
  switch (status) {
    case "ACTIVE":
      return "bg-green-100 text-green-800 border-green-300";
    case "SUSPENDED":
      return "bg-red-100 text-red-700 border-red-300";
    default:
      return "bg-gray-100 text-gray-700 border-gray-300";
  }
};

export type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export type PayPageParams = Promise<{ orderId: string }>;