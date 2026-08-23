"use server";

import { redirect } from "next/navigation";
import { RegisterState } from "./types";
import { UserRole } from "@/types/enums";

export const registerAction = async (prevstate: RegisterState, formData: FormData) => {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const phone = formData.get("phone");
    const role = formData.get("role") || UserRole.CUSTOMER;
    console.log(email, password, name, phone, role);

    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password, name, phone, role })
        });

        const result = await res.json();
        // console.log(result);
        if (result.success) {
            // auto login
            // loginAction(prevstate, formData);
            // redirect to login
            redirect("/auth/login", "replace");
        }

        return result;
    } catch (error) {
        if ((error as Error).message === "NEXT_REDIRECT") {
            throw error;
        };

        return {
            success: false,
            statusCode: 500,
            message: "Something went wrong during registration.",
        };
    }
};