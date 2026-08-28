"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cancelRental } from "@/app/dashboard/customer/_actions/cancelRental";

const CancelButton = ({ rentalId }: { rentalId: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    setLoading(true);
    const result = await cancelRental(rentalId);

    if (result.success) {
      toast.success("Rental order cancelled!");
      router.push("/dashboard/customer/orders");
    } else {
      toast.error(result.message || "Failed to cancel rental");
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="lg"
      disabled={loading}
      onClick={handleCancel}
      className="cursor-pointer border-destructive text-destructive hover:bg-destructive hover:text-accent"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 size-4 animate-spin" />
          Cancelling...
        </>
      ) : (
        "Cancel Order"
      )}
    </Button>
  );
};

export default CancelButton;
