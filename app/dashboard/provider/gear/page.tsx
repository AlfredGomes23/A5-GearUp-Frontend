import Link from "next/link";
import { ChevronLeft, ChevronRight, Dumbbell, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getMyGear } from "../_actions/getMyGear";
import { SearchParams } from "../../_components/types";

const ProviderGearPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const sp = await searchParams;
  const params = Object.fromEntries(
    Object.entries(sp).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value])
  );

  const { data: gears, metaData } = await getMyGear({ page: params.page || "1", limit: "10" });

  const buildPageHref = (page: number) => {
    const query = new URLSearchParams({ ...params, page: String(page) }).toString();
    return `/dashboard/provider/gear?${query}`;
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Gears</h1>
          <p className="text-muted-foreground">
            {metaData?.total ?? gears.length} gear{(metaData?.total ?? gears.length) === 1 ? "" : ""} listed
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/provider/gear/new">
            <Plus className="size-4" />
            Create Gear
          </Link>
        </Button>
      </div>

      {gears.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-2 py-12 text-muted-foreground">
            <Dumbbell className="size-10" />
            <p className="font-medium">No gear listed</p>
            <p className="text-sm">Create your first gear listing to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {gears.map((gear) => (
            <Link
              key={gear.id}
              href={`/dashboard/provider/gear/${gear.id}`}
              className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
                  <Dumbbell className="size-6 text-primary/60" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-medium">{gear.title}</span>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{gear.brand}</span>
                    <span>·</span>
                    <span>{gear.category?.name}</span>
                    <span>·</span>
                    <span>Stock: {gear.stock}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-lg text-primary">
                  ${gear.pricePerDay}
                  <span className="text-sm font-normal text-muted-foreground">/day</span>
                </span>
                <Badge variant={gear.isAvailable ? "default" : "destructive"}>
                  {gear.isAvailable ? "Available" : "Unavailable"}
                </Badge>
              </div>
            </Link>
          ))}
        </div>
      )}

      {(metaData?.totalPage ?? 1) > 1 && (
        <div className="flex items-center justify-center gap-2">
          {metaData.page > 1 ? (
            <Button asChild variant="outline" size="sm">
              <Link href={buildPageHref(metaData.page - 1)}>
                <ChevronLeft /> Prev
              </Link>
            </Button>
          ) : (
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft /> Prev
            </Button>
          )}
          <span className="text-sm text-muted-foreground px-2">
            Page {metaData.page} of {metaData.totalPage}
          </span>
          {metaData.page < metaData.totalPage ? (
            <Button asChild variant="outline" size="sm">
              <Link href={buildPageHref(metaData.page + 1)}>
                Next <ChevronRight />
              </Link>
            </Button>
          ) : (
            <Button variant="outline" size="sm" disabled>
              Next <ChevronRight />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProviderGearPage;
