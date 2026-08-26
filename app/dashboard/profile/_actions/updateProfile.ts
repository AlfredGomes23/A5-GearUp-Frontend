"use server";

import { getAccessToken } from "@/services/getAccessToken";

export const updateProfile = async (prevstate: { success: boolean; message: string }, formData: FormData) => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { success: false, message: "User not logged in!" };
  }

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({ id, name, phone }),
    });

    const result = await res.json();
    return {
      success: result.success,
      message: result.message || (result.success ? "Profile updated!" : "Update failed"),
    };
  } catch {
    return { success: false, message: "Failed to update profile" };
  }
};
