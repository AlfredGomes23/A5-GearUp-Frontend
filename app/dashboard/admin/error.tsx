"use client";

import ErrorState from "@/components/shared/ErrorState";

export default function AdminDashboardError({
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
      message="Failed to load the admin dashboard."
      href="/dashboard/admin"
      cta="Back to Dashboard"
    />
  );
}
