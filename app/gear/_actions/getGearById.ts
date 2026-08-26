import { ISingleRes, IGear } from "@/types/types";

export const getGearById = async (gearId: string): Promise<ISingleRes<IGear | null>> => {
    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear/${gearId}`, {
            cache: "no-store",
        });

        const result = await res.json();
        return { ...result, data: result?.data ?? null };
    } catch {
        return { success: false, message: "Failed to fetch gear", data: null };
    }
};
