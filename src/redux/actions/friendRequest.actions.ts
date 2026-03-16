import { createAsyncThunk } from "@reduxjs/toolkit";
import { friendRequestService } from "@/services/friendRequestService";

/* ================= SEND REQUEST ================= */

export const sendFriendRequest = createAsyncThunk(
  "friendRequest/send",
  async (toId: string, { rejectWithValue }) => {
    try {
      return await friendRequestService.sendRequest(toId);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to send request"
      );
    }
  }
);

/* ================= RESPOND REQUEST ================= */

export const respondFriendRequest = createAsyncThunk(
  "friendRequest/respond",
  async (
    {
      requestId,
      action,
    }: { requestId: string; action: "accepted" | "rejected" },
    { rejectWithValue }
  ) => {
    try {
      return await friendRequestService.respondRequest(requestId, action);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to respond request"
      );
    }
  }
);

/* ================= CANCEL REQUEST ================= */

export const cancelFriendRequest = createAsyncThunk(
  "friendRequest/cancel",
  async (requestId: string, { rejectWithValue }) => {
    try {
      return await friendRequestService.cancelRequest(requestId);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to cancel request"
      );
    }
  }
);

/* ================= INCOMING REQUESTS ================= */

export const fetchIncomingRequests = createAsyncThunk(
  "friendRequest/incoming",
  async (_, { rejectWithValue }) => {
    try {
      return await friendRequestService.getIncomingRequests();
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch incoming requests"
      );
    }
  }
);

/* ================= SENT REQUESTS ================= */

export const fetchSentRequests = createAsyncThunk(
  "friendRequest/sent",
  async (_, { rejectWithValue }) => {
    try {
      return await friendRequestService.getSentRequests();
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch sent requests"
      );
    }
  }
);

/* ================= FRIEND STATUS ================= */

export const fetchFriendStatus = createAsyncThunk(
  "friendRequest/status",
  async (userId: string, { rejectWithValue }) => {
    try {
      return await friendRequestService.getFriendStatus(userId);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch status"
      );
    }
  }
);
