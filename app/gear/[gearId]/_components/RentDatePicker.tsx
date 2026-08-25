"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const RentDatePicker = () => {
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [open, setOpen] = useState(false);

  const days =
    range?.from && range?.to
      ? Math.ceil(
          (range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24)
        ) + 1
      : 0;

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !range?.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 size-4" />
            {range?.from ? (
              range?.to ? (
                `${format(range.from, "MMM d")} — ${format(range.to, "MMM d, yyyy")}`
              ) : (
                format(range.from, "PPP")
              )
            ) : (
              "Pick rental dates"
            )}
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
          <span className="font-semibold text-foreground">
            {days} day(s)
          </span>
        </div>
      )}

      <Button className="w-full" size="lg" disabled={!range?.from || !range?.to}>
        Rent Now
      </Button>
    </div>
  );
};

export default RentDatePicker;
