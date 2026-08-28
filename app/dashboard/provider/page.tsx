import Link from "next/link";
import { ChevronRight, Dumbbell, Package, Banknote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMyGear } from "./_actions/getMyGear";
import { getProviderOrders } from "./_actions/getProviderOrders";
import { getMyPayments } from "../customer/_actions/getMyPayments";
import { statusVariant } from "../_components/types";

const ProviderDashboard = async () => {
  const { data: gears } = await getMyGear({ limit: "100" });
  const { data: orders } = await getProviderOrders({ limit: "100" });
  const { data: payments } = await getMyPayments({ limit: "100" });

  const available = gears.filter((g) => g.isAvailable).length;
  const unavailable = gears.filter((g) => !g.isAvailable).length;

  return (
    <div className="flex flex-col gap-6">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Rental Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Total</span>
                <span className="text-xl font-bold">{orders.length}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Pending</span>
                <span className="text-xl font-bold text-amber-600 dark:text-amber-400">
                  {orders.filter((o) => o.status === "PLACED").length}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Confirmed</span>
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  {orders.filter((o) => o.status === "CONFIRMED").length}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Picked Up</span>
                <span className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
                  {orders.filter((o) => o.status === "PICKED_UP").length}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Returned</span>
                <span className="text-xl font-bold text-green-600 dark:text-green-400">
                  {orders.filter((o) => o.status === "RETURNED").length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Completed</span>
                <span className="text-xl font-bold text-green-600 dark:text-green-400">
                  {payments.filter((p) => p.status === "COMPLETED").length}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Pending</span>
                <span className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
                  {payments.filter((p) => p.status === "PENDING").length}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Failed</span>
                <span className="text-xl font-bold text-red-600 dark:text-red-400">
                  {payments.filter((p) => p.status === "FAILED").length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Gears
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Total</span>
                <span className="text-xl font-bold">{gears.length}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Available</span>
                <span className="text-xl font-bold text-green-600 dark:text-green-400">
                  {available}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">
                  Unavailable
                </span>
                <span className="text-xl font-bold text-red-600 dark:text-red-400">
                  {unavailable}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Orders</CardTitle>
          <Button asChild variant="ghost" size="sm">
            <Link href="/dashboard/provider/orders">
              View All <ChevronRight className="size-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-12 text-muted-foreground">
              <Package className="size-10" />
              <p className="font-medium">No orders yet</p>
              <p className="text-sm">Orders for your gear will appear here.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {orders.slice(0, 5).map((order) => (
                <Link
                  key={order.id}
                  href={`/dashboard/provider/orders/${order.id}`}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">
                      {order.gear?.title ?? "Unknown Gear"}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {order.customer?.email ?? "Unknown"} · {order.startDate} —{" "}
                      {order.endDate}
                    </span>
                  </div>
                  <Badge className={statusVariant(order.status)}>
                    {order.status}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Gear</CardTitle>
          <Button asChild variant="ghost" size="sm">
            <Link href="/dashboard/provider/gear">
              View All <ChevronRight className="size-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {gears.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-12 text-muted-foreground">
              <Dumbbell className="size-10" />
              <p className="font-medium">No gear listed</p>
              <p className="text-sm">
                Create your first gear listing to get started.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {gears.slice(0, 5).map((gear) => (
                <Link
                  key={gear.id}
                  href={`/dashboard/provider/gear/${gear.id}`}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">{gear.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {gear.brand} · Stock: {gear.stock}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-primary">
                      ${gear.pricePerDay}/day
                    </span>
                    <Badge
                      variant={gear.isAvailable ? "default" : "destructive"}
                    >
                      {gear.isAvailable ? "Available" : "Unavailable"}
                    </Badge>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Payments</CardTitle>
          <Button asChild variant="ghost" size="sm">
            <Link href="/dashboard/provider/payments">
              View All <ChevronRight className="size-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {payments.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-12 text-muted-foreground">
              <Banknote className="size-10" />
              <p className="font-medium">No payments yet</p>
              <p className="text-sm">
                Payments for your gear will appear here.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {payments.slice(0, 5).map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">
                      Order #{payment.rentalOrder.id.slice(0, 8)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {payment.paidAt
                        ? new Date(payment.paidAt).toLocaleDateString()
                        : new Date(payment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-primary">
                      ${payment.amount}
                    </span>
                    <Badge className={statusVariant(payment.status)}>
                      {payment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProviderDashboard;
