import { verifyJwtToken } from "@/utils/jwt";
import { getNewAccessToken } from "./getNewAccessToken";
import { setToken } from "./setToken";
import { IUser } from "@/types/types";
import { RequestCookies } from "next/dist/server/web/spec-extension/cookies";

export const verifyReqUser = async (cookies: RequestCookies) => {
    // console.log(cookies);
    
    // get tokens from req
    let accessToken = cookies.get('accessToken')?.value;

    // verify token
    let decodedAccessToken = accessToken ? verifyJwtToken(accessToken, process.env.JWT_ACCESS_SECRET as string) : null;

    // refresh access token when access token expired
    // backend validates refresh token; if refresh also expired it rejects -> auto logout
    if (!decodedAccessToken?.success) {
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