"use client";

import { useEffect } from "react";
import { getSocket } from "@/socket/socket";

export const useMessageSocket = () => {
  useEffect(() => {
    const socket = getSocket();

    const handleConnect = () => {
      // console.log("Socket ready for messages");
    };

    socket.on("connect", handleConnect);

    return () => {
      socket.off("connect", handleConnect);
    };
  }, []);
};
