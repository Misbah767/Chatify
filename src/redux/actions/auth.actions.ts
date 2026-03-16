import { createAsyncThunk } from "@reduxjs/toolkit";
import { authServices } from "@/services/authServices";

/* ================= REGISTER ================= */
export const register = createAsyncThunk(
  "auth/register",
  async (
    data: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      return await authServices.register(data);
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || "Register failed");
    }
  }
);

/* ================= LOGIN ================= */
export const login = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await authServices.login(data);
      return res; // { user, accessToken, refreshToken }
    } catch (e: any) {
      return rejectWithValue(
        e.response?.data?.message || "Invalid credentials"
      );
    }
  }
);

/* ================= LOGOUT ================= */
export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      return await authServices.logout();
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || "Logout failed");
    }
  }
);

/* ================= REFRESH TOKEN ================= */
export const refreshTokenThunk = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const res = await authServices.refreshToken();
      return res; // { accessToken, refreshToken }
    } catch {
      return rejectWithValue("Session expired");
    }
  }
);

/* ================= VERIFY ACCOUNT OTP ================= */
export const verifyAccountOtp = createAsyncThunk(
  "auth/verifyAccountOtp",
  async (data: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      return await authServices.verifyAccountOtp(data);
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || "Invalid OTP");
    }
  }
);

/* ================= RESEND ACCOUNT OTP ================= */
export const resendAccountOtp = createAsyncThunk(
  "auth/resendAccountOtp",
  async (data: { email: string }, { rejectWithValue }) => {
    try {
      return await authServices.resendAccountOtp(data);
    } catch (e: any) {
      return rejectWithValue(
        e.response?.data?.message || "Failed to resend OTP"
      );
    }
  }
);

/* ================= FORGOT PASSWORD ================= */
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (data: { email: string }, { rejectWithValue }) => {
    try {
      return await authServices.forgotPassword(data);
    } catch (e: any) {
      return rejectWithValue(
        e.response?.data?.message || "Failed to send reset OTP"
      );
    }
  }
);

/* ================= VERIFY RESET OTP ================= */
export const verifyResetOtp = createAsyncThunk(
  "auth/verifyResetOtp",
  async (data: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      return await authServices.verifyResetOtp(data);
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || "Invalid reset OTP");
    }
  }
);

/* ================= RESEND RESET OTP ================= */
export const resendResetOtp = createAsyncThunk(
  "auth/resendResetOtp",
  async (data: { email: string }, { rejectWithValue }) => {
    try {
      return await authServices.resendResetOtp(data);
    } catch (e: any) {
      return rejectWithValue(
        e.response?.data?.message || "Failed to resend reset OTP"
      );
    }
  }
);

/* ================= RESET PASSWORD ================= */
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (
    data: {
      email: string;
      otp: string;
      password: string;
      confirmPassword: string;
    },
    { rejectWithValue }
  ) => {
    try {
      return await authServices.resetPassword(data);
    } catch (e: any) {
      return rejectWithValue(
        e.response?.data?.message || "Password reset failed"
      );
    }
  }
);
