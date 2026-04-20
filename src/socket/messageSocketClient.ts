"use client";

import { io, Socket } from "socket.io-client";
import store from "@/redux/store";
import {
  addMessage,
  markMessageSeenLocal,
  markMessageDeliveredLocal,
  deleteLocal,
} from "@/redux/slices/message.slice";

/* ================= BASE SOCKET URL ================= */
const SOCKET_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ||
  "http://localhost:5000";

interface UserSummary {
  _id: string;
  name?: string;
  profilePic?: string;
}

interface MessagePayload {
  _id: string;
  conversation: string;
  sender: UserSummary | string;
  receiver: UserSummary | string;
  text?: string;
  mediaUrl?: string;
  messageType?: string;
  status?: "sent" | "delivered" | "seen";
  createdAt?: string;
}

let socket: Socket | null = null;

const normalizeUser = (user: UserSummary | string): UserSummary => {
  if (typeof user === "object") return user;
  return { _id: user };
};

const normalizeMessage = (message: MessagePayload) => ({
  _id: message._id,
  conversation: message.conversation,
  sender: normalizeUser(message.sender),
  receiver: normalizeUser(message.receiver),
  text: message.text,
  mediaUrl: message.mediaUrl,
  messageType: message.messageType || "text",
  status: message.status || "sent",
  createdAt: message.createdAt,
});

/* ================= INIT SOCKET ================= */

export const initMessageSocket = (userId: string) => {
  if (!userId) return;
  if (socket?.connected) return socket;

  socket = io(SOCKET_URL, {
    transports: ["websocket"],
    withCredentials: true,
  });

  socket.on("connect", () => {
    console.log("Socket connected");
    socket?.emit("register", userId);
  });

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", reason);
  });

  socket.on("connect_error", (err) => {
    console.error("Socket error:", err);
  });

  /* ================= RECEIVE MESSAGE ================= */

  socket.on("receive_message", (message: MessagePayload) => {
    const exists = store
      .getState()
      .messages.messages.find((m: any) => m._id === message._id);

    if (!exists) {
      const normalized = normalizeMessage(message);
      store.dispatch(addMessage(normalized));
    }
  });

  /* ================= DELIVERED ================= */

  socket.on("message_delivered", (messageId: string) => {
    store.dispatch(markMessageDeliveredLocal(messageId));
  });

  /* ================= SEEN ================= */

  socket.on("message_seen", (messageId: string) => {
    store.dispatch(markMessageSeenLocal(messageId));
  });

  /* ================= DELETE ================= */

  socket.on("message_deleted", (messageId: string) => {
    store.dispatch(deleteLocal(messageId));
  });

  return socket;
};

/* ================= SEND TEXT ================= */

export const sendTextSocket = (message: any) => {
  socket?.emit("send_text_message", { message });
};

/* ================= SEND MEDIA ================= */

export const sendMediaSocket = (message: any) => {
  socket?.emit("new_media_message", message);
};

/* ================= SEEN ================= */

export const seenSocket = (messageId: string, userId: string) => {
  socket?.emit("message_seen", { messageId, userId });
};

/* ================= DELETE ================= */

export const deleteSocketNotify = (messageId: string, receiverId: string) => {
  socket?.emit("delete_message_notify", { messageId, receiverId });
};

/* ================= TYPING ================= */

export const startTyping = (senderId: string, receiverId: string) => {
  socket?.emit("typing_start", { senderId, receiverId });
};

export const stopTyping = (senderId: string, receiverId: string) => {
  socket?.emit("typing_stop", { senderId, receiverId });
};

/* ================= RECORDING ================= */

export const startRecordingSocket = (senderId: string, receiverId: string) => {
  socket?.emit("recording_start", { senderId, receiverId });
};

export const stopRecordingSocket = (senderId: string, receiverId: string) => {
  socket?.emit("recording_stop", { senderId, receiverId });
};

/* ================= LISTEN TYPING ================= */

export const onTypingStart = (callback: (senderId: string) => void) => {
  socket?.on("typing_start", ({ senderId }) => {
    callback(senderId);
  });
};

export const onTypingStop = (callback: (senderId: string) => void) => {
  socket?.on("typing_stop", ({ senderId }) => {
    callback(senderId);
  });
};

/* ================= LISTEN RECORDING ================= */

export const onRecordingStart = (callback: (senderId: string) => void) => {
  socket?.on("recording_start", ({ senderId }) => {
    callback(senderId);
  });
};

export const onRecordingStop = (callback: (senderId: string) => void) => {
  socket?.on("recording_stop", ({ senderId }) => {
    callback(senderId);
  });
};
