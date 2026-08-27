"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { updateUserStatus } from "../../_actions/updateUserStatus";

export const UserStatusControl = ({ userId, currentStatus }: { userId: string; currentStatus: string }) => {
  const router = useRouter();

  const handleToggle = async () => {
    const next = currentStatus === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
    const result = await updateUserStatus(userId, next);

    if (result.success) {
      toast.success(`User ${next === "ACTIVE" ? "activated" : "suspended"} successfully!`);
      router.refresh();
    } else {
      toast.error(result.message || "Failed to update status");
    }
  };

  return (
    <Button
      onClick={handleToggle}
      variant={currentStatus === "ACTIVE" ? "destructive" : "default"}
      className="cursor-pointer"
    >
      {currentStatus === "ACTIVE" ? "Suspend" : "Activate"}
    </Button>
  );
};
