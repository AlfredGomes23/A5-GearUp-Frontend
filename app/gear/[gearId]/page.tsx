import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Dumbbell, Mail, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getGearById } from "@/app/gear/_actions/getGearById";
import { getUser } from "@/services/getUser";
import { UserRole } from "@/types/enums";
import RentDatePicker from "../_components/RentDatePicker";

type GearDetailParams = Promise<{ gearId: string }>;

const GearDetailPage = async ({ params }: { params: GearDetailParams }) => {
  const { gearId } = await params;
  const [{ data: gear }, userRes] = await Promise.all([
    getGearById(gearId),
    getUser(),
  ]);

  if (!gear) notFound();

  const isCustomer =
    userRes?.success && userRes?.data?.role === UserRole.CUSTOMER;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
      {/* Back link */}
      <Link
        href="/gear"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="size-4" />
        Back to Gears
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Image placeholder + Details */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Image placeholder */}
          <div className="relative flex h-64 sm:h-80 items-center justify-center bg-linear-to-br from-primary/20 via-primary/5 to-muted rounded-2xl">
            <Dumbbell className="size-24 text-primary/40" />
            <Badge
              variant={gear.isAvailable ? "default" : "destructive"}
              className="absolute top-4 right-4"
            >
              {gear.isAvailable ? "Available" : "Unavailable"}
            </Badge>
          </div>

          {/* Title + Meta */}
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{gear.title}</h1>
              <Badge variant="outline" className="bg-primary/25">
                {gear.category?.name}
              </Badge>
            </div>
            <p className="text-muted-foreground">
              by{" "}
              <span className="font-medium text-foreground">{gear.brand}</span>
            </p>
          </div>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {gear.description}
              </p>
            </CardContent>
          </Card>

          {/* Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex flex-col gap-1 p-4 bg-muted/50 rounded-xl">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">
                Price
              </span>
              <span className="text-2xl font-bold text-primary">
                ${gear.pricePerDay}
                <span className="text-sm font-normal text-muted-foreground">
                  {" "}
                  /day
                </span>
              </span>
            </div>
            <div className="flex flex-col gap-1 p-4 bg-muted/50 rounded-xl">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">
                Stock
              </span>
              <span className="text-2xl font-bold">{gear.stock}</span>
            </div>
            <div className="flex flex-col gap-1 p-4 bg-muted/50 rounded-xl">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">
                Category
              </span>
              <span className="text-lg font-semibold">
                {gear.category?.name}
              </span>
            </div>
            <div className="flex flex-col gap-1 p-4 bg-muted/50 rounded-xl">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">
                Status
              </span>
              <span
                className={`text-lg font-semibold ${
                  gear.isAvailable ? "text-green-600" : "text-destructive"
                }`}
              >
                {gear.isAvailable ? "In Stock" : "Unavailable"}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Sidebar - Provider + Rent */}
        <div className="flex flex-col gap-6">
          {/* Provider Card */}
          <Card>
            <CardHeader>
              <CardTitle>Provider</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                  {gear.provider?.email?.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">{gear.provider?.email}</span>
                  {gear.provider?.phone && (
                    <span className="text-sm text-muted-foreground">
                      {gear.provider.phone}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2 pt-2 border-t">
                <a
                  href={`mailto:${gear.provider?.email}`}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="size-4" />
                  Send Email
                </a>
                {gear.provider?.phone && (
                  <a
                    href={`tel:${gear.provider.phone}`}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Phone className="size-4" />
                    Call Provider
                  </a>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Rent Card */}
          {isCustomer && (
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Rent This Gear</CardTitle>
              </CardHeader>
              <CardContent>
                <RentDatePicker gearId={gearId} />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default GearDetailPage;
