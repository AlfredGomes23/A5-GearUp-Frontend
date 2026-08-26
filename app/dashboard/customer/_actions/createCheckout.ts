"use server";

import { getAccessToken } from "@/services/getAccessToken";

export const createCheckout = async (rentalOrderId: string) => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { success: false, message: "User not logged in!", data: null };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/payment/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({ rentalOrderId }),
    });

    const result = await res.json();
    return {
      success: result.success,
      message: result.message,
      data: result?.data,
    };
  } catch {
    return { success: false, message: "Failed to create checkout session", data: null };
  }
};
