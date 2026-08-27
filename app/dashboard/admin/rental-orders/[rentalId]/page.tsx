import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRentalById } from "../../_actions/getRentalById";
import { statusVariant } from "../../../_components/types";
import ReviewsList from "@/app/gear/_components/ReviewsList";

const AdminRentalDetailPage = async ({ params }: { params: Promise<{ rentalId: string }> }) => {
  const { rentalId } = await params;
  const { success, data: rental } = await getRentalById(rentalId);

  if (!success || !rental) notFound();

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Rental Details</h1>
        <p className="text-muted-foreground">ID: {rental.id}</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">{rental.gear?.title ?? "Unknown Gear"}</CardTitle>
          <Badge variant={statusVariant(rental.status) as "default" | "secondary" | "destructive" | "outline"}>
            {rental.status}
          </Badge>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Total Price</p>
              <p className="font-medium">${rental.totalPrice}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Start Date</p>
              <p className="font-medium">{rental.startDate}</p>
            </div>
            <div>
              <p className="text-muted-foreground">End Date</p>
              <p className="font-medium">{rental.endDate}</p>
            </div>
            {rental.gear?.category?.name && (
              <div>
                <p className="text-muted-foreground">Category</p>
                <p className="font-medium">{rental.gear.category.name}</p>
              </div>
            )}
            <div>
              <p className="text-muted-foreground">Created At</p>
              <p className="font-medium">{new Date(rental.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <Card className="bg-muted/30">
            <CardContent className="p-4 flex flex-col gap-3">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Gear Details</p>
                <p className="font-medium">{rental.gear?.title ?? "Unknown"}</p>
                {rental.gear?.category?.name && (
                  <p className="text-sm text-muted-foreground">{rental.gear.category.name}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {rental.customer && (
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Customer</p>
                    <p className="font-medium">{rental.customer.email ?? "Unknown"}</p>
                  </div>
                )}
                {rental.gear?.provider?.email && (
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Provider</p>
                    <p className="font-medium">{rental.gear.provider.email}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {rental.gear?.id && (
        <Card>
          <CardContent className="p-6">
            <ReviewsList gearId={rental.gear.id} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminRentalDetailPage;
