import axios from "axios";
import { setAccessToken } from "@/utils/auth";
import api from "@/api/axios";
import type { UpdateMyInfoRequest } from "@/models";

interface AuthResponse {
    result: {
        token: string;
    };
    message?: string;
}
export type AxiosErrorLike = {
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
    } catch (error: unknown) {
        let message = "Đăng nhập thất bại";
        const err = error as AxiosErrorLike;
        if (err.response?.data?.message) {
            message = err.response.data.message;
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


export const logOut = async (token: string) => {
    try {
        const res = await axios.post<AuthResponse>("http://localhost:8080/khuongmai/auth/logout", {
            token
        });

        const message = res.data.message;
        return message;
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

export const getMyInfo = async () => {
    try {
        const res = await api.get("/user/myinfo");
        return res.data.result;
    }
    catch (error: unknown) {
        let message = "Lấy thông tin thất bại";

        const err = error as AxiosErrorLike;
        if (err.response?.data?.message) {
            message = err.response.data.message;
        }

        throw new Error(message);
    }
}

export const updateMyInfo = async (data: UpdateMyInfoRequest, file?: File) => {
    const formData = new FormData();

    formData.append("myinfo", JSON.stringify(data));

    if (file) {
        formData.append("image", file);
    }
    try {
        const rest = await api.post("auth/updateinfo", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        return rest.data;
    } catch (error: unknown) {
        let message = "Sửa thông tin thất bại";

        const err = error as AxiosErrorLike;
        if (err.response?.data?.message) {
            message = err.response.data.message;
        }

        throw new Error(message);
    }

}