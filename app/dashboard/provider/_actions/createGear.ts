"use server";

import { getAccessToken } from "@/services/getAccessToken";
import { ISingleRes, IGear } from "@/types/types";

type CreateGearInput = {
  title: string;
  description: string;
  brand: string;
  isAvailable?: boolean;
  stock?: number;
  pricePerDay: number;
  categoryId: string;
};

export const createGear = async (data: CreateGearInput): Promise<ISingleRes<IGear | null>> => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { success: false, message: "User not logged in!", data: null };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/provider/gear`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    const result = await res.json();

    if (!result.success) {
      return { success: false, message: result.message || "Failed to create gear", data: null };
    }

    return { ...result, data: result?.data ?? null };
  } catch {
    return { success: false, message: "Failed to create gear", data: null };
  }
};
