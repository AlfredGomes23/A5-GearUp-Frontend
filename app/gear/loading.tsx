import { Skeleton } from "@/components/ui/skeleton";

const GearsLoading = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
            <Skeleton className="h-9 w-48" />
            <div className="flex flex-col sm:flex-row gap-3">
                <Skeleton className="h-10 grow" />
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-28" />
            </div>
            <div className="flex flex-wrap gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-8 w-20 rounded-full" />
                ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {Array.from({ length: 8 }).map((_, i) => (
                    <Skeleton key={i} className="h-80 rounded-xl" />
                ))}
            </div>
        </div>
    );
};

export default GearsLoading;
