"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { updateRentalStatus } from "../../_actions/updateRentalStatus";

const statusTransitions: Record<string, { next: string; label: string }> = {
  PLACED: { next: "CONFIRMED", label: "Confirm Order" },
  PAID: { next: "PICKED_UP", label: "Mark as Picked Up" },
  PICKED_UP: { next: "RETURNED", label: "Mark as Returned" },
};

export const StatusUpdateButton = ({ rentalId, currentStatus }: { rentalId: string; currentStatus: string }) => {
  const router = useRouter();
  const transition = statusTransitions[currentStatus];

  if (!transition) return null;

  const handleUpdate = async () => {
    const result = await updateRentalStatus(rentalId, transition.next);

    if (result.success) {
      toast.success(`Order ${transition.label} successfully!`);
      router.refresh();
    } else {
      toast.error(result.message || "Failed to update status");
    }
  };

  return (
    <Button onClick={handleUpdate} className="cursor-pointer">
      {transition.label}
    </Button>
  );
};
