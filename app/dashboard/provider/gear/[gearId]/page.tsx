import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Dumbbell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProviderGearById } from "../../_actions/getProviderGearById";
import GearForm from "../../_components/GearForm";

type GearDetailParams = Promise<{ gearId: string }>;

const ProviderGearDetailPage = async ({
  params,
}: {
  params: GearDetailParams;
}) => {
  const { gearId } = await params;
  const { data: gear } = await getProviderGearById(gearId);

  if (!gear) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
      <Link
        href="/dashboard/provider/gear"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="size-4" />
        Back to My Gears
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Edit Gear</h1>
          <p className="text-muted-foreground">{gear.title}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="relative flex h-48 items-center justify-center bg-linear-to-br from-primary/20 via-primary/5 to-muted rounded-xl">
            <Dumbbell className="size-16 text-primary/40" />
            <Badge
              variant={gear.isAvailable ? "default" : "destructive"}
              className="absolute top-3 right-3"
            >
              {gear.isAvailable ? "Available" : "Unavailable"}
            </Badge>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent>
              <GearForm gear={gear} />
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                  Price
                </span>
                <span className="text-2xl font-bold text-primary">
                  ${gear.pricePerDay}
                  <span className="text-sm font-normal text-muted-foreground">
                    /day
                  </span>
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                  Stock
                </span>
                <span className="text-2xl font-bold">{gear.stock}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                  Category
                </span>
                <span className="text-lg font-semibold">
                  {gear.category?.name}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                  Brand
                </span>
                <span className="text-lg font-semibold">{gear.brand}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProviderGearDetailPage;
