import { createAsyncThunk } from "@reduxjs/toolkit";
import { notificationsService } from "@/services/notificationsService";

// ================= GET NOTIFICATIONS =================
export const fetchNotifications = createAsyncThunk(
  "notifications/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await notificationsService.getNotifications();
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// ================= MARK NOTIFICATION AS READ =================
export const markNotificationRead = createAsyncThunk(
  "notifications/markRead",
  async (notificationId: string, { rejectWithValue }) => {
    try {
      return await notificationsService.markAsRead(notificationId);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
