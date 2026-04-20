"use client";

import { io, Socket } from "socket.io-client";

/* ================= BASE SOCKET URL ================= */
const SOCKET_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ||
  "http://localhost:5000";

interface CallOffer {
  sdp: any;
  type: "offer" | "answer";
}

interface IceCandidate {
  candidate: any;
}

interface CallEvents {
  onIncomingCall?: (payload: {
    from: string;
    type: "audio" | "video";
    offer: CallOffer;
    callId: string;
  }) => void;

  onCallAccepted?: (payload: {
    from: string;
    answer: CallOffer;
    callId: string;
  }) => void;

  onCallRejected?: (payload: { from: string; callId: string }) => void;

  onCallEnded?: (payload: { from: string; callId: string }) => void;

  onCallFailed?: (payload: { to: string; reason: string }) => void;

  onIceCandidate?: (payload: { from: string; candidate: IceCandidate }) => void;
}

let socket: Socket | null = null;

export const initCallSocket = (userId: string, events?: CallEvents) => {
  if (!userId) return;
  if (socket?.connected) return socket;

  socket = io(SOCKET_URL, {
    transports: ["websocket"],
    withCredentials: true,
  });

  socket.on("connect", () => {
    socket?.emit("register", userId);
  });

  socket.on("disconnect", () => {});

  socket.on("connect_error", () => {});

  // ---------------- EVENTS ----------------
  socket.on("incoming-call", (payload) => {
    events?.onIncomingCall?.(payload);
  });

  socket.on("call-accepted", (payload) => {
    events?.onCallAccepted?.(payload);
  });

  socket.on("call-rejected", (payload) => {
    events?.onCallRejected?.(payload);
  });

  socket.on("call-ended", (payload) => {
    events?.onCallEnded?.(payload);
  });

  socket.on("call-user-failed", (payload) => {
    events?.onCallFailed?.(payload);
  });

  socket.on("ice-candidate", (payload) => {
    events?.onIceCandidate?.(payload);
  });

  return socket;
};

/* ================= EMITS ================= */

export const callUser = (
  from: string,
  to: string,
  type: "audio" | "video",
  offer: CallOffer
) => {
  socket?.emit("call-user", { from, to, type, offer });
};

export const acceptCall = (
  from: string,
  to: string,
  answer: CallOffer,
  callId: string
) => {
  socket?.emit("accept-call", { from, to, answer, callId });
};

export const rejectCall = (from: string, to: string, callId: string) => {
  socket?.emit("reject-call", { from, to, callId });
};

export const endCall = (from: string, to: string, callId: string) => {
  socket?.emit("end-call", { from, to, callId });
};

export const sendIceCandidate = (
  from: string,
  to: string,
  candidate: IceCandidate
) => {
  socket?.emit("ice-candidate", { from, to, candidate });
};

/* ================= UTILS ================= */

export const getCallSocket = (): Socket => {
  if (!socket) throw new Error("Call socket not initialized");
  return socket;
};

export const disconnectCallSocket = () => {
  socket?.disconnect();
  socket = null;
};
