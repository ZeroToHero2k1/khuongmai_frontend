import api from "@/api/axios"
import type { AxiosErrorLike } from "./authService";

export const getEmployees = async (keyword: string, phone: string, departmentId: string, datejoin: string, page: number, status?: boolean|null) => {
    try {
        const res = await api.get("/employee", {
            params: {
                fullName: keyword,
                phone: phone,
                departmentId: departmentId,
                dateJoin: datejoin,
                status: status,
                page: page
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

export const deleteEmployee=async(id:string)=>{
    try{
        const res = await api.delete(`/employee/${id}`)
        return res.data.message;
    }catch (error: unknown) {
        let message = "Lấy thông tin thất bại";

        const err = error as AxiosErrorLike;
        if (err.response?.data?.message) {
            message = err.response.data.message;
        }

        throw new Error(message);
    }
}

export const getEmployeeById=async(id:string)=>{
    try{
        const res= await api.get(`/employee/${id}`)
        return res.data.result;
    }catch (error: unknown) {
        let message = "Lấy thông tin thất bại";

        const err = error as AxiosErrorLike;
        if (err.response?.data?.message) {
            message = err.response.data.message;
        }

        throw new Error(message);
    }
}

export const updateEmployee=async(id: string,name: string,phone: string, departmentId: string,dateJoined:string, status?: boolean|null)=>{
    try{
        const res=await api.put(`/employee/${id}`,{
            name,phone,departmentId,dateJoined,status
        })
        return res.data.result;
    }catch (error: unknown) {
        let message = "Cập nhật thông tin thất bại";

        const err = error as AxiosErrorLike;
        if (err.response?.data?.message) {
            message = err.response.data.message;
        }

        throw new Error(message);
        
    }
}
