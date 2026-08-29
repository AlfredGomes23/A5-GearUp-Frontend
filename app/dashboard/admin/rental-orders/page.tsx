import Link from "next/link";
import { ChevronLeft, ChevronRight, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getAdminRentals } from "../_actions/getAdminRentals";
import { SearchParams, statusVariant } from "../../_components/types";
import { formatDate } from "@/lib/formatDate";

const AdminRentalsPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const sp = await searchParams;
  const params = Object.fromEntries(
    Object.entries(sp).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value])
  );

  const { data: rentals, metaData } = await getAdminRentals({ page: params.page || "1", limit: "10" });

  const buildPageHref = (page: number) => {
    const query = new URLSearchParams({ ...params, page: String(page) }).toString();
    return `/dashboard/admin/rental-orders?${query}`;
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Rentals</h1>
        <p className="text-muted-foreground">
          {metaData?.total ?? rentals.length} rental{(metaData?.total ?? rentals.length) === 1 ? "" : "s"} total
        </p>
      </div>

      {rentals.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-2 py-12 text-muted-foreground">
            <Package className="size-10" />
            <p className="font-medium">No rentals found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {rentals.map((rental) => (
            <Link
              key={rental.id}
              href={`/dashboard/admin/rental-orders/${rental.id}`}
              className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <div className="flex flex-col gap-1">
                <span className="font-medium">{rental.gear?.title ?? "Unknown Gear"}</span>
                <span className="text-sm text-muted-foreground">
                  Customer: {rental.customer?.email ?? "Unknown"}
                </span>
                <span className="text-sm text-muted-foreground">
                  {formatDate(rental.startDate)} — {formatDate(rental.endDate)}
                </span>
                <span className="text-sm font-medium">${rental.totalPrice}</span>
              </div>
              <div className="flex items-center gap-3">
                {rental.gear?.provider?.email && (
                  <span className="text-sm text-muted-foreground">
                    Provider: {rental.gear.provider.email}
                  </span>
                )}
                <Badge className={statusVariant(rental.status)}>
                  {rental.status}
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

export default AdminRentalsPage;
