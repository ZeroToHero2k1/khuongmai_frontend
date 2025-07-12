import axios from "axios";
import { setAccessToken } from "@/utils/auth";
import api from "@/api/axios";

interface AuthResponse {
    result: {
        token: string;
    };
}
type AxiosErrorLike = {
    response?: {
        data?: {
            message?: string;
        };
    };
};

export const login = async (username: string, password: string) => {
    try {
        const res = await axios.post<AuthResponse>(
            "http://localhost:8080/khuongmai/auth/token",
            // "https://khuongmaibackend-production.up.railway.app/khuongmai/auth/token",
            {
                username,
                password
            }
        );

        const token = res.data.result.token;
        setAccessToken(token);
        return token;
    }catch(error: unknown){
        let message = "Đăng nhập thất bại";
        const err = error as AxiosErrorLike;
        if(err.response?.data?.message){
            message=err.response.data.message;
        }

        throw new Error(message);
    }
};

export const signUp = async (name: string, phone: string, username: string, password: string) => {
    try {
        const res = await axios.post<AuthResponse>("http://localhost:8080/khuongmai/auth/sign", {
            name,
            phone,
            username,
            password
        })

        const token = res.data.result.token;
        setAccessToken(token);
        return token;
    } catch (error: unknown) {
        let message = "Đăng ký thất bại";

        const err = error as AxiosErrorLike;
        if (err.response?.data?.message) {
            message = err.response.data.message;
        }

        throw new Error(message);
    }
}






































export const getMyInfo=async ()=>{
    try{
        const res=await api.get("/user/myinfo");
        return res.data.result;
    }
    catch (error: unknown) {
        let message = "Đăng ký thất bại";

        const err = error as AxiosErrorLike;
        if (err.response?.data?.message) {
            message = err.response.data.message;
        }

        throw new Error(message);
    }
}