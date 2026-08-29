import { Skeleton } from "@/components/ui/skeleton";
import { getCategories } from "@/app/gear/_actions/getCategories";
import GearFilters from "./_components/GearFilters";
import { Suspense } from "react";
import { GearResults } from "./_components/GearResults";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const normalizeParams = (
    sp: Record<string, string | string[] | undefined>
): Record<string, string | undefined> =>
    Object.fromEntries(
        Object.entries(sp).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value])
    );



const GearsPage = async ({ searchParams }: { searchParams: SearchParams }) => {
    const sp = await searchParams;
    const params = normalizeParams(sp);

    const categoriesRes = await getCategories();

    return (
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-bold">Browse Gear</h1>
                <p className="text-muted-foreground">Browse available gear</p>
            </div>

            <GearFilters categories={categoriesRes.data ?? []} />

            <Suspense fallback={<Skeleton className="h-64 w-full rounded-xl animate-pulse" />}>
                <GearResults params={params} />
            </Suspense>
        </div>
    );
};

export default GearsPage;
