import api from "./axios";

export interface Notification {
  _id: string;
  type:
    | "friend_request_sent"
    | "friend_request_received"
    | "friend_request_accepted"
    | "friend_request_rejected";
  message: string;
  relatedUser?: {
    _id: string;
    name: string;
    email: string;
    profilePic?: string;
  };
  isRead: boolean;
  createdAt: string;
}

export const notificationService = {
  getNotifications: async (): Promise<Notification[]> => {
    const res = await api.get("/notifications");
    return res.data.data as Notification[];
  },

  markAsRead: async (id: string): Promise<Notification> => {
    const res = await api.put(`/notifications/read/${id}`);
    return res.data.data as Notification;
  },
};
