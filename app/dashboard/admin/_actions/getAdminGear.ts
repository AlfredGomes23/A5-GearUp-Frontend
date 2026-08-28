"use server";

import { getAccessToken } from "@/services/getAccessToken";
import { IListRes, IGear } from "@/types/types";

export const getAdminGear = async (
  searchParams?: Record<string, string | undefined>
): Promise<IListRes<IGear>> => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { success: false, message: "User not logged in!", data: [], metaData: { page: 1, limit: 10, total: 0, totalPage: 0 } };
  }

  const query = searchParams
    ? new URLSearchParams(
        Object.entries(searchParams).filter((entry): entry is [string, string] => Boolean(entry[1]))
      ).toString()
    : "";

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/gears${query ? `?${query}` : ""}`, {
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
      data: result?.data ?? [],
      metaData: result?.metaData ?? { page: 1, limit: 10, total: 0, totalPage: 0 },
    };
  } catch {
    return { success: false, message: "Failed to fetch gear", data: [], metaData: { page: 1, limit: 10, total: 0, totalPage: 0 } };
  }
};
