
import { IUser } from "@/types/types";
import jwt, { JwtPayload } from "jsonwebtoken";

export const verifyJwtToken = (token: string, secret: string) => {
    try {
        const verifiedToken = jwt.verify(token, secret);
        return { success: true, data: verifiedToken as JwtPayload };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        // console.log(error);
        return { success: false, error: error.message };
    }
};

export const decodeToken = (token: string) => {
    // console.log(token);
    return jwt.decode(token) as IUser;
}