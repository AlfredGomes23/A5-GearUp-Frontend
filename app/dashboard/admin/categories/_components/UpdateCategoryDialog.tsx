"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { PenLine } from "lucide-react";
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
import { updateCategory } from "../../_actions/updateCategory";

export const UpdateCategoryDialog = ({ categoryId, initialName }: { categoryId: string; initialName: string }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [name, setName] = useState(initialName);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    const result = await updateCategory(categoryId, name.trim());

    setIsPending(false);

    if (result.success) {
      toast.success(result.message || "Category updated successfully");
      setOpen(false);
      router.refresh();
    } else {
      toast.error(result.message || "Failed to update category");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="cursor-pointer">
          <PenLine className="size-4" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>
          <DialogDescription>Rename the gear category.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor={`category-name-${categoryId}`}>Name</Label>
            <Input
              id={`category-name-${categoryId}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category name"
              disabled={isPending}
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending} className="cursor-pointer">
              {isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
