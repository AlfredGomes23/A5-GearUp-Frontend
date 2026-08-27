"use server";

import { getAccessToken } from "@/services/getAccessToken";
import { ISingleRes, IReview } from "@/types/types";

export type IListReviewRes = {
  success: boolean;
  message?: string;
  data: IReview[];
  metaData?: { page: number; limit: number; total: number; totalPage: number };
};

export const getReviewsByGear = async (gearId: string): Promise<IListReviewRes> => {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/review?gearId=${gearId}&limit=100`,
      { next: { revalidate: 30 } }
    );

    const result = await res.json();
    return {
      success: result.success,
      message: result.message,
      data: result?.data ?? [],
      metaData: result?.metaData ?? { page: 1, limit: 100, total: 0, totalPage: 0 },
    };
  } catch {
    return { success: false, message: "Failed to fetch reviews", data: [] };
  }
};

export const getAllReviews = async (limit = 5): Promise<IListReviewRes> => {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/review?limit=${limit}`,
      { next: { revalidate: 30 } }
    );

    const result = await res.json();
    return {
      success: result.success,
      message: result.message,
      data: result?.data ?? [],
      metaData: result?.metaData ?? { page: 1, limit, total: 0, totalPage: 0 },
    };
  } catch {
    return { success: false, message: "Failed to fetch reviews", data: [] };
  }
};

type CreateReviewInput = {
  gearId: string;
  rating: number;
  comment: string;
};

export const createReview = async (data: CreateReviewInput): Promise<ISingleRes<IReview | null>> => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { success: false, message: "User not logged in!", data: null };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    const result = await res.json();

    if (!result.success) {
      return { success: false, message: result.message || "Failed to create review", data: null };
    }

    return { ...result, data: result?.data ?? null };
  } catch {
    return { success: false, message: "Failed to create review", data: null };
  }
};
