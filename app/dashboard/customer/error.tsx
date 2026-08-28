"use client";

import ErrorState from "@/components/shared/ErrorState";

export default function CustomerDashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      error={error}
      reset={reset}
      message="Failed to load your dashboard."
      href="/dashboard/customer"
      cta="Back to Dashboard"
    />
  );
}
