import { Banknote } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const PaymentsLoading = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Skeleton className="h-8 w-36 mb-2" />
        <Skeleton className="h-4 w-28" />
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-4">
                  <Skeleton className="size-10 rounded-lg" />
                  <div className="flex flex-col gap-1">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                </div>
                <div className="text-right">
                  <Skeleton className="h-6 w-16 mb-1 ml-auto" />
                  <Skeleton className="h-3 w-12 ml-auto" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center gap-2">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-9 w-16" />
      </div>
    </div>
  );
};

export default PaymentsLoading;
