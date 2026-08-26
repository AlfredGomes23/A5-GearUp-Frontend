"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IGear } from "@/types/types";
import { updateGear } from "../_actions/updateGear";

const GearForm = ({ gear }: { gear: IGear }) => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [title, setTitle] = useState(gear.title);
  const [description, setDescription] = useState(gear.description);
  const [isAvailable, setIsAvailable] = useState(gear.isAvailable);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    const result = await updateGear({
      id: gear.id,
      title,
      description,
      isAvailable,
    });

    setIsPending(false);

    if (result.success) {
      toast.success("Gear updated successfully");
      router.refresh();
    } else {
      toast.error(result.message || "Failed to update gear");
    }
  };

  return (
    <form onSubmit={handleUpdate} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isPending}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isPending}
          rows={4}
          className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
        />
      </div>
      <div className="flex items-center gap-3">
        <Label htmlFor="isAvailable">Available</Label>
        <input
          type="checkbox"
          id="isAvailable"
          checked={isAvailable}
          onChange={(e) => setIsAvailable(e.target.checked)}
          disabled={isPending}
          className="h-4 w-4"
        />
      </div>
      <div className="pt-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Updating..." : "Update Gear"}
        </Button>
      </div>
    </form>
  );
};

export default GearForm;
