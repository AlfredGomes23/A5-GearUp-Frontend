import { ICategory, IListRes } from "@/types/types";

export const getCategories = async (): Promise<IListRes<ICategory>> => {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/category?page=1&limit=50`, {
        cache: "no-store",
    });

    const result = await res.json();

    return { ...result, data: result?.data ?? [] };
};
