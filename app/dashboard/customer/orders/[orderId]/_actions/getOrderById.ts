"use server";

import { getAccessToken } from "@/services/getAccessToken";
import { ISingleRes, IRental } from "@/types/types";

export const getOrderById = async (orderId: string): Promise<ISingleRes<IRental>> => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { success: false, message: "User not logged in!", data: null as unknown as IRental };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/rental/${orderId}`, {
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
      data: result?.data,
    };
  } catch {
    return { success: false, message: "Failed to fetch order", data: null as unknown as IRental };
  }
};
