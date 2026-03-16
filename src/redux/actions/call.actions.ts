// frontend/actions/call.actions.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { callService } from "@/services/callService";

/* ================= GET CALL HISTORY ================= */
export const fetchCallHistory = createAsyncThunk(
  "calls/fetchHistory",
  async (
    params: {
      userId: string;
      type?: "audio" | "video";
      status?: "ongoing" | "ended" | "missed" | "rejected";
      limit?: number;
      skip?: number;
    },
    { rejectWithValue }
  ) => {
    try {
      return await callService.getCallHistory(params.userId, {
        type: params.type,
        status: params.status,
        limit: params.limit,
        skip: params.skip,
      });
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch call history"
      );
    }
  }
);
