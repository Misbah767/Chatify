import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  login,
  register,
  logoutThunk,
  refreshTokenThunk,
  verifyAccountOtp,
  resendAccountOtp,
  forgotPassword,
  verifyResetOtp,
  resendResetOtp,
  resetPassword,
} from "../actions/auth.actions";
import { setAxiosToken } from "@/services/axios";
import { RootState } from "../store";

/* ================= TYPES ================= */

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  name?: string;
}

interface User {
  _id?: string;
  name?: string;
  email?: string;
  [key: string]: any;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  initializing: boolean;

  loginLoading: boolean;
  registerLoading: boolean;
  verifyOtpLoading: boolean;
  resendOtpLoading: boolean;
  forgotLoading: boolean;
  resetLoading: boolean;

  formErrors: FormErrors;
  error: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: AuthState = {
  user: null,
  accessToken: null,
  initializing: true,

  loginLoading: false,
  registerLoading: false,
  verifyOtpLoading: false,
  resendOtpLoading: false,
  forgotLoading: false,
  resetLoading: false,

  formErrors: {},
  error: null,
};

/* ================= HELPERS ================= */

const saveAuthToStorage = (user: User | null, token: string | null) => {
  if (typeof window === "undefined") return;

  if (user) localStorage.setItem("user", JSON.stringify(user));
  if (token) localStorage.setItem("accessToken", token);
};

const clearStorage = () => {
  if (typeof window !== "undefined") {
    localStorage.clear();
  }
};

/* ================= SLICE ================= */

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; accessToken: string }>
    ) => {
      const { user, accessToken } = action.payload;

      state.user = user;
      state.accessToken = accessToken;
      state.initializing = false;

      setAxiosToken(accessToken);
      saveAuthToStorage(user, accessToken);
    },

    hydrateFromStorage: (state) => {
      if (typeof window !== "undefined") {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("accessToken");

        state.user = user ? JSON.parse(user) : null;
        state.accessToken = token || null;
        state.initializing = false;

        if (token) setAxiosToken(token);
      }
    },

    clearError: (state) => {
      state.error = null;
      state.formErrors = {};
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.initializing = false;

      setAxiosToken(null);
      clearStorage();
    },
  },

  extraReducers: (builder) => {
    builder
      /* ================= LOGIN ================= */
      .addCase(login.pending, (state) => {
        state.loginLoading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<{ user: User; accessToken: string }>) => {
          const { user, accessToken } = action.payload;

          state.loginLoading = false;
          state.user = user;
          state.accessToken = accessToken;
          state.initializing = false;

          setAxiosToken(accessToken);
          saveAuthToStorage(user, accessToken);
        }
      )
      .addCase(login.rejected, (state, action: any) => {
        state.loginLoading = false;
        state.initializing = false;
        state.error = action.payload || "Login failed";
      })

      /* ================= REGISTER ================= */
      .addCase(register.pending, (state) => {
        state.registerLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.registerLoading = false;
      })
      .addCase(register.rejected, (state, action: any) => {
        state.registerLoading = false;
        state.error = action.payload || "Registration failed";
      })

      /* ================= REFRESH TOKEN ================= */
      .addCase(refreshTokenThunk.pending, () => {})
      .addCase(refreshTokenThunk.fulfilled, (state, action: any) => {
        const token = action.payload.accessToken;

        state.accessToken = token;
        state.initializing = false;

        setAxiosToken(token);

        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", token);
        }
      })
      .addCase(refreshTokenThunk.rejected, (state) => {
        state.user = null;
        state.accessToken = null;
        state.initializing = false;

        setAxiosToken(null);
        clearStorage();
      })

      /* ================= LOGOUT ================= */
      .addCase(logoutThunk.fulfilled, () => initialState)

      /* ================= VERIFY ACCOUNT OTP ================= */
      .addCase(verifyAccountOtp.pending, (state) => {
        state.verifyOtpLoading = true;
      })
      .addCase(verifyAccountOtp.fulfilled, (state) => {
        state.verifyOtpLoading = false;
      })
      .addCase(verifyAccountOtp.rejected, (state, action: any) => {
        state.verifyOtpLoading = false;
        state.error = action.payload || "OTP verification failed";
      })

      /* ================= RESEND ACCOUNT OTP ================= */
      .addCase(resendAccountOtp.pending, (state) => {
        state.resendOtpLoading = true;
      })
      .addCase(resendAccountOtp.fulfilled, (state) => {
        state.resendOtpLoading = false;
      })
      .addCase(resendAccountOtp.rejected, (state, action: any) => {
        state.resendOtpLoading = false;
        state.error = action.payload || "Resend OTP failed";
      })

      /* ================= FORGOT PASSWORD ================= */
      .addCase(forgotPassword.pending, (state) => {
        state.forgotLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.forgotLoading = false;
      })
      .addCase(forgotPassword.rejected, (state, action: any) => {
        state.forgotLoading = false;
        state.error = action.payload || "Forgot password failed";
      })

      /* ================= VERIFY RESET OTP ================= */
      .addCase(verifyResetOtp.pending, (state) => {
        state.verifyOtpLoading = true;
      })
      .addCase(verifyResetOtp.fulfilled, (state) => {
        state.verifyOtpLoading = false;
      })
      .addCase(verifyResetOtp.rejected, (state, action: any) => {
        state.verifyOtpLoading = false;
        state.error = action.payload || "Reset OTP verification failed";
      })

      /* ================= RESEND RESET OTP ================= */
      .addCase(resendResetOtp.pending, (state) => {
        state.resendOtpLoading = true;
      })
      .addCase(resendResetOtp.fulfilled, (state) => {
        state.resendOtpLoading = false;
      })
      .addCase(resendResetOtp.rejected, (state, action: any) => {
        state.resendOtpLoading = false;
        state.error = action.payload || "Resend reset OTP failed";
      })

      /* ================= RESET PASSWORD ================= */
      .addCase(resetPassword.pending, (state) => {
        state.resetLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.resetLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action: any) => {
        state.resetLoading = false;
        state.error = action.payload || "Password reset failed";
      });
  },
});

/* ================= EXPORTS ================= */

export const { setCredentials, logout, clearError, hydrateFromStorage } =
  authSlice.actions;

/* ================= SELECTORS ================= */

export const selectUser = (state: RootState) => state.auth.user;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectAuthLoading = (state: RootState) => state.auth.loginLoading;

/* ================= REDUCER ================= */

export default authSlice.reducer;