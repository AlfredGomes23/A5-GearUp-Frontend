"use server";

import { getAccessToken } from "@/services/getAccessToken";
import { ISingleRes, IRental } from "@/types/types";

export const cancelRental = async (rentalId: string): Promise<ISingleRes<IRental>> => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { success: false, message: "User not logged in!", data: null };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/rental`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({ id: rentalId, status: "CANCELLED" }),
      cache: "no-store",
    });

    const result = await res.json();
    return {
      success: result.success,
      message: result.message,
      data: result?.data ?? null,
    };
  } catch {
    return { success: false, message: "Failed to cancel rental", data: null };
  }
};
