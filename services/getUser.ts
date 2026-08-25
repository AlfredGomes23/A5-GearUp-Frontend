"use server";

import { getAccessToken } from "./getAccessToken";

export const getUser = async () => {
    const accessToken = await getAccessToken();

    if (!accessToken) {
        return { success: false, message: "User Not Logged In!" };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/me`, {
        headers: {
            Cookie: `accessToken=${accessToken}`,
        },
        cache: "no-store",
    });

    const result = await res.json();
    return result;
};
