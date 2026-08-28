import Link from "next/link";
import { ChevronLeft, ChevronRight, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getMyOrders } from "../_actions/getMyOrders";
import { SearchParams, statusVariant } from "../../_components/types";



const OrdersPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const sp = await searchParams;
  const params = Object.fromEntries(
    Object.entries(sp).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value])
  );

  const { data: orders, metaData } = await getMyOrders({ page: params.page || "1", limit: "10" });

  const buildPageHref = (page: number) => {
    const query = new URLSearchParams({ ...params, page: String(page) }).toString();
    return `/dashboard/customer/orders?${query}`;
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">My Rentals</h1>
        <p className="text-muted-foreground">
          {metaData?.total ?? orders.length} rental{(metaData?.total ?? orders.length) === 1 ? "" : "s"} total
        </p>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-2 py-12 text-muted-foreground">
            <Package className="size-10" />
            <p className="font-medium">No rentals found</p>
            <p className="text-sm">Browse gear to make your first rental.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/dashboard/customer/orders/${order.id}/pay`}
              className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <div className="flex flex-col gap-1">
                <span className="font-medium">{order.gear?.title ?? "Unknown Gear"}</span>
                <span className="text-sm text-muted-foreground">
                  {order.startDate} — {order.endDate}
                </span>
                <span className="text-sm font-medium">${order.totalPrice}</span>
              </div>
              <Badge className={statusVariant(order.status)}>
                {order.status}
              </Badge>
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

export default OrdersPage;
