"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const PaymentSuccessPage = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const returnUrl = sessionStorage.getItem("successPaymentReturnUrl");
    if (returnUrl) {
      sessionStorage.removeItem("successPaymentReturnUrl");
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            router.push(returnUrl);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [router]);

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center gap-4 p-8">
          <CheckCircle className="size-16 text-green-500" />
          <h1 className="text-2xl font-bold">Payment Successful</h1>
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

export default PaymentSuccessPage;
