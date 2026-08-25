"use server";

import { cookies } from "next/headers";

export const getNewAccessToken = async () => {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
        return { success: false, message: "No Refresh Token Found! Please Login Again." };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/refresh-token`, {
        method: "POST",
        headers: {
            Cookie: `refreshToken=${refreshToken}`,
        },
        cache: "no-store",
    });

    const result = await res.json();

    // set new tokens as cookies on success
    if (result?.success && result?.data?.accessToken) {
        cookieStore.set("accessToken", result.data.accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            sameSite: "lax",
        });
        if (result.data.refreshToken) {
            cookieStore.set("refreshToken", result.data.refreshToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 3,
                sameSite: "lax",
            });
        }
    }

    return result;
};
