// services/axios.ts
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";

/* ================= MAIN API ================= */
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

/* ================= REFRESH API ================= */
const refreshApi = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

/* ================= TOKEN MEMORY ================= */
let accessToken: string | null = null;
let isRefreshing = false;

type QueueItem = {
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
};

let failedQueue: QueueItem[] = [];

/* ================= GET / SET ACCESS TOKEN ================= */
export const getAccessToken = () => {
  if (!accessToken && typeof window !== "undefined") {
    accessToken = localStorage.getItem("accessToken");
  }
  return accessToken;
};

export const setAxiosToken = (token: string | null) => {
  accessToken = token;

  if (typeof window !== "undefined") {
    if (token) localStorage.setItem("accessToken", token);
    else localStorage.removeItem("accessToken");
  }

  // Update axios default headers
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete api.defaults.headers.common["Authorization"];
};

/* ================= QUEUE PROCESS ================= */
const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else if (token) p.resolve(token);
  });
  failedQueue = [];
};

/* ================= REQUEST INTERCEPTOR ================= */
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers = config.headers || ({} as AxiosRequestHeaders);
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
    if (!error.config) return Promise.reject(error);

    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Only retry once per request
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh-token")
    ) {
      originalRequest._retry = true;

      // Queue if a refresh is already in progress
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers =
            originalRequest.headers || ({} as AxiosRequestHeaders);
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      isRefreshing = true;

      try {
        const res = await refreshApi.post("/auth/refresh-token");
        const newAccessToken = res.data?.data?.accessToken;

        if (!newAccessToken) throw new Error("No access token returned");

        // Save & set token
        setAxiosToken(newAccessToken);
        processQueue(null, newAccessToken);

        // Retry original request
        originalRequest.headers =
          originalRequest.headers || ({} as AxiosRequestHeaders);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);

        setAxiosToken(null);

        if (typeof window !== "undefined") {
          localStorage.clear();
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
