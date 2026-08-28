import Link from "next/link";
import { ChevronLeft, ChevronRight, Banknote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getAdminPayments } from "../_actions/getAdminPayments";
import { SearchParams, statusVariant } from "../../_components/types";

const AdminPaymentsPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const sp = await searchParams;
  const params = Object.fromEntries(
    Object.entries(sp).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value])
  );

  const { data: payments, metaData } = await getAdminPayments({ page: params.page || "1", limit: "10" });

  const buildPageHref = (page: number) => {
    const query = new URLSearchParams({ ...params, page: String(page) }).toString();
    return `/dashboard/admin/payments?${query}`;
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Payments</h1>
        <p className="text-muted-foreground">
          {metaData?.total ?? payments.length} payment{(metaData?.total ?? payments.length) === 1 ? "" : "s"} total
        </p>
      </div>

      {payments.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-2 py-12 text-muted-foreground">
            <Banknote className="size-10" />
            <p className="font-medium">No payments found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {payments.map((payment) => (
            <Link
              key={payment.id}
              href={`/dashboard/admin/payments/${payment.id}`}
              className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <div className="flex flex-col gap-1">
                <span className="font-medium">Gear ID: {payment.rentalOrder?.gearId}</span>
                <span className="text-sm text-muted-foreground">
                  Customer ID: {payment.rentalOrder?.customerId}
                </span>
                <span className="text-sm text-muted-foreground">
                  {payment.paidAt
                    ? new Date(payment.paidAt).toLocaleDateString()
                    : new Date(payment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-medium text-primary">${payment.amount}</span>
                <Badge className={statusVariant(payment.status)}>
                  {payment.status}
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

export default AdminPaymentsPage;
