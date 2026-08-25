"use server";

import { cookies } from "next/headers";
import { getNewAccessToken } from "./getNewAccessToken";

export const getAccessToken = async () => {
    const cookieStore = await cookies();
    const tokenFromCookie = cookieStore.get("accessToken")?.value;

    if (tokenFromCookie) {
        return tokenFromCookie;
    }

    // access token missing — try refresh
    const refreshResult = await getNewAccessToken();

    // refreshResult is the raw API response object
    if (refreshResult?.success && typeof refreshResult?.data?.accessToken === "string") {
        return refreshResult.data.accessToken;
    }

    return null;
};
