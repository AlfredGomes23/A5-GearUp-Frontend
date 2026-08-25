"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const GearDetailError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center gap-4 text-center">
      <AlertTriangle className="size-16 text-destructive" />
      <h2 className="text-2xl font-bold">Something Went Wrong</h2>
      <p className="text-muted-foreground max-w-md">
        {error.message || "An unexpected error occurred while loading the gear details."}
      </p>
      <div className="flex gap-3">
        <Button variant="outline" onClick={reset}>
          Try Again
        </Button>
        <Button asChild>
          <Link href="/gear">Browse All Gear</Link>
        </Button>
      </div>
    </div>
  );
};

export default GearDetailError;
