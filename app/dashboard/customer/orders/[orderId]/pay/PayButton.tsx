"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { createCheckout } from "../../../_actions/createCheckout";

type PayButtonProps = {
  orderId: string;
  status: string;
};

const PayButton = ({ orderId, status }: PayButtonProps) => {
  const [loading, setLoading] = useState(false);

  if (status !== "PLACED") {
    return null;
  }

  const handlePay = async () => {
    setLoading(true);

    const result = await createCheckout(orderId);

    if (result.success && result.data?.checkout_url) {
      sessionStorage.setItem(
        "successPaymentReturnUrl",
        `/dashboard/customer/orders/${orderId}/pay`,
      );
      window.location.replace(result.data.checkout_url);
    } else {
      toast.error(result.message || "Failed to create checkout session");
      setLoading(false);
    }
  };

  return (
    <Button className="w-full" size="lg" disabled={loading} onClick={handlePay}>
      {loading ? (
        <>
          <Loader2 className="mr-2 size-4 animate-spin" />
          Redirecting...
        </>
      ) : (
        "Pay Now"
      )}
    </Button>
  );
};

export default PayButton;
