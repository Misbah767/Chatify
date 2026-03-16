"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";

import { selectUser } from "@/redux/slices/auth.slice";

import { initSocket, disconnectSocket } from "@/socket/socket";

import { useFriendRequestSocket } from "@/features/friendRequests/hooks/useFriendRequestSocket";

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector(selectUser);

  /* ================= INIT SOCKET ================= */

  useEffect(() => {
    if (!user?._id) return;

    initSocket(user._id);

    return () => {
      disconnectSocket();
    };
  }, [user?._id]);

  /* ================= SOCKET FEATURES ================= */

  useFriendRequestSocket();

  return <>{children}</>;
};

export default SocketProvider;
