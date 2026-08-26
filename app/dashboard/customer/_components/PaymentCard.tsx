"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, CreditCard, CalendarDays, ShoppingCart } from "lucide-react";
import type { IPayment } from "@/types/types";
import { statusVariant } from "../../_components/types";

const paymentProviderIcon = (provider: string) => {
  switch (provider) {
    case "STRIPE":
      return <CreditCard className="size-4 text-primary" />;
    case "SSLCOMMERZ":
      return <CreditCard className="size-4 text-primary" />;
    default:
      return <DollarSign className="size-4 text-primary" />;
  }
};

const PaymentCard = ({ payment }: { payment: IPayment }) => {
  return (
    <Card className="hover:bg-muted/50 transition-colors">
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <div className="flex size-10 items-center justify-center bg-primary/10 rounded-lg">
            {paymentProviderIcon(payment.provider)}
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">Payment# {payment.rentalOrder.id}</span>
              <Badge
                variant={statusVariant(payment.status) as "default" | "secondary" | "destructive" | "outline"}
              >
                {payment.status}
              </Badge>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>Rental Order# {payment.rentalOrder.id}</span>
              <span className="flex items-center gap-1">
                <CalendarDays className="size-3" />
                {payment.paidAt
                  ? new Date(payment.paidAt).toLocaleDateString()
                  : new Date(payment.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
              <span className="flex items-center gap-1">
                <ShoppingCart className="size-3" />
                {payment.rentalOrder.status}
              </span>
          
          <p className="text-xs text-muted-foreground flex flex-col">
            <span className="text-lg font-bold text-primary">${payment.amount}</span>
            {payment.provider}
            </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentCard;
