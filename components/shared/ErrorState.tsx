"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ErrorState = ({
  error,
  reset,
  message = "An unexpected error occurred.",
  href,
  cta = "Go Home",
}: {
  error: Error & { digest?: string };
  reset: () => void;
  message?: string;
  href?: string;
  cta?: string;
}) => {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center gap-4 text-center">
      <AlertTriangle className="size-16 text-destructive" />
      <h2 className="text-2xl font-bold">Something Went Wrong</h2>
      <p className="text-muted-foreground max-w-md">
        {error.message || message}
      </p>
      <div className="flex gap-3">
        <Button variant="outline" onClick={reset}>
          Try Again
        </Button>
        {href && (
          <Button asChild>
            <Link href={href}>{cta}</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ErrorState;
