"use server";

import { getAccessToken } from "@/services/getAccessToken";
import { ISingleRes, IGear } from "@/types/types";

export const getProviderGearById = async (gearId: string): Promise<ISingleRes<IGear | null>> => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { success: false, message: "User not logged in!", data: null };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear/${gearId}`, {
      method: "GET",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    });

    const result = await res.json();
    return { ...result, data: result?.data ?? null };
  } catch {
    return { success: false, message: "Failed to fetch gear", data: null };
  }
};
