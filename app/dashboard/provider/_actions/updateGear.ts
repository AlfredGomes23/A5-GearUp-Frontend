"use server";

import { getAccessToken } from "@/services/getAccessToken";
import { ISingleRes, IGear } from "@/types/types";

type UpdateGearInput = {
  id: string;
  title?: string;
  description?: string;
  isAvailable?: boolean;
};

export const updateGear = async (data: UpdateGearInput): Promise<ISingleRes<IGear | null>> => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { success: false, message: "User not logged in!", data: null };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    const result = await res.json();
    return { ...result, data: result?.data ?? null };
  } catch {
    return { success: false, message: "Failed to update gear", data: null };
  }
};
