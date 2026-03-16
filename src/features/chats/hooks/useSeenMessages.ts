import { useEffect } from "react";

export const useSeenMessages = (
  messages: any[],
  currentUserId: string,
  markAsSeen: (id: string) => void
) => {
  useEffect(() => {
    messages.forEach((msg: any) => {
      const senderId =
        typeof msg.sender === "object" ? msg.sender._id : msg.sender;

      if (senderId !== currentUserId && msg.status !== "seen") {
        markAsSeen(msg._id);
      }
    });
  }, [messages]);
};
