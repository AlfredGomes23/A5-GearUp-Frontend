export enum UserRole {
  CUSTOMER = "CUSTOMER",
  PROVIDER = "PROVIDER",
  ADMIN = "ADMIN",
};

export enum UserStatus {
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
};

export enum OrderStatus {
  PLACED = "PLACED",
  CONFIRMED = "CONFIRMED",
  PAID = "PAID",
  PICKED_UP = "PICKED_UP",
  RETURNED = "RETURNED",
  CANCELLED = "CANCELLED",
};

export enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
};

export enum PaymentProvider {
  STRIPE = "STRIPE",
  SSLCOMMERZ = "SSLCOMMERZ",
};

export enum SortBy {
  CREATEDAT = "createdAt",
  UPDATEDAT = "updatedAt",
};

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
};
