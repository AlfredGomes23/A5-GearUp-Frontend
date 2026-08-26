import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Dumbbell, DollarSign, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getOrderById } from "../_actions/getOrderById";
import PayButton from "./PayButton";
import { PayPageParams, statusVariant } from "@/app/dashboard/_components/types";




const OrderPayPage = async ({ params }: { params: PayPageParams }) => {
  const { orderId } = await params;
  const { data: order, success } = await getOrderById(orderId);

  if (!success || !order) notFound();

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/dashboard/customer/orders"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="size-4" />
        Back to Rentals
      </Link>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Rental Details & Payment</h1>
        <Badge variant={statusVariant(order.status) as "default" | "secondary" | "destructive" | "outline"}>
          {order.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Dumbbell className="size-5" />
                Gear Information
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="flex size-16 items-center justify-center bg-primary/10 rounded-xl">
                  <Dumbbell className="size-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{order.gear?.title ?? "Unknown Gear"}</h2>
                  <p className="text-muted-foreground">{order.gear?.brand}</p>
                  {order.gear?.category && (
                    <Badge variant="outline" className="mt-1">{order.gear.category.name}</Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="size-5" />
                Rental Period
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1 p-4 bg-muted/50 rounded-xl">
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">Start Date</span>
                  <span className="text-lg font-semibold">{order.startDate}</span>
                </div>
                <div className="flex flex-col gap-1 p-4 bg-muted/50 rounded-xl">
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">End Date</span>
                  <span className="text-lg font-semibold">{order.endDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="size-5" />
                Payment Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                <span className="text-muted-foreground">Total Cost</span>
                <span className="text-2xl font-bold text-primary">${order.totalPrice}</span>
              </div>
              <PayButton orderId={order.id} status={order.status} />
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
                  <div className="flex flex-col">
                    <span className="font-medium">{order.gear.provider.email}</span>
                    {order.gear.provider.phone && (
                      <span className="text-sm text-muted-foreground">{order.gear.provider.phone}</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderPayPage;
