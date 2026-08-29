"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LoaderIcon, RotateCcw, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ICategory } from "@/types/types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const SORT_OPTIONS = [
  { value: "createdAt:desc", label: "Newest first" },
  { value: "createdAt:asc", label: "Oldest first" },
  { value: "updatedAt:desc", label: "Recently updated" },
];

type FilterUpdates = Record<string, string | null >;

const GearFilters = ({ categories, isLoading }: { categories: ICategory[]; isLoading?: boolean }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const currentSearch = searchParams.get("searchTerm") ?? "";
  const currentMinPrice = searchParams.get("minPrice") ?? "";
  const currentMaxPrice = searchParams.get("maxPrice") ?? "";
  const [search, setSearch] = useState(currentSearch);
  const [minPrice, setMinPrice] = useState(currentMinPrice);
  const [maxPrice, setMaxPrice] = useState(currentMaxPrice);
  const debounceRef = useRef<NodeJS.Timeout>(null);
  const priceDebounceRef = useRef<NodeJS.Timeout>(null);
  const pushParams = (updates: FilterUpdates) => {

    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") params.delete(key);
      else params.set(key, value);
    });
    if (!("page" in updates)) params.delete("page");
    startTransition(() =>
      router.push(`${pathname}?${params.toString()}`, { scroll: false }),
    );
  };

  // debounced search
  useEffect(() => {
    if (search === currentSearch) return;
    debounceRef.current = setTimeout(() => {
      pushParams({ searchTerm: search || null });
    }, 400);
    return () => clearTimeout(debounceRef.current!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // debounced price filter
  useEffect(() => {
    if (minPrice === currentMinPrice && maxPrice === currentMaxPrice) return;
    priceDebounceRef.current = setTimeout(() => {
      pushParams({
        minPrice: minPrice || null,
        maxPrice: maxPrice || null,
      });
    }, 400);
    return () => clearTimeout(priceDebounceRef.current!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minPrice, maxPrice]);

  const categoryId = searchParams.get("categoryId");
  const isAvailable = searchParams.get("isAvailable") === "true";
  const sortBy = searchParams.get("sortBy") ?? "createdAt";
  const sortOrder = searchParams.get("sortOrder") ?? "desc";
  const sortValue = `${sortBy}:${sortOrder}`;

  const hasFilters = Boolean(search || categoryId || isAvailable || minPrice || maxPrice);

  return (
    <>
      {isPending || isLoading ? (
        // loading spinner
        <span className="text-xl text-muted-foreground flex justify-center items-center">
          <LoaderIcon
            role="status"
            aria-label="Loading"
            className={cn("size-8 animate-spin")}
          /> Loading...
        </span>
      ) : (
        // content
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className=" flex gap-3 justify-center">
            {/* reset */}
            {hasFilters && (
              <Button
                variant="outline"
                size="icon"
                title="Clear filters"
                className="w-fit p-1 rounded-xl hover:text-primary hover:scale-150"
                onClick={() =>{
                  pushParams({
                    searchTerm: null,
                    categoryId: null,
                    isAvailable: null,
                    minPrice: null,
                    maxPrice: null,
                    sortBy: null,
                    sortOrder: null
                  });
                  setSearch("");
                  setMinPrice("");
                  setMaxPrice("");
                 }
                }
              >
                <RotateCcw /> Reset
              </Button>
            )}

            {/* availability */}
            <Toggle
              variant="outline"
              pressed={isAvailable}
              onPressedChange={(pressed) =>
                pushParams({ isAvailable: pressed ? "true" : null })
              }
              className="shrink-0 w-fit rounded-xl hover:text-primary border-dashed border-primary"
            >
              Available only
            </Toggle>
</div>
            {/* sort */}
            <RadioGroup
              value={sortValue}
              onValueChange={(value) => {
                const [newSortBy, newSortOrder] = value.split(":");
                pushParams({ sortBy: newSortBy, sortOrder: newSortOrder });
              }}
              className="flex items-center gap-4 w-fit border p-2 rounded-xl border-primary border-dashed"
            >
              {SORT_OPTIONS.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label
                    htmlFor={option.value}
                    className="cursor-pointer text-sm font-medium"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {/* search */}
            <div className="relative grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search gear, brand..."
                className="pl-9 rounded-xl border-dashed border-primary outline outline-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary"
              />
            </div>
          </div>

          {/* price range */}
          {/* <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-medium">Price / day:</span>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
              <Input
                type="number"
                min={0}
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Min"
                className="pl-7 w-28 rounded-xl border-dashed border-primary outline outline-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary"
              />
            </div>
            <span className="text-muted-foreground">-</span>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
              <Input
                type="number"
                min={0}
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Max"
                className="pl-7 w-28 rounded-xl border-dashed border-primary outline outline-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary"
              />
            </div>
          </div> */}

          {/* categories */}
          <div className="flex flex-wrap gap-2">
            <p
              onClick={() => pushParams({})}
              // className={cn(
              //   "rounded-full border px-3 py-1 text-sm font-medium transition-colors cursor-pointer")}
            >
              Categories:
            </p>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() =>
                  pushParams({
                    categoryId: categoryId === category.id ? null : category.id,
                  })
                }
                className={cn(
                  "rounded-full border px-3 py-1 text-sm font-medium transition-colors cursor-pointer",
                  categoryId === category.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground hover:bg-muted",
                )}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default GearFilters;
