"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { XCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getPaymentReturnUrl, clearPaymentReturnUrl } from "@/lib/paymentStorage";

const PaymentCancelPage = () => {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const returnUrl = getPaymentReturnUrl();
    if (returnUrl) {
      clearPaymentReturnUrl();
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            window.location.href = returnUrl;
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, []);

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center gap-4 p-8">
          <XCircle className="size-16 text-muted-foreground" />
          <h1 className="text-2xl font-bold">Payment Cancelled</h1>
          <p className="text-muted-foreground text-center">
            Redirecting in {countdown}s...
          </p>
          <Button asChild variant="outline" className="mt-4">
            <Link href="/dashboard/customer/orders">
              <ArrowLeft className="mr-2 size-4" />
              Back to Rentals
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentCancelPage;
