import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPaymentById } from "../../_actions/getPaymentById";
import { getUser } from "../../_actions/getUser";
import { getGearById } from "../../../../gear/_actions/getGearById";
import { statusVariant } from "../../../_components/types";

const AdminPaymentDetailPage = async ({ params }: { params: Promise<{ paymentId: string }> }) => {
  const { paymentId } = await params;
  const { success, data: payment } = await getPaymentById(paymentId);

  if (!success || !payment) notFound();

  const gearId = payment.rentalOrder?.gearId;
  const customerId = payment.rentalOrder?.customerId;

  const [gearRes, customerRes] = await Promise.all([
    gearId ? getGearById(gearId) : Promise.resolve({ success: false, data: null }),
    customerId ? getUser(customerId) : Promise.resolve({ success: false, data: undefined }),
  ]);

  const gear = gearRes.data ?? null;
  const customer = customerRes.data;
  const providerEmail = gear?.provider?.email;

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Payment Details</h1>
        <p className="text-muted-foreground">ID: {payment.id}</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">
            {gear?.title ?? `Gear ${gearId ?? "Unknown"}`}
          </CardTitle>
          <Badge className={statusVariant(payment.status)}>
            {payment.status}
          </Badge>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Amount</p>
              <p className="font-medium text-primary">${payment.amount}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Provider</p>
              <p className="font-medium">{payment.provider}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Transaction ID</p>
              <p className="font-medium break-all">{payment.transactionId}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Paid At</p>
              <p className="font-medium">
                {payment.paidAt
                  ? new Date(payment.paidAt).toLocaleDateString()
                  : new Date(payment.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Rental Order</p>
              <p className="font-medium">{payment.rentalOrder?.id ?? "—"}</p>
            </div>
          </div>

          <Card className="bg-muted/30">
            <CardContent className="p-4 flex flex-col gap-3">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Gear Details</p>
                <p className="font-medium">{gear?.title ?? `Gear ${gearId ?? "Unknown"}`}</p>
                {gear?.category?.name && (
                  <p className="text-sm text-muted-foreground">{gear.category.name}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Customer</p>
                  <p className="font-medium">
                    {customer?.email ?? `Customer ${customerId ?? "Unknown"}`}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Provider</p>
                  <p className="font-medium">
                    {providerEmail ?? `Provider ${gear?.provider?.id ?? "Unknown"}`}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPaymentDetailPage;
