"use client";

import api from "./axios";

export const notificationsService = {
  // ================= GET NOTIFICATIONS =================
  getNotifications: async () => {
    try {
      const res = await api.get("/notifications");
      return res.data.data;
    } catch (err: any) {
      throw new Error(
        err.response?.data?.message || "Failed to fetch notifications"
      );
    }
  },

  // ================= MARK NOTIFICATION AS READ =================
  markAsRead: async (notificationId: string) => {
    try {
      const res = await api.put(`/notifications/read/${notificationId}`);
      return res.data.data;
    } catch (err: any) {
      throw new Error(
        err.response?.data?.message || "Failed to mark notification as read"
      );
    }
  },
};
