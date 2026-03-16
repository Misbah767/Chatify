import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import {
  getAccessToken,
  setAccessToken,
  clearAccessToken,
} from "@/redux/store/tokenStore";

/* ================= BASE URL ================= */

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* ================= AXIOS INSTANCE ================= */

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // refresh token cookie
  headers: {
    "Content-Type": "application/json",
  },
});

/* ================= REFRESH INSTANCE ================= */

const refreshApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

/* ================= REFRESH STATE ================= */

let isRefreshing = false;

type QueueItem = {
  resolve: (token: string) => void;
  reject: (err: any) => void;
};

let failedQueue: QueueItem[] = [];

/* ================= QUEUE PROCESS ================= */

const processQueue = (error: any, token: string | null) => {
  failedQueue.forEach((p) => {
    if (error) {
      p.reject(error);
    } else {
      p.resolve(token!);
    }
  });

  failedQueue = [];
};

/* ================= REQUEST INTERCEPTOR ================= */

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* ================= RESPONSE INTERCEPTOR ================= */

api.interceptors.response.use(
  (response: AxiosResponse) => response,

  async (error: AxiosError<any>) => {
    const originalRequest: any = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh-token")
    ) {
      originalRequest._retry = true;

      /* ================= IF ALREADY REFRESHING ================= */

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      isRefreshing = true;

      try {
        /* ================= CALL REFRESH TOKEN ================= */

        const res = await refreshApi.post("/auth/refresh-token");

        const newAccessToken = res.data?.data?.accessToken;

        if (!newAccessToken) throw new Error("Access token missing");

        setAccessToken(newAccessToken);

        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);

        clearAccessToken();

        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
