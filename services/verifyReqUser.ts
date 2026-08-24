import { verifyJwtToken } from "@/utils/jwt";
import { getNewAccessToken } from "./getNewAccessToken";
import { setToken } from "./setToken";
import { IUser } from "@/types/types";
import { RequestCookies } from "next/dist/server/web/spec-extension/cookies";

export const verifyReqUser = async (cookies: RequestCookies) => {
    // console.log(cookies);
    
    // get tokens from req
    let accessToken = cookies.get('accessToken')?.value;
    const refreshToken = cookies.get('refreshToken')?.value;

    // verify tokens
    let decodedAccessToken = accessToken ? verifyJwtToken(accessToken, process.env.JWT_ACCESS_SECRET as string) : null;

    const decodedRefreshToken = refreshToken ? verifyJwtToken(refreshToken, process.env.JWT_REFRESH_SECRET as string) : null;

    // refresh access token
    if (!decodedAccessToken?.success && !decodedRefreshToken?.success) {
        const result = await getNewAccessToken();
        // update access token
        if (result?.success) {
            accessToken = result?.data?.accessToken as string;
            await setToken("accessToken", accessToken, 60 * 60 * 24 * 7);

            decodedAccessToken = verifyJwtToken(accessToken, process.env.JWT_ACCESS_SECRET as string);
        };
    };
    return decodedAccessToken?.data as IUser;
}