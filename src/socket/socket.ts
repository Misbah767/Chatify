"use client";

import { io, Socket } from "socket.io-client";
import store from "@/redux/store";
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
    console.log("Socket disconnected:", reason);
  });

  socket.on("connect_error", (err) => {
    console.error("Socket connection error:", err);
  });

  // ---------------- FRIEND REQUEST RECEIVED ----------------
  socket.on("friend_request_received", () => {
    store.dispatch(fetchIncomingRequests());
    store.dispatch(fetchSentRequests());
  });

  // ---------------- FRIEND REQUEST SENT CONFIRM ----------------
  socket.on("friend_request_sent", () => {
    store.dispatch(fetchSentRequests());
  });

  // ---------------- FRIEND REQUEST RESPONSE ----------------
  socket.on("friend_request_response", () => {
    store.dispatch(fetchIncomingRequests());
    store.dispatch(fetchSentRequests());
  });

  // ---------------- FRIEND REQUEST CANCELLED ----------------
  socket.on("friend_request_cancelled", () => {
    store.dispatch(fetchIncomingRequests());
    store.dispatch(fetchSentRequests());
  });

  // ---------------- NEW CONTACT ADDED ----------------
  socket.on("new_contact_added", () => {
    store.dispatch(fetchIncomingRequests());
    store.dispatch(fetchSentRequests());
  });

  // ---------------- USER ONLINE / OFFLINE ----------------
  socket.on("user_status_changed", () => {
    // optional: later add online status logic here
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
  if (!socket) throw new Error("Socket not initialized");
  return socket;
};

/*
=============================
DISCONNECT SOCKET
=============================
*/
export const disconnectSocket = () => {
  if (socket) {
    console.log("Disconnecting socket...");
    socket.disconnect();
    socket = null;
  }
};
