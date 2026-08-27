import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Dumbbell, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getOrderById } from "../../_actions/getOrderById";
import { PayPageParams, statusVariant } from "../../../_components/types";
import CancelButton from "./CancelButton";

const CustomerOrderDetailPage = async ({ params }: { params: PayPageParams }) => {
  const { orderId } = await params;
  const { data: order, success } = await getOrderById(orderId);

  if (!success || !order) notFound();

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <Link
        href="/dashboard/customer/orders"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="size-4" />
        Back to Rentals
      </Link>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Order Details</h1>
        <Badge
          variant={
            statusVariant(order.status) as
              | "default"
              | "secondary"
              | "destructive"
              | "outline"
          }
        >
          {order.status}
        </Badge>
      </div>

      <Card>
        <CardContent className="flex flex-col gap-6 p-6">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Dumbbell className="size-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{order.gear?.title ?? "Unknown Gear"}</h2>
              <p className="text-muted-foreground text-sm">{order.gear?.brand}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Start Date</p>
              <p className="font-medium">{order.startDate}</p>
            </div>
            <div>
              <p className="text-muted-foreground">End Date</p>
              <p className="font-medium">{order.endDate}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Total Price</p>
              <p className="font-medium">${order.totalPrice}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Created At</p>
              <p className="font-medium">{order.createdAt}</p>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            {order.status === "PLACED" && (
              <CancelButton rentalId={order.id} />
            )}
            {order.status === "CONFIRMED" && (
              <Button asChild size="lg">
                <Link href={`/dashboard/customer/orders/${order.id}/pay`}>
                  Pay Now
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {order.gear?.provider && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="size-5" />
              Provider
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                {order.gear.provider.email?.charAt(0).toUpperCase()}
              </div>
              <span className="font-medium">{order.gear.provider.email}</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CustomerOrderDetailPage;
