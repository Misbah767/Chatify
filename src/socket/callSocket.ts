// frontend/sockets/callSocket.ts
"use client";

import { io, Socket } from "socket.io-client";

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

  socket = io("http://localhost:5000", {
    transports: ["websocket"],
    withCredentials: true,
  });

  socket.on("connect", () => {
    // console.log(" Call socket connected:", socket?.id);
    socket?.emit("register", userId);
  });

  socket.on("disconnect", (reason) => {
    // console.log(" Call socket disconnected:", reason);
  });

  socket.on("connect_error", (err) => {
    // console.error("Call socket connection error:", err);
  });

  // ---------------- INCOMING CALL ----------------
  socket.on("incoming-call", (payload) => {
    // console.log("Incoming call:", payload);
    events?.onIncomingCall?.(payload);
  });

  // ---------------- CALL ACCEPTED ----------------
  socket.on("call-accepted", (payload) => {
    // console.log(" Call accepted:", payload);
    events?.onCallAccepted?.(payload);
  });

  // ---------------- CALL REJECTED ----------------
  socket.on("call-rejected", (payload) => {
    // console.log(" Call rejected:", payload);
    events?.onCallRejected?.(payload);
  });

  // ---------------- CALL ENDED ----------------
  socket.on("call-ended", (payload) => {
    // console.log("Call ended:", payload);
    events?.onCallEnded?.(payload);
  });

  // ---------------- CALL FAILED (USER OFFLINE) ----------------
  socket.on("call-user-failed", (payload) => {
    // console.log(" Call failed:", payload);
    events?.onCallFailed?.(payload);
  });

  // ---------------- ICE CANDIDATE ----------------
  socket.on("ice-candidate", (payload) => {
    events?.onIceCandidate?.(payload);
  });

  return socket;
};

// ====================== SOCKET EMITS ======================

export const callUser = (
  from: string,
  to: string,
  type: "audio" | "video",
  offer: CallOffer
) => {
  if (!socket) return;
  socket.emit("call-user", { from, to, type, offer });
};

export const acceptCall = (
  from: string,
  to: string,
  answer: CallOffer,
  callId: string
) => {
  if (!socket) return;
  socket.emit("accept-call", { from, to, answer, callId });
};

export const rejectCall = (from: string, to: string, callId: string) => {
  if (!socket) return;
  socket.emit("reject-call", { from, to, callId });
};

export const endCall = (from: string, to: string, callId: string) => {
  if (!socket) return;
  socket.emit("end-call", { from, to, callId });
};

export const sendIceCandidate = (
  from: string,
  to: string,
  candidate: IceCandidate
) => {
  if (!socket) return;
  socket.emit("ice-candidate", { from, to, candidate });
};

// ====================== UTILS ======================

export const getCallSocket = (): Socket => {
  if (!socket) throw new Error("Call socket not initialized");
  return socket;
};

export const disconnectCallSocket = () => {
  if (socket) {
    // console.log("⚠ Disconnecting call socket...");
    socket.disconnect();
    socket = null;
  }
};
