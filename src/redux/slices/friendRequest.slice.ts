"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import {
  sendFriendRequest,
  respondFriendRequest,
  cancelFriendRequest,
  fetchIncomingRequests,
  fetchSentRequests,
  fetchFriendStatus,
} from "../actions/friendRequest.actions";

/* ================= TYPES ================= */

export interface FriendRequest {
  _id: string;
  from?: {
    _id?: string;
    name?: string;
    email?: string;
    profilePic?: string;
  };
  to?: {
    _id?: string;
    name?: string;
    email?: string;
    profilePic?: string;
  };
  status: "pending" | "accepted" | "rejected";
}

interface FriendRequestState {
  incoming: FriendRequest[];
  sent: FriendRequest[];
  relationshipStatuses: Record<
    string,
    "none" | "pending" | "accepted" | "rejected"
  >;
  loading: boolean;
  error: string | null;
}

/* ================= STATE ================= */

const initialState: FriendRequestState = {
  incoming: [],
  sent: [],
  relationshipStatuses: {},
  loading: false,
  error: null,
};

/* ================= SLICE ================= */

const friendRequestSlice = createSlice({
  name: "friendRequest",
  initialState,
  reducers: {
    clearFriendRequestState(state) {
      state.incoming = [];
      state.sent = [];
      state.relationshipStatuses = {};
      state.loading = false;
      state.error = null;
    },

    clearError(state) {
      state.error = null;
    },

    setRelationshipStatus(
      state,
      action: PayloadAction<{
        userId: string;
        status: "none" | "pending" | "accepted" | "rejected";
      }>
    ) {
      const { userId, status } = action.payload || {};
      if (!userId) return;

      state.relationshipStatuses[userId] = status;
    },
  },

  extraReducers: (builder) => {
    /* ================= SEND REQUEST ================= */
    builder.addCase(sendFriendRequest.fulfilled, (state, action) => {
      const req = action.payload;
      if (!req) return;

      state.sent.push(req);

      const toId = req?.to?._id;
      if (toId) state.relationshipStatuses[toId] = "pending";
    });

    builder.addCase(sendFriendRequest.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    /* ================= RESPOND REQUEST ================= */
    builder.addCase(respondFriendRequest.fulfilled, (state, action) => {
      const req = action.payload;
      if (!req?._id) return;

      state.incoming = state.incoming.filter((r) => r?._id !== req._id);

      const fromId = req?.from?._id;
      const toId = req?.to?._id;

      if (fromId) state.relationshipStatuses[fromId] = req.status;
      if (toId) state.relationshipStatuses[toId] = req.status;
    });

    /* ================= CANCEL REQUEST ================= */
    builder.addCase(cancelFriendRequest.fulfilled, (state, action) => {
      const requestId = action.payload?.requestId;
      if (!requestId) return;

      const canceled = state.sent.find((r) => r?._id === requestId);

      if (canceled?.to?._id) {
        state.relationshipStatuses[canceled.to._id] = "none";
      }

      state.sent = state.sent.filter((r) => r?._id !== requestId);
    });

    /* ================= FETCH INCOMING ================= */
    builder.addCase(fetchIncomingRequests.fulfilled, (state, action) => {
      const data: FriendRequest[] = action.payload || [];

      state.incoming = data;

      data.forEach((r: FriendRequest) => {
        const id = r?.from?._id;
        if (id) state.relationshipStatuses[id] = r.status;
      });
    });

    /* ================= FETCH SENT ================= */
    builder.addCase(fetchSentRequests.fulfilled, (state, action) => {
      const data: FriendRequest[] = action.payload || [];

      state.sent = data;

      data.forEach((r: FriendRequest) => {
        const id = r?.to?._id;
        if (id) state.relationshipStatuses[id] = r.status;
      });
    });

    /* ================= STATUS ================= */
    builder.addCase(fetchFriendStatus.fulfilled, (state, action) => {
      const { userId, status } = action.payload || {};
      if (!userId || !status) return;

      state.relationshipStatuses[userId] = status;
    });
  },
});

/* ================= SELECTORS ================= */

export const selectIncomingRequests = (state: RootState) =>
  state.friendRequest.incoming;

export const selectSentRequests = (state: RootState) =>
  state.friendRequest.sent;

export const selectFriendRequestLoading = (state: RootState) =>
  state.friendRequest.loading;

export const selectFriendRequestError = (state: RootState) =>
  state.friendRequest.error;

export const selectRelationshipStatusByUser =
  (userId: string) => (state: RootState) =>
    state.friendRequest.relationshipStatuses[userId] || "none";

/* ================= EXPORT ================= */

export const { clearFriendRequestState, clearError, setRelationshipStatus } =
  friendRequestSlice.actions;

export default friendRequestSlice.reducer;
