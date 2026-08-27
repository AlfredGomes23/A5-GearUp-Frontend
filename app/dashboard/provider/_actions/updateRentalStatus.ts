"use server";

import { getAccessToken } from "@/services/getAccessToken";
import { ISingleRes, IProviderRental } from "@/types/types";

export const updateRentalStatus = async (id: string, status: string): Promise<ISingleRes<IProviderRental>> => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { success: false, message: "User not logged in!", data: null };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/provider/orders`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({ id, status }),
      cache: "no-store",
    });

    const result = await res.json();
    return {
      success: result.success,
      message: result.message,
      data: result?.data ?? null,
    };
  } catch {
    return { success: false, message: "Failed to update rental status", data: null };
  }
};