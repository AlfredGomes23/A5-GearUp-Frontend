import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getProviderOrderById } from "../../_actions/getProviderOrderById";
import { statusVariant } from "../../../_components/types";
import { StatusUpdateButton } from "./StatusUpdateButton";
import ReviewsList from "@/app/gear/_components/ReviewsList";

const ProviderOrderDetailPage = async ({ params }: { params: Promise<{ orderId: string }> }) => {
  const { orderId } = await params;
  const { success, data: order } = await getProviderOrderById(orderId);

  if (!success || !order) notFound();

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Order Details</h1>
        <p className="text-muted-foreground">ID: {order.id}</p>
      </div>

      <Card>
        <CardContent className="flex flex-col gap-4 p-6">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">{order.gear?.title ?? "Unknown Gear"}</span>
            <Badge variant={statusVariant(order.status) as "default" | "secondary" | "destructive" | "outline"}>
              {order.status}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Customer</p>
              <p className="font-medium">{order.customer?.email ?? "Unknown"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Total Price</p>
              <p className="font-medium">${order.totalPrice}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Start Date</p>
              <p className="font-medium">{order.startDate}</p>
            </div>
            <div>
              <p className="text-muted-foreground">End Date</p>
              <p className="font-medium">{order.endDate}</p>
            </div>
            {order.gear?.category && (
              <div>
                <p className="text-muted-foreground">Category</p>
                <p className="font-medium">{order.gear.category.name}</p>
              </div>
            )}
            <div>
              <p className="text-muted-foreground">Created At</p>
              <p className="font-medium">{order.createdAt}</p>
            </div>
          </div>

          <div className="pt-4 border-t">
            <StatusUpdateButton rentalId={order.id} currentStatus={order.status} />
          </div>
        </CardContent>
      </Card>

      {order.gear?.id && (
        <Card>
          <CardContent className="p-6">
            <ReviewsList gearId={order.gear.id} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProviderOrderDetailPage;
