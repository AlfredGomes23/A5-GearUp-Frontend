"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { createRental } from "../_actions/createRental";

const RentDatePicker = ({ gearId }: { gearId: string }) => {
  const router = useRouter();
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const days =
    range?.from && range?.to
      ? Math.ceil(
          (range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24),
        ) + 1
      : 0;

  const handleRent = async () => {
    if (!range?.from || !range?.to) return;

    setLoading(true);
    const startDate = format(range.from, "yyyy-MM-dd");
    const endDate = format(range.to, "yyyy-MM-dd");

    const result = await createRental(gearId, startDate, endDate);

    if (result.success) {
      toast.success("Rental order placed! Redirecting to payment...");
      router.push(`/dashboard/customer/orders/${result.data.id}/pay`);
    } else {
      toast.error(result.message || "Failed to create rental order");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !range?.from && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 size-4" />
            {range?.from
              ? range?.to
                ? `${format(range.from, "MMM d")} — ${format(range.to, "MMM d, yyyy")}`
                : format(range.from, "PPP")
              : "Pick rental dates"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={range}
            onSelect={(selected) => {
              setRange(selected);
              if (selected?.from && selected?.to) setOpen(false);
            }}
            disabled={(date) => date < new Date()}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      {days > 0 && (
        <div className="text-sm text-muted-foreground">
          Total:{" "}
          <span className="font-semibold text-foreground">{days} day(s)</span>
        </div>
      )}

      <Button
        className="w-full"
        size="lg"
        disabled={!range?.from || !range?.to || loading}
        onClick={handleRent}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Rent Now"
        )}
      </Button>
    </div>
  );
};

export default RentDatePicker;
