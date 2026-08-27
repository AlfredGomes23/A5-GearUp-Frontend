import Link from "next/link";
import { ChevronLeft, ChevronRight, PackageSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getGears } from "@/app/gear/_actions/getGears";
import { getCategories } from "@/app/gear/_actions/getCategories";
import GearCard from "./_components/GearCard";
import GearFilters from "./_components/GearFilters";
import { Suspense } from "react";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const normalizeParams = (
    sp: Record<string, string | string[] | undefined>
): Record<string, string | undefined> =>
    Object.fromEntries(
        Object.entries(sp).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value])
    );

const buildPageHref = (page: number, params: Record<string, string | undefined>) => {
    const query = new URLSearchParams({ ...params, page: String(page) }).toString();
    return `/gear?${query}`;
};

const GearResults = async ({ params }: { params: Record<string, string | undefined> }) => {
    const { data: gears, metaData } = await getGears(params);

    return (
        <>
            {gears.length === 0 ? (
                <div className="flex flex-col items-center gap-2 py-24 text-muted-foreground">
                    <PackageSearch className="size-12" />
                    <p className="font-medium">No gear found</p>
                    <p className="text-sm">Try different filters or check back later.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {gears.map((gear) => (
                        <GearCard key={gear.id} gear={gear} />
                    ))}
                </div>
            )}

            {(metaData?.totalPage ?? 1) > 1 && (
                <div className="flex items-center justify-center gap-2">
                    {metaData.page > 1 ? (
                        <Button asChild variant="outline" size="sm">
                            <Link href={buildPageHref(metaData.page - 1, params)}>
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
                            <Link href={buildPageHref(metaData.page + 1, params)}>
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
        </>
    );
};

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
