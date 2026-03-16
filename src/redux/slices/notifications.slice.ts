// frontend/redux/slices/notification.slice.ts
"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import {
  fetchNotifications,
  markNotificationRead,
} from "@/redux/actions/notifications.actions";

export interface Notification {
  _id: string;
  type: string; // message_received | friend_request_received | friend_request_sent | status_change | etc
  message: string;
  relatedUser?: { _id: string; name: string; profilePic?: string };
  requestId?: string;
  isRead: boolean;
  createdAt: string;
}

interface NotificationsState {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
}

const initialState: NotificationsState = {
  notifications: [],
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<Notification>) {
      state.notifications.unshift(action.payload);
    },
    clearNotificationsState(state) {
      state.notifications = [];
      state.loading = false;
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    /* FETCH NOTIFICATIONS */
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchNotifications.fulfilled,
        (state, action: PayloadAction<Notification[]>) => {
          state.loading = false;
          state.notifications = action.payload;
        }
      )
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    /* MARK NOTIFICATION AS READ */
    builder.addCase(
      markNotificationRead.fulfilled,
      (state, action: PayloadAction<Notification>) => {
        const index = state.notifications.findIndex(
          (n) => n._id === action.payload._id
        );
        if (index >= 0) state.notifications[index].isRead = true;
      }
    );
  },
});

/* ================= SELECTORS ================= */
export const selectNotifications = (state: RootState) =>
  state.notification.notifications;
export const selectNotificationsLoading = (state: RootState) =>
  state.notification.loading;
export const selectNotificationsError = (state: RootState) =>
  state.notification.error;

export const { addNotification, clearNotificationsState, clearError } =
  notificationSlice.actions;
export default notificationSlice.reducer;
