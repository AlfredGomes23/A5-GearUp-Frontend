"use server";

import { getAccessToken } from "./getAccessToken";

export const getUser = async () => {

    // get access token
    const accessToken = await getAccessToken();
    // console.log(accessToken);

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/me`, {
        headers: {
            Cookie: `accessToken=${accessToken}`
        },
        cache: "force-cache",
        next: { revalidate: 60 * 60 * 24, tags: ["me"] }
    });

    const result = await res.json();

    // console.log(result);

    return result;
};