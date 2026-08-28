"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IGear, ICategory } from "@/types/types";
import { getCategories } from "@/app/gear/_actions/getCategories";
import { updateGear } from "../_actions/updateGear";

const GearForm = ({ gear }: { gear: IGear }) => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [title, setTitle] = useState(gear.title);
  const [description, setDescription] = useState(gear.description);
  const [brand, setBrand] = useState(gear.brand);
  const [stock, setStock] = useState<number>(gear.stock);
  const [pricePerDay, setPricePerDay] = useState<number>(gear.pricePerDay);
  const [categoryId, setCategoryId] = useState(gear.category?.id ?? "");
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isAvailable, setIsAvailable] = useState(gear.isAvailable);

  useEffect(() => {
    getCategories().then((res) => {
      if (res.success) setCategories(res.data ?? []);
    });
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    const result = await updateGear({
      id: gear.id,
      title,
      description,
      brand,
      stock,
      pricePerDay,
      categoryId,
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
        <Label htmlFor="brand">Brand</Label>
        <Input
          id="brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            type="number"
            min={0}
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            disabled={isPending}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="price">Price / day ($)</Label>
          <Input
            id="price"
            type="number"
            min={0}
            step="0.01"
            value={pricePerDay}
            onChange={(e) => setPricePerDay(Number(e.target.value))}
            disabled={isPending}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="category">Category</Label>
        <Select value={categoryId} onValueChange={setCategoryId} disabled={isPending}>
          <SelectTrigger id="category" className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
