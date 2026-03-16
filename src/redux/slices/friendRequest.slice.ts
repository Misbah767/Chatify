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

export interface FriendRequest {
  _id: string;
  from: { _id: string; name: string; email?: string; profilePic?: string };
  to: { _id: string; name: string; email?: string; profilePic?: string };
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

const initialState: FriendRequestState = {
  incoming: [],
  sent: [],
  relationshipStatuses: {},
  loading: false,
  error: null,
};

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
      state.relationshipStatuses[action.payload.userId] = action.payload.status;
    },
  },

  extraReducers: (builder) => {
    /* ================= SEND FRIEND REQUEST ================= */
    builder
      .addCase(sendFriendRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        sendFriendRequest.fulfilled,
        (state, action: PayloadAction<FriendRequest>) => {
          state.loading = false;
          state.sent.push(action.payload);

          if (action.payload.to?._id) {
            state.relationshipStatuses[action.payload.to._id] = "pending";
          }
        }
      )
      .addCase(sendFriendRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    /* ================= RESPOND FRIEND REQUEST ================= */
    builder
      .addCase(respondFriendRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        respondFriendRequest.fulfilled,
        (state, action: PayloadAction<FriendRequest>) => {
          const req = action.payload;
          state.loading = false;

          const index = state.incoming.findIndex(
            (r: FriendRequest) => r._id === req._id
          );

          if (index >= 0) state.incoming[index] = req;

          state.relationshipStatuses[req.from._id] = req.status;
          state.relationshipStatuses[req.to._id] = req.status;
        }
      )
      .addCase(respondFriendRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    /* ================= CANCEL FRIEND REQUEST ================= */
    builder
      .addCase(cancelFriendRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        cancelFriendRequest.fulfilled,
        (state, action: PayloadAction<{ requestId: string }>) => {
          state.loading = false;

          const canceledRequest = state.sent.find(
            (r: FriendRequest) => r._id === action.payload.requestId
          );

          if (canceledRequest) {
            state.relationshipStatuses[canceledRequest.to._id] = "none";
          }

          state.sent = state.sent.filter(
            (r: FriendRequest) => r._id !== action.payload.requestId
          );
        }
      )
      .addCase(cancelFriendRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    /* ================= FETCH INCOMING REQUESTS ================= */
    builder.addCase(fetchIncomingRequests.fulfilled, (state, action) => {
      state.loading = false;
      state.incoming = action.payload;

      action.payload.forEach((r: FriendRequest) => {
        state.relationshipStatuses[r.from._id] = r.status;
      });
    });

    /* ================= FETCH SENT REQUESTS ================= */
    builder.addCase(fetchSentRequests.fulfilled, (state, action) => {
      state.loading = false;
      state.sent = action.payload;

      action.payload.forEach((r: FriendRequest) => {
        state.relationshipStatuses[r.to._id] = r.status;
      });
    });

    /* ================= FETCH FRIEND STATUS ================= */
    builder.addCase(fetchFriendStatus.fulfilled, (state, action) => {
      state.loading = false;
      state.relationshipStatuses[action.payload.userId] = action.payload.status;
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

export const { clearFriendRequestState, clearError, setRelationshipStatus } =
  friendRequestSlice.actions;

export default friendRequestSlice.reducer;
