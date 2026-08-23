"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export default async function logout() {
    const cookieStore = await cookies();
    // clear token
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    
    revalidateTag("my-profule", "max");
};