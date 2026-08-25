import { ISingleRes, IGear } from "@/types/types";

export const getGearById = async (gearId: string): Promise<ISingleRes<IGear>> => {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear/${gearId}`, {
        cache: "no-store",
    });

    const result = await res.json();

    return { ...result, data: result?.data ?? null };
};
