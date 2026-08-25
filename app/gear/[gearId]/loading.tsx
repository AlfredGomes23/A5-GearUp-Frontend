import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const GearDetailLoading = () => {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
      {/* Back link skeleton */}
      <Skeleton className="h-5 w-32" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Image + Details */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Image placeholder */}
          <Skeleton className="h-64 sm:h-80 rounded-2xl" />

          {/* Title */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-64" />
              <Skeleton className="h-5 w-20" />
            </div>
            <Skeleton className="h-5 w-40" />
          </div>

          {/* Description card */}
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-28" />
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>

          {/* Details grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col gap-1 p-4 bg-muted/50 rounded-xl">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-8 w-20" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="flex flex-col gap-6">
          {/* Provider card */}
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-20" />
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Skeleton className="size-10 rounded-full" />
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-28" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rent card */}
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-32" />
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-11 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GearDetailLoading;
