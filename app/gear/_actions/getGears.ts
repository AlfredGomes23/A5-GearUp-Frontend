import { IListRes, IGear } from "@/types/types";

export const getGears = async (searchParams: Record<string, string | undefined>): Promise<IListRes<IGear>> => {
    const query = new URLSearchParams(
        Object.entries(searchParams).filter((entry): entry is [string, string] => Boolean(entry[1]))
    ).toString();

    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear?${query}`, {
            next: { revalidate: 30 },
        });

        const result = await res.json();
        return { ...result, data: result?.data ?? [], metaData: result?.metaData };
    } catch {
        return { success: false, message: "Failed to fetch gears", data: [], metaData: { page: 1, limit: 12, total: 0, totalPage: 0 } };
    }
};
