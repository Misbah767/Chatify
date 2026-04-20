"use client";

import { io, Socket } from "socket.io-client";
import store from "@/redux/store";
import {
  fetchIncomingRequests,
  fetchSentRequests,
} from "@/redux/actions/friendRequest.actions";

/* ================= BASE SOCKET URL ================= */
const SOCKET_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ||
  "http://localhost:5000";

let socket: Socket | null = null;

/*
=============================
INIT SOCKET
=============================
*/
export const initSocket = (userId: string): Socket | undefined => {
  if (!userId) return;

  if (socket?.connected) return socket;

  socket = io(SOCKET_URL, {
    transports: ["websocket"],
    withCredentials: true,
  });

  // ---------------- CONNECTION ----------------
  socket.on("connect", () => {
    console.log("Socket connected:", socket?.id);
    socket?.emit("register", userId);
  });

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", reason);
  });

  socket.on("connect_error", (err) => {
    console.error("Socket connection error:", err);
  });

  // ---------------- FRIEND REQUEST EVENTS ----------------
  socket.on("friend_request_received", () => {
    store.dispatch(fetchIncomingRequests());
    store.dispatch(fetchSentRequests());
  });

  socket.on("friend_request_sent", () => {
    store.dispatch(fetchSentRequests());
  });

  socket.on("friend_request_response", () => {
    store.dispatch(fetchIncomingRequests());
    store.dispatch(fetchSentRequests());
  });

  socket.on("friend_request_cancelled", () => {
    store.dispatch(fetchIncomingRequests());
    store.dispatch(fetchSentRequests());
  });

  socket.on("new_contact_added", () => {
    store.dispatch(fetchIncomingRequests());
    store.dispatch(fetchSentRequests());
  });

  socket.on("user_status_changed", () => {
    // optional future logic
  });

  return socket;
};

/*
=============================
EMITS
=============================
*/

export const sendFriendRequest = (
  fromUser: any,
  toUser: any,
  requestId: string
) => {
  socket?.emit("send_friend_request", { fromUser, toUser, requestId });
};

export const respondFriendRequest = (
  fromId: string,
  toId: string,
  requestId: string,
  action: "accepted" | "rejected"
) => {
  socket?.emit("friend_request_response", {
    fromId,
    toId,
    requestId,
    action,
  });
};

export const cancelFriendRequest = (
  fromId: string,
  toId: string,
  requestId: string
) => {
  socket?.emit("friend_request_cancelled", {
    fromId,
    toId,
    requestId,
  });
};

/*
=============================
UTILS
=============================
*/

export const getSocket = (): Socket => {
  if (!socket) throw new Error("Socket not initialized");
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    console.log("Disconnecting socket...");
    socket.disconnect();
    socket = null;
  }
};
