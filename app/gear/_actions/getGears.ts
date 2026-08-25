import { IListRes, IGear } from "@/types/types";

export const getGears = async (searchParams: Record<string, string | undefined>): Promise<IListRes<IGear>> => {
    const query = new URLSearchParams(
        Object.entries(searchParams).filter((entry): entry is [string, string] => Boolean(entry[1]))
    ).toString();
    // console.log(query, "query");

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear?${query}`, {
        cache: "no-store",
    });

    const result = await res.json();
    // console.log(result);

    // backend error responses omit data/metaData
    return { ...result, data: result?.data ?? [], metaData: result?.metaData };
};
