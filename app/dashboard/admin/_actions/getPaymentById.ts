"use server";

import { getAccessToken } from "@/services/getAccessToken";
import { IPayment } from "@/types/types";

export const getPaymentById = async (paymentId: string): Promise<{ success: boolean; message?: string; data?: IPayment }> => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { success: false, message: "User not logged in!" };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/payment/${paymentId}`, {
      method: "GET",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    });

    const result = await res.json();
    return { success: result.success, message: result.message, data: result.data };
  } catch {
    return { success: false, message: "Failed to fetch payment" };
  }
};
