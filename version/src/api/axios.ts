import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { getAccessToken, isHetHanToken,setAccessToken } from "@/utils/auth";

const api=axios.create({
    // baseURL:"https://khuongmaibackend-production.up.railway.app",
    baseURL:"http://localhost:8080/khuongmai",
});
interface AuthResponse {
  code: number;
  result: {
    token: string;
    authenticated: boolean;
  };
}

// Interceptor xử lý token hết hạn
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    let token = getAccessToken();

    if (token && isHetHanToken(token)) {
      try {
        const res = await axios.post<AuthResponse>("http://localhost:8080/khuongmai/auth/refresh", {
          token,
        });
        token = res.data.result.token;
        setAccessToken(token);
      } catch {
        window.location.href = "/login";
        return Promise.reject("Token hết hạn và không thể refresh");
      }
    }

    config.headers = config.headers || {};
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  }
);

export default api;