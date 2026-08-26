"use server";

import { getAccessToken } from "@/services/getAccessToken";

export const createRental = async (gearId: string, startDate: string, endDate: string) => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { success: false, message: "User not logged in!" };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/rental`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    body: JSON.stringify({ gearId, startDate, endDate }),
  });

  const result = await res.json();
  return result;
};
