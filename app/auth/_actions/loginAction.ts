"use server";

import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LoginState } from "./types";
import { UserRole } from "@/types/enums";

export const loginAction = async ( redirectTo: string, prevstate: LoginState, formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");
    // console.log(email, password, `${process.env.BACKEND_API_URL}/api/auth/login`);

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    const result = await res.json();
    // console.log(result);

    // set the cookie
    if (result.success) {
        const cookieStore = await cookies();

        cookieStore.set("accessToken", result?.data?.accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            sameSite: "lax",
        });
        cookieStore.set("refreshToken", result?.data?.refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 3,
            sameSite: "lax",
        });

        if( redirectTo && typeof redirectTo === "string" && redirectTo.startsWith('/') && ! redirectTo.startsWith('//')){
            redirect(redirectTo, "replace");
        }

        // redirect route based on user role
        const decodedToken = await jwt.decode(result?.data?.accessToken) as JwtPayload;
        // console.log(decodedToken);
        if (decodedToken.role === UserRole.CUSTOMER) {
            redirect("/dashboard/customer", "replace"); // default is "push"
        } else if (decodedToken.role === UserRole.ADMIN) {
            redirect("/dashboard/admin", "replace");
        } else if (decodedToken.role === UserRole.PROVIDER) {
            redirect("/dashboard/provider", "replace");
        }
        // console.log("Not");

    };
    return result;
};
