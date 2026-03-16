import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import {
  fetchNotifications,
  markNotificationRead,
} from "../actions/notification.actions";

export interface Notification {
  _id: string;
  type: string;
  message: string;
  isRead: boolean;
  relatedUser?: {
    _id: string;
    name: string;
    email?: string;
    profilePic?: string;
  };
  createdAt?: string;
}

interface NotificationState {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
}

const initialState: NotificationState = {
  notifications: [],
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    // For socket realtime notifications
    addNotification(state, action: PayloadAction<Notification>) {
      state.notifications.unshift(action.payload);
    },

    clearNotifications(state) {
      state.notifications = [];
    },
  },

  extraReducers: (builder) => {
    // ================= FETCH =================

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

    // ================= MARK READ =================

    builder
      .addCase(markNotificationRead.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        markNotificationRead.fulfilled,
        (state, action: PayloadAction<Notification>) => {
          state.loading = false;

          const index = state.notifications.findIndex(
            (n) => n._id === action.payload._id
          );

          if (index !== -1) {
            state.notifications[index] = action.payload;
          }
        }
      )
      .addCase(markNotificationRead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// ================= SELECTORS =================

export const selectNotifications = (state: RootState) =>
  state.notification.notifications;

export const selectNotificationLoading = (state: RootState) =>
  state.notification.loading;

export const selectNotificationError = (state: RootState) =>
  state.notification.error;

export const { addNotification, clearNotifications } =
  notificationSlice.actions;

export default notificationSlice.reducer;
