"use server";

import jwt, { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";
import { LoginState } from "./types";
import { UserRole } from "@/types/enums";
import { setToken } from "@/services/setToken";

export const loginAction = async ( redirectTo: string, prevstate: LoginState, formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");
    // console.log(email, password, `${process.env.BACKEND_API_URL}/api/auth/login`);

    const result = await ( await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })).json();
    // console.log(result);

    if (result.success) {
        // set the cookie
        await setToken("accessToken", result?.data?.accessToken, 60 * 60 * 24,);
        await setToken("refreshToken", result?.data?.refreshToken, 60 * 60 * 24 * 3);

        // rediect for public routes
        if( redirectTo && typeof redirectTo === "string" && redirectTo.startsWith('/') && ! redirectTo.startsWith('//')){
            redirect(redirectTo, "replace");
        }

        // redirect to dashboard based on user role
        const decodedToken = await jwt.decode(result?.data?.accessToken) as JwtPayload;
        // console.log(decodedToken);
        if (decodedToken.role === UserRole.CUSTOMER) {
            redirect("/dashboard/customer", "replace"); // default is "push"
        } else if (decodedToken.role === UserRole.ADMIN) {
            redirect("/dashboard/admin", "replace");
        } else if (decodedToken.role === UserRole.PROVIDER) {
            redirect("/dashboard/provider", "replace");
        }
    };
    return result;
};
