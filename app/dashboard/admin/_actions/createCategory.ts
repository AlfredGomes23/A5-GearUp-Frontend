"use server";

import { revalidatePath } from "next/cache";
import { getAccessToken } from "@/services/getAccessToken";
import { ICategory } from "@/types/types";

export const createCategory = async (name: string): Promise<{ success: boolean; message?: string; data?: ICategory }> => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { success: false, message: "User not logged in!" };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({ name }),
    });

    const result = await res.json();
    revalidatePath("/dashboard/admin/categories");
    return { success: result.success, message: result.message, data: result.data };
  } catch {
    return { success: false, message: "Failed to create category" };
  }
};
