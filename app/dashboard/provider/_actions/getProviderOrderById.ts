"use server";

import { getAccessToken } from "@/services/getAccessToken";
import { ISingleRes, IProviderRental } from "@/types/types";

export const getProviderOrderById = async (rentalId: string): Promise<ISingleRes<IProviderRental>> => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { success: false, message: "User not logged in!", data: null };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/rental/${rentalId}`, {
      method: "GET",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    });

    const result = await res.json();
    return {
      success: result.success,
      message: result.message,
      data: result?.data ?? null,
    };
  } catch {
    return { success: false, message: "Failed to fetch rental order", data: null };
  }
};