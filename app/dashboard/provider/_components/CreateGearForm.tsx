"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ICategory } from "@/types/types";
import { createGear } from "../_actions/createGear";

const CreateGearForm = ({ categories }: { categories: ICategory[] }) => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");
  const [stock, setStock] = useState("1");
  const [categoryId, setCategoryId] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    const result = await createGear({
      title,
      description,
      brand,
      pricePerDay: parseFloat(pricePerDay),
      stock: parseInt(stock, 10),
      categoryId,
      isAvailable,
    });

    setIsPending(false);

    if (result.success) {
      toast.success("Gear created successfully");
      router.push("/dashboard/provider/gear");
    } else {
      toast.error(result.message || "Failed to create gear");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Sony A7 IV Camera Body"
          disabled={isPending}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your gear..."
          disabled={isPending}
          rows={4}
          className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="brand">Brand</Label>
          <Input
            id="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="e.g. Sony"
            disabled={isPending}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="categoryId">Category</Label>
          <select
            id="categoryId"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            disabled={isPending}
            className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
            required
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="pricePerDay">Price per Day ($)</Label>
          <Input
            id="pricePerDay"
            type="number"
            step="0.01"
            min="0.01"
            value={pricePerDay}
            onChange={(e) => setPricePerDay(e.target.value)}
            placeholder="45"
            disabled={isPending}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            type="number"
            min="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="1"
            disabled={isPending}
            required
          />
        </div>
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
          {isPending ? "Creating..." : "Create Gear"}
        </Button>
      </div>
    </form>
  );
};

export default CreateGearForm;
