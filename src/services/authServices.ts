import api from "./axios";

export const authServices = {
  /* ================= REGISTER ================= */
  register: async (data: { name: string; email: string; password: string }) => {
    const res = await api.post("/auth/register", data);
    return res.data;
  },

  /* ================= LOGIN ================= */
  login: async (data: { email: string; password: string }) => {
    const res = await api.post("/auth/login", data);
    return res.data.data;
    // { user, accessToken, refreshToken }
  },

  /* ================= LOGOUT ================= */
  logout: async () => {
    const res = await api.post("/auth/logout");
    return res.data;
  },

  /* ================= REFRESH TOKEN ================= */
  refreshToken: async () => {
    const res = await api.post("/auth/refresh-token");
    return res.data.data;
    // { accessToken, refreshToken }
  },

  /* ================= VERIFY ACCOUNT OTP ================= */
  verifyAccountOtp: async (data: { email: string; otp: string }) => {
    const res = await api.post("/auth/verify-account-otp", data);
    return res.data;
  },

  /* ================= RESEND ACCOUNT OTP ================= */
  resendAccountOtp: async (data: { email: string }) => {
    const res = await api.post("/auth/resend-account-otp", data);
    return res.data;
  },

  /* ================= FORGOT PASSWORD ================= */
  forgotPassword: async (data: { email: string }) => {
    const res = await api.post("/auth/forgot-password", data);
    return res.data;
  },

  /* ================= VERIFY RESET OTP ================= */
  verifyResetOtp: async (data: { email: string; otp: string }) => {
    const res = await api.post("/auth/verify-reset-otp", data);
    return res.data;
  },

  /* ================= RESEND RESET OTP ================= */
  resendResetOtp: async (data: { email: string }) => {
    const res = await api.post("/auth/resend-reset-otp", data);
    return res.data;
  },

  /* ================= RESET PASSWORD ================= */
  resetPassword: async (data: {
    email: string;
    otp: string;
    password: string;
  }) => {
    const res = await api.post("/auth/reset-password", data);
    return res.data;
  },
};
