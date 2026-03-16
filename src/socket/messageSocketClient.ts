// hooks/useMessageSocket.ts
"use client";

import { io, Socket } from "socket.io-client";
import store from "@/redux/store";
import {
  addMessage,
  markMessageSeenLocal,
  markMessageDeliveredLocal,
  deleteLocal,
} from "@/redux/slices/message.slice";
import { addNotification } from "@/redux/slices/notification.slice";

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
  status?: string;
  createdAt?: string;
}

let socket: Socket | null = null;

const normalizeUser = (user: any) =>
  typeof user === "object" ? user : { _id: user };

// ================= INIT SOCKET =================
export const initMessageSocket = (userId: string) => {
  if (!userId) return;
  if (socket?.connected) return socket;

  socket = io("http://localhost:5000", {
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

  // ================= RECEIVE MESSAGE =================
  socket.on("receive_message", (message: MessagePayload) => {
    const exists = store
      .getState()
      .messages.messages.find((m: any) => m._id === message._id);

    if (!exists) {
      // Add message to Redux
      store.dispatch(
        addMessage({
          ...message,
          sender: normalizeUser(message.sender),
          receiver: normalizeUser(message.receiver),
        })
      );

      // Create real-time notification for message
      store.dispatch(
        addNotification({
          type: "message_received",
          message: `New message from ${
            typeof message.sender === "object" ? message.sender.name : "Someone"
          }`,
          relatedUser:
            typeof message.sender === "object"
              ? { _id: message.sender._id, name: message.sender.name }
              : { _id: message.sender },
          requestId: null,
        })
      );
    }
  });

  // ================= DELIVERED =================
  socket.on("message_delivered", (messageId: string) => {
    store.dispatch(markMessageDeliveredLocal(messageId));
  });

  // ================= SEEN =================
  socket.on("message_seen", (messageId: string) => {
    store.dispatch(markMessageSeenLocal(messageId));
  });

  // ================= DELETE =================
  socket.on("message_deleted", (messageId: string) => {
    store.dispatch(deleteLocal(messageId));
  });

  return socket;
};

// ================= SEND TEXT =================
export const sendTextSocket = (message: any) => {
  if (!socket) return;
  socket.emit("send_text_message", { message });
};

// ================= SEND MEDIA =================
export const sendMediaSocket = (message: any) => {
  if (!socket) return;
  socket.emit("new_media_message", message);
};

// ================= SEEN =================
export const seenSocket = (messageId: string, userId: string) => {
  socket?.emit("message_seen", { messageId, userId });
};

// ================= DELETE =================
export const deleteSocketNotify = (messageId: string, receiverId: string) => {
  socket?.emit("delete_message_notify", { messageId, receiverId });
};

// ================= TYPING =================
export const startTyping = (senderId: string, receiverId: string) => {
  socket?.emit("typing_start", { senderId, receiverId });
};
export const stopTyping = (senderId: string, receiverId: string) => {
  socket?.emit("typing_stop", { senderId, receiverId });
};

// ================= RECORDING =================
export const startRecordingSocket = (senderId: string, receiverId: string) => {
  socket?.emit("recording_start", { senderId, receiverId });
};
export const stopRecordingSocket = (senderId: string, receiverId: string) => {
  socket?.emit("recording_stop", { senderId, receiverId });
};

// ================= LISTEN TYPING =================
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

// ================= LISTEN RECORDING =================
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
