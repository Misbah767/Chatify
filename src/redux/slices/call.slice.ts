"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { fetchCallHistory } from "../actions/call.actions";

export interface CallRecord {
  _id: string;
  caller: { _id: string; name: string };
  receiver: { _id: string; name: string };
  type: "audio" | "video";
  status: "ongoing" | "ended" | "missed" | "rejected";
  startedAt: string;
  endedAt?: string;
  duration?: number;
}

interface CallState {
  history: CallRecord[];
  loading: boolean;
  error: string | null;
}

const initialState: CallState = {
  history: [],
  loading: false,
  error: null,
};

const callSlice = createSlice({
  name: "calls",
  initialState,
  reducers: {
    clearCallHistory(state) {
      state.history = [];
      state.loading = false;
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* FETCH CALL HISTORY */
      .addCase(fetchCallHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchCallHistory.fulfilled,
        (state, action: PayloadAction<CallRecord[]>) => {
          state.loading = false;
          state.history = action.payload;
        }
      )
      .addCase(fetchCallHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

/* ================= SELECTORS ================= */
export const selectCallHistory = (state: RootState) => state.calls.history;
export const selectCallLoading = (state: RootState) => state.calls.loading;
export const selectCallError = (state: RootState) => state.calls.error;

export const { clearCallHistory, clearError } = callSlice.actions;
export default callSlice.reducer;
