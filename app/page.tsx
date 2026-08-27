import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getGears } from "@/app/gear/_actions/getGears";
import GearCard from "@/app/gear/_components/GearCard";
import ReviewsSection from "@/app/_components/ReviewsSection";

const FeaturedGear = async () => {
  const { data: gears } = await getGears({ limit: "4", sortOrder: "desc" });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {gears.map((gear) => (
        <GearCard key={gear.id} gear={gear} />
      ))}
    </div>
  );
};

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <section className="relative overflow-hidden border-b border-primary">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col gap-6 max-w-7xl">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Rent Sports &amp; Outdoor Gear Instantly
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Browse available gear, rent by the day, and get it delivered to your door. GearUp makes
            renting sports &amp; outdoor equipment easy.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/gear">
                Browse Gear <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">Featured Gear</h2>
            <p className="text-muted-foreground">Latest gear available for rent</p>
          </div>
          <Button asChild variant="ghost">
            <Link href="/gear">
              View All <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <Suspense fallback={<Skeleton className="h-64 w-full rounded-xl animate-pulse" />}>
          <FeaturedGear />
        </Suspense>
      </section>

      <section className="mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-6 max-w-4xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold">What People Say</h2>
          <p className="text-muted-foreground">Latest reviews from renters</p>
        </div>
        <Suspense fallback={<Skeleton className="h-48 w-full rounded-xl animate-pulse" />}>
          <ReviewsSection />
        </Suspense>
      </section>
    </div>
  );
}
