"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createCategory } from "../../_actions/createCategory";

export const CreateCategoryDialog = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    const result = await createCategory(name.trim());

    setIsPending(false);

    if (result.success) {
      toast.success(result.message || "Category created successfully");
      setName("");
      setOpen(false);
      router.refresh();
    } else {
      toast.error(result.message || "Failed to create category");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <Plus className="size-4" />
          Create Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
          <DialogDescription>Add a new gear category.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="category-name">Name</Label>
            <Input
              id="category-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Cameras"
              disabled={isPending}
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending} className="cursor-pointer">
              {isPending ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
