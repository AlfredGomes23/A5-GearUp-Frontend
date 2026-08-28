"use client";

import ErrorState from "@/components/shared/ErrorState";

export default function GearBrowseError({
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
      message="Failed to load gear listings. Please try again."
      href="/gear"
      cta="Browse Gear"
    />
  );
}
