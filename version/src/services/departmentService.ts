
import type { AxiosErrorLike } from "./authService";
import api from "@/api/axios";

export const searchByDepartmentName = async (departmentName: string) => {
    try {
        const res = await api.get("/department", {
            params: {
                keyword: departmentName,
                page: 0
            }
        })
        return res.data.result;
    } catch (error: unknown) {
        let message = "Lấy thông tin thất bại";

        const err = error as AxiosErrorLike;
        if (err.response?.data?.message) {
            message = err.response.data.message;
        }

        throw new Error(message);
    }
}