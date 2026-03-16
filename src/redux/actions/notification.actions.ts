import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  notificationService,
  Notification,
} from "@/services/notificationServices";

// ================= FETCH NOTIFICATIONS =================
export const fetchNotifications = createAsyncThunk<
  Notification[],
  void,
  { rejectValue: string }
>("notification/fetchNotifications", async (_, { rejectWithValue }) => {
  try {
    return await notificationService.getNotifications();
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Failed to fetch notifications"
    );
  }
});

// ================= MARK NOTIFICATION AS READ =================
export const markNotificationRead = createAsyncThunk<
  Notification,
  string,
  { rejectValue: string }
>("notification/markRead", async (notificationId, { rejectWithValue }) => {
  try {
    return await notificationService.markAsRead(notificationId);
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Failed to mark notification as read"
    );
  }
});
