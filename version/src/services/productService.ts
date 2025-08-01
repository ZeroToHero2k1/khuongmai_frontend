import api from "@/api/axios"
import type { AxiosErrorLike } from "./authService";

export const searchProducts = async (name: string, page: number) => {
    try {
        const res = await api.get("/product", {
            params: {
                keyword: name,
                page: page
            }
        })
        return res.data;
    } catch (error: unknown) {
        let message = "Lấy thông tin thất bại";

        const err = error as AxiosErrorLike;
        if (err.response?.data?.message) {
            message = err.response.data.message;
        }

        throw new Error(message);
    }
}
