"use client";

import { io, Socket } from "socket.io-client";
import store from "@/redux/store";
import { addNotification } from "@/redux/slices/notification.slice";
import {
  fetchIncomingRequests,
  fetchSentRequests,
} from "@/redux/actions/friendRequest.actions";

let socket: Socket | null = null;

/*
=============================
INIT SOCKET
=============================
*/
export const initSocket = (userId: string): Socket | undefined => {
  if (!userId) {
    // console.warn(" Socket init skipped: missing userId");
    return;
  }

  if (socket?.connected) return socket;

  socket = io("http://localhost:5000", {
    transports: ["websocket"],
    withCredentials: true,
  });

  // ---------------- CONNECTION ----------------
  socket.on("connect", () => {
    console.log("Socket connected:", socket?.id);
    socket?.emit("register", userId);
  });

  socket.on("disconnect", (reason) => {
    console.log(" Socket disconnected:", reason);
  });

  socket.on("connect_error", (err) => {
    console.error("Socket connection error:", err);
  });

  // ---------------- FRIEND REQUEST RECEIVED ----------------
  socket.on("friend_request_received", (payload: any) => {
    // console.log(" Friend request received:", payload);
    store.dispatch(fetchIncomingRequests());
    store.dispatch(fetchSentRequests());
    store.dispatch(
      addNotification({
        type: "friend_request_received",
        message: `Friend request from ${payload.from?.name}`,
        relatedUser: payload.from,
        requestId: payload._id,
      })
    );
  });

  // ---------------- FRIEND REQUEST SENT CONFIRM ----------------
  socket.on("friend_request_sent", (payload: any) => {
    // console.log(" Friend request sent:", payload);
    store.dispatch(fetchSentRequests());
    store.dispatch(
      addNotification({
        type: "friend_request_sent",
        message: `Friend request sent to ${payload.to}`,
        relatedUser: { _id: payload.to },
        requestId: payload._id,
      })
    );
  });

  // ---------------- FRIEND REQUEST RESPONSE ----------------
  socket.on("friend_request_response", (payload: any) => {
    // console.log(" Friend request response:", payload);
    store.dispatch(fetchIncomingRequests());
    store.dispatch(fetchSentRequests());

    const message =
      payload.action === "accepted"
        ? "accepted your friend request"
        : "rejected your friend request";

    store.dispatch(
      addNotification({
        type: "friend_request_response",
        message: `${payload.fromId} ${message}`,
        relatedUser: { _id: payload.fromId },
        requestId: payload.requestId,
      })
    );
  });

  // ---------------- FRIEND REQUEST CANCELLED ----------------
  socket.on("friend_request_cancelled", (payload: any) => {
    // console.log(" Friend request cancelled:", payload);
    store.dispatch(fetchIncomingRequests());
    store.dispatch(fetchSentRequests());
    store.dispatch(
      addNotification({
        type: "friend_request_cancelled",
        message: `Friend request cancelled by ${payload.fromId}`,
        relatedUser: { _id: payload.fromId },
        requestId: payload.requestId,
      })
    );
  });

  // ---------------- NEW CONTACT ADDED ----------------
  socket.on("new_contact_added", ({ userId }) => {
    // console.log(" New contact added:", userId);
    store.dispatch(fetchIncomingRequests());
    store.dispatch(fetchSentRequests());
    store.dispatch(
      addNotification({
        type: "new_contact_added",
        message: `You are now friends with ${userId}`,
        relatedUser: { _id: userId },
      })
    );
  });

  // ---------------- USER ONLINE / OFFLINE ----------------
  socket.on("user_status_changed", ({ userId, isOnline }) => {
    // console.log(" User status:", userId, isOnline);
    store.dispatch(
      addNotification({
        type: "status_change",
        message: `User ${userId} is now ${isOnline ? "Online" : "Offline"}`,
        relatedUser: { _id: userId },
      })
    );
  });

  // ---------------- GENERIC NOTIFICATION ----------------
  socket.on("new_notification", (notification: any) => {
    // console.log(" Notification:", notification);
    store.dispatch(addNotification(notification));
  });

  return socket;
};

/*
=============================
SEND FRIEND REQUEST
=============================
*/
export const sendFriendRequest = (
  fromUser: any,
  toUser: any,
  requestId: string
) => {
  if (!socket) return;
  socket.emit("send_friend_request", { fromUser, toUser, requestId });
};

/*
=============================
RESPOND TO FRIEND REQUEST
=============================
*/
export const respondFriendRequest = (
  fromId: string,
  toId: string,
  requestId: string,
  action: "accepted" | "rejected"
) => {
  if (!socket) return;
  socket.emit("friend_request_response", { fromId, toId, requestId, action });
};

/*
=============================
CANCEL FRIEND REQUEST
=============================
*/
export const cancelFriendRequest = (
  fromId: string,
  toId: string,
  requestId: string
) => {
  if (!socket) return;
  socket.emit("friend_request_cancelled", { fromId, toId, requestId });
};

/*
=============================
GET SOCKET
=============================
*/
export const getSocket = (): Socket => {
  if (!socket) throw new Error("❌ Socket not initialized");
  return socket;
};

/*
=============================
DISCONNECT SOCKET
=============================
*/
export const disconnectSocket = () => {
  if (socket) {
    console.log(" Disconnecting socket...");
    socket.disconnect();
    socket = null;
  }
};
