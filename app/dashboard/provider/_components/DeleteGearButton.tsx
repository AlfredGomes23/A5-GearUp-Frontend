"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteGear } from "../_actions/deleteGear";
import { IGear } from "@/types/types";

const DeleteGearButton = ({ gear }: { gear: IGear }) => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`Delete gear "${gear.title}"? This cannot be undone.`)) return;

    setIsPending(true);
    const result = await deleteGear(gear.id);
    setIsPending(false);

    if (result.success) {
      toast.success("Gear deleted successfully");
      router.push("/dashboard/provider/gear");
      router.refresh();
    } else {
      toast.error(result.message || "Failed to delete gear");
    }
  };

  return (
    <Button
      variant="destructive"
      onClick={handleDelete}
      disabled={isPending}
    >
      {isPending ? (
        <Loader2 className="mr-2 size-4 animate-spin" />
      ) : (
        <Trash2 className="mr-2 size-4" />
      )}
      Delete Gear
    </Button>
  );
};

export default DeleteGearButton;
