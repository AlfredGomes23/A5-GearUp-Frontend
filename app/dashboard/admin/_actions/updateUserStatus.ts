"use server";

import { revalidatePath } from "next/cache";
import { getAccessToken } from "@/services/getAccessToken";
import { IUser } from "@/types/types";

export const updateUserStatus = async (id: string, status: string): Promise<{ success: boolean; message?: string; data?: IUser }> => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { success: false, message: "User not logged in!" };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/users`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({ id, status }),
    });

    const result = await res.json();
    revalidatePath("/dashboard/admin/users");
    return { success: result.success, message: result.message, data: result.data };
  } catch {
    return { success: false, message: "Failed to update user status" };
  }
};
