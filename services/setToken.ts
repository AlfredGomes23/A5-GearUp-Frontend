import { cookies } from "next/headers";

export const setToken = async ( name: string, value: string, maxAge: number ) => {
    const cookieStore = await cookies();
    cookieStore.set(name, value, {
            httpOnly: true,
            maxAge: maxAge,
            sameSite: "lax",
        });
}