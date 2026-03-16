"use client";

import { useSelector } from "react-redux";
import { selectUser } from "@/redux/slices/auth.slice";
import { selectConversationById } from "@/redux/slices/conversation.slice";

export const useChatReceiver = (chatId?: string) => {
  const currentUser = useSelector(selectUser);

  const conversation = useSelector((state: any) =>
    chatId ? selectConversationById(state, chatId) : undefined
  );

  if (!conversation || !currentUser) return null;

  return conversation.participants.find((p: any) => p._id !== currentUser._id);
};
