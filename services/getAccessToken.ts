"use server";
import { cookies } from "next/headers";
import { getNewAccessToken } from "./getNewAccessToken";

export const getAccessToken = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || await getNewAccessToken();
    // if access token is expaired
    // if (!accessToken) {
    //     // refresh access token
    //     accessToken = await getNewAccessToken();
    //     // for failed refresh access token
    //     if (!accessToken) {
    //         // throw new Error("User Not Logged In!");
    //         return { success: false, message: "User Not Logged In!" }
    //     };
    // };

    // refresh access token if expired
    // accessToken || (accessToken = await getNewAccessToken());

    // for failed refresh access token
    if (!accessToken) {
        return { success: false, message: "User Not Logged In!" }
    };

    return accessToken;
}