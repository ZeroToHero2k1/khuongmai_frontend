import api from "@/api/axios"
import type { AxiosErrorLike } from "./authService";

export const searchWarehouses = async (name: string, managerName: string, phone: string, page: number) => {
    try {
        const res = await api.get("/warehouse", {
            params: {
                name: name
                , managerName: managerName
                , phone: phone
                , page: page
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

export const deleteWarehouse = async (id: string) => {
    try {
        await api.delete(`/warehouse/${id}`)
    } catch (error: unknown) {
        let message = "Xóa thông tin thất bại";

        const err = error as AxiosErrorLike;
        if (err.response?.data?.message) {
            message = err.response.data.message;
        }

        throw new Error(message);
    }
}

export const createWarehouse=async (name: string, location: string, managerName: string, phone: string)=>{
    try{
        await api.post("/warehouse",{
            name, location,managerName,phone
        })
    }catch (error: unknown) {
        let message = "Tạo thông tin thất bại";

        const err = error as AxiosErrorLike;
        if (err.response?.data?.message) {
            message = err.response.data.message;
        }

        throw new Error(message);
    }
}

export const getWarehouseById=async(id: string)=>{
    try {
        const res= await api.get(`/warehouse/${id}`)
        return res.data;
    } catch (error: unknown) {
        let message = "Tìm thông tin thất bại";

        const err = error as AxiosErrorLike;
        if (err.response?.data?.message) {
            message = err.response.data.message;
        }

        throw new Error(message);
    }
}

export const updateWarehouse=async(id: string,name: string, location: string, managerName: string, phone: string)=>{
    try{
        await api.put(`/warehouse/${id}`,{
            name, location,managerName,phone
        })
    }catch (error: unknown) {
        let message = "Tạo thông tin thất bại";

        const err = error as AxiosErrorLike;
        if (err.response?.data?.message) {
            message = err.response.data.message;
        }

        throw new Error(message);
    }
}