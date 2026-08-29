import Link from "next/link";
import { ChevronLeft, ChevronRight, PackageSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getGears } from "@/app/gear/_actions/getGears";
import GearCard from "./GearCard";

const buildPageHref = (page: number, params: Record<string, string | undefined>) => {
    const query = new URLSearchParams({ ...params, page: String(page) }).toString();
    return `/gear?${query}`;
};

export const GearResults = async ({ params }: { params: Record<string, string | undefined> }) => {
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