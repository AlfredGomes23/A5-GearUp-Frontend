import Link from "next/link";
import { ChevronRight, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMyOrders } from "./_actions/getMyOrders";
import { statusVariant } from "../_components/types";



const CustomerDashboard = async () => {
  const { data: orders } = await getMyOrders({ limit: "5" });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">My Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here&apos;s your rental overview.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Rentals</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{orders.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {orders.filter((o) => ["PAID", "PICKED_UP", "CONFIRMED"].includes(o.status)).length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {orders.filter((o) => o.status === "RETURNED").length}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Rentals</CardTitle>
          <Button asChild variant="ghost" size="sm">
            <Link href="/dashboard/customer/orders">
              View All <ChevronRight className="size-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-12 text-muted-foreground">
              <Package className="size-10" />
              <p className="font-medium">No rentals yet</p>
              <p className="text-sm">Browse gear to make your first rental.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {orders.map((order) => (
                <Link
                  key={order.id}
                  href={`/dashboard/customer/orders/${order.id}/pay`}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">{order.gear?.title ?? "Unknown Gear"}</span>
                    <span className="text-sm text-muted-foreground">
                      {order.startDate} — {order.endDate}
                    </span>
                  </div>
                  <Badge variant={statusVariant(order.status) as "default" | "secondary" | "destructive" | "outline"}>
                    {order.status}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerDashboard;
